#!/usr/bin/env python3
"""
Update all version references from the VERSION environment variable.
"""

import os
import subprocess
import sys
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
    return "1.2.0"

def update_website_env(version):
    """Update website environment files."""
    website_dir = Path(__file__).parent.parent / 'website'
    
    # Update .env.local (for local development)
    env_local = website_dir / '.env.local'
    with open(env_local, 'w') as f:
        f.write(f"NEXT_PUBLIC_VERSION={version}\n")
    print(f"Updated {env_local} with version {version}")
    
    # Update .env.production (for production deployment)
    env_production = website_dir / '.env.production'
    with open(env_production, 'w') as f:
        f.write(f"NEXT_PUBLIC_VERSION={version}\n")
    print(f"Updated {env_production} with version {version}")
    
    return True

def main():
    version = get_version()
    print(f"Updating all version references to: {version}")
    
    scripts_dir = Path(__file__).parent
    
    # Update pyproject.toml
    print("Updating pyproject.toml...")
    result = subprocess.run([sys.executable, scripts_dir / "update_pyproject_version.py"])
    if result.returncode != 0:
        print("Failed to update pyproject.toml")
        return False
    
    # Update website environment
    print("Updating website environment...")
    if not update_website_env(version):
        print("Failed to update website environment")
        return False
    
    print(f"✓ All version references updated to {version}")
    print("\nNote: setup.py and codentis/__init__.py now read version dynamically from environment")
    print("Note: Build scripts now use VERSION environment variable")
    print("Note: Website now uses NEXT_PUBLIC_VERSION environment variable")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)