#!/usr/bin/env python3
"""
Build Windows installer with hardcoded version.
This script reads the version directly from the Inno Setup script.
"""

import os
import subprocess
import sys
import re
from pathlib import Path

def get_version_from_iss():
    """Get version from the Inno Setup script."""
    iss_file = Path(__file__).parent / 'installer_windows.iss'
    
    if not iss_file.exists():
        print(f"Error: {iss_file} not found")
        return None
    
    with open(iss_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the version line
    match = re.search(r'#define MyAppVersion "([^"]*)"', content)
    if match:
        version = match.group(1)
        print(f"Found version in .iss file: {version}")
        return version
    
    print("Error: Could not find version in .iss file")
    return None

def build_installer():
    """Build the Windows installer using Inno Setup."""
    version = get_version_from_iss()
    if not version:
        print("Failed to get version from .iss file")
        return False
    
    print(f"Building Windows installer for version {version}")
    
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
        print(f"SUCCESS: Windows installer built successfully: Codentis-Setup-{version}.exe")
        if result.stdout:
            print("STDOUT:", result.stdout)
        return True
    else:
        print(f"ERROR: Installer build failed with return code {result.returncode}")
        if result.stdout:
            print("STDOUT:", result.stdout)
        if result.stderr:
            print("STDERR:", result.stderr)
        return False

if __name__ == "__main__":
    success = build_installer()
    sys.exit(0 if success else 1)