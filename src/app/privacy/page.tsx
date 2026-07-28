"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { initTracking } from "@/lib/tracking";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function PrivacyPolicyPage() {
  useEffect(() => initTracking("/privacy"), []);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-32 pb-24 space-y-16">
        
        {/* Header */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="space-y-4"
        >
          <p className="font-mono text-[10px] tracking-[0.35em] text-zinc-500 dark:text-zinc-600 uppercase">
            Legal Compliance
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-500 font-mono">
            Last Updated: July 9, 2026
          </p>
          <div className="h-px w-24 bg-black/10 dark:bg-white/10" />
        </motion.section>

        {/* Content Details */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="space-y-10 text-zinc-400 font-light leading-relaxed text-sm"
        >
          <p className="text-base text-zinc-700 dark:text-zinc-300">
            Archon ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy details how we collect, use, and safeguard your personal information in alignment with global and regional compliance standards, including the **General Data Protection Regulation (GDPR)**, the **California Consumer Privacy Act (CCPA)**, and India's **Digital Personal Data Protection (DPDP) Act, 2023**.
          </p>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white font-mono uppercase tracking-wider">
              1. Data Controller Information
            </h2>
            <p>
              The data controller responsible for your personal information is:
            </p>
            <div className="rounded-xl border border-black/5 dark:border-white/[0.06] bg-white/60 dark:bg-zinc-950/40 backdrop-blur-xl p-4 font-mono text-xs text-zinc-600 dark:text-zinc-300 space-y-1">
              <p className="font-bold text-black dark:text-white">Archon Systems Private Limited</p>
              <p>Corporate Office Layer: Tech Hub, Sector 5</p>
              <p>Bangalore, Karnataka, India</p>
              <p>Email: <span className="text-zinc-900 dark:text-white hover:underline">privacy@Archon-agency.com</span></p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white font-mono uppercase tracking-wider">
              2. Data We Collect
            </h2>
            <p>
              We collect and process personal data only to the extent necessary to provide our digital infrastructure, custom SaaS engineering, and interactive web services. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-black dark:text-zinc-200">Contact Information:</strong> Names, company details, email addresses, and messages submitted voluntarily through our public contact form.
              </li>
              <li>
                <strong className="text-black dark:text-zinc-200">Usage & Traffic Logs:</strong> IP addresses, browser user-agent strings, visited page paths, and page view timestamps logged to evaluate website traffic.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white font-mono uppercase tracking-wider">
              3. Cookies and Tracking Technologies
            </h2>
            <p>
              We utilize cookies and local storage tokens to analyze site traffic and enhance system performance. In strict compliance with the DPDP Act and GDPR regulations, tracking data is only captured and sent to our analytics endpoint (`/api/track`) **after you provide explicit consent** via our cookie banner. If consent is rejected, no traffic logs are written, and cookies are blocked. Refer to our <a href="/cookies" className="text-zinc-900 dark:text-white underline hover:text-zinc-600 dark:hover:text-zinc-300">Cookie Policy</a> for detailed settings.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white font-mono uppercase tracking-wider">
              4. Legal Basis for Processing
            </h2>
            <p>
              Under the GDPR and DPDP Act, we process your personal data based on the following grounds:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-black dark:text-zinc-200">Consent:</strong> For tracking analytics and outbound intake responses (which can be revoked at any time).
              </li>
              <li>
                <strong className="text-black dark:text-zinc-200">Contractual Necessity:</strong> To coordinate service design requests and fulfill standard project requirements requested by you.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white font-mono uppercase tracking-wider">
              5. Your Rights (GDPR, CCPA & DPDP Act)
            </h2>
            <p>
              Depending on your location, you hold legal rights regarding your personal data. These include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-black dark:text-zinc-200">Right to Access & Rectify:</strong> You have the right to request a copy of your personal data and request corrections of inaccurate details.
              </li>
              <li>
                <strong className="text-black dark:text-zinc-200">Right to Erasure (Right to be Forgotten):</strong> You can request the permanent deletion of your contact submissions and traffic logs.
              </li>
              <li>
                <strong className="text-black dark:text-zinc-200">Right to Restrict or Object:</strong> You can object to standard processing based on legitimate interests.
              </li>
              <li>
                <strong className="text-black dark:text-zinc-200">Right to Consent Withdrawal:</strong> You can change your cookie preferences or opt-out of marketing communications at any time.
              </li>
            </ul>
            <p>
              To exercise any of these rights, please email us directly at <span className="text-black dark:text-white hover:underline font-mono">privacy@Archon-agency.com</span>. We will respond within 30 days.
            </p>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
