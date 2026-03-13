# Codentis Installation Guide

This guide will help you install and configure Codentis on your system.

## Prerequisites

- Python 3.10 or higher
- pip (Python package installer)
- An API key from one of the supported providers:
  - OpenAI
  - OpenRouter
  - Anthropic
  - Or a custom OpenAI-compatible endpoint

## Installation Methods

### Method 1: Install from PyPI (Recommended)

Once published to PyPI, you can install Codentis with:

```bash
pip install codentis
```

### Method 2: Install from Source (Development)

1. Clone the repository:
```bash
git clone https://github.com/sujal-GITHUB/Codentis.git
cd Codentis
```

2. Install in editable mode:
```bash
pip install -e .
```

This allows you to modify the code and see changes immediately.

### Method 3: Install from Git URL

```bash
pip install git+https://github.com/sujal-GITHUB/Codentis.git
```

## Verification

After installation, verify that Codentis is installed correctly:

```bash
# Check version
codentis --version

# Run diagnostics
codentis doctor

# Or run the test script
python test_install.py
```

## First-Time Setup

When you run Codentis for the first time, it will automatically launch a setup wizard:

```bash
codentis
```

The wizard will ask you for:

1. **AI Provider**: Choose from OpenAI, OpenRouter, Anthropic, or Custom
2. **API Key**: Your API key for the selected provider
3. **Base URL**: The API endpoint (auto-filled for standard providers)
4. **Model Name**: The model to use (with sensible defaults)

Your configuration will be saved to `~/.codentis/config.json`.

## Manual Configuration

If you prefer to configure manually, you can:

### Option 1: Use the config command

```bash
# Run setup wizard
codentis config

# Show current configuration
codentis config --show

# Reset configuration
codentis config --reset
```

### Option 2: Edit config file directly

Create or edit `~/.codentis/config.json`:

```json
{
  "provider": "openrouter",
  "api_key": "your-api-key-here",
  "base_url": "https://openrouter.ai/api/v1",
  "model_name": "anthropic/claude-3.5-sonnet"
}
```

### Option 3: Use project-specific configuration

Create `.agent/codentis.toml` in your project directory:

```toml
[model]
name = "gpt-4o"
temperature = 0.7

api_key = "your-api-key"
base_url = "https://api.openai.com/v1"
```

## Configuration Hierarchy

Codentis loads configuration in this order (later sources override earlier ones):

1. User config: `~/.codentis/config.json`
2. System TOML: `~/.codentis/codentis.toml`
3. Project config: `.agent/codentis.toml`

## Troubleshooting

### Import Errors

If you see import errors, ensure you're using Python 3.10+:

```bash
python --version
```

### Missing Dependencies

Reinstall with all dependencies:

```bash
pip install --force-reinstall codentis
```

### Configuration Issues

Run diagnostics to check your setup:

```bash
codentis doctor
```

This will check:
- Python version
- Configuration file presence
- API key configuration
- API connectivity

### Permission Errors

If you get permission errors during installation, try:

```bash
pip install --user codentis
```

Or use a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install codentis
```

## Uninstallation

To remove Codentis:

```bash
pip uninstall codentis
```

To also remove configuration files:

```bash
# On Linux/Mac
rm -rf ~/.codentis

# On Windows
rmdir /s %USERPROFILE%\.codentis
```

## Next Steps

After installation:

1. Run `codentis config` to set up your API credentials
2. Run `codentis doctor` to verify everything is working
3. Run `codentis` to start your first interactive session
4. Check out the [README.md](README.md) for usage examples

## Getting Help

- Documentation: [README.md](README.md)
- Issues: https://github.com/sujal-GITHUB/Codentis/issues
- Architecture: [ARCHITECTURE.md](ARCHITECTURE.md)
