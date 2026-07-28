"use client";

import { useEffect, useState } from "react";

export function PreLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("preloader_completed");
    }

    // Start progress bar immediately
    const pTimer = setTimeout(() => setProgress(100), 50);

    // Hide after 800ms to drastically improve TTI (no longer waiting 1.4s)
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setVisible(false);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("preloader-complete"));
        }
      }, 500); 
    }, 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(pTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#030303] transition-opacity duration-500 ease-in-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Loading"
      role="status"
    >
      <div className="mb-10 flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
          className="text-zinc-900 dark:text-white"
        >
          <path d="M20 2L38 20L20 38L2 20L20 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M20 10L30 20L20 30L10 20L20 10Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        </svg>
        <span className="text-xs tracking-[0.35em] text-zinc-500 dark:text-zinc-400 uppercase font-light">
          Loading
        </span>
      </div>

      <div className="h-px w-48 overflow-hidden rounded-full bg-black/10 dark:bg-zinc-800">
        <div
          className="h-full bg-zinc-900 dark:bg-white rounded-full transition-all ease-in-out"
          style={{ width: `${progress}%`, transitionDuration: "800ms" }}
        />
      </div>
    </div>
  );
}
