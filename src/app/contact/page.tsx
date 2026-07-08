"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

// ─── Types ───────────────────────────────────────────────────────────────────
type FormState = { name: string; email: string; company: string; message: string };
type Status = "idle" | "submitting" | "success" | "error";

const ARCH_REQUIREMENTS = [
  "Custom SaaS Build",
  "Cloud Infrastructure (IaaS)",
  "DevOps Automation",
  "Full-Scale Digital Transformation",
];

const SCALE_OPTIONS = [
  "MVP / Startup",
  "Mid-Market Enterprise",
  "High-Availability Cluster",
];

// ─── Corner Tick decoration (mechanical crosshair corners) ────────────────────
function CornerTicks() {
  return (
    <>
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-zinc-700" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-zinc-700" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-zinc-700" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zinc-700" />
    </>
  );
}

// ─── Terminal Field ───────────────────────────────────────────────────────────
function TerminalField({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group space-y-1.5">
      <label className="flex items-center gap-2 font-sans text-xs tracking-wide text-zinc-400 uppercase font-medium">
        <span className="text-zinc-600">[{index}]</span>
        {label}
      </label>
      <div className="relative">
        <CornerTicks />
        {children}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [archReq, setArchReq] = useState(ARCH_REQUIREMENTS[0]);
  const [scale, setScale] = useState(SCALE_OPTIONS[0]);
  const [status, setStatus] = useState<Status>("idle");

  const update = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    const { error } = await supabase.from("leads").insert({
      name: form.company || "(no company)",
      email: form.email,
      // message encodes all enterprise intake parameters for CMS admin view
      message: `[${archReq}] [${scale}] ${form.message}`,
    });
    setStatus(error ? "error" : "success");
  };

  return (
    <main className="min-h-screen bg-transparent text-white flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

        {/* ── LEFT: Blueprint Form Panel ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-2xl overflow-hidden border border-white/10
                     bg-zinc-950/40 backdrop-blur-xl
                     bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]
                     bg-[size:24px_24px]"
        >
          {/* Sheet header bar */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-3">
            <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-600 uppercase">
              INITIALIZE_CORE_ARCHITECTURE // REV_5.0
            </span>
            <div className="flex gap-1.5">
              {["bg-red-500/40", "bg-yellow-500/40", "bg-emerald-500/40"].map((c, i) => (
                <span key={i} className={`w-2 h-2 rounded-full ${c}`} />
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Section heading */}
            <div className="pb-2 border-b border-white/[0.05]">
              <h2 className="text-base font-semibold text-white tracking-tight">Initialize Core Architecture.</h2>
              <p className="mt-1 text-[11px] text-zinc-600 font-mono">Complete all parameters to open a project intake ticket.</p>
            </div>

            {/* Row 1 — Company Name */}
            <TerminalField index="01" label="COMPANY_NAME">
              <input
                required
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                placeholder="Acme Corp"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5
                           text-sm text-white font-mono placeholder:text-zinc-700
                           outline-none focus:border-white focus:ring-1 focus:ring-white/20
                           transition-all duration-200"
              />
            </TerminalField>

            {/* Row 2 — Architecture Requirement */}
            <TerminalField index="02" label="ARCHITECTURE_REQUIREMENT">
              <select
                value={archReq}
                onChange={(e) => setArchReq(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5
                           text-sm text-white font-mono
                           outline-none focus:border-white focus:ring-1 focus:ring-white/20
                           transition-all duration-200 appearance-none cursor-pointer"
              >
                {ARCH_REQUIREMENTS.map((t) => (
                  <option key={t} value={t} className="bg-zinc-900">{t}</option>
                ))}
              </select>
            </TerminalField>

            {/* Row 3 — Estimated Scale */}
            <TerminalField index="03" label="ESTIMATED_SCALE">
              <select
                value={scale}
                onChange={(e) => setScale(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5
                           text-sm text-white font-mono
                           outline-none focus:border-white focus:ring-1 focus:ring-white/20
                           transition-all duration-200 appearance-none cursor-pointer"
              >
                {SCALE_OPTIONS.map((s) => (
                  <option key={s} value={s} className="bg-zinc-900">{s}</option>
                ))}
              </select>
            </TerminalField>

            {/* Row 4 — Email */}
            <TerminalField index="04" label="EMAIL_ADDRESS">
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="cto@enterprise.com"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5
                           text-sm text-white font-mono placeholder:text-zinc-700
                           outline-none focus:border-white focus:ring-1 focus:ring-white/20
                           transition-all duration-200"
              />
            </TerminalField>

            {/* Row 5 — Message */}
            <TerminalField index="05" label="BRIEF_DESCRIPTION">
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Describe your project scope and timeline..."
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5
                           text-sm text-white font-mono placeholder:text-zinc-700
                           outline-none focus:border-white focus:ring-1 focus:ring-white/20
                           transition-all duration-200 resize-none"
              />
            </TerminalField>

            {/* Submit */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className="px-8 py-3 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 hover:bg-zinc-200 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed text-center"
              >
                {status === "submitting"
                  ? "TRANSMITTING..."
                  : status === "success"
                  ? "ORDER RECEIVED ✓"
                  : "SUBMIT_ORDER //"}
              </button>
              {status === "error" && (
                <p className="font-mono text-xs text-red-400">
                  ERR: Transmission failed. Retry.
                </p>
              )}
            </div>
          </form>

          {/* Bottom ruler */}
          <div className="border-t border-white/[0.06] px-6 py-2 flex justify-between font-mono text-[9px] text-zinc-700">
            <span>SECURE_CHANNEL :: TLS_1.3</span>
            <span>LEADS_DB :: ACTIVE</span>
          </div>
        </motion.div>

        {/* ── RIGHT: Holographic Viewport Panel ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="relative flex flex-col justify-between rounded-2xl border border-white/10
                     bg-zinc-950/30 backdrop-blur-xl p-8
                     shadow-[0_0_30px_rgba(255,255,255,0.03)]"
        >
          {/* Subtle white perimeter accent line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-2xl" />

          {/* Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-[10px] font-mono text-zinc-400 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
              Console Online
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight text-white">
              Scale Without{" "}
              <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                Constraints.
              </span>
            </h1>

            <p className="text-base leading-relaxed text-zinc-400 max-w-sm">
              From provisioning high-availability IaaS clusters to engineering custom SaaS
              platforms, we architect resilient digital frameworks tailored to your
              operational velocity. Let&apos;s build your backbone.
            </p>

            {/* Mechanical stat grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { val: "99.99%", label: "Uptime SLA" },
                { val: "< 48h", label: "Onboarding" },
                { val: "10x", label: "Scale Factor" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center"
                >
                  <p className="text-xl font-bold text-white font-mono">{s.val}</p>
                  <p className="text-[10px] text-zinc-600 mt-0.5 tracking-wide uppercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom console footer */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-3">
            <p className="font-mono text-[10px] text-zinc-700 tracking-widest uppercase">
              Direct channels
            </p>
            <div className="space-y-2">
              {[
                { label: "Email", value: "artticus9@gmail.com" },
                { label: "Signal", value: "+91 9625604705" },
              ].map((c) => (
                <div key={c.label} className="flex justify-between text-sm">
                  <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                    {c.label}
                  </span>
                  <span className="text-zinc-300 font-light">{c.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
