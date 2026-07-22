"use client";

import Link from "next/link";
import { useEffect } from "react";
import { initTracking } from "@/lib/tracking";

export default function Home() {
  useEffect(() => initTracking("/"), []);

  return (
    <main className="relative h-screen w-full overflow-hidden text-foreground flex flex-col items-center justify-center bg-transparent">
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-6">
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-[#161614] via-[#2E1A7A] to-[#5F45FF] dark:from-white dark:via-zinc-200 dark:to-zinc-500 drop-shadow-sm select-none">
          Archon
        </h1>
        
        <p className="text-foreground-secondary text-lg md:text-xl max-w-2xl leading-relaxed font-light tracking-wide">
          Step into a fluid, multidimensional space shaped by mathematical harmony and real-time interaction.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full border-border bg-accent text-white dark:bg-white dark:text-black font-semibold text-sm transition-all duration-300 hover:opacity-90 dark:hover:bg-zinc-200 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] text-center"
          >
            Explore Space
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full border border-border bg-background-secondary/30 backdrop-blur-sm text-foreground-secondary font-semibold text-sm transition-all duration-300 hover:bg-background-secondary/80 hover:text-foreground text-center"
          >
            Learn More
          </Link>
        </div>
      </div>
    </main>
  );
}

