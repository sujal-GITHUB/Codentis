"use client";
import { useEffect, useState } from "react";

export default function Hero() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStep(1), 800),
            setTimeout(() => setStep(2), 2000),
            setTimeout(() => setStep(3), 3500),
            setTimeout(() => setStep(4), 4800),
            setTimeout(() => setStep(5), 6500),
            setTimeout(() => setStep(6), 7800),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <section
            id="hero"
            className="relative min-h-[90vh] sm:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden bg-black"
        >
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slide-grid {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(4rem); }
                }
                @keyframes streak-x {
                    0% { transform: translateX(-100vw); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateX(100vw); opacity: 0; }
                }
                @keyframes streak-x-reverse {
                    0% { transform: translateX(100vw); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateX(-100vw); opacity: 0; }
                }
                @keyframes streak-y {
                    0% { transform: translateY(-100vh); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
            `}} />

            {/* ── Grid & Glow Background ── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div
                    className="absolute inset-[-100%] bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_80%,transparent_100%)]"
                    style={{ animation: 'slide-grid 10s linear infinite' }}
                ></div>

                {/* Animated Matrix Streaks - Only show some on mobile */}
                <div className="absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)]">
                    {/* Horizontal Streaks */}
                    <div className="absolute top-[15%] left-0 w-64 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#22d3ee]" style={{ animation: 'streak-x 7s linear infinite 1s' }}></div>
                    <div className="absolute top-[35%] left-0 w-48 h-[1px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_10px_#22d3ee] hidden sm:block" style={{ animation: 'streak-x-reverse 9s linear infinite 4s' }}></div>
                    <div className="absolute top-[55%] left-0 w-96 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#22d3ee]" style={{ animation: 'streak-x 6s linear infinite 2s' }}></div>
                    <div className="absolute top-[75%] left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_10px_#22d3ee] hidden sm:block" style={{ animation: 'streak-x-reverse 8s linear infinite 0.5s' }}></div>
                    <div className="absolute top-[85%] left-0 w-72 h-[1px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_10px_#22d3ee]" style={{ animation: 'streak-x 11s linear infinite 5s' }}></div>

                    {/* Vertical Streaks */}
                    <div className="absolute top-0 left-[10%] w-[1px] h-64 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#22d3ee]" style={{ animation: 'streak-y 8s linear infinite 0.5s' }}></div>
                    <div className="absolute top-0 left-[90%] w-[1px] h-48 bg-gradient-to-b from-transparent via-cyan-500 to-transparent shadow-[0_0_10px_#22d3ee]" style={{ animation: 'streak-y 11s linear infinite 0s' }}></div>
                </div>

                {/* Center Glow - Scaled down for mobile */}
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full max-w-[800px] aspect-square sm:h-[600px] bg-cyan-700/20 rounded-full blur-[80px] sm:blur-[120px] opacity-70 mix-blend-screen"></div>
            </div>

            {/* ── Hero Content ── */}
            <div className="relative z-10 w-full max-w-[900px] flex flex-col items-center text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-6 sm:mb-8 border border-cyan-500/20 bg-cyan-500/10 rounded-full text-xs sm:text-sm font-medium text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.15)] relative overflow-hidden transition-all duration-300 hover:bg-cyan-500/15">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span className="bg-gradient-to-r from-cyan-200 to-cyan-400 bg-clip-text text-transparent">AI Developer Agent</span>
                </div>

                {/* Heading */}
                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-6 text-white">
                    Intelligence Meets <br className="hidden sm:block" />
                    <span className="bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                        The Terminal
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-[550px] mx-auto mb-10">
                    Run intelligent workflows directly in your terminal.
                    <span className="text-zinc-300 block mt-2 font-normal text-xs sm:text-sm">Faster code generation, robust refactoring, and AI-powered system tools.</span>
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-16 sm:mb-20 px-4 sm:px-0">
                    <a
                        href="/Codentis.exe"
                        download
                        className="inline-flex items-center justify-center gap-2 px-7 py-2.5 sm:px-8 sm:py-3 w-fit sm:w-auto bg-white text-black text-[13px] sm:text-sm font-bold rounded-full hover:bg-zinc-100 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                        Download Codentis
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    </a>

                    <a
                        href="https://github.com/sujal-GITHUB/Codentis"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-7 py-2.5 sm:px-8 sm:py-3 w-fit sm:w-auto bg-zinc-900 border border-cyan-900/50 text-white text-[13px] sm:text-sm font-normal rounded-full hover:bg-zinc-800 transition-all active:scale-95"
                    >
                        <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-3.96-1.38-.09-.225-.48-1.38-.825-1.65-.285-.225-.69-.57-.015-.585.645-.015 1.11.585 1.275.855.75 1.26 1.95.885 2.43.675.075-.525.285-.885.51-1.08-2.37-.255-4.86-1.155-4.86-5.13 0-1.125.39-2.07 1.035-2.82-.105-.27-.45-1.35.105-2.805 0 0 .855-.27 2.79 1.05A9.73 9.73 0 0 1 12 6.84c.855.015 1.71.12 2.52.345 1.935-1.32 2.79-1.05 2.79-1.05.555 1.455.21 2.535.105 2.805.645.75 1.035 1.695 1.035 2.82 0 3.99-2.49 4.875-4.875 5.13.3.255.555.75.555 1.5 0 1.08-.015 1.95-.015 2.22 0 .315.225.69.84.57C20.58 21.78 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        View on GitHub
                    </a>
                </div>

                {/* ── Terminal Mockup ── */}
                <div className="w-full max-w-[800px] border border-cyan-500/10 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(34,211,238,0.1)] text-left bg-[#0A0A0A]/90 backdrop-blur-xl relative transform transition-transform duration-700 hover:scale-[1.01]">

                    {/* Terminal Header */}
                    <div className="flex items-center px-4 py-2 sm:py-3 border-b border-cyan-500/10 bg-cyan-950/20">
                        <div className="flex gap-1.5 sm:gap-2">
                            <div className="w-2.5 h-2.5 sm:w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-2.5 h-2.5 sm:w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-2.5 h-2.5 sm:w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="w-full text-center text-[10px] sm:text-xs text-cyan-500/50 font-mono tracking-wider items-center justify-center pointer-events-none absolute left-0 pr-12">
                            codentis — bash
                        </div>
                    </div>

                    {/* Terminal Body */}
                    <div className="p-4 sm:p-6 font-mono text-[11px] xs:text-xs sm:text-sm leading-relaxed text-zinc-300 min-h-[250px] sm:min-h-[300px]">
                        {/* Command 1 */}
                        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${step >= 1 ? 'max-h-[100px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <span className="text-cyan-400">~/project</span>
                            <span className="text-cyan-700"> $ </span>
                            <span className="text-zinc-100">codentis analyze repo</span>
                        </div>
                        <div className={`mt-2 mb-4 text-emerald-400 pl-4 border-l-2 border-cyan-500/20 transition-all duration-700 ease-in-out overflow-hidden ${step >= 2 ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0 mb-0'}`}>
                            &gt; Analyzing repository structure...<br />
                            &gt; Found Next.js app, Express backend, and 45 components.<br />
                            &gt; Suggested optimizations: 3 performance, 2 security.
                        </div>

                        {/* Command 2 */}
                        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${step >= 3 ? 'max-h-[100px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <span className="text-cyan-400">~/project</span>
                            <span className="text-cyan-700"> $ </span>
                            <span className="text-zinc-100">codentis generate tests</span>
                        </div>
                        <div className={`mt-2 mb-4 text-cyan-200 pl-4 border-l-2 border-cyan-500/20 transition-all duration-700 ease-in-out overflow-hidden ${step >= 4 ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0 mb-0'}`}>
                            &gt; Generating unit tests for auth module...<br />
                            <span className="text-zinc-400">  CREATE  tests/auth.test.ts (240ms)</span><br />
                            <span className="text-emerald-400">✔ 12 tests passed, 0 failed.</span>
                        </div>

                        {/* Command 3 */}
                        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${step >= 5 ? 'max-h-[100px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <span className="text-cyan-400">~/project</span>
                            <span className="text-cyan-700"> $ </span>
                            <span className="text-zinc-100">codentis refactor module</span>
                        </div>
                        <div className={`mt-2 text-cyan-300 pl-4 border-l-2 border-cyan-500/20 transition-all duration-700 ease-in-out overflow-hidden ${step >= 6 ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0 mt-0'}`}>
                            &gt; Applying modern React patterns to legacy classes.<br />
                            &gt; Refactored 3 files to functional components.<br />
                            <span className="animate-pulse inline-block w-2 h-4 bg-cyan-400 align-middle ml-1"></span>
                        </div>

                        {/* Base blinking cursor when waiting */}
                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${step === 0 || step === 2 || step === 4 ? 'max-h-[50px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <span className="text-cyan-400">~/project</span>
                            <span className="text-cyan-700"> $ </span>
                            <span className="animate-pulse inline-block w-2 h-4 bg-cyan-300 align-middle ml-1 shadow-[0_0_8px_rgba(34,211,238,0.6)]"></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
