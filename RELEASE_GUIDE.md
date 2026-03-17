# Release Guide

## Quick Release Process

To release a new version of Codentis, follow these simple steps:

### 1. Update Version Numbers
Run the release script with your desired version (can be run from any directory):

**From project root:**
```bash
python scripts/release_version.py 1.2.4
```

**From scripts directory:**
```bash
python release_version.py 1.2.4
```

This will automatically update:
- `.env` - Main version file
- `pyproject.toml` - Python package version
- `setup.py` - Setup script version
- `codentis/__init__.py` - Package version
- `scripts/installer_windows.iss` - Windows installer version
- `website/app/download/page.tsx` - Website download page (hardcoded)
- `website/app/docs/page.tsx` - Website docs page (hardcoded)
- `CHANGELOG.md` - Add new version entry

### 2. Review Changes
```bash
git diff
```

### 3. Commit and Tag
```bash
git add .
git commit -m "Release version 1.2.4"
git tag v1.2.4
```

### 4. Push to GitHub
```bash
git push origin main
git push origin v1.2.4
```

### 5. Monitor Build
- Go to GitHub Actions tab
- Watch the "Build and Release" workflow
- Verify artifacts have correct version numbers

## Build Artifacts
The automated build will create:
- `Codentis-Setup-1.2.4.exe` (Windows)
- `Codentis-1.2.4-arm64.pkg` (macOS Apple Silicon)
- `Codentis-1.2.4-intel.pkg` (macOS Intel)
- `codentis_1.2.4_amd64.deb` (Linux)

## Notes
- All build scripts now read versions from their respective files (no environment variables)
- Website uses hardcoded version constants (no environment variables)
- Version consistency is guaranteed across all components
- No more deployment environment variable dependencies