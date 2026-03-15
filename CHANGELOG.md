# Changelog

All notable changes to Codentis will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-03-15

### Added
- Centralized version management using VERSION environment variable
- Dynamic version reading from .env file across all components
- New build scripts for automated version handling:
  - `scripts/build_windows_installer.py` - Windows installer with dynamic versioning
  - `scripts/update_pyproject_version.py` - Updates pyproject.toml from environment
  - `scripts/update_all_versions.py` - Master script for version updates
- Environment variable support in build scripts for CI/CD integration

### Changed
- All build scripts now read VERSION from environment variable with fallback to .env file
- `codentis/__init__.py` now dynamically reads version from environment
- `setup.py` now dynamically reads version from environment
- Build artifacts (installers, packages) now automatically use correct version numbers
- Simplified version management - single source of truth in .env file

### Fixed
- Installer filenames now correctly reflect the actual version being released
- No more version mismatches between code and build artifacts
- Eliminated need for manual version updates across multiple files

## [1.1.0] - 2026-03-15

### Added
- Thinking indicators between tool executions to show when AI is processing
- Enhanced todo tool with better status messages and completed task tracking
- Improved ask_user tool robustness with better input validation
- Task list display shows completed tasks with checkmarks (☑) and pending tasks (☐)

### Changed
- Todo tool now shows "Adding task: [content]" instead of generic "Processing..."
- Todo list displays directly in summary for small lists without needing expansion
- Ask_user tool now handles invalid input more gracefully with clear error messages
- Shell tool permission flow now uses ask_user tool exclusively
- Removed duplicate checkmarks in todo tool display

### Fixed
- Shell tool permission system now properly integrates with ask_user workflow
- Loop detection system properly stops when user selects "Stop and let me handle it manually"
- Input validation prevents crashes from invalid user responses
- Windows command execution improved for simple commands like mkdir

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
