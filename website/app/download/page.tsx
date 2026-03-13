import Navbar from "../components/Navbar";

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
            <h1 className="text-[clamp(2rem,5vw,3rem)] font-semibold tracking-[-0.03em] leading-[1.15] mb-4 sm:mb-6">
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
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
                  </svg>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white/90 group-hover:text-white transition-colors">Windows</h3>
                    <p className="text-xs sm:text-sm text-zinc-500">Windows 10/11</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <a
                    href="/Codentis-Setup-0.1.0.exe"
                    download
                    className="px-4 sm:px-5 py-2 sm:py-2.5 bg-cyan-500 hover:bg-cyan-600 text-black text-xs sm:text-sm font-semibold rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
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
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white/90 group-hover:text-white transition-colors">macOS</h3>
                    <p className="text-xs sm:text-sm text-zinc-500">macOS 11+</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <a
                    href="/Codentis-0.1.0-arm64.pkg"
                    download
                    className="px-4 sm:px-5 py-2 sm:py-2.5 bg-cyan-500 hover:bg-cyan-600 text-black text-xs sm:text-sm font-semibold rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span>Apple Silicon</span>
                  </a>
                  <a
                    href="/Codentis-0.1.0-intel.pkg"
                    download
                    className="px-4 sm:px-5 py-2 sm:py-2.5 bg-cyan-500/80 hover:bg-cyan-500 text-black text-xs sm:text-sm font-semibold rounded-full transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span>Intel</span>
                  </a>
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 sm:p-4 text-xs sm:text-sm">
                <p className="text-zinc-500 text-[0.75rem] sm:text-[0.8rem]">
                  💡 M1/M2/M3 Macs use Apple Silicon. Older Macs use Intel. Double-click the .pkg file to install. After installation, run <code className="text-cyan-300 bg-black/50 px-1.5 py-0.5 rounded font-mono text-[0.7rem]">codentis config</code> in Terminal.
                </p>
              </div>
            </div>

            {/* Linux */}
            <div className="p-5 sm:p-6 border border-white/[0.05] bg-bg-2 rounded-2xl hover:border-cyan-500/30 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="4 17 10 11 4 5"></polyline>
                    <line x1="12" y1="19" x2="20" y2="19"></line>
                  </svg>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white/90 group-hover:text-white transition-colors">Linux</h3>
                    <p className="text-xs sm:text-sm text-zinc-500">Ubuntu, Debian, Fedora, Arch</p>
                  </div>
                </div>
                <a
                  href="/codentis_0.1.0_amd64.deb"
                  download
                  className="px-4 sm:px-5 py-2 sm:py-2.5 bg-cyan-500 hover:bg-cyan-600 text-black text-xs sm:text-sm font-semibold rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>Download .deb</span>
                </a>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 sm:p-4 text-xs sm:text-sm">
                <p className="text-zinc-500 text-[0.75rem] sm:text-[0.8rem]">
                  💡 Install with <code className="text-cyan-300 bg-black/50 px-1.5 py-0.5 rounded font-mono text-[0.7rem]">sudo dpkg -i codentis_0.1.0_amd64.deb</code> then run <code className="text-cyan-300 bg-black/50 px-1.5 py-0.5 rounded font-mono text-[0.7rem]">codentis config</code> to set up your API key.
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
