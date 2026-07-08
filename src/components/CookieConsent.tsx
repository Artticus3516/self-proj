"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show banner if consent hasn't been given yet
    const existing = localStorage.getItem(CONSENT_KEY);
    if (!existing) {
      // Small delay so it doesn't clash with the preloader
      const t = setTimeout(() => setVisible(true), 1800);
      return () => clearTimeout(t);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "granted");
    // Dispatch event so tracking.ts can react immediately on this page
    window.dispatchEvent(new CustomEvent("consent-granted"));
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, "denied");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed bottom-4 left-4 right-4 z-[9000] md:bottom-6 md:left-auto md:right-6 md:max-w-md"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie consent"
        >
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/90 backdrop-blur-xl px-5 py-4 shadow-2xl shadow-black/60">
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <span className="mt-0.5 text-lg" aria-hidden="true">🍪</span>
              <div>
                <p className="text-sm font-semibold text-white">
                  Your Privacy Choices
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                  We use cookies and similar technologies to analyse site traffic
                  and improve your experience. This is in compliance with India's{" "}
                  <strong className="text-zinc-300">
                    Digital Personal Data Protection (DPDP) Act, 2023
                  </strong>{" "}
                  and global standards including{" "}
                  <strong className="text-zinc-300">GDPR</strong>. No data is
                  recorded without your explicit consent.
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="mb-4 flex gap-3 text-[11px] text-zinc-500">
              <a href="/privacy" className="hover:text-zinc-300 underline underline-offset-2 transition-colors">
                Privacy Policy
              </a>
              <span aria-hidden>·</span>
              <a href="/cookies" className="hover:text-zinc-300 underline underline-offset-2 transition-colors">
                Cookie Policy
              </a>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleReject}
                className="flex-1 rounded-xl border border-zinc-700 bg-transparent px-4 py-2.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                Reject All
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-zinc-100"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
