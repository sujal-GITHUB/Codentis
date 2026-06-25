#!/bin/bash
# Build .rpm package for Fedora/RHEL/CentOS
# Requires: rpm-build

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

APP_NAME="codentis"
VERSION="1.5.3"  # This version is updated by release_version.py script
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

# Create custom rpmbuild directory structure inside dist
RPM_DIR="dist/rpmbuild"
rm -rf "$RPM_DIR"
mkdir -p "$RPM_DIR"/{BUILD,RPMS,SOURCES,SPECS,SRPMS}

# Copy binary to SOURCES
cp "dist/codentis" "$RPM_DIR/SOURCES/codentis"

# Create SPEC file
cat > "$RPM_DIR/SPECS/${APP_NAME}.spec" << EOF
Name:           ${APP_NAME}
Version:        ${VERSION}
Release:        1
Summary:        AI-powered coding assistant for the terminal
License:        MIT
URL:            https://github.com/sujal-GITHUB/Codentis

%description
Codentis is an intelligent CLI AI agent that brings the power
of LLMs directly to your terminal with a beautiful TUI interface.

%prep
# Nothing to do

%build
# Nothing to do (using pre-compiled binary)

%install
rm -rf %{buildroot}
mkdir -p %{buildroot}/usr/local/bin
cp %{_sourcedir}/codentis %{buildroot}/usr/local/bin/codentis
chmod +x %{buildroot}/usr/local/bin/codentis

%files
/usr/local/bin/codentis

%changelog
* $(date +"%a %b %d %Y") Codentis Team <support@codentis.dev> - ${VERSION}-1
- Release ${VERSION}
EOF

# Build package
rpmbuild --define "_topdir $PROJECT_ROOT/$RPM_DIR" -bb "$RPM_DIR/SPECS/${APP_NAME}.spec"

# Move result to dist
cp "$RPM_DIR/RPMS/${RPM_ARCH}/${APP_NAME}-${VERSION}-1.${RPM_ARCH}.rpm" "dist/"

echo "✅ .rpm package created: dist/${APP_NAME}-${VERSION}-1.${RPM_ARCH}.rpm"
