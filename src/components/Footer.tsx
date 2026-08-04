"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const FOOTER_LINKS = [
  {
    heading: "Platform",
    links: [
      { label: "Home",     href: "/" },
      { label: "Services", href: "/services" },
      { label: "About",    href: "/about" },
      { label: "Contact",  href: "/contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "IaaS Infrastructure",    href: "/services" },
      { label: "SaaS Engineering",       href: "/services" },
      { label: "Digital Transformation", href: "/services" },
      { label: "DevOps Automation",      href: "/services" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy",  href: "/cookies" },
      { label: "Terms of Use",   href: "/terms" },
      { label: "Cookie Settings", href: "#cookie-settings" },
    ],
  },
];

export function Footer() {
  const [year, setYear] = useState(2024);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="border-t border-border bg-background-secondary text-foreground" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">

        {/* Top section: brand + link columns */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 mb-12">
          {/* Brand block */}
          <div className="col-span-2 sm:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="Home">
              <svg width="20" height="20" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="text-foreground">
                <path
                  d="M20 2L38 20L20 38L2 20L20 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 10L30 20L20 30L10 20L20 10Z"
                  fill="currentColor"
                  fillOpacity="0.15"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                Archon
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-muted-foreground font-light max-w-[180px]">
              Digital infrastructure &amp; software engineering for enterprise organisations.
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                Systems Online
              </span>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com/ArchonAgency"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com/ArchonAgency"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/ArchonAgency"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading} className="space-y-4">
              <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href === "#cookie-settings" ? (
                      <button
                        data-testid="privacy-settings-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          localStorage.removeItem("cookie-consent");
                          window.dispatchEvent(new CustomEvent("show-cookie-banner"));
                        }}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 text-left cursor-pointer"
                      >
                        {l.label}
                      </button>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[10px] text-muted-foreground tracking-wide">
            © {year} Archon. All rights reserved.
          </p>
          <p className="font-mono text-[10px] text-muted-foreground tracking-wide">
            Engineered for uptime. Built for scale.
          </p>
        </div>

      </div>
    </footer>
  );
}
