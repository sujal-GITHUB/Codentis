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
    with open(iss_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the version line - be more specific with the pattern
    lines = content.split('\n')
    updated = False
    for i, line in enumerate(lines):
        if line.strip().startswith('#define MyAppVersion'):
            old_line = lines[i]
            lines[i] = f'#define MyAppVersion "{version}"'
            print(f"Updated line {i+1}: '{old_line.strip()}' -> '{lines[i]}'")
            updated = True
            break
    
    if not updated:
        print("Warning: Could not find #define MyAppVersion line to update")
        return False
    
    # Write back with explicit encoding
    with open(iss_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    
    print(f"Successfully updated {iss_file} with version {version}")
    return True

def build_installer():
    """Build the Windows installer using Inno Setup."""
    version = get_version()
    print(f"Building Windows installer for version {version}")
    print(f"VERSION environment variable: {os.getenv('VERSION')}")
    
    # Update the .iss file
    if not update_iss_file(version):
        print("Failed to update .iss file")
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
            print(f"Found Inno Setup at: {path}")
            break
    
    if not iscc_exe:
        print("Error: Inno Setup Compiler (ISCC.exe) not found")
        print("Please install Inno Setup from: https://jrsoftware.org/isdl.php")
        return False
    
    # Build the installer
    iss_file = Path(__file__).parent / 'installer_windows.iss'
    cmd = [iscc_exe, str(iss_file)]
    
    print(f"Running: {' '.join(cmd)}")
    print(f"Working directory: {Path.cwd()}")
    
    result = subprocess.run(cmd, check=False, capture_output=True, text=True)
    
    if result.returncode == 0:
        print(f"✓ Windows installer built successfully: Codentis-Setup-{version}.exe")
        print("STDOUT:", result.stdout)
        return True
    else:
        print(f"✗ Installer build failed with return code {result.returncode}")
        print("STDOUT:", result.stdout)
        print("STDERR:", result.stderr)
        return False

if __name__ == "__main__":
    success = build_installer()
    sys.exit(0 if success else 1)