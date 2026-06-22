"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";

type Member = { id: string; full_name: string; business_name: string };

export default function AdminDuesPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    member_id: "",
    amount: "",
    period_label: "",
    due_date: "",
    status: "unpaid",
    payment_reference: "",
    paid_date: "",
    notes: "",
  });

  const set = (k: string, v: string) => setForm((prev) => ({ ...prev, [k]: v }));

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, business_name")
        .eq("membership_status", "active")
        .order("full_name");
      setMembers(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    const supabase = createClient();
    const { error: insertError } = await supabase.from("dues").insert({
      member_id: form.member_id,
      amount: parseFloat(form.amount),
      period_label: form.period_label,
      due_date: form.due_date,
      status: form.status,
      payment_reference: form.payment_reference || null,
      paid_date: form.paid_date || null,
      notes: form.notes || null,
    });

    if (insertError) {
      setError("Failed to post dues. Please try again.");
      setSaving(false);
      return;
    }

    setSaving(false);
    setSuccess(true);
    setForm({
      member_id: "",
      amount: "",
      period_label: "",
      due_date: "",
      status: "unpaid",
      payment_reference: "",
      paid_date: "",
      notes: "",
    });
    setTimeout(() => setSuccess(false), 4000);
  }

  const inputClass =
    "w-full rounded-xl border border-navy/15 bg-mist px-4 py-3 text-sm text-navy placeholder:text-navy/35 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";
  const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/70";

  return (
    <div className="px-5 py-8 sm:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-extrabold text-navy">Post Dues</h1>
        <p className="mt-1 text-sm text-navy/55">
          Add dues records to a member account. They will see it immediately in their dashboard.
        </p>
      </div>

      <div className="mx-auto max-w-xl">
        {error && (
          <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 flex items-center gap-2"
          >
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Dues posted successfully. Member can now see it in their dashboard.
          </motion.div>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm space-y-4"
        >
          <div>
            <label className={labelClass}>Member</label>
            <select
              required
              value={form.member_id}
              onChange={(e) => set("member_id", e.target.value)}
              className={inputClass}
              disabled={loading}
            >
              <option value="" disabled>Select a member</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.full_name} — {m.business_name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Amount (NGN)</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={form.amount}
                onChange={(e) => set("amount", e.target.value)}
                placeholder="5000"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Period Label</label>
              <input
                type="text"
                required
                value={form.period_label}
                onChange={(e) => set("period_label", e.target.value)}
                placeholder="Q1 2026 / Annual 2026"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Due Date</label>
              <input
                type="date"
                required
                value={form.due_date}
                onChange={(e) => set("due_date", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className={inputClass}
              >
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
                <option value="waived">Waived</option>
              </select>
            </div>
          </div>

          {form.status === "paid" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Paid Date</label>
                <input
                  type="date"
                  value={form.paid_date}
                  onChange={(e) => set("paid_date", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Payment Reference</label>
                <input
                  type="text"
                  value={form.payment_reference}
                  onChange={(e) => set("payment_reference", e.target.value)}
                  placeholder="TXN-123456"
                  className={inputClass}
                />
              </div>
            </div>
          )}

          <div>
            <label className={labelClass}>Notes (optional)</label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Any additional notes for this dues record..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-navy py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy/90 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Posting dues..." : "Post Dues to Member"}
          </button>
        </form>
      </div>
    </div>
  );
}