"use client";

import { useEffect, useRef } from "react";

const features = [
    {
        num: "01",
        title: "Streaming TUI",
        desc: "Watch AI responses flow in real-time with a beautiful Rich-powered terminal interface. No spinners, no waiting.",
        highlight: true,
    },
    {
        num: "02",
        title: "Resilient Client",
        desc: "Automatic retries with exponential backoff for rate limits and connection errors. Your workflow never breaks.",
    },
    {
        num: "03",
        title: "Modular Design",
        desc: "Clean separation between Client, Agent, and UI. Extend or swap any layer without touching the rest.",
    },
    {
        num: "04",
        title: "Tool System",
        desc: "Pydantic-validated, extensible tools. Read files, run commands, search code — all from natural language.",
    },
    {
        num: "05",
        title: "Smart Context",
        desc: "Token-aware context management. Tracks conversation history and optimizes prompt construction automatically.",
    },
    {
        num: "06",
        title: "Any LLM Provider",
        desc: "Works with OpenAI, OpenRouter, Ollama, or any compatible endpoint. Your model, your rules.",
    },
];

function FeatureTerminal() {
    const lines = [
        { icon: "❯", text: "Analyzing codebase...", accent: false },
        { icon: "→", text: "Found 12 files across 4 modules", accent: true },
        { icon: "→", text: "Identified 3 improvements", accent: true },
        { icon: "✓", text: "Refactoring plan generated", accent: true },
    ];

    return (
        <div className="bg-black/60 border border-white/[0.05] rounded-xl p-5 font-mono text-[0.8rem] flex flex-col gap-1.5">
            {lines.map((line, i) => (
                <div
                    key={i}
                    className="text-zinc-500 opacity-0"
                    style={{
                        animation: `slide-in 0.5s ${i * 0.2}s cubic-bezier(0.4,0,0.2,1) forwards`,
                    }}
                >
                    <span className={`mr-2 font-semibold ${line.accent ? "text-cyan-500" : "text-cyan-400"}`}>
                        {line.icon}
                    </span>
                    {line.text}
                </div>
            ))}
        </div>
    );
}

export default function Features() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.05, rootMargin: "0px 0px -60px 0px" }
        );

        const cards = sectionRef.current?.querySelectorAll(".reveal");
        cards?.forEach((card, i) => {
            (card as HTMLElement).style.transitionDelay = `${i * 0.08}s`;
            observer.observe(card);
        });

        // Mouse tracking for card glow
        const handleMouse = (e: MouseEvent) => {
            const cards = sectionRef.current?.querySelectorAll(".card-glow");
            cards?.forEach((card) => {
                const rect = (card as HTMLElement).getBoundingClientRect();
                (card as HTMLElement).style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                (card as HTMLElement).style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
            });
        };
        sectionRef.current?.addEventListener("mousemove", handleMouse);

        return () => {
            observer.disconnect();
            sectionRef.current?.removeEventListener("mousemove", handleMouse);
        };
    }, []);

    return (
        <section id="features" className="py-32 sm:py-40 relative" ref={sectionRef}>
            <div className="max-w-[1120px] mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20 reveal">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cyan-400/80 mb-5 block">
                        Capabilities
                    </span>
                    <h2 className="text-[clamp(1.75rem,4vw,2.6rem)] font-semibold tracking-[-0.03em] leading-[1.15] text-gradient">
                        Everything you need.
                        <br />
                        <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent' }}>
                            Nothing you don&apos;t.
                        </span>
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((f) => (
                        <div
                            key={f.num}
                            className={`reveal card-glow bg-bg-2 border border-white/[0.05] rounded-2xl p-9 relative overflow-hidden group ${f.highlight
                                    ? "lg:col-span-3 lg:grid lg:grid-cols-2 lg:gap-10 lg:items-center"
                                    : ""
                                }`}
                        >
                            <div className="relative z-[1]">
                                <div className="font-mono text-[0.68rem] font-medium text-cyan-500/60 mb-4 tracking-wider">
                                    {f.num}
                                </div>
                                <h3 className="text-lg font-semibold mb-2.5 tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                                    {f.title}
                                </h3>
                                <p className="text-[0.88rem] text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors duration-300">
                                    {f.desc}
                                </p>
                            </div>

                            {f.highlight && (
                                <div className="mt-6 lg:mt-0">
                                    <FeatureTerminal />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
