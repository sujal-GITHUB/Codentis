"""Workspace trust management for Codentis."""

import json
from pathlib import Path
from typing import Set
from platformdirs import user_data_dir
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt
from rich.text import Text

console = Console()

class WorkspaceTrust:
    """Manages trusted workspace directories."""
    
    def __init__(self):
        self.data_dir = Path(user_data_dir("codentis", appauthor=False))
        self.trust_file = self.data_dir / "trusted_workspaces.json"
        self.trusted_workspaces: Set[str] = self._load_trusted()
    
    def _load_trusted(self) -> Set[str]:
        """Load trusted workspaces from file."""
        if not self.trust_file.exists():
            return set()
        
        try:
            with open(self.trust_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                return set(data.get('trusted', []))
        except Exception:
            return set()
    
    def _save_trusted(self) -> None:
        """Save trusted workspaces to file."""
        self.data_dir.mkdir(parents=True, exist_ok=True)
        
        try:
            with open(self.trust_file, 'w', encoding='utf-8') as f:
                json.dump({'trusted': list(self.trusted_workspaces)}, f, indent=2)
        except Exception:
            pass
    
    def is_trusted(self, workspace: Path) -> bool:
        """Check if a workspace is trusted."""
        workspace_str = str(workspace.resolve())
        return workspace_str in self.trusted_workspaces
    
    def add_trusted(self, workspace: Path) -> None:
        """Add a workspace to trusted list."""
        workspace_str = str(workspace.resolve())
        self.trusted_workspaces.add(workspace_str)
        self._save_trusted()
    
    def prompt_trust(self, workspace: Path) -> bool:
        """
        Prompt user to trust a workspace.
        Returns True if user trusts, False if they exit.
        """
        console.print()
        console.print("─" * 120)
        
        # Show workspace info
        info_text = Text()
        info_text.append("Accessing workspace: ", style="bold white")
        info_text.append(str(workspace), style="cyan")
        console.print(info_text)
        console.print()
        
        # Safety message
        safety_panel = Panel(
            Text.assemble(
                ("Quick safety check: ", "bold yellow"),
                ("Is this a project you created or one you trust? ", "white"),
                ("(Like your own code, a well-known open source project, or work from your team). ", "dim"),
                ("If not, take a moment to review what's in this folder first.\n\n", "dim"),
                ("Codentis'll be able to ", "white"),
                ("read, edit, and execute files", "bold red"),
                (" here.\n", "white"),
                ("Security guide", "cyan underline"),
            ),
            border_style="yellow",
            padding=(1, 2)
        )
        console.print(safety_panel)
        console.print()
        
        # Prompt for choice
        console.print("[bold]> [/bold]1. Yes, I trust this folder")
        console.print("[bold]> [/bold]2. No, exit")
        console.print()
        
        choice = Prompt.ask(
            "[bold]Enter to confirm · Esc to cancel[/bold]",
            choices=["1", "2"],
            default="1",
            show_choices=False
        )
        
        console.print("─" * 120)
        console.print()
        
        if choice == "1":
            self.add_trusted(workspace)
            return True
        else:
            return False

# Global instance
_workspace_trust = None

def get_workspace_trust() -> WorkspaceTrust:
    """Get or create the global WorkspaceTrust instance."""
    global _workspace_trust
    if _workspace_trust is None:
        _workspace_trust = WorkspaceTrust()
    return _workspace_trust

def check_workspace_trust(workspace: Path) -> bool:
    """
    Check if workspace is trusted, prompt if not.
    Returns True if trusted/approved, False if user exits.
    """
    trust = get_workspace_trust()
    
    if trust.is_trusted(workspace):
        return True
    
    return trust.prompt_trust(workspace)
