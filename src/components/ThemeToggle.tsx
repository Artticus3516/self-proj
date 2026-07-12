"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-[88px] h-9 rounded-xl flex items-center justify-center opacity-0">
        <div className="w-4 h-4" />
      </div>
    );
  }

  const currentTheme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="relative flex items-center justify-between gap-2 px-3 h-9 rounded-xl text-zinc-300 dark:text-zinc-300 bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 hover:text-black dark:hover:text-white hover:bg-black/20 dark:hover:bg-white/20 transition-all shadow-sm"
      aria-label="Toggle Theme"
    >
      <span className="text-xs font-medium tracking-wide">Theme</span>
      <div className="relative w-4 h-4 flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{
            scale: currentTheme === "dark" ? 1 : 0,
            opacity: currentTheme === "dark" ? 1 : 0,
            rotate: currentTheme === "dark" ? 0 : -90,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-3.5 h-3.5" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            scale: currentTheme === "light" ? 1 : 0,
            opacity: currentTheme === "light" ? 1 : 0,
            rotate: currentTheme === "light" ? 0 : 90,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="w-3.5 h-3.5" />
        </motion.div>
      </div>
    </button>
  );
}
