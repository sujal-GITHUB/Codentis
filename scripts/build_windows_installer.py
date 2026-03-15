#!/usr/bin/env python3
"""
Build Windows installer with version from environment variable.
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
        with open(env_file, 'r') as f:
            for line in f:
                if line.startswith('VERSION='):
                    version = line.split('=', 1)[1].strip().strip("'\"")
                    return version.strip('v')  # Remove 'v' prefix if present
    
    # Default fallback
    return "1.1.0"

def update_iss_file(version):
    """Update the Inno Setup script with the current version."""
    iss_file = Path(__file__).parent / 'installer_windows.iss'
    
    if not iss_file.exists():
        print(f"Error: {iss_file} not found")
        return False
    
    # Read the file
    with open(iss_file, 'r') as f:
        content = f.read()
    
    # Replace the version line
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if line.startswith('#define MyAppVersion'):
            lines[i] = f'#define MyAppVersion "{version}"'
            break
    
    # Write back
    with open(iss_file, 'w') as f:
        f.write('\n'.join(lines))
    
    print(f"Updated {iss_file} with version {version}")
    return True

def build_installer():
    """Build the Windows installer using Inno Setup."""
    version = get_version()
    print(f"Building Windows installer for version {version}")
    
    # Update the .iss file
    if not update_iss_file(version):
        return False
    
    # Check if Inno Setup is available
    iscc_paths = [
        r"C:\Program Files (x86)\Inno Setup 6\ISCC.exe",
        r"C:\Program Files\Inno Setup 6\ISCC.exe",
        "iscc.exe"  # If in PATH
    ]
    
    iscc_exe = None
    for path in iscc_paths:
        if Path(path).exists() or path == "iscc.exe":
            iscc_exe = path
            break
    
    if not iscc_exe:
        print("Error: Inno Setup Compiler (ISCC.exe) not found")
        print("Please install Inno Setup from: https://jrsoftware.org/isdl.php")
        return False
    
    # Build the installer
    iss_file = Path(__file__).parent / 'installer_windows.iss'
    cmd = [iscc_exe, str(iss_file)]
    
    print(f"Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, check=False)
    
    if result.returncode == 0:
        print(f"✓ Windows installer built successfully: Codentis-Setup-{version}.exe")
        return True
    else:
        print(f"✗ Installer build failed with return code {result.returncode}")
        return False

if __name__ == "__main__":
    success = build_installer()
    sys.exit(0 if success else 1)