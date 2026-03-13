from rich.console import Console
from rich.theme import Theme
from rich.rule import Rule
from rich.text import Text
from rich.panel import Panel
from rich.table import Table
from rich.syntax import Syntax
from typing import Any, Tuple
from utils.paths import display_path_relative_to_cwd
from utils.text import truncate_text
from config.config import Config
from pathlib import Path
from rich import box
try:
    from rich.group import Group
except ImportError:
    from rich.text import Text as _Text

    class Group:
        """Minimal fallback for rich.group.Group (added in rich >=12)."""
        def __init__(self, *renderables):
            self.renderables = renderables

        def __rich_console__(self, console, options):
            for renderable in self.renderables:
                yield renderable
import re

AGENT_THEME = Theme(
    {
        # General
        "info": "cyan",
        "warning": "yellow",
        "error": "red",
        "success": "green",
        "debug": "blue",
        "dim": "dim",
        "border": "grey35",
        "highlight": "bold white",
        "muted": "grey50",
        "primary": "#00FFFF",
        "secondary": "orange3",

        # Welcome Screen
        "welcome.title": "bold black on #00FFFF",
        "welcome.border": "#00FFFF",
        "welcome.heading": "bold #00FFFF",
        "welcome.mascot": "#00FFFF",

        # Roles
        "user": "bold blue",
        "assistant": "bold white",
        "system": "bold yellow",

        # Tools
        "tool": "bright_magenta bold",
        "tool.read": "cyan",
        "tool.write": "green",
        "tool.search": "blue",
        "tool.execute": "yellow",
        "tool.shell": "yellow",
        "tool.network": "blue",
        "tool.memory": "magenta",
        "tool.mcp": "bright_cyan",
        "tool.error": "red",
        "tool.result": "green",

        # Code
        "code": "white"
    }
)

console: Console | None = None

def get_console()->Console:
    global console
    if console is None:
        console = Console(theme=AGENT_THEME, highlight=False)

    return console

class TUI:
    def __init__(self, config = Config, console: Console | None = None):
        self.config = config
        self.console = console or get_console()
        self.assistant_stream_open = False
        self.tool_args_by_call_id: dict[str, dict[str, Any]] = {}
        self.cwd = self.config.cwd  
        self.max_block_tokens = 2700   

    def begin_assistant(self)->None:
        self.console.print()
        self.console.print(Rule(Text("Assistant", style="assistant")))
        self.assistant_stream_open = True

    def end_assistant(self)->None:
        if self.assistant_stream_open:
            self.console.print()
            
        self.assistant_stream_open = False

    def stream_assistant_delta(self, delta: str)->None:
        self.console.print(delta, end="", markup=False)

    def print_welcome(self, title: str, lines: list[str])->None:
        import getpass
        import os
        try:
            username = getpass.getuser()
        except:
            username = "User"
            
        model_name = "Agent"
        cwd = str(self.cwd)
        commands = ""
        
        for line in lines:
            if "model:" in line.lower():
                model_name = line.split(":", 1)[1].strip()
            elif "cwd:" in line.lower():
                cwd = line.split(":", 1)[1].strip()
            elif "commands:" in line.lower():
                commands = line.split(":", 1)[1].strip()

        # Mascot: Pirate Ship Wheel
        # Mascot: Refined Pirate Ship Wheel
        mascot = Text.assemble(
            ("\n                O\n", "welcome.mascot"),
            ("                |\n", "welcome.mascot"),
            ("         O  ▄▄▄███▄▄▄  O\n", "welcome.mascot"),
            ("          \\▄█▀  |  ▀█▄/\n", "welcome.mascot"),
            ("          ██  \\ | /  ██\n", "welcome.mascot"),
            ("     O----██----O----██----O\n", "welcome.mascot"),
            ("          ██  / | \\  ██\n", "welcome.mascot"),
            ("          /▀█▄  |  ▄█▀\\\n", "welcome.mascot"),
            ("         O  ▀▀▀███▀▀▀  O\n", "welcome.mascot"),
            ("                |\n", "welcome.mascot"),
            ("                O", "welcome.mascot")
        )

        left_column = Group(
            Text(f"Welcome back, {username}!", style="bold white"),
            mascot,
            Text("\n"),
            Text.assemble(
                (model_name, "bold white"),
                (" • ", "dim"),
                ("API Usage", "dim"),
                (" • ", "dim"),
                ("Codentis", "dim"),
            ),
            Text(f"~{cwd}", style="dim")
        )

        right_column = Group(
            Text("Tips for getting started", style="welcome.heading"),
            Text("Ask Codentis to create a new app or help with code", style="white"),
            Rule(style="dim", align="left"),
            Text("Recent activity", style="welcome.heading"),
            Text("No recent activity", style="dim"),
        )

        layout_table = Table.grid(expand=True)
        layout_table.add_column(ratio=1)
        layout_table.add_column(ratio=1)
        layout_table.add_row(left_column, right_column)

        self.console.print()
        self.console.print(
            Panel(
                layout_table,
                title=Text(f" {title} v0.1.0 ", style="welcome.title"),
                title_align="left",
                border_style="welcome.border",
                box=box.ROUNDED,
                padding=(1, 2)
            )
        )
        if commands:
            self.console.print(Text.assemble(
                (" ", ""),
                (commands, "dim italic")
            ))
        self.console.print()

    def ordered_args(self, tool_name: str, args: dict[str, Any])->list[tuple[str, Any]]:
        PREFERRED_ORDER = {
            'read_file': ['path', 'offset', 'limit'],
            'write_file': ['path', 'create_directory', 'content'],
            'edit_file':['path', 'replace_all', 'old_string', 'new_string'],
            'apply_patch': ['edits'],
            'run_command': ['command', 'cwd', 'timeout', 'capture_output', 'env', 'shell', 'stdin'],
            'list_dir': ['path', 'include_hidden', 'max_depth', 'max_items', 'recursive'],
            'grep': ['path', 'case_insensitive', 'pattern', 'recursive'],
            'glob': ['path', 'pattern', 'recursive']
        }

        preferred = PREFERRED_ORDER.get(tool_name, [])
        ordered: list[tuple[str, Any]] = []
        seen = set()

        if preferred:
            for arg_name in preferred:
                if arg_name in args:
                    ordered.append((arg_name, args[arg_name]))
                    seen.add(arg_name)

        remaining_keys = set(args.keys()) - seen
        for key in remaining_keys:
            ordered.append((key, args[key]))

        return ordered

    def render_arguements_tab(self, tool_name: str, args: dict[str, Any])->Table:
        table = Table.grid(
            padding=(0, 1)
        )

        table.add_column(style="muted", justify="right", no_wrap=True)
        table.add_column(style="code", overflow="fold")

        for arg_name, arg_value in self.ordered_args(tool_name, args):
            display_value = str(arg_value)
            if arg_name == 'edits' and isinstance(arg_value, list):
                parts = [f"[{len(arg_value)} edits]"]
                for edit in arg_value:
                    if isinstance(edit, dict):
                        p = edit.get('path', 'unknown')
                        o_lines = len(str(edit.get('old_string', '')).splitlines())
                        n_lines = len(str(edit.get('new_string', '')).splitlines())
                        parts.append(f"  {p}: [old: {o_lines} lines] -> [new: {n_lines} lines]")
                display_value = "\n".join(parts)
            elif isinstance(arg_value, str):
                if arg_name in {'content', 'old_string', 'new_string', 'patch'}:
                    line_count = len(arg_value.splitlines()) or 0
                    byte_count = len(arg_value.encode('utf-8', errors='replace'))
                    display_value = f'[{line_count} lines ☸ {byte_count} bytes]'
                else:
                    display_value = arg_value

                if isinstance(arg_value, bool):
                    display_value = str(arg_value).lower()
            table.add_row(arg_name, display_value)

        return table

    def tool_call_start(self, call_id: str, name: str, tool_kind: str | None, arguments: dict[str, Any])->None:
        self.tool_args_by_call_id[call_id] = arguments  
        border_style = f"tool.{tool_kind}" if tool_kind else "tool"

        title = Text.assemble(
            ("☸ ", "muted"),
            (name, "tool"),
            (" ", "muted"),
            (f"#{call_id[:8]}", "muted")
        )

        display_args = dict(arguments)
        for key in ('path', 'cwd'):
            val = display_args.get(key)
            if isinstance(val, str):
                display_args[key] = str(display_path_relative_to_cwd(val))

        panel = Panel(
            self.render_arguements_tab(name, arguments) if arguments else Text("No arguments", style="muted"),
            title=title,
            title_align="left",
            subtitle=Text('running', style="dim"),
            subtitle_align="right",
            border_style=border_style,
            box=box.ROUNDED,
            padding=(1, 2)
        )

        self.console.print()
        self.console.print(panel)

    def guess_language(self, path: str| None)->str:
        if not path:
            return "text"

        suffix = Path(path).suffix.lower()
        return {
            ".py":"python",
            ".js":"javascript",
            ".ts": "typescript",
            ".tsx": "tsx",
            ".jsx": "jsx",
            ".html": "html",
            ".css": "css",
            ".json": "json",
            ".yaml": "yaml",
            ".yml": "yaml",
            ".md": "markdown",
            ".sh": "bash",
            ".bash": "bash",
            ".sql": "sql",
            ".c": "c",
            ".cpp": "cpp",
            ".h": "c",
            ".hpp": "cpp",
            ".rs": "rust",
            ".go": "go",
            ".rb": "ruby",
            ".php": "php",
            ".java": "java",
            ".kt": "kotlin",
            ".swift": "swift",
            "rs": "rust",
            "go": "go",
            "rb": "ruby",
            "php": "php",
            "java": "java",
            "kt": "kotlin",
            "swift": "swift",
            "toml": "toml",
            "xml": "xml",
            "dockerfile": "dockerfile",
            "makefile": "makefile",
            "txt": "text",
            ".ini": "ini",
            ".cfg": "ini",
            ".log": "text",
            ".zsh": "bash",
            ".fish": "fish",
            ".rst": "restructuredtext",
            ".adoc": "asciidoc",
            ".cs": "csharp",
            ".scala": "scala",
            ".dart": "dart",
            ".lua": "lua"
        }.get(suffix, "text")

    def extract_read_file_code(self, text: str) -> tuple[int, str] | None:
        body = text
        # Match the actual header format: "Read X-Y of Z lines from filename"
        header_match = re.match(r"^Read \d+-\d+ of \d+ lines from .+?\n\n", text)

        if header_match:
            body = text[header_match.end():]

        # Lines are formatted as "     1 | code_here"
        code_lines: list[str] = []
        start_line = None

        for line in body.splitlines():
            m = re.match(r"^\s*(\d+)\s*\|\s?(.*)$", line)
            if not m:
                if not code_lines:
                    continue  # skip any unexpected preamble
                break  # stop at truncation markers etc.

            line_no = int(m.group(1))
            if start_line is None:
                start_line = line_no
            code_lines.append(m.group(2))

        if start_line is None or not code_lines:
            return None

        return start_line, "\n".join(code_lines)

    def tool_call_complete(
        self, 
        call_id: str, 
        name: str, 
        tool_kind: str | None, 
        success: bool, 
        output: str, 
        error: str | None, 
        metadata: dict[str, Any], 
        truncated: bool,
        diff: str | None,
        exit_code: int | None
        )->None:
        border_style = f"tool.{tool_kind}" if tool_kind else "tool"
        status_icon = "✔" if success else "✘"
        status_style = 'success' if success else 'error'

        title = Text.assemble(
            (f"{status_icon} ", status_style),
            (name, "tool"),
            (" ", "muted"),
            (f"#{call_id[:8]}", "muted")
        )

        args = self.tool_args_by_call_id.get(call_id, {})
        primary_path = None
        blocks = []
        if isinstance(metadata, dict) and isinstance(metadata.get('path'), str):
            primary_path = metadata['path']

        if name == "read_file" and success:
            if primary_path:
                result = self.extract_read_file_code(output)
                if result is not None:
                    start_line, code = result
                    shown_start_line = metadata.get('shown_start')
                    shown_end_line = metadata.get('shown_end')
                    total_lines = metadata.get('total_lines')

                    pl = self.guess_language(primary_path)

                    blocks.append(Text())
                    header_parts = display_path_relative_to_cwd(primary_path)
                    
                    header_parts += " ☸ "

                    if shown_start_line and shown_end_line and total_lines:
                        header_parts += f"{shown_start_line}-{shown_end_line} of {total_lines}"

                    blocks.append(Text(header_parts, style="muted"))
                    blocks.append(Syntax(code, pl, theme="monokai", word_wrap=False, start_line=start_line))
                else:
                    blocks.append(Text(output[:500] if len(output) > 500 else output, style="code"))
            else:
                output_display = truncate_text(output, self.max_block_tokens, self.config.model_name)
                blocks.append(
                    Syntax(
                        output_display,
                        "text",
                        theme="monokai",
                        word_wrap=False
                    )
                )

        elif name in {'write_file', 'edit_file', 'apply_patch'}:
            if success:
                output_line = output.strip() if output.strip() else 'Completed'
                blocks.append(Text(output_line, style='muted'))
                if diff:
                    diff_display = truncate_text(diff, self.max_block_tokens, self.config.model_name)
                    blocks.append(Syntax(diff_display, "diff", theme="monokai", word_wrap=True))
                else:
                    blocks.append(Text("(no diff)", style="muted"))
            else:
                blocks.append(Text(error or output or "Unknown error", style="error"))

        elif name == 'shell' and success:
            command = args.get('command')
            if isinstance(command, str) and command.strip():
                blocks.append(Text(f"$ {command}", style="muted"))
            if exit_code is not None:
                blocks.append(Text(f"exit-code: {exit_code}", style="muted"))
            
            output_display = truncate_text(output, self.max_block_tokens, self.config.model_name)
            blocks.append(Syntax(output_display, "text", theme="monokai", word_wrap=False))
        
        elif name == 'list_dir' and success:
            entries = metadata.get('entries', 0)
            path = metadata.get('path', '')
            
            summary = []
            if isinstance(path, str):
                summary.append(path)
            
            if isinstance(entries, int):
                summary.append(f"Found {entries} entries")

            if summary:
                blocks.append(Text(" ☸ ".join(summary), style="muted"))

            output_display = truncate_text(output, self.max_block_tokens, self.config.model_name)
            blocks.append(Syntax(output_display, "text", theme="monokai", word_wrap=True))

        elif name == 'grep' and success:
            matches = metadata.get('matches', 0)
            path = metadata.get('path', '')
            files_searched = metadata.get('files_searched', 0)

            summary = []
            if isinstance(matches, int):
                summary.append(f"{matches} matches")
                
                if isinstance(files_searched, int):
                    summary.append(f"in {files_searched} files")

                if summary:
                    blocks.append(Text(" ☸ ".join(summary), style="muted"))

                output_display = truncate_text(output, self.max_block_tokens, self.config.model_name)
                blocks.append(Syntax(output_display, "text", theme="monokai", word_wrap=True))
        
        elif name == 'glob' and success:
            matches = metadata.get('matches', 0)
            path = metadata.get('path', '')
            files_searched = metadata.get('files_searched', 0)

            if isinstance(matches, int):
                blocks.append(Text(f"{matches} matches", style="muted"))
                
                output_display = truncate_text(output, self.max_block_tokens, self.config.model_name)
                blocks.append(Syntax(output_display, "text", theme="monokai", word_wrap=True))
        
        if not blocks and not success:
            blocks.append(Text(f"Error: {error or 'Unknown error'}", style="error"))
            if output:
                blocks.append(Text(output, style="muted"))
        elif not blocks:
            blocks.append(Text("No output", style="muted"))

        if truncated:
            blocks.append(Text("note: Tool output was truncated", style="warning"))

        panel = Panel(
            Group(
                *blocks
            ),
            title=title,
            title_align="left",
            subtitle=Text('done' if success else 'failed', style=status_style),
            subtitle_align="right",
            border_style=border_style,
            box=box.ROUNDED,
            padding=(0, 2)
        )

        self.console.print()
        self.console.print(panel)
