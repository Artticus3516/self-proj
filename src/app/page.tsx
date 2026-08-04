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
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground-secondary to-muted-foreground drop-shadow-sm select-none pt-28 md:pt-36">
          Archon
        </h1>
        
        <p className="text-foreground-secondary text-lg md:text-xl max-w-2xl leading-relaxed font-light tracking-wide">
          Step into a fluid, multidimensional space shaped by mathematical harmony and real-time interaction.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:bg-primary-hover hover:scale-105 active:scale-95 shadow-md text-center"
          >
            Explore Space
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full border border-border bg-card/60 backdrop-blur-sm text-foreground font-semibold text-sm transition-all duration-300 hover:bg-muted text-center"
          >
            Learn More
          </Link>
        </div>

        {/* Value Proposition */}
        <div className="mt-16 pt-12 border-t border-border w-full flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
          <p className="text-sm md:text-base text-muted-foreground font-light max-w-xl leading-relaxed">
            Archon is an elite digital infrastructure agency architecting the operational backbones of enterprise organizations. We deliver uncompromising reliability and scale for systems that cannot fail.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-mono tracking-wider">
            <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
              IaaS
            </Link>
            <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
              SaaS
            </Link>
            <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
              Transform
            </Link>
          </div>

          <p className="text-xs font-mono tracking-[0.2em] text-muted-foreground uppercase mt-4">
            Trusted by 40+ enterprise organisations
          </p>
        </div>
      </div>
    </main>
  );
}

