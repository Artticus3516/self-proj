"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const NAV = [
  { href: "/admin/traffic", label: "Traffic", icon: "📊" },
  { href: "/admin/leads", label: "Leads", icon: "📬" },
  { href: "/admin/services", label: "Services", icon: "⚙️" },
  { href: "/admin/blog", label: "Blog Posts", icon: "📝" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      // Ignore errors and force client redirect
    }
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 w-56 flex flex-col border-r border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-zinc-800">
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path d="M20 2L38 20L20 38L2 20L20 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M20 10L30 20L20 30L10 20L20 10Z" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-semibold tracking-tight">CMS Admin</span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Admin navigation">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-zinc-800 px-5 py-4 flex flex-col gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            ← Back to site
          </Link>
          <button
            data-testid="logout-btn"
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-red-500/80 hover:text-red-400 transition-colors text-left font-medium cursor-pointer"
          >
            ❌ Logout
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 ml-56 min-h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
