#!/usr/bin/env python3
"""
Update pyproject.toml version from environment variable.
"""

import os
import re
from pathlib import Path

def get_version():
    """Get version from environment variable or .env file."""
    # First try environment variable
    version = os.getenv('VERSION')
    if version:
        return version.strip('v')  # Remove 'v' prefix if present
    
    # Try to read from .env file
    env_file = Path(__file__).parent.parent / '.env'
    if env_file.exists():
        try:
            with open(env_file, 'r') as f:
                for line in f:
                    if line.startswith('VERSION='):
                        version = line.split('=', 1)[1].strip().strip("'\"")
                        return version.strip('v')  # Remove 'v' prefix if present
        except Exception:
            pass
    
    # Default fallback
    return "1.1.0"

def update_pyproject_version():
    """Update pyproject.toml with the current version."""
    version = get_version()
    pyproject_file = Path(__file__).parent.parent / 'pyproject.toml'
    
    if not pyproject_file.exists():
        print(f"Error: {pyproject_file} not found")
        return False
    
    # Read the file
    with open(pyproject_file, 'r') as f:
        content = f.read()
    
    # Replace the version line
    content = re.sub(
        r'^version\s*=\s*["\'][^"\']*["\']',
        f'version = "{version}"',
        content,
        flags=re.MULTILINE
    )
    
    # Write back
    with open(pyproject_file, 'w') as f:
        f.write(content)
    
    print(f"Updated {pyproject_file} with version {version}")
    return True

if __name__ == "__main__":
    success = update_pyproject_version()
    exit(0 if success else 1)