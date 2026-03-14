# Changelog

All notable changes to Codentis will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-15

### Added
- Initial stable release
- Terminal-based AI coding assistant
- Multi-platform support (Windows, macOS, Linux)
- Intelligent file operations (read, write, edit, patch)
- Shell command execution with permission system
- Web search and content fetching
- Context-aware thinking indicators
- Expandable tool outputs with unique colors per tool
- Streaming markdown rendering
- Auto-update checker
- Loop detection for repeated failures
- Workspace trust system
- Multiple AI provider support (OpenAI, Anthropic, OpenRouter)

### Changed
- Upgraded to stable 1.0.0 release
- Improved Windows command handling for paths with spaces
- Enhanced permission system with automatic execution after approval
- Better loop detection (only triggers on failures, not successes)

### Fixed
- Windows shell commands with quoted paths
- Tool output spacing and formatting
- Markdown rendering in terminal
- Loop detection false positives

## [0.1.0] - 2024-01-XX

### Added
- Initial release of Codentis as a production-grade CLI application
- Interactive terminal UI with Rich-based rendering
- Support for multiple AI providers (OpenAI, OpenRouter, Anthropic, Custom)
- First-run setup wizard for easy configuration
- Configuration management system with JSON and TOML support
- Professional CLI interface built with Typer
- `codentis chat` - Interactive and single-prompt modes
- `codentis config` - Configuration management
- `codentis doctor` - System diagnostics
- `codentis version` - Version information
- Modular architecture with clear separation of concerns
- Async agent loop with streaming responses
- Comprehensive tool system (file operations, shell, web search/fetch)
- Project-specific configuration support
- Logging system with file and console handlers
- Installation via pip with proper package structure
- Comprehensive documentation (README, INSTALL, QUICKSTART, ARCHITECTURE)

### Changed
- Restructured project into proper Python package (`codentis/`)
- Migrated from .env to JSON-based configuration
- Updated all imports to use package namespace
- Enhanced error handling and graceful degradation

### Fixed
- Import path issues across all modules
- Configuration loading hierarchy
- CLI entry point registration

## [Unreleased]

### Planned
- Repository analysis mode (`codentis repo`)
- Enhanced in-chat commands (/help, /config, /model)
- Test suite with pytest
- CI/CD pipeline
- PyPI publication
- Docker support
- Plugin system for custom tools
- Multi-session management
- Conversation history and replay
