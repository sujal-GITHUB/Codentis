#!/bin/bash
# Build .rpm package for Fedora/RHEL/CentOS
# Requires: rpm-build

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

APP_NAME="codentis"
VERSION="1.5.1"  # This version is updated by release_version.py script
ARCH=$(uname -m)
# Normalize architecture for RPM (usually x86_64)
if [ "$ARCH" == "x86_64" ]; then
    RPM_ARCH="x86_64"
elif [ "$ARCH" == "aarch64" ]; then
    RPM_ARCH="aarch64"
else
    RPM_ARCH="$ARCH"
fi

echo "Building .rpm package for $APP_NAME v$VERSION ($RPM_ARCH)..."

# Check if binary exists
if [ ! -f "dist/codentis" ]; then
    echo "Error: Binary not found. Build it first: ./scripts/build_linux.sh"
    exit 1
fi

# Check if rpmbuild is installed
if ! command -v rpmbuild &> /dev/null; then
    echo "Error: rpmbuild is not installed. Install it with: sudo dnf install rpm-build"
    exit 1
fi

# Create RPM build structure
RPM_ROOT="$PROJECT_ROOT/build/rpmbuild"
mkdir -p "$RPM_ROOT"/{BUILD,RPMS,SOURCES,SPECS,SRPMS}
mkdir -p "$RPM_ROOT/BUILDROOT/${APP_NAME}-${VERSION}-1.${RPM_ARCH}/usr/local/bin"

# Copy binary
cp "dist/codentis" "$RPM_ROOT/BUILDROOT/${APP_NAME}-${VERSION}-1.${RPM_ARCH}/usr/local/bin/codentis"
chmod +x "$RPM_ROOT/BUILDROOT/${APP_NAME}-${VERSION}-1.${RPM_ARCH}/usr/local/bin/codentis"

# Create SPEC file
cat > "$RPM_ROOT/SPECS/${APP_NAME}.spec" << EOF
Name:           ${APP_NAME}
Version:        ${VERSION}
Release:        1%{?dist}
Summary:        AI-powered coding assistant for the terminal
License:        MIT
URL:            https://github.com/sujal-GITHUB/Codentis

%description
Codentis is an intelligent CLI AI agent that brings the power
of LLMs directly to your terminal with a beautiful TUI interface.

%install
mkdir -p %{buildroot}/usr/local/bin
cp -p %{_buildrootdir}/${APP_NAME}-${VERSION}-1.${RPM_ARCH}/usr/local/bin/codentis %{buildroot}/usr/local/bin/codentis

%files
/usr/local/bin/codentis

%changelog
* $(date +"%a %b %d %Y") Codentis Team <support@codentis.dev> - ${VERSION}-1
- Initial RPM release for version ${VERSION}
EOF

# Build package
rpmbuild -bb \
    --define "_topdir $RPM_ROOT" \
    "$RPM_ROOT/SPECS/${APP_NAME}.spec"

# Move result to dist
cp "$RPM_ROOT/RPMS/${RPM_ARCH}/${APP_NAME}-${VERSION}-1."*"${RPM_ARCH}.rpm" "dist/"

echo "✅ .rpm package created in dist/"
echo "To install: sudo dnf install ./dist/${APP_NAME}-${VERSION}-1.*.${RPM_ARCH}.rpm"
