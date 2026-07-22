"use client";

import {useActionState} from "react";
import {loginAction} from "./actions";

export default function AdminLoginPage() {
    const [state, formAction, isPending] = useActionState(loginAction, {error: "", success: false});

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#030303] px-4">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="mb-8 flex flex-col items-center gap-3">
                    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                        <path d="M20 2L38 20L20 38L2 20L20 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                        <path d="M20 10L30 20L20 30L10 20L20 10Z" fill="white" fillOpacity="0.15" stroke="white"
                              strokeWidth="1" strokeLinejoin="round"/>
                    </svg>
                    <h1 className="text-lg font-semibold text-white tracking-tight">Admin Portal</h1>
                    <p className="text-xs text-zinc-500">Sign in to access your dashboard</p>
                </div>

                <form action={formAction}
                      className="rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label htmlFor="username" className="block text-xs font-medium text-zinc-400">
                            Username
                        </label>
                        <input
                            id="username"
                            name="email"
                            type="email"
                            autoComplete="username"
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
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-zinc-600 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    {state.error && (
                        <p className="rounded-lg bg-red-950/50 border border-red-900/50 px-3 py-2 text-xs text-red-300"
                           role="alert">
                            {state.error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition-all hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? "Signing in…" : "Sign In"}
                    </button>
                </form>

                <p className="mt-4 text-center text-[11px] text-zinc-600">
                    Demo credentials: <span className="text-zinc-400">admin / password</span>
                </p>
            </div>
        </div>
    );
}
