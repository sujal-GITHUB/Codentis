"""Codentis - An intelligent CLI AI agent for developers."""

import os
from pathlib import Path

def _get_version():
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
    return "1.3.4"

__version__ = _get_version()
__author__ = "Codentis Team"
__description__ = "An intelligent, high-performance CLI AI agent designed to bring the power of LLMs directly to your terminal."
