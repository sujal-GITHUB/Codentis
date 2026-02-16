"use client";

import { useEffect, useRef } from "react";

const steps = [
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
        ),
        label: "CLI",
        desc: "Your prompt enters here",
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
        ),
        label: "Agent",
        desc: "Agentic loop & context",
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
        label: "LLM Client",
        desc: "Streams from API",
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
        label: "TUI",
        desc: "Rendered with Rich",
    },
];

const events = [
    { label: "StreamEvent", color: "bg-cyan-400 shadow-[0_0_6px_#22d3ee]" },
    { label: "AgentEvent", color: "bg-sky-400 shadow-[0_0_6px_#38bdf8]" },
    { label: "Render", color: "bg-cyan-200 shadow-[0_0_6px_#67e8f9]" },
];

export default function Architecture() {
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
            { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
        );

        const els = ref.current?.querySelectorAll(".reveal");
        els?.forEach((el, i) => {
            (el as HTMLElement).style.transitionDelay = `${i * 0.1}s`;
            obs.observe(el);
        });

        return () => obs.disconnect();
    }, []);

    return (
        <section id="architecture" className="py-32 sm:py-40 bg-bg-1 relative" ref={ref}>
            {/* Top gradient fade */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-bg-0 to-transparent pointer-events-none z-[1]" />

            <div className="max-w-[1120px] mx-auto px-6 relative z-[2]">
                {/* Header */}
                <div className="text-center mb-20 reveal">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cyan-400/80 mb-5 block">
                        Architecture
                    </span>
                    <h2 className="text-[clamp(1.75rem,4vw,2.6rem)] font-semibold tracking-[-0.03em] leading-[1.15] text-gradient">
                        Event-driven.
                        <br />
                        <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent' }}>
                            By design.
                        </span>
                    </h2>
                </div>

                {/* Flow */}
                <div className="flex items-center justify-center gap-0 flex-wrap mb-16">
                    {steps.map((step, i) => (
                        <div key={step.label} className="contents">
                            <div className="reveal card-glow flex flex-col items-center text-center px-8 py-7 bg-bg-2 border border-white/[0.05] rounded-2xl min-w-[140px] group">
                                <div className="w-12 h-12 flex items-center justify-center text-cyan-400/80 bg-cyan-400/[0.06] border border-cyan-400/10 rounded-xl mb-3.5 group-hover:text-cyan-400 group-hover:border-cyan-400/25 transition-all duration-300">
                                    {step.icon}
                                </div>
                                <div className="font-semibold text-[0.95rem] mb-1 text-white/85 group-hover:text-white transition-colors">{step.label}</div>
                                <div className="text-[0.72rem] text-zinc-600 font-mono">{step.desc}</div>
                            </div>

                            {i < steps.length - 1 && (
                                <div className="hidden md:block w-12 h-[2px] bg-white/[0.05] relative overflow-hidden mx-1">
                                    <div
                                        className="absolute top-0 w-5 h-full bg-cyan-400/60 rounded-sm"
                                        style={{ animation: "pulse-flow 2.5s ease-in-out infinite" }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Event Badges */}
                <div className="flex justify-center gap-4 flex-wrap">
                    {events.map((ev) => (
                        <div
                            key={ev.label}
                            className="reveal flex items-center gap-2 px-4 py-2 bg-bg-2 border border-white/[0.05] rounded-full font-mono text-[0.75rem] text-zinc-500"
                        >
                            <span className={`w-[6px] h-[6px] rounded-full ${ev.color}`} />
                            {ev.label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-0 to-transparent pointer-events-none z-[1]" />
        </section>
    );
}
