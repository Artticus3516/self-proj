"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

type TrafficLog = Database["public"]["Tables"]["traffic_logs"]["Row"];

const CARD_CLASSES = "rounded-xl border border-zinc-800 bg-zinc-900/60 p-5";

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 py-4">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
      {sub && <p className="mt-1 text-xs text-zinc-500">{sub}</p>}
    </div>
  );
}

export default function TrafficDashboardPage() {
  const [logs, setLogs] = useState<TrafficLog[]>([]);

  useEffect(() => {
    async function fetchTrafficLogs() {
      const { data } = await supabase
        .from("traffic_logs")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(200);
      setLogs(data ?? []);
    }
    void fetchTrafficLogs();
  }, []);

  const total = logs.length;
  const granted = logs.filter((l) => l.consent_granted).length;
  const denied = total - granted;
  const consentRate = total > 0 ? Math.round((granted / total) * 100) : 0;

  // Top paths by visit count
  const pathCounts = logs.reduce<Record<string, number>>((acc, l) => {
    acc[l.path] = (acc[l.path] ?? 0) + 1;
    return acc;
  }, {});
  const topPaths = Object.entries(pathCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="p-8 space-y-8 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Traffic Analytics</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Only visits where cookie consent was explicitly granted are recorded.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Page Views" value={total} sub="consent-granted only" />
        <StatCard label="Consent Rate" value={`${consentRate}%`} sub={`${granted} granted / ${denied} denied`} />
        <StatCard label="Granted" value={granted} sub="users tracked" />
        <StatCard label="Denied" value={denied} sub="not tracked" />
      </div>

      {/* Top paths */}
      {topPaths.length > 0 && (
        <div className={CARD_CLASSES}>
          <h2 className="text-sm font-semibold text-zinc-300 mb-4">Top Pages</h2>
          <div className="space-y-2">
            {topPaths.map(([path, count]) => (
              <div key={path} className="flex items-center gap-3">
                <span className="flex-1 text-sm text-zinc-400 font-mono truncate">{path}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <div
                    className="h-1.5 rounded-full bg-white/20"
                    style={{ width: `${Math.max(8, (count / (topPaths[0][1] || 1)) * 120)}px` }}
                    aria-hidden="true"
                  />
                  <span className="text-xs text-zinc-500 w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full log table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-300">Recent Activity Log</h2>
          <span className="text-xs text-zinc-600">{total} entries</span>
        </div>

        {total === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="text-sm text-zinc-600">No traffic data yet.</p>
            <p className="text-xs text-zinc-700 mt-1">
              Data is recorded only when a visitor accepts the cookie consent banner.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-left">
                  <th className="px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Path</th>
                  <th className="px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">User Agent</th>
                  <th className="px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Consent</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-zinc-800/60 hover:bg-zinc-800/30 transition-colors"
                  >
                    <td className="px-5 py-3 font-mono text-xs text-zinc-300">{log.path}</td>
                    <td className="px-5 py-3 text-xs text-zinc-500 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-5 py-3 text-xs text-zinc-600 max-w-xs truncate" title={log.user_agent}>
                      {log.user_agent.slice(0, 60)}…
                    </td>
                    <td className="px-5 py-3">
                      {log.consent_granted ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-0.5 text-[10px] font-medium text-emerald-400">
                          ✓ Granted
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-950/60 border border-red-800/50 px-2.5 py-0.5 text-[10px] font-medium text-red-400">
                          ✕ Denied
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
