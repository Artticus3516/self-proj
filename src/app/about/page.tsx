"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { initTracking } from "@/lib/tracking";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" as const },
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
  { label: "Reliability", description: "99.99% uptime is a baseline, not a goal." },
  { label: "Ownership",   description: "We treat your infrastructure as our own." },
  { label: "Clarity",     description: "Plain language. No vendor-speak. No obscuring." },
  { label: "Velocity",    description: "Rigour that doesn't sacrifice delivery cadence." },
  { label: "Security",    description: "Hardened from the start. Audited continuously." },
  { label: "Partnership", description: "Long engagements. Deep alignment. Shared outcomes." },
];

// ─── FAQ Item ──────────────────────────────────────────────────────────────────
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
      custom={index}
      className="border border-black/5 dark:border-white/10 rounded-2xl bg-white/80 dark:bg-zinc-950/40 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-black/10 dark:hover:border-white/20"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
      >
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{question}</h3>
        <span className="text-zinc-400 dark:text-zinc-600 ml-4 font-mono select-none text-lg leading-none">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 font-light">
            {answer}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function AboutPage() {
  useEffect(() => initTracking("/about"), []);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-24 space-y-28">

        {/* ── Editorial Hero ──────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="max-w-3xl"
        >
          <h2 className="font-mono text-[10px] tracking-[0.35em] text-zinc-500 dark:text-zinc-600 uppercase mb-5">
            About the Agency
          </h2>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] text-zinc-900 dark:text-white">
            We Engineer What
            <br />
            <span className="text-zinc-400 dark:text-zinc-500">Others Inherit.</span>
          </h1>
            <motion.div
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.2,ease: "easeOut" }}
                className={"relative backdrop-blur-lg border border-black/5 dark:border-white/10 rounded-2xl p-4 mt-6 dark:bg-zinc-950/40"}>
          <p className="m text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-light max-w-2xl">
              We are a digital infrastructure and software agency. We don't build
            websites — we architect the operational backbone of organisations
            that demand reliability, scale, and precision at every layer of
            their digital stack.
          </p>
          </motion.div>
          <div className="mt-8 h-px w-24 bg-black/10 dark:bg-white/10" />
        </motion.section>

        {/* ── Stats strip ─────────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-black/5 dark:border-white/[0.06] rounded-2xl overflow-hidden"
        >
          {[
            { val: "2025",    label: "Founded" },
            { val: "10+",     label: "Enterprise Clients" },
            { val: "99.99%",  label: "Avg. Uptime SLA" },
            { val: "< 48h",   label: "Onboarding SLA" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center gap-1
                         bg-white/80 dark:bg-zinc-950/40 backdrop-blur-xl px-6 py-10"
            >
              <span className="text-2xl font-bold text-zinc-900 dark:text-white font-mono tracking-tight">
                {s.val}
              </span>
              <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 dark:text-zinc-600 uppercase text-center">
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
            <h3 className="font-mono text-[10px] tracking-[0.35em] text-zinc-500 dark:text-zinc-600 uppercase mb-3">
              Engineering Philosophy
            </h3>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Principles We Build On.
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.index}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="group relative rounded-2xl border border-black/5 dark:border-white/10
                           bg-white/80 dark:bg-zinc-950/40 backdrop-blur-xl p-6 space-y-3
                           transition-all duration-500 hover:border-black/10 dark:hover:border-white/20 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-black/0 dark:bg-white/0 group-hover:bg-black/10 dark:group-hover:bg-white/15 transition-all duration-500 rounded-t-2xl" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 dark:text-zinc-600 uppercase">
                  [{p.index}]
                </span>
                <h2 className="text-base font-semibold text-zinc-900 dark:text-white tracking-tight">
                  {p.title}
                </h2>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 font-light">
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
            <h3 className="font-mono text-[10px] tracking-[0.35em] text-zinc-500 dark:text-zinc-600 uppercase mb-3">
              Core Values
            </h3>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
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
                className="rounded-2xl border border-black/5 dark:border-white/[0.07] bg-white/60 dark:bg-zinc-950/30 backdrop-blur-xl px-5 py-5
                           hover:border-black/10 dark:hover:border-white/15 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-all duration-400 group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 group-hover:bg-zinc-600 dark:group-hover:bg-zinc-400 transition-colors duration-300" aria-hidden="true" />
                  <h2 className="text-sm font-semibold text-zinc-900 dark:text-white tracking-tight">
                    {v.label}
                  </h2>
                </div>
                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-500 font-light pl-3">
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
          className="relative rounded-2xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-zinc-950/40
                     backdrop-blur-xl p-8 sm:p-12 flex flex-col sm:flex-row
                     items-start sm:items-center justify-between gap-6 overflow-hidden"
        >
          <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-black/10 dark:border-white/20 rounded-tl-2xl" />
          <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-black/10 dark:border-white/20 rounded-tr-2xl" />
          <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-black/10 dark:border-white/20 rounded-bl-2xl" />
          <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-black/10 dark:border-white/20 rounded-br-2xl" />
          <div className="space-y-2 max-w-lg">
            <h3 className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 dark:text-zinc-600 uppercase">
              Work with us
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Ready to architect something resilient?
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-500 font-light leading-relaxed">
              Share your infrastructure brief. We'll return a technical scope
              document and preliminary architecture diagram within 48 hours.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                       bg-zinc-900 text-white dark:bg-white dark:text-black text-sm font-semibold tracking-wide
                       transition-all duration-300 hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:scale-105 active:scale-95
                       shadow-[0_0_30px_rgba(0,0,0,0.08)] dark:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
          >
            Open a Project
            <span aria-hidden="true">→</span>
          </Link>
        </motion.section>

        {/* ── FAQ Section ──────────────────────────────────────────────── */}
        <section>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={0}
            className="mb-10 max-w-3xl"
          >
            <h3 className="font-mono text-[10px] tracking-[0.35em] text-zinc-500 dark:text-zinc-600 uppercase mb-3">
              Common Questions
            </h3>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="flex flex-col gap-4 max-w-3xl">
            <FAQItem 
              index={1} 
              question="Who is Archon?"
              answer="Archon is a digital infrastructure and software agency. We specialize in engineering high-reliability foundational systems for enterprise clients." 
            />
            <FAQItem 
              index={2} 
              question="Where is Archon located?" 
              answer="We operate globally with a remote-first engineering team, providing high-availability infrastructure design to organizations around the world." 
            />
            <FAQItem 
              index={3} 
              question="What industries does Archon serve?" 
              answer="We work with high-stakes enterprise environments across various sectors, particularly those that require resilient, scalable architectures that cannot fail." 
            />
            <FAQItem
              index={4}
              question="What makes Archon different from other IT agencies?"
              answer="We prioritize systems first, building scalable foundations before writing application code. We offer precision over speed and maintain strict transparency in our architecture decisions."
            />
          </div>
        </section>

      </div>
    </main>
  );
}
