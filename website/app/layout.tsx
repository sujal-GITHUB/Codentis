import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Codentis",
  description:
    "Codentis is a powerful CLI AI agent that brings the intelligence of large language models directly to your terminal. Streaming TUI, agentic loops, and tool use — built for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <Analytics/>
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@100..900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-0 text-white antialiased">{children}</body>
    </html>
  );
}
