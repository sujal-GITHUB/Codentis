"use client";
import { useEffect, useState } from "react";

export default function Hero() {
    const [step, setStep] = useState(0);
    const [textStep, setTextStep] = useState(0);
    const [line1Text, setLine1Text] = useState("");
    const [line2Text, setLine2Text] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const [currentLine, setCurrentLine] = useState(1);
    const [typewriterComplete, setTypewriterComplete] = useState(false);
    const [typewriterStarted, setTypewriterStarted] = useState(false);

    const line1 = "Intelligence Meets";
    const line2 = "The Terminal";

    useEffect(() => {
        // Text animation sequence
        const textTimers = [
            setTimeout(() => setTextStep(2), 300),   // Start typewriter immediately
            // Subtitle, CTAs, and Trusted by will be triggered by typewriter completion
        ];

        // Terminal animation sequence (starts sooner)
        const terminalTimers = [
            setTimeout(() => setStep(1), 3000),  // Start much earlier
            setTimeout(() => setStep(2), 3500),
            setTimeout(() => setStep(3), 4200),
            setTimeout(() => setStep(4), 5000),
            setTimeout(() => setStep(5), 6000),
            setTimeout(() => setStep(6), 7000),
        ];
        
        return () => {
            textTimers.forEach(clearTimeout);
            terminalTimers.forEach(clearTimeout);
        };
    }, []);

    // Typewriter effect for both lines
    useEffect(() => {
        if (textStep >= 2 && !typewriterStarted) {
            setTypewriterStarted(true);
            
            // Type first line
            let index1 = 0;
            const type1 = setInterval(() => {
                if (index1 <= line1.length) {
                    setLine1Text(line1.slice(0, index1));
                    index1++;
                } else {
                    clearInterval(type1);
                    
                    // Trigger other elements after first line
                    setTimeout(() => setTextStep(3), 300);  // Subtitle
                    setTimeout(() => setTextStep(4), 600);  // CTAs
                    setTimeout(() => setTextStep(5), 900);  // Trusted by
                    
                    // Start second line after pause
                    setTimeout(() => {
                        setCurrentLine(2);
                        let index2 = 0;
                        const type2 = setInterval(() => {
                            if (index2 <= line2.length) {
                                setLine2Text(line2.slice(0, index2));
                                index2++;
                            } else {
                                clearInterval(type2);
                                setTypewriterComplete(true);
                                setTimeout(() => setShowCursor(false), 500);
                            }
                        }, 60);
                    }, 400);
                }
            }, 60);
        }
    }, [textStep, typewriterStarted]);

    return (
        <section
            id="hero"
            className="relative min-h-[90vh] sm:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 sm:pt-32 pb-0 sm:pb-24 overflow-hidden bg-black"
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
            <div className="relative z-10 w-full max-w-[1100px] flex flex-col items-center text-center">
                {/* Heading */}
                <h1 className={`text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] sm:leading-[0.75] mb-6 text-white text-balance transition-all duration-700 min-h-[2.4em] ${
                    textStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                    <span className="block">
                        {typewriterComplete ? line1 : line1Text}
                        {currentLine === 1 && showCursor && textStep >= 2 && !typewriterComplete && (
                            <span className="animate-pulse text-cyan-400 font-normal">|</span>
                        )}
                    </span>
                    <br className="hidden sm:block" />
                    <span className="bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.3)] block">
                        {typewriterComplete ? line2 : line2Text}
                        {currentLine === 2 && showCursor && textStep >= 2 && !typewriterComplete && (
                            <span className="animate-pulse text-cyan-400 font-normal">|</span>
                        )}
                    </span>
                </h1>

                {/* Subtitle */}
                <p className={`text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-[750px] mx-auto mb-10 transition-all duration-700 ${
                    textStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                    Run intelligent workflows directly in your terminal with AI-powered code generation, automated refactoring, and seamless tool integration.
                    <span className="text-zinc-300 block mt-2 font-normal text-xs sm:text-sm md:text-base">Faster code generation, robust refactoring, and AI-powered system tools.</span>
                </p>

                {/* CTAs */}
                <div className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4 sm:px-0 transition-all duration-700 ${
                    textStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                    <a
                        href="/download"
                        className="inline-flex items-center hover:cursor-pointer justify-center gap-2 px-7 py-2.5 sm:px-9 sm:py-3.5 w-fit sm:w-auto bg-white text-black text-[13px] sm:text-sm font-bold rounded-full hover:bg-zinc-100 transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                    >
                        Download Codentis
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    </a>

                    <a
                        href="https://github.com/sujal-GITHUB/Codentis"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-7 py-2.5 sm:px-9 sm:py-3.5 w-fit sm:w-auto bg-zinc-900 border border-cyan-900/50 text-white text-[13px] sm:text-sm font-normal rounded-full hover:bg-zinc-800 transition-all active:scale-95"
                    >
                        <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-3.96-1.38-.09-.225-.48-1.38-.825-1.65-.285-.225-.69-.57-.015-.585.645-.015 1.11.585 1.275.855.75 1.26 1.95.885 2.43.675.075-.525.285-.885.51-1.08-2.37-.255-4.86-1.155-4.86-5.13 0-1.125.39-2.07 1.035-2.82-.105-.27-.45-1.35.105-2.805 0 0 .855-.27 2.79 1.05A9.73 9.73 0 0 1 12 6.84c.855.015 1.71.12 2.52.345 1.935-1.32 2.79-1.05 2.79-1.05.555 1.455.21 2.535.105 2.805.645.75 1.035 1.695 1.035 2.82 0 3.99-2.49 4.875-4.875 5.13.3.255.555.75.555 1.5 0 1.08-.015 1.95-.015 2.22 0 .315.225.69.84.57C20.58 21.78 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        View on GitHub
                    </a>
                </div>

                {/* Trusted By Section */}
                <div className={`relative mb-16 sm:mb-20 w-full max-w-[1000px] transition-all duration-700 ${
                    textStep >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                    {/* Side blur gradients */}
                    <div className="absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-black via-black/60 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-24 sm:w-32 bg-gradient-to-l from-black via-black/60 to-transparent z-10 pointer-events-none"></div>
                    
                    <div className="text-center">
                        <p className="text-sm sm:text-base text-zinc-400 mb-8 sm:mb-12 font-medium">
                            Trusted by <span className="text-white font-semibold">1000+</span> developers worldwide
                        </p>
                        
                        {/* Companies container */}
                        <div className="relative overflow-hidden">
                            <div className="flex items-center justify-center gap-12 sm:gap-16 lg:gap-20 opacity-60 hover:opacity-80 transition-opacity duration-500 animate-scroll-left">
                                <div className="flex items-center gap-3 sm:gap-4 text-zinc-500 hover:text-zinc-300 transition-all duration-300 group cursor-pointer flex-shrink-0">
                                    <div className="group-hover:scale-110 transition-transform duration-300 text-zinc-400 group-hover:text-zinc-200">
                                        <img
                                            src="/black-cohere-logo_svgstack_com_37031773840824.svg"
                                            alt="Cohere logo"
                                            className="w-6 h-6 sm:w-7 sm:h-7 opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert"
                                        />
                                    </div>
                                    <span className="text-base sm:text-lg font-medium tracking-tight group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                                        Cohere
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-3 sm:gap-4 text-zinc-500 hover:text-zinc-300 transition-all duration-300 group cursor-pointer flex-shrink-0">
                                    <div className="group-hover:scale-110 transition-transform duration-300 text-zinc-400 group-hover:text-zinc-200">
                                        <img
                                            src="/fireworks-ai-app-logo_svgstack_com_37111773840782.svg"
                                            alt="Fireworks AI logo"
                                            className="w-6 h-6 sm:w-7 sm:h-7 opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert"
                                        />
                                    </div>
                                    <span className="text-base sm:text-lg font-medium tracking-tight group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                                        Fireworks AI
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-3 sm:gap-4 text-zinc-500 hover:text-zinc-300 transition-all duration-300 group cursor-pointer flex-shrink-0">
                                    <div className="group-hover:scale-110 transition-transform duration-300 text-zinc-400 group-hover:text-zinc-200">
                                        <img
                                            src="/hume-ai.svg"
                                            alt="Hume AI logo"
                                            className="w-6 h-6 sm:w-7 sm:h-7 opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert"
                                        />
                                    </div>
                                    <span className="text-base sm:text-lg font-medium tracking-tight group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                                        Hume AI
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-3 sm:gap-4 text-zinc-500 hover:text-zinc-300 transition-all duration-300 group cursor-pointer flex-shrink-0">
                                    <div className="group-hover:scale-110 transition-transform duration-300 text-zinc-400 group-hover:text-zinc-200">
                                        <img
                                            src="/suno.svg"
                                            alt="Suno logo"
                                            className="w-6 h-6 sm:w-7 sm:h-7 opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert"
                                        />
                                    </div>
                                    <span className="text-base sm:text-lg font-medium tracking-tight group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                                        Suno
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-3 sm:gap-4 text-zinc-500 hover:text-zinc-300 transition-all duration-300 group cursor-pointer flex-shrink-0">
                                    <div className="group-hover:scale-110 transition-transform duration-300 text-zinc-400 group-hover:text-zinc-200">
                                        <img
                                            src="/xata.svg"
                                            alt="Xata logo"
                                            className="w-6 h-6 sm:w-7 sm:h-7 opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert"
                                        />
                                    </div>
                                    <span className="text-base sm:text-lg font-medium tracking-tight group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                                        Xata
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-3 sm:gap-4 text-zinc-500 hover:text-zinc-300 transition-all duration-300 group cursor-pointer flex-shrink-0">
                                    <div className="group-hover:scale-110 transition-transform duration-300 text-zinc-400 group-hover:text-zinc-200">
                                        <img
                                            src="/model-context-protocol-dark.svg"
                                            alt="MCP logo"
                                            className="w-6 h-6 sm:w-7 sm:h-7 opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert"
                                        />
                                    </div>
                                    <span className="text-base sm:text-lg font-medium tracking-tight group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                                        MCP
                                    </span>
                                </div>
                                
                                {/* Duplicate set for seamless loop */}
                                <div className="flex items-center gap-3 sm:gap-4 text-zinc-500 hover:text-zinc-300 transition-all duration-300 group cursor-pointer flex-shrink-0">
                                    <div className="group-hover:scale-110 transition-transform duration-300 text-zinc-400 group-hover:text-zinc-200">
                                        <img
                                            src="/black-cohere-logo_svgstack_com_37031773840824.svg"
                                            alt="Cohere logo"
                                            className="w-6 h-6 sm:w-7 sm:h-7 opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert"
                                        />
                                    </div>
                                    <span className="text-base sm:text-lg font-medium tracking-tight group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                                        Cohere
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-3 sm:gap-4 text-zinc-500 hover:text-zinc-300 transition-all duration-300 group cursor-pointer flex-shrink-0">
                                    <div className="group-hover:scale-110 transition-transform duration-300 text-zinc-400 group-hover:text-zinc-200">
                                        <img
                                            src="/fireworks-ai-app-logo_svgstack_com_37111773840782.svg"
                                            alt="Fireworks AI logo"
                                            className="w-6 h-6 sm:w-7 sm:h-7 opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert"
                                        />
                                    </div>
                                    <span className="text-base sm:text-lg font-medium tracking-tight group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                                        Fireworks AI
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-3 sm:gap-4 text-zinc-500 hover:text-zinc-300 transition-all duration-300 group cursor-pointer flex-shrink-0">
                                    <div className="group-hover:scale-110 transition-transform duration-300 text-zinc-400 group-hover:text-zinc-200">
                                        <img
                                            src="/hume-ai.svg"
                                            alt="Hume AI logo"
                                            className="w-6 h-6 sm:w-7 sm:h-7 opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert"
                                        />
                                    </div>
                                    <span className="text-base sm:text-lg font-medium tracking-tight group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                                        Hume AI
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Terminal Mockup ── */}
                <div className="w-full max-w-[1000px] rounded-2xl border border-white/[0.04] bg-bg-1 overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.04)] text-left relative">

                    {/* Terminal Header */}
                    <div className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-2 border-b border-white/[0.04]">
                        <div className="flex gap-1.5 shrink-0">
                            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#ff5f57]" />
                            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#febc2e]" />
                            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#28c840]" />
                        </div>
                        <span className="font-mono text-[10px] sm:text-[0.72rem] text-zinc-500 truncate ml-1">
                            codentis — ~/projects
                        </span>
                    </div>

                    {/* Terminal Body */}
                    <div className="p-4 sm:p-6 font-mono text-[11px] sm:text-[0.85rem] h-[400px] sm:h-[450px] overflow-y-auto scrollbar-hide">
                        {/* Command Line with Typing Animation */}
                        <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
                            <span className="text-cyan-400 font-bold">$</span>
                            <span className="text-white">
                                <span 
                                    className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-cyan-400"
                                    style={{
                                        animation: step >= 1 ? 'typing 2s steps(40, end) forwards, blink-caret 1s step-end infinite' : 'none',
                                        width: step >= 1 ? '100%' : '0'
                                    }}
                                >
                                    codentis chat "Explain how Codentis works"
                                </span>
                            </span>
                        </div>

                        {/* Response Content */}
                        <div className="mt-3 sm:mt-4 space-y-0 text-wrap break-words">
                            {/* Response Header */}
                            <div className={`mb-3 sm:mb-4 text-cyan-300 transition-all duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                                ──── Codentis ────
                            </div>

                            {/* Streaming Response Lines */}
                            <div className={`leading-[1.7] sm:leading-[1.9] transition-all duration-300 text-zinc-400 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                                <span 
                                    className="inline-block"
                                    style={{
                                        animation: step >= 3 ? 'typewriter 1.5s steps(50, end) forwards' : 'none'
                                    }}
                                >
                                    Codentis is a modular CLI AI agent built in Python.
                                </span>
                            </div>
                            
                            <div className="leading-[1.7] sm:leading-[1.9] text-zinc-400">&nbsp;</div>
                            
                            <div className={`leading-[1.7] sm:leading-[1.9] transition-all duration-300 delay-1000 text-zinc-400 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                                <span 
                                    className="inline-block"
                                    style={{
                                        animation: step >= 4 ? 'typewriter 1s steps(35, end) forwards' : 'none'
                                    }}
                                >
                                    It uses an event-driven architecture:
                                </span>
                            </div>
                            
                            <div className={`leading-[1.7] sm:leading-[1.9] transition-all duration-300 delay-[1500ms] text-cyan-500 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                                <span 
                                    className="inline-block"
                                    style={{
                                        animation: step >= 4 ? 'typewriter 0.8s steps(30, end) 1.5s forwards' : 'none'
                                    }}
                                >
                                    &nbsp;&nbsp;→ CLI captures your prompt via Click
                                </span>
                            </div>
                            
                            <div className={`leading-[1.7] sm:leading-[1.9] transition-all duration-300 delay-[2000ms] text-cyan-500 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                                <span 
                                    className="inline-block"
                                    style={{
                                        animation: step >= 4 ? 'typewriter 0.8s steps(30, end) 2s forwards' : 'none'
                                    }}
                                >
                                    &nbsp;&nbsp;→ Agent orchestrates the agentic loop
                                </span>
                            </div>
                            
                            <div className={`leading-[1.7] sm:leading-[1.9] transition-all duration-300 delay-[2500ms] text-cyan-500 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                                <span 
                                    className="inline-block"
                                    style={{
                                        animation: step >= 4 ? 'typewriter 0.8s steps(35, end) 2.5s forwards' : 'none'
                                    }}
                                >
                                    &nbsp;&nbsp;→ LLMClient streams from OpenAI / OpenRouter
                                </span>
                            </div>
                            
                            <div className={`leading-[1.7] sm:leading-[1.9] transition-all duration-300 delay-[3000ms] text-cyan-500 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                                <span 
                                    className="inline-block"
                                    style={{
                                        animation: step >= 4 ? 'typewriter 0.8s steps(30, end) 3s forwards' : 'none'
                                    }}
                                >
                                    &nbsp;&nbsp;→ TUI renders with Rich in real-time
                                </span>
                            </div>

                            <div className="leading-[1.7] sm:leading-[1.9] text-zinc-400">&nbsp;</div>

                            <div className={`leading-[1.7] sm:leading-[1.9] transition-all duration-300 delay-[3500ms] text-zinc-400 ${step >= 5 ? 'opacity-100' : 'opacity-0'}`}>
                                <span 
                                    className="inline-block"
                                    style={{
                                        animation: step >= 5 ? 'typewriter 1s steps(35, end) 3.5s forwards' : 'none'
                                    }}
                                >
                                    Fully async, resilient, and extensible. ✨
                                </span>
                            </div>
                        </div>

                        {/* Blinking cursor when waiting */}
                        <div className={`transition-all duration-300 ${step === 0 ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="flex items-center gap-2 sm:gap-2.5">
                                <span className="text-cyan-400 font-bold">$</span>
                                <span className="animate-pulse inline-block w-2 h-4 bg-cyan-300 align-middle shadow-[0_0_8px_rgba(34,211,238,0.6)]"></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CSS Animations */}
                <style jsx>{`
                    @keyframes typing {
                        from { width: 0; }
                        to { width: 100%; }
                    }
                    
                    @keyframes blink-caret {
                        from, to { border-color: transparent; }
                        50% { border-color: rgb(34, 211, 238); }
                    }
                    
                    @keyframes typewriter {
                        from { 
                            width: 0;
                            opacity: 0;
                        }
                        1% {
                            opacity: 1;
                        }
                        to { 
                            width: 100%;
                            opacity: 1;
                        }
                    }
                    
                    .scrollbar-hide {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                    
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                    
                    @keyframes scroll-left {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-50%);
                        }
                    }
                    
                    .animate-scroll-left {
                        animation: scroll-left 30s linear infinite;
                    }
                    
                    .animate-scroll-left:hover {
                        animation-play-state: paused;
                    }
                `}</style>
            </div>
        </section>
    );
}
