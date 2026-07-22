"use client";

import {motion} from "framer-motion";
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

export default function CookiesPolicyPage() {
    useEffect(() => initTracking("/cookies"), []);

    return (
        <main className="min-h-screen bg-[#030303] text-white">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-32 pb-24 space-y-16">

                {/* Header */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    custom={0}
                    className="space-y-4"
                >
                    <p className="font-mono text-[10px] tracking-[0.35em] text-zinc-600 uppercase">
                        Legal Compliance
                    </p>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                        Cookie Policy
                    </h1>
                    <p className="text-sm text-zinc-500 font-mono">
                        Last Updated: July 9, 2026
                    </p>
                    <div className="h-px w-24 bg-white/10"/>
                </motion.section>

                {/* Content Details */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    custom={1}
                    className="space-y-10 text-zinc-400 font-light leading-relaxed text-sm"
                >
                    <p className="text-base text-zinc-300">
                        This Cookie Policy explains how Atlas uses cookies and similar tracking technologies when you
                        visit our website. It clarifies the distinction between first-party and third-party trackers, as
                        well as the exact behaviors triggered when you accept or decline our tracking consent.
                    </p>

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-white font-mono uppercase tracking-wider">
                            1. What Are Cookies?
                        </h2>
                        <p>
                            Cookies are small text files stored on your browser or device when you visit a website. They
                            are widely used to make websites function more efficiently and to provide analytics data to
                            site operators.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-white font-mono uppercase tracking-wider">
                            2. First-Party vs. Third-Party Cookies
                        </h2>
                        <p>
                            We divide tracking mechanisms into the following categories:
                        </p>
                        <ul className="list-disc pl-5 space-y-3">
                            <li>
                                <strong className="text-zinc-200">First-Party Trackers (System
                                    Essential):</strong> These are set directly by us. We use standard local storage
                                keys (such as `cookie-consent`) to store your preferences (e.g. whether you accepted or
                                declined tracking). These are required to respect your privacy selections and prevent
                                the banner from reappearing on subsequent visits.
                            </li>
                            <li>
                                <strong className="text-zinc-200">Third-Party & Analytics Cookies:</strong> We do not
                                inject unverified third-party scripts. Instead, we use custom tracking utilities that
                                log anonymous site traffic (user-agent, page path, timestamps) to our secure server API
                                endpoint (`/api/track`). This helps us monitor performance metrics and system load.
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-white font-mono uppercase tracking-wider">
                            3. Consent Choices: Accept vs. Decline
                        </h2>
                        <p>
                            You are prompted to make a choice regarding cookie consent on your initial visit. Here is
                            exactly what happens for each option:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div
                                className="rounded-xl border border-white/[0.06] bg-zinc-950/40 backdrop-blur-xl p-5 space-y-2">
                                <p className="font-mono font-bold text-white uppercase text-xs tracking-wider flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-green-500"/>
                                    If You Choose "Accept"
                                </p>
                                <p className="text-xs text-zinc-400">
                                    We write `cookie-consent=accepted` to your browser's local storage. This enables our
                                    traffic tracking module, allowing page-load events to trigger asynchronous POST
                                    payloads containing timestamps, page paths, and user-agents to `/api/track` to log
                                    visits.
                                </p>
                            </div>
                            <div
                                className="rounded-xl border border-white/[0.06] bg-zinc-950/40 backdrop-blur-xl p-5 space-y-2">
                                <p className="font-mono font-bold text-white uppercase text-xs tracking-wider flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-red-500"/>
                                    If You Choose "Decline"
                                </p>
                                <p className="text-xs text-zinc-400">
                                    We write `cookie-consent=declined` to your browser's local storage to prevent the
                                    banner from reappearing. Absolutely no usage tracking data is captured, and no
                                    traffic log payloads are sent to our database.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-white font-mono uppercase tracking-wider">
                            4. Managing & Revoking Consent
                        </h2>
                        <p>
                            You can revoke or modify your consent selections at any time. To clear your preferences and
                            force the consent banner to show up again, click the trigger button in the footer or clear
                            your browser's site cookies and local storage cache manually.
                        </p>
                        <p>
                            For any questions regarding our tracking mechanics, reach out to us at <span
                            className="text-white hover:underline font-mono">privacy@atlas-agency.com</span>.
                        </p>
                    </div>
                </motion.section>

            </div>
        </main>
    );
}
