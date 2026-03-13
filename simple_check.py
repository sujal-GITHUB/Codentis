#!/usr/bin/env python3
import json
from pathlib import Path
from platformdirs import user_data_dir

config_dir = Path(user_data_dir("codentis", appauthor=False))
config_file = config_dir / "config.json"

print(f"Config directory: {config_dir}")
print(f"Config file: {config_file}")
print(f"Exists: {config_file.exists()}")

if config_file.exists():
    with open(config_file, 'r') as f:
        config = json.load(f)
    print("\nConfig:")
    for k, v in config.items():
        if k == 'api_key':
            print(f"  {k}: {v[:8]}...")
        else:
            print(f"  {k}: {v}")
