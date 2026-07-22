"use client";

import {motion} from "framer-motion";
import Link from "next/link";
import {useEffect} from "react";
import {initTracking} from "@/lib/tracking";

const fadeUp = {
    hidden: {opacity: 0, y: 24},
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {duration: 0.55, delay: i * 0.1, ease: "easeOut" as const},
    }),
};

const PRINCIPLES = [
    {
        index: "01",
        title: "Systems First",
        body: "Every engagement begins at the infrastructure layer. We design the foundation before writing a single line of application code. Unstable ground produces unstable software.",
    },
    {
        index: "02",
        title: "Precision Over Speed",
        body: "We operate in high-stakes enterprise environments where outages are expensive. We move deliberately, test exhaustively, and deploy with surgical confidence.",
    },
    {
        index: "03",
        title: "Opacity is Failure",
        body: "Every architecture decision is documented, justified, and handed over. We build systems our clients understand, own, and can operate independently.",
    },
    {
        index: "04",
        title: "Scale by Design",
        body: "We refuse to retrofit scalability. Capacity planning, fault tolerance, and horizontal scaling are architectural requirements from day one — never afterthoughts.",
    },
];

const VALUES = [
    {label: "Reliability", description: "99.99% uptime is a baseline, not a goal."},
    {label: "Ownership", description: "We treat your infrastructure as our own."},
    {label: "Clarity", description: "Plain language. No vendor-speak. No obscuring."},
    {label: "Velocity", description: "Rigour that doesn't sacrifice delivery cadence."},
    {label: "Security", description: "Hardened from the start. Audited continuously."},
    {label: "Partnership", description: "Long engagements. Deep alignment. Shared outcomes."},
];

export default function AboutPage() {
    useEffect(() => initTracking("/about"), []);

    return (
        <main className="min-h-screen bg-[#030303] text-white">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-24 space-y-28">

                {/* ── Editorial Hero ──────────────────────────────────────────── */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    custom={0}
                    className="max-w-3xl"
                >
                    <p className="font-mono text-[10px] tracking-[0.35em] text-zinc-600 uppercase mb-5">
                        About the Agency
                    </p>
                    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] text-white">
                        We Engineer What
                        <br/>
                        <span className="text-zinc-500">Others Inherit.</span>
                    </h1>
                    <p className="mt-7 text-lg leading-relaxed text-zinc-400 font-light max-w-2xl">
                        We are a digital infrastructure and software agency. We don't build
                        websites — we architect the operational backbone of organisations
                        that demand reliability, scale, and precision at every layer of
                        their digital stack.
                    </p>
                    <div className="mt-8 h-px w-24 bg-white/10"/>
                </motion.section>

                {/* ── Stats strip ─────────────────────────────────────────────── */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    custom={1}
                    className="grid grid-cols-3 sm:grid-cols-3 gap-px border border-white/[0.06] rounded-2xl overflow-hidden"
                >
                    {[
                        {val: "2025", label: "Founded"},
                        {val: "10+", label: "Enterprise Clients"},
                        {val: "99.79%", label: "Avg. Uptime SLA"},
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="flex flex-col items-center justify-center gap-1
                         bg-zinc-950/40 backdrop-blur-xl px-6 py-10"
                        >
              <span className="text-2xl font-bold text-white font-mono tracking-tight">
                {s.val}
              </span>
                            <span
                                className="text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase text-center">
                {s.label}
              </span>
                        </div>
                    ))}
                </motion.section>

                {/* ── Engineering Philosophy ───────────────────────────────────── */}
                <section>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={0}
                        className="mb-10"
                    >
                        <p className="font-mono text-[10px] tracking-[0.35em] text-zinc-600 uppercase mb-3">
                            Engineering Philosophy
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                            Principles We Build On.
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {PRINCIPLES.map((p, i) => (
                            <motion.div
                                key={p.index}
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                variants={fadeUp}
                                className="group relative rounded-2xl border border-white/10
                           bg-zinc-950/40 backdrop-blur-xl p-6 space-y-3
                           transition-all duration-500 hover:border-white/20 hover:bg-zinc-900/50"
                            >
                                <div
                                    className="absolute inset-x-0 top-0 h-px bg-white/0 group-hover:bg-white/15 transition-all duration-500 rounded-t-2xl"/>
                                <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
                  [{p.index}]
                </span>
                                <h3 className="text-base font-semibold text-white tracking-tight">
                                    {p.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-zinc-400 font-light">
                                    {p.body}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── Values ──────────────────────────────────────────────────── */}
                <section>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={0}
                        className="mb-10"
                    >
                        <p className="font-mono text-[10px] tracking-[0.35em] text-zinc-600 uppercase mb-3">
                            Core Values
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                            The Standard We Hold.
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {VALUES.map((v, i) => (
                            <motion.div
                                key={v.label}
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                variants={fadeUp}
                                className="rounded-2xl border border-white/[0.07] bg-zinc-950/30 backdrop-blur-xl px-5 py-5
                           hover:border-white/15 hover:bg-zinc-900/40 transition-all duration-400 group"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span
                                        className="w-1 h-1 rounded-full bg-zinc-600 group-hover:bg-zinc-400 transition-colors duration-300"
                                        aria-hidden="true"/>
                                    <span className="text-sm font-semibold text-white tracking-tight">
                    {v.label}
                  </span>
                                </div>
                                <p className="text-xs leading-relaxed text-zinc-500 font-light pl-3">
                                    {v.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── CTA ─────────────────────────────────────────────────────── */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    custom={2}
                    className="relative rounded-2xl border border-white/10 bg-zinc-950/40
                     backdrop-blur-xl p-8 sm:p-12 flex flex-col sm:flex-row
                     items-start sm:items-center justify-between gap-6 overflow-hidden"
                >
                    <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 rounded-tl-2xl"/>
                    <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 rounded-tr-2xl"/>
                    <span
                        className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 rounded-bl-2xl"/>
                    <span
                        className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 rounded-br-2xl"/>
                    <div className="space-y-2 max-w-lg">
                        <p className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
                            Work with us
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                            Ready to architect something resilient?
                        </p>
                        <p className="text-sm text-zinc-500 font-light leading-relaxed">
                            Share your infrastructure brief. We'll return a technical scope
                            document and preliminary architecture diagram within 48 hours.
                        </p>
                    </div>
                    <Link
                        href="/contact"
                        className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                       bg-white text-black text-sm font-semibold tracking-wide
                       transition-all duration-300 hover:bg-zinc-200 hover:scale-105 active:scale-95
                       shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                    >
                        Open a Project
                        <span aria-hidden="true">→</span>
                    </Link>
                </motion.section>

            </div>
        </main>
    );
}
