export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-36 pb-16 overflow-hidden"
        >
            {/* ── Light Sticks Background ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                {/* Stick 1 */}
                <div
                    className="light-stick absolute bottom-0 left-[22%] w-[14px] h-[70%]"
                    style={{
                        background: "linear-gradient(to top, #0891b2 0%, #22d3ee 40%, transparent 100%)",
                        filter: "blur(40px)",
                        animation: "stick-1 10s ease-in-out infinite",
                    }}
                />

                {/* Stick 2 */}
                <div
                    className="light-stick absolute bottom-0 left-[38%] w-[18px] h-[80%]"
                    style={{
                        background: "linear-gradient(to top, #06b6d4 0%, #22d3ee 35%, transparent 100%)",
                        filter: "blur(50px)",
                        animation: "stick-2 8s ease-in-out infinite",
                    }}
                />

                {/* Stick 3 — brightest, center */}
                <div
                    className="light-stick absolute bottom-0 left-[50%] w-[20px] h-[85%]"
                    style={{
                        background: "linear-gradient(to top, #22d3ee 0%, #67e8f9 30%, transparent 100%)",
                        filter: "blur(45px)",
                        animation: "stick-3 12s ease-in-out infinite",
                    }}
                />

                {/* Stick 4 */}
                <div
                    className="light-stick absolute bottom-0 left-[62%] w-[16px] h-[75%]"
                    style={{
                        background: "linear-gradient(to top, #0e7490 0%, #0891b2 40%, transparent 100%)",
                        filter: "blur(50px)",
                        animation: "stick-4 9s ease-in-out infinite",
                    }}
                />

                {/* Stick 5 */}
                <div
                    className="light-stick absolute bottom-0 left-[76%] w-[12px] h-[65%]"
                    style={{
                        background: "linear-gradient(to top, #155e75 0%, #06b6d4 35%, transparent 100%)",
                        filter: "blur(45px)",
                        animation: "stick-5 11s ease-in-out infinite",
                    }}
                />

                {/* Soft ambient glow behind sticks */}
                <div
                    className="absolute bottom-0 left-[30%] w-[40%] h-[50%] opacity-20"
                    style={{
                        background: "radial-gradient(ellipse at center bottom, #0891b2, transparent 70%)",
                        filter: "blur(100px)",
                    }}
                />
            </div>

            {/* ── Noise Texture ── */}
            <div
                className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
                aria-hidden="true"
            />

            {/* ── Content ── */}
            <div className="relative z-[2] text-center max-w-[800px]">
                {/* Badge */}
                <div
                    className="inline-flex items-center gap-2.5 px-5 py-2 mb-10 border border-cyan-500/15 bg-cyan-500/[0.04] rounded-full text-[0.78rem] font-medium text-cyan-300/80 relative overflow-hidden"
                    style={{ animation: "fade-up 0.7s cubic-bezier(0.4,0,0.2,1) both" }}
                >
                    <span
                        className="absolute left-[-60px] w-[40px] h-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
                        style={{ animation: "badge-shine 3s ease-in-out infinite" }}
                    />
                    AI-Powered CLI Agent
                </div>

                {/* Heading */}
                <h1
                    className="text-[clamp(2.5rem,6vw,4rem)] font-semibold tracking-[-0.03em] leading-[1.08] mb-7 text-gradient"
                    style={{ animation: "fade-up 0.7s 0.1s cubic-bezier(0.4,0,0.2,1) both" }}
                >
                    Intelligence Meets
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent' }}>the Terminal</span>
                </h1>

                {/* Subtitle */}
                <p
                    className="text-[clamp(0.95rem,1.8vw,1.1rem)] text-zinc-500 leading-[1.8] max-w-[540px] mx-auto mb-11"
                    style={{ animation: "fade-up 0.7s 0.2s cubic-bezier(0.4,0,0.2,1) both" }}
                >
                    Bring the power of large language models directly to your command
                    line.
                    <br />
                    Streaming responses, agentic loops, tool use — built for developers.
                </p>

                {/* CTA */}
                <a
                    href="#install"
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-white text-black font-semibold text-[0.9rem] rounded-full hover:shadow-[0_0_40px_rgba(6,182,212,0.25)] hover:-translate-y-0.5 transition-all duration-400"
                    style={{ animation: "fade-up 0.7s 0.3s cubic-bezier(0.4,0,0.2,1) both" }}
                >
                    Get Started
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>
            </div>

            {/* ── Feature Pills ── */}
            <div
                className="relative z-[2] flex justify-center gap-3 flex-wrap mt-20 px-4"
                style={{ animation: "fade-up 0.7s 0.5s cubic-bezier(0.4,0,0.2,1) both" }}
            >
                {[
                    "Real-time Streaming",
                    "Resilient Error Handling",
                    "Modular Architecture",
                    "Fully Async",
                    "Extensible Tools",
                ].map((label) => (
                    <div
                        key={label}
                        className="flex items-center gap-2 px-5 py-2.5 border border-white/[0.04] rounded-full text-[0.78rem] font-medium text-zinc-500 bg-white/[0.02] hover:border-cyan-400/20 hover:text-zinc-300 transition-all duration-400"
                    >
                        <span className="w-1.5 h-1.5 bg-cyan-400/60 rounded-full" />
                        {label}
                    </div>
                ))}
            </div>
        </section>
    );
}
