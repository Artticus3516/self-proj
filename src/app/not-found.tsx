"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 max-w-md"
      >
        <span className="font-mono text-xs tracking-[0.35em] text-zinc-500 uppercase">
          [ 404 ERROR ]
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
          System Offline (Page Not Found).
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-500 font-light leading-relaxed">
          The page you are looking for does not exist or has been moved to another coordinate.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full
                       bg-zinc-900 text-white dark:bg-white dark:text-black text-sm font-semibold tracking-wide
                       transition-all duration-300 hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:scale-105 active:scale-95"
          >
            Return to Root
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
