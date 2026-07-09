"use client";

import { useState, useEffect } from "react";
import type { Database } from "@/lib/database.types";
import { getLeadsAction } from "./actions";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

function parseMessage(raw: string) {
  // Format: "[Arch Req] [Scale] Description" or plain message
  const match = raw.match(/^\[([^\]]+)\]\s*(?:\[([^\]]+)\])?\s*([\s\S]*)/);
  if (match) {
    return { archReq: match[1], scale: match[2] ?? null, body: match[3]?.trim() };
  }
  return { archReq: null, scale: null, body: raw };
}

export default function LeadsDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    async function fetchLeads() {
      const data = await getLeadsAction();
      setLeads(data ?? []);
    }
    void fetchLeads();
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Project Leads</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Incoming contact form submissions from prospective clients.
          </p>
        </div>
        <span className="font-mono text-xs text-zinc-600 border border-zinc-800 rounded-lg px-3 py-1.5">
          {leads.length} total
        </span>
      </div>

      {/* Table */}
      <div data-testid="leads-list" className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
        {leads.length === 0 ? (
          <div className="px-5 py-14 text-center space-y-2">
            <p className="text-sm text-zinc-600">No leads yet.</p>
            <p className="text-xs text-zinc-700">
              Submissions from the /contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-left">
                  {["Company / Name", "Email", "Service", "Scale", "Message", "Received"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-[10px] font-medium text-zinc-500 uppercase tracking-widest whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => {
                  const { archReq, scale, body } = parseMessage(lead.message);
                  return (
                    <tr
                      key={lead.id}
                      className="border-b border-zinc-800/60 hover:bg-zinc-800/30 transition-colors"
                    >
                      <td className="px-5 py-3 font-medium text-white whitespace-nowrap">
                        {lead.name}
                      </td>
                      <td className="px-5 py-3 text-zinc-400 text-xs">{lead.email}</td>
                      <td className="px-5 py-3">
                        {archReq ? (
                          <span className="inline-flex rounded-full border border-zinc-700 bg-zinc-800/60 px-2.5 py-0.5 text-[10px] font-medium text-zinc-300 whitespace-nowrap">
                            {archReq}
                          </span>
                        ) : (
                          <span className="text-zinc-700 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-xs text-zinc-500 whitespace-nowrap">
                        {scale ?? "—"}
                      </td>
                      <td className="px-5 py-3 text-xs text-zinc-500 max-w-xs truncate" title={body}>
                        {body || "—"}
                      </td>
                      <td className="px-5 py-3 text-xs text-zinc-600 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
