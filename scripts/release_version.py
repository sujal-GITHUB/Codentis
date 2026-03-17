#!/usr/bin/env python3
"""
Release Version Script - Updates all version numbers across the project.
Usage: python scripts/release_version.py 1.3.1
"""

import os
import sys
import re
from pathlib import Path
from datetime import datetime

def get_project_root():
    """Get the project root directory regardless of where the script is run from."""
    script_dir = Path(__file__).parent
    if script_dir.name == 'scripts':
        return script_dir.parent
    return script_dir

def update_env_file(version, project_root):
    """Update root .env file with new version."""
    env_file = project_root / '.env'
    if not env_file.exists():
        print(f"Creating {env_file}")
        with open(env_file, 'w') as f:
            f.write(f'VERSION={version}\n')
        return True
    
    with open(env_file, 'r') as f:
        content = f.read()
    
    if 'VERSION=' in content:
        content = re.sub(r'VERSION=.*', f'VERSION={version}', content)
    else:
        content += f'\nVERSION={version}\n'
    
    with open(env_file, 'w') as f:
        f.write(content)
    
    print(f"✓ Updated {env_file}")
    return True

def update_pyproject_toml(version, project_root):
    """Update pyproject.toml version."""
    file_path = project_root / 'pyproject.toml'
    if not file_path.exists():
        print(f"Warning: {file_path} not found")
        return False
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    content = re.sub(r'version = "[^"]*"', f'version = "{version}"', content)
    
    with open(file_path, 'w') as f:
        f.write(content)
    
    print(f"✓ Updated {file_path}")
    return True

def update_codentis_init(version, project_root):
    """Update codentis/__init__.py version and fallback."""
    file_path = project_root / 'codentis' / '__init__.py'
    if not file_path.exists():
        print(f"Warning: {file_path} not found")
        return False
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    content = re.sub(r'__version__ = ["\'][^"\']*["\']', f'__version__ = "{version}"', content)
    content = re.sub(r'return "\d+\.\d+\.\d+"', f'return "{version}"', content)
    
    with open(file_path, 'w') as f:
        f.write(content)
    
    print(f"✓ Updated {file_path}")
    return True

def update_setup_py(version, project_root):
    """Update setup.py version and fallback."""
    file_path = project_root / 'setup.py'
    if not file_path.exists():
        print(f"Warning: {file_path} not found")
        return False
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    content = re.sub(r'version=["\'][^"\']*["\']', f'version="{version}"', content)
    content = re.sub(r'return "\d+\.\d+\.\d+"', f'return "{version}"', content)
    
    with open(file_path, 'w') as f:
        f.write(content)
    
    print(f"✓ Updated {file_path}")
    return True

def update_inno_setup_script(version, project_root):
    """Update Inno Setup script version."""
    file_path = project_root / 'scripts' / 'installer_windows.iss'
    if not file_path.exists():
        print(f"Warning: {file_path} not found")
        return False
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = re.sub(r'#define MyAppVersion "[^"]*"', f'#define MyAppVersion "{version}"', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Updated {file_path}")
    return True

def update_website_files(version, project_root):
    """Update website files with version numbers and descriptive text."""
    files_to_update = [
        project_root / 'website' / 'app' / 'download' / 'page.tsx',
        project_root / 'website' / 'app' / 'docs' / 'page.tsx'
    ]
    
    for file_path in files_to_update:
        if not file_path.exists():
            print(f"Warning: {file_path} not found")
            continue
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 1. Update const VERSION = 'X.X.X';
        content = re.sub(r"const VERSION = '[^']*';", f"const VERSION = '{version}';", content)
        
        # 2. Update Codentis vX.X.X (plain text)
        content = re.sub(r"Codentis v\d+\.\d+\.\d+", f"Codentis v{version}", content)
        
        # 3. Update Codentis-Setup-{'X.X.X'}.exe (React curly brace format)
        content = re.sub(r"Codentis-Setup-\{'?\d+\.\d+\.\d+'?\}", f"Codentis-Setup-{{'{version}'}}", content)
        
        # 4. Update Codentis-Setup-X.X.X.exe (plain text)
        content = re.sub(r"Codentis-Setup-\d+\.\d+\.\d+\.exe", f"Codentis-Setup-{version}.exe", content)
        
        # 5. Update generic version numbers in path-like strings (e.g. codentis_1.3.1_amd64.deb)
        content = re.sub(r"codentis_\d+\.\d+\.\d+", f"codentis_{version}", content)
        content = re.sub(r"Codentis-\d+\.\d+\.\d+", f"Codentis-{version}", content)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ Updated {file_path}")
    
    return True

def update_documentation_files(version, project_root):
    """Update version mentions in README and other documentation."""
    docs = [
        project_root / 'README.md',
        project_root / 'ARCHITECTURE.md',
        project_root / 'QUICKSTART.md',
        project_root / 'BUILD_INSTALLERS.md',
        project_root / 'USER_INSTALL_GUIDE.md',
        project_root / 'RELEASE_PROCESS.md',
        project_root / 'RELEASE_GUIDE.md',
        project_root / 'GITHUB_ACTIONS_SETUP.md'
    ]
    
    for doc in docs:
        if not doc.exists():
            print(f"Warning: {doc} not found")
            continue
            
        with open(doc, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Update badge versions (e.g. version-1.2.0-green.svg)
        content = re.sub(r"version-\d+\.\d+\.\d+-green\.svg", f"version-{version}-green.svg", content)
        
        # Update "Version: 1.2.0" pattern
        content = re.sub(r"Version: \d+\.\d+\.\d+", f"Version: {version}", content)
        content = re.sub(r"\*\*Version\*\*: \d+\.\d+\.\d+", f"**Version**: {version}", content)
        
        # Update installer filename mentions
        content = re.sub(r"Codentis-Setup-\d+\.\d+\.\d+\.exe", f"Codentis-Setup-{version}.exe", content)
        content = re.sub(r"Codentis-\d+\.\d+\.\d+-arm64\.pkg", f"Codentis-{version}-arm64.pkg", content)
        content = re.sub(r"Codentis-\d+\.\d+\.\d+-intel\.pkg", f"Codentis-{version}-intel.pkg", content)
        content = re.sub(r"codentis_\d+\.\d+\.\d+_amd64\.deb", f"codentis_{version}_amd64.deb", content)
        
        # Update version tags in URLs
        content = re.sub(r"v\d+\.\d+\.\d+", f"v{version}", content)
        
        with open(doc, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✓ Updated {doc}")
    return True

def update_website_package_json(version, project_root):
    """Update website/package.json version."""
    file_path = project_root / 'website' / 'package.json'
    if not file_path.exists():
        return True # Not strictly required
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = re.sub(r'"version": "[^"]*"', f'"version": "{version}"', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"✓ Updated {file_path}")
    return True

def update_website_env_files(version, project_root):
    """Website environment files are no longer used for versioning."""
    return True

def update_changelog(version, project_root):
    """Update CHANGELOG.md with new version entry."""
    file_path = project_root / 'CHANGELOG.md'
    if not file_path.exists():
        print(f"Warning: {file_path} not found")
        return False
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    current_date = datetime.now().strftime('%Y-%m-%d')
    
    if f'## [{version}]' in content:
        print(f"Version {version} already exists in CHANGELOG.md")
        return True
    
    new_entry = f"""## [{version}] - {current_date}

### Added
- Version {version} release

### Changed
- Updated version numbers across all components

### Fixed
- Version consistency improvements

"""
    
    lines = content.split('\n')
    insert_index = -1
    for i, line in enumerate(lines):
        if line.startswith('## [') and '[Unreleased]' not in line:
            insert_index = i
            break
    
    if insert_index == -1:
        for i, line in enumerate(lines):
            if line.strip() == '' and i > 0:
                insert_index = i + 1
                break
    
    if insert_index != -1:
        new_lines = lines[:insert_index] + new_entry.split('\n') + lines[insert_index:]
        content = '\n'.join(new_lines)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✓ Updated {file_path} with version {version}")
    
    return True

def main():
    if len(sys.argv) != 2:
        print("Usage: python scripts/release_version.py <version>")
        sys.exit(1)
    
    version = sys.argv[1].strip()
    if not re.match(r'^\d+\.\d+\.\d+$', version):
        print(f"Error: Invalid version format '{version}'.")
        sys.exit(1)
    
    project_root = get_project_root()
    print(f"Project root: {project_root}")
    print(f"Updating all version numbers to {version}...")
    print("=" * 50)
    
    success = True
    success &= update_env_file(version, project_root)
    success &= update_pyproject_toml(version, project_root)
    success &= update_setup_py(version, project_root)
    success &= update_codentis_init(version, project_root)
    success &= update_inno_setup_script(version, project_root)
    success &= update_website_files(version, project_root)
    success &= update_documentation_files(version, project_root)
    success &= update_website_package_json(version, project_root)
    success &= update_website_env_files(version, project_root)
    success &= update_changelog(version, project_root)
    
    print("=" * 50)
    if success:
        print(f"✓ Successfully updated all version numbers to {version}")
    else:
        print("✗ Some updates failed.")
        sys.exit(1)

if __name__ == "__main__":
    main()