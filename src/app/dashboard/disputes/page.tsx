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
  updated_at: string;
};

const categories = [
  "Tax Assessment",
  "Market Levy",
  "Authority Harassment",
  "Business Registration",
  "Unfair Policy",
  "Other",
];

const statusConfig = {
  open: { label: "Open", className: "bg-amber-100 text-amber-700" },
  in_review: { label: "In Review", className: "bg-blue-100 text-blue-700" },
  resolved: { label: "Resolved", className: "bg-green-100 text-green-700" },
  closed: { label: "Closed", className: "bg-navy/10 text-navy/50" },
};

const priorityConfig = {
  low: { label: "Low", className: "text-navy/40" },
  normal: { label: "Normal", className: "text-blue-500" },
  high: { label: "High", className: "text-amber-500" },
  urgent: { label: "Urgent", className: "text-red-500" },
};

function StatusBadge({ status }: { status: Dispute["status"] }) {
  const cfg = statusConfig[status];
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

function TicketCard({
  dispute,
  onClick,
}: {
  dispute: Dispute;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      layout
      onClick={onClick}
      className="w-full text-left rounded-2xl border border-navy/10 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-brand/30"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-brand-600">
              {dispute.ticket_number}
            </span>
            <span className="text-navy/20">·</span>
            <span className="text-xs text-navy/45">{dispute.category}</span>
          </div>
          <h3 className="font-heading text-sm font-bold text-navy leading-snug">
            {dispute.subject}
          </h3>
          <p className="mt-1 text-xs text-navy/50 line-clamp-2">
            {dispute.description}
          </p>
        </div>
        <StatusBadge status={dispute.status} />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span
          className={`text-xs font-semibold ${
            priorityConfig[dispute.priority as keyof typeof priorityConfig]
              ?.className ?? ""
          }`}
        >
          {priorityConfig[dispute.priority as keyof typeof priorityConfig]
            ?.label ?? ""}{" "}
          priority
        </span>
        <span className="text-xs text-navy/35">
          {new Date(dispute.created_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
      {dispute.admin_response && (
        <div className="mt-3 rounded-xl bg-mist border border-navy/8 px-4 py-3">
          <p className="text-xs font-semibold text-navy/50 mb-1">
            Admin response
          </p>
          <p className="text-xs text-navy/70 line-clamp-2">
            {dispute.admin_response}
          </p>
        </div>
      )}
    </motion.button>
  );
}

function TicketDetail({
  dispute,
  onClose,
}: {
  dispute: Dispute;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-sm font-bold text-brand-600">
          {dispute.ticket_number}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-navy/40 hover:text-navy transition-colors text-xs font-medium"
        >
          ← Back to tickets
        </button>
      </div>

      <div className="flex flex-wrap items-start gap-3 justify-between mb-4">
        <h2 className="font-heading text-lg font-bold text-navy">
          {dispute.subject}
        </h2>
        <StatusBadge status={dispute.status} />
      </div>

      <div className="flex flex-wrap gap-4 mb-5 text-xs text-navy/50">
        <span>
          Category:{" "}
          <span className="font-semibold text-navy">{dispute.category}</span>
        </span>
        <span>
          Priority:{" "}
          <span
            className={`font-semibold ${
              priorityConfig[dispute.priority as keyof typeof priorityConfig]
                ?.className
            }`}
          >
            {
              priorityConfig[dispute.priority as keyof typeof priorityConfig]
                ?.label
            }
          </span>
        </span>
        <span>
          Filed:{" "}
          <span className="font-semibold text-navy">
            {new Date(dispute.created_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </span>
        <span>
          Last updated:{" "}
          <span className="font-semibold text-navy">
            {new Date(dispute.updated_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </span>
      </div>

      <div className="rounded-xl bg-mist border border-navy/8 p-4 mb-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-navy/45 mb-2">
          Your submission
        </p>
        <p className="text-sm leading-relaxed text-navy/75">
          {dispute.description}
        </p>
      </div>

      {dispute.admin_response ? (
        <div className="rounded-xl bg-brand/5 border border-brand/20 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 mb-2">
            Response from PHMTI
          </p>
          <p className="text-sm leading-relaxed text-navy/75">
            {dispute.admin_response}
          </p>
        </div>
      ) : (
        <div className="rounded-xl bg-mist border border-navy/8 p-4 text-center">
          <p className="text-xs text-navy/40">
            No response yet. Our team will review your ticket shortly.
          </p>
        </div>
      )}
    </motion.div>
  );
}

function NewDisputeForm({
  memberId,
  onSuccess,
  onCancel,
}: {
  memberId: string;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    category: "",
    subject: "",
    description: "",
    priority: "normal",
  });

  const set = (k: string, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: insertError } = await supabase.from("disputes").insert({
      member_id: memberId,
      category: form.category,
      subject: form.subject,
      description: form.description,
      priority: form.priority,
    });

    if (insertError) {
      setError("Failed to submit. Please try again.");
      setLoading(false);
      return;
    }

    onSuccess();
  }

  const inputClass =
    "w-full rounded-xl border border-navy/15 bg-mist px-4 py-3 text-sm text-navy placeholder:text-navy/35 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";
  const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/70";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading text-lg font-bold text-navy">
          File a Dispute
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs font-medium text-navy/40 hover:text-navy transition-colors"
        >
          Cancel
        </button>
      </div>

      <p className="mb-5 text-sm text-navy/55 leading-relaxed">
        Submit your dispute or complaint below. Our team will review it and
        respond as soon as possible. All submissions are private and
        confidential.
      </p>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Category</label>
            <select
              required
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className={inputClass}
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Priority</label>
            <select
              value={form.priority}
              onChange={(e) => set("priority", e.target.value)}
              className={inputClass}
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Subject</label>
          <input
            type="text"
            required
            maxLength={120}
            value={form.subject}
            onChange={(e) => set("subject", e.target.value)}
            placeholder="Brief summary of the issue"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            required
            rows={5}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Describe your dispute in detail — what happened, when, and who was involved…"
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-full bg-navy py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy/90 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting…" : "Submit Dispute"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-navy/15 px-6 py-3 text-sm font-medium text-navy/60 transition-colors hover:border-navy/30 hover:text-navy"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default function DisputesPage() {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [memberId, setMemberId] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "new" | "detail">("list");
  const [selected, setSelected] = useState<Dispute | null>(null);
  const [filter, setFilter] = useState<"all" | Dispute["status"]>("all");

  async function loadDisputes(uid: string) {
    const supabase = createClient();
    const { data } = await supabase
      .from("disputes")
      .select("*")
      .eq("member_id", uid)
      .order("created_at", { ascending: false });
    setDisputes(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    async function init() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setMemberId(user.id);
      await loadDisputes(user.id);
    }
    init();
  }, []);

  const filtered =
    filter === "all"
      ? disputes
      : disputes.filter((d) => d.status === filter);

  const counts = {
    all: disputes.length,
    open: disputes.filter((d) => d.status === "open").length,
    in_review: disputes.filter((d) => d.status === "in_review").length,
    resolved: disputes.filter((d) => d.status === "resolved").length,
    closed: disputes.filter((d) => d.status === "closed").length,
  };

  return (
    <div className="min-h-screen bg-mist px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-extrabold text-navy">
              Dispute Resolution
            </h1>
            <p className="mt-1 text-sm text-navy/55">
              File and track your disputes privately and securely.
            </p>
          </div>
          {view === "list" && (
            <button
              type="button"
              onClick={() => setView("new")}
              className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy/90 hover:scale-[1.02]"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Dispute
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {view === "new" && memberId && (
            <NewDisputeForm
              key="new"
              memberId={memberId}
              onCancel={() => setView("list")}
              onSuccess={async () => {
                await loadDisputes(memberId);
                setView("list");
              }}
            />
          )}

          {view === "detail" && selected && (
            <TicketDetail
              key="detail"
              dispute={selected}
              onClose={() => {
                setSelected(null);
                setView("list");
              }}
            />
          )}

          {view === "list" && (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Filter tabs */}
              <div className="mb-5 flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {(
                  [
                    ["all", "All"],
                    ["open", "Open"],
                    ["in_review", "In Review"],
                    ["resolved", "Resolved"],
                    ["closed", "Closed"],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFilter(key)}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                      filter === key
                        ? "bg-navy text-white"
                        : "bg-white border border-navy/15 text-navy/60 hover:border-navy/30 hover:text-navy"
                    }`}
                  >
                    {label}
                    {counts[key] > 0 && (
                      <span
                        className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                          filter === key
                            ? "bg-white/20 text-white"
                            : "bg-navy/8 text-navy/50"
                        }`}
                      >
                        {counts[key]}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {loading && (
                <div className="flex items-center justify-center py-20">
                  <div className="h-8 w-8 rounded-full border-2 border-navy/20 border-t-brand animate-spin" />
                </div>
              )}

              {!loading && filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-navy/10 bg-white">
                  <div className="h-14 w-14 rounded-full bg-mist flex items-center justify-center mb-4">
                    <svg
                      className="h-7 w-7 text-navy/25"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="font-heading text-sm font-bold text-navy/40">
                    {filter === "all"
                      ? "No disputes filed yet"
                      : `No ${filter.replace("_", " ")} disputes`}
                  </p>
                  <p className="mt-1 text-xs text-navy/30">
                    {filter === "all"
                      ? "Use the button above to file your first dispute."
                      : "Try switching to a different filter."}
                  </p>
                </div>
              )}

              {!loading && filtered.length > 0 && (
                <motion.div layout className="space-y-3">
                  <AnimatePresence>
                    {filtered.map((d) => (
                      <TicketCard
                        key={d.id}
                        dispute={d}
                        onClick={() => {
                          setSelected(d);
                          setView("detail");
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}