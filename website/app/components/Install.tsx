"use client";

import { useRef, useEffect } from "react";

const steps = [
    {
        num: "1",
        title: "Clone",
        code: "git clone https://github.com/sujal-GITHUB/Codentis.git && cd Codentis",
    },
    {
        num: "2",
        title: "Setup",
        code: "python -m venv venv && venv\\Scripts\\activate && pip install -r requirements.txt",
    },
    {
        num: "3",
        title: "Configure",
        code: "echo OPENAI_API_KEY=your_key > .env",
    },
    {
        num: "4",
        title: "Run",
        code: 'python main.py "Hello, Codentis!"',
    },
];

function copyCode(btn: HTMLButtonElement) {
    const block = btn.closest(".is-code");
    const code = block?.querySelector("code");
    if (!code) return;
    navigator.clipboard.writeText(code.textContent || "").then(() => {
        const original = btn.innerHTML;
        btn.innerHTML =
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
        setTimeout(() => {
            btn.innerHTML = original;
        }, 2000);
    });
}

export default function Install() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("revealed");
                        obs.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.05, rootMargin: "0px 0px -60px 0px" }
        );

        const items = ref.current?.querySelectorAll(".reveal");
        items?.forEach((item, i) => {
            (item as HTMLElement).style.transitionDelay = `${i * 0.12}s`;
            obs.observe(item);
        });

        return () => obs.disconnect();
    }, []);

    return (
        <section id="install" className="py-32 sm:py-40 bg-bg-1 relative" ref={ref}>
            {/* Top fade */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-bg-0 to-transparent pointer-events-none z-[1]" />

            <div className="max-w-[1120px] mx-auto px-6 relative z-[2]">
                {/* Header */}
                <div className="text-center mb-20 reveal">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cyan-400/80 mb-5 block">
                        Get Started
                    </span>
                    <h2 className="text-[clamp(1.75rem,4vw,2.6rem)] font-semibold tracking-[-0.03em] leading-[1.15] text-gradient">
                        Up and running
                        <br />
                        <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent' }}>
                            in 60 seconds.
                        </span>
                    </h2>
                </div>

                {/* Steps */}
                <div className="max-w-[620px] mx-auto flex flex-col gap-8">
                    {steps.map((step) => (
                        <div
                            key={step.num}
                            className="reveal flex gap-5 items-start group"
                        >
                            <div className="w-[36px] h-[36px] shrink-0 flex items-center justify-center rounded-xl bg-cyan-400/[0.05] border border-cyan-400/15 text-cyan-400/80 font-semibold text-sm group-hover:border-cyan-400/30 group-hover:text-cyan-400 transition-all duration-300">
                                {step.num}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-[0.95rem] font-semibold mb-2.5 text-white/85">{step.title}</h4>
                                <div className="is-code flex items-center justify-between gap-3 px-4 py-3 bg-black/40 border border-white/[0.05] rounded-xl font-mono text-[0.78rem] text-cyan-300/70 overflow-x-auto group-hover:border-white/[0.1] transition-colors duration-300">
                                    <code className="whitespace-nowrap">{step.code}</code>
                                    <button
                                        onClick={(e) => copyCode(e.currentTarget)}
                                        className="shrink-0 p-1.5 rounded-lg text-zinc-600 hover:text-white hover:bg-white/[0.06] transition-all"
                                        aria-label="Copy"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="9" y="9" width="13" height="13" rx="2" />
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-0 to-transparent pointer-events-none z-[1]" />
        </section>
    );
}
