"use client";

import Link from "next/link";
import { useEffect } from "react";
import { initTracking } from "@/lib/tracking";

export default function Home() {
  useEffect(() => initTracking("/"), []);

  return (
    <main className="relative h-screen w-full overflow-hidden text-white flex flex-col items-center justify-center bg-transparent">
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md text-xs text-zinc-400 font-medium tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Interactive Experience
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-sm select-none">
          Atlas
        </h1>
        
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light tracking-wide">
          Step into a fluid, multidimensional space shaped by mathematical harmony and real-time interaction.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 hover:bg-zinc-200 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] text-center"
          >
            Explore Space
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm text-zinc-300 font-semibold text-sm transition-all duration-300 hover:bg-zinc-800/50 hover:text-white hover:border-zinc-700 text-center"
          >
            Learn More
          </Link>
        </div>
      </div>
    </main>
  );
}

