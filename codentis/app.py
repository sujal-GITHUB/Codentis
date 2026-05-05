"""Application with lightweight terminal UI."""

import sys
import asyncio
import threading
import signal
from typing import Any
from pathlib import Path
from codentis.agent.agent import Agent
from codentis.agent.events import AgentEventType
from codentis.ui.renderer import TUI
from codentis.config import Config

# Platform-specific keyboard handling
try:
    import msvcrt  # Windows
    WINDOWS = True
except ImportError:
    import termios
    import tty
    import select
    WINDOWS = False


class CLI:
    def __init__(self, config: Config):
        self.agent: Agent | None = None
        self.config = config
        self.tui = TUI(config)
        self.keyboard_listener_running = False
        self.keyboard_thread = None
        self.interrupted = False
        self._original_sigint_handler = None
        
        # Cache frequently accessed tools
        self._tool_kinds = {}
        self._thinking_messages = {
            "read_file": "Reading",
            "write_file": "Writing",
            "edit_file": "Editing",
            "apply_patch": "Applying changes",
            "shell": "Executing",
            "list_dir": "Exploring",
            "grep": "Searching",
            "glob": "Finding files",
            "web_search": "Searching web",
            "web_fetch": "Fetching content",
            "ask_user": "Waiting for input",
        }
        self._long_running_tools = {
            "write_file",
            "edit_file", 
            "apply_patch",
            "shell",
            "web_search",
            "web_fetch",
            "grep",
        }

    def _safe_input(self, prompt: str = "") -> str:
        """Get user input while ensuring keyboard listener doesn't interfere."""
        was_running = self.keyboard_listener_running
        self.stop_keyboard_listener()
        try:
            return input(prompt)
        finally:
            if was_running:
                self.start_keyboard_listener()

    async def _safe_input_async(self, prompt: str = "") -> str:
        """Get user input while ensuring keyboard listener doesn't interfere (async)."""
        was_running = self.keyboard_listener_running
        self.stop_keyboard_listener()
        try:
            loop = asyncio.get_event_loop()
            return await loop.run_in_executor(None, lambda: input(prompt))
        finally:
            if was_running:
                self.start_keyboard_listener()
    
    def _setup_signal_handlers(self):
        """Set up signal handlers for interactive mode."""
        def sigint_handler(signum, frame):
            """Handle SIGINT (Ctrl+C) in interactive mode."""
            self.interrupted = True
            self.tui.stop_thinking()
            # Don't exit - just set the flag
        
        # Store original handler and set new one
        self._original_sigint_handler = signal.signal(signal.SIGINT, sigint_handler)
    
    def _restore_signal_handlers(self):
        """Restore original signal handlers."""
        if self._original_sigint_handler is not None:
            signal.signal(signal.SIGINT, self._original_sigint_handler)
            self._original_sigint_handler = None
    
    def _keyboard_listener(self):
        """Listen for Ctrl+O keypresses in the background."""
        try:
            if WINDOWS:
                # Windows implementation
                while self.keyboard_listener_running:
                    try:
                        if msvcrt.kbhit():
                            key = msvcrt.getch()
                            # Ctrl+O is ASCII 15 (0x0F)
                            if key == b'\x0f':
                                self.tui.toggle_last_tool()
                    except Exception:
                        pass  # Ignore keyboard errors
                    import time
                    time.sleep(0.1)  # Reduce CPU usage
            else:
                # Unix/Linux/Mac implementation
                old_settings = termios.tcgetattr(sys.stdin)
                try:
                    tty.setcbreak(sys.stdin.fileno())
                    while self.keyboard_listener_running:
                        try:
                            if sys.stdin in select.select([sys.stdin], [], [], 0.1)[0]:
                                char = sys.stdin.read(1)
                                # Ctrl+O is ASCII 15
                                if ord(char) == 15:
                                    self.tui.toggle_last_tool()
                        except Exception:
                            pass  # Ignore keyboard errors
                finally:
                    termios.tcsetattr(sys.stdin, termios.TCSADRAIN, old_settings)
        except Exception:
            # Silently fail if keyboard listener can't start
            pass
    
    def start_keyboard_listener(self):
        """Start the keyboard listener thread."""
        if not self.keyboard_listener_running:
            self.keyboard_listener_running = True
            self.keyboard_thread = threading.Thread(target=self._keyboard_listener, daemon=True)
            self.keyboard_thread.start()
    
    def stop_keyboard_listener(self):
        """Stop the keyboard listener thread."""
        self.keyboard_listener_running = False
        if self.keyboard_thread:
            self.keyboard_thread.join(timeout=1)
    
    def _get_thinking_message(self, tool_name: str) -> str:
        """Get appropriate thinking message based on tool being used."""
        return self._thinking_messages.get(tool_name, "Processing")
    
    def _should_show_thinking(self, tool_name: str) -> bool:
        """Determine if thinking indicator should be shown for this tool."""
        return tool_name in self._long_running_tools
    
    def get_tool_kind(self, tool_name: str) -> str | None:
        if not self.agent or not self.agent.session:
            return None
        
        # Cache tool kinds to avoid repeated lookups
        if tool_name not in self._tool_kinds:
            tool = self.agent.session.tool_registry.get(tool_name)
            self._tool_kinds[tool_name] = tool.kind.value if tool else None
        
        return self._tool_kinds[tool_name]

    def _attach_subagent_progress(self, tool_name: str):
        """If the tool being called is a sub-agent, attach a live progress callback to the registry."""
        if not self.agent or not self.agent.session:
            return
        if tool_name.startswith("subagent_"):
            def _cb(status: str):
                self.tui.update_thinking(status)
            self.agent.session.tool_registry.progress_callback = _cb
        else:
            self.agent.session.tool_registry.progress_callback = None

    async def run_single(self, message: str):
        """Run a single query with same TUI styling as interactive mode."""
        async with Agent(self.config) as agent:
            self.agent = agent
            
            print(f"\n{self.tui.BOLD}Query:{self.tui.RESET} {message}\n")
            
            assistant_streaming = False
            
            try:
                # Show thinking indicator
                self.tui.start_thinking("Thinking")
                
                async for event in agent.run(message):
                    # Handle tool call start
                    if event.type == AgentEventType.TOOL_CALL_START:
                        # Stop any existing thinking indicator first
                        self.tui.stop_thinking()
                        
                        # Show the tool call
                        tool_name = event.data.get("name", "unknown")
                        tool_kind = self.get_tool_kind(tool_name)
                        self.tui.tool_call_start(
                            event.data.get("call_id", ""),
                            tool_name,
                            tool_kind,
                            event.data.get("arguments", {})
                        )
                        
                        # Attach progress callback for sub-agents
                        self._attach_subagent_progress(tool_name)
                        
                        # Start thinking: always for subagent tools, selectively for others
                        if tool_name.startswith("subagent_"):
                            self.tui.start_thinking("Processing")
                        elif self._should_show_thinking(tool_name):
                            thinking_msg = self._get_thinking_message(tool_name)
                            self.tui.start_thinking(thinking_msg)
                    
                    # Stop thinking when tool completes and start thinking for next decision
                    elif event.type == AgentEventType.TOOL_CALL_COMPLETE:
                        self.tui.stop_thinking()
                    
                    # Stop thinking when text starts
                    elif event.type == AgentEventType.TEXT_DELTA:
                        self.tui.stop_thinking()
                    
                    if event.type == AgentEventType.TEXT_DELTA:
                        content = event.data.get("content")
                        if content:
                            if not assistant_streaming:
                                self.tui.begin_assistant()
                                assistant_streaming = True
                            self.tui.stream_assistant_delta(content)
                    
                    elif event.type == AgentEventType.TEXT_COMPLETE:
                        if assistant_streaming:
                            self.tui.end_assistant()
                            assistant_streaming = False
                        # Stop thinking when agent finishes responding
                        self.tui.stop_thinking()
                    
                    elif event.type == AgentEventType.AGENT_ERROR:
                        error = event.data.get("error") or "Unknown error occurred"
                        print(f"\n{self.tui.RED}Error: {error}{self.tui.RESET}\n")
                        if assistant_streaming:
                            self.tui.end_assistant()
                            assistant_streaming = False
                    
                    elif event.type == AgentEventType.TOOL_CALL_COMPLETE:
                        tool_name = event.data.get("name", "unknown")
                        tool_kind = self.get_tool_kind(tool_name)
                        metadata = event.data.get("metadata", {})
                        
                        # Check if this tool requires user input (ask_user tool only)
                        if metadata.get("requires_user_input"):
                            question = metadata.get("question", "Please provide input:")
                            options = metadata.get("options", [])
                            allow_freeform = metadata.get("allow_freeform", True)
                            
                            # Show the question to the user
                            print(f"\n{self.tui.CYAN}{self.tui.BOLD}Question:{self.tui.RESET} {question}\n")
                            
                            if options:
                                print(f"{self.tui.DIM}Options:{self.tui.RESET}")
                                for i, option in enumerate(options, 1):
                                    print(f"  {self.tui.CYAN}{i}.{self.tui.RESET} {option}")
                                print()
                            
                            # Get user response
                            if options and not allow_freeform:
                                # Multiple choice only - be strict about valid options
                                while True:
                                    try:
                                        choice = self._safe_input(f"{self.tui.BOLD}Your choice (1-{len(options)}):{self.tui.RESET} ").strip()
                                        if not choice:
                                            print(f"{self.tui.RED}Please enter a number between 1 and {len(options)}{self.tui.RESET}")
                                            continue
                                        choice_num = int(choice)
                                        if 1 <= choice_num <= len(options):
                                            user_response = options[choice_num - 1]
                                            break
                                        else:
                                            print(f"{self.tui.RED}Invalid choice. Please enter a number between 1 and {len(options)}{self.tui.RESET}")
                                    except ValueError:
                                        print(f"{self.tui.RED}Invalid input '{choice}'. Please enter a valid number between 1 and {len(options)}{self.tui.RESET}")
                                    except EOFError:
                                        print(f"\n{self.tui.RED}Input interrupted. Defaulting to last option{self.tui.RESET}")
                                        user_response = options[-1] if options else "No"
                                        break
                                    except KeyboardInterrupt:
                                        print(f"\n{self.tui.RED}Operation cancelled by user{self.tui.RESET}")
                                        user_response = options[-1] if options else "No"
                                        break
                            else:
                                # Freeform or mixed - allow numbers or text
                                prompt = f"{self.tui.BOLD}Your answer:{self.tui.RESET} " if not options else f"{self.tui.BOLD}Your answer (or number):{self.tui.RESET} "
                                try:
                                    user_response = self._safe_input(prompt).strip()
                                    if not user_response:
                                        if options:
                                            print(f"{self.tui.RED}Please provide an answer or choose from the options above{self.tui.RESET}")
                                            user_response = self._safe_input(prompt).strip()
                                        else:
                                            print(f"{self.tui.RED}Please provide an answer{self.tui.RESET}")
                                            user_response = self._safe_input(prompt).strip()
                                except EOFError:
                                    print(f"\n{self.tui.RED}Input interrupted. Defaulting to last option{self.tui.RESET}")
                                    user_response = options[-1] if options else "No"
                                except KeyboardInterrupt:
                                    print(f"\n{self.tui.RED}Operation cancelled by user{self.tui.RESET}")
                                    user_response = options[-1] if options else "No"
                                
                                # If options provided and user entered a number, validate it
                                if options and user_response.isdigit():
                                    try:
                                        choice_num = int(user_response)
                                        if 1 <= choice_num <= len(options):
                                            user_response = options[choice_num - 1]
                                        else:
                                            print(f"{self.tui.YELLOW}Note: '{user_response}' is not a valid option number. Using as freeform response.{self.tui.RESET}")
                                    except ValueError:
                                        pass  # Use the freeform response
                            
                            # Store user response
                            event.data["output"] = user_response
                            event.data["metadata"]["user_response"] = user_response
                        
                        self.tui.tool_call_complete(
                            event.data.get("call_id", ""),
                            tool_name,
                            tool_kind,
                            event.data.get("success", False),
                            event.data.get("output", ""),
                            event.data.get("error", None),
                            event.data.get("metadata", {}),
                            event.data.get("truncated", False),
                            event.data.get("diff"),
                            event.data.get("exit_code"),
                        )
                        
                        # Start thinking indicator after tool completion - agent is deciding next steps
                        self.tui.start_thinking("Thinking")
                
                # Stop thinking when agent processing is complete
                self.tui.stop_thinking()
                
            except Exception as e:
                print(f"\n{self.tui.RED}Error processing message: {str(e)}{self.tui.RESET}\n")
                import traceback
                traceback.print_exc()
                if assistant_streaming:
                    self.tui.end_assistant()
            
            print("\n")
    
    async def run_interactive(self):
        """Run interactive mode."""
        # Show welcome message once
        provider = "OpenAI"
        if self.config.base_url:
            if "openrouter" in self.config.base_url:
                provider = "OpenRouter"
            elif "anthropic" in self.config.base_url:
                provider = "Anthropic"
            else:
                provider = "Custom API"
        
        self.tui.print_welcome(
            title="Codentis",
            lines=[
                f'Model: {self.config.model_name}',
                f'Working Directory: {self.config.cwd}',
                f'Provider: {provider}',
            ]
        )
        
        # Start keyboard listener for Ctrl+O
        self.start_keyboard_listener()
        
        # Set up signal handlers for Ctrl+C
        self._setup_signal_handlers()
        
        try:
            async with Agent(self.config) as agent:
                self.agent = agent
                
                while True:  # Main interactive loop
                    try:
                        # Check if we were interrupted by signal handler
                        if self.interrupted:
                            print(f"\n{self.tui.YELLOW}Operation interrupted. Type /exit to quit interactive mode.{self.tui.RESET}")
                            self.interrupted = False  # Reset flag
                            continue
                        
                        # Get user input with prompt - handle KeyboardInterrupt properly
                        try:
                            if WINDOWS:
                                # Windows-specific input handling with Ctrl+C detection
                                # We stop listener inside this block as needed
                                self.stop_keyboard_listener()
                                import msvcrt
                                print(f"\n{self.tui.BOLD}❯{self.tui.RESET} ", end="", flush=True)
                                user_input = ""
                                
                                while True:
                                    # Check if interrupted by signal handler
                                    if self.interrupted:
                                        print(f"\n{self.tui.YELLOW}Operation interrupted. Type /exit to quit interactive mode.{self.tui.RESET}")
                                        self.interrupted = False
                                        user_input = None
                                        break
                                    
                                    # Check for keyboard input
                                    if msvcrt.kbhit():
                                        char = msvcrt.getch()
                                        
                                        # Handle Ctrl+C (ASCII 3)
                                        if char == b'\x03':
                                            print(f"\n{self.tui.YELLOW}Operation interrupted. Type /exit to quit interactive mode.{self.tui.RESET}")
                                            user_input = None
                                            break
                                        
                                        # Handle Enter (ASCII 13)
                                        elif char == b'\r':
                                            print()  # New line
                                            break
                                        
                                        # Handle Backspace (ASCII 8)
                                        elif char == b'\x08':
                                            if user_input:
                                                user_input = user_input[:-1]
                                                print('\b \b', end="", flush=True)
                                        
                                        # Handle regular characters
                                        elif char >= b' ':
                                            try:
                                                decoded_char = char.decode('utf-8')
                                                user_input += decoded_char
                                                print(decoded_char, end="", flush=True)
                                            except UnicodeDecodeError:
                                                pass  # Ignore invalid characters
                                    
                                    # Small sleep to prevent high CPU usage
                                    await asyncio.sleep(0.01)
                                
                                if user_input is not None:
                                    user_input = user_input.strip()
                                
                                self.start_keyboard_listener()
                            else:
                                # Unix/Linux input handling
                                user_input = await self._safe_input_async(f"{self.tui.BOLD}❯{self.tui.RESET} ")
                            
                            if user_input is None:
                                if not WINDOWS:
                                    print(f"\n{self.tui.YELLOW}Operation interrupted. Type /exit to quit interactive mode.{self.tui.RESET}")
                                continue
                        except KeyboardInterrupt:
                            # Handle Ctrl+C during input
                            print(f"\n{self.tui.YELLOW}Operation interrupted. Type /exit to quit interactive mode.{self.tui.RESET}")
                            self.start_keyboard_listener()
                            continue
                        except EOFError:
                            # Handle Ctrl+D or EOF
                            return
                        
                        if not user_input:
                            continue
                        
                        # Check for special commands
                        if user_input.lower() in ("/exit", "/quit", "exit", "quit"):
                            return  # Exit the entire interactive session
                        elif user_input.lower() in ("/init", "init"):
                            # Create CODENTIS.md file with instructions
                            await self._create_codentis_md()
                            continue
                        elif user_input.lower() == "/list":
                            # List all tool outputs
                            self.tui.list_tools()
                            continue
                        elif user_input.lower().startswith("/e "):
                            # Expand specific tool by ID
                            parts = user_input.split()
                            if len(parts) == 2:
                                tool_id = parts[1]
                                self.tui.toggle_tool(tool_id)
                            else:
                                print(f"{self.tui.RED}Usage: /e <id>{self.tui.RESET}")
                            continue
                        elif user_input.lower() in ("/expand", "/e"):
                            # Expand last tool output
                            self.tui.toggle_last_tool()
                            continue
                        
                        # Process the message
                        try:
                            await self._process_message(user_input)
                        except KeyboardInterrupt:
                            # Handle Ctrl+C during message processing
                            print(f"\n{self.tui.YELLOW}Operation interrupted. Type /exit to quit interactive mode.{self.tui.RESET}")
                            continue
                        
                        # Check if interrupted during processing
                        if self.interrupted:
                            continue
                    
                    except KeyboardInterrupt:
                        # Catch any KeyboardInterrupt that escapes the inner try block
                        print(f"\n{self.tui.YELLOW}Operation interrupted. Type /exit to quit interactive mode.{self.tui.RESET}")
                        continue
                    except EOFError:
                        return  # Exit the entire interactive session
                    except Exception as e:
                        print(f"\n{self.tui.RED}Unexpected error: {str(e)}{self.tui.RESET}")
                        continue
        
        except KeyboardInterrupt:
            # Final catch-all for KeyboardInterrupt - should never reach here
            print(f"\n{self.tui.YELLOW}Operation interrupted. Type /exit to quit interactive mode.{self.tui.RESET}")
        except Exception as e:
            print(f"\n{self.tui.RED}Unexpected error: {str(e)}{self.tui.RESET}")
        
        finally:
            self.stop_keyboard_listener()
            self._restore_signal_handlers()
            print(f"\n{self.tui.GRAY}{'─' * 80}{self.tui.RESET}")
            print(f"\n{self.tui.DIM}Goodbye!{self.tui.RESET}\n")
    
    async def _process_message(self, message: str):
        """Process a message through the agent."""
        if not self.agent:
            print(f"{self.tui.RED}Error: Agent not initialized{self.tui.RESET}")
            return
        
        assistant_streaming = False
        
        try:
            # Show thinking indicator
            self.tui.start_thinking("Thinking")
            
            async for event in self.agent.run(message):
                # Check if we were interrupted
                if self.interrupted:
                    break
                    
                # Handle tool call start
                if event.type == AgentEventType.TOOL_CALL_START:
                    # Stop any existing thinking indicator first
                    self.tui.stop_thinking()
                    
                    # Show the tool call
                    tool_name = event.data.get("name", "unknown")
                    tool_kind = self.get_tool_kind(tool_name)
                    self.tui.tool_call_start(
                        event.data.get("call_id", ""),
                        tool_name,
                        tool_kind,
                        event.data.get("arguments", {})
                    )
                    
                    # Attach progress callback for sub-agents
                    self._attach_subagent_progress(tool_name)
                    
                    # Start thinking: always for subagent tools, selectively for others
                    if tool_name.startswith("subagent_"):
                        self.tui.start_thinking("Processing")
                    elif self._should_show_thinking(tool_name):
                        thinking_msg = self._get_thinking_message(tool_name)
                        self.tui.start_thinking(thinking_msg)
            
                # Stop thinking when tool completes and start thinking for next decision
                elif event.type == AgentEventType.TOOL_CALL_COMPLETE:
                    self.tui.stop_thinking()
                    # After tool completion, agent might be thinking about next steps
                    tool_completed = True
                
                # Stop thinking when text starts
                elif event.type == AgentEventType.TEXT_DELTA:
                    self.tui.stop_thinking()
                
                if event.type == AgentEventType.TEXT_DELTA:
                    content = event.data.get("content")
                    if content:
                        if not assistant_streaming:
                            self.tui.begin_assistant()
                            assistant_streaming = True
                        self.tui.stream_assistant_delta(content)
                
                elif event.type == AgentEventType.TEXT_COMPLETE:
                    if assistant_streaming:
                        self.tui.end_assistant()
                        assistant_streaming = False
                    # Stop thinking when agent finishes responding
                    self.tui.stop_thinking()
                
                elif event.type == AgentEventType.AGENT_ERROR:
                    error = event.data.get("error") or "Unknown error occurred"
                    print(f"\n{self.tui.RED}Error: {error}{self.tui.RESET}\n")
                    if assistant_streaming:
                        self.tui.end_assistant()
                        assistant_streaming = False
                
                elif event.type == AgentEventType.TOOL_CALL_COMPLETE:
                    tool_name = event.data.get("name", "unknown")
                    tool_kind = self.get_tool_kind(tool_name)
                    metadata = event.data.get("metadata", {})
                    
                    # Check if this tool requires user input (ask_user tool only)
                    if metadata.get("requires_user_input"):
                        question = metadata.get("question", "Please provide input:")
                        options = metadata.get("options", [])
                        allow_freeform = metadata.get("allow_freeform", True)
                        
                        # Show the question to the user
                        print(f"\n{self.tui.CYAN}{self.tui.BOLD}Question:{self.tui.RESET} {question}\n")
                        
                        if options:
                            print(f"{self.tui.DIM}Options:{self.tui.RESET}")
                            for i, option in enumerate(options, 1):
                                print(f"  {self.tui.CYAN}{i}.{self.tui.RESET} {option}")
                            print()
                        
                        # Get user response
                        if options and not allow_freeform:
                            # Multiple choice only - be strict about valid options
                            while True:
                                try:
                                    choice = self._safe_input(f"{self.tui.BOLD}Your choice (1-{len(options)}):{self.tui.RESET} ").strip()
                                    if not choice:
                                        print(f"{self.tui.RED}Please enter a number between 1 and {len(options)}{self.tui.RESET}")
                                        continue
                                    choice_num = int(choice)
                                    if 1 <= choice_num <= len(options):
                                        user_response = options[choice_num - 1]
                                        break
                                    else:
                                        print(f"{self.tui.RED}Invalid choice. Please enter a number between 1 and {len(options)}{self.tui.RESET}")
                                except ValueError:
                                    print(f"{self.tui.RED}Invalid input '{choice}'. Please enter a valid number between 1 and {len(options)}{self.tui.RESET}")
                                except EOFError:
                                    print(f"\n{self.tui.RED}Input interrupted. Defaulting to last option{self.tui.RESET}")
                                    user_response = options[-1] if options else "No"
                                    break
                                except KeyboardInterrupt:
                                    print(f"\n{self.tui.RED}Operation cancelled by user{self.tui.RESET}")
                                    user_response = options[-1] if options else "No"
                                    break
                        else:
                            # Freeform or mixed - allow numbers or text
                            prompt = f"{self.tui.BOLD}Your answer:{self.tui.RESET} " if not options else f"{self.tui.BOLD}Your answer (or number):{self.tui.RESET} "
                            try:
                                user_response = self._safe_input(prompt).strip()
                                if not user_response:
                                    if options:
                                        print(f"{self.tui.RED}Please provide an answer or choose from the options above{self.tui.RESET}")
                                        user_response = self._safe_input(prompt).strip()
                                    else:
                                        print(f"{self.tui.RED}Please provide an answer{self.tui.RESET}")
                                        user_response = self._safe_input(prompt).strip()
                            except EOFError:
                                print(f"\n{self.tui.RED}Input interrupted. Defaulting to last option{self.tui.RESET}")
                                user_response = options[-1] if options else "No"
                            except KeyboardInterrupt:
                                print(f"\n{self.tui.RED}Operation cancelled by user{self.tui.RESET}")
                                user_response = options[-1] if options else "No"
                            
                            # If options provided and user entered a number, validate it
                            if options and user_response.isdigit():
                                try:
                                    choice_num = int(user_response)
                                    if 1 <= choice_num <= len(options):
                                        user_response = options[choice_num - 1]
                                    else:
                                        print(f"{self.tui.YELLOW}Note: '{user_response}' is not a valid option number. Using as freeform response.{self.tui.RESET}")
                                except ValueError:
                                    pass  # Use the freeform response
                        
                        # Store user response
                        event.data["output"] = user_response
                        event.data["metadata"]["user_response"] = user_response
                    
                    self.tui.tool_call_complete(
                        event.data.get("call_id", ""),
                        tool_name,
                        tool_kind,
                        event.data.get("success", False),
                        event.data.get("output", ""),
                        event.data.get("error", None),
                        event.data.get("metadata", {}),
                        event.data.get("truncated", False),
                        event.data.get("diff"),
                        event.data.get("exit_code"),
                    )
                    
                    # Start thinking indicator after tool completion - agent is deciding next steps
                    self.tui.start_thinking("Thinking")
        
            # Stop thinking when agent processing is complete
            self.tui.stop_thinking()
            
        except KeyboardInterrupt:
            # Handle Ctrl+C during message processing
            self.interrupted = True
            self.tui.stop_thinking()
            if assistant_streaming:
                self.tui.end_assistant()
            # Don't re-raise - let the caller handle it
            return
        except Exception as e:
            print(f"\n{self.tui.RED}Error processing message: {str(e)}{self.tui.RESET}\n")
            import traceback
            traceback.print_exc()
            if assistant_streaming:
                self.tui.end_assistant()
        
        finally:
            # Clean up if interrupted
            if self.interrupted:
                self.tui.stop_thinking()
                if assistant_streaming:
                    self.tui.end_assistant()
    
    async def _create_codentis_md(self):
        """Create a CODENTIS.md file with instructions for using Codentis."""
        codentis_md_path = Path(self.config.cwd) / "CODENTIS.md"
        
        if codentis_md_path.exists():
            print(f"{self.tui.YELLOW}CODENTIS.md already exists. Overwrite? (y/N):{self.tui.RESET} ", end="", flush=True)
            try:
                response = self._safe_input().strip().lower()
                if response not in ['y', 'yes']:
                    print(f"{self.tui.CYAN}Cancelled. CODENTIS.md was not modified.{self.tui.RESET}")
                    return
            except (KeyboardInterrupt, EOFError):
                print(f"\n{self.tui.CYAN}Cancelled. CODENTIS.md was not modified.{self.tui.RESET}")
                return
        
        content = f"""# Codentis Instructions

Welcome to your project! This file contains instructions for Codentis, your AI coding assistant.

## About This Project

This is a {Path(self.config.cwd).name} project. Codentis can help you with:

- **Code Development**: Writing, editing, and refactoring code
- **File Management**: Creating, reading, and organizing project files
- **Testing & Debugging**: Running tests and fixing issues
- **Documentation**: Writing and updating documentation
- **Build & Deploy**: Managing build processes and deployment

## Project Structure

```
{Path(self.config.cwd).name}/
├── CODENTIS.md          # This file - instructions for Codentis
├── README.md            # Project documentation (if exists)
├── src/                 # Source code (typical location)
├── tests/               # Test files (typical location)
└── ...                  # Other project files
```

## Getting Started

1. **Ask Codentis for help**: Just type your request in natural language
   - "Create a new Python script for data processing"
   - "Add unit tests for the main function"
   - "Fix the bug in the authentication module"

2. **Use Codentis commands**:
   - `/list` - Show all tool outputs with IDs
   - `/e <id>` - Expand/collapse specific tool output
   - `/e` - Expand/collapse last tool output
   - `/exit` - Quit Codentis

3. **Let Codentis explore**: Codentis can read your existing code and understand your project structure

## Best Practices

- **Be specific**: "Add error handling to the login function" is better than "fix the code"
- **Provide context**: Mention relevant files, functions, or requirements
- **Review changes**: Always review code changes before committing
- **Ask questions**: Codentis can explain code, suggest improvements, and help with decisions

## Example Requests

- "Analyze the current codebase and suggest improvements"
- "Create a comprehensive test suite for the API endpoints"
- "Add logging to all error cases in the application"
- "Refactor the database connection code to use connection pooling"
- "Generate documentation for all public functions"

## Project-Specific Notes

Add any project-specific information here:
- Coding standards and conventions
- Build and deployment instructions
- Testing requirements
- Dependencies and setup notes
- Architecture decisions

---

*This file was generated by Codentis v{self.config.version if hasattr(self.config, 'version') else '1.5.1'}*
*You can edit this file to add project-specific instructions for Codentis*
"""
        
        try:
            with open(codentis_md_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"{self.tui.GREEN}✓ Created CODENTIS.md with project instructions{self.tui.RESET}")
            print(f"{self.tui.DIM}Location: {codentis_md_path}{self.tui.RESET}")
            print(f"{self.tui.CYAN}You can edit this file to add project-specific instructions for Codentis.{self.tui.RESET}")
            
        except Exception as e:
            print(f"{self.tui.RED}Error creating CODENTIS.md: {str(e)}{self.tui.RESET}")