"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase";

type Dispute = {
  id: string;
  ticket_number: string;
  category: string;
  subject: string;
  description: string;
  status: "open" | "in_review" | "resolved" | "closed";
  priority: string;
  admin_response: string | null;
  created_at: string;
  member: {
    full_name: string;
    business_name: string;
  } | null;
};

const statusConfig = {
  open: { label: "Open", className: "bg-amber-100 text-amber-700" },
  in_review: { label: "In Review", className: "bg-blue-100 text-blue-700" },
  resolved: { label: "Resolved", className: "bg-green-100 text-green-700" },
  closed: { label: "Closed", className: "bg-navy/10 text-navy/50" },
};

const priorityConfig = {
  low: "text-navy/40",
  normal: "text-blue-500",
  high: "text-amber-500",
  urgent: "text-red-500",
};

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Dispute | null>(null);
  const [filter, setFilter] = useState<"all" | Dispute["status"]>("all");
  const [response, setResponse] = useState("");
  const [newStatus, setNewStatus] = useState<Dispute["status"]>("in_review");
  const [saving, setSaving] = useState(false);

  async function loadDisputes() {
    const supabase = createClient();
    const { data } = await supabase
      .from("disputes")
      .select("*, member:member_id(full_name, business_name)")
      .order("created_at", { ascending: false });
    setDisputes((data as Dispute[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { loadDisputes(); }, []);

  async function handleRespond() {
    if (!selected) return;
    setSaving(true);
    const supabase = createClient();
    await supabase
      .from("disputes")
      .update({ admin_response: response, status: newStatus })
      .eq("id", selected.id);
    await loadDisputes();
    setSelected(null);
    setResponse("");
    setSaving(false);
  }

  const filtered = filter === "all" ? disputes : disputes.filter((d) => d.status === filter);

  const counts = {
    all: disputes.length,
    open: disputes.filter((d) => d.status === "open").length,
    in_review: disputes.filter((d) => d.status === "in_review").length,
    resolved: disputes.filter((d) => d.status === "resolved").length,
    closed: disputes.filter((d) => d.status === "closed").length,
  };

  return (
    <div className="px-5 py-8 sm:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-extrabold text-navy">Disputes</h1>
        <p className="mt-1 text-sm text-navy/55">Review and respond to member dispute tickets.</p>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {(["all", "open", "in_review", "resolved", "closed"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold capitalize transition-colors ${
              filter === s
                ? "bg-navy text-white"
                : "bg-white border border-navy/15 text-navy/60 hover:text-navy"
            }`}
          >
            {s.replace("_", " ")}
            {counts[s] > 0 && (
              <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                filter === s ? "bg-white/20 text-white" : "bg-navy/8 text-navy/40"
              }`}>
                {counts[s]}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* List */}
        <div className="space-y-3">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 rounded-full border-2 border-navy/20 border-t-brand animate-spin" />
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-navy/10 bg-white text-center">
              <p className="font-heading text-sm font-bold text-navy/40">No disputes found</p>
            </div>
          )}

          {!loading && filtered.map((d) => (
            <motion.button
              key={d.id}
              type="button"
              onClick={() => { setSelected(d); setResponse(d.admin_response ?? ""); setNewStatus(d.status); }}
              className={`w-full text-left rounded-2xl border p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                selected?.id === d.id
                  ? "border-brand bg-brand/5"
                  : "border-navy/10 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="font-mono text-xs font-bold text-brand-600">{d.ticket_number}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusConfig[d.status].className}`}>
                  {statusConfig[d.status].label}
                </span>
              </div>
              <p className="font-heading text-sm font-bold text-navy">{d.subject}</p>
              <p className="mt-1 text-xs text-navy/50 line-clamp-1">{d.description}</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-navy/40">
                  {d.member?.full_name} · {d.category}
                </p>
                <p className={`text-xs font-semibold capitalize ${priorityConfig[d.priority as keyof typeof priorityConfig]}`}>
                  {d.priority}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detail / response panel */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-sm font-bold text-brand-600">{selected.ticket_number}</span>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="text-xs text-navy/40 hover:text-navy"
                  >
                    Close
                  </button>
                </div>

                <h2 className="font-heading text-base font-bold text-navy mb-1">{selected.subject}</h2>
                <p className="text-xs text-navy/50 mb-4">
                  {selected.member?.full_name} · {selected.member?.business_name} · {selected.category}
                </p>

                <div className="rounded-xl bg-mist border border-navy/8 p-4 mb-4">
                  <p className="text-xs font-semibold text-navy/45 uppercase tracking-wide mb-1">Submission</p>
                  <p className="text-sm text-navy/70 leading-relaxed">{selected.description}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/70">
                      Update Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as Dispute["status"])}
                      className="w-full rounded-xl border border-navy/15 bg-mist px-4 py-2.5 text-sm text-navy focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                    >
                      <option value="open">Open</option>
                      <option value="in_review">In Review</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/70">
                      Response to Member
                    </label>
                    <textarea
                      rows={5}
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder="Write your response to the member..."
                      className="w-full rounded-xl border border-navy/15 bg-mist px-4 py-3 text-sm text-navy placeholder:text-navy/35 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none"
                    />
                  </div>

                  <button
                    type="button"
                    disabled={saving}
                    onClick={handleRespond}
                    className="w-full rounded-full bg-navy py-3 text-sm font-semibold text-white transition-all hover:bg-navy/90 disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save Response"}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 rounded-2xl border border-navy/10 bg-white text-center"
              >
                <p className="text-sm font-medium text-navy/35">Select a ticket to respond</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}