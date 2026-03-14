#!/bin/bash
# Build script for macOS executables (both Intel and Apple Silicon)

set -e  # Exit on error

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "Building Codentis for macOS..."
echo "Project root: $PROJECT_ROOT"

# Detect architecture
ARCH=$(uname -m)
echo "Current architecture: $ARCH"

# Clean up previous builds
echo "Cleaning up previous builds..."
rm -rf dist build *.spec

# Use consistent output name for all architectures
OUTPUT_NAME="codentis"
if [ "$ARCH" = "arm64" ]; then
    echo "Building for Apple Silicon (ARM64)..."
elif [ "$ARCH" = "x86_64" ]; then
    echo "Building for Intel (x86_64)..."
else
    echo "Unknown architecture: $ARCH"
    exit 1
fi

# Build with PyInstaller
echo "Running PyInstaller..."
pyinstaller \
    --onefile \
    --name "$OUTPUT_NAME" \
    --console \
    --clean \
    --noconfirm \
    --add-data "codentis:codentis" \
    --hidden-import codentis.tools.builtin.read_file \
    --hidden-import codentis.tools.builtin.write_file \
    --hidden-import codentis.tools.builtin.shell \
    --hidden-import codentis.tools.builtin.edit_file \
    --hidden-import codentis.tools.builtin.apply_patch \
    --hidden-import codentis.tools.builtin.list_dir \
    --hidden-import codentis.tools.builtin.grep \
    --hidden-import codentis.tools.builtin.glob \
    --hidden-import codentis.tools.builtin.web_search \
    --hidden-import codentis.tools.builtin.web_fetch \
    --hidden-import tiktoken_ext.openai_public \
    --hidden-import tiktoken_ext \
    --collect-all tiktoken \
    --collect-all rich \
    --collect-all typer \
    --noupx \
    main.py

# Copy to website public folder if it exists
WEBSITE_PUBLIC="$PROJECT_ROOT/website/public"
if [ -d "$WEBSITE_PUBLIC" ]; then
    echo "Copying executable to $WEBSITE_PUBLIC..."
    cp "dist/$OUTPUT_NAME" "$WEBSITE_PUBLIC/$OUTPUT_NAME"
    chmod +x "$WEBSITE_PUBLIC/$OUTPUT_NAME"
    echo "Done! File is ready for download from the website."
else
    echo "Website public folder not found at $WEBSITE_PUBLIC"
fi

echo ""
echo "Build complete!"
echo "Executable: dist/$OUTPUT_NAME"
if [ -f "dist/$OUTPUT_NAME" ]; then
    SIZE=$(du -h "dist/$OUTPUT_NAME" | cut -f1)
    echo "Size: $SIZE"
fi
echo ""
echo "To make it executable, run: chmod +x dist/$OUTPUT_NAME"
echo "To run it: ./dist/$OUTPUT_NAME"
