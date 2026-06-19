"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";

type Due = {
  id: string;
  amount: number;
  currency: string;
  period_label: string;
  due_date: string;
  paid_date: string | null;
  status: "unpaid" | "paid" | "overdue" | "waived";
  payment_reference: string | null;
  notes: string | null;
};

const statusConfig = {
  paid: {
    label: "Paid",
    className: "bg-green-100 text-green-700",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  unpaid: {
    label: "Unpaid",
    className: "bg-amber-100 text-amber-700",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  overdue: {
    label: "Overdue",
    className: "bg-red-100 text-red-700",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  waived: {
    label: "Waived",
    className: "bg-navy/8 text-navy/50",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
};

function StatusBadge({ status }: { status: Due["status"] }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${cfg.className}`}>
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
}

function SummaryCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className={`rounded-2xl border bg-white p-5 shadow-sm ${accent ?? "border-navy/10"}`}>
      <p className="text-xs font-medium text-navy/50">{label}</p>
      <p className={`mt-1.5 font-heading text-2xl font-extrabold ${accent ? "text-red-600" : "text-navy"}`}>
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-navy/40">{sub}</p>}
    </div>
  );
}

export default function DuesPage() {
  const [dues, setDues] = useState<Due[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | Due["status"]>("all");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("dues")
        .select("*")
        .eq("member_id", user.id)
        .order("due_date", { ascending: false });

      setDues(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const totalPaid = dues
    .filter((d) => d.status === "paid")
    .reduce((sum, d) => sum + d.amount, 0);

  const totalOwed = dues
    .filter((d) => d.status === "unpaid" || d.status === "overdue")
    .reduce((sum, d) => sum + d.amount, 0);

  const overdueCount = dues.filter((d) => d.status === "overdue").length;
  const lastPaid = dues.find((d) => d.status === "paid");

  const filtered =
    filter === "all" ? dues : dues.filter((d) => d.status === filter);

  const counts = {
    all: dues.length,
    paid: dues.filter((d) => d.status === "paid").length,
    unpaid: dues.filter((d) => d.status === "unpaid").length,
    overdue: dues.filter((d) => d.status === "overdue").length,
    waived: dues.filter((d) => d.status === "waived").length,
  };

  return (
    <div className="min-h-screen bg-mist px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-2xl font-extrabold text-navy">
              Dues & Payments
            </h1>
            <p className="mt-1 text-sm text-navy/55">
              Track your membership contributions and payment history.
            </p>
          </div>

          {/* Summary cards */}
          {!loading && (
            <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <SummaryCard
                label="Total Paid"
                value={formatNaira(totalPaid)}
                sub={`${counts.paid} payment${counts.paid !== 1 ? "s" : ""}`}
              />
              <SummaryCard
                label="Outstanding"
                value={formatNaira(totalOwed)}
                sub={totalOwed > 0 ? "Please settle soon" : "All clear!"}
                accent={totalOwed > 0 ? "border-red-200" : undefined}
              />
              <SummaryCard
                label="Overdue"
                value={String(overdueCount)}
                sub={overdueCount > 0 ? "Needs attention" : "None overdue"}
                accent={overdueCount > 0 ? "border-red-200" : undefined}
              />
              <SummaryCard
                label="Last Payment"
                value={
                  lastPaid?.paid_date
                    ? new Date(lastPaid.paid_date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })
                    : "—"
                }
                sub={lastPaid?.period_label ?? "No payments yet"}
              />
            </div>
          )}

          {/* Overdue alert */}
          {!loading && overdueCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-4"
            >
              <svg
                className="h-5 w-5 shrink-0 text-red-500 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <p className="text-sm font-semibold text-red-700">
                  You have {overdueCount} overdue payment{overdueCount !== 1 ? "s" : ""}
                </p>
                <p className="mt-0.5 text-xs text-red-600">
                  Please contact the PHMTI office to settle outstanding dues and
                  keep your membership active.
                </p>
              </div>
            </motion.div>
          )}

          {/* All clear */}
          {!loading && totalOwed === 0 && dues.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-3 rounded-xl bg-green-50 border border-green-200 px-4 py-3"
            >
              <svg
                className="h-5 w-5 shrink-0 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm font-semibold text-green-700">
                All dues are up to date. Thank you!
              </p>
            </motion.div>
          )}

          {/* Filter tabs */}
          <div className="mb-5 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {(
              [
                ["all", "All"],
                ["unpaid", "Unpaid"],
                ["overdue", "Overdue"],
                ["paid", "Paid"],
                ["waived", "Waived"],
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

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 rounded-full border-2 border-navy/20 border-t-brand animate-spin" />
            </div>
          )}

          {/* Empty state */}
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <p className="font-heading text-sm font-bold text-navy/40">
                {filter === "all" ? "No dues records yet" : `No ${filter} dues`}
              </p>
              <p className="mt-1 text-xs text-navy/30 max-w-xs">
                {filter === "all"
                  ? "Your membership dues will appear here once the admin posts them."
                  : "Try a different filter."}
              </p>
            </div>
          )}

          {/* Dues list */}
          {!loading && filtered.length > 0 && (
            <div className="space-y-3">
              {filtered.map((due, i) => (
                <motion.div
                  key={due.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-heading text-base font-bold text-navy">
                        {due.period_label}
                      </p>
                      <p className="text-xs text-navy/45 mt-0.5">
                        Due:{" "}
                        {new Date(due.due_date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="font-heading text-lg font-extrabold text-navy">
                        {formatNaira(due.amount)}
                      </p>
                      <StatusBadge status={due.status} />
                    </div>
                  </div>

                  {/* Payment details */}
                  {due.status === "paid" && (
                    <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-green-50 border border-green-100 p-3">
                      {due.paid_date && (
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-green-600">
                            Paid on
                          </p>
                          <p className="text-xs font-medium text-green-800 mt-0.5">
                            {new Date(due.paid_date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      )}
                      {due.payment_reference && (
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-green-600">
                            Reference
                          </p>
                          <p className="font-mono text-xs font-medium text-green-800 mt-0.5">
                            {due.payment_reference}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Overdue / unpaid CTA */}
                  {(due.status === "overdue" || due.status === "unpaid") && (
                    <div className="mt-4 flex items-center justify-between rounded-xl bg-mist border border-navy/8 px-4 py-3">
                      <p className="text-xs text-navy/55">
                        Contact the PHMTI office to make payment
                      </p>
                      <a
                        href="mailto:dues@phmti.org"
                        className="text-xs font-semibold text-brand-600 hover:underline shrink-0"
                      >
                        Contact us
                      </a>
                    </div>
                  )}

                  {due.notes && (
                    <p className="mt-3 text-xs text-navy/40 italic">
                      {due.notes}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Payment info */}
          {!loading && (
            <div className="mt-8 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
              <h2 className="font-heading text-sm font-bold text-navy mb-3">
                How to pay your dues
              </h2>
              <div className="space-y-2 text-sm text-navy/60">
                <p>
                  Bank transfer to{" "}
                  <span className="font-semibold text-navy">Power House MTI</span>
                </p>
                <p>
                  Account number:{" "}
                  <span className="font-mono font-semibold text-navy">0123456789</span>
                </p>
                <p>
                  Bank:{" "}
                  <span className="font-semibold text-navy">First Bank Nigeria</span>
                </p>
                <p className="text-xs text-navy/40 pt-1">
                  Use your full name and member ID as payment reference, then
                  notify the office via{" "}
                  <a
                    href="mailto:dues@phmti.org"
                    className="text-brand-600 hover:underline"
                  >
                    dues@phmti.org
                  </a>
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}