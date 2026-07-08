"use client";

import { useState, useEffect, useTransition } from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

type Service = Database["public"]["Tables"]["services"]["Row"];

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function fetchServices() {
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: true });
    setServices(data ?? []);
  }

  useEffect(() => { void fetchServices(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const { error: err } = await supabase.from("services").insert({ title, description });
    if (err) { setError(err.message); return; }
    setTitle("");
    setDescription("");
    void fetchServices();
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await supabase.from("services").delete().eq("id", id);
      void fetchServices();
    });
  }

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Services</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Manage the agency service offerings displayed across the platform.
        </p>
      </div>

      {/* Add form */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
        <h2 className="text-xs font-mono tracking-[0.25em] text-zinc-500 uppercase">Add Service</h2>
        <form onSubmit={handleAdd} className="space-y-3">
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Service title"
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-zinc-600 transition-colors"
          />
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description of this service offering"
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-zinc-600 transition-colors resize-none"
          />
          {error && <p className="text-xs text-red-400 font-mono">{error}</p>}
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors"
          >
            Add Service
          </button>
        </form>
      </div>

      {/* Services list */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-xs font-mono tracking-[0.25em] text-zinc-500 uppercase">
            Current Services
          </h2>
          <span className="text-xs text-zinc-600 font-mono">{services.length} entries</span>
        </div>

        {services.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-zinc-700">No services yet.</div>
        ) : (
          <ul className="divide-y divide-zinc-800/60">
            {services.map((svc) => (
              <li
                key={svc.id}
                className="flex items-start justify-between gap-4 px-5 py-4 hover:bg-zinc-800/20 transition-colors group"
              >
                <div className="min-w-0 space-y-0.5">
                  <p className="text-sm font-medium text-white">{svc.title}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed">{svc.description}</p>
                </div>
                <button
                  onClick={() => handleDelete(svc.id)}
                  disabled={isPending}
                  className="shrink-0 mt-0.5 rounded-lg border border-zinc-800 px-3 py-1.5 text-[10px] font-mono text-zinc-600 hover:border-red-900/60 hover:text-red-400 transition-colors disabled:opacity-40"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
