# Codentis Knowledge Graph

## Overview
Codentis is a sophisticated CLI AI agent for developers built with Python. It features a modular architecture with a beautiful TUI, extensible tool system, and support for multiple AI providers.

## Architecture

### Core Components

#### Entry Points
- `main.py` - Compatibility shim for old entry point
- `codentis/cli.py` - Main CLI interface with Typer
- `codentis/app.py` - Application with TUI and interactive mode

#### Agent System
- `codentis/agent/agent.py` - Main Agent class with event-driven architecture
- `codentis/agent/events.py` - Event types and agent lifecycle management
- `codentis/agent/session.py` - Session management and context handling

#### Client Layer
- `codentis/client/llm_client.py` - Async OpenAI client with retry logic
- `codentis/client/response.py` - Stream event handling and tool call parsing

#### Configuration
- `codentis/config/config.py` - Main configuration management
- `codentis/config/config_manager.py` - Config file operations
- `codentis/config/loader.py` - Configuration loading
- `codentis/config/setup_wizard.py` - Interactive setup wizard

#### Tools System
- `codentis/tools/base.py` - Base tool classes and interfaces
- `codentis/tools/registry.py` - Tool registry and management
- `codentis/tools/subagents.py` - Sub-agent system
- `codentis/tools/builtin/` - Built-in tool implementations

### UI Components
- `codentis/ui/renderer.py` - TUI rendering with collapsible outputs
- `codentis/ui/` - Terminal UI components

### Utilities
- `codentis/utils/` - Various utility modules (platform detection, updater, trust, etc.)
- `codentis/utils/errors.py` - Custom error classes
- `codentis/utils/logger.py` - Logging utilities
- `codentis/utils/paths.py` - Path utilities
- `codentis/utils/platform_info.py` - Platform detection
- `codentis/utils/text.py` - Text utilities
- `codentis/utils/updater.py` - Auto-update system
- `codentis/utils/workspace_trust.py` - Security system

## Dependencies (from pyproject.toml)

### Core Dependencies
- `openai` - OpenAI API client
- `python-dotenv` - Environment variable management
- `requests` - HTTP requests
- `click` - CLI framework
- `rich` - Rich terminal formatting
- `tiktoken` - Token counting
- `pydantic` - Data validation
- `tomli` - TOML parsing
- `platformdirs` - Platform-specific directories
- `ddgs` - DuckDuckGo search
- `httpx` - Async HTTP client
- `beautifulsoup4` - HTML parsing
- `textual` - Textual UI framework
- `typer` - CLI framework

### Development Dependencies
- `pytest` - Testing
- `black` - Code formatting
- `flake8` - Linting
- `mypy` - Type checking

## Build System

### Scripts Directory
- `scripts/build_exe.py` - PyInstaller build script
- `scripts/build_windows_installer.py` - Windows installer creation
- `scripts/build_macos.sh` - macOS build script
- `scripts/build_macos_installer.sh` - macOS installer
- `scripts/build_linux.sh` - Linux build script
- `scripts/build_linux_deb.sh` - Debian package creation
- `scripts/release_version.py` - Version management

### Build Process
1. PyInstaller creates standalone executables
2. Platform-specific installers created
3. Auto-update system checks for new versions

## Tool System

### Built-in Tools
- `read_file` - Read file contents
- `write_file` - Write to files
- `edit_file` - Edit existing files
- `apply_patch` - Apply patches
- `list_dir` - List directory contents
- `glob` - Find files by pattern
- `grep` - Search file contents
- `shell` - Execute shell commands (with permission system)
- `web_search` - Search the web
- `web_fetch` - Fetch web content
- `ask_user` - Interactive user input
- `todo` - Task management
- `memory` - Persistent memory

## Configuration Files

### Main Configuration
- `~/.codentis/config.json` - User configuration (API keys, settings)
- `.agent/codentis.toml` - Project-specific configuration

### Project Configuration
```toml
api_key = "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"
base_url = "https://openrouter.ai/api/v1"

[model]
name = "arcee-ai/trinity-large-preview:free"
temperature = 0.5
context_window = 131072
```

## Key Features

### User Experience
- Collapsible tool outputs with unique IDs
- Markdown rendering with ANSI styling
- Context-aware thinking indicators
- Color-coded tools
- Workspace trust system
- Auto-update notifications

### Security
- Workspace trust requirements
- Permission system for write operations
- API key management

### AI Integration
- Multiple providers (OpenAI, OpenRouter, Anthropic, custom)
- Streaming responses
- Tool calling with schema validation
- Loop detection and prevention

## Website Project
- `website/` - Next.js documentation site
- React/Next.js stack with Tailwind CSS
- Auto-generated documentation
- Version tracking (1.4.3)

## Platform Support
- Windows (with msvcrt for keyboard handling)
- macOS (with termios/tty)
- Linux (with termios/tty)

## Development Workflow
- Async core for high performance
- Modular architecture for extensibility
- Comprehensive testing with pytest
- Professional CLI with Typer
- Rich terminal UI with Rich library

## Key Architectural Patterns

1. **Event-Driven Architecture**: Agent events drive the entire application flow
2. **Tool Registry Pattern**: Dynamic tool registration and discovery
3. **Session Management**: Per-session context and conversation history
4. **Streaming Architecture**: Real-time response streaming with proper event handling
5. **Configuration Management**: Hierarchical config system with user/project defaults

## Security Features
- Workspace trust system
- Permission-based tool execution
- API key encryption in config
- Safe file operations with validation

## Auto-Update System
- Daily version checks
- Cached for 24 hours
- Update notifications with download links
- Version tracking in config

## Entry Points Summary
- `codentis` - Main CLI command
- `codentis chat` - Interactive chat
- `codentis config` - Configuration management
- `codentis doctor` - System diagnostics
- `codentis version` - Version info
- `codentis trust` - Workspace trust management
- `codentis repo` - Repository analysis (coming soon)