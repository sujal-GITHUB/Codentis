"""Application with lightweight terminal UI."""

import sys
import asyncio
import threading
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
        except Exception as e:
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
        thinking_messages = {
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
        return thinking_messages.get(tool_name, "Processing")
    
    def _should_show_thinking(self, tool_name: str) -> bool:
        """Determine if thinking indicator should be shown for this tool."""
        # Only show for tools that typically take longer
        long_running_tools = {
            "write_file",
            "edit_file", 
            "apply_patch",
            "shell",
            "web_search",
            "web_fetch",
            "grep",
        }
        return tool_name in long_running_tools
    
    def get_tool_kind(self, tool_name: str) -> str | None:
        if not self.agent or not self.agent.session:
            return None
        
        tool = self.agent.session.tool_registry.get(tool_name)
        return tool.kind.value if tool else None
    
    async def run_single(self, message: str):
        """Run a single query."""
        async with Agent(self.config) as agent:
            self.agent = agent
            
            print(f"\nQuery: {message}\n")
            
            async for event in agent.run(message):
                if event.type == AgentEventType.TEXT_DELTA:
                    content = event.data.get("content")
                    if content:
                        print(content, end="", flush=True)
                
                elif event.type == AgentEventType.TOOL_CALL_COMPLETE:
                    tool_name = event.data.get("name", "unknown")
                    success = event.data.get("success", False)
                    output = event.data.get("output", "")
                    print(f"\n\n[{tool_name}]: {output[:200]}...\n")
            
            print("\n")
    
    async def run_interactive(self):
        """Run interactive mode."""
        async with Agent(self.config) as agent:
            self.agent = agent
            
            # Show welcome
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
            
            try:
                while True:
                    try:
                        # Get user input with prompt
                        user_input = input(f"\n{self.tui.BOLD}❯{self.tui.RESET} ").strip()
                        
                        if not user_input:
                            continue
                        
                        # Check for special commands
                        if user_input.lower() in ("/exit", "/quit", "exit", "quit"):
                            break
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
                        
                        await self._process_message(user_input)
                    
                    except KeyboardInterrupt:
                        print("\n\nInterrupted. Type /exit to quit.")
                        continue
                    except EOFError:
                        break
            
            finally:
                self.stop_keyboard_listener()
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
                    
                    # Only start thinking for long-running tools
                    if self._should_show_thinking(tool_name):
                        thinking_msg = self._get_thinking_message(tool_name)
                        self.tui.start_thinking(thinking_msg)
                
                # Stop thinking when tool completes
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
                    
                    # Check if this tool requires user input
                    if metadata.get("requires_user_input"):
                        question = metadata.get("question", "Please provide input:")
                        options = metadata.get("options", [])
                        allow_freeform = metadata.get("allow_freeform", True)
                        is_permission = metadata.get("permission_request", False)
                        
                        # Show the question to the user
                        print(f"\n{self.tui.CYAN}{self.tui.BOLD}{'Permission Required' if is_permission else 'Question'}:{self.tui.RESET} {question}\n")
                        
                        if options:
                            print(f"{self.tui.DIM}Options:{self.tui.RESET}")
                            for i, option in enumerate(options, 1):
                                print(f"  {self.tui.CYAN}{i}.{self.tui.RESET} {option}")
                            print()
                        
                        # Get user response
                        if options and not allow_freeform:
                            # Multiple choice only
                            while True:
                                try:
                                    choice = input(f"{self.tui.BOLD}Your choice (1-{len(options)}):{self.tui.RESET} ").strip()
                                    choice_num = int(choice)
                                    if 1 <= choice_num <= len(options):
                                        user_response = options[choice_num - 1]
                                        break
                                    else:
                                        print(f"{self.tui.RED}Please enter a number between 1 and {len(options)}{self.tui.RESET}")
                                except ValueError:
                                    print(f"{self.tui.RED}Please enter a valid number{self.tui.RESET}")
                        else:
                            # Freeform or mixed
                            prompt = f"{self.tui.BOLD}Your answer:{self.tui.RESET} " if not options else f"{self.tui.BOLD}Your answer (or number):{self.tui.RESET} "
                            user_response = input(prompt).strip()
                            
                            # If options provided and user entered a number, use that option
                            if options:
                                try:
                                    choice_num = int(user_response)
                                    if 1 <= choice_num <= len(options):
                                        user_response = options[choice_num - 1]
                                except ValueError:
                                    pass  # Use the freeform response
                        
                        # Handle permission requests
                        if is_permission:
                            if "yes" in user_response.lower():
                                # User approved - automatically re-execute the command with permission bypass
                                command = metadata.get("command", "")
                                print(f"\n{self.tui.GREEN}✓ Permission granted. Executing command...{self.tui.RESET}\n")
                                
                                # Re-execute the shell command with skip_permission_check=True
                                if self.agent and self.agent.session and tool_name == "shell":
                                    from codentis.tools.base import ToolInvocation
                                    shell_tool = self.agent.session.tool_registry.get("shell")
                                    
                                    if shell_tool:
                                        # Execute with permission bypass
                                        invocation = ToolInvocation(
                                            params={
                                                "command": command,
                                                "skip_permission_check": True
                                            },
                                            cwd=self.config.cwd
                                        )
                                        
                                        # Execute the command
                                        exec_result = await shell_tool.execute(invocation)
                                        
                                        # Update the event data with actual execution result
                                        event.data["success"] = exec_result.success
                                        event.data["output"] = exec_result.output
                                        event.data["error"] = exec_result.error
                                        event.data["metadata"] = exec_result.metadata or {}
                                        event.data["metadata"]["user_approved"] = True
                                        event.data["metadata"]["auto_executed"] = True
                                    else:
                                        event.data["output"] = f"Permission granted by user for: {command}"
                                        event.data["metadata"]["user_approved"] = True
                                else:
                                    event.data["output"] = f"Permission granted by user for: {command}"
                                    event.data["metadata"]["user_approved"] = True
                            else:
                                # User denied
                                print(f"\n{self.tui.RED}✗ Permission denied. Command cancelled.{self.tui.RESET}\n")
                                event.data["output"] = "User denied permission. Command was not executed."
                                event.data["metadata"]["user_denied"] = True
                        else:
                            # Regular ask_user response
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
        except Exception as e:
            print(f"\n{self.tui.RED}Error processing message: {str(e)}{self.tui.RESET}\n")
            import traceback
            traceback.print_exc()
            if assistant_streaming:
                self.tui.end_assistant()
