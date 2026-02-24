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
    def __init__(self, console: Console | None = None):
        self.console = console or get_console()
        self.assistant_stream_open = False
        self.tool_args_by_call_id: dict[str, dict[str, Any]] = {}
        self.cwd = Path.cwd()   

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

    def ordered_args(self, tool_name: str, args: dict[str, Any])->list[tuple[str, Any]]:
        PREFERRED_ORDER = {
            'read_file': ['path', 'offset', 'limit'],
            'write_file': ['path', 'content'],
            'search_file': ['path', 'query'],
            'execute_file': ['path', 'args']
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
            table.add_row(arg_name, str(arg_value))

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
            subtitle=Text('running...', style="dim"),
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

    def tool_call_complete(self, call_id: str, name: str, tool_kind: str | None, success: bool, output: str, error: str | None, metadata: dict[str, Any], truncated: bool)->None:
        border_style = f"tool.{tool_kind}" if tool_kind else "tool"
        status_icon = "✔" if success else "✘"
        status_style = 'success' if success else 'error'

        title = Text.assemble(
            (f"{status_icon} ", status_style),
            (name, "tool"),
            (" ", "muted"),
            (f"#{call_id[:8]}", "muted")
        )

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
                output_display = truncate_text(output, "", 240, )
                blocks.append(
                    Syntax(
                        output_display,
                        "text",
                        theme="monokai",
                        word_wrap=False
                    )
                )

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
            padding=(1, 2)
        )

        self.console.print()
        self.console.print(panel)
