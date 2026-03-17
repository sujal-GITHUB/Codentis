# GitHub Actions Setup Guide

## Overview
GitHub Actions will automatically build installers for Windows, macOS, and Linux whenever you create a new release tag.

## What's Included

### 1. Release Workflow (`.github/workflows/release.yml`)
Triggers when you push a version tag (e.g., `v1.3.3`):
- ✅ Builds Windows installer (.exe)
- ✅ Builds macOS installer (.pkg) 
- ✅ Builds Linux package (.deb)
- ✅ Creates GitHub Release automatically
- ✅ Uploads all installers as release assets
- ✅ Includes changelog in release notes

### 2. Build Test Workflow (`.github/workflows/build-test.yml`)
Runs on every push to `main` or `develop`:
- Tests that builds work on all platforms
- Catches build errors early
- No release created, just validation

## How to Use

### First Time Setup

1. **Push the workflow files to GitHub**:
```bash
git add .github/workflows/
git commit -m "Add GitHub Actions workflows"
git push origin main
```

2. **Verify workflows are enabled**:
   - Go to your repo → Actions tab
   - You should see "Build Test" and "Build and Release" workflows

### Creating a Release

1. **Update version** in these files:
   - `setup.py`
   - `pyproject.toml`
   - `codentis/__init__.py`
   - `scripts/installer_windows.iss`

2. **Update CHANGELOG.md**:
```markdown
## [0.1.1] - 2026-03-15

### Added
- New feature X

### Fixed
- Bug fix Y
```

3. **Commit and create tag**:
```bash
git add .
git commit -m "Release v1.3.3"
git tag v1.3.3
git push origin main
git push origin v1.3.3
```

4. **Wait for GitHub Actions** (takes ~10-15 minutes):
   - Go to Actions tab to watch progress
   - Three builds run in parallel (Windows, macOS, Linux)
   - Release is created automatically when all builds complete

5. **Check the release**:
   - Go to Releases tab
   - You'll see "Codentis v1.3.3" with all installers attached

### Manual Trigger

You can also trigger the release workflow manually:

1. Go to Actions tab
2. Click "Build and Release"
3. Click "Run workflow"
4. Select branch and click "Run workflow"

## Workflow Details

### Build Times
- **Windows**: ~5-7 minutes
- **macOS**: ~6-8 minutes
- **Linux**: ~4-6 minutes
- **Total**: ~10-15 minutes (parallel)

### Artifacts Produced
- `Codentis-Setup-1.3.3.exe` (Windows installer, ~35 MB)
- `Codentis-1.3.3-arm64.pkg` (macOS Apple Silicon, ~30 MB)
- `Codentis-1.3.3-intel.pkg` (macOS Intel, ~30 MB)
- `codentis_1.3.3_amd64.deb` (Linux Debian/Ubuntu, ~30 MB)

### Release Notes Format
The workflow automatically generates release notes from CHANGELOG.md and includes:
- What's changed
- Installation instructions for each platform
- Download links for all installers

## Troubleshooting

### Build Fails
1. Check the Actions tab for error logs
2. Common issues:
   - Missing dependencies in requirements.txt
   - Syntax errors in build scripts
   - Version mismatch between files

### Release Not Created
- Make sure you pushed the tag: `git push origin v1.3.3`
- Check that tag starts with `v` (e.g., `v1.3.3` not `0.1.1`)
- Verify all three builds completed successfully

### Installers Missing
- Check the "Artifacts" section in the workflow run
- Verify file paths in the workflow match your build scripts
- Ensure build scripts produce files in the `dist/` folder

## Permissions

The workflow needs these permissions (already configured):
- ✅ `contents: write` - To create releases and upload assets
- ✅ `GITHUB_TOKEN` - Automatically provided by GitHub

No additional secrets or tokens needed!

## Cost

GitHub Actions is **free** for public repositories:
- ✅ Unlimited minutes for public repos
- ✅ No credit card required
- ✅ All features available

For private repos:
- 2,000 minutes/month free
- Each release uses ~30 minutes total (10 min × 3 platforms)
- ~66 releases per month on free tier

## Customization

### Change Trigger
Edit `.github/workflows/release.yml`:
```yaml
on:
  push:
    tags:
      - 'v*'  # Current: triggers on v1.3.3, v1.3.3, etc.
      - 'release-*'  # Alternative: triggers on release-0.1.0
```

### Add More Platforms
Add a new job in the workflow:
```yaml
build-windows-32bit:
  runs-on: windows-latest
  steps:
    - name: Build 32-bit
      run: python scripts/build_exe.py 32
```

### Skip Platforms
Comment out jobs you don't need:
```yaml
# build-macos:  # Disabled
#   runs-on: macos-latest
```

## Next Steps

1. ✅ Push workflow files to GitHub
2. ✅ Test with a pre-release tag: `v1.3.3-beta`
3. ✅ Verify all builds complete successfully
4. ✅ Check release page for installers
5. ✅ Create your first official release!

## Support

If you encounter issues:
1. Check the [Actions documentation](https://docs.github.com/en/actions)
2. Review workflow logs in the Actions tab
3. Test builds locally first before pushing tags
