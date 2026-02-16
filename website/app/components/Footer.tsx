import Image from "next/image";

export default function Footer() {
    return (
        <footer className="border-t border-white/[0.04] pt-12 pb-9 px-6 bg-bg-0">
            <div className="max-w-[1120px] mx-auto">
                {/* Top */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2.5 font-semibold text-lg tracking-tight mb-2">
                            <Image
                                src="/codentis.svg"
                                alt="Codentis"
                                width={28}
                                height={28}
                                className="w-7 h-7 brightness-0 invert"
                            />
                            Codentis
                        </div>
                        <p className="text-zinc-500 text-sm">Intelligence meets the terminal.</p>
                    </div>

                    <div className="flex gap-7 mt-4 sm:mt-0">
                        {[
                            { label: "GitHub", href: "https://github.com/sujal-GITHUB/Codentis" },
                            { label: "Issues", href: "https://github.com/sujal-GITHUB/Codentis/issues" },
                            { label: "Author", href: "https://github.com/sujal-GITHUB" },
                        ].map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-zinc-500 hover:text-white transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.06] mb-5" />

                {/* Bottom */}
                <p className="text-center text-[0.75rem] text-zinc-600">
                    &copy; 2025 Codentis. Open Source under MIT License.
                </p>
            </div>
        </footer>
    );
}
