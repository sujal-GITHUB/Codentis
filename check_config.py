#!/usr/bin/env python3
"""Check configuration status."""

from pathlib import Path
from codentis.config.config_manager import ConfigManager

config_manager = ConfigManager()

print(f"Config file: {config_manager.config_file}")
print(f"Exists: {config_manager.config_exists()}")

if config_manager.config_exists():
    config = config_manager.load_config()
    print("\nConfig contents:")
    for key, value in config.items():
        if key == 'api_key':
            print(f"  {key}: {value[:8]}...")
        else:
            print(f"  {key}: {value}")
else:
    print("\nNo config file found!")
