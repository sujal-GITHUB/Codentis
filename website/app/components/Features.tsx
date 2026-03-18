"use client";

import { useEffect, useRef, useState } from "react";
import { 
    Zap, 
    Shield, 
    Puzzle, 
    Wrench, 
    Brain, 
    Globe 
} from "lucide-react";

const features = [
    {
        id: "streaming-tui",
        title: "Streaming TUI",
        desc: "Experience real-time AI responses with our beautiful Rich-powered terminal interface. Watch code explanations, documentation, and solutions flow character by character with no loading spinners or waiting screens. Built for developers who value immediate feedback and seamless interaction.",
        icon: Zap,
        terminal: {
            command: 'codentis chat "Explain async/await in Python"',
            output: [
                { type: "query", text: "Query: Explain async/await in Python" },
                { type: "normal", text: "" },
                { type: "prompt", text: "❯ Async/await in Python" },
                { type: "normal", text: "" },
                { type: "streaming", text: "Async/await is Python's way to write asynchronous code using coroutines. It allows you to write non-blocking code that can handle multiple tasks concurrently." },
                { type: "normal", text: "" },
                { type: "section", text: "Basic Syntax" },
                { type: "code", text: "```python" },
                { type: "code", text: "import asyncio" },
                { type: "code", text: "" },
                { type: "code", text: "async def main():" },
                { type: "code", text: "    print('Start')" },
                { type: "code", text: "    await asyncio.sleep(1)  # Non-blocking sleep" },
                { type: "code", text: "    print('End')" },
                { type: "code", text: "" },
                { type: "code", text: "asyncio.run(main())" },
                { type: "normal", text: "" },
                { type: "section", text: "### Key Concepts" },
                { type: "normal", text: "" },
                { type: "concept", text: "Coroutines: Functions defined with async def that can be paused and resumed." },
                { type: "concept", text: "await: Pauses the coroutine until the awaited task completes, allowing other tasks to run." },
                { type: "concept", text: "Event Loop: Manages and schedules all asynchronous tasks." }
            ]
        }
    },
    {
        id: "resilient-client",
        title: "Resilient Client",
        desc: "Never lose productivity to API failures or rate limits. Our intelligent retry system uses exponential backoff algorithms to handle connection errors, rate limiting, and temporary outages automatically. Your development workflow continues uninterrupted while Codentis manages the complexity behind the scenes.",
        icon: Shield,
        terminal: {
            command: 'codentis chat "Generate a REST API endpoint"',
            output: [
                { type: "query", text: "Query: Generate a REST API endpoint" },
                { type: "normal", text: "" },
                { type: "tool", text: "● web_search #1" },
                { type: "tool_summary", text: "  └ ⚠ Rate limit detected. Retrying in 2s..." },
                { type: "tool", text: "● web_search #1" },
                { type: "tool_summary", text: "  └ ⚠ Connection timeout. Retrying in 4s..." },
                { type: "tool", text: "● web_search #1" },
                { type: "tool_summary", text: "  └ ✓ Found 5 results (Type /e 1 to see output)" },
                { type: "normal", text: "" },
                { type: "prompt", text: "❯ Here's a FastAPI endpoint for user management:" },
                { type: "normal", text: "" },
                { type: "code", text: "@app.post('/users')" },
                { type: "code", text: "async def create_user(user: UserCreate):" },
                { type: "code", text: "    db_user = User(**user.dict())" },
                { type: "code", text: "    db.add(db_user)" },
                { type: "code", text: "    await db.commit()" },
                { type: "code", text: "    return db_user" },
                { type: "normal", text: "" },
                { type: "streaming", text: "This endpoint includes validation, error handling, and async support for optimal performance." }
            ]
        }
    },
    {
        id: "modular-design",
        title: "Modular Design",
        desc: "Built with clean separation between Client, Agent, and UI layers for maximum flexibility. Extend functionality by swapping LLM providers, adding custom tools, or integrating new UI renderers without touching core logic. Perfect for teams that need customization and enterprise integration capabilities.",
        icon: Puzzle,
        terminal: {
            command: 'codentis --help',
            output: [
                { type: "query", text: "Query: Show me the architecture" },
                { type: "normal", text: "" },
                { type: "prompt", text: "❯ Codentis Architecture" },
                { type: "normal", text: "" },
                { type: "section", text: "Modular Components:" },
                { type: "normal", text: "" },
                { type: "component", text: "📡 LLMClient    → OpenAI, OpenRouter, Ollama" },
                { type: "component", text: "🤖 Agent       → Tool orchestration & memory" },
                { type: "component", text: "🎨 UI Renderer → Rich TUI, streaming output" },
                { type: "component", text: "🔧 Tool System → File ops, shell, web search" },
                { type: "normal", text: "" },
                { type: "section", text: "Plugin Architecture:" },
                { type: "bullet", text: "  → Custom tools via Python plugins" },
                { type: "bullet", text: "  → Swap LLM providers seamlessly" },
                { type: "bullet", text: "  → Extend UI with custom renderers" },
                { type: "normal", text: "" },
                { type: "streaming", text: "Each component is independently replaceable and extensible." }
            ]
        }
    },
    {
        id: "tool-system",
        title: "Tool System",
        desc: "Leverage Pydantic-validated, extensible tools that handle everything from file operations to web searches through natural language commands. Read files, execute shell commands, search codebases, and manipulate data structures with simple conversational prompts. Fully type-safe and easily extensible for custom workflows.",
        icon: Wrench,
        terminal: {
            command: 'codentis chat "Read package.json and explain the dependencies"',
            output: [
                { type: "query", text: "Query: Read package.json and explain the dependencies" },
                { type: "normal", text: "" },
                { type: "tool", text: "● read_file #1" },
                { type: "tool_summary", text: "  └ Reading: ./package.json" },
                { type: "tool", text: "● read_file #1" },
                { type: "tool_summary", text: "  └ ✓ Read 45 lines (Type /e 1 to see output)" },
                { type: "normal", text: "" },
                { type: "prompt", text: "❯ Based on your package.json, here are the key dependencies:" },
                { type: "normal", text: "" },
                { type: "bullet", text: "  → next: React framework for production" },
                { type: "bullet", text: "  → tailwindcss: Utility-first CSS framework" },
                { type: "bullet", text: "  → typescript: Type safety and better DX" },
                { type: "bullet", text: "  → framer-motion: Animation library" },
                { type: "normal", text: "" },
                { type: "tool", text: "● grep #2" },
                { type: "tool_summary", text: "  └ Searching for pattern: import.*framer" },
                { type: "tool", text: "● grep #2" },
                { type: "tool_summary", text: "  └ ✓ Found 3 matches (Type /e 2 to see output)" },
                { type: "normal", text: "" },
                { type: "streaming", text: "Found 3 components using framer-motion animations for smooth UI transitions." }
            ]
        }
    },
    {
        id: "smart-context",
        title: "Smart Context",
        desc: "Intelligent token-aware context management that automatically tracks conversation history and optimizes prompt construction for maximum relevance. Codentis remembers your project context, coding patterns, and preferences across sessions, ensuring consistent and contextually appropriate responses every time.",
        icon: Brain,
        terminal: {
            command: 'codentis chat "Continue our previous discussion about React hooks"',
            output: [
                { type: "query", text: "Query: Continue our previous discussion about React hooks" },
                { type: "normal", text: "" },
                { type: "tool", text: "● memory #1" },
                { type: "tool_summary", text: "  └ Retrieving memory: react_hooks_discussion" },
                { type: "tool", text: "● memory #1" },
                { type: "tool_summary", text: "  └ ✓ Recalled: react_hooks_discussion (Type /e 1 to see output)" },
                { type: "normal", text: "" },
                { type: "prompt", text: "❯ Continuing from our useState and useEffect discussion..." },
                { type: "normal", text: "" },
                { type: "streaming", text: "Let's explore useCallback and useMemo:" },
                { type: "normal", text: "" },
                { type: "bullet", text: "  → useCallback: Memoizes function references" },
                { type: "bullet", text: "  → useMemo: Memoizes expensive calculations" },
                { type: "bullet", text: "  → Both help prevent unnecessary re-renders" },
                { type: "normal", text: "" },
                { type: "code", text: "const memoizedCallback = useCallback(() => {" },
                { type: "code", text: "  doSomething(a, b);" },
                { type: "code", text: "}, [a, b]);" },
                { type: "normal", text: "" },
                { type: "streaming", text: "Context automatically optimized for relevance and token limits." }
            ]
        }
    },
    {
        id: "any-llm-provider",
        title: "Any LLM Provider",
        desc: "Freedom to choose your preferred AI model with support for OpenAI, OpenRouter, Ollama, and any OpenAI-compatible endpoint. Switch between GPT-4, Claude, local models, or custom deployments seamlessly. Your model preferences, your data sovereignty, your rules - Codentis adapts to your infrastructure needs.",
        icon: Globe,
        terminal: {
            command: 'codentis config --provider ollama --model llama3.1',
            output: [
                { type: "query", text: "Query: Switch to Ollama with llama3.1" },
                { type: "normal", text: "" },
                { type: "prompt", text: "❯ Provider Configuration" },
                { type: "normal", text: "" },
                { type: "success", text: "✓ Switched to Ollama provider" },
                { type: "success", text: "✓ Model: llama3.1:latest" },
                { type: "success", text: "✓ Endpoint: http://localhost:11434" },
                { type: "normal", text: "" },
                { type: "section", text: "Available providers:" },
                { type: "bullet", text: "  → OpenAI (GPT-4, GPT-3.5)" },
                { type: "bullet", text: "  → OpenRouter (Claude, Gemini, Llama)" },
                { type: "bullet", text: "  → Ollama (Local models)" },
                { type: "bullet", text: "  → Custom endpoints" },
                { type: "normal", text: "" },
                { type: "tool", text: "● shell #1" },
                { type: "tool_summary", text: "  └ Running: curl -s http://localhost:11434/api/tags" },
                { type: "tool", text: "● shell #1" },
                { type: "tool_summary", text: "  └ ✓ Command completed successfully (Type /e 1 to see output)" },
                { type: "normal", text: "" },
                { type: "streaming", text: "Ready to chat with llama3.1 🦙" }
            ]
        }
    },
];

export default function Features() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeFeature, setActiveFeature] = useState("streaming-tui");
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [headerVisible, setHeaderVisible] = useState(false);

    const currentFeature = features.find(f => f.id === activeFeature) || features[0];

    const handleFeatureClick = (featureId: string) => {
        if (featureId === activeFeature) return;
        
        setIsTransitioning(true);
        
        setTimeout(() => {
            setActiveFeature(featureId);
        }, 200);
        
        setTimeout(() => {
            setIsTransitioning(false);
        }, 400);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target.classList.contains('header-reveal')) {
                            // Animate header elements
                            setTimeout(() => setHeaderVisible(true), 200);
                        }
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.05, rootMargin: "0px 0px -60px 0px" }
        );

        const elements = sectionRef.current?.querySelectorAll(".reveal");
        elements?.forEach((element, i) => {
            (element as HTMLElement).style.transitionDelay = `${i * 0.1}s`;
            observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
            
            <section id="features" className="py-0 sm:py-32 bg-black relative w-full" ref={sectionRef}>
            <div className="w-full px-8 sm:px-10 lg:px-16">
                {/* Header */}
                <div className="mb-16 sm:mb-20 reveal header-reveal w-full max-w-none flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                    <div className="lg:max-w-md">
                        <span className="text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cyan-400/80 mb-4 sm:mb-5 block">
                            Capabilities
                        </span>
                        <h2 className={`text-[clamp(1.5rem,3.5vw,2.5rem)] font-medium tracking-[-0.02em] leading-[1.1] text-white mb-6 transition-all duration-700 ${
                            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}>
                            Everything you need
                            <br />
                            <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                                Nothing you don't.
                            </span>
                        </h2>
                    </div>
                    <div className="lg:max-w-lg lg:pt-4">
                        <p className={`text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed transition-all duration-700 delay-300 ${
                            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}>
                            Codentis delivers essential AI-powered development tools without the bloat. Clean terminal interface, intelligent responses, and seamless workflow integration - everything focused on what developers actually need to build better software faster.
                        </p>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-none">
                    {/* Left Sidebar - Feature List */}
                    <div className="lg:col-span-4 reveal">
                        <div className="space-y-2">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.id}
                                    className={`group cursor-pointer transition-all duration-300 rounded-lg ${
                                        activeFeature === feature.id 
                                            ? 'bg-white/[0.05] border-l-2 border-cyan-400' 
                                            : 'hover:bg-white/[0.02] border-l-2 border-transparent'
                                    }`}
                                    onClick={() => handleFeatureClick(feature.id)}
                                >
                                    <div className="flex items-center gap-4 p-4">
                                        {/* Icon */}
                                        <div className={`flex items-center justify-center transition-all duration-300 ${
                                            activeFeature === feature.id 
                                                ? 'text-cyan-400' 
                                                : 'text-gray-400 group-hover:text-gray-300'
                                        }`}>
                                            <feature.icon className="w-5 h-5" />
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className={`text-sm sm:text-base font-medium transition-all duration-300 mb-1 ${
                                                activeFeature === feature.id 
                                                    ? 'text-white' 
                                                    : 'text-gray-300 group-hover:text-white'
                                            }`}>
                                                {feature.title}
                                            </h4>
                                            
                                            {/* Description - only show for active feature */}
                                            <div className={`overflow-hidden transition-all duration-500 ease-out ${
                                                activeFeature === feature.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                            }`}>
                                                <p className={`text-xs sm:text-sm text-gray-400 leading-relaxed transition-all duration-500 delay-100 ${
                                                    activeFeature === feature.id && !isTransitioning 
                                                        ? 'translate-y-0 opacity-100' 
                                                        : 'translate-y-2 opacity-0'
                                                }`}>
                                                    {feature.desc}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* Arrow indicator */}
                                        <div className={`hidden lg:block transition-all duration-300 ${
                                            activeFeature === feature.id 
                                                ? 'text-cyan-400 opacity-100' 
                                                : 'text-gray-600 opacity-0 group-hover:opacity-50'
                                        }`}>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Terminal Preview */}
                    <div className="lg:col-span-8 reveal">
                        <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl border border-white/[0.04] bg-bg-1 overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.04)]">
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
                            <div className="p-4 sm:p-6 font-mono text-[11px] sm:text-[0.85rem] h-full overflow-y-auto scrollbar-hide">
                                {/* Command Line */}
                                <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
                                    <span className="text-cyan-400 font-bold">$</span>
                                    <span className="text-white">{currentFeature.terminal.command}</span>
                                </div>

                                {/* Terminal Output */}
                                <div className="space-y-0 text-wrap break-words">
                                    {currentFeature.terminal.output.map((line, index) => {
                                        let className = "leading-[1.7] sm:leading-[1.9] transition-all duration-300";
                                        
                                        switch (line.type) {
                                            case "query":
                                                className += " text-white font-medium";
                                                break;
                                            case "prompt":
                                                className += " text-white";
                                                break;
                                            case "streaming":
                                                className += " text-zinc-300";
                                                break;
                                            case "section":
                                                className += " text-cyan-300 font-semibold mb-1";
                                                break;
                                            case "bullet":
                                                className += " text-cyan-500";
                                                break;
                                            case "concept":
                                                className += " text-zinc-400";
                                                break;
                                            case "component":
                                                className += " text-cyan-500";
                                                break;
                                            case "tool":
                                                className += " text-purple-400 font-medium";
                                                break;
                                            case "tool_summary":
                                                className += " text-gray-400";
                                                break;
                                            case "code":
                                                className += " text-emerald-400 bg-black/30 px-2 py-0.5 rounded font-mono text-sm";
                                                break;
                                            case "success":
                                                className += " text-emerald-400";
                                                break;
                                            case "info":
                                                className += " text-blue-400";
                                                break;
                                            default:
                                                className += " text-zinc-400";
                                        }

                                        return (
                                            <div
                                                key={index}
                                                className={className}
                                                style={{
                                                    animationDelay: `${index * 100}ms`,
                                                    animation: !isTransitioning ? 'fadeInUp 0.3s ease-out forwards' : 'none'
                                                }}
                                            >
                                                {line.text === "" ? <br /> : line.text}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Loading overlay */}
                                {isTransitioning && (
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 transition-all duration-300">
                                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}
