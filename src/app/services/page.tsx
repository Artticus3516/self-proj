"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { initTracking } from "@/lib/tracking";

// ─── Service data ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    index: "01",
    label: "IaaS",
    title: "Infrastructure as a Service",
    summary:
      "Architect and provision resilient server topologies built for scale. We design high-availability clusters, custom DevOps pipelines, and enterprise-grade cloud architectures that never flinch under load.",
    capabilities: [
      "High-Availability Cluster Provisioning",
      "Custom DevOps & CI/CD Architectures",
      "Fault-Tolerant Server Topology Design",
      "Load Balancing & Auto-Scaling Systems",
      "Security Hardening & Compliance Audits",
    ],
  },
  {
    index: "02",
    label: "SaaS",
    title: "SaaS Engineering",
    summary:
      "End-to-end engineering of production-grade software platforms. From multi-tenant database schemas to real-time data pipelines, we build the entire software layer your enterprise demands.",
    capabilities: [
      "Full-Scale Web Platform Development",
      "Multi-Tenant Database Architecture",
      "Real-Time Data Pipelines & APIs",
      "Authentication & Authorization Systems",
      "Product Scaling & Performance Optimization",
    ],
  },
  {
    index: "03",
    label: "Transform",
    title: "Digital Transformation",
    summary:
      "Legacy systems are a liability. We migrate and modernize monolithic enterprise architectures into high-velocity cloud-native frameworks — zero downtime, zero data loss.",
    capabilities: [
      "Legacy System Migration & Modernization",
      "Cloud-Native Architecture Redesign",
      "Microservices & Containerization",
      "Zero-Downtime Deployment Strategies",
      "Post-Migration Performance Benchmarking",
    ],
  },
];
const FAQS: { id: number; question: string; answer: string }[] = [
  {
    id: 1,
    question: "What is Infrastructure as a Service (IaaS)?",
    answer: "IaaS provides foundational computing resources over the cloud. We design high-availability clusters and architectures so you don't have to manage physical servers.",
  },
  {
    id: 2,
    question: "How does custom SaaS engineering work?",
    answer: "We handle end-to-end engineering of production-grade software platforms, building everything from multi-tenant database schemas to real-time APIs for your business.",
  },
  {
    id: 3,
    question: "What security standards does Archon follow?",
    answer: "Security is hardened from the start. We follow enterprise-grade standards including SOC 2 compliance, performing continuous security audits and compliance checks.",
  },
  {
    id: 4,
    question: "What does digital transformation include?",
    answer: "It includes migrating and modernizing monolithic enterprise architectures into high-velocity cloud-native frameworks with zero downtime and no data loss.",
  },
  {
    id: 5,
    question: "How long does a typical enterprise project take?",
    answer: "Our project onboarding and initial technical scoping takes less than 48 hours. Full project timelines depend on the architecture's complexity and scale requirements.",
  },
  {
    id: 6,
    question: "Do you provide ongoing maintenance and support?",
    answer: "Yes, our engagements are built on long-term partnership. We treat your infrastructure as our own, providing continuous audits, updates, and maintenance.",
  },
];
// ─── Fade-up animation variant ────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="group relative flex flex-col rounded-2xl border border-border
                 bg-card/80 backdrop-blur-xl overflow-hidden
                 transition-all duration-500 hover:border-primary/40 hover:bg-card"
    >
      {/* Top accent line — slides in on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-transparent group-hover:bg-primary/30 transition-all duration-500" />

      {/* Card header */}
      <div className="flex items-start justify-between p-6 pb-4 border-b border-border">
        <div className="space-y-1">
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            [{service.index}] — {service.label}
          </span>
          <h2 className="text-lg font-semibold text-foreground tracking-tight leading-snug">
            {service.title}
          </h2>
        </div>
        {/* Mechanical corner chevron */}
        <span
          className="mt-1 text-muted-foreground group-hover:text-primary transition-colors duration-300 text-lg leading-none select-none"
          aria-hidden="true"
        >
          ↗
        </span>
      </div>

      {/* Summary */}
      <div className="px-6 py-5 flex-1">
        <p className="text-sm leading-relaxed text-muted-foreground font-light">
          {service.summary}
        </p>
      </div>

      {/* Capabilities list */}
      <div className="px-6 pb-6">
        <h3 className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
          Core capabilities
        </h3>
        <ul className="space-y-2">
          {service.capabilities.map((cap) => (
            <li key={cap} className="flex items-start gap-2.5">
              <span
                className="mt-[5px] w-1 h-1 rounded-full bg-muted-foreground shrink-0 group-hover:bg-primary transition-colors duration-300"
                aria-hidden="true"
              />
              <span className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                {cap}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

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
      className="border border-border rounded-2xl bg-card/80 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-primary/40"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <h3 className="text-sm font-semibold text-foreground">{question}</h3>
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-muted-foreground ml-4 font-mono select-none text-lg leading-none shrink-0"
        >
          {isOpen ? "−" : "+"}
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0, scale: 0.98 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-1">
              <p className="text-sm leading-relaxed text-muted-foreground font-light">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  useEffect(() => initTracking("/services"), []);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-24">

        {/* ── Page header ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-16 max-w-2xl"
        >
          <p className="font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase mb-4">
            Digital Infrastructure Agency — Service Catalogue
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] text-foreground">
            Built for Systems<br />That Cannot Fail.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground font-light max-w-xl">
            We design, engineer, and operate the digital backbone of
            enterprise-grade organisations. Three core disciplines. One
            uncompromising standard.
          </p>
        </motion.div>

        {/* ── Service cards grid ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.index} service={service} index={i} />
          ))}
        </div>

        {/* ── Stats band ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4, ease: "easeOut" }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-border rounded-2xl overflow-hidden mb-16"
        >
          {[
            { val: "99.99%", label: "Uptime SLA" },
            { val: "< 48h",  label: "Project Onboarding" },
            { val: "10×",    label: "Avg. Scale Factor" },
            { val: "SOC 2",  label: "Security Standard" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-1 bg-card/80 backdrop-blur-xl px-6 py-8"
            >
              <span className="text-2xl font-bold text-foreground font-mono tracking-tight">
                {stat.val}
              </span>
              <span className="text-[10px] font-mono tracking-[0.25em] text-muted-foreground uppercase text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── CTA block ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5, ease: "easeOut" }}
          className="relative rounded-2xl border border-border bg-card/80 backdrop-blur-xl p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden"
        >
          {/* Subtle corner ticks */}
          <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-border rounded-tl-2xl" />
          <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-border rounded-tr-2xl" />
          <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-border rounded-bl-2xl" />
          <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-border rounded-br-2xl" />

          <div className="space-y-2 max-w-lg">
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              Ready to deploy?
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight leading-snug">
              Start with a scoped architecture brief.
            </h2>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Our engineers review your requirements and return a technical scope
              document within 48 hours — at no cost.
            </p>
          </div>

          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                       bg-primary text-primary-foreground text-sm font-semibold tracking-wide
                       transition-all duration-300 hover:bg-primary-hover hover:scale-105 active:scale-95
                       shadow-md"
          >
            Initialize Architecture Project
            <span aria-hidden="true" className="text-base">→</span>
          </Link>
        </motion.div>

        {/* ── FAQ Section ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mt-32 max-w-3xl"
        >
          <div className="mb-8">
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
              Common Questions
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="flex flex-col gap-4">
            {FAQS.map((faq) => (
              <FAQItem 
                key={faq.id} 
                index={faq.id} 
                question={faq.question} 
                answer={faq.answer} 
              />
            ))}
          </div>
        </motion.div>

      </div>
    </main>
  );
}
