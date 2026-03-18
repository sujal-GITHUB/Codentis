import Navbar from "../components/Navbar";
import { RiMicrosoftFill, RiAppleFill, RiUbuntuLine, RiDownloadLine } from "react-icons/ri";

const VERSION = '1.4.3';

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-[1120px] mx-auto px-4 sm:px-6 py-24 sm:py-32 pt-32 sm:pt-40">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cyan-400/80 mb-4 sm:mb-5 block">
              Get Started
            </span>
            <h1 className="text-[clamp(2rem,5vw,3rem)] hover:cursor-pointer font-semibold tracking-[-0.03em] leading-[1.15] mb-4 sm:mb-6">
              <span className="text-gradient">Download Codentis</span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-[550px] mx-auto">
              Choose your platform and start coding with AI assistance
            </p>
          </div>

          {/* Platform Downloads */}
          <div className="space-y-4 sm:space-y-6">
            {/* Windows */}
            <div className="p-5 sm:p-6 border border-white/[0.05] bg-bg-2 rounded-2xl hover:border-cyan-500/30 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <RiMicrosoftFill className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400" />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white/90 group-hover:text-white transition-colors">Windows</h3>
                    <p className="text-xs sm:text-sm text-zinc-500">Windows 10/11</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <a
                    href={`https://github.com/sujal-GITHUB/Codentis/releases/latest/download/Codentis-Setup-${VERSION}.exe`}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 bg-cyan-500 hover:bg-cyan-600 text-black text-xs sm:text-sm font-semibold rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                  >
                    <RiDownloadLine className="w-4 h-4" />
                    <span>Download Installer</span>
                  </a>
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 sm:p-4 text-xs sm:text-sm">
                <p className="text-zinc-500 text-[0.75rem] sm:text-[0.8rem]">
                  💡 Run the installer and follow the setup wizard. After installation, open a terminal and run <code className="text-cyan-300 bg-black/50 px-1.5 py-0.5 rounded font-mono text-[0.7rem]">codentis config</code> to set up your API key.
                </p>
                <p className="text-yellow-400 text-[0.75rem] sm:text-[0.8rem] mt-2">
                  ⚠️ Windows may show a SmartScreen warning for unsigned apps. Click "More info" → "Run anyway" to proceed.
                </p>
              </div>
            </div>

            {/* macOS */}
            <div className="p-5 sm:p-6 border border-white/[0.05] bg-bg-2 rounded-2xl hover:border-cyan-500/30 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <RiAppleFill className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400" />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white/90 group-hover:text-white transition-colors">macOS</h3>
                    <p className="text-xs sm:text-sm text-zinc-500">macOS 11+</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <a
                    href={`https://github.com/sujal-GITHUB/Codentis/releases/latest/download/Codentis-${VERSION}-arm64.pkg`}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 bg-cyan-500 hover:bg-cyan-600 text-black text-xs sm:text-sm font-semibold rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                  >
                    <RiDownloadLine className="w-4 h-4" />
                    <span>Apple Silicon</span>
                  </a>
                  <a
                    href={`https://github.com/sujal-GITHUB/Codentis/releases/latest/download/Codentis-${VERSION}-intel.pkg`}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 bg-cyan-500/80 hover:bg-cyan-500 text-black text-xs sm:text-sm font-semibold rounded-full transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <RiDownloadLine className="w-4 h-4" />
                    <span>Intel</span>
                  </a>
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 sm:p-4 text-xs sm:text-sm">
                <p className="text-zinc-500 text-[0.75rem] sm:text-[0.8rem]">
                  M series Macs use Apple Silicon. Older Macs use Intel. Double-click the .pkg file to install. After installation, run <code className="text-cyan-300 bg-black/50 px-1.5 py-0.5 rounded font-mono text-[0.7rem]">codentis config</code> in Terminal.
                </p>
              </div>
            </div>

            {/* Linux */}
            <div className="p-5 sm:p-6 border border-white/[0.05] bg-bg-2 rounded-2xl hover:border-cyan-500/30 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <RiUbuntuLine className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400" />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white/90 group-hover:text-white transition-colors">Linux</h3>
                    <p className="text-xs sm:text-sm text-zinc-500">Ubuntu, Debian, Fedora, Arch</p>
                  </div>
                </div>
                <a
                  href={`https://github.com/sujal-GITHUB/Codentis/releases/latest/download/codentis_${VERSION}_amd64.deb`}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 bg-cyan-500 hover:bg-cyan-600 text-black text-xs sm:text-sm font-semibold rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                >
                  <RiDownloadLine className="w-4 h-4" />
                  <span>Download .deb</span>
                </a>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 sm:p-4 text-xs sm:text-sm">
                <p className="text-zinc-500 text-[0.75rem] sm:text-[0.8rem]">
                  💡 Install with <code className="text-cyan-300 bg-black/50 px-1.5 py-0.5 rounded font-mono text-[0.7rem]">sudo dpkg -i codentis_{VERSION}_amd64.deb</code> then run <code className="text-cyan-300 bg-black/50 px-1.5 py-0.5 rounded font-mono text-[0.7rem]">codentis config</code> to set up your API key.
                </p>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-10 sm:mt-12 text-center">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white/90">Need Help?</h2>
            <div className="flex justify-center gap-4 sm:gap-6 flex-wrap text-xs sm:text-sm">
              <a href="https://github.com/sujal-GITHUB/Codentis" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                GitHub
              </a>
              <a href="https://github.com/sujal-GITHUB/Codentis/issues" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Report Issue
              </a>
              <a href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Documentation
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] mt-16 sm:mt-20">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="text-center text-zinc-500 text-xs sm:text-sm">
            <p>© 2024 Codentis. Open source AI coding assistant.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
