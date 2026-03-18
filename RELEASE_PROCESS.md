# Release Process for Codentis

## Overview
This document explains how to release a new version of Codentis and how users will receive updates.

## Version Numbering
Codentis follows [Semantic Versioning](https://semver.org/):
- **MAJOR.MINOR.PATCH** (e.g., 0.1.0)
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

## Release Steps

### Automated Release (Recommended)

The easiest way to release is using GitHub Actions:

1. **Update Version Numbers** (same as manual process below)

2. **Update Changelog** (same as manual process below)

3. **Commit and Tag**:
```bash
git add .
git commit -m "Release v1.4.1"
git tag v1.4.1
git push origin main
git push origin v1.4.1
```

4. **GitHub Actions Automatically**:
   - ✅ Builds Windows installer (.exe)
   - ✅ Builds macOS installer (.pkg)
   - ✅ Builds Linux package (.deb)
   - ✅ Creates GitHub Release
   - ✅ Uploads all installers
   - ✅ Adds changelog to release notes

5. **Done!** Check the [Releases page](https://github.com/sujal-GITHUB/Codentis/releases)

### Manual Release (If needed)

If you need to build manually:

### 1. Update Version Number
Update the version in these files:
- `setup.py` → `version="0.1.1"`
- `pyproject.toml` → `version = "0.1.1"`
- `codentis/__init__.py` → `__version__ = "0.1.1"`
- `scripts/installer_windows.iss` → `#define MyAppVersion "0.1.1"`

### 2. Update Changelog
Add release notes to `CHANGELOG.md`:
```markdown
## [0.1.1] - 2026-03-15

### Added
- New feature X
- New feature Y

### Fixed
- Bug fix A
- Bug fix B

### Changed
- Improvement C
```

### 3. Build Installers

#### Windows:
```bash
python scripts/build_exe.py 64
# Then compile with Inno Setup: scripts/installer_windows.iss
# Output: dist/Codentis-Setup-1.4.1.exe
```

#### macOS:
```bash
./scripts/build_macos.sh
./scripts/build_macos_installer.sh
# Output: dist/Codentis-1.4.1-arm64.pkg
```

#### Linux:
```bash
./scripts/build_linux.sh
./scripts/build_linux_deb.sh
# Output: dist/codentis_1.4.1_amd64.deb
```

### 4. Create GitHub Release

1. Commit all changes:
```bash
git add .
git commit -m "Release v1.4.1"
git tag v1.4.1
git push origin main
git push origin v1.4.1
```

2. Go to GitHub → Releases → "Create a new release"

3. Fill in:
   - **Tag**: v1.4.1
   - **Title**: Codentis v1.4.1
   - **Description**: Copy from CHANGELOG.md
   - **Attach files**:
     - `Codentis-Setup-1.4.1.exe` (Windows)
     - `Codentis-1.4.1-arm64.pkg` (macOS)
     - `codentis_1.4.1_amd64.deb` (Linux)

4. Click "Publish release"

### 5. Update Website

Update `website/app/download/page.tsx` with new version links:
```tsx
<a href="/Codentis-Setup-1.4.1.exe" download>
  Download for Windows
</a>
```

Copy installers to `website/public/`:
```bash
cp dist/Codentis-Setup-1.4.1.exe website/public/
```

Deploy website:
```bash
cd website
npm run build
# Deploy to hosting (Vercel, Netlify, etc.)
```

## How Users Get Updates

### Automatic Update Notification
When users start Codentis, it automatically checks for updates (once per day):

1. **Check GitHub Releases API** for latest version
2. **Compare** with current version
3. **Show notification** if newer version available:
   ```
   ╭─────────────────────────────────────╮
   │ ⚠ Update Available                  │
   │                                     │
   │ New version available: v1.4.1       │
   │ Current version: v1.4.1             │
   │                                     │
   │ Download: [link]                    │
   ╰─────────────────────────────────────╯
   ```

### Manual Update Check
Users can also check manually:
```bash
codentis version
```

### Installation Process

#### Windows:
1. Download new `Codentis-Setup-1.4.1.exe`
2. Run installer
3. It will automatically uninstall old version and install new one

#### macOS:
1. Download new `.pkg` file
2. Run: `sudo installer -pkg Codentis-1.4.1-arm64.pkg -target /`
3. Overwrites old installation

#### Linux:
1. Download new `.deb` file
2. Run: `sudo dpkg -i codentis_1.4.1_amd64.deb`
3. Upgrades existing installation

## Update Frequency

Recommended release schedule:
- **Patch releases** (bug fixes): As needed
- **Minor releases** (new features): Monthly
- **Major releases** (breaking changes): Quarterly

## Testing Before Release

Before releasing, test on all platforms:
- [ ] Windows 10/11
- [ ] macOS (Intel & Apple Silicon)
- [ ] Ubuntu/Debian Linux

Test checklist:
- [ ] Installation works
- [ ] All commands work
- [ ] Configuration persists
- [ ] Update notification appears
- [ ] Uninstallation works

## Rollback Process

If a release has critical bugs:

1. Create hotfix branch:
```bash
git checkout -b hotfix/0.1.2 v1.4.1
```

2. Fix the bug and release v1.4.1 following the same process

3. Users will be notified of the new version automatically

## Notes

- Update checks happen **once per day** to avoid spamming GitHub API
- Update checks **fail silently** - they never interrupt the user experience
- Users can **disable update checks** by setting `CODENTIS_NO_UPDATE_CHECK=1` environment variable
- The update system uses GitHub Releases API (no authentication required)
- Download URLs are platform-specific (Windows .exe, macOS .pkg, Linux .deb)
