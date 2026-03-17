#!/usr/bin/env python3
"""
Release Version Script - Updates all version numbers across the project.
Usage: python scripts/release_version.py 1.2.4
"""

import os
import sys
import re
from pathlib import Path
from datetime import datetime

def get_project_root():
    """Get the project root directory regardless of where the script is run from."""
    script_dir = Path(__file__).parent
    # If we're in the scripts directory, go up one level
    if script_dir.name == 'scripts':
        return script_dir.parent
    # Otherwise assume we're already in the project root
    return script_dir

def update_env_file(version, project_root):
    """Update .env file with new version."""
    env_file = project_root / '.env'
    if not env_file.exists():
        print(f"Creating {env_file}")
        with open(env_file, 'w') as f:
            f.write(f'VERSION={version}\n')
        return True
    
    with open(env_file, 'r') as f:
        content = f.read()
    
    # Update or add VERSION line
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

def update_setup_py(version, project_root):
    """Update setup.py version."""
    file_path = project_root / 'setup.py'
    if not file_path.exists():
        print(f"Warning: {file_path} not found")
        return False
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    content = re.sub(r'version=["\'][^"\']*["\']', f'version="{version}"', content)
    
    with open(file_path, 'w') as f:
        f.write(content)
    
    print(f"✓ Updated {file_path}")
    return True

def update_codentis_init(version, project_root):
    """Update codentis/__init__.py version."""
    file_path = project_root / 'codentis' / '__init__.py'
    if not file_path.exists():
        print(f"Warning: {file_path} not found")
        return False
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    content = re.sub(r'__version__ = ["\'][^"\']*["\']', f'__version__ = "{version}"', content)
    
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
    """Update website files with hardcoded version numbers."""
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
        
        # Update hardcoded VERSION constant
        content = re.sub(r"const VERSION = '[^']*';", f"const VERSION = '{version}';", content)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ Updated {file_path}")
    
    return True

def update_website_env_files(version, project_root):
    """Update website environment files (kept for deployment compatibility)."""
    # Note: Environment files are no longer used since we switched to hardcoded versions
    # This function is kept for backward compatibility but does nothing
    print("✓ Website now uses hardcoded versions (no env files needed)")
    return True

def update_changelog(version, project_root):
    """Update CHANGELOG.md with new version entry."""
    file_path = project_root / 'CHANGELOG.md'
    if not file_path.exists():
        print(f"Warning: {file_path} not found")
        return False
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Get current date
    current_date = datetime.now().strftime('%Y-%m-%d')
    
    # Check if version already exists
    if f'## [{version}]' in content:
        print(f"Version {version} already exists in CHANGELOG.md")
        return True
    
    # Find the first ## [ pattern and insert new version before it
    new_entry = f"""## [{version}] - {current_date}

### Added
- Version {version} release

### Changed
- Updated version numbers across all components

### Fixed
- Version consistency improvements

"""
    
    # Insert after the first # Changelog line
    lines = content.split('\n')
    insert_index = -1
    for i, line in enumerate(lines):
        if line.startswith('## [') and '[Unreleased]' not in line:
            insert_index = i
            break
    
    if insert_index == -1:
        # If no version entries found, add after the header
        for i, line in enumerate(lines):
            if line.strip() == '' and i > 0:
                insert_index = i + 1
                break
    
    if insert_index != -1:
        new_lines = lines[:insert_index] + new_entry.split('\n') + lines[insert_index:]
        content = '\n'.join(new_lines)
        
        with open(file_path, 'w') as f:
            f.write(content)
        
        print(f"✓ Updated {file_path} with version {version}")
    
    return True

def main():
    if len(sys.argv) != 2:
        print("Usage: python scripts/release_version.py <version>")
        print("Example: python scripts/release_version.py 1.2.4")
        sys.exit(1)
    
    version = sys.argv[1].strip()
    
    # Validate version format (basic check)
    if not re.match(r'^\d+\.\d+\.\d+$', version):
        print(f"Error: Invalid version format '{version}'. Use format like '1.2.3'")
        sys.exit(1)
    
    # Get project root directory
    project_root = get_project_root()
    print(f"Project root: {project_root}")
    print(f"Updating all version numbers to {version}...")
    print("=" * 50)
    
    # Update all files
    success = True
    success &= update_env_file(version, project_root)
    success &= update_pyproject_toml(version, project_root)
    success &= update_setup_py(version, project_root)
    success &= update_codentis_init(version, project_root)
    success &= update_inno_setup_script(version, project_root)
    success &= update_website_files(version, project_root)
    success &= update_website_env_files(version, project_root)
    success &= update_changelog(version, project_root)
    
    print("=" * 50)
    if success:
        print(f"✓ Successfully updated all version numbers to {version}")
        print("\nNext steps:")
        print("1. Review the changes: git diff")
        print("2. Commit the changes: git add . && git commit -m 'Release version {version}'")
        print(f"3. Create and push tag: git tag v{version} && git push origin v{version}")
        print("4. Push changes: git push origin main")
    else:
        print("✗ Some updates failed. Please check the output above.")
        sys.exit(1)

if __name__ == "__main__":
    main()