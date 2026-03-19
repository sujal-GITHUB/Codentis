'use client';
import { useState, useMemo } from 'react';

const VERSION = '1.5.1';

// Simple icons as SVG components
const WindowsIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.351" />
  </svg>
);

const AppleIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const LinuxIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 01-.088.094c-.196.184-.4.213-.634.255-.233.043-.484.095-.708.23-.127.077-.194.178-.282.284-.043.053-.15.163-.191.203-.040.05-.085.086-.1.148-.012.05-.004.094-.004.148 0 .059-.012.106-.04.16-.020.038-.039.054-.056.094-.019.044-.031.094-.044.148l-.015.018-.563-1.065c-.067-.134-.16-.2-.278-.2-.118 0-.2.066-.267.2l-.563 1.065-.015-.018c-.012-.054-.024-.104-.043-.148-.017-.04-.037-.056-.056-.094-.028-.054-.04-.101-.04-.16 0-.054.008-.098-.004-.148-.016-.062-.061-.098-.101-.148-.041-.04-.148-.15-.191-.203-.088-.106-.155-.207-.282-.284-.224-.135-.475-.187-.708-.23-.234-.042-.438-.071-.634-.255a.71.71 0 01-.088-.094.953.953 0 01-.213-.335 1.807 1.807 0 01-.15-.706l-.004.024a.086.086 0 01-.004.021v-.105c0 .02.006.04.006.06.008-.265.061-.465.166-.724.107-.201.247-.398.438-.533.188-.136.371-.198.584-.198h.013z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const DownloadDrawer = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) => {
  const [view, setView] = useState('default');

  const content = useMemo(() => {
    switch (view) {
      case 'default':
        return (
          <div className="space-y-5">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-lg font-semibold text-white">Download Codentis</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/[0.06] transition-colors"
              >
                <CloseIcon />
              </button>
            </div>
            
            <p className="text-zinc-500 text-sm">Choose your platform to get started</p>
            
            <div className="space-y-3">
              {/* Windows */}
              <button
                onClick={() => setView('windows')}
                className="w-full flex items-center gap-3 p-3 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-cyan-500/30 rounded-lg transition-all text-left group"
              >
                <div className="w-5 h-5 text-cyan-400">
                  <WindowsIcon />
                </div>
                <div>
                  <div className="text-white/90 group-hover:text-white font-medium text-sm">Windows</div>
                  <div className="text-zinc-500 text-xs">Windows 10/11</div>
                </div>
              </button>
              
              {/* macOS */}
              <button
                onClick={() => setView('macos')}
                className="w-full flex items-center gap-3 p-3 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-cyan-500/30 rounded-lg transition-all text-left group"
              >
                <div className="w-5 h-5 text-cyan-400">
                  <AppleIcon />
                </div>
                <div>
                  <div className="text-white/90 group-hover:text-white font-medium text-sm">macOS</div>
                  <div className="text-zinc-500 text-xs">macOS 11+</div>
                </div>
              </button>
              
              {/* Linux */}
              <button
                onClick={() => setView('linux')}
                className="w-full flex items-center gap-3 p-3 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-cyan-500/30 rounded-lg transition-all text-left group"
              >
                <div className="w-5 h-5 text-cyan-400">
                  <LinuxIcon />
                </div>
                <div>
                  <div className="text-white/90 group-hover:text-white font-medium text-sm">Linux</div>
                  <div className="text-zinc-500 text-xs">Ubuntu, Debian, Fedora</div>
                </div>
              </button>
            </div>
          </div>
        );
        
      case 'windows':
        return (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setView('default')}
                  className="p-1 hover:bg-white/[0.06] rounded transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="w-5 h-5 text-cyan-400">
                  <WindowsIcon />
                </div>
                <h2 className="text-lg font-semibold text-white">Windows</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/[0.06] transition-colors"
              >
                <CloseIcon />
              </button>
            </div>
            
            <div className="space-y-3">
              <a
                href={`https://github.com/sujal-GITHUB/Codentis/releases/download/v${VERSION}/Codentis-Setup-${VERSION}.exe`}
                className="flex items-center justify-center gap-2 w-full p-3 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-colors shadow-[0_0_20px_rgba(34,211,238,0.2)] text-sm"
              >
                <DownloadIcon />
                Download Installer
              </a>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-zinc-400 text-xs leading-relaxed">
                  💡 Run the installer and follow the setup wizard. After installation, open a terminal and run <code className="text-cyan-300 bg-black/50 px-1 py-0.5 rounded font-mono text-[10px]">codentis config</code> to set up your API key.
                </p>
                <p className="text-yellow-400 text-xs mt-2 leading-relaxed">
                  ⚠️ Windows may show a SmartScreen warning for unsigned apps. Click "More info" → "Run anyway" to proceed.
                </p>
              </div>
            </div>
          </div>
        );
        
      case 'macos':
        return (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setView('default')}
                  className="p-1 hover:bg-white/[0.06] rounded transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="w-5 h-5 text-cyan-400">
                  <AppleIcon />
                </div>
                <h2 className="text-lg font-semibold text-white">macOS</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/[0.06] transition-colors"
              >
                <CloseIcon />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://github.com/sujal-GITHUB/Codentis/releases/download/v${VERSION}/Codentis-${VERSION}-arm64.pkg`}
                  className="flex items-center justify-center gap-1.5 p-2.5 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-colors text-xs shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                >
                  <DownloadIcon />
                  Apple Silicon
                </a>
                <a
                  href={`https://github.com/sujal-GITHUB/Codentis/releases/download/v${VERSION}/Codentis-${VERSION}-intel.pkg`}
                  className="flex items-center justify-center gap-1.5 p-2.5 bg-cyan-500/80 hover:bg-cyan-500 text-black font-semibold rounded-lg transition-colors text-xs"
                >
                  <DownloadIcon />
                  Intel
                </a>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-zinc-400 text-xs leading-relaxed">
                  M series Macs use Apple Silicon. Older Macs use Intel. Double-click the .pkg file to install. After installation, run <code className="text-cyan-300 bg-black/50 px-1 py-0.5 rounded font-mono text-[10px]">codentis config</code> in Terminal.
                </p>
              </div>
            </div>
          </div>
        );
        
      case 'linux':
        return (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setView('default')}
                  className="p-1 hover:bg-white/[0.06] rounded transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="w-5 h-5 text-cyan-400">
                  <LinuxIcon />
                </div>
                <h2 className="text-lg font-semibold text-white">Linux</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/[0.06] transition-colors"
              >
                <CloseIcon />
              </button>
            </div>
            
            <div className="space-y-3">
              <a
                href={`https://github.com/sujal-GITHUB/Codentis/releases/download/v${VERSION}/codentis_${VERSION}_amd64.deb`}
                className="flex items-center justify-center gap-2 w-full p-3 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-colors shadow-[0_0_20px_rgba(34,211,238,0.2)] text-sm"
              >
                <DownloadIcon />
                Download .deb
              </a>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-zinc-400 text-xs leading-relaxed">
                  💡 Install with <code className="text-cyan-300 bg-black/50 px-1 py-0.5 rounded font-mono text-[10px]">sudo dpkg -i codentis_{VERSION}_amd64.deb</code> then run <code className="text-cyan-300 bg-black/50 px-1 py-0.5 rounded font-mono text-[10px]">codentis config</code> to set up your API key.
                </p>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  }, [view, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={() => setIsOpen(false)}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-black/95 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl border border-white/[0.05] animate-in slide-in-from-bottom-4 duration-300">
        {content}
      </div>
    </div>
  );
};