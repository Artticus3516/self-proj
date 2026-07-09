"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

// ─── Stage 1 & 2: Perfect Center-Out Animation Logic ─────────────────────
const barVariants = {
    // 1. Hovering high above the viewport, completely invisible
    initial: {
        y: -100,
        x: 0,
        width: "12px",
        height: "12px",
        opacity: 0,
        scale: 0,
        borderRadius: "100px",
        backgroundColor: "rgb(255,255,255)",
    },
    // 2. FORCE THE PILL DEAD CENTER: Uses absolute viewport positioning math
    dot: {
        y: 12, // Drops down perfectly to match its final vertical header placement
        x: 0,  // Forces absolute horizontal alignment center
        width: "12px",
        height: "12px",
        opacity: 1,
        scale: 1,
        borderRadius: "100px",
        backgroundColor: "rgb(255,255,255)",
        boxShadow: "0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.2)",
        transition: {
            y: { type: "spring", stiffness: 150, damping: 14 },
            opacity: { duration: 0.15 },
        },
    },
    // 3. Smooth transition to full navbar state without touching structural CSS
    bar: {
        y: 0,
        x: 0,
        width: "100%", // Wipes out smoothly to full structural container width
        height: "52px",
        borderRadius: "14px",
        backgroundColor: "rgba(10,10,10,0.45)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 40px rgba(0,0,0,0.3)",
        transition: {
            width: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }, // Cinematic ease-out stretch
            height: { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.05 },
        },
    },
};

// ─── ADDED: Missing container variants to fix the reference error ───
const contentContainerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.07 },
    },
};

const contentItemVariants = {
    hidden: { opacity: 0, y: 7 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.32, ease: "easeOut" as const },
    },
};

// ─── Component ────────────────────────────────────────────────────────────────
export function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const barControls = useAnimationControls();
    const contentControls = useAnimationControls();

    useEffect(() => {
        let active = true;

        async function runIntroSequence() {
            if (!active) return;
            // Stage 1 — dot drops from top with spring
            await barControls.start("dot");
            if (!active) return;
            // Brief hold so the dot "lands"
            await new Promise<void>((r) => setTimeout(r, 100));
            if (!active) return;
            // Stage 2 — horizontal wipe to full bar
            await barControls.start("bar");
            if (!active) return;
            // Stage 3 — text fades up (non-blocking)
            contentControls.start("visible");
        }

        if (typeof window !== "undefined") {
            sessionStorage.removeItem("preloader_completed");

            const onComplete = async () => {
                // Delay to let preloader fade-out (0.6s) finish cleanly
                await new Promise<void>((r) => setTimeout(r, 600));
                void runIntroSequence();
            };
            window.addEventListener("preloader-complete", onComplete);
            return () => {
                active = false;
                window.removeEventListener("preloader-complete", onComplete);
            };
        }
    }, [barControls, contentControls]);

    // Never render the public navbar inside the admin shell
    if (pathname.startsWith("/admin")) return null;

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">

                {/* ── Morphing container: dot → glassmorphic bar ── */}
                <motion.div
                    className="mt-3 flex items-center justify-between px-5 overflow-hidden backdrop-blur-xl"
                    variants={barVariants as any}
                    initial="initial"
                    animate={barControls}
                    style={{ originX: 0.5 }}
                    aria-hidden={undefined}
                >
                    {/* ── Stage 3: all inner content fades up together ── */}
                    <motion.div
                        className="flex w-full items-center justify-between"
                        variants={contentContainerVariants}
                        initial="hidden"
                        animate={contentControls}
                    >
                        {/* Brand */}
                        <motion.div variants={contentItemVariants}>
                            <Link
                                href="/"
                                className="flex items-center gap-2.5 group"
                                aria-label="Home"
                            >
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M20 2L38 20L20 38L2 20L20 2Z"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M20 10L30 20L20 30L10 20L20 10Z"
                                        fill="white"
                                        fillOpacity="0.15"
                                        stroke="white"
                                        strokeWidth="1"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                <span className="text-sm font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors">
                  Atlas
                </span>
                            </Link>
                        </motion.div>

                        {/* Desktop nav links */}
                        <nav className="hidden sm:flex items-center gap-1" aria-label="Primary">
                            {NAV_LINKS.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <motion.div key={link.href} variants={contentItemVariants}>
                                        <Link
                                            href={link.href}
                                            className={`relative px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                                isActive
                                                    ? "text-white"
                                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                                            }`}
                                        >
                                            {isActive && (
                                                <motion.span
                                                    layoutId="nav-pill"
                                                    className="absolute inset-0 rounded-lg bg-white/10"
                                                    transition={{
                                                        type: "spring",
                                                        bounce: 0.2,
                                                        duration: 0.4,
                                                    }}
                                                />
                                            )}
                                            <span className="relative">{link.label}</span>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </nav>

                        {/* Desktop CTA */}
                        <motion.div
                            variants={contentItemVariants}
                            className="hidden sm:flex items-center gap-3"
                        >
                            <Link
                                href="/contact"
                                className="px-4 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-sm font-semibold text-white transition-colors shadow-[0_0_20px_rgba(139,92,246,0.25)]"
                            >
                                Start a Project
                            </Link>
                        </motion.div>

                        {/* Mobile hamburger */}
                        <motion.div variants={contentItemVariants} className="sm:hidden">
                            <button
                                type="button"
                                className="flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
                                aria-expanded={open}
                                aria-controls="mobile-menu"
                                aria-label={open ? "Close menu" : "Open menu"}
                                onClick={() => setOpen((v) => !v)}
                            >
                <span
                    className={`block w-5 h-px bg-white/70 transition-all duration-300 origin-center ${
                        open ? "rotate-45 translate-y-[8px]" : ""
                    }`}
                />
                                <span
                                    className={`block w-5 h-px bg-white/70 transition-all duration-300 ${
                                        open ? "opacity-0" : ""
                                    }`}
                                />
                                <span
                                    className={`block w-5 h-px bg-white/70 transition-all duration-300 origin-center ${
                                        open ? "-rotate-45 -translate-y-[8px]" : ""
                                    }`}
                                />
                            </button>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Mobile dropdown — unchanged styling */}
                <AnimatePresence>
                    {open && (
                        <motion.nav
                            id="mobile-menu"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2 rounded-2xl border border-white/[0.07] bg-black/80 backdrop-blur-xl p-3 space-y-1"
                            aria-label="Mobile navigation"
                        >
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                                        pathname === link.href
                                            ? "bg-white/10 text-white"
                                            : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-1 border-t border-white/[0.06]">
                                <Link
                                    href="/contact"
                                    onClick={() => setOpen(false)}
                                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 text-center transition-colors"
                                >
                                    Start a Project
                                </Link>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}