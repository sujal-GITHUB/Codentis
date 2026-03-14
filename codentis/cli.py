"""CLI interface for Codentis."""
import sys
import asyncio
import typer
from pathlib import Path
from typing import Optional

from codentis import __version__
from codentis.config import load_config
from codentis.config.setup_wizard import check_and_run_setup
from codentis.config.config_manager import ConfigManager
from codentis.app import CLI
from codentis.utils.errors import ConfigError
from codentis.utils.workspace_trust import check_workspace_trust
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.text import Text

console = Console()

app = typer.Typer(
    name="codentis",
    help="An intelligent CLI AI agent for developers",
    add_completion=False
)

def handle_exception(e: Exception) -> None:
    """Handle exceptions gracefully."""
    import traceback
    print(f"\nError: {str(e)}")
    if isinstance(e, ConfigError):
        print("\nRun 'codentis config' to reconfigure.")
    
    # Show traceback in debug mode
    import os
    if os.environ.get('CODENTIS_DEBUG'):
        print("\nTraceback:")
        traceback.print_exc()
    
    sys.exit(1)

@app.command()
def chat(
    prompt: Optional[str] = typer.Argument(None, help="Optional prompt to send to the agent"),
    cwd: Optional[str] = typer.Option(None, "--cwd", help="Working directory"),
):
    """
    Start an interactive chat session with the AI agent (default command).
    """
    # Check for updates (once per day)
    try:
        from codentis.utils.updater import check_for_updates, should_check_for_updates, mark_update_checked
        
        if should_check_for_updates():
            update_info = check_for_updates()
            if update_info:
                console.print()
                console.print(Panel(
                    f"[bold cyan]New version available: v{update_info['version']}[/bold cyan]\n\n"
                    f"[dim]Current version: v{__version__}[/dim]\n\n"
                    f"Download: [link]{update_info.get('download_url') or update_info['url']}[/link]\n\n"
                    f"[dim]Run 'codentis version' to see release notes[/dim]",
                    title="[bold yellow]⚠ Update Available[/bold yellow]",
                    border_style="yellow"
                ))
                console.print()
            mark_update_checked()
    except Exception:
        pass  # Silently fail - don't interrupt user experience
    try:
        # Resolve working directory
        if cwd:
            cwd_path = Path(cwd).resolve()
            if not cwd_path.exists():
                print(f"Error: Directory does not exist: {cwd}")
                sys.exit(1)
            if not cwd_path.is_dir():
                print(f"Error: Not a directory: {cwd}")
                sys.exit(1)
        else:
            cwd_path = Path.cwd()
        
        # Check workspace trust
        if not check_workspace_trust(cwd_path):
            print("Workspace not trusted. Exiting.")
            sys.exit(0)
        
        # Check and run setup if needed
        user_config = check_and_run_setup(cwd_path)
        
        # Load full configuration
        config = load_config(cwd_path)
        
        # Validate configuration
        errors = config.validate()
        if errors:
            print("Configuration errors:")
            for error in errors:
                print(f"  • {error}")
            print("\nRun 'codentis config' to reconfigure.")
            sys.exit(1)
        
        # Run the agent
        cli = CLI(config)
        if prompt:
            asyncio.run(cli.run_single(prompt))
        else:
            asyncio.run(cli.run_interactive())
            
    except KeyboardInterrupt:
        print("\nInterrupted by user.")
        sys.exit(0)
    except Exception as e:
        handle_exception(e)

@app.command()
def config(
    show: bool = typer.Option(False, "--show", help="Show current configuration"),
    reset: bool = typer.Option(False, "--reset", help="Reset configuration and run setup wizard"),
):
    """
    Manage Codentis configuration.
    """
    try:
        config_manager = ConfigManager()
        
        if reset:
            if config_manager.config_exists():
                config_manager.config_file.unlink()
                console.print("[green]✓[/green] Configuration reset.")
            from codentis.config.setup_wizard import run_setup_wizard
            run_setup_wizard()
            return
        
        if show:
            if not config_manager.config_exists():
                console.print("[yellow]No configuration found.[/yellow]")
                console.print("Run 'codentis config --reset' to create one.")
                return
            
            cfg = config_manager.load_config()
            table = Table(title="Current Configuration", show_header=True)
            table.add_column("Setting", style="cyan")
            table.add_column("Value", style="white")
            
            for key, value in cfg.items():
                if key == "api_key":
                    value = f"{value[:8]}..." if value else "Not set"
                table.add_row(key, str(value))
            
            console.print()
            console.print(table)
            console.print(f"\n[dim]Config file: {config_manager.config_file}[/dim]")
            return
        
        # Default: run setup wizard
        from codentis.config.setup_wizard import run_setup_wizard
        run_setup_wizard()
        
    except Exception as e:
        handle_exception(e)

@app.command()
def doctor():
    """
    Run diagnostics to check system health and configuration.
    """
    import platform
    import httpx
    
    console.print()
    console.print(Panel(
        "[bold cyan]Running Codentis diagnostics...[/bold cyan]",
        border_style="cyan"
    ))
    console.print()
    
    results = Table(show_header=True, header_style="bold")
    results.add_column("Check", style="cyan", width=30)
    results.add_column("Status", width=15)
    results.add_column("Details", style="dim")
    
    # Check Python version
    py_version = platform.python_version()
    py_ok = sys.version_info >= (3, 10)
    results.add_row(
        "Python Version",
        "[green]✓ OK[/green]" if py_ok else "[red]✗ FAIL[/red]",
        f"{py_version} {'(>= 3.10 required)' if not py_ok else ''}"
    )
    
    # Check configuration
    config_manager = ConfigManager()
    config_exists = config_manager.config_exists()
    results.add_row(
        "Configuration File",
        "[green]✓ OK[/green]" if config_exists else "[yellow]⚠ MISSING[/yellow]",
        str(config_manager.config_file)
    )
    
    # Check API key
    if config_exists:
        api_key = config_manager.get_api_key()
        has_key = bool(api_key)
        results.add_row(
            "API Key",
            "[green]✓ OK[/green]" if has_key else "[red]✗ MISSING[/red]",
            f"{api_key[:8]}..." if has_key else "Not configured"
        )
        
        # Check API connectivity
        if has_key:
            base_url = config_manager.get_base_url()
            try:
                # Simple connectivity check
                response = httpx.get(base_url.replace('/v1', '') if base_url else "https://api.openai.com", timeout=5)
                api_ok = response.status_code < 500
                results.add_row(
                    "API Connectivity",
                    "[green]✓ OK[/green]" if api_ok else "[yellow]⚠ WARN[/yellow]",
                    base_url or "Default"
                )
            except Exception as e:
                results.add_row(
                    "API Connectivity",
                    "[yellow]⚠ WARN[/yellow]",
                    f"Could not connect: {str(e)[:40]}"
                )
    else:
        results.add_row(
            "API Key",
            "[red]✗ MISSING[/red]",
            "Run 'codentis config' to set up"
        )
    
    # Check working directory
    cwd = Path.cwd()
    results.add_row(
        "Working Directory",
        "[green]✓ OK[/green]",
        str(cwd)
    )
    
    console.print(results)
    console.print()
    
    if not config_exists:
        console.print("[yellow]⚠ Configuration not found. Run 'codentis config' to set up.[/yellow]")
    elif not py_ok:
        console.print("[red]✗ Python 3.10+ is required.[/red]")
    else:
        console.print("[green]✓ All checks passed! You're ready to use Codentis.[/green]")
    
    console.print()

@app.command()
def version():
    """
    Show Codentis version information.
    """
    import platform
    
    console.print()
    console.print(Panel(
        Text.assemble(
            ("Codentis ", "bold cyan"),
            (f"v{__version__}\n\n", "white"),
            ("An intelligent CLI AI agent for developers\n", "dim"),
            ("Python ", "dim"), (f"{platform.python_version()}", "white"),
        ),
        border_style="cyan"
    ))
    console.print()

@app.command()
def repo(
    cwd: Optional[str] = typer.Option(None, "--cwd", help="Repository directory"),
):
    """
    Analyze and interact with a code repository.
    """
    # Resolve working directory
    if cwd:
        cwd_path = Path(cwd).resolve()
        if not cwd_path.exists():
            console.print(f"[bold red]Error:[/bold red] Directory does not exist: {cwd}")
            sys.exit(1)
        if not cwd_path.is_dir():
            console.print(f"[bold red]Error:[/bold red] Not a directory: {cwd}")
            sys.exit(1)
    else:
        cwd_path = Path.cwd()
    
    console.print(f"[yellow]Repository mode coming soon![/yellow]")
    console.print(f"[dim]Working directory: {cwd_path}[/dim]")

@app.command()
def trust(
    action: Optional[str] = typer.Argument(None, help="Action: list, add, remove, clear"),
    path: Optional[str] = typer.Argument(None, help="Workspace path (for add/remove)"),
):
    """
    Manage trusted workspaces.
    
    Actions:
    - list: Show all trusted workspaces
    - add <path>: Add a workspace to trusted list
    - remove <path>: Remove a workspace from trusted list
    - clear: Clear all trusted workspaces
    """
    from codentis.utils.workspace_trust import get_workspace_trust
    
    trust_manager = get_workspace_trust()
    
    if not action or action == "list":
        # List trusted workspaces
        if not trust_manager.trusted_workspaces:
            console.print("[yellow]No trusted workspaces.[/yellow]")
            console.print("\n[dim]Workspaces are automatically added when you approve them on first use.[/dim]")
            return
        
        console.print("\n[bold]Trusted Workspaces:[/bold]\n")
        for workspace in sorted(trust_manager.trusted_workspaces):
            console.print(f"  • {workspace}")
        console.print()
        
    elif action == "add":
        if not path:
            console.print("[red]Error: Path required for 'add' action[/red]")
            console.print("Usage: codentis trust add <path>")
            sys.exit(1)
        
        workspace_path = Path(path).resolve()
        if not workspace_path.exists():
            console.print(f"[red]Error: Path does not exist: {path}[/red]")
            sys.exit(1)
        
        trust_manager.add_trusted(workspace_path)
        console.print(f"[green]✓[/green] Added to trusted workspaces: {workspace_path}")
        
    elif action == "remove":
        if not path:
            console.print("[red]Error: Path required for 'remove' action[/red]")
            console.print("Usage: codentis trust remove <path>")
            sys.exit(1)
        
        workspace_path = Path(path).resolve()
        workspace_str = str(workspace_path)
        
        if workspace_str in trust_manager.trusted_workspaces:
            trust_manager.trusted_workspaces.remove(workspace_str)
            trust_manager._save_trusted()
            console.print(f"[green]✓[/green] Removed from trusted workspaces: {workspace_path}")
        else:
            console.print(f"[yellow]Workspace not in trusted list: {workspace_path}[/yellow]")
    
    elif action == "clear":
        if trust_manager.trusted_workspaces:
            trust_manager.trusted_workspaces.clear()
            trust_manager._save_trusted()
            console.print("[green]✓[/green] Cleared all trusted workspaces")
        else:
            console.print("[yellow]No trusted workspaces to clear.[/yellow]")
    
    else:
        console.print(f"[red]Error: Unknown action '{action}'[/red]")
        console.print("\nValid actions: list, add, remove, clear")
        sys.exit(1)

@app.callback(invoke_without_command=True)
def main(
    ctx: typer.Context,
    version_flag: bool = typer.Option(False, "--version", "-v", help="Show version"),
):
    """
    Codentis - An intelligent CLI AI agent for developers.
    
    Run without arguments to start an interactive chat session.
    """
    if version_flag:
        console.print(f"Codentis v{__version__}")
        raise typer.Exit()
    
    if ctx.invoked_subcommand is None:
        # Default to chat command with no arguments
        chat(prompt=None, cwd=None)

def run():
    """Entry point for the CLI."""
    try:
        app()
    except KeyboardInterrupt:
        console.print("\n[dim]Goodbye![/dim]")
        sys.exit(0)
    except Exception as e:
        import traceback
        console.print(f"\n[bold red]Unexpected error:[/bold red] {str(e)}")
        console.print("\n[dim]Full traceback:[/dim]")
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    run()
