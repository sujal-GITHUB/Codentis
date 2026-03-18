"""Setup wizard for first-run configuration."""
from rich.console import Console
from rich.prompt import Prompt, Confirm
from rich.panel import Panel
from rich.text import Text
from typing import Dict, Any, Optional
from pathlib import Path
from codentis.config.config_manager import ConfigManager
from codentis.config.loader import get_system_config_path, get_project_config, parse_toml
import logging

console = Console()
logger = logging.getLogger(__name__)

PROVIDERS = {
    "openai": {
        "name": "OpenAI",
        "base_url": "https://api.openai.com/v1",
        "default_model": "gpt-4o",
        "description": "Official OpenAI API"
    },
    "openrouter": {
        "name": "OpenRouter",
        "base_url": "https://openrouter.ai/api/v1",
        "default_model": "anthropic/claude-3.5-sonnet",
        "description": "Access multiple AI models through OpenRouter"
    },
    "anthropic": {
        "name": "Anthropic",
        "base_url": "https://api.anthropic.com/v1",
        "default_model": "claude-3-5-sonnet-20241022",
        "description": "Official Anthropic Claude API"
    },
    "custom": {
        "name": "Custom",
        "base_url": None,
        "default_model": None,
        "description": "Custom API endpoint (e.g., local LLM)"
    }
}

def load_existing_toml_config(cwd: Optional[Path] = None) -> Optional[Dict[str, Any]]:
    """
    Try to load existing configuration from TOML files.
    Checks system-level and project-level configs.
    """
    config_data = {}
    
    # Check system-level config
    system_config_path = get_system_config_path()
    if system_config_path.exists():
        try:
            toml_data = parse_toml(system_config_path)
            config_data.update(toml_data)
            console.print(f"[dim]Found system config: {system_config_path}[/dim]")
        except Exception as e:
            logger.warning(f"Could not load system config: {e}")
    
    # Check project-level config
    if cwd:
        project_config_path = get_project_config(cwd)
        if project_config_path:
            try:
                toml_data = parse_toml(project_config_path)
                # Merge project config (overrides system)
                for key, value in toml_data.items():
                    if isinstance(value, dict) and key in config_data and isinstance(config_data[key], dict):
                        config_data[key].update(value)
                    else:
                        config_data[key] = value
                console.print(f"[dim]Found project config: {project_config_path}[/dim]")
            except Exception as e:
                logger.warning(f"Could not load project config: {e}")
    
    return config_data if config_data else None

def run_setup_wizard(cwd: Optional[Path] = None) -> Dict[str, Any]:
    """Run the interactive setup wizard."""
    
    try:
        # Display ASCII art banner
        banner = """
 ██████╗  ██████╗ ██████╗ ███████╗███╗   ██╗████████╗██╗███████╗
██╔════╝ ██╔═══██╗██╔══██╗██╔════╝████╗  ██║╚══██╔══╝██║██╔════╝
██║      ██║   ██║██║  ██║█████╗  ██╔██╗ ██║   ██║   ██║███████╗
██║      ██║   ██║██║  ██║██╔══╝  ██║╚██╗██║   ██║   ██║╚════██║
╚██████╗ ╚██████╔╝██████╔╝███████╗██║ ╚████║   ██║   ██║███████║
 ╚═════╝  ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝╚══════╝
"""
        console.print(banner, style="bold cyan")
        console.print()
        
        # Try to load existing TOML config
        existing_config = load_existing_toml_config(cwd)
        
        if existing_config:
            console.print(Panel(
                Text.assemble(
                    ("Found existing configuration!\n\n", "bold cyan"),
                    ("We found API keys in your codentis.toml file.\n", "white"),
                    ("We'll use those settings and just need a few more details.\n", "dim"),
                ),
                title="Setup Wizard",
                border_style="bold cyan"
            ))
        else:
            console.print(Panel(
                Text.assemble(
                    ("Welcome to Codentis Setup!\n\n", "bold cyan"),
                    ("Let's configure your AI provider and API credentials.\n", "white"),
                    ("You can change these settings later by editing ", "dim"),
                    ("~/.codentis/config.json", "bold dim"),
                ),
                title="🚀 First Run Setup",
                border_style="bold cyan"
            ))
        console.print()
        
        # Extract existing values
        existing_api_key = existing_config.get('api_key') if existing_config else None
        existing_base_url = existing_config.get('base_url') if existing_config else None
        existing_model = None
        if existing_config and 'model' in existing_config:
            if isinstance(existing_config['model'], dict):
                existing_model = existing_config['model'].get('name')
            else:
                existing_model = existing_config.get('model')
        
        # Detect provider from base_url
        detected_provider = None
        if existing_base_url:
            if "openrouter" in existing_base_url:
                detected_provider = "openrouter"
            elif "anthropic" in existing_base_url:
                detected_provider = "anthropic"
            elif "openai" in existing_base_url:
                detected_provider = "openai"
            else:
                detected_provider = "custom"
        
        # Select provider
        console.print("[bold]Available AI Providers:[/bold]")
        for key, provider in PROVIDERS.items():
            console.print(f"  [cyan]{key}[/cyan]: {provider['description']}")
        console.print()
        
        if detected_provider:
            console.print(f"[dim]Detected provider from config: {detected_provider}[/dim]")
        
        provider_choice = Prompt.ask(
            "Select your AI provider",
            choices=list(PROVIDERS.keys()),
            default=detected_provider or "openrouter"
        )
        
        provider_info = PROVIDERS[provider_choice]
        config: Dict[str, Any] = {
            "provider": provider_choice
        }
        
        # Get API key (use existing if available)
        console.print()
        if existing_api_key:
            use_existing = Confirm.ask(
                f"[bold]Use existing API key from config?[/bold] ({existing_api_key[:8]}...)",
                default=True
            )
            if use_existing:
                config["api_key"] = existing_api_key
                console.print("[green]✓[/green] Using existing API key")
            else:
                api_key = Prompt.ask(
                    f"[bold]Enter your {provider_info['name']} API key[/bold]",
                    password=True
                )
                config["api_key"] = api_key
        else:
            api_key = Prompt.ask(
                f"[bold]Enter your {provider_info['name']} API key[/bold]",
                password=True
            )
            config["api_key"] = api_key
        
        # Get base URL
        if provider_choice == "custom":
            console.print()
            default_url = existing_base_url or "http://localhost:11434/v1"
            base_url = Prompt.ask(
                "[bold]Enter your custom API base URL[/bold]",
                default=default_url
            )
            config["base_url"] = base_url
        else:
            config["base_url"] = provider_info["base_url"]
        
        # Get model name
        console.print()
        default_model = existing_model or provider_info["default_model"]
        if default_model:
            model_name = Prompt.ask(
                "[bold]Enter model name[/bold]",
                default=default_model
            )
        else:
            model_name = Prompt.ask("[bold]Enter model name[/bold]")
        
        config["model_name"] = model_name
        
        # Save configuration
        console.print()
        config_manager = ConfigManager()
        config_manager.save_config(config)
        
        console.print()
        console.print(Panel(
            Text.assemble(
                ("✓ Configuration saved successfully!\n\n", "bold green"),
                ("Provider: ", "dim"), (f"{provider_info['name']}\n", "white"),
                ("Model: ", "dim"), (f"{model_name}\n", "white"),
                ("Config file: ", "dim"), (f"{config_manager.config_file}\n\n", "bold white"),
                ("You can now start using Codentis by running: ", "dim"),
                ("codentis", "bold cyan"),
            ),
            title="Setup Complete",
            border_style="green"
        ))
        console.print()
        
        return config
    
    except KeyboardInterrupt:
        # Handle Ctrl+C during setup wizard
        console.print("\n[yellow]Setup cancelled. You can run 'codentis config' to set up later.[/yellow]")
        raise  # Re-raise to let CLI handle it

def check_and_run_setup(cwd: Optional[Path] = None) -> Dict[str, Any]:
    """Check if setup is needed and run wizard if necessary."""
    config_manager = ConfigManager()
    
    if not config_manager.config_exists():
        return run_setup_wizard(cwd)
    
    return config_manager.load_config()
