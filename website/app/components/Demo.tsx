"use client";

import { useEffect, useRef } from "react";

const demos = [
    {
        tag: "Quick Query",
        cmd: 'python main.py "Explain async/await"',
        desc: "Ask anything. Get a streamed, formatted answer in your terminal.",
    },
    {
        tag: "Code Generation",
        cmd: 'python main.py "Write a REST API endpoint"',
        desc: "Generate production-ready code with full context awareness.",
    },
    {
        tag: "Debugging",
        cmd: 'python main.py "Why is this returning None?"',
        desc: "Describe your bug. Codentis analyzes and suggests the fix.",
    },
];

export default function Demo() {
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

        const cards = ref.current?.querySelectorAll(".reveal");
        cards?.forEach((card, i) => {
            (card as HTMLElement).style.transitionDelay = `${i * 0.1}s`;
            obs.observe(card);
        });

        return () => obs.disconnect();
    }, []);

    return (
        <section id="demo" className="py-32 sm:py-40" ref={ref}>
            <div className="max-w-[1120px] mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20 reveal">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cyan-400/80 mb-5 block">
                        Use Cases
                    </span>
                    <h2 className="text-[clamp(1.75rem,4vw,2.6rem)] font-semibold tracking-[-0.03em] leading-[1.15] text-gradient">
                        One command.
                        <br />
                        <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent' }}>
                            Infinite power.
                        </span>
                    </h2>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {demos.map((d) => (
                        <div
                            key={d.tag}
                            className="reveal card-glow bg-bg-2 border border-white/[0.05] rounded-2xl p-8 group"
                        >
                            <span className="inline-block text-[0.68rem] font-semibold text-cyan-400/80 px-3.5 py-1 border border-cyan-500/15 bg-cyan-500/[0.04] rounded-full mb-6">
                                {d.tag}
                            </span>

                            <div className="flex items-center gap-2.5 px-4 py-3 bg-black/50 border border-white/[0.05] rounded-xl mb-4 overflow-x-auto">
                                <span className="text-cyan-400/70 font-mono font-bold text-sm shrink-0">$</span>
                                <code className="font-mono text-[0.78rem] text-zinc-400 whitespace-nowrap group-hover:text-zinc-300 transition-colors duration-300">
                                    {d.cmd}
                                </code>
                            </div>

                            <p className="text-[0.88rem] text-zinc-600 leading-relaxed group-hover:text-zinc-500 transition-colors duration-300">
                                {d.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
