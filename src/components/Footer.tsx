import Link from "next/link";

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
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-[#030303]" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">

        {/* Top section: brand + link columns */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 mb-12">
          {/* Brand block */}
          <div className="col-span-2 sm:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="Home">
              <svg width="20" height="20" viewBox="0 0 40 40" fill="none" aria-hidden="true">
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
              <span className="text-sm font-semibold tracking-tight text-white/80 group-hover:text-white transition-colors">
                Atlas
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-zinc-600 font-light max-w-[180px]">
              Digital infrastructure &amp; software engineering for enterprise organisations.
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase">
                Systems Online
              </span>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading} className="space-y-4">
              <p className="font-mono text-[10px] tracking-[0.3em] text-zinc-700 uppercase">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.05] mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[10px] text-zinc-700 tracking-wide">
            © {year} Atlas. All rights reserved.
          </p>
          <p className="font-mono text-[10px] text-zinc-800 tracking-wide">
            Engineered for uptime. Built for scale.
          </p>
        </div>

      </div>
    </footer>
  );
}
