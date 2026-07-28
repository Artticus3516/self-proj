"use client";

import Link from "next/link";
import { useEffect } from "react";
import { initTracking } from "@/lib/tracking";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  useEffect(() => initTracking("/"), []);

  return (

    <main className="relative h-screen w-full overflow-hidden text-foreground flex flex-col items-center justify-center bg-transparent">
        <SpeedInsights />
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-6">
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-zinc-900 via-zinc-600 to-zinc-400 dark:from-white dark:via-zinc-200 dark:to-zinc-500 drop-shadow-sm select-none">
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

        {/* Value Proposition */}
        <div className="mt-16 pt-12 border-t border-black/5 dark:border-white/10 w-full flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
          <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-light max-w-xl leading-relaxed">
            Archon is an elite digital infrastructure agency architecting the operational backbones of enterprise organizations. We deliver uncompromising reliability and scale for systems that cannot fail.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-mono tracking-wider">
            <Link href="/services" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              IaaS
            </Link>
            <Link href="/services" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              SaaS
            </Link>
            <Link href="/services" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              Transform
            </Link>
          </div>

          <p className="text-xs font-mono tracking-[0.2em] text-zinc-400 dark:text-zinc-500 uppercase mt-4">
            Trusted by 40+ enterprise organisations
          </p>
        </div>
      </div>
    </main>
  );
}

