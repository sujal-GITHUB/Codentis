# Codentis Quick Start Guide

Get up and running with Codentis in 5 minutes!

## Installation

```bash
# Install from source (development)
git clone https://github.com/sujal-GITHUB/Codentis.git
cd Codentis
pip install -e .
```

## First Run

```bash
codentis
```

On first run, you'll see the setup wizard:

```
🚀 First Run Setup
┌─────────────────────────────────────────────────────────┐
│ Welcome to Codentis Setup!                              │
│                                                         │
│ Let's configure your AI provider and API credentials.  │
│ You can change these settings later by editing         │
│ ~/.codentis/config.json                                │
└─────────────────────────────────────────────────────────┘

Available AI Providers:
  openai: Official OpenAI API
  openrouter: Access multiple AI models through OpenRouter
  anthropic: Official Anthropic Claude API
  custom: Custom API endpoint (e.g., local LLM)

Select your AI provider [openrouter]: 
```

Follow the prompts to configure your API key and model.

## Basic Usage

### Interactive Chat

```bash
# Start interactive session
codentis

# Or explicitly
codentis chat
```

### Single Prompt

```bash
codentis chat "Create a Python function to calculate fibonacci numbers"
```

### Check Configuration

```bash
# Show current config
codentis config --show

# Reconfigure
codentis config --reset
```

### System Health Check

```bash
codentis doctor
```

## Example Session

```
$ codentis

                O
                |
         O  ▄▄▄███▄▄▄  O
          \▄█▀  |  ▀█▄/
          ██  \ | /  ██
     O----██----O----██----O
          ██  / | \  ██
          /▀█▀  |  ▄█▀\
         O  ▀▀▀███▀▀▀  O
                |
                O

Welcome back, User!
anthropic/claude-3.5-sonnet • API Usage • Codentis
~/projects/myapp

[user]> Create a simple Flask API with a health check endpoint

────────────────────────── Codentis ──────────────────────────

I'll create a simple Flask API with a health check endpoint for you.

☸ write_file #abc12345
  path              app.py
  content           [45 lines ☸ 892 bytes]
  create_directory  False

✔ write_file #abc12345
  app.py

  from flask import Flask, jsonify
  
  app = Flask(__name__)
  
  @app.route('/health')
  def health_check():
      return jsonify({"status": "healthy"})
  
  if __name__ == '__main__':
      app.run(debug=True)

I've created a simple Flask API with a health check endpoint at /health.
To run it, install Flask and execute: python app.py

[user]> /exit

Goodbye!
```

## Common Commands

| Command | Description |
|---------|-------------|
| `codentis` | Start interactive session |
| `codentis chat "prompt"` | Send single prompt |
| `codentis config` | Configure settings |
| `codentis config --show` | Show current config |
| `codentis doctor` | Run diagnostics |
| `codentis version` | Show version |
| `codentis --help` | Show help |

## In-Chat Commands

While in interactive mode:

- `/exit` or `/quit` - Exit the session
- `/help` - Show help (coming soon)
- `/config` - Show configuration (coming soon)

## Configuration Files

### User Config
`~/.codentis/config.json` - Global configuration

```json
{
  "provider": "openrouter",
  "api_key": "sk-or-v1-...",
  "base_url": "https://openrouter.ai/api/v1",
  "model_name": "anthropic/claude-3.5-sonnet"
}
```

### Project Config
`.agent/codentis.toml` - Project-specific settings

```toml
[model]
name = "gpt-4o"
temperature = 0.7

max_turns = 50
```

## Tips

1. **Use project configs** for team consistency
2. **Run `codentis doctor`** if you encounter issues
3. **Check logs** at `~/.local/share/codentis/codentis.log` (Linux/Mac)
4. **Use `--cwd`** to specify working directory: `codentis chat --cwd /path/to/project`

## Next Steps

- Read the full [README.md](README.md)
- Check out [ARCHITECTURE.md](ARCHITECTURE.md) to understand the design
- See [INSTALL.md](INSTALL.md) for detailed installation options

## Troubleshooting

### "Configuration Error: No API key found"
Run `codentis config` to set up your API key.

### "Import Error"
Ensure Python 3.10+ is installed: `python --version`

### "API Connection Error"
Check your internet connection and API key validity.

Run `codentis doctor` for detailed diagnostics.
