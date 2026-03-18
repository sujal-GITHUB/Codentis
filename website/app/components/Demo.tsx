"use client";

import { useEffect, useRef, useState } from "react";
import { 
    RiQuestionAnswerLine,
    RiCodeSSlashLine,
    RiBugLine,
    RiChat3Line,
    RiRefreshLine,
    RiSearchLine,
    RiFileSearchLine
} from "react-icons/ri";

const useCases = [
    {
        id: "quick-query",
        tag: "Quick Query",
        title: "Instant Answers",
        icon: RiQuestionAnswerLine,
        desc: "Ask any development question and get comprehensive, formatted answers streamed directly to your terminal. From syntax explanations to architectural guidance, Codentis provides context-aware responses that help you learn and build faster.",
        cmd: 'codentis',
        terminal: {
            command: 'codentis',
            output: [
                { type: "query", text: "Starting interactive mode..." },
                { type: "normal", text: "" },
                { type: "prompt", text: "❯ Codentis Interactive Mode" },
                { type: "normal", text: "Type your message and press Enter. Use /exit to quit." },
                { type: "normal", text: "" },
                { type: "user", text: "> explain async/await in Python with examples" },
                { type: "normal", text: "" },
                { type: "streaming", text: "Async/await in Python allows you to write asynchronous code using coroutines. It enables non-blocking operations that can handle multiple tasks concurrently." },
                { type: "normal", text: "" },
                { type: "section", text: "Basic Syntax:" },
                { type: "code", text: "import asyncio" },
                { type: "code", text: "" },
                { type: "code", text: "async def main():" },
                { type: "code", text: "    print('Start')" },
                { type: "code", text: "    await asyncio.sleep(1)  # Non-blocking sleep" },
                { type: "code", text: "    print('End')" },
                { type: "code", text: "" },
                { type: "code", text: "asyncio.run(main())" },
                { type: "normal", text: "" },
                { type: "section", text: "Key Concepts:" },
                { type: "bullet", text: "  → Coroutines: Functions defined with async def" },
                { type: "bullet", text: "  → await: Pauses execution until task completes" },
                { type: "bullet", text: "  → Event Loop: Manages all async tasks" },
                { type: "normal", text: "" },
                { type: "user", text: "> show me a real-world example with HTTP requests" },
                { type: "normal", text: "" },
                { type: "streaming", text: "Here's a practical example using aiohttp for concurrent HTTP requests:" },
                { type: "normal", text: "" },
                { type: "code", text: "import aiohttp" },
                { type: "code", text: "import asyncio" },
                { type: "code", text: "" },
                { type: "code", text: "async def fetch_url(session, url):" },
                { type: "code", text: "    async with session.get(url) as response:" },
                { type: "code", text: "        return await response.text()" },
                { type: "normal", text: "" },
                { type: "prompt", text: "> This fetches multiple URLs concurrently, much faster than sequential requests!" }
            ]
        }
    },
    {
        id: "code-generation",
        tag: "Code Generation",
        title: "Production-Ready Code",
        icon: RiCodeSSlashLine,
        desc: "Generate complete, production-ready code with full context awareness. From REST APIs to complex algorithms, Codentis understands your requirements and delivers clean, well-structured code that follows best practices and includes proper error handling.",
        cmd: 'codentis',
        terminal: {
            command: 'codentis',
            output: [
                { type: "query", text: "Starting interactive mode..." },
                { type: "normal", text: "" },
                { type: "prompt", text: "❯ Codentis Interactive Mode" },
                { type: "normal", text: "Type your message and press Enter. Use /exit to quit." },
                { type: "normal", text: "" },
                { type: "user", text: "> create a REST API endpoint for user management with FastAPI" },
                { type: "normal", text: "" },
                { type: "streaming", text: "I'll create a complete FastAPI user management endpoint with validation and error handling:" },
                { type: "normal", text: "" },
                { type: "code", text: "from fastapi import FastAPI, HTTPException, Depends" },
                { type: "code", text: "from pydantic import BaseModel, EmailStr" },
                { type: "code", text: "from sqlalchemy.orm import Session" },
                { type: "code", text: "from typing import List" },
                { type: "normal", text: "" },
                { type: "code", text: "class UserCreate(BaseModel):" },
                { type: "code", text: "    name: str" },
                { type: "code", text: "    email: EmailStr" },
                { type: "code", text: "    age: int" },
                { type: "normal", text: "" },
                { type: "code", text: "@app.post('/users', response_model=UserResponse)" },
                { type: "code", text: "async def create_user(" },
                { type: "code", text: "    user: UserCreate," },
                { type: "code", text: "    db: Session = Depends(get_db)" },
                { type: "code", text: "):" },
                { type: "code", text: "    # Check if user exists" },
                { type: "code", text: "    existing = db.query(User).filter(User.email == user.email).first()" },
                { type: "code", text: "    if existing:" },
                { type: "code", text: "        raise HTTPException(409, 'User already exists')" },
                { type: "normal", text: "" },
                { type: "user", text: "> add authentication middleware too" },
                { type: "normal", text: "" },
                { type: "streaming", text: "Adding JWT authentication middleware:" },
                { type: "normal", text: "" },
                { type: "code", text: "from fastapi.security import HTTPBearer" },
                { type: "code", text: "import jwt" },
                { type: "normal", text: "" },
                { type: "code", text: "@app.middleware('http')" },
                { type: "code", text: "async def auth_middleware(request, call_next):" },
                { type: "code", text: "    # JWT validation logic here" },
                { type: "prompt", text: "> Complete authentication system with protected routes ready!" }
            ]
        }
    },
    {
        id: "debugging",
        tag: "Debugging",
        title: "Smart Debugging",
        icon: RiBugLine,
        desc: "Describe your bug or paste error messages, and Codentis analyzes the issue with context awareness. Get detailed explanations of what went wrong, why it happened, and step-by-step solutions to fix the problem quickly and effectively.",
        cmd: 'codentis',
        terminal: {
            command: 'codentis',
            output: [
                { type: "query", text: "Starting interactive mode..." },
                { type: "normal", text: "" },
                { type: "prompt", text: "❯ Codentis Interactive Mode" },
                { type: "normal", text: "Type your message and press Enter. Use /exit to quit." },
                { type: "normal", text: "" },
                { type: "user", text: "> my function is returning None but it should return a value" },
                { type: "normal", text: "" },
                { type: "tool", text: "● read_file #1" },
                { type: "tool_summary", text: "  └ Reading: ./src/utils.py" },
                { type: "tool_summary", text: "  └ ✓ Read 25 lines (Type /e 1 to see output)" },
                { type: "normal", text: "" },
                { type: "streaming", text: "I found the issue in your calculate_total() function:" },
                { type: "normal", text: "" },
                { type: "section", text: "Problem:" },
                { type: "bullet", text: "  → Missing return statement on line 15" },
                { type: "bullet", text: "  → Function processes data but doesn't return result" },
                { type: "normal", text: "" },
                { type: "section", text: "Current code:" },
                { type: "code", text: "def calculate_total(items):" },
                { type: "code", text: "    total = sum(item.price for item in items)" },
                { type: "code", text: "    # Missing return statement!" },
                { type: "normal", text: "" },
                { type: "section", text: "Fixed code:" },
                { type: "code", text: "def calculate_total(items):" },
                { type: "code", text: "    total = sum(item.price for item in items)" },
                { type: "code", text: "    return total  # ← Add this line" },
                { type: "normal", text: "" },
                { type: "user", text: "> can you fix it automatically?" },
                { type: "normal", text: "" },
                { type: "tool", text: "● edit_file #2" },
                { type: "tool_summary", text: "  └ Editing: ./src/utils.py:15" },
                { type: "tool_summary", text: "  └ ✓ Added return statement (Type /e 2 to see output)" },
                { type: "normal", text: "" },
                { type: "prompt", text: "> Fixed! Your function now properly returns the calculated total." }
            ]
        }
    },
    {
        id: "interactive-mode",
        tag: "Interactive Mode",
        title: "Conversational Coding",
        icon: RiChat3Line,
        desc: "Enter interactive chat mode for back-and-forth conversations with Codentis. Ask follow-up questions, iterate on solutions, and build complex features through natural dialogue. Perfect for exploring ideas and collaborative problem-solving.",
        cmd: 'codentis',
        terminal: {
            command: 'codentis',
            output: [
                { type: "query", text: "Starting interactive mode..." },
                { type: "normal", text: "" },
                { type: "prompt", text: "❯ Codentis Interactive Mode" },
                { type: "normal", text: "Type your message and press Enter. Use /exit to quit." },
                { type: "normal", text: "" },
                { type: "user", text: "> give me current date and time" },
                { type: "normal", text: "" },
                { type: "tool", text: "● shell #1" },
                { type: "tool_summary", text: "  └ Running: Get-Date" },
                { type: "tool_summary", text: "  └ Executing..." },
                { type: "tool_summary", text: "  └ ✗ Failed (Type /e 1 to see output)" },
                { type: "normal", text: "" },
                { type: "tool", text: "● shell #2" },
                { type: "tool_summary", text: "  └ Running: date /t && time /t" },
                { type: "tool_summary", text: "  └ Executing..." },
                { type: "tool_summary", text: "  └ ✗ Failed (Type /e 2 to see output)" },
                { type: "normal", text: "" },
                { type: "tool", text: "● shell #3" },
                { type: "tool_summary", text: "  └ Running: powershell -Command \"Get-Date\"" },
                { type: "tool_summary", text: "  └ Executing..." },
                { type: "tool_summary", text: "  └ ✓ Command completed successfully (Type /e 3 to see output)" },
                { type: "normal", text: "" },
                { type: "prompt", text: "> Current Date and Time: Wednesday, March 18, 2026, 12:00:00 AM (using PowerShell's Get-Date command)" },
                { type: "normal", text: "" },
                { type: "user", text: "> now help me create a Python script to automate this" },
                { type: "normal", text: "" },
                { type: "streaming", text: "I'll help you create a Python script to get the current date and time:" },
                { type: "normal", text: "" },
                { type: "code", text: "from datetime import datetime" },
                { type: "code", text: "import time" },
                { type: "normal", text: "" },
                { type: "code", text: "def get_current_datetime():" },
                { type: "code", text: "    now = datetime.now()" },
                { type: "code", text: "    return now.strftime('%A, %B %d, %Y, %I:%M:%S %p')" },
                { type: "normal", text: "" },
                { type: "code", text: "if __name__ == '__main__':" },
                { type: "code", text: "    print(f'Current Date and Time: {get_current_datetime()}')" },
                { type: "normal", text: "" },
                { type: "prompt", text: "> Would you like me to save this to a file or add any additional features?" }
            ]
        }
    },
    {
        id: "refactoring",
        tag: "Refactoring",
        title: "Code Improvement",
        icon: RiRefreshLine,
        desc: "Get intelligent suggestions for improving your code structure, performance, and maintainability. Codentis analyzes your codebase and provides detailed refactoring recommendations with modern patterns and best practices.",
        cmd: 'codentis',
        terminal: {
            command: 'codentis',
            output: [
                { type: "query", text: "Starting interactive mode..." },
                { type: "normal", text: "" },
                { type: "prompt", text: "❯ Codentis Interactive Mode" },
                { type: "normal", text: "Type your message and press Enter. Use /exit to quit." },
                { type: "normal", text: "" },
                { type: "user", text: "> refactor this legacy code to use modern patterns" },
                { type: "normal", text: "" },
                { type: "tool", text: "● read_file #1" },
                { type: "tool_summary", text: "  └ Reading: ./legacy_handler.py" },
                { type: "tool_summary", text: "  └ ✓ Read 45 lines (Type /e 1 to see output)" },
                { type: "normal", text: "" },
                { type: "streaming", text: "I'll refactor this to use modern async patterns and type hints:" },
                { type: "normal", text: "" },
                { type: "section", text: "Before (Legacy):" },
                { type: "code", text: "def process_data(data):" },
                { type: "code", text: "    result = []" },
                { type: "code", text: "    for item in data:" },
                { type: "code", text: "        result.append(transform(item))" },
                { type: "code", text: "    return result" },
                { type: "normal", text: "" },
                { type: "section", text: "After (Modern):" },
                { type: "code", text: "from typing import List, Dict" },
                { type: "code", text: "import asyncio" },
                { type: "normal", text: "" },
                { type: "code", text: "async def process_data(data: List[Dict]) -> List[ProcessedItem]:" },
                { type: "code", text: "    tasks = [transform_async(item) for item in data]" },
                { type: "code", text: "    return await asyncio.gather(*tasks)" },
                { type: "normal", text: "" },
                { type: "user", text: "> apply these changes to my file" },
                { type: "normal", text: "" },
                { type: "tool", text: "● edit_file #2" },
                { type: "tool_summary", text: "  └ Editing: ./legacy_handler.py" },
                { type: "tool_summary", text: "  └ ✓ Refactored with modern patterns (Type /e 2 to see output)" },
                { type: "normal", text: "" },
                { type: "prompt", text: "> Refactoring complete! Added type safety, async processing, and 3x better performance." }
            ]
        }
    },
    {
        id: "project-analysis",
        tag: "Project Analysis",
        title: "Codebase Understanding",
        icon: RiFileSearchLine,
        desc: "Analyze entire projects and understand complex codebases. Codentis can explore directory structures, read multiple files, and provide comprehensive insights about architecture, dependencies, and potential improvements across your entire project.",
        cmd: 'codentis',
        terminal: {
            command: 'codentis',
            output: [
                { type: "query", text: "Starting interactive mode..." },
                { type: "normal", text: "" },
                { type: "prompt", text: "❯ Codentis Interactive Mode" },
                { type: "normal", text: "Type your message and press Enter. Use /exit to quit." },
                { type: "normal", text: "" },
                { type: "user", text: "> analyze my project structure and suggest improvements" },
                { type: "normal", text: "" },
                { type: "tool", text: "● list_dir #1" },
                { type: "tool_summary", text: "  └ Listing: ./" },
                { type: "tool_summary", text: "  └ ✓ Found 15 files and directories (Type /e 1 to see output)" },
                { type: "normal", text: "" },
                { type: "tool", text: "● read_file #2" },
                { type: "tool_summary", text: "  └ Reading: ./package.json" },
                { type: "tool_summary", text: "  └ ✓ Read package.json (Type /e 2 to see output)" },
                { type: "normal", text: "" },
                { type: "tool", text: "● glob #3" },
                { type: "tool_summary", text: "  └ Searching: **/*.py" },
                { type: "tool_summary", text: "  └ ✓ Found 23 Python files (Type /e 3 to see output)" },
                { type: "normal", text: "" },
                { type: "streaming", text: "Based on your project analysis:" },
                { type: "normal", text: "" },
                { type: "section", text: "Project Structure:" },
                { type: "bullet", text: "  → FastAPI backend with 23 Python modules" },
                { type: "bullet", text: "  → React frontend with TypeScript" },
                { type: "bullet", text: "  → PostgreSQL database integration" },
                { type: "normal", text: "" },
                { type: "section", text: "Recommendations:" },
                { type: "bullet", text: "  → Add API versioning (/api/v1/)" },
                { type: "bullet", text: "  → Implement proper error handling middleware" },
                { type: "bullet", text: "  → Add database migrations with Alembic" },
                { type: "bullet", text: "  → Set up pre-commit hooks for code quality" },
                { type: "normal", text: "" },
                { type: "user", text: "> show me how to implement API versioning" },
                { type: "normal", text: "" },
                { type: "streaming", text: "I'll show you how to add proper API versioning:" },
                { type: "normal", text: "" },
                { type: "code", text: "from fastapi import APIRouter" },
                { type: "normal", text: "" },
                { type: "code", text: "# Create versioned routers" },
                { type: "code", text: "v1_router = APIRouter(prefix='/api/v1')" },
                { type: "code", text: "v2_router = APIRouter(prefix='/api/v2')" },
                { type: "normal", text: "" },
                { type: "code", text: "# Include in main app" },
                { type: "code", text: "app.include_router(v1_router)" },
                { type: "code", text: "app.include_router(v2_router)" },
                { type: "normal", text: "" },
                { type: "prompt", text: "> This allows backward compatibility while introducing new features!" }
            ]
        }
    },
    {
        id: "web-research",
        tag: "Web Research",
        title: "Real-time Information",
        icon: RiSearchLine,
        desc: "Get up-to-date information from the web about libraries, frameworks, and best practices. Codentis can search the internet, fetch documentation, and provide current solutions based on the latest developments in the tech ecosystem.",
        cmd: 'codentis',
        terminal: {
            command: 'codentis',
            output: [
                { type: "query", text: "Starting interactive mode..." },
                { type: "normal", text: "" },
                { type: "prompt", text: "❯ Codentis Interactive Mode" },
                { type: "normal", text: "Type your message and press Enter. Use /exit to quit." },
                { type: "normal", text: "" },
                { type: "user", text: "> what's the latest version of React and what are the new features?" },
                { type: "normal", text: "" },
                { type: "tool", text: "● web_search #1" },
                { type: "tool_summary", text: "  └ Searching: React latest version 2026 new features" },
                { type: "tool_summary", text: "  └ ✓ Found 8 results (Type /e 1 to see output)" },
                { type: "normal", text: "" },
                { type: "tool", text: "● web_fetch #2" },
                { type: "tool_summary", text: "  └ Fetching: https://react.dev/blog/2026/03/react-19" },
                { type: "tool_summary", text: "  └ ✓ Retrieved React 19 documentation (Type /e 2 to see output)" },
                { type: "normal", text: "" },
                { type: "streaming", text: "React 19 is the latest stable version (March 2026) with exciting new features:" },
                { type: "normal", text: "" },
                { type: "section", text: "New Features:" },
                { type: "bullet", text: "  → React Compiler: Automatic optimization" },
                { type: "bullet", text: "  → Server Components: Better SSR performance" },
                { type: "bullet", text: "  → Actions: Simplified form handling" },
                { type: "bullet", text: "  → use() Hook: Better async data fetching" },
                { type: "normal", text: "" },
                { type: "section", text: "Example with new use() hook:" },
                { type: "code", text: "import { use } from 'react';" },
                { type: "normal", text: "" },
                { type: "code", text: "function UserProfile({ userPromise }) {" },
                { type: "code", text: "  const user = use(userPromise);" },
                { type: "code", text: "  return <div>{user.name}</div>;" },
                { type: "code", text: "}" },
                { type: "normal", text: "" },
                { type: "user", text: "> how do I migrate from React 18 to 19?" },
                { type: "normal", text: "" },
                { type: "tool", text: "● web_fetch #3" },
                { type: "tool_summary", text: "  └ Fetching: https://react.dev/blog/2026/03/react-19-upgrade-guide" },
                { type: "tool_summary", text: "  └ ✓ Retrieved migration guide (Type /e 3 to see output)" },
                { type: "normal", text: "" },
                { type: "streaming", text: "Here's the step-by-step migration process:" },
                { type: "normal", text: "" },
                { type: "section", text: "Migration Steps:" },
                { type: "bullet", text: "  → Update React: npm install react@19 react-dom@19" },
                { type: "bullet", text: "  → Run codemod: npx @react/codemod@latest react-19" },
                { type: "bullet", text: "  → Update TypeScript types if needed" },
                { type: "bullet", text: "  → Test your app thoroughly" },
                { type: "normal", text: "" },
                { type: "prompt", text: "> Most apps can upgrade with minimal changes. The codemod handles most breaking changes automatically!" }
            ]
        }
    }
];

export default function Demo() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeUseCase, setActiveUseCase] = useState("quick-query");
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [headerVisible, setHeaderVisible] = useState(false);

    const currentUseCase = useCases.find(u => u.id === activeUseCase) || useCases[0];

    const handleUseCaseClick = (useCaseId: string) => {
        if (useCaseId === activeUseCase) return;
        
        setIsTransitioning(true);
        
        setTimeout(() => {
            setActiveUseCase(useCaseId);
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
            
            <section id="workflows" className="py-24 sm:py-32 bg-bg-1 relative w-full" ref={sectionRef}>
            <div className="w-full px-8 sm:px-10 lg:px-16">
                {/* Header */}
                <div className="mb-16 sm:mb-20 reveal header-reveal w-full max-w-none flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                    <div className="lg:max-w-md">
                        <span className="text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cyan-400/80 mb-4 sm:mb-5 block">
                            Powerful workflows
                        </span>
                        <h2 className={`text-[clamp(1.5rem,3.5vw,2.5rem)] font-medium tracking-[-0.02em] leading-[1.1] text-white mb-6 transition-all duration-700 ${
                            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}>
                            One command.
                            <br />
                            <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                                Infinite power.
                            </span>
                        </h2>
                    </div>
                    <div className="lg:max-w-lg lg:pt-4">
                        <p className={`text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed transition-all duration-700 delay-300 ${
                            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}>
                            From quick queries to complex debugging, Codentis handles every development scenario with intelligent responses and contextual understanding. One simple command unlocks unlimited AI-powered assistance.
                        </p>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-none">
                    {/* Left Side - Terminal Preview */}
                    <div className="lg:col-span-8 reveal">
                        <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl border border-white/[0.04] bg-bg-1 overflow-hidden">
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
                                    <span className="text-white">{currentUseCase.terminal.command}</span>
                                </div>

                                {/* Terminal Output */}
                                <div className="space-y-0 text-wrap break-words">
                                    {currentUseCase.terminal.output.map((line, index) => {
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
                                            case "tool":
                                                className += " text-purple-400 font-medium";
                                                break;
                                            case "tool_summary":
                                                className += " text-gray-400";
                                                break;
                                            case "code":
                                                className += " text-emerald-400 bg-black/30 px-2 py-0.5 rounded font-mono text-sm";
                                                break;
                                            case "user":
                                                className += " text-yellow-400 font-medium";
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

                    {/* Right Sidebar - Use Case List */}
                    <div className="lg:col-span-4 reveal">
                        <div className="space-y-2">
                            {useCases.map((useCase, index) => (
                                <div
                                    key={useCase.id}
                                    className={`group cursor-pointer transition-all duration-300 rounded-lg ${
                                        activeUseCase === useCase.id 
                                            ? 'bg-white/[0.05] border-r-2 border-cyan-400' 
                                            : 'hover:bg-white/[0.02] border-r-2 border-transparent'
                                    }`}
                                    onClick={() => handleUseCaseClick(useCase.id)}
                                >
                                    <div className="flex items-center gap-4 p-4">
                                        {/* Arrow indicator */}
                                        <div className={`hidden lg:block transition-all duration-300 ${
                                            activeUseCase === useCase.id 
                                                ? 'text-cyan-400 opacity-100' 
                                                : 'text-gray-600 opacity-0 group-hover:opacity-50'
                                        }`}>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                {/* Icon */}
                                                <div className={`flex items-center justify-center transition-all duration-300 ${
                                                    activeUseCase === useCase.id 
                                                        ? 'text-cyan-400' 
                                                        : 'text-gray-400 group-hover:text-gray-300'
                                                }`}>
                                                    <useCase.icon className="w-5 h-5" />
                                                </div>
                                                
                                                <h4 className={`text-sm sm:text-base font-medium transition-all duration-300 ${
                                                    activeUseCase === useCase.id 
                                                        ? 'text-white' 
                                                        : 'text-gray-300 group-hover:text-white'
                                                }`}>
                                                    {useCase.title}
                                                </h4>
                                            </div>
                                            
                                            {/* Description - only show for active use case */}
                                            <div className={`overflow-hidden transition-all duration-500 ease-out ${
                                                activeUseCase === useCase.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                            }`}>
                                                <p className={`text-xs sm:text-sm text-gray-400 leading-relaxed transition-all duration-500 delay-100 ${
                                                    activeUseCase === useCase.id && !isTransitioning 
                                                        ? 'translate-y-0 opacity-100' 
                                                        : 'translate-y-2 opacity-0'
                                                }`}>
                                                    {useCase.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}
