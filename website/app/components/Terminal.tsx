"use client";

import { useEffect, useRef, useState } from "react";

const command = 'python main.py "Explain how Codentis works"';

const outputLines = [
    { cls: "accent", text: "───── Assistant ─────" },
    { cls: "normal", text: "\u00A0" },
    { cls: "normal", text: "Codentis is a modular CLI AI agent built in Python." },
    { cls: "normal", text: "\u00A0" },
    { cls: "normal", text: "It uses an event-driven architecture:" },
    { cls: "bullet", text: "  → CLI captures your prompt via Click" },
    { cls: "bullet", text: "  → Agent orchestrates the agentic loop" },
    { cls: "bullet", text: "  → LLMClient streams from OpenAI / OpenRouter" },
    { cls: "bullet", text: "  → TUI renders with Rich in real-time" },
    { cls: "normal", text: "\u00A0" },
    { cls: "normal", text: "Fully async, resilient, and extensible. ✨" },
];

export default function Terminal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [typedCmd, setTypedCmd] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const [visibleLines, setVisibleLines] = useState<number>(0);
    const [started, setStarted] = useState(false);

    // Intersection observer to start animation
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !started) {
                    setStarted(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) obs.observe(containerRef.current);
        return () => obs.disconnect();
    }, [started]);

    // Typing animation
    useEffect(() => {
        if (!started) return;
        let i = 0;
        const interval = setInterval(() => {
            if (i < command.length) {
                setTypedCmd(command.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
                setShowCursor(false);
                // Start showing output lines
                let li = 0;
                const lineInterval = setInterval(() => {
                    if (li < outputLines.length) {
                        setVisibleLines((prev) => prev + 1);
                        li++;
                    } else {
                        clearInterval(lineInterval);
                    }
                }, 100);
            }
        }, 35);

        return () => clearInterval(interval);
    }, [started]);

    const colorMap: Record<string, string> = {
        accent: "text-cyan-400 font-semibold",
        bullet: "text-cyan-500",
        normal: "text-zinc-400",
    };

    return (
        <section className="pb-28 sm:pb-32 px-6">
            <div
                className="max-w-[1120px] mx-auto rounded-2xl border border-white/[0.04] bg-bg-1 overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.04)]"
                ref={containerRef}
            >
                {/* Title Bar */}
                <div className="flex items-center gap-3.5 px-5 py-3.5 bg-bg-2 border-b border-white/[0.04]">
                    <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="font-mono text-[0.72rem] text-zinc-500">
                        codentis — ~/projects
                    </span>
                </div>

                {/* Body */}
                <div className="p-6 font-mono text-[0.85rem] min-h-[220px]">
                    {/* Command Line */}
                    <div className="flex items-center gap-2.5">
                        <span className="text-cyan-400 font-bold">$</span>
                        <span className="text-white">{typedCmd}</span>
                        {showCursor && (
                            <span className="text-cyan-400" style={{ animation: "blink 1s step-end infinite" }}>
                                ▊
                            </span>
                        )}
                    </div>

                    {/* Output */}
                    <div className="mt-4 space-y-0">
                        {outputLines.slice(0, visibleLines).map((line, i) => (
                            <div
                                key={i}
                                className={`leading-[1.9] transition-all duration-300 ${colorMap[line.cls]}`}
                                style={{
                                    animation: "fade-up 0.3s cubic-bezier(0.4,0,0.2,1) both",
                                }}
                            >
                                {line.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
