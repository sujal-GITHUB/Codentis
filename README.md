# Codentis

Codentis is a high-performance CLI AI agent designed for terminal-based developers. It provides intelligent code assistance, file operations, and automated workflows through a modular agentic loop.

## Distinguishing Factors

- **Sub-Agent Delegation**: Automatically offloads complex analysis, debugging, and refactoring to specialized sub-agents with curated goal prompts.
- **Structured Tool Registry**: Features collapsible outputs with persistent IDs, allowing developers to expand only the data they need to see.
- **Workspace Security**: Implements a proactive trust system requiring explicit user approval before performing operations in new directories.
- **Provider Agnostic**: Seamlessly switches between OpenAI, Anthropic, OpenRouter, and local OpenAI-compatible endpoints.
- **Native Packaging**: Ships as standalone installers (EXE, PKG, DEB) for professional deployment beyond standard pip environments.

## Use Cases

- **Codebase Onboarding**: Build a comprehensive knowledge graph and dependency map of unfamiliar projects in a single pass.
- **Automated Code Audits**: Perform deep security and performance reviews using specialized reviewer agents before committing changes.
- **Legacy Migration**: systematically translate logic between frameworks or language versions with correctness verification.
- **Local Development**: Connect to local LLM servers for private, offline-first development workflows.

## Installation

### From Release (Recommended)
Download the latest installer for your platform from the [Releases page](https://github.com/sujal-GITHUB/Codentis/releases).

### Development
```bash
git clone https://github.com/sujal-GITHUB/Codentis.git
cd Codentis
pip install -e .
codentis
```

## Usage

Start an interactive session:
```bash
codentis
```

Run a single prompt:
```bash
codentis chat "Analyze the current project structure"
```

Common TUI commands:
- `/e <id>`: Expand specific tool output
- `/list`: Show all tool calls in session
- `/exit`: Quit the session

## Configuration

Manage settings with the config command:
```bash
codentis config --show
codentis config --reset
```

The application stores settings in `~/.codentis/config.json`. Project-specific overrides can be defined in `.agent/codentis.toml`.

## Architecture

Codentis follows a modular design:
- `agent/`: Core agent loop and session management.
- `client/`: LLM provider integrations (OpenAI, Anthropic, OpenRouter).
- `tools/`: Extensible tool registry and implementations.
- `ui/`: Terminal rendering and user interaction.

## Development

Run tests:
```bash
pytest
```

Build native installers:
```bash
python scripts/build_exe.py 64  # Windows
./scripts/build_macos.sh         # macOS
./scripts/build_linux.sh         # Linux
```

## License

This project is licensed under the MIT License.

## Acknowledgments

Inspired by modern AI-powered developer tools like Claude Code.
