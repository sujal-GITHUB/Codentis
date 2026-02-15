from rich.console import Console
from rich.theme import Theme
from rich.rule import Rule
from rich.text import Text

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