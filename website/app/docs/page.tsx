"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  RiSpeedLine,
  RiLockLine,
  RiToolsLine,
  RiGlobalLine,
  RiSparklingLine,
  RiRefreshLine,
  RiAppleFill,
  RiMicrosoftFill,
  RiUbuntuLine,
  RiArrowRightLine,
  RiOpenaiFill,
  RiClaudeLine,
  RiGeminiFill,
  RiGitBranchFill,
  RiGeminiLine,
  RiServerLine,
  RiComputerLine,
  RiBookOpenLine,
  RiQuestionAnswerLine,
  RiBugLine,
  RiLightbulbLine,
  RiGithubFill,
  RiFileTextLine,
  RiRocketLine,
  RiStarLine,
  RiEyeLine,
  RiNotificationLine,
  RiMenuLine,
  RiCloseLine
} from "react-icons/ri";

const VERSION = '1.4.3';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    {
      title: "Getting Started",
      items: [
        { id: "introduction", label: "Introduction" },
        { id: "installation", label: "Installation" },
        { id: "quickstart", label: "Quick Start" },
        { id: "system-requirements", label: "System Requirements" },
      ]
    },
    {
      title: "Configuration",
      items: [
        { id: "configuration", label: "Configuration" },
        { id: "ai-providers", label: "AI Providers" },
        { id: "workspace-trust", label: "Workspace Trust" },
      ]
    },
    {
      title: "Features & Tools",
      items: [
        { id: "tools", label: "Built-in Tools" },
        { id: "commands", label: "Commands" },
        { id: "shell-integration", label: "Shell Integration" },
        { id: "auto-update", label: "Auto-Update System" },
      ]
    },
    {
      title: "Advanced",
      items: [
        { id: "project-config", label: "Project Configuration" },
        { id: "custom-tools", label: "Custom Tools" },
        { id: "performance", label: "Performance Tuning" },
        { id: "security", label: "Security Best Practices" },
      ]
    },
    {
      title: "Support & Resources",
      items: [
        { id: "troubleshooting", label: "Troubleshooting" },
        { id: "faq", label: "FAQ" },
        { id: "examples", label: "Examples & Recipes" },
        { id: "community", label: "Community & Support" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Mobile Header Blocker - Prevents content scroll visibility above menu */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-[84px] bg-black z-40" />

      {/* Mobile Top Nav */}
      <div className="lg:hidden fixed top-[84px] left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-2xl px-4 py-2.5 flex items-center justify-between shadow-2xl">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 px-2 py-1 rounded-lg"
        >
          {isMenuOpen ? <RiCloseLine size={16} /> : <RiMenuLine size={16} />}
          <span>Menu</span>
        </button>
        <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-bold overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]">
          {sections.flatMap(s => s.items).find(i => i.id === activeSection)?.label}
        </span>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-30 bg-black pt-36 px-6 overflow-y-auto pb-20 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {sections.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 mb-3">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                    className={`w-full text-left py-2 text-[15px] font-medium transition-colors ${activeSection === item.id ? "text-cyan-400" : "text-zinc-400 hover:text-white"
                      }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex pt-36 lg:pt-20">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 fixed left-0 top-20 bottom-0 border-r border-white/[0.05] bg-black overflow-y-auto font-sans">
          <div className="p-6">
            {sections.map((section) => (
              <div key={section.title} className="mb-6">
                <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 mb-2">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${activeSection === item.id
                          ? "bg-cyan-500/10 text-cyan-400"
                          : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                          }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 w-full min-w-0">
          <div className="max-w-full mx-auto px-5 sm:px-12 lg:px-16 py-4 sm:py-8 lg:py-12 pb-24">
            {/* Introduction */}
            {activeSection === "introduction" && (
              <div className="space-y-6 mt-6 lg:mt-0">
                <div>
                  <span className="text-[9px] sm:text-xs font-bold uppercase tracking-[0.25em] text-cyan-400/70">Get Started</span>
                  <h1 className="text-xl sm:text-3xl font-semibold mt-2.5 mb-4 text-white tracking-tight">Introduction to Codentis</h1>
                  <p className="text-[13px] sm:text-sm text-zinc-400 mb-4 leading-relaxed">
                    Codentis is an intelligent CLI AI agent that brings the power of Large Language Models directly to your terminal. It's designed to be your coding companion, helping you write, debug, and understand code faster than ever before.
                  </p>
                  <p className="text-[13px] sm:text-sm text-zinc-400 leading-relaxed">
                    Whether you're building a new project, debugging an issue, or learning a new technology, Codentis provides instant, context-aware assistance right where you work.
                  </p>
                </div>

                {/* Key Features Grid */}
                <div>
                  <h2 className="text-base sm:text-lg font-semibold mb-4 text-zinc-200">Key Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-5 border border-white/[0.05] bg-bg-2 rounded-xl">
                      <div className="flex items-center gap-3 mb-2.5">
                        <RiSpeedLine className="text-cyan-400 text-lg sm:text-2xl" />
                        <h3 className="text-sm sm:text-base font-semibold">Fast & Efficient</h3>
                      </div>
                      <p className="text-[12px] sm:text-sm text-zinc-400 leading-relaxed">
                        Built with async Python for high performance. Streaming responses show results as they're generated, and collapsible tool outputs keep your terminal clean.
                      </p>
                    </div>

                    <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <RiLockLine className="text-cyan-400 text-2xl" />
                        <h3 className="text-base font-semibold">Secure by Default</h3>
                      </div>
                      <p className="text-sm text-zinc-400">
                        Workspace trust system prevents unauthorized file access. Shell command approval for write operations ensures you're always in control.
                      </p>
                    </div>

                    <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <RiToolsLine className="text-cyan-400 text-2xl" />
                        <h3 className="text-base font-semibold">Powerful Tools</h3>
                      </div>
                      <p className="text-sm text-zinc-400">
                        12 built-in tools for file operations, shell commands, web search, and more. Read, write, edit files, search code, and execute commands seamlessly.
                      </p>
                    </div>

                    <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <RiGlobalLine className="text-cyan-400 text-2xl" />
                        <h3 className="text-base font-semibold">Cross-Platform</h3>
                      </div>
                      <p className="text-sm text-zinc-400">
                        Native support for Windows, macOS, and Linux with platform-specific handling. Works the same way everywhere you code.
                      </p>
                    </div>

                    <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <RiSparklingLine className="text-cyan-400 text-2xl" />
                        <h3 className="text-base font-semibold">Beautiful UI</h3>
                      </div>
                      <p className="text-sm text-zinc-400">
                        Markdown rendering with syntax highlighting, collapsible sections, and a clean interface that makes reading code and documentation easy.
                      </p>
                    </div>

                    <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <RiRefreshLine className="text-cyan-400 text-2xl" />
                        <h3 className="text-base font-semibold">Auto-Update</h3>
                      </div>
                      <p className="text-sm text-zinc-400">
                        Automatic update checks keep you on the latest version with new features and improvements. Updates are seamless and non-intrusive.
                      </p>
                    </div>
                  </div>
                </div>

                {/* What You Can Do */}
                <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 text-cyan-400">What You Can Do with Codentis</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-base font-semibold mb-2 text-zinc-300">Code Generation</h3>
                      <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                        <li>• Create complete files from descriptions</li>
                        <li>• Generate boilerplate and scaffolding</li>
                        <li>• Write functions, classes, and modules</li>
                        <li>• Add tests and documentation</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-2 text-zinc-300">Code Editing</h3>
                      <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                        <li>• Refactor existing code</li>
                        <li>• Fix bugs and errors</li>
                        <li>• Add new features to files</li>
                        <li>• Update dependencies and imports</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-2 text-zinc-300">Code Understanding</h3>
                      <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                        <li>• Explain complex code sections</li>
                        <li>• Summarize file contents</li>
                        <li>• Find patterns and issues</li>
                        <li>• Review and analyze code</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-2 text-zinc-300">Project Management</h3>
                      <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                        <li>• Search across your codebase</li>
                        <li>• Run build and test commands</li>
                        <li>• Manage dependencies</li>
                        <li>• Track TODOs and tasks</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* How It Works */}
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold mb-4">How It Works</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-semibold">
                        1
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-1">You Ask</h3>
                        <p className="text-sm text-zinc-400">Type your request in natural language. "Create a Python script that sorts a list" or "Fix the bug in app.py".</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-semibold">
                        2
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-1">Codentis Thinks</h3>
                        <p className="text-sm text-zinc-400">The AI analyzes your request, understands context, and plans the best approach using available tools.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-semibold">
                        3
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-1">Tools Execute</h3>
                        <p className="text-sm text-zinc-400">Codentis uses built-in tools to read files, write code, search patterns, run commands, and more.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-semibold">
                        4
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-1">You Review</h3>
                        <p className="text-sm text-zinc-400">See the results, review changes, and continue the conversation. Codentis learns from your feedback.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Use Cases */}
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold mb-4">Perfect For</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                      <h3 className="text-sm sm:text-base font-semibold mb-2">Developers</h3>
                      <p className="text-[13px] sm:text-sm text-zinc-400">
                        Speed up your workflow with instant code generation, refactoring, and debugging assistance.
                      </p>
                    </div>
                    <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                      <h3 className="text-sm sm:text-base font-semibold mb-2">Students</h3>
                      <p className="text-[13px] sm:text-sm text-zinc-400">
                        Learn programming concepts, understand code examples, and get help with assignments.
                      </p>
                    </div>
                    <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                      <h3 className="text-sm sm:text-base font-semibold mb-2">Teams</h3>
                      <p className="text-[13px] sm:text-sm text-zinc-400">
                        Maintain consistent code quality, document projects, and onboard new team members faster.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Why Choose Codentis */}
                <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4">Why Choose Codentis?</h2>
                  <div className="space-y-3 text-[13px] sm:text-sm text-zinc-400">
                    <div className="flex gap-3">
                      <span className="text-cyan-400 flex-shrink-0">✓</span>
                      <p><strong className="text-zinc-300">Terminal-Native:</strong> Works directly in your terminal, no browser tabs or context switching required.</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-cyan-400 flex-shrink-0">✓</span>
                      <p><strong className="text-zinc-300">Privacy-Focused:</strong> Your code stays on your machine. Only sends necessary context to the AI provider you choose.</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-cyan-400 flex-shrink-0">✓</span>
                      <p><strong className="text-zinc-300">Provider Flexibility:</strong> Use OpenAI, Anthropic, OpenRouter, or run models locally with Ollama.</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-cyan-400 flex-shrink-0">✓</span>
                      <p><strong className="text-zinc-300">Open Source:</strong> Transparent, auditable code. Contribute, customize, or learn from the implementation.</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-cyan-400 flex-shrink-0">✓</span>
                      <p><strong className="text-zinc-300">Active Development:</strong> Regular updates with new features, improvements, and bug fixes.</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveSection("installation")}
                    className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-all flex items-center gap-2"
                  >
                    Get Started <RiArrowRightLine />
                  </button>
                  <button
                    onClick={() => setActiveSection("quickstart")}
                    className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border border-white/[0.1] hover:border-cyan-500/50 text-zinc-300 hover:text-white font-semibold rounded-lg transition-all"
                  >
                    Quick Start Guide
                  </button>
                </div>
              </div>
            )}

            {/* Installation */}
            {activeSection === "installation" && (
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-cyan-400/80">Getting Started</span>
                  <h1 className="text-xl sm:text-3xl font-semibold mt-3 mb-4">Installation</h1>
                  <p className="text-[13px] sm:text-sm text-zinc-400">
                    Install Codentis on Windows, macOS, or Linux using our native installers. Choose your platform below for detailed installation instructions.
                  </p>
                </div>

                {/* Platform Selection Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <RiMicrosoftFill className="text-cyan-400 text-3xl" />
                      <h3 className="text-sm sm:text-base font-semibold">Windows</h3>
                    </div>
                    <p className="text-sm text-zinc-400 mb-4">Windows 10/11 (64-bit)</p>
                    <a
                      href={`https://github.com/sujal-GITHUB/Codentis/releases/latest/download/Codentis-Setup-${VERSION}.exe`}
                      className="inline-block px-3 py-1.5 text-sm bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-all w-full text-center"
                    >
                      Download Installer (34 MB)
                    </a>
                  </div>

                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <RiAppleFill className="text-cyan-400 text-3xl" />
                      <h3 className="text-sm sm:text-base font-semibold">macOS</h3>
                    </div>
                    <p className="text-sm text-zinc-400 mb-4">macOS 11+ (Big Sur or later)</p>
                    <div className="flex flex-col gap-2">
                      <a
                        href={`https://github.com/sujal-GITHUB/Codentis/releases/latest/download/Codentis-${VERSION}-arm64.pkg`}
                        className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-all text-sm text-center"
                      >
                        Apple Silicon (M series)
                      </a>
                      <a
                        href={`https://github.com/sujal-GITHUB/Codentis/releases/latest/download/Codentis-${VERSION}-intel.pkg`}
                        className="px-3 py-1.5 bg-cyan-500/80 hover:bg-cyan-500 text-black font-semibold rounded-lg transition-all text-sm text-center"
                      >
                        Intel
                      </a>
                    </div>
                  </div>

                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <RiUbuntuLine className="text-cyan-400 text-3xl" />
                      <h3 className="text-sm sm:text-base font-semibold">Linux</h3>
                    </div>
                    <p className="text-sm text-zinc-400 mb-4">Debian/Ubuntu (64-bit)</p>
                    <a
                      href={`https://github.com/sujal-GITHUB/Codentis/releases/latest/download/codentis_${VERSION}_amd64.deb`}
                      className="inline-block px-3 py-1.5 text-sm bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-all w-full text-center"
                    >
                      Download .deb Package
                    </a>
                  </div>
                </div>

                {/* Detailed Installation Instructions */}
                <div className="space-y-6">
                  {/* Windows Installation */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                      <RiMicrosoftFill className="text-cyan-400 text-lg" />
                      Windows Installation
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Step 1: Download the Installer</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Download the Codentis-Setup-{'1.4.3'}.exe file from the link above.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Step 2: Run the Installer</p>
                        <p className="text-sm text-zinc-400 mb-2">Double-click the downloaded .exe file. Windows may show a security warning - click "More info" then "Run anyway".</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Step 3: Follow the Setup Wizard</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Choose installation directory (default: C:\Program Files\Codentis)</li>
                          <li>• The installer automatically adds Codentis to your PATH</li>
                          <li>• Creates Start Menu shortcuts</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Step 4: Verify Installation</p>
                        <p className="text-sm text-zinc-400 mb-2">Open a new Command Prompt or PowerShell window and run:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <div className="text-white">codentis --version</div>
                          <div className="text-cyan-400 mt-1">Codentis v1.4.3</div>
                        </div>
                      </div>

                      <div className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-yellow-400 mb-1">⚠ Important</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">If the command isn't found, restart your terminal or log out and back in to refresh your PATH.</p>
                      </div>
                    </div>
                  </div>

                  {/* macOS Installation */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                      <RiAppleFill className="text-cyan-400 text-lg" />
                      macOS Installation
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Step 1: Choose Your Architecture</p>
                        <p className="text-sm text-zinc-400 mb-2">Download the correct package for your Mac:</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• <strong>Apple Silicon</strong> - For M1, M2, M3 Macs (2020 or newer)</li>
                          <li>• <strong>Intel</strong> - For Intel-based Macs (2019 or older)</li>
                        </ul>
                        <p className="text-sm text-zinc-400 mt-2">Not sure? Click the Apple menu → About This Mac to check your processor.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Step 2: Install the Package</p>
                        <p className="text-sm text-zinc-400 mb-2">Double-click the downloaded .pkg file and follow the installer:</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Click "Continue" through the introduction</li>
                          <li>• Accept the license agreement</li>
                          <li>• Choose installation location (default: /usr/local/bin)</li>
                          <li>• Enter your password when prompted</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Step 3: Grant Permissions (First Time Only)</p>
                        <p className="text-sm text-zinc-400 mb-2">macOS may block the app. If you see a security warning:</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm space-y-2">
                          <div className="text-zinc-400">1. Open System Settings → Privacy & Security</div>
                          <div className="text-zinc-400">2. Scroll down to find "Codentis was blocked"</div>
                          <div className="text-zinc-400">3. Click "Allow Anyway"</div>
                          <div className="text-zinc-400">4. Run codentis again and click "Open"</div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Step 4: Verify Installation</p>
                        <p className="text-sm text-zinc-400 mb-2">Open Terminal and run:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <div className="text-white">codentis --version</div>
                          <div className="text-cyan-400 mt-1">Codentis v1.4.3</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Linux Installation */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                      <RiUbuntuLine className="text-cyan-400 text-lg" />
                      Linux Installation
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Debian/Ubuntu Installation</p>
                        <p className="text-sm text-zinc-400 mb-2">Download and install the .deb package:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1">
                          <div className="text-zinc-500"># Download the package</div>
                          <div className="text-white">wget https://github.com/sujal-GITHUB/Codentis/releases/latest/download/codentis_{VERSION}_amd64.deb</div>
                          <div className="text-zinc-500 mt-2"># Install</div>
                          <div className="text-white">sudo dpkg -i codentis_{VERSION}_amd64.deb</div>
                          <div className="text-zinc-500 mt-2"># Fix dependencies if needed</div>
                          <div className="text-white">sudo apt-get install -f</div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Other Distributions</p>
                        <p className="text-sm text-zinc-400 mb-2">For other Linux distributions, you can install from source:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1">
                          <div className="text-zinc-500"># Clone the repository</div>
                          <div className="text-white">git clone https://github.com/sujal-GITHUB/Codentis.git</div>
                          <div className="text-white">cd Codentis</div>
                          <div className="text-zinc-500 mt-2"># Install with pip</div>
                          <div className="text-white">pip install -e .</div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Verify Installation</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <div className="text-white">codentis --version</div>
                          <div className="text-cyan-400 mt-1">Codentis v1.4.3</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post-Installation Setup */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-4 text-cyan-400">Post-Installation: Configure Your AI Provider</h3>

                    <div className="space-y-4">
                      <p className="text-[13px] sm:text-sm text-zinc-400">After installation, you need to configure Codentis with an AI provider. Run the setup wizard:</p>

                      <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1">
                        <div className="text-white">codentis config</div>
                        <div className="text-zinc-400 mt-2"># Or just run codentis for the first time</div>
                        <div className="text-white">codentis</div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">The wizard will ask you to:</p>
                        <ol className="text-sm text-zinc-400 space-y-2 ml-4">
                          <li>1. <strong>Choose a provider:</strong> OpenAI, Anthropic, OpenRouter, or Custom</li>
                          <li>2. <strong>Enter your API key:</strong> Get this from your provider's dashboard</li>
                          <li>3. <strong>Select a model:</strong> Choose from available models (e.g., gpt-4o, claude-3-5-sonnet)</li>
                        </ol>
                      </div>

                      <div className="bg-white/5 p-3 rounded">
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Popular AI Provider Options:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-zinc-400">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <RiOpenaiFill className="text-cyan-400" />
                              <strong className="text-cyan-400">OpenAI</strong>
                            </div>
                            <p>• Get API key: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">platform.openai.com</a></p>
                            <p>• Recommended model: gpt-4o</p>
                            <p>• Cost: ~$0.03/1K tokens</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <RiClaudeLine className="text-cyan-400" />
                              <strong className="text-cyan-400">Anthropic</strong>
                            </div>
                            <p>• Get API key: <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">console.anthropic.com</a></p>
                            <p>• Recommended model: claude-3-5-sonnet</p>
                            <p>• Cost: ~$0.003/1K tokens</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <RiGitBranchFill className="text-cyan-400" />
                              <strong className="text-cyan-400">OpenRouter</strong>
                            </div>
                            <p>• Get API key: <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">openrouter.ai</a></p>
                            <p>• Access 100+ models</p>
                            <p>• Cost: Varies by model</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <RiGeminiLine className="text-cyan-400" />
                              <strong className="text-cyan-400">Local (Ollama)</strong>
                            </div>
                            <p>• Install: <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">ollama.ai</a></p>
                            <p>• Endpoint: http://localhost:11434/v1</p>
                            <p>• Cost: Free (runs locally)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* System Requirements */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">System Requirements</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Windows</p>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• Windows 10/11 (64-bit)</li>
                          <li>• 4 GB RAM minimum (8 GB recommended)</li>
                          <li>• 100 MB disk space</li>
                          <li>• Internet connection for AI API</li>
                          <li>• Terminal: CMD, PowerShell, or Git Bash</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">macOS</p>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• macOS 11+ (Big Sur or later)</li>
                          <li>• Apple Silicon (M1/M2/M3) or Intel</li>
                          <li>• 4 GB RAM minimum (8 GB recommended)</li>
                          <li>• 100 MB disk space</li>
                          <li>• Internet connection for AI API</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Linux</p>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• Ubuntu 20.04+, Debian 11+, or similar</li>
                          <li>• 4 GB RAM minimum (8 GB recommended)</li>
                          <li>• 100 MB disk space</li>
                          <li>• Internet connection for AI API</li>
                          <li>• Terminal with bash or zsh</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Troubleshooting Installation */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Installation Troubleshooting</h3>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-red-400 mb-1">Command not found after installation</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Restart your terminal or log out and back in. The PATH may not be updated in your current session.</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-red-400 mb-1">Windows security warning</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Click "More info" then "Run anyway". Codentis is safe - Windows shows this for new applications.</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-red-400 mb-1">macOS "cannot be opened" error</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Go to System Settings → Privacy & Security and click "Allow Anyway" next to the Codentis warning.</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-red-400 mb-1">Linux dependency errors</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Run <code className="text-cyan-300 bg-black/50 px-1 rounded">sudo apt-get install -f</code> to fix missing dependencies.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveSection("quickstart")}
                  className="px-4 py-2 text-sm bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-all"
                >
                  Next: Quick Start →
                </button>
              </div>
            )}

            {/* Quick Start */}
            {activeSection === "quickstart" && (
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-cyan-400/80">Getting Started</span>
                  <h1 className="text-xl sm:text-3xl font-semibold mt-3 mb-4">Quick Start</h1>
                  <p className="text-[13px] sm:text-sm text-zinc-400">
                    Get up and running with Codentis in just a few minutes. This guide walks you through your first session from installation to writing your first code.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Step 1: Verify Installation */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">1. Verify Installation</h3>
                    <p className="text-sm text-zinc-400 mb-3">First, make sure Codentis is installed correctly by checking the version:</p>
                    <div className="bg-black/50 p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-white">$ codentis --version</div>
                      <div className="text-cyan-400 mt-1">Codentis v1.4.3</div>
                    </div>
                    <p className="text-sm text-zinc-400 mt-3">If you see the version number, you're ready to go! If not, head to the <button onClick={() => setActiveSection("installation")} className="text-cyan-400 hover:text-cyan-300 underline">Installation</button> section.</p>
                  </div>

                  {/* Step 2: First Launch */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">2. Launch Codentis</h3>
                    <p className="text-sm text-zinc-400 mb-3">Navigate to a project directory (or create a new one) and start Codentis:</p>
                    <div className="bg-black/50 p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-zinc-500"># Create a test directory</div>
                      <div className="text-white">$ mkdir my-project && cd my-project</div>
                      <div className="text-zinc-500 mt-2"># Start Codentis</div>
                      <div className="text-white">$ codentis</div>
                    </div>
                    <p className="text-sm text-zinc-400 mt-3">On first launch, you'll be prompted to trust the workspace. Type <code className="text-cyan-300 bg-black/50 px-1 rounded">yes</code> to continue.</p>
                  </div>

                  {/* Step 3: Configuration Wizard */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">3. Configure Your AI Provider</h3>
                    <p className="text-sm text-zinc-400 mb-3">If this is your first time, the setup wizard will guide you through configuration:</p>

                    <div className="bg-black/50 p-4 rounded-lg font-mono text-sm space-y-1 mb-4">
                      <div className="text-cyan-400">Welcome to Codentis Setup!</div>
                      <div className="text-white mt-2">Select your AI provider:</div>
                      <div className="text-zinc-400">1. OpenAI (GPT-4, GPT-3.5)</div>
                      <div className="text-zinc-400">2. Anthropic (Claude)</div>
                      <div className="text-zinc-400">3. OpenRouter (100+ models)</div>
                      <div className="text-zinc-400">4. Custom (Local/Other)</div>
                      <div className="text-white mt-2">Choice [1-4]: <span className="text-cyan-400">1</span></div>
                      <div className="text-white mt-2">Enter your OpenAI API key: <span className="text-zinc-500">sk-...</span></div>
                      <div className="text-white mt-2">Select model:</div>
                      <div className="text-zinc-400">1. gpt-4o (recommended)</div>
                      <div className="text-zinc-400">2. gpt-4-turbo</div>
                      <div className="text-zinc-400">3. gpt-3.5-turbo</div>
                      <div className="text-white mt-2">Choice [1-3]: <span className="text-cyan-400">1</span></div>
                      <div className="text-cyan-400 mt-2">✓ Configuration saved!</div>
                    </div>

                    <div className="space-y-2 text-sm text-zinc-400">
                      <p><strong className="text-zinc-300">Need an API key?</strong></p>
                      <ul className="space-y-1 ml-4">
                        <li className="flex items-center gap-2">
                          <RiOpenaiFill className="text-cyan-400" />
                          <span>OpenAI: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">platform.openai.com/api-keys</a></span>
                        </li>
                        <li className="flex items-center gap-2">
                          <RiClaudeLine className="text-cyan-400" />
                          <span>Anthropic: <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">console.anthropic.com</a></span>
                        </li>
                        <li className="flex items-center gap-2">
                          <RiGitBranchFill className="text-cyan-400" />
                          <span>OpenRouter: <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">openrouter.ai</a></span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Step 4: Your First Request */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">4. Make Your First Request</h3>
                    <p className="text-sm text-zinc-400 mb-3">Now you're ready to start coding! Try these example requests:</p>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Example 1: Create a File</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1">
                          <div className="text-zinc-500">❯ Create a Python script that calculates fibonacci numbers</div>
                          <div className="text-zinc-400 mt-2">● write_file #1</div>
                          <div className="text-zinc-400">└ ✓ Created fibonacci.py (234 bytes)</div>
                          <div className="text-white mt-2">I've created fibonacci.py with a function that calculates...</div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Example 2: Read and Modify</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1">
                          <div className="text-zinc-500">❯ Add error handling to fibonacci.py</div>
                          <div className="text-zinc-400 mt-2">● read_file #2</div>
                          <div className="text-zinc-400">└ ✓ Read 15 lines</div>
                          <div className="text-zinc-400 mt-2">● edit_file #3</div>
                          <div className="text-zinc-400">└ ✓ Modified fibonacci.py (2 replacements)</div>
                          <div className="text-white mt-2">I've added try-except blocks to handle invalid inputs...</div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Example 3: Search and Analyze</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1">
                          <div className="text-zinc-500">❯ Find all TODO comments in this project</div>
                          <div className="text-zinc-400 mt-2">● grep #4</div>
                          <div className="text-zinc-400">└ ✓ Found 3 matches in 2 files</div>
                          <div className="text-white mt-2">I found 3 TODO items: 1 in fibonacci.py, 2 in utils.py...</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 5: Understanding Tool Outputs */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">5. Understanding Tool Outputs</h3>
                    <p className="text-sm text-zinc-400 mb-3">Codentis shows tool executions in a collapsible format. Here's what you'll see:</p>

                    <div className="bg-black/50 p-3 rounded-lg text-sm space-y-2 mb-3">
                      <div className="text-zinc-400">● <span className="text-cyan-400">tool_name</span> <span className="text-zinc-500">#ID</span></div>
                      <div className="text-zinc-400 ml-2">└ ✓ Success message</div>
                    </div>

                    <div className="space-y-2 text-sm text-zinc-400">
                      <p><strong className="text-zinc-300">Tool Output Controls:</strong></p>
                      <ul className="space-y-1 ml-4">
                        <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">/e #ID</code> - Expand a specific tool output to see full details</li>
                        <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">/list</code> - Show all available tools and their descriptions</li>
                        <li>• Tool outputs are automatically collapsed to keep your terminal clean</li>
                      </ul>
                    </div>
                  </div>

                  {/* Step 6: Interactive Commands */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">6. Interactive Commands</h3>
                    <p className="text-sm text-zinc-400 mb-3">While chatting with Codentis, you can use these special commands:</p>

                    <div className="space-y-3">
                      <div className="border-l-2 border-cyan-400/30 pl-3">
                        <code className="text-cyan-300 bg-black/50 px-2 py-1 rounded text-sm">/e &lt;id&gt;</code>
                        <p className="text-sm text-zinc-400 mt-1">Expand tool output by ID to see full content</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm mt-2">
                          <div className="text-white">/e 3</div>
                        </div>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-3">
                        <code className="text-cyan-300 bg-black/50 px-2 py-1 rounded text-sm">/list</code>
                        <p className="text-sm text-zinc-400 mt-1">Show all available tools with descriptions</p>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-3">
                        <code className="text-cyan-300 bg-black/50 px-2 py-1 rounded text-sm">/clear</code>
                        <p className="text-sm text-zinc-400 mt-1">Clear the conversation history</p>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-3">
                        <code className="text-cyan-300 bg-black/50 px-2 py-1 rounded text-sm">/exit</code>
                        <p className="text-sm text-zinc-400 mt-1">Exit the chat session</p>
                      </div>
                    </div>
                  </div>

                  {/* Common Use Cases */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-cyan-400">Common Use Cases to Try</h3>
                    <p className="text-sm text-zinc-400 mb-3">Here are some practical tasks to get familiar with Codentis:</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">File Operations</p>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• "Create a README.md for this project"</li>
                          <li>• "List all Python files in this directory"</li>
                          <li>• "Read and summarize config.json"</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Code Generation</p>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• "Create a REST API with Flask"</li>
                          <li>• "Write unit tests for my functions"</li>
                          <li>• "Generate a .gitignore for Node.js"</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Code Analysis</p>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• "Find all functions in main.py"</li>
                          <li>• "Search for security vulnerabilities"</li>
                          <li>• "Explain how this code works"</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Project Tasks</p>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• "Run npm install"</li>
                          <li>• "Find all TODO comments"</li>
                          <li>• "Search for 'deprecated' in docs"</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Tips for Success */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Tips for Success</h3>

                    <div className="space-y-3">
                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Be Specific</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Instead of "fix the code", say "fix the syntax error on line 15 in app.py"</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Use Natural Language</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Talk to Codentis like a colleague: "Can you add error handling to the login function?"</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Review Changes</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Always review code changes before committing. Use <code className="text-cyan-300 bg-black/50 px-1 rounded">/e #ID</code> to see full diffs</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Iterate and Refine</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">If the result isn't perfect, ask for adjustments: "Make it more concise" or "Add comments"</p>
                      </div>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-cyan-400">Next Steps</h3>
                    <p className="text-sm text-zinc-400 mb-3">Now that you're up and running, explore more features:</p>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setActiveSection("tools")}
                        className="px-4 py-2 text-sm bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-all"
                      >
                        Explore All Tools
                      </button>
                      <button
                        onClick={() => setActiveSection("ai-providers")}
                        className="px-4 py-2 text-sm border border-white/[0.1] hover:border-cyan-500/50 text-zinc-300 hover:text-white font-semibold rounded-lg transition-all"
                      >
                        Learn About AI Providers
                      </button>
                      <button
                        onClick={() => setActiveSection("commands")}
                        className="px-4 py-2 text-sm border border-white/[0.1] hover:border-cyan-500/50 text-zinc-300 hover:text-white font-semibold rounded-lg transition-all"
                      >
                        View All Commands
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Configuration */}
            {activeSection === "configuration" && (
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-cyan-400/80">Core Concepts</span>
                  <h1 className="text-xl sm:text-3xl font-semibold mt-3 mb-4">Configuration</h1>
                  <p className="text-[13px] sm:text-sm text-zinc-400">
                    Codentis uses a flexible configuration system that allows both user-level and project-level settings. Learn how to manage your configuration, switch providers, and customize your experience.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Configuration Files */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Configuration Files</h3>

                    <div className="space-y-4">
                      <div className="p-4 border border-cyan-500/20 bg-cyan-500/5 rounded-lg">
                        <div className="flex items-start gap-3">
                          <span className="text-cyan-400 text-xl">📁</span>
                          <div className="flex-1">
                            <code className="text-cyan-300 bg-black/50 px-2 py-1 rounded text-sm">~/.codentis/config.json</code>
                            <p className="text-sm text-zinc-400 mt-2"><strong className="text-zinc-300">User-Level Configuration</strong></p>
                            <p className="text-sm text-zinc-400 mt-1">Global settings that apply to all projects. Stores your API keys, default model, and preferences.</p>
                            <div className="mt-3 space-y-1 text-sm text-zinc-400">
                              <p><strong className="text-zinc-300">Location:</strong></p>
                              <ul className="ml-4 space-y-1">
                                <li>• Windows: <code className="text-cyan-300 bg-black/50 px-1 rounded">%USERPROFILE%\.codentis\config.json</code></li>
                                <li>• macOS/Linux: <code className="text-cyan-300 bg-black/50 px-1 rounded">~/.codentis/config.json</code></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-white/[0.05] rounded-lg">
                        <div className="flex items-start gap-3">
                          <span className="text-cyan-400 text-xl">📄</span>
                          <div className="flex-1">
                            <code className="text-cyan-300 bg-black/50 px-2 py-1 rounded text-sm">.agent/codentis.toml</code>
                            <p className="text-sm text-zinc-400 mt-2"><strong className="text-zinc-300">Project-Level Configuration</strong></p>
                            <p className="text-sm text-zinc-400 mt-1">Project-specific settings that override user-level config. Useful for team projects with shared settings.</p>
                            <div className="mt-3 space-y-1 text-sm text-zinc-400">
                              <p><strong className="text-zinc-300">Location:</strong> In your project root directory</p>
                              <p><strong className="text-zinc-300">Use case:</strong> Different model per project, custom prompts, project-specific rules</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Configuration Hierarchy */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Configuration Hierarchy</h3>
                    <p className="text-sm text-zinc-400 mb-3">When both user and project configs exist, settings are merged with this priority:</p>

                    <div className="bg-black/50 p-4 rounded-lg space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-cyan-400 font-mono text-sm">1.</span>
                        <span className="text-sm text-zinc-400">Project config (<code className="text-cyan-300 bg-black/50 px-1 rounded">.agent/codentis.toml</code>) - Highest priority</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-cyan-400 font-mono text-sm">2.</span>
                        <span className="text-sm text-zinc-400">User config (<code className="text-cyan-300 bg-black/50 px-1 rounded">~/.codentis/config.json</code>) - Fallback</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-cyan-400 font-mono text-sm">3.</span>
                        <span className="text-sm text-zinc-400">Default values - Used if not specified</span>
                      </div>
                    </div>

                    <div className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded mt-4">
                      <p className="text-sm font-semibold text-yellow-400 mb-1">💡 Tip</p>
                      <p className="text-[13px] sm:text-sm text-zinc-400">Use user config for personal API keys, and project config for team-shared settings like model choice or custom instructions.</p>
                    </div>
                  </div>

                  {/* Configuration Commands */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Configuration Commands</h3>

                    <div className="space-y-4">
                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">codentis config</h4>
                        <p className="text-sm text-zinc-400 mb-2">Run the interactive setup wizard to configure or reconfigure Codentis.</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1">
                          <div className="text-white">$ codentis config</div>
                          <div className="text-zinc-400 mt-2"># Launches interactive wizard</div>
                          <div className="text-zinc-400"># Prompts for provider, API key, and model selection</div>
                        </div>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">codentis config --show</h4>
                        <p className="text-sm text-zinc-400 mb-2">Display your current configuration without modifying it.</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1">
                          <div className="text-white">$ codentis config --show</div>
                          <div className="text-zinc-400 mt-2">Provider: openai</div>
                          <div className="text-zinc-400">Model: gpt-4o</div>
                          <div className="text-zinc-400">API Endpoint: https://api.openai.com/v1</div>
                          <div className="text-zinc-400">Config File: ~/.codentis/config.json</div>
                        </div>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">codentis config --reset</h4>
                        <p className="text-sm text-zinc-400 mb-2">Delete current configuration and start fresh with the setup wizard.</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1">
                          <div className="text-white">$ codentis config --reset</div>
                          <div className="text-yellow-400 mt-2">⚠ This will delete your current configuration</div>
                          <div className="text-yellow-400">Continue? (yes/no): yes</div>
                          <div className="text-cyan-400 mt-2">✓ Configuration reset. Running setup wizard...</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Configuration Options */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Available Configuration Options</h3>

                    <div className="space-y-3">
                      <div className="bg-white/5 p-3 rounded">
                        <p className="text-sm font-semibold text-cyan-400 mb-1">provider</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">AI provider to use: <code className="text-cyan-300 bg-black/50 px-1 rounded">openai</code>, <code className="text-cyan-300 bg-black/50 px-1 rounded">anthropic</code>, <code className="text-cyan-300 bg-black/50 px-1 rounded">openrouter</code>, or <code className="text-cyan-300 bg-black/50 px-1 rounded">custom</code></p>
                      </div>

                      <div className="bg-white/5 p-3 rounded">
                        <p className="text-sm font-semibold text-cyan-400 mb-1">api_key</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Your API key for the selected provider. Stored securely in your config file.</p>
                      </div>

                      <div className="bg-white/5 p-3 rounded">
                        <p className="text-sm font-semibold text-cyan-400 mb-1">model</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Model to use: <code className="text-cyan-300 bg-black/50 px-1 rounded">gpt-4o</code>, <code className="text-cyan-300 bg-black/50 px-1 rounded">claude-3-5-sonnet</code>, etc.</p>
                      </div>

                      <div className="bg-white/5 p-3 rounded">
                        <p className="text-sm font-semibold text-cyan-400 mb-1">api_endpoint</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">API endpoint URL. Auto-set for standard providers, customizable for local LLMs.</p>
                      </div>

                      <div className="bg-white/5 p-3 rounded">
                        <p className="text-sm font-semibold text-cyan-400 mb-1">temperature</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Controls randomness (0.0-1.0). Lower = more focused, Higher = more creative. Default: 0.7</p>
                      </div>

                      <div className="bg-white/5 p-3 rounded">
                        <p className="text-sm font-semibold text-cyan-400 mb-1">max_tokens</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Maximum response length. Default varies by model (typically 4096-8192).</p>
                      </div>
                    </div>
                  </div>

                  {/* Manual Configuration */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Manual Configuration</h3>
                    <p className="text-sm text-zinc-400 mb-3">You can manually edit configuration files if needed. Here's an example:</p>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">User Config Example (~/.codentis/config.json)</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <pre className="text-zinc-400">{`{
  "provider": "openai",
  "api_key": "sk-...",
  "model": "gpt-4o",
  "api_endpoint": "https://api.openai.com/v1",
  "temperature": 0.7,
  "max_tokens": 4096
}`}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Project Config Example (.agent/codentis.toml)</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <pre className="text-zinc-400">{`[codentis]
model = "gpt-4o"
temperature = 0.5

[codentis.custom_instructions]
style = "Use TypeScript for all code examples"
testing = "Always include unit tests"`}</pre>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded mt-4">
                      <p className="text-sm font-semibold text-yellow-400 mb-1">⚠ Warning</p>
                      <p className="text-[13px] sm:text-sm text-zinc-400">Manual edits must follow valid JSON/TOML syntax. Invalid files will cause errors. Use <code className="text-cyan-300 bg-black/50 px-1 rounded">codentis config</code> for safer configuration.</p>
                    </div>
                  </div>

                  {/* Common Configuration Tasks */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-4 text-cyan-400">Common Configuration Tasks</h3>

                    <div className="space-y-4">
                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">Switching AI Providers</h4>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1">
                          <div className="text-white">$ codentis config</div>
                          <div className="text-zinc-400 mt-1"># Select new provider from menu</div>
                          <div className="text-zinc-400"># Enter new API key</div>
                          <div className="text-zinc-400"># Choose model</div>
                        </div>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">Changing Models</h4>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1">
                          <div className="text-white">$ codentis config</div>
                          <div className="text-zinc-400 mt-1"># Keep same provider</div>
                          <div className="text-zinc-400"># Select different model from list</div>
                        </div>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">Using Local LLMs</h4>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1">
                          <div className="text-white">$ codentis config</div>
                          <div className="text-zinc-400 mt-1"># Select "Custom" provider</div>
                          <div className="text-zinc-400"># Enter: http://localhost:11434/v1</div>
                          <div className="text-zinc-400"># API key: ollama</div>
                          <div className="text-zinc-400"># Model: llama2 (or your installed model)</div>
                        </div>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">Fixing Authentication Errors</h4>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1">
                          <div className="text-white">$ codentis config --reset</div>
                          <div className="text-zinc-400 mt-1"># Clears old config</div>
                          <div className="text-zinc-400"># Re-enter correct API key</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Environment Variables */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Environment Variables</h3>
                    <p className="text-sm text-zinc-400 mb-3">You can override config settings using environment variables:</p>

                    <div className="space-y-3">
                      <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1">
                        <div className="text-zinc-500"># Override API key</div>
                        <div className="text-white">export CODENTIS_API_KEY="sk-..."</div>
                        <div className="text-zinc-500 mt-2"># Override model</div>
                        <div className="text-white">export CODENTIS_MODEL="gpt-4-turbo"</div>
                        <div className="text-zinc-500 mt-2"># Override endpoint</div>
                        <div className="text-white">export CODENTIS_API_ENDPOINT="https://custom.api.com/v1"</div>
                      </div>

                      <p className="text-[13px] sm:text-sm text-zinc-400"><strong className="text-zinc-300">Use case:</strong> Temporary overrides, CI/CD pipelines, or testing different configurations without modifying files.</p>
                    </div>
                  </div>

                  {/* Troubleshooting */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Configuration Troubleshooting</h3>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-red-400 mb-1">Config file not found</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Run <code className="text-cyan-300 bg-black/50 px-1 rounded">codentis config</code> to create a new configuration file.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-red-400 mb-1">Invalid JSON/TOML syntax</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Use <code className="text-cyan-300 bg-black/50 px-1 rounded">codentis config --reset</code> to recreate the file, or validate your manual edits with a JSON/TOML validator.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-red-400 mb-1">API key not working</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Verify your API key is correct and has proper permissions. Run <code className="text-cyan-300 bg-black/50 px-1 rounded">codentis doctor</code> to test connectivity.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-red-400 mb-1">Project config not loading</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Ensure <code className="text-cyan-300 bg-black/50 px-1 rounded">.agent/codentis.toml</code> is in your project root and has valid TOML syntax.</p>
                      </div>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-cyan-400">Next Steps</h3>
                    <p className="text-sm text-zinc-400 mb-4">Now that you understand configuration, explore related topics:</p>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setActiveSection("ai-providers")}
                        className="px-4 py-2 text-sm bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-all"
                      >
                        Learn About AI Providers
                      </button>
                      <button
                        onClick={() => setActiveSection("workspace-trust")}
                        className="px-4 py-2 text-sm border border-white/[0.1] hover:border-cyan-500/50 text-zinc-300 hover:text-white font-semibold rounded-lg transition-all"
                      >
                        Workspace Trust
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* System Requirements */}
            {activeSection === "system-requirements" && (
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-cyan-400/80">Getting Started</span>
                  <h1 className="text-xl sm:text-3xl font-semibold mt-3 mb-4">System Requirements</h1>
                  <p className="text-[13px] sm:text-sm text-zinc-400">
                    Codentis is designed to run on modern operating systems with minimal hardware requirements. Check the specifications below to ensure your system is compatible.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Operating Systems */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Supported Operating Systems</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-4 border border-white/[0.05] rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <RiMicrosoftFill className="text-cyan-400 text-2xl" />
                          <h4 className="text-base font-semibold">Windows</h4>
                        </div>
                        <ul className="text-sm text-zinc-400 space-y-2">
                          <li><strong className="text-zinc-300">Supported:</strong> Windows 10, Windows 11</li>
                          <li><strong className="text-zinc-300">Architecture:</strong> 64-bit (x64) only</li>
                          <li><strong className="text-zinc-300">Terminal:</strong> CMD, PowerShell, Git Bash, Windows Terminal</li>
                          <li><strong className="text-zinc-300">Note:</strong> Windows 7/8 not supported</li>
                        </ul>
                      </div>

                      <div className="p-4 border border-white/[0.05] rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <RiAppleFill className="text-cyan-400 text-2xl" />
                          <h4 className="text-base font-semibold">macOS</h4>
                        </div>
                        <ul className="text-sm text-zinc-400 space-y-2">
                          <li><strong className="text-zinc-300">Supported:</strong> macOS 11 (Big Sur) or later</li>
                          <li><strong className="text-zinc-300">Architecture:</strong> Apple Silicon (M1/M2/M3) and Intel</li>
                          <li><strong className="text-zinc-300">Terminal:</strong> Terminal.app, iTerm2, or any bash/zsh shell</li>
                          <li><strong className="text-zinc-300">Note:</strong> Separate installers for each architecture</li>
                        </ul>
                      </div>

                      <div className="p-4 border border-white/[0.05] rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <RiUbuntuLine className="text-cyan-400 text-2xl" />
                          <h4 className="text-base font-semibold">Linux</h4>
                        </div>
                        <ul className="text-sm text-zinc-400 space-y-2">
                          <li><strong className="text-zinc-300">Supported:</strong> Ubuntu 20.04+, Debian 11+, Fedora, Arch</li>
                          <li><strong className="text-zinc-300">Architecture:</strong> 64-bit (x86_64)</li>
                          <li><strong className="text-zinc-300">Terminal:</strong> Any bash, zsh, or fish shell</li>
                          <li><strong className="text-zinc-300">Note:</strong> .deb package for Debian-based distros</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Hardware Requirements */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Hardware Requirements</h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-white/[0.05] rounded-lg">
                          <h4 className="text-sm font-semibold text-cyan-400 mb-2">Minimum Requirements</h4>
                          <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                            <li>• <strong>CPU:</strong> Any modern processor (2+ cores)</li>
                            <li>• <strong>RAM:</strong> 4 GB</li>
                            <li>• <strong>Storage:</strong> 100 MB free space</li>
                            <li>• <strong>Display:</strong> Any resolution</li>
                          </ul>
                          <p className="text-sm text-zinc-400 mt-3 italic">Suitable for basic usage and small projects</p>
                        </div>

                        <div className="p-4 border border-cyan-500/20 bg-cyan-500/5 rounded-lg">
                          <h4 className="text-sm font-semibold text-cyan-400 mb-2">Recommended Requirements</h4>
                          <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                            <li>• <strong>CPU:</strong> Multi-core processor (4+ cores)</li>
                            <li>• <strong>RAM:</strong> 8 GB or more</li>
                            <li>• <strong>Storage:</strong> 500 MB free space (for logs and cache)</li>
                            <li>• <strong>Display:</strong> 1920x1080 or higher</li>
                          </ul>
                          <p className="text-sm text-zinc-400 mt-3 italic">Optimal for large projects and heavy usage</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Network Requirements */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Network Requirements</h3>

                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <span className="text-cyan-400 flex-shrink-0">✓</span>
                        <div>
                          <p className="text-sm font-semibold text-zinc-300">Internet Connection Required</p>
                          <p className="text-[13px] sm:text-sm text-zinc-400">Codentis requires an active internet connection to communicate with AI providers (OpenAI, Anthropic, etc.)</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="text-cyan-400 flex-shrink-0">✓</span>
                        <div>
                          <p className="text-sm font-semibold text-zinc-300">Bandwidth</p>
                          <p className="text-[13px] sm:text-sm text-zinc-400">Minimum 1 Mbps recommended. Faster connections provide better response times.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="text-cyan-400 flex-shrink-0">✓</span>
                        <div>
                          <p className="text-sm font-semibold text-zinc-300">Firewall & Proxy</p>
                          <p className="text-[13px] sm:text-sm text-zinc-400">Ensure your firewall allows HTTPS connections to AI provider APIs. Proxy configuration may be needed in corporate environments.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="text-cyan-400 flex-shrink-0">✓</span>
                        <div>
                          <p className="text-sm font-semibold text-zinc-300">Offline Mode</p>
                          <p className="text-[13px] sm:text-sm text-zinc-400">Local LLMs (via Ollama) can work offline, but initial setup requires internet for model downloads.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Software Dependencies */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Software Dependencies</h3>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">Included in Installers</h4>
                        <p className="text-sm text-zinc-400 mb-2">The following are bundled with Codentis installers - no separate installation needed:</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Python runtime (3.10+)</li>
                          <li>• All required Python packages</li>
                          <li>• Core dependencies and libraries</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">Optional Dependencies</h4>
                        <p className="text-sm text-zinc-400 mb-2">These are optional and only needed for specific features:</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• <strong>Git:</strong> For version control operations (recommended)</li>
                          <li>• <strong>Node.js/npm:</strong> If working with JavaScript/TypeScript projects</li>
                          <li>• <strong>Docker:</strong> If working with containerized applications</li>
                          <li>• <strong>Ollama:</strong> For running local LLMs offline</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* AI Provider Requirements */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-4 text-cyan-400">AI Provider Requirements</h3>

                    <div className="space-y-3">
                      <p className="text-[13px] sm:text-sm text-zinc-400">To use Codentis, you need an account with at least one AI provider:</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-semibold text-zinc-300 mb-2">Cloud Providers (Recommended)</h4>
                          <ul className="text-sm text-zinc-400 space-y-2">
                            <li className="flex items-center gap-2">
                              <RiOpenaiFill className="text-cyan-400" />
                              <span><strong>OpenAI:</strong> API key from platform.openai.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <RiClaudeLine className="text-cyan-400" />
                              <span><strong>Anthropic:</strong> API key from console.anthropic.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <RiGitBranchFill className="text-cyan-400" />
                              <span><strong>OpenRouter:</strong> API key from openrouter.ai</span>
                            </li>
                          </ul>
                          <p className="text-sm text-zinc-400 mt-2 italic">Requires payment method for API usage</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-zinc-300 mb-2">Local Options (Free)</h4>
                          <ul className="text-sm text-zinc-400 space-y-2">
                            <li className="flex items-center gap-2">
                              <RiGeminiLine className="text-cyan-400" />
                              <span><strong>Ollama:</strong> Run models locally (free)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <RiServerLine className="text-cyan-400" />
                              <span><strong>LM Studio:</strong> Local model interface</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <RiServerLine className="text-cyan-400" />
                              <span><strong>Custom:</strong> Any OpenAI-compatible endpoint</span>
                            </li>
                          </ul>
                          <p className="text-sm text-zinc-400 mt-2 italic">No API costs, but requires more RAM (8-16 GB)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Considerations */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Performance Considerations</h3>

                    <div className="space-y-3">
                      <div className="bg-white/5 p-3 rounded">
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Response Time</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Depends on your internet speed and AI provider. Typically 2-10 seconds for most requests.</p>
                      </div>

                      <div className="bg-white/5 p-3 rounded">
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Large Files</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Files over 10,000 lines may take longer to process. Consider breaking them into smaller modules.</p>
                      </div>

                      <div className="bg-white/5 p-3 rounded">
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Concurrent Operations</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Codentis processes one request at a time. Multiple terminal windows can run independently.</p>
                      </div>

                      <div className="bg-white/5 p-3 rounded">
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Local LLMs</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Running models locally requires significantly more RAM (8-16 GB) and is slower than cloud APIs.</p>
                      </div>
                    </div>
                  </div>

                  {/* Compatibility Notes */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Compatibility Notes</h3>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Works With</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• All major code editors (VS Code, Sublime, Vim, etc.)</li>
                          <li>• Git and other version control systems</li>
                          <li>• Docker and containerized environments</li>
                          <li>• CI/CD pipelines (GitHub Actions, GitLab CI, etc.)</li>
                          <li>• SSH and remote development</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-yellow-400 mb-1">⚠ Limitations</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Cannot modify files outside trusted workspaces</li>
                          <li>• Requires explicit permission for shell write operations</li>
                          <li>• Binary files are not processed (images, videos, etc.)</li>
                          <li>• Very large repositories (100k+ files) may be slow</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-cyan-400">Ready to Install?</h3>
                    <p className="text-sm text-zinc-400 mb-4">If your system meets the requirements above, you're ready to install Codentis!</p>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setActiveSection("installation")}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-all"
                      >
                        Install Codentis
                      </button>
                      <button
                        onClick={() => setActiveSection("ai-providers")}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm border border-white/[0.1] hover:border-cyan-500/50 text-zinc-300 hover:text-white font-semibold rounded-lg transition-all"
                      >
                        Choose AI Provider
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Providers */}
            {activeSection === "ai-providers" && (
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-cyan-400/80">Core Concepts</span>
                  <h1 className="text-xl sm:text-3xl font-semibold mt-3 mb-4">AI Providers</h1>
                  <p className="text-[13px] sm:text-sm text-zinc-400">
                    Codentis supports multiple AI providers. Choose the one that works best for your needs, budget, and use case.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* OpenAI */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <RiOpenaiFill className="text-cyan-400 text-2xl" />
                      <h3 className="text-base font-semibold text-cyan-400">OpenAI</h3>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">Official OpenAI API with the latest GPT models. Best for cutting-edge performance and reliability.</p>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Available Models</p>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">gpt-5.2</code> - Flagship model for advanced reasoning, coding, and complex problem solving (recommended)</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">gpt-5.3-codex</code> - Developer-focused model optimized for code generation and debugging</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">o3</code> - Reasoning model for multi-step problems, math, and technical analysis</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">o3-mini</code> - Faster reasoning model for quick problem solving</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">gpt-4o</code> - Previous generation, still highly capable</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Setup</p>
                        <ol className="text-sm text-zinc-400 space-y-1">
                          <li>1. Go to <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">platform.openai.com/api-keys</a></li>
                          <li>2. Create a new API key</li>
                          <li>3. Run <code className="text-cyan-300 bg-black/50 px-1 rounded">codentis config</code> and select OpenAI</li>
                          <li>4. Paste your API key when prompted</li>
                        </ol>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Pricing</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Pay-as-you-go. GPT-5.2: ~$0.03/1K input tokens, $0.06/1K output tokens. Check <a href="https://openai.com/pricing" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">openai.com/pricing</a> for current rates.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Best For</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Advanced reasoning, complex coding tasks, research applications, and when you need cutting-edge capabilities.</p>
                      </div>
                    </div>
                  </div>

                  {/* Anthropic Claude */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <RiClaudeLine className="text-cyan-400 text-2xl" />
                      <h3 className="text-base font-semibold text-cyan-400">Anthropic (Claude)</h3>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">Official Anthropic API with Claude models. Known for safety, reasoning, and long context windows.</p>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Available Models</p>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">claude-opus-4.6</code> - Highest-capability model for deep reasoning and complex enterprise tasks</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">claude-sonnet-4.6</code> - Balanced model for coding assistants and production apps (recommended)</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">claude-4.5-agentic</code> - Designed for autonomous multi-step workflows and agent tasks</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">claude-3-5-sonnet</code> - Previous generation, still excellent</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Setup</p>
                        <ol className="text-sm text-zinc-400 space-y-1">
                          <li>1. Go to <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">console.anthropic.com</a></li>
                          <li>2. Create an account and add billing</li>
                          <li>3. Generate an API key from the dashboard</li>
                          <li>4. Run <code className="text-cyan-300 bg-black/50 px-1 rounded">codentis config</code> and select Anthropic</li>
                          <li>5. Paste your API key when prompted</li>
                        </ol>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Pricing</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Pay-as-you-go. Claude Sonnet 4.6: ~$0.003/1K input tokens, $0.015/1K output tokens. Very competitive pricing with strong reasoning.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Best For</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Production applications, coding assistants, long documents, detailed analysis, and autonomous agent workflows. Excellent balance of performance and cost.</p>
                      </div>
                    </div>
                  </div>

                  {/* OpenRouter */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <RiGitBranchFill className="text-cyan-400 text-2xl" />
                      <h3 className="text-base font-semibold text-cyan-400">OpenRouter</h3>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">Multi-model API gateway that lets you access 100+ models through one API. Route requests between GPT, Claude, Gemini, DeepSeek, and more.</p>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Popular Models Available</p>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">openai/gpt-5.2</code> - OpenAI's latest flagship model</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">anthropic/claude-sonnet-4.6</code> - Anthropic's balanced model</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">google/gemini-3.1-pro</code> - Google's advanced model</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">deepseek/deepseek-v3</code> - Reasoning model with cheap inference</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">deepseek/deepseek-r1</code> - Advanced reasoning capabilities</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">meta-llama/llama-3.3-70b</code> - Open-source Llama model</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">mistralai/mixtral-8x22b</code> - Mixture-of-Experts architecture</li>
                          <li>• And 100+ more models from various providers</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Setup</p>
                        <ol className="text-sm text-zinc-400 space-y-1">
                          <li>1. Go to <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">openrouter.ai</a></li>
                          <li>2. Sign up and add billing</li>
                          <li>3. Get your API key from the dashboard</li>
                          <li>4. Run <code className="text-cyan-300 bg-black/50 px-1 rounded">codentis config</code> and select OpenRouter</li>
                          <li>5. Paste your API key and choose a model</li>
                        </ol>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Pricing</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Varies by model. Often cheaper than direct APIs. Shows pricing for each model before you use it. Free tier available for testing. DeepSeek models offer particularly cheap inference.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Best For</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Experimenting with different models, finding the best price-to-performance ratio, accessing niche models, and routing between providers.</p>
                      </div>
                    </div>
                  </div>

                  {/* Gemini */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <RiGeminiFill className="text-cyan-400 text-2xl" />
                      <h3 className="text-base font-semibold text-cyan-400">Google Gemini</h3>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">Google's advanced AI models with multimodal capabilities. Great for complex reasoning and long context understanding.</p>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Available Models</p>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">gemini-3.1-pro</code> - Most advanced model for reasoning, coding, and large-context analysis (recommended)</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">gemini-3-flash</code> - Faster and cheaper, optimized for real-time chat and high-volume inference</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">gemini-2.5-pro</code> - Reasoning-focused model that dynamically allocates compute for complex problems</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">gemini-1.5-pro</code> - Previous generation, still highly capable</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Setup</p>
                        <ol className="text-sm text-zinc-400 space-y-1">
                          <li>1. Go to <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Google AI Studio</a></li>
                          <li>2. Create a new API key</li>
                          <li>3. Run <code className="text-cyan-300 bg-black/50 px-1 rounded">codentis config</code> and select Custom</li>
                          <li>4. Enter endpoint: <code className="text-cyan-300 bg-black/50 px-1 rounded">https://generativelanguage.googleapis.com/v1beta</code></li>
                          <li>5. Paste your API key when prompted</li>
                        </ol>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Pricing</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Free tier available with generous limits. Gemini 3.1 Pro: ~$0.00125/1K input tokens, $0.005/1K output tokens. Very cost-effective for high-quality responses.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Best For</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Long context tasks, multimodal understanding, real-time applications, and cost-effective high-quality responses.</p>
                      </div>
                    </div>
                  </div>

                  {/* Ollama */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <RiGeminiLine className="text-cyan-400 text-2xl" />
                      <h3 className="text-base font-semibold text-cyan-400">Ollama (Local LLMs)</h3>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">Run open-source models locally on your machine. Perfect for privacy, offline usage, and custom deployments.</p>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Popular Models</p>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• <strong>Llama 3</strong> - Meta's latest open model (8B, 70B variants)</li>
                          <li>• <strong>Mistral</strong> - High-performance 7B model</li>
                          <li>• <strong>CodeLlama</strong> - Specialized for coding tasks</li>
                          <li>• <strong>Phi-3</strong> - Microsoft's efficient small model</li>
                          <li>• <strong>Gemma</strong> - Google's open model</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Setup</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm space-y-1">
                          <div className="text-zinc-500"># 1. Install Ollama from ollama.ai</div>
                          <div className="text-white">$ ollama pull llama3</div>
                          <div className="text-zinc-500 mt-2"># 2. Start Ollama (runs automatically on install)</div>
                          <div className="text-white">$ ollama serve</div>
                          <div className="text-zinc-500 mt-2"># 3. Configure Codentis</div>
                          <div className="text-white">$ codentis config</div>
                          <div className="text-zinc-500 mt-2"># 4. Select "Custom" and enter:</div>
                          <div className="text-cyan-300">API Endpoint: http://localhost:11434/v1</div>
                          <div className="text-cyan-300">API Key: ollama</div>
                          <div className="text-cyan-300">Model: llama3</div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Other Compatible Platforms</p>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• <strong>LM Studio</strong> - User-friendly GUI for local models</li>
                          <li>• <strong>vLLM</strong> - High-performance inference server</li>
                          <li>• <strong>Text Generation WebUI</strong> - Feature-rich interface</li>
                          <li>• <strong>LocalAI</strong> - OpenAI-compatible local API</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Pricing</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Completely free. No API costs, no usage limits. Only requires local compute resources.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">System Requirements</p>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• <strong>RAM:</strong> 8 GB minimum (16 GB recommended for larger models)</li>
                          <li>• <strong>Storage:</strong> 4-40 GB per model depending on size</li>
                          <li>• <strong>GPU:</strong> Optional but significantly faster (NVIDIA/AMD/Apple Silicon)</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-1">Best For</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Privacy-sensitive work, offline development, learning AI, and avoiding API costs.</p>
                      </div>

                      <div className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-yellow-400 mb-1">⚠ Performance Note</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Local models are slower than cloud APIs and may produce lower quality responses. Best for non-critical tasks or when privacy is paramount.</p>
                      </div>
                    </div>
                  </div>

                  {/* Comparison */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Quick Comparison</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-zinc-400">
                        <thead>
                          <tr className="border-b border-white/[0.05]">
                            <th className="text-left py-2 px-2 text-zinc-300">Provider</th>
                            <th className="text-left py-2 px-2 text-zinc-300">Speed</th>
                            <th className="text-left py-2 px-2 text-zinc-300">Cost</th>
                            <th className="text-left py-2 px-2 text-zinc-300">Best For</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-white/[0.05]">
                            <td className="py-2 px-2 text-cyan-400">Claude</td>
                            <td className="py-2 px-2">Fast</td>
                            <td className="py-2 px-2">Low</td>
                            <td className="py-2 px-2">Production</td>
                          </tr>
                          <tr className="border-b border-white/[0.05]">
                            <td className="py-2 px-2 text-cyan-400">OpenAI</td>
                            <td className="py-2 px-2">Fast</td>
                            <td className="py-2 px-2">Medium</td>
                            <td className="py-2 px-2">Advanced Reasoning</td>
                          </tr>
                          <tr className="border-b border-white/[0.05]">
                            <td className="py-2 px-2 text-cyan-400">Gemini</td>
                            <td className="py-2 px-2">Fast</td>
                            <td className="py-2 px-2">Very Low</td>
                            <td className="py-2 px-2">Long Context</td>
                          </tr>
                          <tr className="border-b border-white/[0.05]">
                            <td className="py-2 px-2 text-cyan-400">OpenRouter</td>
                            <td className="py-2 px-2">Varies</td>
                            <td className="py-2 px-2">Low-Medium</td>
                            <td className="py-2 px-2">Experimentation</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-2 text-cyan-400">Ollama</td>
                            <td className="py-2 px-2">Slow</td>
                            <td className="py-2 px-2">Free</td>
                            <td className="py-2 px-2">Privacy</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-sm text-zinc-400 mt-3 italic">Claude Opus 4.6 is recommended for most production use cases due to its excellent balance of performance, cost, and reliability.</p>
                  </div>

                  {/* Switching Providers */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Switching Providers</h3>
                    <p className="text-sm text-zinc-400 mb-3">You can easily switch between providers at any time:</p>
                    <div className="bg-black/50 p-3 rounded font-mono text-sm space-y-1">
                      <div className="text-white">$ codentis config</div>
                      <div className="text-zinc-400 mt-2"># Follow the wizard to select a new provider</div>
                      <div className="text-white mt-2">$ codentis config --show</div>
                      <div className="text-zinc-400 mt-1"># Verify your new provider is set</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Workspace Trust */}
            {activeSection === "workspace-trust" && (
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-cyan-400/80">Core Concepts</span>
                  <h1 className="text-xl sm:text-3xl font-semibold mt-3 mb-4">Workspace Trust</h1>
                  <p className="text-[13px] sm:text-sm text-zinc-400">
                    Codentis requires explicit trust before accessing files in a directory. This security feature prevents accidental modifications to important files.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Why Trust */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Why Workspace Trust?</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Workspace trust is a security mechanism that prevents Codentis from accidentally modifying files in directories you haven't explicitly approved. This is especially important when:
                    </p>
                    <ul className="space-y-2 text-sm text-zinc-400">
                      <li className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>Working with unfamiliar codebases or downloaded projects</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>Protecting critical production code from unintended changes</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>Ensuring you review what Codentis will modify before it happens</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>Maintaining control over your file system and project structure</span>
                      </li>
                    </ul>
                  </div>

                  {/* What Codentis Can Do */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">What Codentis Can Do in Trusted Workspaces</h3>
                    <p className="text-sm text-zinc-400 mb-3">Once a workspace is trusted, Codentis can:</p>
                    <ul className="space-y-2 text-sm text-zinc-400">
                      <li className="flex gap-2">
                        <span className="text-cyan-400">✓</span>
                        <span>Read files and directories without asking</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">✓</span>
                        <span>Create new files in the workspace</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">✓</span>
                        <span>Modify existing files</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">✓</span>
                        <span>Execute shell commands (with permission for write operations)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">✓</span>
                        <span>Search and analyze your code</span>
                      </li>
                    </ul>
                  </div>

                  {/* First-Time Access */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">First-Time Access Flow</h3>
                    <p className="text-sm text-zinc-400 mb-3">When you first use Codentis in a new directory:</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># First time in a directory</div>
                      <div className="text-white">$ codentis</div>
                      <div className="text-yellow-400 mt-2">⚠ This workspace is not trusted</div>
                      <div className="text-yellow-400">Trust this workspace? (yes/no)</div>
                      <div className="text-white mt-2">yes</div>
                      <div className="text-cyan-400 mt-2">✓ Workspace trusted. You can now use Codentis here.</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400">
                      You can also trust a workspace without starting Codentis using the trust command.
                    </p>
                  </div>

                  {/* Trust Commands */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Trust Commands Reference</h3>

                    <div className="space-y-4">
                      {/* trust add */}
                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">codentis trust add &lt;path&gt;</h4>
                        <p className="text-sm text-zinc-400 mb-2">Add a directory to your trusted workspaces list.</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm space-y-1">
                          <div className="text-white">$ codentis trust add .</div>
                          <div className="text-cyan-400 mt-1">✓ Added current directory to trusted workspaces</div>
                          <div className="text-white mt-2">$ codentis trust add /home/user/projects/myapp</div>
                          <div className="text-cyan-400 mt-1">✓ Added /home/user/projects/myapp to trusted workspaces</div>
                        </div>
                      </div>

                      {/* trust list */}
                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">codentis trust list</h4>
                        <p className="text-sm text-zinc-400 mb-2">Show all directories you've added to your trusted list.</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm space-y-1">
                          <div className="text-white">$ codentis trust list</div>
                          <div className="text-cyan-400 mt-1">Trusted workspaces:</div>
                          <div className="text-zinc-400 mt-1">• /home/user/projects/myapp</div>
                          <div className="text-zinc-400">• /home/user/projects/website</div>
                          <div className="text-zinc-400">• /home/user/learning</div>
                        </div>
                      </div>

                      {/* trust remove */}
                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">codentis trust remove &lt;path&gt;</h4>
                        <p className="text-sm text-zinc-400 mb-2">Remove a directory from your trusted workspaces list.</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm space-y-1">
                          <div className="text-white">$ codentis trust remove /home/user/learning</div>
                          <div className="text-cyan-400 mt-1">✓ Removed /home/user/learning from trusted workspaces</div>
                        </div>
                      </div>

                      {/* trust clear */}
                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">codentis trust clear</h4>
                        <p className="text-sm text-zinc-400 mb-2">Remove all directories from your trusted workspaces list.</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm space-y-1">
                          <div className="text-white">$ codentis trust clear</div>
                          <div className="text-yellow-400 mt-1">⚠ This will remove all trusted workspaces. Continue? (yes/no)</div>
                          <div className="text-white mt-1">yes</div>
                          <div className="text-cyan-400 mt-1">✓ All trusted workspaces cleared</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Best Practices */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Best Practices</h3>

                    <div className="space-y-3">
                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Do</p>
                        <ul className="space-y-1 text-sm text-zinc-400">
                          <li>• Trust your own projects and codebases you control</li>
                          <li>• Trust directories after reviewing what Codentis will do</li>
                          <li>• Use trust add for projects you work on regularly</li>
                          <li>• Review changes before committing to version control</li>
                        </ul>
                      </div>

                      <div className="bg-red-500/5 border border-red-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-red-400 mb-1">✗ Don't</p>
                        <ul className="space-y-1 text-sm text-zinc-400">
                          <li>• Trust directories you don't own or control</li>
                          <li>• Trust system directories like /usr, /etc, or C:\Windows</li>
                          <li>• Trust directories with critical production code without review</li>
                          <li>• Use trust clear unless you're resetting your setup</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Storage Locations */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Where Trust Data is Stored</h3>
                    <p className="text-sm text-zinc-400 mb-3">Your trusted workspaces list is stored in a local file on your computer:</p>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-1">Windows</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm text-zinc-400">
                          %APPDATA%\Codentis\trusted_workspaces.json
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-1">macOS</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm text-zinc-400">
                          ~/.local/share/codentis/trusted_workspaces.json
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-1">Linux</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm text-zinc-400">
                          ~/.local/share/codentis/trusted_workspaces.json
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-zinc-400 mt-3">
                      This file is only readable by your user account and is never shared or sent anywhere.
                    </p>
                  </div>

                  {/* Common Scenarios */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Common Scenarios</h3>

                    <div className="space-y-4">
                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">Scenario 1: Starting a New Project</h4>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm space-y-1">
                          <div className="text-white">$ mkdir my-project && cd my-project</div>
                          <div className="text-white mt-2">$ codentis</div>
                          <div className="text-yellow-400 mt-1">⚠ This workspace is not trusted</div>
                          <div className="text-yellow-400">Trust this workspace? (yes/no)</div>
                          <div className="text-white mt-1">yes</div>
                          <div className="text-cyan-400 mt-1">✓ Ready to help with your project!</div>
                        </div>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">Scenario 2: Reviewing Downloaded Code</h4>
                        <p className="text-sm text-zinc-400 mb-2">Before trusting a downloaded project, review it first:</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm space-y-1">
                          <div className="text-white">$ cd downloaded-project</div>
                          <div className="text-white mt-2">$ codentis chat "Show me the main files in this project"</div>
                          <div className="text-zinc-400 mt-1"># Review the output to understand the project</div>
                          <div className="text-white mt-2">$ codentis trust add .</div>
                          <div className="text-cyan-400 mt-1">✓ Now you can work with it safely</div>
                        </div>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">Scenario 3: Working on Multiple Projects</h4>
                        <p className="text-sm text-zinc-400 mb-2">Trust each project directory separately:</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm space-y-1">
                          <div className="text-white">$ codentis trust add ~/projects/app1</div>
                          <div className="text-white">$ codentis trust add ~/projects/app2</div>
                          <div className="text-white">$ codentis trust add ~/projects/website</div>
                          <div className="text-white mt-2">$ codentis trust list</div>
                          <div className="text-cyan-400 mt-1"># Shows all your trusted projects</div>
                        </div>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">Scenario 4: Revoking Access</h4>
                        <p className="text-sm text-zinc-400 mb-2">Remove trust from a project you no longer work on:</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm space-y-1">
                          <div className="text-white">$ codentis trust remove ~/projects/old-project</div>
                          <div className="text-cyan-400 mt-1">✓ Removed ~/projects/old-project from trusted workspaces</div>
                          <div className="text-zinc-400 mt-2"># Next time you use Codentis there, it will ask for trust again</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tools */}
            {activeSection === "tools" && (
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-cyan-400/80">Features</span>
                  <h1 className="text-xl sm:text-3xl font-semibold mt-3 mb-4">Built-in Tools</h1>
                  <p className="text-[13px] sm:text-sm text-zinc-400">
                    Codentis has 12 powerful built-in tools to help you code efficiently.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* read_file */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">read_file</h4>
                    <p className="text-sm text-zinc-400 mb-3">Read and display file contents with line numbers and syntax highlighting.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Example usage</div>
                      <div className="text-white">❯ read and summarize vk_swiftshader_icd.json</div>
                      <div className="text-zinc-400 mt-2">● read_file #2</div>
                      <div className="text-zinc-400">└ ✓ Read 1 lines</div>
                      <div className="text-zinc-400 mt-2"># Shows file content with syntax highlighting and line numbers</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Viewing file contents, understanding code structure, reviewing existing files, or analyzing configuration files.</p>
                  </div>

                  {/* write_file */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">write_file</h4>
                    <p className="text-sm text-zinc-400 mb-3">Create new files or overwrite existing ones with complete content.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Example usage</div>
                      <div className="text-white">❯ Create a Python script that prints hello world</div>
                      <div className="text-zinc-400 mt-2">● write_file #3</div>
                      <div className="text-zinc-400">└ ✓ Created hello.py (45 bytes)</div>
                      <div className="text-zinc-400 mt-2"># File is created with complete code ready to use</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Creating new files, generating boilerplate code, scaffolding projects, or writing complete file contents from scratch.</p>
                  </div>

                  {/* edit_file */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">edit_file</h4>
                    <p className="text-sm text-zinc-400 mb-3">Make precise edits to specific lines in files using search-and-replace.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Example usage</div>
                      <div className="text-white">❯ In app.py, change the function name from old_name to new_name</div>
                      <div className="text-zinc-400 mt-2">● edit_file #4</div>
                      <div className="text-zinc-400">└ ✓ Modified app.py (1 replacement)</div>
                      <div className="text-zinc-400 mt-2"># Only the specific occurrence is changed, rest of file untouched</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Making targeted changes, fixing bugs, refactoring specific sections, or updating variable names.</p>
                  </div>

                  {/* apply_patch */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">apply_patch</h4>
                    <p className="text-sm text-zinc-400 mb-3">Apply multiple edits to a file in a single operation.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Example usage</div>
                      <div className="text-white">❯ Fix all TODO comments in the file and add error handling</div>
                      <div className="text-zinc-400 mt-2">● apply_patch #9</div>
                      <div className="text-zinc-400">└ ✓ Applied 5 changes to utils.py</div>
                      <div className="text-zinc-400 mt-2"># Multiple edits applied atomically - all succeed or all fail</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Making multiple related changes to the same file efficiently, refactoring multiple sections, or applying coordinated fixes.</p>
                  </div>

                  {/* list_dir */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">list_dir</h4>
                    <p className="text-sm text-zinc-400 mb-3">List directory contents with file sizes, types, and modification dates.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Example usage</div>
                      <div className="text-white">❯ list files in current directory</div>
                      <div className="text-zinc-400 mt-2">● list_dir #1</div>
                      <div className="text-zinc-400">└ ✓ Found 24 entries</div>
                      <div className="text-zinc-400 mt-2"># Shows: Directories (bin/, resources/), Files (Kiro.exe, config.json, etc.)</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Exploring project structure, finding files, understanding directory layout, or checking what files exist.</p>
                  </div>

                  {/* grep */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">grep</h4>
                    <p className="text-sm text-zinc-400 mb-3">Search for text patterns in files using regex with line numbers and context.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Example usage</div>
                      <div className="text-white">❯ Find all TODO comments in the project</div>
                      <div className="text-zinc-400 mt-2">● grep #5</div>
                      <div className="text-zinc-400">└ ✓ Found 12 matches in 5 files</div>
                      <div className="text-zinc-400 mt-2"># Shows: file paths, line numbers, and matching lines with context</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Finding specific code patterns, debugging issues, code analysis, or locating all instances of a function.</p>
                  </div>

                  {/* glob */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">glob</h4>
                    <p className="text-sm text-zinc-400 mb-3">Find files matching a pattern (e.g., *.py, src/**/*.js) recursively.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Example usage</div>
                      <div className="text-white">❯ Find all Python files in the project</div>
                      <div className="text-zinc-400 mt-2">● glob #10</div>
                      <div className="text-zinc-400">└ ✓ Found 47 files matching *.py</div>
                      <div className="text-zinc-400 mt-2"># Returns: src/main.py, src/utils.py, tests/test_main.py, etc.</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Finding files by type, locating specific file patterns, bulk operations on multiple files, or discovering all files matching criteria.</p>
                  </div>

                  {/* shell */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">shell</h4>
                    <p className="text-sm text-zinc-400 mb-3">Execute shell commands with automatic permission approval for write operations.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Example usage</div>
                      <div className="text-white">❯ Run npm install to install dependencies</div>
                      <div className="text-zinc-400 mt-2">● shell #6</div>
                      <div className="text-zinc-400">└ ✓ Command completed successfully</div>
                      <div className="text-zinc-400 mt-2"># For write operations, Codentis asks for permission first</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Running build commands, installing packages, executing tests, or running system commands. Codentis will ask permission for write operations.</p>
                  </div>

                  {/* web_search */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">web_search</h4>
                    <p className="text-sm text-zinc-400 mb-3">Search the web for information, documentation, or solutions.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Example usage</div>
                      <div className="text-white">❯ How do I use async/await in Python?</div>
                      <div className="text-zinc-400 mt-2">● web_search #7</div>
                      <div className="text-zinc-400">└ ✓ Found 8 results</div>
                      <div className="text-zinc-400 mt-2"># Returns: titles, URLs, snippets from relevant sources</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Learning new concepts, finding documentation, researching solutions, or getting current information.</p>
                  </div>

                  {/* web_fetch */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">web_fetch</h4>
                    <p className="text-sm text-zinc-400 mb-3">Fetch and read content from specific web pages or documentation.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Example usage</div>
                      <div className="text-white">❯ Read the Python documentation for the requests library</div>
                      <div className="text-zinc-400 mt-2">● web_fetch #8</div>
                      <div className="text-zinc-400">└ ✓ Fetched 12.5 KB</div>
                      <div className="text-zinc-400 mt-2"># Codentis analyzes and summarizes the page content</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Reading specific documentation, analyzing web content, getting detailed information, or reviewing API docs.</p>
                  </div>

                  {/* ask_user */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">ask_user</h4>
                    <p className="text-sm text-zinc-400 mb-3">Prompt for user input with multiple choice or freeform responses.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Example usage</div>
                      <div className="text-white">❯ Should I use TypeScript or JavaScript for this project?</div>
                      <div className="text-zinc-400 mt-2">● ask_user #11</div>
                      <div className="text-zinc-400">└ Processing...</div>
                      <div className="text-zinc-400">Question: Should I use TypeScript or JavaScript?</div>
                      <div className="text-zinc-400">Options: 1. TypeScript, 2. JavaScript, 3. Let me decide</div>
                      <div className="text-zinc-400 mt-2"># User selects option, Codentis uses response for decisions</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Codentis needs clarification, making decisions, getting user preferences, or when multiple options exist.</p>
                  </div>

                  {/* todo */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">todo</h4>
                    <p className="text-sm text-zinc-400 mb-3">Manage TODO items and track tasks during your coding session.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Example usage</div>
                      <div className="text-white">❯ Add a TODO: implement error handling for API calls</div>
                      <div className="text-zinc-400 mt-2">● todo #12</div>
                      <div className="text-zinc-400">└ ✓ Added TODO #1: implement error handling for API calls</div>
                      <div className="text-zinc-400 mt-2"># Later: Mark as done or view all TODOs</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Tracking tasks, managing project work, keeping notes during development, or remembering what needs to be done next.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Commands */}
            {activeSection === "commands" && (
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-cyan-400/80">Features</span>
                  <h1 className="text-xl sm:text-3xl font-semibold mt-3 mb-4">Commands</h1>
                  <p className="text-[13px] sm:text-sm text-zinc-400">
                    Complete reference for all CLI commands with examples.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* codentis */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">codentis</h4>
                    <p className="text-sm text-zinc-400 mb-3">Start interactive chat mode. This is the main command for using Codentis.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Usage</div>
                      <div className="text-white">$ codentis</div>
                      <div className="text-zinc-400 mt-2"># Opens interactive chat where you can ask questions and get help</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Features:</strong> Streaming responses, tool execution, markdown rendering, collapsible outputs.</p>
                  </div>

                  {/* codentis chat */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">codentis chat "prompt"</h4>
                    <p className="text-sm text-zinc-400 mb-3">Send a single message and exit. Perfect for quick tasks or scripting.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Usage</div>
                      <div className="text-white">$ codentis chat "Create a Python script that sorts a list"</div>
                      <div className="text-zinc-400 mt-2"># Codentis will generate the code and exit</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Quick one-off tasks, automation, or CI/CD pipelines.</p>
                  </div>

                  {/* codentis config */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">codentis config</h4>
                    <p className="text-sm text-zinc-400 mb-3">Run the interactive configuration wizard to set up your API provider and key.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Usage</div>
                      <div className="text-white">$ codentis config</div>
                      <div className="text-zinc-400 mt-2"># Follow prompts to select provider, enter API key, and choose model</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> First-time setup or changing your AI provider.</p>
                  </div>

                  {/* codentis config --show */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">codentis config --show</h4>
                    <p className="text-sm text-zinc-400 mb-3">Display your current configuration without modifying it.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Usage</div>
                      <div className="text-white">$ codentis config --show</div>
                      <div className="text-zinc-400 mt-2"># Shows: provider, model, API endpoint, and other settings</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Verifying your settings or troubleshooting configuration issues.</p>
                  </div>

                  {/* codentis config --reset */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">codentis config --reset</h4>
                    <p className="text-sm text-zinc-400 mb-3">Delete current configuration and run setup wizard again.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Usage</div>
                      <div className="text-white">$ codentis config --reset</div>
                      <div className="text-zinc-400 mt-2"># Clears config and starts setup wizard from scratch</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Fixing authentication errors or switching to a different API provider.</p>
                  </div>

                  {/* codentis doctor */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">codentis doctor</h4>
                    <p className="text-sm text-zinc-400 mb-3">Run system diagnostics to check your setup and connectivity.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Usage</div>
                      <div className="text-white">$ codentis doctor</div>
                      <div className="text-zinc-400 mt-2"># Checks: Python version, config file, API key, API connectivity</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Troubleshooting connection issues or verifying your setup is correct.</p>
                  </div>

                  {/* codentis version */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">codentis version</h4>
                    <p className="text-sm text-zinc-400 mb-3">Display the installed version of Codentis with detailed information in a compact formatted box.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm mb-3">
                      <div className="text-zinc-500"># Usage</div>
                      <div className="text-white">$ codentis version</div>
                      <div className="text-zinc-400 mt-1">╭──────────────────────────────────────────────────────────────╮</div>
                      <div className="text-zinc-400">│ Codentis v1.4.3                                              │</div>
                      <div className="text-zinc-400">│                                                              │</div>
                      <div className="text-zinc-400">│ An intelligent CLI AI agent for developers                  │</div>
                      <div className="text-zinc-400">│ Python 3.14.2                                                │</div>
                      <div className="text-zinc-400">╰──────────────────────────────────────────────────────────────╯</div>
                    </div>
                    <p className="text-sm text-zinc-400 mb-2"><strong>Alternative:</strong> Use <code className="text-cyan-300 bg-black/50 px-1 rounded">codentis --version</code> for a simple one-line output:</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm mb-3">
                      <div className="text-white">$ codentis --version</div>
                      <div className="text-cyan-400 mt-1">Codentis v1.4.3</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Checking if you have the latest version or reporting issues.</p>
                  </div>

                  {/* codentis trust add */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">codentis trust add &lt;path&gt;</h4>
                    <p className="text-sm text-zinc-400 mb-3">Add a directory to your trusted workspaces list.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Usage</div>
                      <div className="text-white">$ codentis trust add .</div>
                      <div className="text-white">$ codentis trust add /path/to/project</div>
                      <div className="text-zinc-400 mt-2"># Directory is now trusted and won't prompt again</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Working on your own projects or trusted codebases.</p>
                  </div>

                  {/* codentis trust list */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">codentis trust list</h4>
                    <p className="text-sm text-zinc-400 mb-3">Show all directories you've added to your trusted list.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Usage</div>
                      <div className="text-white">$ codentis trust list</div>
                      <div className="text-zinc-400 mt-2"># Shows all trusted workspace paths</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Reviewing which directories are trusted.</p>
                  </div>

                  {/* codentis trust remove */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">codentis trust remove &lt;path&gt;</h4>
                    <p className="text-sm text-zinc-400 mb-3">Remove a directory from your trusted workspaces list.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Usage</div>
                      <div className="text-white">$ codentis trust remove /path/to/project</div>
                      <div className="text-zinc-400 mt-2"># Directory will require trust confirmation again</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Revoking access to a directory or cleaning up old projects.</p>
                  </div>

                  {/* codentis trust clear */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h4 className="font-semibold mb-2 text-cyan-400">codentis trust clear</h4>
                    <p className="text-sm text-zinc-400 mb-3">Remove all directories from your trusted workspaces list.</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Usage</div>
                      <div className="text-white">$ codentis trust clear</div>
                      <div className="text-zinc-400 mt-2"># All directories will require trust confirmation again</div>
                    </div>
                    <p className="text-[13px] sm:text-sm text-zinc-400"><strong>Use when:</strong> Resetting your trust settings or for security reasons.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Shell Integration */}
            {activeSection === "shell-integration" && (
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-cyan-400/80">Features & Tools</span>
                  <h1 className="text-xl sm:text-3xl font-semibold mt-3 mb-4">Shell Integration</h1>
                  <p className="text-[13px] sm:text-sm text-zinc-400">
                    Codentis can execute shell commands through its built-in shell tool, allowing the AI to run commands, install packages, run tests, and interact with your development environment.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Overview */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">How Shell Integration Works</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      When Codentis needs to execute a shell command, it uses the shell tool which:
                    </p>
                    <ul className="space-y-2 text-sm text-zinc-400">
                      <li className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>Detects your operating system and uses the appropriate shell (bash, zsh, PowerShell, cmd)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>Requests permission before executing commands that modify files or system state</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>Captures both stdout and stderr output for analysis</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>Returns exit codes so the AI can detect failures and retry</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>Runs commands in the current working directory (your project root)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Permission System */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Command Permission System</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      For security, Codentis categorizes shell commands and requests permission for potentially dangerous operations:
                    </p>

                    <div className="space-y-4">
                      <div className="p-4 border border-green-500/20 bg-green-500/5 rounded-lg">
                        <p className="text-sm font-semibold text-green-400 mb-2">✓ Auto-Approved (Read-Only Commands)</p>
                        <p className="text-sm text-zinc-400 mb-2">These commands run without asking for permission:</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">ls</code>, <code className="text-cyan-300 bg-black/50 px-1 rounded">dir</code>, <code className="text-cyan-300 bg-black/50 px-1 rounded">pwd</code> - Directory listing and navigation</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">cat</code>, <code className="text-cyan-300 bg-black/50 px-1 rounded">head</code>, <code className="text-cyan-300 bg-black/50 px-1 rounded">tail</code> - File reading</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">git status</code>, <code className="text-cyan-300 bg-black/50 px-1 rounded">git log</code>, <code className="text-cyan-300 bg-black/50 px-1 rounded">git diff</code> - Git inspection</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">npm list</code>, <code className="text-cyan-300 bg-black/50 px-1 rounded">pip list</code> - Package listing</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">node --version</code>, <code className="text-cyan-300 bg-black/50 px-1 rounded">python --version</code> - Version checks</li>
                        </ul>
                      </div>

                      <div className="p-4 border border-yellow-500/20 bg-yellow-500/5 rounded-lg">
                        <p className="text-sm font-semibold text-yellow-400 mb-2">⚠ Requires Permission (Write Operations)</p>
                        <p className="text-sm text-zinc-400 mb-2">These commands require your approval before execution:</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">npm install</code>, <code className="text-cyan-300 bg-black/50 px-1 rounded">pip install</code> - Package installation</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">git commit</code>, <code className="text-cyan-300 bg-black/50 px-1 rounded">git push</code> - Git modifications</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">rm</code>, <code className="text-cyan-300 bg-black/50 px-1 rounded">del</code>, <code className="text-cyan-300 bg-black/50 px-1 rounded">mv</code> - File deletion/moving</li>
                          <li>• <code className="text-cyan-300 bg-black/50 px-1 rounded">chmod</code>, <code className="text-cyan-300 bg-black/50 px-1 rounded">chown</code> - Permission changes</li>
                          <li>• Build commands, test runners, deployment scripts</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm mt-4">
                      <div className="text-yellow-400">⚠ Permission Required</div>
                      <div className="text-white mt-1">Command: npm install express</div>
                      <div className="text-zinc-400 mt-1">This command will modify your project.</div>
                      <div className="text-white mt-2">Allow? (yes/no): <span className="text-cyan-400">yes</span></div>
                      <div className="text-zinc-400 mt-2">Running: npm install express...</div>
                      <div className="text-green-400 mt-1">✓ Command completed successfully</div>
                    </div>
                  </div>

                  {/* Common Use Cases */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Common Shell Integration Use Cases</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Package Management</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm space-y-1">
                          <div className="text-zinc-500">❯ Install the latest version of React</div>
                          <div className="text-zinc-400 mt-2">● shell #1</div>
                          <div className="text-zinc-400">└ ✓ Executed: npm install react@latest</div>
                          <div className="text-white mt-2">Installed React 18.2.0 successfully.</div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Running Tests</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm space-y-1">
                          <div className="text-zinc-500">❯ Run the test suite</div>
                          <div className="text-zinc-400 mt-2">● shell #2</div>
                          <div className="text-zinc-400">└ ✓ Executed: npm test</div>
                          <div className="text-white mt-2">All 24 tests passed! No failures detected.</div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Git Operations</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm space-y-1">
                          <div className="text-zinc-500">❯ Check git status and show uncommitted changes</div>
                          <div className="text-zinc-400 mt-2">● shell #3</div>
                          <div className="text-zinc-400">└ ✓ Executed: git status</div>
                          <div className="text-white mt-2">You have 3 modified files: app.py, config.json, README.md</div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Build & Compilation</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm space-y-1">
                          <div className="text-zinc-500">❯ Build the production bundle</div>
                          <div className="text-zinc-400 mt-2">● shell #4</div>
                          <div className="text-zinc-400">└ ✓ Executed: npm run build</div>
                          <div className="text-white mt-2">Build completed in 12.3s. Output: dist/bundle.js (234 KB)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Platform-Specific Shells */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Platform-Specific Shell Support</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Codentis automatically detects your operating system and uses the appropriate shell:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border border-white/[0.05] bg-black/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <RiMicrosoftFill className="text-cyan-400 text-xl" />
                          <h4 className="text-sm font-semibold text-zinc-300">Windows</h4>
                        </div>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• PowerShell (default)</li>
                          <li>• Command Prompt (cmd)</li>
                          <li>• Git Bash (if installed)</li>
                        </ul>
                      </div>

                      <div className="p-4 border border-white/[0.05] bg-black/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <RiAppleFill className="text-cyan-400 text-xl" />
                          <h4 className="text-sm font-semibold text-zinc-300">macOS</h4>
                        </div>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• zsh (default)</li>
                          <li>• bash</li>
                          <li>• fish (if configured)</li>
                        </ul>
                      </div>

                      <div className="p-4 border border-white/[0.05] bg-black/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <RiUbuntuLine className="text-cyan-400 text-xl" />
                          <h4 className="text-sm font-semibold text-zinc-300">Linux</h4>
                        </div>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• bash (default)</li>
                          <li>• zsh</li>
                          <li>• fish (if configured)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Best Practices */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-cyan-400">Best Practices</h3>

                    <div className="space-y-3">
                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Review Commands Before Approval</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Always read the command carefully before approving. Make sure you understand what it will do.</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Use Version Control</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Keep your project in git so you can easily revert changes if a command has unexpected effects.</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Test in Development First</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Try commands in a development environment before running them in production.</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Check Command Output</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Use <code className="text-cyan-300 bg-black/50 px-1 rounded">/e #ID</code> to expand tool outputs and verify commands executed correctly.</p>
                      </div>
                    </div>
                  </div>

                  {/* Limitations */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Limitations & Considerations</h3>

                    <div className="space-y-3">
                      <div className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-yellow-400 mb-1">⚠ Interactive Commands Not Supported</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Commands that require user input (like interactive prompts) won't work. Use non-interactive flags when available (e.g., <code className="text-cyan-300 bg-black/50 px-1 rounded">npm install -y</code>).</p>
                      </div>

                      <div className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-yellow-400 mb-1">⚠ Long-Running Commands</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Commands that run indefinitely (like dev servers) will block Codentis. Run these manually in a separate terminal.</p>
                      </div>

                      <div className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-yellow-400 mb-1">⚠ Environment Variables</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Commands inherit your shell's environment variables. Make sure sensitive credentials are properly secured.</p>
                      </div>

                      <div className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-yellow-400 mb-1">⚠ Working Directory</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">All commands run in your project root. Use relative paths or <code className="text-cyan-300 bg-black/50 px-1 rounded">cd</code> within the command if needed.</p>
                      </div>
                    </div>
                  </div>

                  {/* Examples */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Example Requests Using Shell Integration</h3>

                    <div className="space-y-3 text-sm text-zinc-400">
                      <div className="border-l-2 border-cyan-400/30 pl-3">
                        <p className="text-zinc-300 mb-1">"Install the dependencies listed in package.json"</p>
                        <p className="text-zinc-500">→ Runs <code className="text-cyan-300 bg-black/50 px-1 rounded">npm install</code></p>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-3">
                        <p className="text-zinc-300 mb-1">"Run the linter and fix any issues"</p>
                        <p className="text-zinc-500">→ Runs <code className="text-cyan-300 bg-black/50 px-1 rounded">npm run lint -- --fix</code></p>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-3">
                        <p className="text-zinc-300 mb-1">"Check if Python 3.9+ is installed"</p>
                        <p className="text-zinc-500">→ Runs <code className="text-cyan-300 bg-black/50 px-1 rounded">python --version</code></p>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-3">
                        <p className="text-zinc-300 mb-1">"Create a new git branch called feature/auth"</p>
                        <p className="text-zinc-500">→ Runs <code className="text-cyan-300 bg-black/50 px-1 rounded">git checkout -b feature/auth</code></p>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-3">
                        <p className="text-zinc-300 mb-1">"Show me the last 5 git commits"</p>
                        <p className="text-zinc-500">→ Runs <code className="text-cyan-300 bg-black/50 px-1 rounded">git log -5 --oneline</code></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Auto-Update System */}
            {activeSection === "auto-update" && (
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-cyan-400/80">Features & Tools</span>
                  <h1 className="text-xl sm:text-3xl font-semibold mt-3 mb-4">Auto-Update System</h1>
                  <p className="text-[13px] sm:text-sm text-zinc-400">
                    Codentis includes a built-in auto-update system that keeps you on the latest version with new features, improvements, and bug fixes. Updates are checked automatically and installed with your permission.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* How It Works */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">How Auto-Update Works</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Codentis automatically checks for updates when you start the application:
                    </p>

                    <div className="space-y-3">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-semibold text-sm">
                          1
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-zinc-300 mb-1">Check for Updates</h4>
                          <p className="text-[13px] sm:text-sm text-zinc-400">On startup, Codentis checks GitHub releases for newer versions (once per day maximum).</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-semibold text-sm">
                          2
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-zinc-300 mb-1">Notify You</h4>
                          <p className="text-[13px] sm:text-sm text-zinc-400">If a new version is available, you'll see a notification with the version number and release notes.</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-semibold text-sm">
                          3
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-zinc-300 mb-1">Download & Install</h4>
                          <p className="text-[13px] sm:text-sm text-zinc-400">With your permission, Codentis downloads the update and guides you through installation.</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-semibold text-sm">
                          4
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-zinc-300 mb-1">Restart & Enjoy</h4>
                          <p className="text-[13px] sm:text-sm text-zinc-400">After installation, restart Codentis to use the new version with all the latest features.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Update Notification */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Update Notification Example</h3>
                    <p className="text-sm text-zinc-400 mb-3">When a new version is available, you'll see:</p>

                    <div className="bg-black/50 p-4 rounded-lg font-mono text-sm space-y-2">
                      <div className="text-cyan-400">🎉 New version available!</div>
                      <div className="text-white mt-2">Current version: v1.0.0</div>
                      <div className="text-white">Latest version: v1.1.0</div>
                      <div className="text-zinc-400 mt-2">What's new in v1.1.0:</div>
                      <div className="text-zinc-400">• Added support for custom tools</div>
                      <div className="text-zinc-400">• Improved error handling</div>
                      <div className="text-zinc-400">• Fixed bug in file editing</div>
                      <div className="text-zinc-400">• Performance improvements</div>
                      <div className="text-white mt-3">Would you like to update now? (yes/no): <span className="text-cyan-400">yes</span></div>
                      <div className="text-cyan-400 mt-2">Downloading update...</div>
                      <div className="text-green-400">✓ Update downloaded successfully!</div>
                      <div className="text-white mt-1">Please restart Codentis to complete the update.</div>
                    </div>
                  </div>

                  {/* Manual Update Check */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Manual Update Check</h3>
                    <p className="text-sm text-zinc-400 mb-3">You can manually check for updates at any time:</p>

                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Check for updates</div>
                      <div className="text-white">$ codentis update</div>
                      <div className="text-cyan-400 mt-2">Checking for updates...</div>
                      <div className="text-white mt-1">You are running the latest version (v1.0.0)</div>
                    </div>

                    <p className="text-sm text-zinc-400 mb-2">Or check your current version:</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-white">$ codentis --version</div>
                      <div className="text-cyan-400 mt-1">Codentis v1.4.3</div>
                    </div>
                  </div>

                  {/* Update Frequency */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Update Check Frequency</h3>

                    <div className="space-y-3 text-sm text-zinc-400">
                      <div className="flex gap-3">
                        <span className="text-cyan-400">•</span>
                        <div>
                          <p className="text-zinc-300 font-semibold mb-1">Automatic Checks</p>
                          <p>Codentis checks for updates once per day when you start the application. This is non-intrusive and happens in the background.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="text-cyan-400">•</span>
                        <div>
                          <p className="text-zinc-300 font-semibold mb-1">Rate Limiting</p>
                          <p>Update checks are rate-limited to avoid excessive API calls. If you recently checked, you won't be prompted again for 24 hours.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="text-cyan-400">•</span>
                        <div>
                          <p className="text-zinc-300 font-semibold mb-1">No Forced Updates</p>
                          <p>Updates are never forced. You can skip an update and continue using your current version. You'll be notified again on the next check.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Platform-Specific Updates */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Platform-Specific Update Process</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border border-white/[0.05] bg-black/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <RiMicrosoftFill className="text-cyan-400 text-xl" />
                          <h4 className="text-sm font-semibold text-zinc-300">Windows</h4>
                        </div>
                        <ul className="text-sm text-zinc-400 space-y-2">
                          <li>• Downloads .exe installer</li>
                          <li>• Runs installer automatically</li>
                          <li>• Preserves your configuration</li>
                          <li>• Updates PATH if needed</li>
                        </ul>
                      </div>

                      <div className="p-4 border border-white/[0.05] bg-black/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <RiAppleFill className="text-cyan-400 text-xl" />
                          <h4 className="text-sm font-semibold text-zinc-300">macOS</h4>
                        </div>
                        <ul className="text-sm text-zinc-400 space-y-2">
                          <li>• Downloads .pkg installer</li>
                          <li>• Opens installer for you</li>
                          <li>• Detects architecture (Intel/ARM)</li>
                          <li>• Maintains permissions</li>
                        </ul>
                      </div>

                      <div className="p-4 border border-white/[0.05] bg-black/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <RiUbuntuLine className="text-cyan-400 text-xl" />
                          <h4 className="text-sm font-semibold text-zinc-300">Linux</h4>
                        </div>
                        <ul className="text-sm text-zinc-400 space-y-2">
                          <li>• Downloads .deb package</li>
                          <li>• Provides install command</li>
                          <li>• Updates via package manager</li>
                          <li>• Preserves config files</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* What Gets Updated */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-cyan-400">What Gets Updated</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-green-400 mb-2">✓ Updated</p>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• Core application binary</li>
                          <li>• Built-in tools and features</li>
                          <li>• Bug fixes and patches</li>
                          <li>• Performance improvements</li>
                          <li>• New AI model support</li>
                          <li>• UI/UX enhancements</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">✓ Preserved</p>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• Your configuration files</li>
                          <li>• API keys and credentials</li>
                          <li>• Trusted workspace list</li>
                          <li>• Custom settings</li>
                          <li>• Project-specific configs</li>
                          <li>• Conversation history</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Disabling Auto-Updates */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Disabling Auto-Update Checks</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      If you prefer to manage updates manually, you can disable automatic update checks:
                    </p>

                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Edit your config file</div>
                      <div className="text-white">$ codentis config --edit</div>
                      <div className="text-zinc-500 mt-2"># Add this setting:</div>
                      <div className="text-cyan-300 mt-1">"check_updates": false</div>
                    </div>

                    <div className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded">
                      <p className="text-sm font-semibold text-yellow-400 mb-1">⚠ Note</p>
                      <p className="text-[13px] sm:text-sm text-zinc-400">Disabling auto-updates means you'll need to manually check for updates using <code className="text-cyan-300 bg-black/50 px-1 rounded">codentis update</code>. You might miss important security fixes and new features.</p>
                    </div>
                  </div>

                  {/* Troubleshooting Updates */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Troubleshooting Update Issues</h3>

                    <div className="space-y-3">
                      <div className="bg-red-500/5 border border-red-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-red-400 mb-1">Update Download Failed</p>
                        <p className="text-sm text-zinc-400 mb-2">If the download fails:</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Check your internet connection</li>
                          <li>• Try again later (GitHub might be temporarily down)</li>
                          <li>• Download manually from <a href="https://github.com/sujal-GITHUB/Codentis/releases" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">GitHub Releases</a></li>
                        </ul>
                      </div>

                      <div className="bg-red-500/5 border border-red-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-red-400 mb-1">Installation Failed</p>
                        <p className="text-sm text-zinc-400 mb-2">If installation fails:</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Make sure you have admin/sudo permissions</li>
                          <li>• Close all Codentis instances before updating</li>
                          <li>• On Windows: Allow the installer through Windows Defender</li>
                          <li>• On macOS: Grant permissions in System Settings</li>
                        </ul>
                      </div>

                      <div className="bg-red-500/5 border border-red-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-red-400 mb-1">Update Check Not Working</p>
                        <p className="text-sm text-zinc-400 mb-2">If update checks aren't working:</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Verify you have internet access</li>
                          <li>• Check if <code className="text-cyan-300 bg-black/50 px-1 rounded">check_updates</code> is enabled in config</li>
                          <li>• Try manual check: <code className="text-cyan-300 bg-black/50 px-1 rounded">codentis update</code></li>
                          <li>• Check GitHub API rate limits (rare)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Release Notes */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Viewing Release Notes</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Stay informed about what's new in each version:
                    </p>

                    <div className="space-y-2 text-sm text-zinc-400">
                      <div className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span><strong className="text-zinc-300">In-App:</strong> Release notes are shown when an update is available</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span><strong className="text-zinc-300">GitHub:</strong> Full changelog at <a href="https://github.com/sujal-GITHUB/Codentis/releases" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">github.com/sujal-GITHUB/Codentis/releases</a></span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span><strong className="text-zinc-300">CHANGELOG:</strong> Detailed version history in the repository</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Troubleshooting */}
            {activeSection === "troubleshooting" && (
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-cyan-400/80">Support</span>
                  <h1 className="text-xl sm:text-3xl font-semibold mt-3 mb-4">Troubleshooting</h1>
                  <p className="text-[13px] sm:text-sm text-zinc-400">
                    Solutions for common issues and how to resolve them.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* API Key Issues */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-red-400">API Key Issues</h3>
                    <p className="text-sm text-zinc-400 mb-3"><strong>Problem:</strong> Authentication errors like "Invalid API key" or "Unauthorized"</p>

                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Error message</div>
                      <div className="text-red-400">Error: Invalid API key provided</div>
                      <div className="text-red-400">Error: Unauthorized - check your credentials</div>
                    </div>

                    <p className="text-sm text-zinc-400 mb-3"><strong>Solutions:</strong></p>
                    <ul className="space-y-2 text-sm text-zinc-400 mb-3">
                      <li className="flex gap-2">
                        <span className="text-cyan-400">1.</span>
                        <span>Verify your API key is correct - copy it directly from your provider's dashboard</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">2.</span>
                        <span>Check that your API key has the right permissions and hasn't expired</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">3.</span>
                        <span>Reset your configuration and re-enter the key:</span>
                      </li>
                    </ul>

                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-white">$ codentis config --reset</div>
                      <div className="text-zinc-400 mt-2"># Follow the setup wizard and carefully paste your API key</div>
                    </div>
                  </div>

                  {/* Connection Errors */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-red-400">Connection Errors</h3>
                    <p className="text-sm text-zinc-400 mb-3"><strong>Problem:</strong> Network errors like "Connection timeout" or "Failed to connect to API"</p>

                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Error message</div>
                      <div className="text-red-400">Error: Connection timeout</div>
                      <div className="text-red-400">Error: Failed to reach API endpoint</div>
                    </div>

                    <p className="text-sm text-zinc-400 mb-3"><strong>Solutions:</strong></p>
                    <ul className="space-y-2 text-sm text-zinc-400 mb-3">
                      <li className="flex gap-2">
                        <span className="text-cyan-400">1.</span>
                        <span>Check your internet connection - try opening a website in your browser</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">2.</span>
                        <span>Check if the API service is down - visit the provider's status page</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">3.</span>
                        <span>Run diagnostics to check connectivity:</span>
                      </li>
                    </ul>

                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-white">$ codentis doctor</div>
                      <div className="text-zinc-400 mt-2"># Shows: Python version, config status, API connectivity</div>
                    </div>
                  </div>

                  {/* Command Not Found */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-red-400">Command Not Found</h3>
                    <p className="text-sm text-zinc-400 mb-3"><strong>Problem:</strong> "codentis: command not found" or similar error</p>

                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Error message</div>
                      <div className="text-red-400">$ codentis</div>
                      <div className="text-red-400">bash: codentis: command not found</div>
                    </div>

                    <p className="text-sm text-zinc-400 mb-3"><strong>Solutions:</strong></p>
                    <ul className="space-y-2 text-sm text-zinc-400 mb-3">
                      <li className="flex gap-2">
                        <span className="text-cyan-400">1.</span>
                        <span>Reinstall Codentis - the installation directory may not be in your PATH</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">2.</span>
                        <span>On Windows: Restart your terminal after installation</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">3.</span>
                        <span>On macOS/Linux: Check if /usr/local/bin is in your PATH:</span>
                      </li>
                    </ul>

                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-white">$ echo $PATH</div>
                      <div className="text-zinc-400 mt-2"># Should include /usr/local/bin</div>
                    </div>
                  </div>

                  {/* Permission Denied */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-red-400">Permission Denied / Workspace Not Trusted</h3>
                    <p className="text-sm text-zinc-400 mb-3"><strong>Problem:</strong> "Workspace not trusted" or permission errors when accessing files</p>

                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Error message</div>
                      <div className="text-red-400">Error: This workspace is not trusted</div>
                      <div className="text-red-400">Error: Permission denied - cannot access files</div>
                    </div>

                    <p className="text-sm text-zinc-400 mb-3"><strong>Solutions:</strong></p>
                    <ul className="space-y-2 text-sm text-zinc-400 mb-3">
                      <li className="flex gap-2">
                        <span className="text-cyan-400">1.</span>
                        <span>Trust the current directory when prompted, or use:</span>
                      </li>
                    </ul>

                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-white">$ codentis trust add .</div>
                      <div className="text-zinc-400 mt-2"># Now Codentis can access files in this directory</div>
                    </div>
                  </div>

                  {/* Slow Performance */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-red-400">Slow Performance / Timeouts</h3>
                    <p className="text-sm text-zinc-400 mb-3"><strong>Problem:</strong> Codentis is slow or times out on large files/operations</p>

                    <p className="text-sm text-zinc-400 mb-3"><strong>Solutions:</strong></p>
                    <ul className="space-y-2 text-sm text-zinc-400 mb-3">
                      <li className="flex gap-2">
                        <span className="text-cyan-400">1.</span>
                        <span>For large files: Use grep or glob to find specific files instead of reading entire directories</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">2.</span>
                        <span>Check your internet connection - slow API responses cause delays</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">3.</span>
                        <span>Try a simpler request first to verify Codentis is working</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">4.</span>
                        <span>Check if your API provider has rate limits - wait a moment and try again</span>
                      </li>
                    </ul>
                  </div>

                  {/* Loop Detection */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-red-400">Loop Detection / Stuck in Loop</h3>
                    <p className="text-sm text-zinc-400 mb-3"><strong>Problem:</strong> Codentis keeps trying the same thing repeatedly</p>

                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Message</div>
                      <div className="text-yellow-400">I seem to be stuck trying the same approach repeatedly.</div>
                      <div className="text-yellow-400">Would you like me to: 1. Try different approach 2. Get more info 3. Stop</div>
                    </div>

                    <p className="text-sm text-zinc-400 mb-3"><strong>Solutions:</strong></p>
                    <ul className="space-y-2 text-sm text-zinc-400 mb-3">
                      <li className="flex gap-2">
                        <span className="text-cyan-400">1.</span>
                        <span>Select option 1 to try a different approach</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">2.</span>
                        <span>Select option 2 to get more information about the error</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">3.</span>
                        <span>Select option 3 to stop and handle it manually</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">4.</span>
                        <span>Provide more context: "The issue is..." to help Codentis understand</span>
                      </li>
                    </ul>
                  </div>

                  {/* File Not Found */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-red-400">File Not Found / Path Issues</h3>
                    <p className="text-sm text-zinc-400 mb-3"><strong>Problem:</strong> "File not found" or "Path does not exist" errors</p>

                    <p className="text-sm text-zinc-400 mb-3"><strong>Solutions:</strong></p>
                    <ul className="space-y-2 text-sm text-zinc-400 mb-3">
                      <li className="flex gap-2">
                        <span className="text-cyan-400">1.</span>
                        <span>Use list_dir to verify the file exists and get the correct path</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">2.</span>
                        <span>Check if you're in the right directory - use "list files in current directory"</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">3.</span>
                        <span>Use glob to find files: "Find all .py files" or "Find config.json"</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">4.</span>
                        <span>Check file permissions - you may not have read access</span>
                      </li>
                    </ul>
                  </div>

                  {/* Getting Help */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-cyan-400">Still Need Help?</h3>
                    <p className="text-sm text-zinc-400 mb-4">
                      If you're still experiencing issues, here are the best ways to get help:
                    </p>
                    <div className="space-y-2 text-sm text-zinc-400">
                      <div className="flex gap-2">
                        <span className="text-cyan-400">→</span>
                        <span><strong>Run diagnostics:</strong> <code className="text-cyan-300 bg-black/50 px-2 py-1 rounded">codentis doctor</code> shows detailed system info</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">→</span>
                        <span><strong>Check logs:</strong> Logs are saved in ~/.local/share/codentis/codentis.log</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">→</span>
                        <span><strong>Report on GitHub:</strong> <a href="https://github.com/sujal-GITHUB/Codentis/issues" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Create an issue</a> with error details</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">→</span>
                        <span><strong>Include context:</strong> Share the error message, what you were trying to do, and your OS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Project Configuration */}
            {activeSection === "project-config" && (
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-cyan-400/80">Advanced</span>
                  <h1 className="text-xl sm:text-3xl font-semibold mt-3 mb-4">Project Configuration</h1>
                  <p className="text-[13px] sm:text-sm text-zinc-400">
                    Create project-specific configurations to customize Codentis behavior for individual projects. Project configs override user-level settings and enable team-wide consistency.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Overview */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">What is Project Configuration?</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Project configuration allows you to define Codentis settings at the project level, stored in your repository. This enables:
                    </p>

                    <ul className="space-y-2 text-sm text-zinc-400">
                      <li className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span><strong className="text-zinc-300">Team Consistency:</strong> Everyone on your team uses the same AI model and settings</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span><strong className="text-zinc-300">Project-Specific Models:</strong> Use different AI models for different projects</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span><strong className="text-zinc-300">Custom Prompts:</strong> Add project-specific context to AI interactions</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span><strong className="text-zinc-300">Version Control:</strong> Configuration is tracked in git alongside your code</span>
                      </li>
                    </ul>
                  </div>

                  {/* Configuration Hierarchy */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Configuration Hierarchy</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Codentis uses a layered configuration system where project settings override user settings:
                    </p>

                    <div className="space-y-3">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-semibold text-sm">
                          1
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-zinc-300 mb-1">User-Level Config (Base)</h4>
                          <p className="text-[13px] sm:text-sm text-zinc-400"><code className="text-cyan-300 bg-black/50 px-1 rounded">~/.codentis/config.json</code></p>
                          <p className="text-sm text-zinc-400 mt-1">Your personal defaults - API keys, preferred model, global settings</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-semibold text-sm">
                          2
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-zinc-300 mb-1">Project Config (Override)</h4>
                          <p className="text-[13px] sm:text-sm text-zinc-400"><code className="text-cyan-300 bg-black/50 px-1 rounded">.codentis/config.json</code> or <code className="text-cyan-300 bg-black/50 px-1 rounded">.agent/codentis.toml</code></p>
                          <p className="text-sm text-zinc-400 mt-1">Project-specific settings that override user defaults</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-cyan-500/5 border border-cyan-500/20 p-3 rounded mt-4">
                      <p className="text-sm text-cyan-400 font-semibold mb-1">Example</p>
                      <p className="text-[13px] sm:text-sm text-zinc-400">If your user config uses <code className="text-cyan-300 bg-black/50 px-1 rounded">gpt-4o</code> but the project config specifies <code className="text-cyan-300 bg-black/50 px-1 rounded">claude-sonnet-4.6</code>, Codentis will use Claude for that project.</p>
                    </div>
                  </div>

                  {/* Creating Project Config */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Creating a Project Configuration</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Option 1: JSON Format (.codentis/config.json)</p>
                        <p className="text-sm text-zinc-400 mb-2">Create a <code className="text-cyan-300 bg-black/50 px-1 rounded">.codentis</code> directory in your project root:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm mb-2">
                          <div className="text-zinc-500"># Create the directory</div>
                          <div className="text-white">$ mkdir .codentis</div>
                          <div className="text-zinc-500 mt-2"># Create config file</div>
                          <div className="text-white">$ touch .codentis/config.json</div>
                        </div>
                        <p className="text-sm text-zinc-400 mb-2">Example <code className="text-cyan-300 bg-black/50 px-1 rounded">.codentis/config.json</code>:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre className="text-zinc-300">{`{
  "provider": "anthropic",
  "model": "claude-sonnet-4.6",
  "temperature": 0.7,
  "max_tokens": 4096,
  "system_prompt": "You are helping with a Python web application using Flask and PostgreSQL.",
  "auto_approve_read": true,
  "check_updates": false
}`}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Option 2: TOML Format (.agent/codentis.toml)</p>
                        <p className="text-sm text-zinc-400 mb-2">Create a <code className="text-cyan-300 bg-black/50 px-1 rounded">.agent</code> directory in your project root:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm mb-2">
                          <div className="text-zinc-500"># Create the directory</div>
                          <div className="text-white">$ mkdir .agent</div>
                          <div className="text-zinc-500 mt-2"># Create config file</div>
                          <div className="text-white">$ touch .agent/codentis.toml</div>
                        </div>
                        <p className="text-sm text-zinc-400 mb-2">Example <code className="text-cyan-300 bg-black/50 px-1 rounded">.agent/codentis.toml</code>:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre className="text-zinc-300">{`provider = "anthropic"
model = "claude-sonnet-4.6"
temperature = 0.7
max_tokens = 4096
system_prompt = "You are helping with a Python web application using Flask and PostgreSQL."
auto_approve_read = true
check_updates = false`}</pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Available Settings */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Available Project Settings</h3>

                    <div className="space-y-4">
                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">AI Provider Settings</h4>
                        <div className="space-y-2 text-sm text-zinc-400">
                          <div><code className="text-cyan-300 bg-black/50 px-1 rounded">provider</code> - AI provider name (openai, anthropic, openrouter, custom)</div>
                          <div><code className="text-cyan-300 bg-black/50 px-1 rounded">model</code> - Model name (e.g., gpt-5.2, claude-sonnet-4.6)</div>
                          <div><code className="text-cyan-300 bg-black/50 px-1 rounded">api_base</code> - Custom API endpoint URL</div>
                          <div><code className="text-cyan-300 bg-black/50 px-1 rounded">temperature</code> - Creativity level (0.0-1.0, default: 0.7)</div>
                          <div><code className="text-cyan-300 bg-black/50 px-1 rounded">max_tokens</code> - Maximum response length (default: 4096)</div>
                        </div>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">Behavior Settings</h4>
                        <div className="space-y-2 text-sm text-zinc-400">
                          <div><code className="text-cyan-300 bg-black/50 px-1 rounded">system_prompt</code> - Custom system prompt with project context</div>
                          <div><code className="text-cyan-300 bg-black/50 px-1 rounded">auto_approve_read</code> - Auto-approve read-only commands (true/false)</div>
                          <div><code className="text-cyan-300 bg-black/50 px-1 rounded">check_updates</code> - Enable update checks (true/false)</div>
                          <div><code className="text-cyan-300 bg-black/50 px-1 rounded">verbose</code> - Show detailed output (true/false)</div>
                        </div>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">Tool Settings</h4>
                        <div className="space-y-2 text-sm text-zinc-400">
                          <div><code className="text-cyan-300 bg-black/50 px-1 rounded">max_file_size</code> - Maximum file size to read (in bytes)</div>
                          <div><code className="text-cyan-300 bg-black/50 px-1 rounded">excluded_dirs</code> - Directories to exclude from operations (array)</div>
                          <div><code className="text-cyan-300 bg-black/50 px-1 rounded">excluded_files</code> - File patterns to exclude (array)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Use Cases */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-cyan-400">Common Use Cases</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">1. Team Standardization</p>
                        <p className="text-sm text-zinc-400 mb-2">Ensure everyone uses the same model and settings:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <pre className="text-zinc-300">{`{
  "provider": "anthropic",
  "model": "claude-sonnet-4.6",
  "temperature": 0.5,
  "system_prompt": "Follow our team's coding standards in CONTRIBUTING.md"
}`}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">2. Project-Specific Context</p>
                        <p className="text-sm text-zinc-400 mb-2">Add context about your project's tech stack:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <pre className="text-zinc-300">{`{
  "system_prompt": "This is a React + TypeScript project using Next.js 14, Tailwind CSS, and Prisma ORM. Follow our component structure in /components and use our custom hooks from /hooks."
}`}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">3. Cost Optimization</p>
                        <p className="text-sm text-zinc-400 mb-2">Use a cheaper model for development:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <pre className="text-zinc-300">{`{
  "provider": "openrouter",
  "model": "deepseek/deepseek-v3",
  "max_tokens": 2048
}`}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">4. Local Development</p>
                        <p className="text-sm text-zinc-400 mb-2">Use Ollama for offline work:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <pre className="text-zinc-300">{`{
  "provider": "custom",
  "api_base": "http://localhost:11434/v1",
  "model": "llama3",
  "check_updates": false
}`}</pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Version Control */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Version Control Best Practices</h3>

                    <div className="space-y-3">
                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Do Commit</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Project configuration files (<code className="text-cyan-300 bg-black/50 px-1 rounded">.codentis/config.json</code>)</li>
                          <li>• Model and temperature settings</li>
                          <li>• System prompts and project context</li>
                          <li>• Tool preferences and exclusions</li>
                        </ul>
                      </div>

                      <div className="bg-red-500/5 border border-red-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-red-400 mb-1">✗ Don't Commit</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• API keys (keep these in user config only)</li>
                          <li>• Personal preferences (like verbose mode)</li>
                          <li>• Temporary or experimental settings</li>
                        </ul>
                      </div>

                      <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                        <div className="text-zinc-500"># Add to .gitignore if needed</div>
                        <div className="text-white">.codentis/api_keys.json</div>
                        <div className="text-white">.codentis/local_overrides.json</div>
                      </div>
                    </div>
                  </div>

                  {/* Viewing Active Config */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Viewing Active Configuration</h3>
                    <p className="text-sm text-zinc-400 mb-3">See which settings are currently active (merged from user and project configs):</p>

                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm space-y-1 mb-3">
                      <div className="text-zinc-500"># Show current configuration</div>
                      <div className="text-white">$ codentis config --show</div>
                      <div className="text-cyan-400 mt-2">Current Configuration:</div>
                      <div className="text-zinc-400">Provider: anthropic</div>
                      <div className="text-zinc-400">Model: claude-sonnet-4.6</div>
                      <div className="text-zinc-400">Temperature: 0.7</div>
                      <div className="text-zinc-400">Max Tokens: 4096</div>
                      <div className="text-yellow-400 mt-2">⚠ Using project config from .codentis/config.json</div>
                    </div>

                    <p className="text-[13px] sm:text-sm text-zinc-400">The warning indicates that project settings are overriding your user defaults.</p>
                  </div>

                  {/* Troubleshooting */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Troubleshooting Project Config</h3>

                    <div className="space-y-3">
                      <div className="bg-red-500/5 border border-red-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-red-400 mb-1">Config Not Being Used</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Check file location: must be <code className="text-cyan-300 bg-black/50 px-1 rounded">.codentis/config.json</code> or <code className="text-cyan-300 bg-black/50 px-1 rounded">.agent/codentis.toml</code></li>
                          <li>• Verify JSON/TOML syntax is valid</li>
                          <li>• Run <code className="text-cyan-300 bg-black/50 px-1 rounded">codentis config --show</code> to see active config</li>
                          <li>• Restart Codentis after changing config</li>
                        </ul>
                      </div>

                      <div className="bg-red-500/5 border border-red-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-red-400 mb-1">Invalid Configuration</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Check for typos in setting names</li>
                          <li>• Ensure values are correct type (string, number, boolean)</li>
                          <li>• Validate JSON with a linter</li>
                          <li>• Check Codentis logs for parsing errors</li>
                        </ul>
                      </div>

                      <div className="bg-red-500/5 border border-red-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-red-400 mb-1">Team Members Can't Use Config</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Make sure config file is committed to git</li>
                          <li>• Verify they've pulled the latest changes</li>
                          <li>• Check they're running Codentis from project root</li>
                          <li>• Ensure they have required API keys in their user config</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Example Projects */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-cyan-400">Example Project Configurations</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Frontend Project (React/Next.js)</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <pre className="text-zinc-300">{`{
  "provider": "anthropic",
  "model": "claude-sonnet-4.6",
  "system_prompt": "React 18 + Next.js 14 + TypeScript + Tailwind. Use functional components with hooks. Follow our ESLint rules.",
  "excluded_dirs": ["node_modules", ".next", "dist"],
  "temperature": 0.6
}`}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Backend API (Python/FastAPI)</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <pre className="text-zinc-300">{`{
  "provider": "openai",
  "model": "gpt-5.2",
  "system_prompt": "Python 3.11 + FastAPI + SQLAlchemy + PostgreSQL. Follow PEP 8. Use type hints. Write docstrings.",
  "excluded_dirs": ["venv", "__pycache__", ".pytest_cache"],
  "temperature": 0.5
}`}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Mobile App (React Native)</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <pre className="text-zinc-300">{`{
  "provider": "openrouter",
  "model": "anthropic/claude-sonnet-4.6",
  "system_prompt": "React Native + Expo + TypeScript. Target iOS and Android. Use React Navigation for routing.",
  "excluded_dirs": ["node_modules", "ios/Pods", "android/build"],
  "max_tokens": 8192
}`}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Custom Tools */}
            {activeSection === "custom-tools" && (
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-cyan-400/80">Advanced</span>
                  <h1 className="text-xl sm:text-3xl font-semibold mt-3 mb-4">Custom Tools</h1>
                  <p className="text-[13px] sm:text-sm text-zinc-400">
                    Extend Codentis with custom tools tailored to your workflow. Create Python-based tools that the AI can use to interact with APIs, databases, or any external system.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Overview */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">What are Custom Tools?</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Custom tools are Python functions that extend Codentis's capabilities beyond the built-in tools. They allow you to:
                    </p>

                    <ul className="space-y-2 text-sm text-zinc-400">
                      <li className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span><strong className="text-zinc-300">Integrate with APIs:</strong> Connect to REST APIs, GraphQL endpoints, or third-party services</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span><strong className="text-zinc-300">Database Operations:</strong> Query databases, run migrations, or manage data</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span><strong className="text-zinc-300">Custom Workflows:</strong> Automate project-specific tasks like deployment or testing</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span><strong className="text-zinc-300">External Tools:</strong> Integrate with Docker, Kubernetes, cloud providers, or CI/CD systems</span>
                      </li>
                    </ul>
                  </div>

                  {/* Tool Structure */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Tool Structure</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Custom tools are Python classes that inherit from the <code className="text-cyan-300 bg-black/50 px-1 rounded">BaseTool</code> class:
                    </p>

                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre className="text-zinc-300">{`from codentis.tools.base import BaseTool
from typing import Dict, Any

class MyCustomTool(BaseTool):
    """Tool description that the AI will see"""
    
    name = "my_custom_tool"
    description = "Brief description of what this tool does"
    
    def __init__(self):
        super().__init__()
        # Initialize any resources
    
    def execute(self, **kwargs) -> Dict[str, Any]:
        """
        Main execution method called by the AI
        
        Args:
            **kwargs: Tool parameters defined in schema
            
        Returns:
            Dict with 'success' (bool) and 'output' (str)
        """
        try:
            # Your tool logic here
            result = self._do_something(kwargs)
            
            return {
                "success": True,
                "output": f"Operation completed: {result}"
            }
        except Exception as e:
            return {
                "success": False,
                "output": f"Error: {str(e)}"
            }
    
    def _do_something(self, params):
        # Helper methods
        pass
    
    @property
    def schema(self) -> Dict[str, Any]:
        """Define tool parameters for the AI"""
        return {
            "type": "object",
            "properties": {
                "param1": {
                    "type": "string",
                    "description": "Description of parameter 1"
                },
                "param2": {
                    "type": "integer",
                    "description": "Description of parameter 2"
                }
            },
            "required": ["param1"]
        }`}</pre>
                    </div>
                  </div>

                  {/* Creating a Custom Tool */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Creating Your First Custom Tool</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Step 1: Create Tools Directory</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <div className="text-zinc-500"># In your project root</div>
                          <div className="text-white">$ mkdir -p .codentis/tools</div>
                          <div className="text-white">$ touch .codentis/tools/__init__.py</div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Step 2: Create Tool File</p>
                        <p className="text-sm text-zinc-400 mb-2">Create <code className="text-cyan-300 bg-black/50 px-1 rounded">.codentis/tools/github_tool.py</code>:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre className="text-zinc-300">{`from codentis.tools.base import BaseTool
import requests
from typing import Dict, Any

class GitHubTool(BaseTool):
    """Fetch information from GitHub repositories"""
    
    name = "github_info"
    description = "Get repository information from GitHub"
    
    def execute(self, repo: str, **kwargs) -> Dict[str, Any]:
        """
        Fetch GitHub repository information
        
        Args:
            repo: Repository in format 'owner/repo'
        """
        try:
            url = f"https://api.github.com/repos/{repo}"
            response = requests.get(url)
            response.raise_for_status()
            
            data = response.json()
            output = f"""
Repository: {data['full_name']}
Description: {data['description']}
Stars: {data['stargazers_count']}
Forks: {data['forks_count']}
Language: {data['language']}
Open Issues: {data['open_issues_count']}
"""
            return {
                "success": True,
                "output": output.strip()
            }
        except Exception as e:
            return {
                "success": False,
                "output": f"Failed to fetch repo info: {str(e)}"
            }
    
    @property
    def schema(self) -> Dict[str, Any]:
        return {
            "type": "object",
            "properties": {
                "repo": {
                    "type": "string",
                    "description": "Repository in format 'owner/repo'"
                }
            },
            "required": ["repo"]
        }`}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Step 3: Register the Tool</p>
                        <p className="text-sm text-zinc-400 mb-2">Update <code className="text-cyan-300 bg-black/50 px-1 rounded">.codentis/tools/__init__.py</code>:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <pre className="text-zinc-300">{`from .github_tool import GitHubTool

# Export all custom tools
__all__ = ['GitHubTool']`}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Step 4: Use the Tool</p>
                        <p className="text-sm text-zinc-400 mb-2">Codentis automatically discovers and loads custom tools. Just ask:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <div className="text-zinc-500">❯ Get info about the react repository</div>
                          <div className="text-zinc-400 mt-2">● github_info #1</div>
                          <div className="text-zinc-400">└ ✓ Repository: facebook/react</div>
                          <div className="text-white mt-2">The React repository has 220k stars...</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Example Tools */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-cyan-400">Example Custom Tools</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">1. Database Query Tool</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre className="text-zinc-300">{`class DatabaseTool(BaseTool):
    """Execute SQL queries on the project database"""
    
    name = "db_query"
    description = "Run SQL queries (read-only)"
    
    def execute(self, query: str, **kwargs):
        import sqlite3
        try:
            conn = sqlite3.connect('database.db')
            cursor = conn.cursor()
            cursor.execute(query)
            results = cursor.fetchall()
            conn.close()
            
            return {
                "success": True,
                "output": f"Found {len(results)} rows: {results}"
            }
        except Exception as e:
            return {"success": False, "output": str(e)}
    
    @property
    def schema(self):
        return {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "SQL SELECT query"
                }
            },
            "required": ["query"]
        }`}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">2. Docker Management Tool</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre className="text-zinc-300">{`class DockerTool(BaseTool):
    """Manage Docker containers"""
    
    name = "docker_manage"
    description = "List, start, or stop Docker containers"
    
    def execute(self, action: str, container: str = None, **kwargs):
        import subprocess
        try:
            if action == "list":
                result = subprocess.run(
                    ["docker", "ps", "-a"],
                    capture_output=True,
                    text=True
                )
            elif action == "start":
                result = subprocess.run(
                    ["docker", "start", container],
                    capture_output=True,
                    text=True
                )
            elif action == "stop":
                result = subprocess.run(
                    ["docker", "stop", container],
                    capture_output=True,
                    text=True
                )
            
            return {
                "success": result.returncode == 0,
                "output": result.stdout or result.stderr
            }
        except Exception as e:
            return {"success": False, "output": str(e)}
    
    @property
    def schema(self):
        return {
            "type": "object",
            "properties": {
                "action": {
                    "type": "string",
                    "enum": ["list", "start", "stop"],
                    "description": "Action to perform"
                },
                "container": {
                    "type": "string",
                    "description": "Container name (for start/stop)"
                }
            },
            "required": ["action"]
        }`}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">3. API Integration Tool</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre className="text-zinc-300">{`class SlackTool(BaseTool):
    """Send messages to Slack"""
    
    name = "slack_notify"
    description = "Send notifications to Slack channel"
    
    def __init__(self):
        super().__init__()
        self.webhook_url = os.getenv('SLACK_WEBHOOK_URL')
    
    def execute(self, message: str, channel: str = None, **kwargs):
        import requests
        try:
            payload = {
                "text": message,
                "channel": channel
            }
            response = requests.post(
                self.webhook_url,
                json=payload
            )
            response.raise_for_status()
            
            return {
                "success": True,
                "output": "Message sent to Slack"
            }
        except Exception as e:
            return {"success": False, "output": str(e)}
    
    @property
    def schema(self):
        return {
            "type": "object",
            "properties": {
                "message": {
                    "type": "string",
                    "description": "Message to send"
                },
                "channel": {
                    "type": "string",
                    "description": "Slack channel (optional)"
                }
            },
            "required": ["message"]
        }`}</pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Best Practices */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Best Practices</h3>

                    <div className="space-y-3">
                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Clear Descriptions</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Write clear tool names and descriptions so the AI knows when to use them. Be specific about what the tool does.</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Error Handling</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Always wrap tool logic in try-except blocks. Return meaningful error messages that help debug issues.</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Parameter Validation</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Define clear schemas with type information and descriptions. Validate inputs before processing.</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Keep Tools Focused</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Each tool should do one thing well. Create multiple tools instead of one complex tool with many modes.</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Use Environment Variables</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Store API keys and secrets in environment variables, not in tool code. Use <code className="text-cyan-300 bg-black/50 px-1 rounded">os.getenv()</code>.</p>
                      </div>
                    </div>
                  </div>

                  {/* Tool Discovery */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Tool Discovery & Loading</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Codentis automatically discovers custom tools from these locations:
                    </p>

                    <div className="space-y-2 text-sm text-zinc-400">
                      <div className="flex gap-2">
                        <span className="text-cyan-400">1.</span>
                        <div>
                          <p className="text-zinc-300 font-semibold">Project Tools</p>
                          <p><code className="text-cyan-300 bg-black/50 px-1 rounded">.codentis/tools/</code> - Tools specific to this project</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <span className="text-cyan-400">2.</span>
                        <div>
                          <p className="text-zinc-300 font-semibold">User Tools</p>
                          <p><code className="text-cyan-300 bg-black/50 px-1 rounded">~/.codentis/tools/</code> - Tools available across all projects</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm mt-3">
                      <div className="text-zinc-500"># List all available tools (including custom)</div>
                      <div className="text-white">$ codentis</div>
                      <div className="text-zinc-500 mt-1">❯ /list</div>
                      <div className="text-cyan-400 mt-2">Available Tools:</div>
                      <div className="text-zinc-400">• read_file - Read file contents</div>
                      <div className="text-zinc-400">• write_file - Create or overwrite files</div>
                      <div className="text-zinc-400">• github_info - Get repository information (custom)</div>
                      <div className="text-zinc-400">• db_query - Run SQL queries (custom)</div>
                    </div>
                  </div>

                  {/* Testing Custom Tools */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Testing Custom Tools</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Test your custom tools before using them with the AI:
                    </p>

                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm overflow-x-auto mb-3">
                      <pre className="text-zinc-300">{`# test_github_tool.py
from codentis.tools.registry import ToolRegistry

# Load tools
registry = ToolRegistry()
registry.discover_tools()

# Get your custom tool
github_tool = registry.get_tool('github_info')

# Test it
result = github_tool.execute(repo='facebook/react')
print(result)

# Expected output:
# {
#   'success': True,
#   'output': 'Repository: facebook/react\\nStars: 220000...'
# }`}</pre>
                    </div>

                    <p className="text-[13px] sm:text-sm text-zinc-400">Run the test:</p>
                    <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                      <div className="text-white">$ python test_github_tool.py</div>
                    </div>
                  </div>

                  {/* Troubleshooting */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Troubleshooting Custom Tools</h3>

                    <div className="space-y-3">
                      <div className="bg-red-500/5 border border-red-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-red-400 mb-1">Tool Not Found</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Check file is in <code className="text-cyan-300 bg-black/50 px-1 rounded">.codentis/tools/</code></li>
                          <li>• Verify <code className="text-cyan-300 bg-black/50 px-1 rounded">__init__.py</code> exports the tool class</li>
                          <li>• Ensure tool name matches the <code className="text-cyan-300 bg-black/50 px-1 rounded">name</code> property</li>
                          <li>• Restart Codentis to reload tools</li>
                        </ul>
                      </div>

                      <div className="bg-red-500/5 border border-red-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-red-400 mb-1">Import Errors</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Install required dependencies: <code className="text-cyan-300 bg-black/50 px-1 rounded">pip install requests</code></li>
                          <li>• Check Python path includes your tools directory</li>
                          <li>• Verify all imports are available in Codentis environment</li>
                        </ul>
                      </div>

                      <div className="bg-red-500/5 border border-red-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-red-400 mb-1">Tool Execution Fails</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Check error message in tool output</li>
                          <li>• Test tool independently with test script</li>
                          <li>• Verify API keys and credentials are set</li>
                          <li>• Add logging to debug execution flow</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Security Considerations */}
                  <div className="p-6 border border-yellow-500/20 bg-yellow-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-yellow-400">Security Considerations</h3>

                    <div className="space-y-3">
                      <div className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-yellow-400 mb-1">⚠ Validate Inputs</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Always validate and sanitize inputs, especially for SQL queries or shell commands. Prevent injection attacks.</p>
                      </div>

                      <div className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-yellow-400 mb-1">⚠ Limit Permissions</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Use read-only database connections when possible. Avoid giving tools destructive capabilities unless necessary.</p>
                      </div>

                      <div className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-yellow-400 mb-1">⚠ Protect Secrets</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Never hardcode API keys or passwords. Use environment variables or secure credential stores.</p>
                      </div>

                      <div className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-yellow-400 mb-1">⚠ Rate Limiting</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Implement rate limiting for API calls to avoid hitting quotas or causing service disruptions.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Tuning */}
            {activeSection === "performance" && (
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-cyan-400/80">Advanced</span>
                  <h1 className="text-xl sm:text-3xl font-semibold mt-3 mb-4">Performance Tuning</h1>
                  <p className="text-[13px] sm:text-sm text-zinc-400">
                    Optimize Codentis for speed, cost, and efficiency. Learn how to configure settings, choose the right models, and manage resources for the best performance.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Response Speed Optimization */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Response Speed Optimization</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Improve AI response times with these strategies:
                    </p>

                    <div className="space-y-4">
                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">1. Choose Faster Models</h4>
                        <p className="text-sm text-zinc-400 mb-2">Some models are optimized for speed over capability:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <pre className="text-zinc-300">{`{
  "provider": "anthropic",
  "model": "claude-sonnet-4.6",  // Faster than Opus
  "max_tokens": 2048              // Limit response length
}`}</pre>
                        </div>
                        <p className="text-sm text-zinc-400 mt-2">Fast models: Claude Sonnet, GPT-4o, Gemini Flash, o3-mini</p>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">2. Reduce Max Tokens</h4>
                        <p className="text-sm text-zinc-400 mb-2">Lower token limits mean faster responses:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <pre className="text-zinc-300">{`{
  "max_tokens": 2048  // Default is 4096
}`}</pre>
                        </div>
                        <p className="text-sm text-zinc-400 mt-2">Use 1024-2048 for quick tasks, 4096+ for complex operations</p>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">3. Use Streaming Responses</h4>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Codentis streams responses by default, showing results as they're generated. This makes the experience feel faster even if total time is the same.</p>
                      </div>

                      <div className="border-l-2 border-cyan-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">4. Optimize System Prompts</h4>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Shorter system prompts = faster processing. Keep project context concise and relevant.</p>
                      </div>
                    </div>
                  </div>

                  {/* Cost Optimization */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Cost Optimization</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Reduce API costs while maintaining quality:
                    </p>

                    <div className="space-y-4">
                      <div className="border-l-2 border-green-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">1. Choose Cost-Effective Models</h4>
                        <div className="bg-black/50 p-3 rounded-lg text-sm mb-2">
                          <div className="text-zinc-400">Most Expensive → Least Expensive:</div>
                          <div className="text-red-400 mt-1">• GPT-5.2, Claude Opus (~$0.03/1K tokens)</div>
                          <div className="text-yellow-400">• GPT-4o, Claude Sonnet (~$0.003-0.01/1K)</div>
                          <div className="text-green-400">• Gemini Pro, DeepSeek (~$0.001-0.002/1K)</div>
                          <div className="text-cyan-400">• Ollama (Local) - Free</div>
                        </div>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Use cheaper models for development, expensive ones for production.</p>
                      </div>

                      <div className="border-l-2 border-green-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">2. Limit Context Size</h4>
                        <p className="text-sm text-zinc-400 mb-2">Reduce the amount of code sent to the AI:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <pre className="text-zinc-300">{`{
  "max_file_size": 50000,  // Skip files larger than 50KB
  "excluded_dirs": ["node_modules", "dist", "build"]
}`}</pre>
                        </div>
                      </div>

                      <div className="border-l-2 border-green-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">3. Use OpenRouter for Best Prices</h4>
                        <p className="text-[13px] sm:text-sm text-zinc-400">OpenRouter often offers lower prices than direct APIs and shows cost per request.</p>
                      </div>

                      <div className="border-l-2 border-green-400/30 pl-4">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">4. Monitor Usage</h4>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Check your API provider dashboard regularly to track spending and set budget alerts.</p>
                      </div>
                    </div>
                  </div>

                  {/* Memory & Resource Management */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Memory & Resource Management</h3>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">File Size Limits</h4>
                        <p className="text-sm text-zinc-400 mb-2">Prevent Codentis from reading huge files that slow down processing:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <pre className="text-zinc-300">{`{
  "max_file_size": 100000,  // 100KB limit
  "excluded_files": ["*.log", "*.min.js", "*.bundle.js"]
}`}</pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">Directory Exclusions</h4>
                        <p className="text-sm text-zinc-400 mb-2">Skip directories that don't need AI analysis:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <pre className="text-zinc-300">{`{
  "excluded_dirs": [
    "node_modules",
    "venv",
    "__pycache__",
    ".git",
    "dist",
    "build",
    ".next",
    "coverage"
  ]
}`}</pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">Conversation History</h4>
                        <p className="text-sm text-zinc-400 mb-2">Clear conversation history when it gets too long:</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <div className="text-zinc-500">❯ /clear</div>
                          <div className="text-cyan-400 mt-1">✓ Conversation history cleared</div>
                        </div>
                        <p className="text-sm text-zinc-400 mt-2">Long conversations consume more tokens and slow down responses.</p>
                      </div>
                    </div>
                  </div>

                  {/* Model-Specific Optimizations */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Model-Specific Optimizations</h3>

                    <div className="space-y-4">
                      <div className="p-4 border border-white/[0.05] bg-black/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <RiClaudeLine className="text-cyan-400 text-xl" />
                          <h4 className="text-sm font-semibold text-zinc-300">Claude (Anthropic)</h4>
                        </div>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• Use Sonnet for best speed/quality balance</li>
                          <li>• Excellent at following instructions precisely</li>
                          <li>• Lower temperature (0.5-0.7) for consistent output</li>
                          <li>• Great for production use</li>
                        </ul>
                      </div>

                      <div className="p-4 border border-white/[0.05] bg-black/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <RiOpenaiFill className="text-cyan-400 text-xl" />
                          <h4 className="text-sm font-semibold text-zinc-300">GPT (OpenAI)</h4>
                        </div>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• GPT-4o for fast, high-quality responses</li>
                          <li>• o3-mini for quick reasoning tasks</li>
                          <li>• Higher temperature (0.7-0.9) for creative tasks</li>
                          <li>• Best for complex problem solving</li>
                        </ul>
                      </div>

                      <div className="p-4 border border-white/[0.05] bg-black/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <RiGeminiFill className="text-cyan-400 text-xl" />
                          <h4 className="text-sm font-semibold text-zinc-300">Gemini (Google)</h4>
                        </div>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• Flash model for fastest responses</li>
                          <li>• Pro for long context (up to 1M tokens)</li>
                          <li>• Very cost-effective</li>
                          <li>• Good for large codebases</li>
                        </ul>
                      </div>

                      <div className="p-4 border border-white/[0.05] bg-black/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <RiGeminiLine className="text-cyan-400 text-xl" />
                          <h4 className="text-sm font-semibold text-zinc-300">Ollama (Local)</h4>
                        </div>
                        <ul className="text-[13px] sm:text-sm text-zinc-400 space-y-1">
                          <li>• Use GPU acceleration for 10x speed boost</li>
                          <li>• Smaller models (7B-13B) for faster inference</li>
                          <li>• Quantized models (Q4, Q5) for less memory</li>
                          <li>• Best for offline/privacy-focused work</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Network Optimization */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Network Optimization</h3>

                    <div className="space-y-3 text-sm text-zinc-400">
                      <div className="flex gap-3">
                        <span className="text-cyan-400">•</span>
                        <div>
                          <p className="text-zinc-300 font-semibold mb-1">Use Wired Connection</p>
                          <p>Ethernet is faster and more stable than Wi-Fi for API calls.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="text-cyan-400">•</span>
                        <div>
                          <p className="text-zinc-300 font-semibold mb-1">Choose Nearby Regions</p>
                          <p>Some providers let you choose API regions. Select the closest one to reduce latency.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="text-cyan-400">•</span>
                        <div>
                          <p className="text-zinc-300 font-semibold mb-1">Check Network Speed</p>
                          <p>Slow internet? Use smaller models or local Ollama to avoid timeouts.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="text-cyan-400">•</span>
                        <div>
                          <p className="text-zinc-300 font-semibold mb-1">Avoid VPNs When Possible</p>
                          <p>VPNs add latency. Disable if not needed for security.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Benchmarks */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-cyan-400">Performance Benchmarks</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Typical response times for common operations (with good internet):
                    </p>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-zinc-400">
                        <thead>
                          <tr className="border-b border-white/[0.05]">
                            <th className="text-left py-2 px-2 text-zinc-300">Operation</th>
                            <th className="text-left py-2 px-2 text-zinc-300">Fast Model</th>
                            <th className="text-left py-2 px-2 text-zinc-300">Slow Model</th>
                            <th className="text-left py-2 px-2 text-zinc-300">Local (GPU)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-white/[0.05]">
                            <td className="py-2 px-2">Simple question</td>
                            <td className="py-2 px-2 text-green-400">1-2s</td>
                            <td className="py-2 px-2 text-yellow-400">3-5s</td>
                            <td className="py-2 px-2 text-yellow-400">5-10s</td>
                          </tr>
                          <tr className="border-b border-white/[0.05]">
                            <td className="py-2 px-2">Code generation</td>
                            <td className="py-2 px-2 text-green-400">3-5s</td>
                            <td className="py-2 px-2 text-yellow-400">8-12s</td>
                            <td className="py-2 px-2 text-red-400">15-30s</td>
                          </tr>
                          <tr className="border-b border-white/[0.05]">
                            <td className="py-2 px-2">File analysis</td>
                            <td className="py-2 px-2 text-green-400">2-4s</td>
                            <td className="py-2 px-2 text-yellow-400">5-8s</td>
                            <td className="py-2 px-2 text-yellow-400">10-20s</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-2">Complex refactoring</td>
                            <td className="py-2 px-2 text-yellow-400">8-15s</td>
                            <td className="py-2 px-2 text-red-400">20-40s</td>
                            <td className="py-2 px-2 text-red-400">60-120s</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-sm text-zinc-400 mt-3 italic">Fast models: Claude Sonnet, GPT-4o, Gemini Flash. Slow models: Claude Opus, GPT-5.2, o3.</p>
                  </div>

                  {/* Recommended Configurations */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Recommended Configurations</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">For Speed (Development)</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <pre className="text-zinc-300">{`{
  "provider": "anthropic",
  "model": "claude-sonnet-4.6",
  "temperature": 0.6,
  "max_tokens": 2048,
  "auto_approve_read": true
}`}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">For Cost (Budget-Conscious)</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <pre className="text-zinc-300">{`{
  "provider": "openrouter",
  "model": "deepseek/deepseek-v3",
  "temperature": 0.7,
  "max_tokens": 2048,
  "excluded_dirs": ["node_modules", "dist"]
}`}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">For Quality (Production)</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <pre className="text-zinc-300">{`{
  "provider": "anthropic",
  "model": "claude-opus-4.6",
  "temperature": 0.5,
  "max_tokens": 4096,
  "system_prompt": "Follow our coding standards..."
}`}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">For Privacy (Offline)</p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-sm">
                          <pre className="text-zinc-300">{`{
  "provider": "custom",
  "api_base": "http://localhost:11434/v1",
  "model": "llama3",
  "temperature": 0.7,
  "max_tokens": 2048
}`}</pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Troubleshooting Performance Issues */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Troubleshooting Performance Issues</h3>

                    <div className="space-y-3">
                      <div className="bg-red-500/5 border border-red-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-red-400 mb-1">Slow Responses</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Switch to a faster model (Sonnet, GPT-4o, Flash)</li>
                          <li>• Reduce max_tokens to 2048 or lower</li>
                          <li>• Clear conversation history with <code className="text-cyan-300 bg-black/50 px-1 rounded">/clear</code></li>
                          <li>• Check your internet speed</li>
                        </ul>
                      </div>

                      <div className="bg-red-500/5 border border-red-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-red-400 mb-1">High API Costs</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Use cheaper models (DeepSeek, Gemini, Claude Sonnet)</li>
                          <li>• Exclude large directories from context</li>
                          <li>• Set max_file_size limit</li>
                          <li>• Consider Ollama for local inference</li>
                        </ul>
                      </div>

                      <div className="bg-red-500/5 border border-red-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-red-400 mb-1">Timeouts</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Reduce max_tokens significantly</li>
                          <li>• Avoid reading very large files</li>
                          <li>• Check network connection stability</li>
                          <li>• Try a different API provider</li>
                        </ul>
                      </div>

                      <div className="bg-red-500/5 border border-red-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-red-400 mb-1">Memory Issues (Local Models)</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Use smaller models (7B instead of 70B)</li>
                          <li>• Use quantized models (Q4_K_M)</li>
                          <li>• Close other applications</li>
                          <li>• Upgrade RAM if running large models</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Monitoring & Metrics */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Monitoring & Metrics</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Track performance to identify bottlenecks:
                    </p>

                    <div className="space-y-2 text-sm text-zinc-400">
                      <div className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span><strong className="text-zinc-300">Response Time:</strong> Time from request to first token (should be &lt;2s for fast models)</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span><strong className="text-zinc-300">Token Usage:</strong> Check provider dashboard for input/output token counts</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span><strong className="text-zinc-300">API Costs:</strong> Monitor daily/monthly spending in provider dashboard</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span><strong className="text-zinc-300">Error Rate:</strong> Track failed requests and timeouts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Best Practices */}
            {activeSection === "security" && (
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-cyan-400/80">Advanced</span>
                  <h1 className="text-xl sm:text-3xl font-semibold mt-3 mb-4">Security Best Practices</h1>
                  <p className="text-[13px] sm:text-sm text-zinc-400">
                    Keep your code, credentials, and development environment secure when using Codentis. Follow these best practices to protect sensitive information and maintain a secure workflow.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* API Key Security */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">API Key Security</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Your API keys are sensitive credentials that must be protected:
                    </p>

                    <div className="space-y-3">
                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Store Keys Securely</p>
                        <p className="text-sm text-zinc-400 mb-2">Keep API keys in user-level config, never in project files:</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm">
                          <div className="text-green-400">✓ ~/.codentis/config.json (user config)</div>
                          <div className="text-red-400 mt-1">✗ .codentis/config.json (project config)</div>
                          <div className="text-red-400">✗ Hardcoded in code</div>
                        </div>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Use Environment Variables</p>
                        <p className="text-sm text-zinc-400 mb-2">For CI/CD or shared environments:</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm">
                          <div className="text-white">export OPENAI_API_KEY="sk-..."</div>
                          <div className="text-white">export ANTHROPIC_API_KEY="sk-ant-..."</div>
                        </div>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Rotate Keys Regularly</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Generate new API keys every 3-6 months and revoke old ones immediately if compromised.</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Use Key Restrictions</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">If your provider supports it, restrict API keys to specific IP addresses or usage limits.</p>
                      </div>

                      <div className="bg-red-500/5 border border-red-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-red-400 mb-1">✗ Never Commit Keys to Git</p>
                        <p className="text-sm text-zinc-400 mb-2">Add config files with keys to .gitignore:</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm">
                          <div className="text-zinc-500"># .gitignore</div>
                          <div className="text-white">.codentis/config.json</div>
                          <div className="text-white">.env</div>
                          <div className="text-white">*.key</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Workspace Trust */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Workspace Trust Management</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Use workspace trust to control which directories Codentis can access:
                    </p>

                    <div className="space-y-3">
                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Only Trust Your Own Projects</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Don't trust directories with code from unknown sources or downloaded projects until you've reviewed them.</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Review Trust List Regularly</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm mt-2">
                          <div className="text-white">$ codentis trust list</div>
                          <div className="text-zinc-400 mt-1"># Review and remove old/unused directories</div>
                        </div>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Use Separate Workspaces</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Keep personal projects, work projects, and experimental code in separate directories with different trust settings.</p>
                      </div>

                      <div className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-yellow-400 mb-1">⚠ Be Cautious with Production Code</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Consider using read-only access or manual review for production codebases. Test changes in development first.</p>
                      </div>
                    </div>
                  </div>

                  {/* Command Approval */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Shell Command Approval</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Always review shell commands before approving them:
                    </p>

                    <div className="space-y-3">
                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Read Commands Carefully</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Understand what each command does before approving. If unsure, research it or ask for clarification.</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Watch for Dangerous Operations</p>
                        <p className="text-sm text-zinc-400 mb-2">Be extra cautious with:</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• <code className="text-red-300 bg-black/50 px-1 rounded">rm -rf</code> - Recursive deletion</li>
                          <li>• <code className="text-red-300 bg-black/50 px-1 rounded">sudo</code> - Elevated privileges</li>
                          <li>• <code className="text-red-300 bg-black/50 px-1 rounded">chmod 777</code> - Overly permissive</li>
                          <li>• <code className="text-red-300 bg-black/50 px-1 rounded">curl | bash</code> - Executing remote scripts</li>
                          <li>• Commands modifying system files</li>
                        </ul>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Disable Auto-Approve for Sensitive Projects</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm mt-2">
                          <pre className="text-zinc-300">{`{
  "auto_approve_read": false  // Require approval for all commands
}`}</pre>
                        </div>
                      </div>

                      <div className="bg-red-500/5 border border-red-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-red-400 mb-1">✗ Never Blindly Approve</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Don't approve commands without reading them, even if they seem routine. Malicious code can hide in seemingly innocent commands.</p>
                      </div>
                    </div>
                  </div>

                  {/* Code Review */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">AI-Generated Code Review</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Always review code generated by Codentis before using it:
                    </p>

                    <div className="space-y-3">
                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Review All Changes</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Use <code className="text-cyan-300 bg-black/50 px-1 rounded">/e #ID</code> to expand tool outputs and review file changes before committing.</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Test Generated Code</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Run tests, check for errors, and verify functionality before deploying AI-generated code to production.</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Check for Security Issues</p>
                        <p className="text-sm text-zinc-400 mb-2">Look for common vulnerabilities:</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• SQL injection vulnerabilities</li>
                          <li>• Hardcoded credentials or secrets</li>
                          <li>• Insecure API endpoints</li>
                          <li>• Missing input validation</li>
                          <li>• Unsafe file operations</li>
                        </ul>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Use Version Control</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Commit changes incrementally so you can easily revert if something goes wrong. Use meaningful commit messages.</p>
                      </div>
                    </div>
                  </div>

                  {/* Data Privacy */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Data Privacy & Confidentiality</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Understand what data is sent to AI providers:
                    </p>

                    <div className="space-y-3">
                      <div className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-yellow-400 mb-1">⚠ What Gets Sent to AI</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Your prompts and questions</li>
                          <li>• File contents that Codentis reads</li>
                          <li>• Code snippets and context</li>
                          <li>• Tool outputs and results</li>
                          <li>• Conversation history</li>
                        </ul>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Use Local Models for Sensitive Code</p>
                        <p className="text-sm text-zinc-400 mb-2">For proprietary or confidential code, use Ollama to run models locally:</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm">
                          <pre className="text-zinc-300">{`{
  "provider": "custom",
  "api_base": "http://localhost:11434/v1",
  "model": "llama3"
}`}</pre>
                        </div>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Exclude Sensitive Files</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm mt-2">
                          <pre className="text-zinc-300">{`{
  "excluded_files": [
    "*.key",
    "*.pem",
    ".env",
    "secrets.json",
    "credentials.yaml"
  ]
}`}</pre>
                        </div>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Review Provider Privacy Policies</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Understand how your AI provider handles data. Some providers don't train on API data, others do.</p>
                      </div>

                      <div className="bg-red-500/5 border border-red-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-red-400 mb-1">✗ Don't Share Customer Data</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Never include real customer data, PII, or confidential business information in prompts or code shared with AI.</p>
                      </div>
                    </div>
                  </div>

                  {/* Network Security */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Network Security</h3>

                    <div className="space-y-3">
                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Use HTTPS Only</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Codentis uses HTTPS for all API communications. Never configure custom endpoints with HTTP.</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Secure Your Network</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Use secure Wi-Fi networks. Avoid public Wi-Fi when working with sensitive code or using API keys.</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Use VPN for Public Networks</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">If you must use public Wi-Fi, connect through a trusted VPN to encrypt your traffic.</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Keep Firewall Enabled</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Ensure your system firewall is active to protect against unauthorized network access.</p>
                      </div>
                    </div>
                  </div>

                  {/* Access Control */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Access Control & Permissions</h3>

                    <div className="space-y-3">
                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Use Separate API Keys per Environment</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Different keys for development, staging, and production. Revoke compromised keys immediately.</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Limit File Permissions</p>
                        <p className="text-sm text-zinc-400 mb-2">Protect config files with restricted permissions:</p>
                        <div className="bg-black/50 p-2 rounded font-mono text-sm">
                          <div className="text-white">$ chmod 600 ~/.codentis/config.json</div>
                        </div>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Use Team Accounts</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">For team projects, use organization API keys with proper access controls rather than personal keys.</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Monitor API Usage</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Regularly check your API provider dashboard for unusual activity or unexpected usage spikes.</p>
                      </div>
                    </div>
                  </div>

                  {/* Incident Response */}
                  <div className="p-6 border border-red-500/20 bg-red-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-red-400">If Your API Key is Compromised</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Take immediate action if you suspect your API key has been exposed:
                    </p>

                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <span className="text-red-400 font-semibold">1.</span>
                        <div>
                          <p className="text-sm font-semibold text-zinc-300 mb-1">Revoke the Key Immediately</p>
                          <p className="text-[13px] sm:text-sm text-zinc-400">Go to your provider dashboard and revoke the compromised key right away.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="text-red-400 font-semibold">2.</span>
                        <div>
                          <p className="text-sm font-semibold text-zinc-300 mb-1">Generate a New Key</p>
                          <p className="text-[13px] sm:text-sm text-zinc-400">Create a new API key and update your Codentis configuration.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="text-red-400 font-semibold">3.</span>
                        <div>
                          <p className="text-sm font-semibold text-zinc-300 mb-1">Check for Unauthorized Usage</p>
                          <p className="text-[13px] sm:text-sm text-zinc-400">Review your API usage logs for any suspicious activity or unexpected charges.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="text-red-400 font-semibold">4.</span>
                        <div>
                          <p className="text-sm font-semibold text-zinc-300 mb-1">Contact Provider Support</p>
                          <p className="text-[13px] sm:text-sm text-zinc-400">If you see unauthorized usage, contact your provider's support team immediately.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="text-red-400 font-semibold">5.</span>
                        <div>
                          <p className="text-sm font-semibold text-zinc-300 mb-1">Review Git History</p>
                          <p className="text-[13px] sm:text-sm text-zinc-400">Check if the key was committed to git. If so, consider the repository compromised and rotate all secrets.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Checklist */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-cyan-400">Security Checklist</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Use this checklist to ensure you're following security best practices:
                    </p>

                    <div className="space-y-2 text-sm text-zinc-400">
                      <div className="flex gap-2">
                        <span className="text-cyan-400">☐</span>
                        <span>API keys stored in user config, not project files</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">☐</span>
                        <span>Config files with keys added to .gitignore</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">☐</span>
                        <span>Only trusted workspaces have file access</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">☐</span>
                        <span>Shell command approval enabled for write operations</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">☐</span>
                        <span>Sensitive files excluded from AI context</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">☐</span>
                        <span>Using local models for confidential code</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">☐</span>
                        <span>Regular API key rotation schedule</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">☐</span>
                        <span>Monitoring API usage for anomalies</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">☐</span>
                        <span>All AI-generated code reviewed before deployment</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">☐</span>
                        <span>Using version control for all changes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ */}
            {activeSection === "faq" && (
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-cyan-400/80">Support & Resources</span>
                  <h1 className="text-xl sm:text-3xl font-semibold mt-3 mb-4">Frequently Asked Questions</h1>
                  <p className="text-[13px] sm:text-sm text-zinc-400">
                    Quick answers to common questions about Codentis. Can't find what you're looking for? Check the Troubleshooting section or reach out to the community.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* General Questions */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4 text-cyan-400">General Questions</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">What is Codentis?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Codentis is an intelligent CLI AI agent that helps developers write, debug, and understand code directly from the terminal. It uses Large Language Models (LLMs) to provide context-aware assistance with file operations, code generation, and project management.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Is Codentis free?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Codentis itself is free and open-source. However, you'll need an API key from an AI provider (OpenAI, Anthropic, etc.) which has its own pricing. Alternatively, you can use Ollama to run models locally for free.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">What programming languages does Codentis support?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Codentis works with any programming language. The AI models it uses are trained on code from virtually all popular languages including Python, JavaScript, TypeScript, Java, C++, Go, Rust, and many more.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Can I use Codentis offline?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Yes! Use Ollama to run AI models locally on your machine. This requires no internet connection and keeps all your code private. However, local models are generally slower and less capable than cloud-based options.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Is my code sent to the AI provider?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Yes, when you use cloud-based AI providers (OpenAI, Anthropic, etc.), the code you ask Codentis to read or analyze is sent to their APIs. For sensitive code, use local models with Ollama or exclude sensitive files from context.</p>
                      </div>
                    </div>
                  </div>

                  {/* Installation & Setup */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4 text-cyan-400">Installation & Setup</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Which AI provider should I choose?</p>
                        <p className="text-sm text-zinc-400 mb-2">It depends on your needs:</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• <strong>Claude (Anthropic)</strong> - Best for production, excellent balance of quality and cost</li>
                          <li>• <strong>OpenAI</strong> - Best for advanced reasoning and complex problems</li>
                          <li>• <strong>Gemini</strong> - Best for long context and cost-effectiveness</li>
                          <li>• <strong>Ollama</strong> - Best for privacy and offline use</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">How do I get an API key?</p>
                        <p className="text-sm text-zinc-400 mb-2">Visit your chosen provider's website:</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• OpenAI: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">platform.openai.com/api-keys</a></li>
                          <li>• Anthropic: <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">console.anthropic.com</a></li>
                          <li>• OpenRouter: <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">openrouter.ai</a></li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Can I switch AI providers later?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Yes! Run <code className="text-cyan-300 bg-black/50 px-1 rounded">codentis config</code> anytime to change your provider, model, or other settings. Your conversation history and trusted workspaces are preserved.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Do I need Python installed?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">No. The standalone installers for Windows, macOS, and Linux include everything you need. Python is only required if you're installing from source with pip.</p>
                      </div>
                    </div>
                  </div>

                  {/* Usage & Features */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4 text-cyan-400">Usage & Features</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">How do I see what tools are available?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Type <code className="text-cyan-300 bg-black/50 px-1 rounded">/list</code> in a Codentis session to see all available tools including built-in and custom tools.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Can Codentis run tests or build my project?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Yes! Codentis can execute shell commands including running tests, building projects, installing dependencies, and more. You'll be asked to approve commands that modify your system.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">How do I clear the conversation history?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Type <code className="text-cyan-300 bg-black/50 px-1 rounded">/clear</code> to clear the conversation history. This can help improve performance and reduce token usage for long sessions.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Can I use Codentis with multiple projects?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Yes! Each project can have its own configuration in <code className="text-cyan-300 bg-black/50 px-1 rounded">.codentis/config.json</code>. You can use different models, settings, or even different AI providers for different projects.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">How do I expand collapsed tool outputs?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Use <code className="text-cyan-300 bg-black/50 px-1 rounded">/e #ID</code> where ID is the tool number shown in the output. For example, <code className="text-cyan-300 bg-black/50 px-1 rounded">/e 3</code> expands tool output #3.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Can Codentis work with Git?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Yes! Codentis can run git commands, check status, create branches, commit changes, and more. It's recommended to review all changes before committing.</p>
                      </div>
                    </div>
                  </div>

                  {/* Performance & Cost */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4 text-cyan-400">Performance & Cost</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Why are responses slow?</p>
                        <p className="text-sm text-zinc-400 mb-2">Several factors affect speed:</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Model choice (Opus is slower than Sonnet)</li>
                          <li>• Internet connection speed</li>
                          <li>• Request complexity and context size</li>
                          <li>• API provider load</li>
                        </ul>
                        <p className="text-sm text-zinc-400 mt-2">Try using faster models like Claude Sonnet, GPT-4o, or Gemini Flash.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">How much does it cost to use Codentis?</p>
                        <p className="text-sm text-zinc-400 mb-2">Costs vary by provider and usage:</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Claude Sonnet: ~$0.003-0.015 per 1K tokens</li>
                          <li>• GPT-4o: ~$0.005-0.015 per 1K tokens</li>
                          <li>• Gemini: ~$0.001-0.005 per 1K tokens</li>
                          <li>• Ollama: Free (local)</li>
                        </ul>
                        <p className="text-sm text-zinc-400 mt-2">Typical usage: $5-20/month for regular development work.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">How can I reduce API costs?</p>
                        <p className="text-sm text-zinc-400 mb-2">Several strategies:</p>
                        <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                          <li>• Use cheaper models (DeepSeek, Gemini)</li>
                          <li>• Exclude large directories from context</li>
                          <li>• Set max_tokens limit</li>
                          <li>• Clear conversation history regularly</li>
                          <li>• Use Ollama for development</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Can I set a spending limit?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Yes, but this is configured in your AI provider's dashboard, not in Codentis. Most providers let you set monthly spending limits and usage alerts.</p>
                      </div>
                    </div>
                  </div>

                  {/* Security & Privacy */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4 text-cyan-400">Security & Privacy</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Is Codentis safe to use?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Yes. Codentis includes security features like workspace trust and command approval. However, always review AI-generated code before using it in production and never share sensitive credentials with the AI.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Where are my API keys stored?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">API keys are stored in <code className="text-cyan-300 bg-black/50 px-1 rounded">~/.codentis/config.json</code> on your local machine. This file should never be committed to version control.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Can I use Codentis for proprietary code?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Yes, but be aware that code sent to cloud AI providers may be subject to their data policies. For maximum privacy with proprietary code, use Ollama to run models locally.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">What is workspace trust?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Workspace trust is a security feature that requires you to explicitly approve directories before Codentis can access files. This prevents accidental modifications to important files.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Does Codentis train on my code?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Codentis itself doesn't train on anything. However, your AI provider's policies determine if they use API data for training. Most providers (OpenAI, Anthropic) don't train on API data, but check their policies to be sure.</p>
                      </div>
                    </div>
                  </div>

                  {/* Troubleshooting */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4 text-cyan-400">Troubleshooting</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Codentis command not found after installation</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Restart your terminal or log out and back in. The PATH may not be updated in your current session. If the issue persists, check the Installation section for platform-specific troubleshooting.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">API authentication errors</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Check that your API key is correct and hasn't expired. Run <code className="text-cyan-300 bg-black/50 px-1 rounded">codentis config --show</code> to verify your configuration, then <code className="text-cyan-300 bg-black/50 px-1 rounded">codentis config</code> to update it.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Connection timeouts</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Check your internet connection. If using a VPN, try disabling it. You can also try switching to a different AI provider or using a faster model.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Tool not working as expected</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Use <code className="text-cyan-300 bg-black/50 px-1 rounded">/e #ID</code> to expand the tool output and see detailed error messages. This often reveals what went wrong.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Where can I get more help?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Check the <button onClick={() => setActiveSection("troubleshooting")} className="text-cyan-400 hover:text-cyan-300 underline">Troubleshooting</button> section for detailed solutions, or visit the <a href="https://github.com/sujal-GITHUB/Codentis/issues" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">GitHub Issues</a> page to report bugs or ask questions.</p>
                      </div>
                    </div>
                  </div>

                  {/* Advanced Topics */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4 text-cyan-400">Advanced Topics</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Can I create custom tools?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Yes! Create Python tools in <code className="text-cyan-300 bg-black/50 px-1 rounded">.codentis/tools/</code> that extend Codentis with custom functionality. See the <button onClick={() => setActiveSection("custom-tools")} className="text-cyan-400 hover:text-cyan-300 underline">Custom Tools</button> section for details.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">How do I use different models for different projects?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Create a <code className="text-cyan-300 bg-black/50 px-1 rounded">.codentis/config.json</code> file in each project with project-specific settings. These override your user-level configuration. See <button onClick={() => setActiveSection("project-config")} className="text-cyan-400 hover:text-cyan-300 underline">Project Configuration</button>.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Can I use Codentis in CI/CD pipelines?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Yes, but be cautious. Set API keys via environment variables and use non-interactive mode. Consider the cost implications of running AI operations in CI/CD.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Does Codentis support team collaboration?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Yes! Commit project-level configs to git so your team uses the same settings. Each team member needs their own API key in their user config.</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Can I contribute to Codentis?</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Absolutely! Codentis is open-source. Visit the <a href="https://github.com/sujal-GITHUB/Codentis" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">GitHub repository</a> to report issues, suggest features, or submit pull requests.</p>
                      </div>
                    </div>
                  </div>

                  {/* Still Have Questions? */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-cyan-400">Still Have Questions?</h3>
                    <p className="text-sm text-zinc-400 mb-4">
                      Can't find the answer you're looking for? Here are some resources:
                    </p>

                    <div className="space-y-2 text-sm text-zinc-400">
                      <div className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>Check the <button onClick={() => setActiveSection("troubleshooting")} className="text-cyan-400 hover:text-cyan-300 underline">Troubleshooting</button> section for detailed solutions</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>Browse <a href="https://github.com/sujal-GITHUB/Codentis/issues" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">GitHub Issues</a> for similar questions</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>Read the <a href="https://github.com/sujal-GITHUB/Codentis" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">README</a> and documentation on GitHub</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>Create a new <a href="https://github.com/sujal-GITHUB/Codentis/issues/new" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">GitHub Issue</a> with your question</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Examples & Recipes */}
            {activeSection === "examples" && (
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-cyan-400/80">Support & Resources</span>
                  <h1 className="text-xl sm:text-3xl font-semibold mt-3 mb-4">Examples & Recipes</h1>
                  <p className="text-[13px] sm:text-sm text-zinc-400">
                    Practical examples and workflows for common development tasks. Copy these prompts and adapt them to your needs.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Quick Start Examples */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-cyan-400">Quick Start Examples</h3>
                    <p className="text-sm text-zinc-400 mb-4">
                      Simple prompts to get started with Codentis:
                    </p>

                    <div className="space-y-3">
                      <div className="bg-black/50 p-3 rounded-lg">
                        <p className="text-sm text-zinc-500 mb-1">❯ Create a simple web server</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">"Create a Python Flask web server with a hello world endpoint"</p>
                      </div>

                      <div className="bg-black/50 p-3 rounded-lg">
                        <p className="text-sm text-zinc-500 mb-1">❯ Add error handling</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">"Add try-catch error handling to all functions in app.js"</p>
                      </div>

                      <div className="bg-black/50 p-3 rounded-lg">
                        <p className="text-sm text-zinc-500 mb-1">❯ Generate documentation</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">"Create a README.md with installation instructions and usage examples"</p>
                      </div>

                      <div className="bg-black/50 p-3 rounded-lg">
                        <p className="text-sm text-zinc-500 mb-1">❯ Find and fix bugs</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">"Find the bug causing the TypeError in utils.py and fix it"</p>
                      </div>
                    </div>
                  </div>

                  {/* Web Development */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Web Development Recipes</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Create a REST API</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Create a REST API with Express.js that has CRUD endpoints for a 'users' resource. Include input validation, error handling, and use async/await."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Add Authentication</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Add JWT authentication to my Express API. Create login and register endpoints, and add middleware to protect routes."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Build a React Component</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Create a React component for a user profile card with avatar, name, bio, and social links. Use TypeScript and Tailwind CSS. Make it responsive."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Database Integration</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Add PostgreSQL database integration using Prisma. Create a User model with email, password, and profile fields. Generate migrations."</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Python Development */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Python Development Recipes</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Data Processing Script</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Create a Python script that reads a CSV file, cleans the data (remove duplicates, handle missing values), and exports to JSON. Use pandas."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">API Client</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Create a Python class that wraps the GitHub API. Include methods to get user info, list repos, and create issues. Use requests library with proper error handling."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">CLI Tool</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Create a CLI tool using Click that converts images to different formats. Support PNG, JPG, and WebP. Add progress bars and error handling."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Unit Tests</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Write pytest unit tests for all functions in calculator.py. Include edge cases, error conditions, and use fixtures for setup."</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DevOps & Automation */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">DevOps & Automation Recipes</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Docker Setup</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Create a Dockerfile for my Node.js app. Use multi-stage build, include health check, and optimize for production. Also create docker-compose.yml with PostgreSQL."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">CI/CD Pipeline</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Create a GitHub Actions workflow that runs tests, builds Docker image, and deploys to production on push to main branch."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Deployment Script</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Create a bash script that deploys my app to AWS EC2. Include steps for pulling code, installing dependencies, running migrations, and restarting the service."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Monitoring Setup</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Add logging and monitoring to my Express app. Use Winston for logging and create middleware to track request duration and errors."</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Code Refactoring */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Code Refactoring Recipes</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Convert to TypeScript</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Convert all JavaScript files in the src/ directory to TypeScript. Add proper type annotations and interfaces."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Extract Reusable Functions</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Refactor app.js to extract repeated code into reusable utility functions. Create a utils.js file for these functions."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Improve Performance</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Analyze data_processor.py for performance bottlenecks. Optimize slow operations using caching, vectorization, or parallel processing."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Add Type Safety</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Add Python type hints to all functions in the codebase. Use typing module for complex types like List, Dict, Optional."</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Documentation */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Documentation Recipes</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">API Documentation</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Generate API documentation for all endpoints in routes/. Include request/response examples, status codes, and authentication requirements."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Code Comments</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Add JSDoc comments to all functions in utils.js. Include parameter types, return types, and usage examples."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">README Generator</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Create a comprehensive README.md with project description, installation steps, usage examples, API reference, and contribution guidelines."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Changelog</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Generate a CHANGELOG.md from git commits. Group by version, categorize as features, fixes, and breaking changes."</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Testing */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Testing Recipes</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Unit Tests</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Write Jest unit tests for UserService.js. Test all methods including success cases, error cases, and edge cases. Use mocks for database calls."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Integration Tests</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Create integration tests for the authentication flow. Test registration, login, token refresh, and logout using supertest."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">E2E Tests</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Write Playwright E2E tests for the checkout flow. Test adding items to cart, filling shipping info, and completing payment."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Test Coverage</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Run test coverage report and identify untested code. Write tests for functions with less than 80% coverage."</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Debugging */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Debugging Recipes</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Find Memory Leaks</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Analyze server.js for potential memory leaks. Look for event listeners not being removed, closures holding references, and unclosed connections."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Fix Race Conditions</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Find and fix race conditions in async_handler.py. Add proper locking or use async/await correctly to prevent concurrent access issues."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Add Logging</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Add comprehensive logging to payment_processor.js. Log all steps, errors, and important state changes. Use different log levels appropriately."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Error Analysis</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Analyze the error logs in error.log and identify the root cause. Suggest fixes for the most common errors."</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Setup */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-4">Project Setup Recipes</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Initialize New Project</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Set up a new Next.js 14 project with TypeScript, Tailwind CSS, ESLint, and Prettier. Create a basic folder structure with components, pages, and utils."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Add Linting</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Configure ESLint and Prettier for my React project. Add pre-commit hooks using Husky to run linting before commits."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Environment Setup</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Create .env.example with all required environment variables. Add validation to check for missing variables on startup."</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-cyan-400 mb-2">Git Configuration</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Prompt:</p>
                          <p className="text-zinc-400">"Create a comprehensive .gitignore for a Node.js project. Include common patterns for dependencies, build outputs, logs, and environment files."</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Advanced Workflows */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-cyan-400">Advanced Workflows</h3>
                    <p className="text-sm text-zinc-400 mb-4">
                      Complex multi-step workflows combining multiple operations:
                    </p>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Full Feature Implementation</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Multi-step prompt:</p>
                          <ol className="text-zinc-400 space-y-1 ml-4">
                            <li>1. "Create a user authentication system with registration and login"</li>
                            <li>2. "Add password reset functionality with email verification"</li>
                            <li>3. "Write unit tests for all auth functions"</li>
                            <li>4. "Add API documentation for auth endpoints"</li>
                            <li>5. "Create a React login form component"</li>
                          </ol>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Code Migration</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Multi-step prompt:</p>
                          <ol className="text-zinc-400 space-y-1 ml-4">
                            <li>1. "Analyze the current codebase structure"</li>
                            <li>2. "Create a migration plan from JavaScript to TypeScript"</li>
                            <li>3. "Convert files one by one, starting with utilities"</li>
                            <li>4. "Update imports and fix type errors"</li>
                            <li>5. "Run tests to verify everything works"</li>
                          </ol>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-zinc-300 mb-2">Performance Optimization</p>
                        <div className="bg-black/50 p-3 rounded-lg text-sm">
                          <p className="text-zinc-500 mb-2">❯ Multi-step prompt:</p>
                          <ol className="text-zinc-400 space-y-1 ml-4">
                            <li>1. "Profile the application to find slow operations"</li>
                            <li>2. "Optimize database queries with indexes and caching"</li>
                            <li>3. "Add Redis caching for frequently accessed data"</li>
                            <li>4. "Implement lazy loading for large datasets"</li>
                            <li>5. "Measure and compare performance improvements"</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tips for Better Results */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Tips for Better Results</h3>

                    <div className="space-y-3">
                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Be Specific</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Include technology stack, frameworks, and specific requirements. "Create a React component" vs "Create a React component with TypeScript, Tailwind, and form validation"</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Provide Context</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Mention existing code structure, naming conventions, or patterns to follow. "Following our existing service pattern in services/"</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Break Down Complex Tasks</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">For large features, work step-by-step. Complete and test each step before moving to the next.</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Iterate and Refine</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">If the first result isn't perfect, ask for adjustments: "Make it more concise", "Add error handling", "Use async/await instead"</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 p-3 rounded">
                        <p className="text-sm font-semibold text-green-400 mb-1">✓ Review and Test</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Always review generated code, run tests, and verify it works as expected before committing.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Community & Support */}
            {activeSection === "community" && (
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-cyan-400/80">Support & Resources</span>
                  <h1 className="text-xl sm:text-3xl font-semibold mt-3 mb-4">Community & Support</h1>
                  <p className="text-[13px] sm:text-sm text-zinc-400">
                    Get help, share ideas, and connect with other Codentis users. We're here to support you on your development journey.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Get Help */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-cyan-400">Get Help</h3>
                    <p className="text-sm text-zinc-400 mb-4">
                      Need assistance? Here's how to get support:
                    </p>

                    <div className="space-y-4">
                      <div className="p-4 border border-white/[0.05] bg-black/30 rounded-lg">
                        <div className="flex items-start gap-3">
                          <RiBookOpenLine className="text-cyan-400 text-2xl" />
                          <div>
                            <h4 className="text-sm font-semibold text-zinc-300 mb-1">Documentation</h4>
                            <p className="text-sm text-zinc-400 mb-2">Start here! Most questions are answered in the docs.</p>
                            <div className="flex flex-wrap gap-2">
                              <button onClick={() => setActiveSection("quickstart")} className="text-sm text-cyan-400 hover:text-cyan-300 underline">Quick Start</button>
                              <span className="text-zinc-600">•</span>
                              <button onClick={() => setActiveSection("troubleshooting")} className="text-sm text-cyan-400 hover:text-cyan-300 underline">Troubleshooting</button>
                              <span className="text-zinc-600">•</span>
                              <button onClick={() => setActiveSection("faq")} className="text-sm text-cyan-400 hover:text-cyan-300 underline">FAQ</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-white/[0.05] bg-black/30 rounded-lg">
                        <div className="flex items-start gap-3">
                          <RiQuestionAnswerLine className="text-cyan-400 text-2xl" />
                          <div>
                            <h4 className="text-sm font-semibold text-zinc-300 mb-1">GitHub Discussions</h4>
                            <p className="text-sm text-zinc-400 mb-2">Ask questions, share tips, and discuss features with the community.</p>
                            <a href="https://github.com/sujal-GITHUB/Codentis/discussions" target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300 underline">
                              Join Discussions →
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-white/[0.05] bg-black/30 rounded-lg">
                        <div className="flex items-start gap-3">
                          <RiBugLine className="text-cyan-400 text-2xl" />
                          <div>
                            <h4 className="text-sm font-semibold text-zinc-300 mb-1">Report Bugs</h4>
                            <p className="text-sm text-zinc-400 mb-2">Found a bug? Create an issue with details about the problem.</p>
                            <a href="https://github.com/sujal-GITHUB/Codentis/issues/new?template=bug_report.md" target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300 underline">
                              Report Bug →
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-white/[0.05] bg-black/30 rounded-lg">
                        <div className="flex items-start gap-3">
                          <RiLightbulbLine className="text-cyan-400 text-2xl" />
                          <div>
                            <h4 className="text-sm font-semibold text-zinc-300 mb-1">Feature Requests</h4>
                            <p className="text-sm text-zinc-400 mb-2">Have an idea? Share your feature suggestions and vote on others.</p>
                            <a href="https://github.com/sujal-GITHUB/Codentis/issues/new?template=feature_request.md" target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300 underline">
                              Request Feature →
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contribute */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Contribute to Codentis</h3>
                    <p className="text-sm text-zinc-400 mb-4">
                      Codentis is open-source and welcomes contributions from the community:
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">Ways to Contribute</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="p-3 border border-white/[0.05] bg-black/30 rounded">
                            <p className="text-sm font-semibold text-zinc-300 mb-1">Code Contributions</p>
                            <p className="text-[13px] sm:text-sm text-zinc-400">Fix bugs, add features, or improve performance. Submit pull requests on GitHub.</p>
                          </div>

                          <div className="p-3 border border-white/[0.05] bg-black/30 rounded">
                            <p className="text-sm font-semibold text-zinc-300 mb-1">Documentation</p>
                            <p className="text-[13px] sm:text-sm text-zinc-400">Improve docs, write tutorials, or create examples to help others.</p>
                          </div>

                          <div className="p-3 border border-white/[0.05] bg-black/30 rounded">
                            <p className="text-sm font-semibold text-zinc-300 mb-1">Testing</p>
                            <p className="text-[13px] sm:text-sm text-zinc-400">Test new features, report bugs, and help verify fixes work correctly.</p>
                          </div>

                          <div className="p-3 border border-white/[0.05] bg-black/30 rounded">
                            <p className="text-sm font-semibold text-zinc-300 mb-1">Community Support</p>
                            <p className="text-[13px] sm:text-sm text-zinc-400">Answer questions, share knowledge, and help other users in discussions.</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">Getting Started with Contributing</h4>
                        <ol className="text-sm text-zinc-400 space-y-2 ml-4">
                          <li>1. Fork the <a href="https://github.com/sujal-GITHUB/Codentis" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">Codentis repository</a></li>
                          <li>2. Create a new branch for your changes</li>
                          <li>3. Make your changes and test thoroughly</li>
                          <li>4. Submit a pull request with a clear description</li>
                          <li>5. Respond to feedback and iterate</li>
                        </ol>
                      </div>

                      <div className="bg-cyan-500/5 border border-cyan-500/20 p-3 rounded">
                        <p className="text-sm text-cyan-400 font-semibold mb-1">First-time contributors welcome!</p>
                        <p className="text-[13px] sm:text-sm text-zinc-400">Look for issues labeled "good first issue" to get started. We're happy to guide you through your first contribution.</p>
                      </div>
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Resources & Links</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-white/[0.05] bg-black/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <RiGithubFill className="text-cyan-400 text-xl" />
                          <h4 className="text-sm font-semibold text-zinc-300">GitHub Repository</h4>
                        </div>
                        <p className="text-sm text-zinc-400 mb-2">Source code, issues, and releases</p>
                        <a href="https://github.com/sujal-GITHUB/Codentis" target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300 underline">
                          github.com/sujal-GITHUB/Codentis
                        </a>
                      </div>

                      <div className="p-4 border border-white/[0.05] bg-black/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <RiFileTextLine className="text-cyan-400 text-xl" />
                          <h4 className="text-sm font-semibold text-zinc-300">Changelog</h4>
                        </div>
                        <p className="text-sm text-zinc-400 mb-2">Version history and release notes</p>
                        <a href="https://github.com/sujal-GITHUB/Codentis/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300 underline">
                          View Changelog
                        </a>
                      </div>

                      <div className="p-4 border border-white/[0.05] bg-black/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <RiRocketLine className="text-cyan-400 text-xl" />
                          <h4 className="text-sm font-semibold text-zinc-300">Releases</h4>
                        </div>
                        <p className="text-sm text-zinc-400 mb-2">Download installers and binaries</p>
                        <a href="https://github.com/sujal-GITHUB/Codentis/releases" target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300 underline">
                          View Releases
                        </a>
                      </div>

                      <div className="p-4 border border-white/[0.05] bg-black/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <RiBookOpenLine className="text-cyan-400 text-xl" />
                          <h4 className="text-sm font-semibold text-zinc-300">Contributing Guide</h4>
                        </div>
                        <p className="text-sm text-zinc-400 mb-2">Guidelines for contributors</p>
                        <a href="https://github.com/sujal-GITHUB/Codentis/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300 underline">
                          Read Guidelines
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Stay Updated */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Stay Updated</h3>
                    <p className="text-sm text-zinc-400 mb-4">
                      Keep up with the latest news, features, and updates:
                    </p>

                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <RiStarLine className="text-cyan-400 text-xl" />
                        <div>
                          <p className="text-sm font-semibold text-zinc-300 mb-1">Star on GitHub</p>
                          <p className="text-[13px] sm:text-sm text-zinc-400">Show your support and get notified of new releases. <a href="https://github.com/sujal-GITHUB/Codentis" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">Star the repo</a></p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <RiEyeLine className="text-cyan-400 text-xl" />
                        <div>
                          <p className="text-sm font-semibold text-zinc-300 mb-1">Watch Repository</p>
                          <p className="text-[13px] sm:text-sm text-zinc-400">Get notifications for new issues, PRs, and discussions on GitHub.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <RiNotificationLine className="text-cyan-400 text-xl" />
                        <div>
                          <p className="text-sm font-semibold text-zinc-300 mb-1">Release Notifications</p>
                          <p className="text-[13px] sm:text-sm text-zinc-400">Enable auto-update in Codentis to get notified of new versions automatically.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Code of Conduct */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl">
                    <h3 className="text-base font-semibold mb-3">Code of Conduct</h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      We're committed to providing a welcoming and inclusive community for everyone:
                    </p>

                    <div className="space-y-2 text-sm text-zinc-400">
                      <div className="flex gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Be respectful and considerate in all interactions</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Welcome newcomers and help them get started</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Provide constructive feedback and criticism</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Focus on what's best for the community</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Show empathy towards other community members</span>
                      </div>
                    </div>

                    <p className="text-sm text-zinc-400 mt-3">
                      Harassment, discrimination, or disrespectful behavior will not be tolerated. Report any issues to the maintainers.
                    </p>
                  </div>

                  {/* Recognition */}
                  <div className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                    <h3 className="text-base font-semibold mb-3 text-cyan-400">Contributors</h3>
                    <p className="text-sm text-zinc-400 mb-4">
                      Codentis is made possible by amazing contributors from around the world. Thank you to everyone who has helped make Codentis better!
                    </p>

                    <div className="flex items-center gap-4">
                      <a href="https://github.com/sujal-GITHUB/Codentis/graphs/contributors" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-all">
                        View All Contributors
                      </a>
                      <a href="https://github.com/sujal-GITHUB/Codentis" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm border border-white/[0.1] hover:border-cyan-500/50 text-zinc-300 hover:text-white font-semibold rounded-lg transition-all">
                        Become a Contributor
                      </a>
                    </div>
                  </div>

                  {/* Thank You */}
                  <div className="p-6 border border-white/[0.05] bg-bg-2 rounded-xl text-center">
                    <h3 className="text-xl font-semibold mb-3">Thank You for Using Codentis!</h3>
                    <p className="text-sm text-zinc-400 mb-4">
                      We're excited to have you as part of our community. Whether you're building the next big thing or just learning to code, we're here to help you succeed.
                    </p>
                    <p className="text-[13px] sm:text-sm text-zinc-400">
                      Happy coding! 🚀
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
