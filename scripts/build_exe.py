import os
import subprocess
import shutil
from pathlib import Path
from PIL import Image

def convert_logo_to_ico(png_path, ico_path):
    print(f"Converting {png_path} to {ico_path}...")
    img = Image.open(png_path)
    # Resize to common icon sizes
    icon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    img.save(ico_path, sizes=icon_sizes)

def build():
    project_root = Path(__file__).parent.parent.resolve()
    os.chdir(project_root)

    dist_dir = project_root / "dist"
    build_dir = project_root / "build"
    
    # Clean up
    if dist_dir.exists():
        shutil.rmtree(dist_dir)
    if build_dir.exists():
        shutil.rmtree(build_dir)

    # Find logo
    logo_png = None
    for f in Path("C:/Users/sujal/.gemini/antigravity/brain/14032948-a2e2-46dd-8986-029c33417500").glob("codentis_logo*.png"):
        logo_png = f
        break

    ico_path = None
    if logo_png:
        ico_path = project_root / "codentis.ico"
        convert_logo_to_ico(logo_png, ico_path)

    # PyInstaller command
    cmd = [
        "pyinstaller",
        "--onefile",
        "--name", "Codentis",
        "--add-data", f"prompts{os.pathsep}prompts",
        "--hidden-import", "tools.builtin.read_file",
        "--hidden-import", "tools.builtin.write_file",
        "--hidden-import", "tools.builtin.shell",
        "--hidden-import", "tools.builtin.edit_file",
        "--hidden-import", "tools.builtin.apply_patch",
        "--hidden-import", "tools.builtin.list_dir",
        "--hidden-import", "tools.builtin.grep",
        "--hidden-import", "tools.builtin.glob",
        "--hidden-import", "tools.builtin.web_search",
        "--hidden-import", "tools.builtin.web_fetch",
        "main.py"
    ]

    if ico_path:
        cmd.extend(["--icon", str(ico_path)])

    print("Running PyInstaller...")
    subprocess.run(cmd, check=True)

    # Copy to website public folder
    website_public = project_root / "website" / "public"
    if website_public.is_dir():
        print(f"Copying executable to {website_public}...")
        shutil.copy2(dist_dir / "Codentis.exe", website_public / "Codentis.exe")
        print("Done! File is now ready for download from the website.")
    else:
        print(f"Website public folder not found at {website_public}")

    print("\nBuild complete! The executable is in the 'dist' folder.")

if __name__ == "__main__":
    try:
        build()
    except Exception as e:
        print(f"Build failed: {e}")
