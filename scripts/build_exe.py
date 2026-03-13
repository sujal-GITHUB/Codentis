import os
import subprocess
import shutil
import sys
import platform
from pathlib import Path

def build(arch=None):
    project_root = Path(__file__).parent.parent.resolve()
    os.chdir(project_root)

    # Determine architecture
    if arch is None:
        arch = platform.machine().lower()
        if arch in ['amd64', 'x86_64']:
            arch = '64'
        elif arch in ['x86', 'i386', 'i686']:
            arch = '32'
        else:
            arch = '64'  # Default to 64-bit
    
    print(f"Building for {arch}-bit architecture...")
    print(f"Python version: {sys.version}")
    print(f"Python architecture: {platform.architecture()[0]}")
    
    # Determine output name
    if arch == '32':
        exe_name = "Codentis-32bit"
    else:
        exe_name = "Codentis"

    dist_dir = project_root / "dist"
    build_dir = project_root / "build"
    
    # Clean up
    if dist_dir.exists():
        shutil.rmtree(dist_dir)
    if build_dir.exists():
        shutil.rmtree(build_dir)

    # PyInstaller command
    cmd = [
        "pyinstaller",
        "--onefile",
        "--name", exe_name,
        "--console",  # Keep console window for CLI app
        "--clean",  # Clean PyInstaller cache
        "--noconfirm",  # Replace output directory without asking
        "--add-data", f"codentis{os.pathsep}codentis",  # Include the package
        "--hidden-import", "codentis.tools.builtin.read_file",
        "--hidden-import", "codentis.tools.builtin.write_file",
        "--hidden-import", "codentis.tools.builtin.shell",
        "--hidden-import", "codentis.tools.builtin.edit_file",
        "--hidden-import", "codentis.tools.builtin.apply_patch",
        "--hidden-import", "codentis.tools.builtin.list_dir",
        "--hidden-import", "codentis.tools.builtin.grep",
        "--hidden-import", "codentis.tools.builtin.glob",
        "--hidden-import", "codentis.tools.builtin.web_search",
        "--hidden-import", "codentis.tools.builtin.web_fetch",
        "--hidden-import", "tiktoken_ext.openai_public",
        "--hidden-import", "tiktoken_ext",
        "--collect-all", "tiktoken",
        "--collect-all", "rich",
        "--collect-all", "typer",
        "--noupx",  # Don't use UPX compression (can cause issues)
        "main.py"
    ]

    print("Running PyInstaller...")
    result = subprocess.run(cmd, check=False)
    
    if result.returncode != 0:
        print(f"\nBuild failed with return code {result.returncode}")
        return False

    # Copy to website public folder
    exe_file = dist_dir / f"{exe_name}.exe"
    website_public = project_root / "website" / "public"
    
    if not exe_file.exists():
        print(f"Error: Executable not found at {exe_file}")
        return False
    
    if website_public.is_dir():
        print(f"Copying executable to {website_public}...")
        shutil.copy2(exe_file, website_public / f"{exe_name}.exe")
        print("Done! File is now ready for download from the website.")
    else:
        print(f"Website public folder not found at {website_public}")

    print(f"\nBuild complete! The {arch}-bit executable is in the 'dist' folder.")
    print(f"Executable: {exe_file}")
    print(f"Size: {exe_file.stat().st_size / (1024*1024):.2f} MB")
    return True

if __name__ == "__main__":
    try:
        # Check if user wants to build specific architecture
        arch = None
        if len(sys.argv) > 1:
            if sys.argv[1] in ['32', '64']:
                arch = sys.argv[1]
            else:
                print("Usage: python build_exe.py [32|64]")
                print("  32 - Build 32-bit executable")
                print("  64 - Build 64-bit executable")
                print("  (no argument) - Build for current Python architecture")
                sys.exit(1)
        
        success = build(arch)
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"Build failed: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
