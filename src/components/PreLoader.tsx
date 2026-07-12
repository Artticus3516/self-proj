"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function PreLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("preloader_completed");
    }

    // Hide after 1.4s — enough time for R3F WebGL to initialise
    const timer = setTimeout(() => {
      setVisible(false);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("preloader-complete"));
      }
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#030303]"
          aria-label="Loading"
          role="status"
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex flex-col items-center gap-2"
          >
            {/* Abstract diamond logo */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden="true"
              className="text-zinc-900 dark:text-white"
            >
              <path
                d="M20 2L38 20L20 38L2 20L20 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M20 10L30 20L20 30L10 20L20 10Z"
                fill="currentColor"
                fillOpacity="0.15"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs tracking-[0.35em] text-zinc-500 dark:text-zinc-400 uppercase font-light">
              Loading
            </span>
          </motion.div>

          {/* Progress bar */}
          <div className="h-px w-48 overflow-hidden rounded-full bg-black/10 dark:bg-zinc-800">
            <motion.div
              className="h-full bg-zinc-900 dark:bg-white rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
