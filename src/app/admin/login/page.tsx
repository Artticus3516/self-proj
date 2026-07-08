"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// In-memory rate limiter: tracks failed attempts per session
const failedAttempts = { count: 0, lockedUntil: 0 };
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 60_000; // 1 minute

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Rate limit check
    const now = Date.now();
    if (failedAttempts.lockedUntil > now) {
      const remaining = Math.ceil((failedAttempts.lockedUntil - now) / 1000);
      setError(`Too many failed attempts. Try again in ${remaining}s.`);
      return;
    }

    setLoading(true);

    // Simulate async credential check
    await new Promise((r) => setTimeout(r, 400));

    // Mock credential check (replace with real BaaS auth in production)
    if (username === "admin" && password === "password") {
      // Set mock session cookie
      document.cookie = "admin_session=mock-session-token-xyz-9876; path=/; SameSite=Strict";
      failedAttempts.count = 0;
      router.replace("/admin/traffic");
    } else {
      failedAttempts.count += 1;
      if (failedAttempts.count >= MAX_ATTEMPTS) {
        failedAttempts.lockedUntil = Date.now() + LOCKOUT_MS;
        setError(`Account locked for 60 seconds after ${MAX_ATTEMPTS} failed attempts.`);
      } else {
        setError(`Invalid credentials. ${MAX_ATTEMPTS - failedAttempts.count} attempt(s) remaining.`);
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030303] px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path d="M20 2L38 20L20 38L2 20L20 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M20 10L30 20L20 30L10 20L20 10Z" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1" strokeLinejoin="round" />
          </svg>
          <h1 className="text-lg font-semibold text-white tracking-tight">Admin Portal</h1>
          <p className="text-xs text-zinc-500">Sign in to access your dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl p-6 space-y-4"
        >
          <div className="space-y-1.5">
            <label htmlFor="username" className="block text-xs font-medium text-zinc-400">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-zinc-600 transition-colors"
              placeholder="admin"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-xs font-medium text-zinc-400">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-zinc-600 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-950/50 border border-red-900/50 px-3 py-2 text-xs text-red-300" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition-all hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center text-[11px] text-zinc-600">
          Demo credentials: <span className="text-zinc-400">admin / password</span>
        </p>
      </div>
    </div>
  );
}
