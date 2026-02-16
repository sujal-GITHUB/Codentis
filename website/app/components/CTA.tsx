export default function CTA() {
    return (
        <section className="py-32 sm:py-40 relative overflow-hidden">
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
                <h2 className="text-[clamp(1.75rem,4vw,2.6rem)] font-semibold tracking-[-0.03em] leading-[1.15] mb-5 text-gradient">
                    Ready to code with
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent' }}>
                        AI in your terminal?
                    </span>
                </h2>
                <p className="text-zinc-500 text-base mb-10">
                    Free. Open source. Built by developers, for developers.
                </p>
                <a
                    href="https://github.com/sujal-GITHUB/Codentis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-white text-black font-semibold text-[0.9rem] rounded-full hover:shadow-[0_0_40px_rgba(6,182,212,0.25)] hover:-translate-y-0.5 transition-all duration-400"
                >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View on GitHub
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        </section>
    );
}
