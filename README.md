# Codentis

![Python](https://img.shields.io/badge/python-3.10+-blue.svg)
![Rich](https://img.shields.io/badge/UI-Rich-purple.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Status](https://img.shields.io/badge/status-Production-brightgreen.svg)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)

**Codentis** is an intelligent, high-performance CLI AI agent designed to bring the power of LLMs directly to your terminal. Inspired by tools like Claude Code, it features a beautiful TUI with collapsible tool outputs, markdown rendering, context-aware thinking indicators, and a modular architecture for building complex agentic loop workflows.

## ✨ Key Features

### 🎨 User Experience
- **Collapsible Tool Outputs**: Tool outputs hidden by default with unique IDs, expandable via `/e <id>` command
- **Markdown Rendering**: AI responses stream with inline ANSI styling (headers, bold, lists, code)
- **Context-Aware Thinking**: Animated spinner with context-specific messages (Thinking, Writing, Executing, Searching)
- **Color-Coded Tools**: Each tool type has a unique color for easy visual identification
- **Workspace Trust**: Security system requiring explicit trust for new directories
- **Auto-Update System**: Checks for updates daily and notifies users of new releases

### 🖥️ Platform Support
- **Cross-Platform**: Windows, macOS, and Linux support with platform-specific command handling
- **Platform Detection**: Automatic OS detection stored in config for intelligent command adaptation
- **Shell Command Permissions**: Automatic detection and user approval for write operations

### 🤖 AI & Agent Features
- **Multiple AI Providers**: OpenAI, OpenRouter, Anthropic, and custom endpoints
- **Loop Detection**: Detects repeated failed tool calls and asks user for guidance
- **Interactive User Input**: `ask_user` tool for multi-choice or freeform user input
- **Agentic Loop**: Multi-turn conversations with automatic tool execution
- **Streaming Responses**: Real-time text streaming with proper markdown formatting

### 🛠️ Developer Experience
- **Modular Architecture**: Clean separation of concerns (Client, Agent, Tools, UI)
- **Extensible Tool System**: Easy to add new tools with validation and schema export
- **First-Run Setup**: Interactive configuration wizard with provider selection
- **Professional CLI**: Built with Typer for polished command-line experience
- **Async Core**: Fully asynchronous for high performance

## 📦 Installation

### Quick Install (Recommended)

Download the latest installer for your platform from the [Releases page](https://github.com/sujal-GITHUB/Codentis/releases):

**Windows:**
```bash
# Download and run Codentis-Setup-1.0.0.exe
# The installer will add Codentis to your PATH
```

**macOS:**
```bash
# Download Codentis-1.0.0-arm64.pkg (Apple Silicon) or Codentis-1.0.0-intel.pkg (Intel)
sudo installer -pkg Codentis-1.0.0-arm64.pkg -target /
```

**Linux (Debian/Ubuntu):**
```bash
# Download codentis_1.0.0_amd64.deb
sudo dpkg -i codentis_1.0.0_amd64.deb
```

### Install from PyPI

```bash
pip install codentis
codentis
```

### Development Install

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sujal-GITHUB/Codentis.git
    cd Codentis
    ```

2.  **Install in editable mode:**
    ```bash
    pip install -e .
    ```

3.  **Run the setup wizard:**
    ```bash
    codentis
    ```

The first time you run Codentis, it will guide you through configuration setup.

## 🚀 Usage

### Interactive Mode

Start an interactive chat session:

```bash
codentis
```

Or use the explicit chat command:

```bash
codentis chat
```

### Tool Output Commands

In interactive mode, tool outputs are hidden by default. Use these commands to view them:

```bash
/e <id>    # Expand specific tool output (e.g., /e 3)
/e         # Expand last tool output
/list      # List all tool calls with their IDs
/exit      # Exit the chat session
```

### Single Prompt

Send a single prompt and exit:

```bash
codentis chat "Explain quantum computing in one sentence"
```

### Configuration

Manage your configuration:

```bash
# Show current configuration
codentis config --show

# Reset and reconfigure
codentis config --reset

# Run setup wizard
codentis config
```

### System Diagnostics

Check your system health:

```bash
codentis doctor
```

### Version Information

```bash
codentis version
# or
codentis --version
```

### Workspace Trust

For security, Codentis requires explicit trust for new directories:

```bash
# Trust current directory
codentis trust add .

# List trusted workspaces
codentis trust list

# Remove trust
codentis trust remove /path/to/workspace

# Clear all trusted workspaces
codentis trust clear
```

On first access to a new directory, Codentis will prompt you to trust it before allowing file operations.

## 🔧 Configuration

Codentis stores configuration in `~/.codentis/config.json`. You can also use project-specific configuration with `.agent/codentis.toml` files.

### Supported AI Providers

- **OpenAI**: Official OpenAI API
- **OpenRouter**: Access multiple AI models through OpenRouter
- **Anthropic**: Official Anthropic Claude API
- **Custom**: Any OpenAI-compatible endpoint (e.g., local LLMs)

## 🏗️ Architecture

Codentis follows a clean, modular architecture:

```
codentis/
├── agent/          # Agent loop and event handling
├── client/         # LLM client implementation
├── config/         # Configuration management
├── context/        # Context and conversation management
├── prompts/        # System prompts
├── tools/          # Tool registry and implementations
│   └── builtin/    # Built-in tools (read, write, shell, web, etc.)
├── ui/             # Terminal UI rendering (collapsible outputs, markdown)
└── utils/          # Utilities (platform detection, updater, trust)
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed documentation.

## 🔄 Auto-Updates

Codentis automatically checks for updates once per day and notifies you when a new version is available. The update check is cached for 24 hours to minimize API calls.

When an update is available, you'll see a notification with a download link on startup.

## 🛠️ Built-in Tools

Codentis comes with a comprehensive set of built-in tools:

- **File Operations**: `read_file`, `write_file`, `edit_file`, `apply_patch`
- **Directory Operations**: `list_dir`, `glob`, `grep`
- **Shell Commands**: `shell` (with permission system for write operations)
- **Web Tools**: `web_search`, `web_fetch`
- **User Interaction**: `ask_user` (multi-choice or freeform input)
- **Task Management**: `todo` (track tasks and progress)

## 📝 Development

### Prerequisites

- Python 3.10+
- An API Key (OpenAI, OpenRouter, etc.)

### Running Tests

```bash
pytest
```

### Building Installers

Codentis supports building native installers for all platforms:

**Windows:**
```bash
python scripts/build_exe.py 64
# Creates: dist/Codentis.exe and dist/Codentis-Setup-1.0.0.exe
```

**macOS:**
```bash
./scripts/build_macos.sh
./scripts/build_macos_installer.sh
# Creates: dist/codentis and dist/Codentis-1.0.0-arm64.pkg (or -intel.pkg)
```

**Linux:**
```bash
./scripts/build_linux.sh
./scripts/build_linux_deb.sh
# Creates: dist/codentis and dist/codentis_1.0.0_amd64.deb
```

See [BUILD_INSTALLERS.md](BUILD_INSTALLERS.md) for detailed build instructions.

### GitHub Actions

Automated builds are configured via GitHub Actions:
- **Build Test**: Runs on every push to test builds on all platforms
- **Release**: Triggered by version tags (e.g., `v1.0.0`) to create releases with installers

See [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md) for setup instructions.

## 📚 Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - Detailed architecture documentation
- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
- [INSTALL.md](INSTALL.md) - Installation instructions
- [BUILD_INSTALLERS.md](BUILD_INSTALLERS.md) - Building installers
- [RELEASE_PROCESS.md](RELEASE_PROCESS.md) - Release workflow
- [CHANGELOG.md](CHANGELOG.md) - Version history

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

Inspired by Claude Code and other AI-powered developer tools.

---

**Version**: 1.0.0  
**Status**: Production Ready  
**Platform**: Windows, macOS, Linux
