"use client";

import { motion } from "framer-motion";
import { useActionState } from "react";
import { submitContactAction } from "./actions";

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
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-border" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-border" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-border" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-border" />
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
      <label className="flex items-center gap-2 font-sans text-xs tracking-wide text-muted-foreground uppercase font-medium">
        <span className="text-muted-foreground/70">[{index}]</span>
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
  const [state, formAction, isPending] = useActionState(submitContactAction, { status: "idle" });
  const status = state.status;

  return (
    <main className="min-h-screen bg-transparent flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        <h1 className="sr-only">Contact Archon — Enterprise IT Services & Architecture</h1>

        {/* ── LEFT: Blueprint Form Panel ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-2xl overflow-hidden border border-border
                     bg-card/80 backdrop-blur-xl
                     bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]
                     bg-[size:24px_24px]"
        >
          {/* Sheet header bar */}
          <div className="flex items-center justify-between border-b border-border px-6 py-3">
            <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
              INITIALIZE_CORE_ARCHITECTURE // REV_5.0
            </span>
            <div className="flex gap-1.5">
              {["bg-destructive/60", "bg-yellow-500/40", "bg-emerald-500/40"].map((c, i) => (
                <span key={i} className={`w-2 h-2 rounded-full ${c}`} />
              ))}
            </div>
          </div>

          <form action={formAction} className="p-6 space-y-6">
            {/* Section heading */}
            <div className="pb-2 border-b border-border">
              <h2 className="text-base font-semibold text-foreground tracking-tight">Initialize Core Architecture.</h2>
              <p className="mt-1 text-[11px] text-muted-foreground font-mono">Complete all parameters to open a project intake ticket.</p>
            </div>

            {/* Row 1 — Company Name */}
            <TerminalField index="01" label="COMPANY_NAME">
              <input
                name="name"
                required
                placeholder="Acme Corp"
                className="w-full bg-input/20 border border-input rounded-lg px-4 py-2.5
                           text-sm text-foreground font-mono placeholder:text-muted-foreground
                           outline-none focus:border-primary focus:ring-1 focus:ring-ring
                           transition-all duration-200"
              />
            </TerminalField>

            {/* Row 2 — Architecture Requirement */}
            <TerminalField index="02" label="ARCHITECTURE_REQUIREMENT">
              <select
                name="archReq"
                className="w-full bg-input/20 border border-input rounded-lg px-4 py-2.5
                           text-sm text-foreground font-mono
                           outline-none focus:border-primary focus:ring-1 focus:ring-ring
                           transition-all duration-200 appearance-none cursor-pointer"
              >
                {ARCH_REQUIREMENTS.map((t) => (
                  <option key={t} value={t} className="bg-popover text-popover-foreground">{t}</option>
                ))}
              </select>
            </TerminalField>

            {/* Row 3 — Estimated Scale */}
            <TerminalField index="03" label="ESTIMATED_SCALE">
              <select
                name="scale"
                className="w-full bg-input/20 border border-input rounded-lg px-4 py-2.5
                           text-sm text-foreground font-mono
                           outline-none focus:border-primary focus:ring-1 focus:ring-ring
                           transition-all duration-200 appearance-none cursor-pointer"
              >
                {SCALE_OPTIONS.map((s) => (
                  <option key={s} value={s} className="bg-popover text-popover-foreground">{s}</option>
                ))}
              </select>
            </TerminalField>

            {/* Row 4 — Email */}
            <TerminalField index="04" label="EMAIL_ADDRESS">
              <input
                name="email"
                required
                type="email"
                placeholder="cto@enterprise.com"
                className="w-full bg-input/20 border border-input rounded-lg px-4 py-2.5
                           text-sm text-foreground font-mono placeholder:text-muted-foreground
                           outline-none focus:border-primary focus:ring-1 focus:ring-ring
                           transition-all duration-200"
              />
            </TerminalField>

            {/* Row 5 — Message */}
            <TerminalField index="05" label="BRIEF_DESCRIPTION">
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Describe your project scope and timeline..."
                className="w-full bg-input/20 border border-input rounded-lg px-4 py-2.5
                           text-sm text-foreground font-mono placeholder:text-muted-foreground
                           outline-none focus:border-primary focus:ring-1 focus:ring-ring
                           transition-all duration-200 resize-none"
              />
            </TerminalField>

            {/* Submit */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={isPending || status === "success"}
                className="px-8 py-3 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-center"
              >
                {isPending 
                  ? "TRANSMITTING..." 
                  : status === "success"
                  ? "ORDER RECEIVED ✓"
                  : "SUBMIT_ORDER //"}
              </button>
              {status === "error" && (
                <p className="font-mono text-xs text-destructive">
                  ERR: Transmission failed. Retry.
                </p>
              )}
            </div>
          </form>

          {/* Bottom ruler */}
          <div className="border-t border-border px-6 py-2 flex justify-between font-mono text-[9px] text-muted-foreground">
            <span>SECURE_CHANNEL :: TLS_1.3</span>
            <span>LEADS_DB :: ACTIVE</span>
          </div>
        </motion.div>

        {/* ── RIGHT: Holographic Viewport Panel ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="relative flex flex-col justify-between rounded-2xl border border-border
                     bg-card/60 backdrop-blur-xl p-8 shadow-sm"
        >
          {/* Subtle perimeter accent line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent rounded-t-2xl" />

          {/* Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Console Online
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground">
              Scale Without{" "}
              <span className="bg-gradient-to-b from-foreground via-foreground-secondary to-muted-foreground bg-clip-text text-transparent">
                Constraints.
              </span>
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground max-w-sm">
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
                  className="rounded-xl border border-border bg-muted/30 p-3 text-center"
                >
                  <p className="text-xl font-bold text-foreground font-mono">{s.val}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 tracking-wide uppercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* How to Start a Project */}
            <div className="pt-6 space-y-4">
              <h3 className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                How to Start a Project
              </h3>
              <div className="space-y-3">
                {[
                  { step: "01", text: "Submit your architecture brief" },
                  { step: "02", text: "Receive a scoped technical document within 48 hours" },
                  { step: "03", text: "Begin your project with a dedicated engineering pod" },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3">
                    <span className="font-mono text-[10px] tracking-widest text-muted-foreground mt-0.5 select-none">
                      [{s.step}]
                    </span>
                    <p className="text-sm text-foreground font-mono">
                      {s.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom console footer */}
          <div className="mt-8 pt-6 border-t border-border space-y-3">
            <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
              Direct channels
            </p>
            <div className="space-y-2">
              {[
                { label: "Email", value: "artticus9@gmail.com" },
                { label: "Signal", value: "+91 9625604705" },
              ].map((c) => (
                <div key={c.label} className="flex justify-between text-sm">
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                    {c.label}
                  </span>
                  <span className="text-foreground font-light">{c.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
