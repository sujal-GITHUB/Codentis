#!/bin/bash
# Build .deb package for Debian/Ubuntu

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

APP_NAME="codentis"
VERSION="1.0.0"
ARCH="amd64"

echo "Building .deb package for $APP_NAME v$VERSION..."

# Check if binary exists
if [ ! -f "dist/codentis" ]; then
    echo "Error: Binary not found. Build it first: ./scripts/build_linux.sh"
    exit 1
fi

# Create package structure
DEB_DIR="dist/${APP_NAME}_${VERSION}_${ARCH}"
mkdir -p "$DEB_DIR/DEBIAN"
mkdir -p "$DEB_DIR/usr/local/bin"
mkdir -p "$DEB_DIR/usr/share/applications"
mkdir -p "$DEB_DIR/usr/share/doc/$APP_NAME"

# Copy binary
cp "dist/codentis" "$DEB_DIR/usr/local/bin/codentis"
chmod +x "$DEB_DIR/usr/local/bin/codentis"

# Create control file
cat > "$DEB_DIR/DEBIAN/control" << EOF
Package: $APP_NAME
Version: $VERSION
Section: utils
Priority: optional
Architecture: $ARCH
Maintainer: Codentis Team <support@codentis.dev>
Description: AI-powered coding assistant for the terminal
 Codentis is an intelligent CLI AI agent that brings the power
 of LLMs directly to your terminal with a beautiful TUI interface.
EOF

# Build package
dpkg-deb --build "$DEB_DIR"

echo "✅ .deb package created: ${DEB_DIR}.deb"
echo "To install: sudo dpkg -i ${DEB_DIR}.deb"
