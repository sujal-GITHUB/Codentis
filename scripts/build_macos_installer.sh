#!/bin/bash
# Build macOS .pkg installer for Codentis

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

APP_NAME="Codentis"
VERSION="1.4.3"  # This version is updated by release_version.py script
IDENTIFIER="com.codentis.app"
INSTALL_LOCATION="/usr/local/bin"

echo "Building macOS installer for $APP_NAME v$VERSION..."

# Detect architecture for package naming
ARCH=$(uname -m)
if [ "$ARCH" = "arm64" ]; then
    PKG_NAME="Codentis-${VERSION}-arm64.pkg"
elif [ "$ARCH" = "x86_64" ]; then
    PKG_NAME="Codentis-${VERSION}-intel.pkg"
else
    echo "Unknown architecture: $ARCH"
    exit 1
fi

BINARY_NAME="codentis"

# Check if binary exists
if [ ! -f "dist/$BINARY_NAME" ]; then
    echo "Error: Binary not found at dist/$BINARY_NAME"
    echo "Please build the binary first using: ./scripts/build_macos.sh"
    exit 1
fi

# Create temporary directory structure
TEMP_DIR=$(mktemp -d)
mkdir -p "$TEMP_DIR/payload$INSTALL_LOCATION"
mkdir -p "$TEMP_DIR/scripts"

# Copy binary
cp "dist/$BINARY_NAME" "$TEMP_DIR/payload$INSTALL_LOCATION/codentis"
chmod +x "$TEMP_DIR/payload$INSTALL_LOCATION/codentis"

# Create postinstall script
cat > "$TEMP_DIR/scripts/postinstall" << 'EOF'
#!/bin/bash
# Make sure the binary is executable
chmod +x /usr/local/bin/codentis
echo "Codentis installed successfully!"
echo "You can now run 'codentis' from any terminal."
exit 0
EOF

chmod +x "$TEMP_DIR/scripts/postinstall"

# Build the package
echo "Building package..."
pkgbuild \
    --root "$TEMP_DIR/payload" \
    --scripts "$TEMP_DIR/scripts" \
    --identifier "$IDENTIFIER" \
    --version "$VERSION" \
    --install-location "/" \
    "dist/$PKG_NAME"

# Clean up
rm -rf "$TEMP_DIR"

# Copy to website public folder
WEBSITE_PUBLIC="$PROJECT_ROOT/website/public"
if [ -d "$WEBSITE_PUBLIC" ]; then
    echo "Copying installer to $WEBSITE_PUBLIC..."
    cp "dist/$PKG_NAME" "$WEBSITE_PUBLIC/$PKG_NAME"
fi

echo ""
echo "✅ macOS installer created successfully!"
echo "📦 Package: dist/$PKG_NAME"
if [ -f "dist/$PKG_NAME" ]; then
    SIZE=$(du -h "dist/$PKG_NAME" | cut -f1)
    echo "📊 Size: $SIZE"
fi
echo ""
echo "To install: sudo installer -pkg dist/$PKG_NAME -target /"
echo "To uninstall: sudo rm /usr/local/bin/codentis"
