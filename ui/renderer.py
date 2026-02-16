from rich.console import Console
from rich.theme import Theme
from rich.rule import Rule
from rich.text import Text
from rich.panel import Panel
from rich.table import Table
from typing import Any, Tuple
from utils.paths import display_path_relative_to_cwd
from pathlib import Path
from rich import box

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
            ("* ", "muted"),
            (name, "tool"),
            (" ", "muted"),
            (f"#{call_id[:8]}", "muted")
        )

        display_args = dict(arguments)
        for key in ('path', 'cwd'):
            val = display_args.get(key)
            if isinstance(val, str):
                display_args[key] = str(display_path_relative_to_cwd(self.cwd, val))

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
