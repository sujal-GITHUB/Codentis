"use client";
import { useState } from "react";
import { DownloadDrawer } from "./DownloadDrawer";

export default function CTA() {
    const [isDownloadOpen, setIsDownloadOpen] = useState(false);

    return (
        <section className="py-24 sm:py-32 sm:py-40 relative overflow-hidden">
            {/* Subtle sticks in CTA too */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div
                    className="light-stick absolute bottom-0 left-[40%] w-[16px] h-[60%]"
                    style={{
                        background: "linear-gradient(to top, #0891b2 0%, #22d3ee 40%, transparent 100%)",
                        filter: "blur(50px)",
                        animation: "stick-1 12s ease-in-out infinite",
                    }}
                />
                <div
                    className="light-stick absolute bottom-0 left-[55%] w-[12px] h-[50%]"
                    style={{
                        background: "linear-gradient(to top, #06b6d4 0%, transparent 100%)",
                        filter: "blur(45px)",
                        animation: "stick-2 10s ease-in-out infinite",
                    }}
                />
            </div>

            <div className="max-w-[1120px] mx-auto px-6 relative z-[2] text-center">
                <h2 className="text-[clamp(1.5rem,5vw,2.6rem)] font-semibold tracking-[-0.03em] leading-[1.15] mb-5 text-gradient">
                    Ready to code with
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent' }}>
                        AI in your terminal?
                    </span>
                </h2>
                <p className="text-zinc-500 text-sm sm:text-base mb-10 max-w-[400px] mx-auto">
                    Free. Open source. Built by developers, for developers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => setIsDownloadOpen(true)}
                        className="inline-flex items-center cursor-pointer justify-center gap-2 px-7 py-2.5 sm:px-9 sm:py-3.5 bg-white text-black text-[13px] sm:text-sm font-bold rounded-full hover:bg-zinc-100 transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                    >
                        Download Codentis
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    </button>
                    <a
                        href="https://github.com/sujal-GITHUB/Codentis"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-7 py-2.5 sm:px-9 sm:py-3.5 bg-zinc-900 border border-cyan-900/50 text-white text-[13px] sm:text-sm font-normal rounded-full hover:bg-zinc-800 transition-all active:scale-95"
                    >
                        <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-3.96-1.38-.09-.225-.48-1.38-.825-1.65-.285-.225-.69-.57-.015-.585.645-.015 1.11.585 1.275.855.75 1.26 1.95.885 2.43.675.075-.525.285-.885.51-1.08-2.37-.255-4.86-1.155-4.86-5.13 0-1.125.39-2.07 1.035-2.82-.105-.27-.45-1.35.105-2.805 0 0 .855-.27 2.79 1.05A9.73 9.73 0 0 1 12 6.84c.855.015 1.71.12 2.52.345 1.935-1.32 2.79-1.05 2.79-1.05.555 1.455.21 2.535.105 2.805.645.75 1.035 1.695 1.035 2.82 0 3.99-2.49 4.875-4.875 5.13.3.255.555.75.555 1.5 0 1.08-.015 1.95-.015 2.22 0 .315.225.69.84.57C20.58 21.78 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        View on GitHub
                    </a>
                </div>
            </div>
            
            {/* Download Drawer */}
            <DownloadDrawer isOpen={isDownloadOpen} setIsOpen={setIsDownloadOpen} />
        </section>
    );
}
