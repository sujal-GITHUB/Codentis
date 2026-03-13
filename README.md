# Codentis

![Python](https://img.shields.io/badge/python-3.10+-blue.svg)
![Rich](https://img.shields.io/badge/UI-Rich-purple.svg)
![Status](https://img.shields.io/badge/status-Alpha-orange.svg)

**Codentis** is an intelligent, high-performance CLI AI agent designed to bring the power of LLMs directly to your terminal. Inspired by tools like Claude Code, it features a beautiful TUI, robust error handling, and a modular architecture for building complex agentic loop workflows.

## Features

- **Interactive Terminal UI**: Beautiful Rich-based interface with streaming responses
- **Multiple AI Providers**: Support for OpenAI, OpenRouter, Anthropic, and custom endpoints
- **Modular Design**: Clear separation of concerns:
  - **Client**: Handles LLM communication (OpenAI-compatible)
  - **Agent**: Manages state, context, and the agentic loop
  - **Tools**: Extensible tool system for file operations, shell commands, and more
  - **UI**: Handles rendering and user interaction
- **Async Core**: Fully asynchronous implementation for high performance
- **First-Run Setup**: Interactive configuration wizard
- **Professional CLI**: Built with Typer for a polished command-line experience

## Installation

### Quick Install

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

## Usage

### Interactive Mode

Start an interactive chat session:

```bash
codentis
```

Or use the explicit chat command:

```bash
codentis chat
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

## Configuration

Codentis stores configuration in `~/.codentis/config.json`. You can also use project-specific configuration with `.agent/codentis.toml` files.

### Supported AI Providers

- **OpenAI**: Official OpenAI API
- **OpenRouter**: Access multiple AI models through OpenRouter
- **Anthropic**: Official Anthropic Claude API
- **Custom**: Any OpenAI-compatible endpoint (e.g., local LLMs)

## Architecture

Codentis follows a clean, modular architecture:

```
codentis/
├── agent/          # Agent loop and event handling
├── client/         # LLM client implementation
├── config/         # Configuration management
├── context/        # Context and conversation management
├── prompts/        # System prompts
├── tools/          # Tool registry and implementations
├── ui/             # Terminal UI rendering
└── utils/          # Utility functions
```

## Development

### Prerequisites

- Python 3.10+
- An API Key (OpenAI, OpenRouter, etc.)

### Running Tests

```bash
pytest
```

### Building

```bash
python -m build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

Inspired by Claude Code and other AI-powered developer tools.
