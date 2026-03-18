# Building Installers for Codentis

This guide explains how to create proper installers for all platforms (like Claude Code does).

## Windows Installer (.exe with setup wizard)

### Prerequisites:
- Download and install [Inno Setup](https://jrsoftware.org/isdl.php)

### Steps:
1. Build the executable:
```bash
python scripts/build_exe.py 64
```

2. Open `scripts/installer_windows.iss` in Inno Setup Compiler

3. Click "Compile" or press F9

4. Output: `dist/Codentis-Setup-1.4.1.exe`

### Features:
✅ Setup wizard with license agreement
✅ Choose installation directory
✅ Add to PATH option
✅ Desktop shortcut option
✅ Start menu entries
✅ Proper uninstaller

---

## macOS Installer (.pkg)

### Prerequisites:
- macOS with Xcode Command Line Tools

### Steps:
1. Build the binary:
```bash
chmod +x scripts/build_macos.sh
./scripts/build_macos.sh
```

2. Build the installer:
```bash
chmod +x scripts/build_macos_installer.sh
./scripts/build_macos_installer.sh
```

3. Output: `dist/Codentis-1.4.1-arm64.pkg` or `dist/Codentis-1.4.1-intel.pkg`

### Features:
✅ Standard macOS installer
✅ Installs to `/usr/local/bin`
✅ Automatically adds to PATH
✅ Works with Gatekeeper

---

## Linux Installer (.deb for Ubuntu/Debian)

### Prerequisites:
- `dpkg-deb` (usually pre-installed)

### Steps:
1. Build the binary:
```bash
chmod +x scripts/build_linux.sh
./scripts/build_linux.sh
```

2. Build the .deb package:
```bash
chmod +x scripts/build_linux_deb.sh
./scripts/build_linux_deb.sh
```

3. Output: `dist/codentis_1.4.1_amd64.deb`

### Features:
✅ Standard Debian package
✅ Installs to `/usr/local/bin`
✅ Can be installed with `apt` or `dpkg`
✅ Proper uninstall support

---

## Installation Commands

### Windows:
```bash
# Download and run Codentis-Setup-1.4.1.exe
# Follow the setup wizard
```

### macOS:
```bash
# Download the .pkg file
sudo installer -pkg Codentis-1.4.1-arm64.pkg -target /
```

### Linux (Debian/Ubuntu):
```bash
# Download the .deb file
sudo dpkg -i codentis_1.4.1_amd64.deb
```

---

## Uninstallation

### Windows:
- Use "Add or Remove Programs" in Windows Settings
- Or run the uninstaller from Start Menu

### macOS:
```bash
sudo rm /usr/local/bin/codentis
```

### Linux:
```bash
sudo apt remove codentis
# or
sudo dpkg -r codentis
```

---

## Updating the Download Page

After building installers, update the download page to link to them:

```tsx
// Windows
<a href="/Codentis-Setup-1.4.1.exe" download>
  Download Installer
</a>

// macOS
<a href="/Codentis-1.4.1-arm64.pkg" download>
  Download Installer (Apple Silicon)
</a>

// Linux
<a href="/codentis_1.4.1_amd64.deb" download>
  Download .deb Package
</a>
```
