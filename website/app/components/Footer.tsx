import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const footerSections = [
        {
            title: "Product",
            links: [
                { label: "Features", href: "/#features", external: false },
                { label: "Use Cases", href: "/#demo", external: false },
                { label: "Download", href: "/download", external: false },
                { label: "Documentation", href: "/docs", external: false },
            ]
        },
        {
            title: "Resources",
            links: [
                { label: "GitHub", href: "https://github.com/sujal-GITHUB/Codentis", external: true },
                { label: "Issues", href: "https://github.com/sujal-GITHUB/Codentis/issues", external: true },
                { label: "Releases", href: "https://github.com/sujal-GITHUB/Codentis/releases", external: true },
                { label: "Contributing", href: "https://github.com/sujal-GITHUB/Codentis/blob/main/CONTRIBUTING.md", external: true },
            ]
        },
        {
            title: "Community",
            links: [
                { label: "Discussions", href: "https://github.com/sujal-GITHUB/Codentis/discussions", external: true },
                { label: "Report Bug", href: "https://github.com/sujal-GITHUB/Codentis/issues/new", external: true },
                { label: "Feature Request", href: "https://github.com/sujal-GITHUB/Codentis/issues/new", external: true },
                { label: "Author", href: "https://github.com/sujal-GITHUB", external: true },
            ]
        }
    ];

    return (
        <footer className="border-t border-white/[0.04] pt-16 pb-8 px-8 sm:px-10 lg:px-16 bg-bg-0">
            <div className="w-full max-w-none">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16 mb-12">
                    {/* Brand Section */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-3 font-semibold text-xl tracking-tight mb-4">
                            <Image
                                src="/codentis.svg"
                                alt="Codentis"
                                width={32}
                                height={32}
                                className="w-8 h-8 brightness-0 invert"
                            />
                            Codentis
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-sm">
                            The intelligent CLI AI agent that transforms your terminal into a powerful development companion. Built for developers who value efficiency and simplicity.
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://github.com/sujal-GITHUB/Codentis"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200"
                                aria-label="GitHub"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Footer Sections */}
                    {footerSections.map((section) => (
                        <div key={section.title} className="lg:col-span-1">
                            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        {link.external ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 flex items-center gap-1"
                                            >
                                                {link.label}
                                                <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.06] mb-8" />

                {/* Bottom Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
                    <div className="flex items-center gap-6">
                        <p>&copy; 2026 Codentis. Open Source under MIT License.</p>
                        <div className="hidden sm:flex items-center gap-1 text-xs">
                            <span>Made with</span>
                            <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <span>by sujal</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            All systems operational
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
