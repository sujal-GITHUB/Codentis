"""Lightweight terminal UI with expandable tool outputs.

This module provides a minimal terminal UI using Rich for welcome/setup screens
and ANSI escape codes for tool outputs to keep the interactive chat fast.

Tool outputs are displayed in a collapsed format by default, showing:
- Tool name with status icon (●)
- Summary information
- Expandable details with Ctrl+O

This provides a clean, streamlined experience similar to Claude Code.
"""

import sys
import threading
from typing import Any, Dict, List
from codentis.config.config import Config
from rich.console import Console
from rich.panel import Panel
from rich.text import Text
from rich.table import Table

console = Console()


class ToolOutput:
    """Represents a tool call output."""
    
    def __init__(self, call_id: str, name: str, summary: str, details: str, success: bool = True, short_id: str = "", metadata: Dict[str, Any] = None):
        self.call_id = call_id
        self.name = name
        self.summary = summary
        self.details = details
        self.success = success
        self.expanded = False
        self.index = 0  # Position in the list
        self.short_id = short_id  # Short numeric ID for easy reference
        self.metadata = metadata or {}  # Store metadata


class TUI:
    """Lightweight terminal UI."""
    
    def __init__(self, config: Config, console=None):
        self.config = config
        self.tool_outputs: List[ToolOutput] = []
        self.tool_outputs_by_id: Dict[str, ToolOutput] = {}  # Map short IDs to tool outputs
        self.current_message = ""
        self.assistant_streaming = False
        self.last_tool_index = -1
        self.next_tool_id = 1  # Counter for generating short IDs
        self.thinking_active = False
        self.thinking_thread = None
        self.thinking_message = "Thinking"
        
        # ANSI escape codes
        self.BOLD = "\033[1m"
        self.DIM = "\033[2m"
        self.RESET = "\033[0m"
        self.CYAN = "\033[36m"
        self.GREEN = "\033[32m"
        self.RED = "\033[31m"
        self.YELLOW = "\033[33m"
        self.BLUE = "\033[34m"
        self.GRAY = "\033[90m"
        self.MAGENTA = "\033[35m"
        self.ORANGE = "\033[38;5;208m"
        self.PURPLE = "\033[38;5;141m"
        self.PINK = "\033[38;5;213m"
        self.TEAL = "\033[38;5;51m"
        self.LIME = "\033[38;5;154m"
        self.BG_DARK = "\033[48;5;235m"
        self.BG_DARKER = "\033[48;5;233m"
        
        # Tool color mapping
        self.tool_colors = {
            "web_search": self.PURPLE,
            "web_fetch": self.TEAL,
            "read_file": self.BLUE,
            "write_file": self.ORANGE,
            "edit_file": self.YELLOW,
            "apply_patch": self.LIME,
            "shell": self.MAGENTA,
            "list_dir": self.CYAN,
            "grep": self.PINK,
            "glob": self.CYAN,
            "ask_user": self.GREEN,
        }
    
    def toggle_tool(self, tool_id: str = None):
        """Toggle the expansion state of a tool output by ID, or the last one if no ID given."""
        if tool_id:
            # Toggle specific tool by ID
            tool = self.tool_outputs_by_id.get(tool_id)
            if tool:
                tool.expanded = not tool.expanded
                print()  # New line for separation
                if tool.expanded:
                    self._print_expanded_tool(tool)
                else:
                    print(f"{self.DIM}Tool output #{tool_id} collapsed. Type /e {tool_id} to expand again.{self.RESET}")
            else:
                print(f"{self.RED}Tool #{tool_id} not found. Use /list to see available tool IDs.{self.RESET}")
        else:
            # Toggle last tool
            if self.tool_outputs:
                tool = self.tool_outputs[-1]
                tool.expanded = not tool.expanded
                print()  # New line for separation
                if tool.expanded:
                    self._print_expanded_tool(tool)
                else:
                    print(f"{self.DIM}Tool output collapsed. Type /e to expand again.{self.RESET}")
            else:
                print(f"{self.DIM}No tool outputs to expand.{self.RESET}")
    
    def list_tools(self):
        """List all tool outputs with their IDs."""
        if not self.tool_outputs:
            print(f"{self.DIM}No tool outputs yet.{self.RESET}")
            return
        
        print(f"\n{self.BOLD}{self.CYAN}Tool Outputs:{self.RESET}\n")
        for tool in self.tool_outputs:
            tool_color = self.tool_colors.get(tool.name, self.GRAY)
            status_color = self.GREEN if tool.success else self.RED
            status = "✓" if tool.success else "✗"
            print(f"  {tool_color}●{self.RESET} {status_color}#{tool.short_id}{self.RESET} {status} {self.BOLD}{tool.name}{self.RESET} - {self.DIM}{tool.summary}{self.RESET}")
        print(f"\n{self.DIM}Type /e <id> to expand a specific tool output{self.RESET}\n")
    
    def toggle_last_tool(self):
        """Toggle the expansion state of the most recent tool output."""
        self.toggle_tool()
    
    def start_thinking(self, message: str = "Thinking"):
        """Start animated thinking indicator."""
        # If already active, just update the message
        if self.thinking_active:
            self.thinking_message = message
            return
        
        self.thinking_active = True
        self.thinking_message = message
        
        def animate():
            frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
            idx = 0
            while self.thinking_active:
                frame = frames[idx % len(frames)]
                msg = self.thinking_message
                print(f"\r{self.DIM}{frame} {msg}...{self.RESET}", end="", flush=True)
                idx += 1
                import time
                time.sleep(0.1)
            # Clear the line when done
            print(f"\r{' ' * 50}\r", end="", flush=True)
        
        self.thinking_thread = threading.Thread(target=animate, daemon=True)
        self.thinking_thread.start()
    
    def update_thinking(self, message: str):
        """Update the thinking message."""
        if self.thinking_active:
            self.thinking_message = message
    
    def stop_thinking(self):
        """Stop thinking indicator."""
        if self.thinking_active:
            self.thinking_active = False
            if self.thinking_thread:
                self.thinking_thread.join(timeout=0.5)
            # Small delay to ensure the line is fully cleared
            import time
            time.sleep(0.05)
            # Add a newline after clearing to ensure proper spacing
            print()
    
    def _print_expanded_tool(self, tool: ToolOutput):
        """Print the full expanded view of a tool output."""
        # Get tool color
        tool_color = self.tool_colors.get(tool.name, self.GRAY)
        status_color = self.GREEN if tool.success else self.RED
        
        print(f"\n{self.GRAY}{'─' * 80}{self.RESET}")
        print(f"{tool_color}● {self.RESET}{self.BOLD}{tool.name} #{tool.short_id}{self.RESET} {self.DIM}(expanded){self.RESET}")
        print(f"  {self.DIM}└ {tool.summary}{self.RESET}")
        print(f"{self.GRAY}{'─' * 80}{self.RESET}\n")
        
        # Show metadata if present
        if tool.metadata:
            print(f"{self.CYAN}{self.BOLD}Metadata:{self.RESET}")
            import json
            for key, value in tool.metadata.items():
                # Format value nicely
                if isinstance(value, (dict, list)):
                    value_str = json.dumps(value, indent=2)
                else:
                    value_str = str(value)
                print(f"  {self.CYAN}{key}:{self.RESET} {self.DIM}{value_str}{self.RESET}")
            print()
        
        # Show full details
        print(f"{self.CYAN}{self.BOLD}Output:{self.RESET}")
        if tool.success:
            lines = tool.details.split('\n')
            for line in lines[:100]:  # Limit to 100 lines
                print(f"{self.DIM}{line}{self.RESET}")
            if len(lines) > 100:
                print(f"\n{self.DIM}... ({len(lines) - 100} more lines truncated){self.RESET}")
        else:
            print(f"{self.RED}{tool.details}{self.RESET}")
        
        print(f"\n{self.GRAY}{'─' * 80}{self.RESET}")
        print(f"{self.DIM}Type /e {tool.short_id} to collapse{self.RESET}\n")
    
    def print_welcome(self, title: str, lines: List[str]):
        """Print welcome message using Rich with ASCII art mascot."""
        import getpass
        from codentis import __version__

        try:
            username = getpass.getuser()
        except:
            username = "User"

        model_name = "Agent"
        cwd = str(self.config.cwd)
        provider = "AI Provider"

        for line in lines:
            if "model:" in line.lower():
                model_name = line.split(":", 1)[1].strip()
            elif "working directory:" in line.lower():
                cwd = line.split(":", 1)[1].strip()
            elif "provider:" in line.lower():
                provider = line.split(":", 1)[1].strip()

        # Create the welcome panel similar to Claude Code
        welcome_text = Text()
        welcome_text.append(f"Welcome back {username}!\n\n", style="bold white")

        mascot_lines = [
            "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
            "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
            "⠀⠀⠀⠀⠀⣤⣄⠀⠀⠀⠀⠀⠀⠐⠛⠛⠂⠀⠀⠀⠀⠀⠀⣠⣤⠀⠀⠀⠀⠀",
            "⠀⠀⠀⠀⠀⠙⢿⣷⡶⠀⣀⣴⣶⣾⣟⣻⣷⣶⣦⣀⠀⢶⣾⡿⠋⠀⠀⠀⠀⠀",
            "⠀⠀⠀⠀⠀⠀⠘⠋⣠⢞⣿⠿⠛⠉⣉⣉⠉⠛⠿⣿⡳⣄⠙⠃⠀⠀⠀⠀⠀⠀",
            "⠀⠀⠀⠀⠀⠀⢀⣼⣿⡟⠁⣤⡀⠀⢹⡏⠀⢀⣤⠈⢻⣿⣧⡀⠀⠀⠀⠀⠀⠀",
            "⠀⠀⠀⠀⢀⠀⣸⣿⡟⠀⠀⠈⠻⠂⢈⡁⠐⠟⠁⠀⠀⢻⣿⣇⠀⡀⠀⠀⠀⠀",
            "⠀⢾⣿⣿⣿⠀⣿⣹⡇⢸⡷⠶⠆⠰⣿⣿⠆⠰⠶⢾⡇⢸⣏⣿⠀⣿⣿⣿⡷⠀",
            "⠀⠀⠀⠀⠈⠀⢹⣿⣧⠀⠀⢀⣴⠄⢈⡁⠠⣦⡀⠀⠀⣼⣿⡏⠀⠁⠀⠀⠀⠀",
            "⠀⠀⠀⠀⠀⠀⠈⢻⣿⣧⡀⠛⠁⠀⣸⣇⠀⠈⠛⢀⣼⣿⡟⠁⠀⠀⠀⠀⠀⠀",
            "⠀⠀⠀⠀⠀⠀⢠⣄⠙⢮⣿⣶⣤⣀⣉⣉⣀⣤⣶⣿⡵⠋⣠⡄⠀⠀⠀⠀⠀⠀",
            "⠀⠀⠀⠀⠀⣠⣾⡿⠷⠀⠉⠻⠿⢿⣯⣽⡿⠿⠟⠉⠀⠾⢿⣷⣄⠀⠀⠀⠀⠀",
            "⠀⠀⠀⠀⠀⠛⠋⠀⠀⠀⠀⠀⠀⠠⣤⣤⠄⠀⠀⠀⠀⠀⠀⠙⠛⠀⠀⠀⠀⠀",
            "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
            "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
        ]

        for mascot_line in mascot_lines:
            welcome_text.append(mascot_line + "\n", style="bold cyan")

        welcome_text.append("\n")
        welcome_text.append(model_name, style="bold white")
        welcome_text.append(" • ", style="dim")
        welcome_text.append(provider, style="dim")
        welcome_text.append("\n")
        welcome_text.append(cwd, style="dim")

        # Tips section
        tips_text = Text()
        tips_text.append("Tips for getting started\n", style="bold cyan")
        tips_text.append("Run ", style="white")
        tips_text.append("/init", style="cyan")
        tips_text.append(" to create a CODENTIS.md file with instructions for Codentis\n\n", style="white")
        
        tips_text.append("Commands\n", style="bold cyan")
        tips_text.append("/e <id>", style="cyan")
        tips_text.append(" - Expand/collapse tool output by ID\n", style="white")
        tips_text.append("/e", style="cyan")
        tips_text.append(" - Expand/collapse last tool output\n", style="white")
        tips_text.append("/list", style="cyan")
        tips_text.append(" - List all tool outputs with IDs\n", style="white")
        tips_text.append("/exit", style="cyan")
        tips_text.append(" - Quit\n\n", style="white")

        tips_text.append("No recent activity", style="dim")

        # Create two-column layout
        from rich.table import Table
        layout_table = Table.grid(expand=True)
        layout_table.add_column(ratio=1)
        layout_table.add_column(ratio=1)
        layout_table.add_row(welcome_text, tips_text)

        console.print()
        console.print(
            Panel(
                layout_table,
                title=f"[bold cyan] Codentis v{__version__} [/bold cyan]",
                title_align="left",
                border_style="bold cyan",
                padding=(1, 2),
                expand=True
            )
        )
        console.print()
    
    def begin_assistant(self):
        """Start streaming assistant message."""
        self.assistant_streaming = True
        self.current_message = ""
        self.markdown_buffer = ""  # Buffer for incomplete markdown patterns
        self.stop_thinking()  # Stop thinking indicator when response starts
        
        # Don't print new line or arrow - continue on the same line where thinking was
        print(f"{self.BOLD}❯{self.RESET} ", end="", flush=True)
    
    def stream_assistant_delta(self, delta: str):
        """Stream assistant message delta with real-time markdown rendering."""
        self.current_message += delta
        self.markdown_buffer += delta
        
        # Process and render markdown patterns as they complete
        rendered = self._render_streaming_markdown()
        if rendered:
            print(rendered, end="", flush=True)
    
    def end_assistant(self):
        """End assistant message streaming."""
        self.assistant_streaming = False
        
        # Flush any remaining buffer
        if self.markdown_buffer:
            print(self.markdown_buffer, end="", flush=True)
            self.markdown_buffer = ""
        
        print()  # Add newline after output
    
    def _render_streaming_markdown(self) -> str:
        """Render markdown patterns from buffer as they complete."""
        import re
        
        output = ""
        buffer = self.markdown_buffer
        
        # Check for complete markdown patterns and render them
        
        # Bold: **text** (only if pattern is complete)
        bold_match = re.search(r'\*\*([^*]+)\*\*', buffer)
        if bold_match:
            # Found complete bold pattern
            before = buffer[:bold_match.start()]
            bold_text = bold_match.group(1)
            after = buffer[bold_match.end():]
            
            output = before + f'{self.BOLD}{bold_text}{self.RESET}'
            self.markdown_buffer = after
            return output
        
        # Headers: ## Text (at start of line, complete when newline found)
        header_match = re.match(r'^(#{1,6})\s+([^\n]+)\n', buffer)
        if header_match:
            header_text = header_match.group(2)
            after = buffer[header_match.end():]
            
            output = f'{self.CYAN}{self.BOLD}{header_text}{self.RESET}\n'
            self.markdown_buffer = after
            return output
        
        # List items: - Item or * Item (complete when newline found)
        list_match = re.match(r'^(\s*)([-*])\s+([^\n]+)\n', buffer, re.MULTILINE)
        if list_match:
            indent = list_match.group(1)
            item_text = list_match.group(3)
            after = buffer[list_match.end():]
            
            output = f'{indent}{self.CYAN}•{self.RESET} {item_text}\n'
            self.markdown_buffer = after
            return output
        
        # Inline code: `code` (only if pattern is complete)
        code_match = re.search(r'`([^`]+)`', buffer)
        if code_match:
            before = buffer[:code_match.start()]
            code_text = code_match.group(1)
            after = buffer[code_match.end():]
            
            output = before + f'{self.YELLOW}{code_text}{self.RESET}'
            self.markdown_buffer = after
            return output
        
        # If buffer has complete lines without markdown, output them
        if '\n' in buffer and not any(pattern in buffer for pattern in ['**', '##', '`', '- ', '* ']):
            lines = buffer.split('\n')
            if len(lines) > 1:
                # Output all complete lines except the last (incomplete) one
                output = '\n'.join(lines[:-1]) + '\n'
                self.markdown_buffer = lines[-1]
                return output
        
        # If buffer is getting long without patterns, output some of it
        if len(buffer) > 100 and not any(pattern in buffer[-50:] for pattern in ['**', '##', '`', '- ', '* ']):
            # Output first 50 chars
            output = buffer[:50]
            self.markdown_buffer = buffer[50:]
            return output
        
        return ""
    
    def _apply_inline_markdown(self, text: str) -> str:
        """Apply basic markdown styling to text for streaming."""
        import re
        
        # Store original text for line-based processing
        result = text
        
        # Bold: **text** -> styled text
        result = re.sub(r'\*\*([^*]+)\*\*', f'{self.BOLD}\\1{self.RESET}', result)
        
        # Headers: ## Text -> colored and bold
        result = re.sub(r'^(#{1,6})\s+(.+)$', f'{self.CYAN}{self.BOLD}\\2{self.RESET}', result, flags=re.MULTILINE)
        
        # List items: - Item or * Item -> colored bullet
        result = re.sub(r'^(\s*)([-*])\s+', f'\\1{self.CYAN}•{self.RESET} ', result, flags=re.MULTILINE)
        
        # Inline code: `code` -> styled
        result = re.sub(r'`([^`]+)`', f'{self.YELLOW}\\1{self.RESET}', result)
        
        return result
    
    def tool_call_start(self, call_id: str, name: str, tool_kind: str | None, arguments: Dict[str, Any]):
        """Show tool call started."""
        summary = self._generate_summary(name, arguments)
        
        # Generate short ID
        short_id = str(self.next_tool_id)
        self.next_tool_id += 1
        
        # Get color for this tool
        tool_color = self.tool_colors.get(name, self.GRAY)
        
        # Show loading indicator with ID and colored dot
        print(f"\n{tool_color}● {self.RESET}{self.BOLD}{name} #{short_id}{self.RESET}")
        if summary:
            print(f"  {self.DIM}└ {summary}{self.RESET}")
        print(f"  {self.DIM}└ Fetching...{self.RESET}")
        
        # Store the short_id temporarily (will be used in tool_call_complete)
        self._pending_tool_id = short_id
    
    def tool_call_complete(
        self,
        call_id: str,
        name: str,
        tool_kind: str | None,
        success: bool,
        output: str,
        error: str | None,
        metadata: Dict[str, Any],
        truncated: bool,
        diff: str | None,
        exit_code: int | None
    ):
        """Show completed tool output."""
        summary = self._generate_summary_from_metadata(name, metadata, output, success)
        details = output if success else (error or "Unknown error")
        
        # Get the short ID from the pending tool
        short_id = getattr(self, '_pending_tool_id', str(self.next_tool_id))
        
        # Store tool output with metadata
        tool = ToolOutput(
            call_id=call_id,
            name=name,
            summary=summary,
            details=details,
            success=success,
            short_id=short_id,
            metadata=metadata  # Store metadata
        )
        tool.index = len(self.tool_outputs)
        self.tool_outputs.append(tool)
        self.tool_outputs_by_id[short_id] = tool
        self.last_tool_index = tool.index
        
        # Clear the "Fetching..." line
        print(f"\033[1A\033[2K", end="")  # Move up and clear line
        
        # Render collapsed by default - just show summary, no preview
        color = self.GREEN if success else self.RED
        status = "✓" if success else "✗"
        
        # Show tool name and summary with ID
        print(f"  {self.DIM}└ {status} {summary}{self.RESET} {self.GRAY}(Type /e {short_id} to see output){self.RESET}")
    
    
    def _generate_summary(self, name: str, arguments: Dict[str, Any]) -> str:
        """Generate summary from arguments."""
        if name == "web_search" and "query" in arguments:
            return f"Searching for: {arguments['query']}"
        elif name == "read_file" and "path" in arguments:
            return f"Reading: {arguments['path']}"
        elif name == "shell" and "command" in arguments:
            return f"Running: {arguments['command']}"
        elif name == "list_dir":
            path = arguments.get("path", ".")
            return f"Listing: {path}"
        elif name == "web_fetch" and "url" in arguments:
            return f"Fetching: {arguments['url']}"
        elif name == "grep" and "pattern" in arguments:
            return f"Searching for pattern: {arguments['pattern']}"
        return "Processing..."
    
    def _generate_summary_from_metadata(self, name: str, metadata: Dict[str, Any], output: str, success: bool) -> str:
        """Generate summary from metadata."""
        if not success:
            return "Failed"
        
        if name == "read_file":
            total_lines = metadata.get('total_lines', 0)
            return f"Read {total_lines} lines"
        
        elif name == "list_dir":
            entries = metadata.get('entries', 0)
            return f"Found {entries} entries"
        
        elif name == "grep":
            matches = metadata.get('matches', 0)
            return f"Found {matches} matches"
        
        elif name == "web_search":
            results_count = metadata.get('results_count', 0)
            return f"Found {results_count} results"
        
        elif name == "web_fetch":
            return "Content fetched"
        
        elif name == "shell":
            exit_code = metadata.get('exit_code', 0)
            if exit_code == 0:
                return "Command completed successfully"
            else:
                return f"Command failed (exit code: {exit_code})"
        
        return "Completed"


def get_console():
    """Get Rich console instance."""
    return console
