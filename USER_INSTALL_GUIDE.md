# How to Install Codentis

Simple installation guide for users downloading from the website.

---

## 🪟 Windows

### Step 1: Download
Click the **Download Installer** button for Windows on the website.

### Step 2: Run the Installer
1. Double-click `Codentis-Setup-1.5.1.exe`
2. If you see a Windows SmartScreen warning:
   - Click "More info"
   - Click "Run anyway"
3. Follow the setup wizard:
   - Accept the license
   - Choose installation folder (default is fine)
   - ✅ Check "Add to PATH" (recommended)
   - Click Install

### Step 3: Start Using Codentis
1. Open Command Prompt or PowerShell
2. Type: `codentis`
3. Follow the first-time setup

### Uninstall
- Go to Settings → Apps → Codentis → Uninstall

---

## 🍎 macOS

### Step 1: Download
Click the **Download Installer** button for your Mac:
- **Apple Silicon** for M1/M2/M3 Macs (2020 or newer)
- **Intel** for older Macs

### Step 2: Install
1. Double-click the downloaded `.pkg` file
2. If you see "cannot be opened because it is from an unidentified developer":
   - Right-click the file → Open
   - Click "Open" in the dialog
3. Follow the installer
4. Enter your password when prompted

### Step 3: Start Using Codentis
1. Open Terminal
2. Type: `codentis`
3. Follow the first-time setup

### Uninstall
Open Terminal and run:
```bash
sudo rm /usr/local/bin/codentis
```

---

## 🐧 Linux (Ubuntu/Debian)

### Step 1: Download
Click the **Download .deb Package** button.

### Step 2: Install

**Option A: Double-click**
1. Double-click the downloaded `.deb` file
2. Click "Install" in Software Center
3. Enter your password

**Option B: Terminal**
```bash
cd ~/Downloads
sudo dpkg -i codentis_1.5.1_amd64.deb
```

### Step 3: Start Using Codentis
1. Open Terminal
2. Type: `codentis`
3. Follow the first-time setup

### Uninstall
```bash
sudo apt remove codentis
```

---

## 🚀 First-Time Setup

When you run `codentis` for the first time:

1. **Choose AI Provider:**
   - OpenAI (ChatGPT)
   - OpenRouter (Multiple models)
   - Anthropic (Claude)
   - Custom endpoint

2. **Enter API Key:**
   - Get your API key from your chosen provider
   - Paste it when prompted

3. **Configure Settings:**
   - Choose your preferred model
   - Set any custom preferences

4. **Start Coding!**
   ```bash
   cd your-project
   codentis
   ```

---

## 💡 Tips

- **Windows**: You can run `codentis` from any folder after installation
- **macOS/Linux**: The command is available system-wide after installation
- **Need Help?** Visit our [GitHub](https://github.com/sujal-GITHUB/Codentis) or [report an issue](https://github.com/sujal-GITHUB/Codentis/issues)

---

## 🔧 Troubleshooting

### Windows: "This app can't run on your PC"
- Download the correct version (64-bit for most modern PCs)
- Make sure you have Windows 10 or 11

### macOS: "Cannot verify developer"
- Right-click the installer → Open → Open anyway
- This is normal for apps not from the App Store

### Linux: "Package has unmet dependencies"
- Update your system first: `sudo apt update && sudo apt upgrade`
- Try installing again

### Command not found
- **Windows**: Restart your terminal after installation
- **macOS/Linux**: The installer should add it automatically. If not, reinstall.

---

## 📞 Support

- **Documentation**: [GitHub README](https://github.com/sujal-GITHUB/Codentis)
- **Issues**: [Report a bug](https://github.com/sujal-GITHUB/Codentis/issues)
- **Discussions**: [GitHub Discussions](https://github.com/sujal-GITHUB/Codentis/discussions)
