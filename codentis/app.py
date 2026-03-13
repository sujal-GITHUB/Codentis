import sys
import asyncio
from typing import Any
from pathlib import Path
from codentis.agent.agent import Agent
from codentis.agent.events import AgentEventType
from codentis.ui.renderer import TUI, get_console
from codentis.config import Config

console = get_console()

class CLI:
    def __init__(self, config: Config):
        self.agent : Agent | None = None
        self.config = config
        self.tui = TUI(config, console)

    def get_tool_kind(self, tool_name: str)->str | None:
        if not self.agent or not self.agent.session:
            return None
        
        tool = self.agent.session.tool_registry.get(tool_name)
        return tool.kind.value if tool else None

    async def run_single(self, message: str):
        async with Agent(self.config) as agent:
            self.agent = agent
            await self.__process_message(message)

    async def run_interactive(self):
        async with Agent(self.config) as agent:
            self.agent = agent

            # Get provider info from config
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
                    f'model: {self.agent.config.model_name}',
                    f'cwd: {self.agent.config.cwd}',
                    f'provider: {provider}',
                ]
            )

            while True:
                try:
                    user_input = await asyncio.to_thread(
                        lambda: console.input("\n[user]> [/user]")
                    )
                    user_input = user_input.strip()
                    if not user_input:
                        continue

                    if user_input.lower() in ("/exit", "/quit", "exit", "quit"):
                        break

                    # Check if user is trying to run Codentis CLI commands inside chat
                    if user_input.startswith("codentis"):
                        parts = user_input.split()
                        
                        # Handle flags
                        if len(parts) == 2 and parts[1] in ["--help", "-h", "help"]:
                            await self._run_help_command()
                            continue
                        elif len(parts) == 2 and parts[1] in ["--version", "-v"]:
                            await self._run_version_command()
                            continue
                        
                        # Handle commands
                        command = parts[1] if len(parts) > 1 else ""
                        
                        # Execute CLI commands directly
                        if command == "doctor":
                            await self._run_doctor_command()
                            continue
                        elif command == "version":
                            await self._run_version_command()
                            continue
                        elif command == "config":
                            if len(parts) > 2 and parts[2] == "--show":
                                await self._run_config_show_command()
                            else:
                                console.print(f"\n[yellow]Note:[/yellow] Configuration wizard cannot be run inside chat.")
                                console.print(f"[dim]Exit with[/dim] [cyan]/exit[/cyan] [dim]and run[/dim] [cyan]codentis config[/cyan] [dim]from your terminal.[/dim]\n")
                            continue
                        elif command in ["trust", "repo", "chat"]:
                            console.print(f"\n[yellow]Note:[/yellow] [cyan]{user_input}[/cyan] should be run from your terminal.")
                            console.print(f"[dim]Exit with[/dim] [cyan]/exit[/cyan] [dim]and run it from your command prompt.[/dim]\n")
                            continue

                    await self.__process_message(user_input)
                except asyncio.CancelledError:
                    console.print("\n[dim]Interrupted. Use /exit to quit.[/dim]")
                    continue
                except KeyboardInterrupt:
                    console.print("\n[dim]Interrupted. Use /exit to quit.[/dim]")
                    continue
                except EOFError:
                    break
        console.print("\n[dim]Goodbye![/dim]\n")
    
    async def __process_message(self, message: str):
        if not self.agent:
            return None

        assistant_streaming = False
        final_response : str | None = None

        async for event in self.agent.run(message):
            if event.type == AgentEventType.TEXT_DELTA:
                content = event.data.get("content")
                if content:
                    if not assistant_streaming:
                        self.tui.begin_assistant()
                        assistant_streaming = True
                    self.tui.stream_assistant_delta(content)
                
            elif event.type == AgentEventType.TEXT_COMPLETE:
                final_response = event.data.get("content")
                if assistant_streaming:
                    self.tui.end_assistant()
                    assistant_streaming = False
            
            elif event.type == AgentEventType.AGENT_ERROR:
                error = event.data.get("error") or "Unknown error occurred"
                console.print(f"\n[bold red]Error: {error}[/bold red]")

            elif event.type == AgentEventType.TOOL_CALL_START:
                tool_name = event.data.get("name", "unknown")
                tool_kind = self.get_tool_kind(tool_name)
                self.tui.tool_call_start(
                    event.data.get("call_id", ""), 
                    tool_name, 
                    tool_kind, 
                    event.data.get("arguments", {})
                )

            elif event.type == AgentEventType.TOOL_CALL_COMPLETE:
                tool_name = event.data.get("name", "unknown")
                tool_kind = self.get_tool_kind(tool_name)
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

        return final_response
    
    async def _run_doctor_command(self):
        """Run the doctor command directly in chat."""
        import platform
        import httpx
        from rich.table import Table
        from rich.panel import Panel
        from codentis.config.config_manager import ConfigManager
        
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
                    response = await asyncio.to_thread(
                        lambda: httpx.get(base_url.replace('/v1', '') if base_url else "https://api.openai.com", timeout=5)
                    )
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
    
    async def _run_version_command(self):
        """Run the version command directly in chat."""
        import platform
        from rich.panel import Panel
        from rich.text import Text
        from codentis import __version__
        
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
    
    async def _run_config_show_command(self):
        """Run the config --show command directly in chat."""
        from rich.table import Table
        from codentis.config.config_manager import ConfigManager
        
        config_manager = ConfigManager()
        
        if not config_manager.config_exists():
            console.print("\n[yellow]No configuration found.[/yellow]")
            console.print("Run 'codentis config --reset' to create one.\n")
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
        console.print()
    
    async def _run_help_command(self):
        """Run the help command directly in chat."""
        from rich.table import Table
        from rich.panel import Panel
        
        console.print()
        console.print(Panel(
            "[bold cyan]Codentis CLI Commands[/bold cyan]\n\n"
            "An intelligent CLI AI agent for developers",
            border_style="cyan"
        ))
        console.print()
        
        # Commands table
        commands = Table(title="Commands", show_header=True, header_style="bold cyan")
        commands.add_column("Command", style="cyan", width=20)
        commands.add_column("Description", style="white")
        
        commands.add_row("chat", "Start an interactive chat session (default)")
        commands.add_row("config", "Manage Codentis configuration")
        commands.add_row("doctor", "Run system diagnostics")
        commands.add_row("version", "Show version information")
        commands.add_row("repo", "Analyze and interact with a code repository")
        commands.add_row("trust", "Manage trusted workspaces")
        
        console.print(commands)
        console.print()
        
        # Options table
        options = Table(title="Options", show_header=True, header_style="bold cyan")
        options.add_column("Option", style="cyan", width=20)
        options.add_column("Description", style="white")
        
        options.add_row("--version, -v", "Show version")
        options.add_row("--help", "Show this help message")
        
        console.print(options)
        console.print()
        
        console.print("[dim]For detailed help on a specific command, run:[/dim]")
        console.print("[cyan]  codentis <command> --help[/cyan]")
        console.print()
