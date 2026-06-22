"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";

type Member = {
  id: string;
  full_name: string;
  business_name: string;
  business_category: string;
  market_location: string;
  phone: string;
  membership_status: "pending" | "active" | "suspended";
  dues_paid: boolean;
  joined_at: string;
};

const statusConfig = {
  active: { label: "Active", className: "bg-green-100 text-green-700" },
  pending: { label: "Pending", className: "bg-amber-100 text-amber-700" },
  suspended: { label: "Suspended", className: "bg-red-100 text-red-700" },
};

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | Member["membership_status"]>("all");
  const [updating, setUpdating] = useState<string | null>(null);

  async function loadMembers() {
    const supabase = createClient();
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, business_name, business_category, market_location, phone, membership_status, dues_paid, joined_at")
      .order("joined_at", { ascending: false });
    setMembers(data ?? []);
    setLoading(false);
  }

  useEffect(() => { loadMembers(); }, []);

  async function updateStatus(id: string, status: Member["membership_status"]) {
    setUpdating(id);
    const supabase = createClient();
    await supabase.from("profiles").update({ membership_status: status }).eq("id", id);
    await loadMembers();
    setUpdating(null);
  }

  const filtered = members.filter((m) => {
    const matchesFilter = filter === "all" || m.membership_status === filter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      m.full_name.toLowerCase().includes(q) ||
      m.business_name.toLowerCase().includes(q) ||
      m.market_location.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const counts = {
    all: members.length,
    active: members.filter((m) => m.membership_status === "active").length,
    pending: members.filter((m) => m.membership_status === "pending").length,
    suspended: members.filter((m) => m.membership_status === "suspended").length,
  };

  return (
    <div className="px-5 py-8 sm:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-extrabold text-navy">Members</h1>
        <p className="mt-1 text-sm text-navy/55">Review, approve, and manage all registered traders.</p>
      </div>

      {/* Summary */}
      {!loading && (
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Total Members", value: counts.all },
            { label: "Active", value: counts.active, color: "text-green-600" },
            { label: "Pending", value: counts.pending, color: "text-amber-600" },
            { label: "Suspended", value: counts.suspended, color: "text-red-600" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium text-navy/50">{s.label}</p>
              <p className={`mt-1.5 font-heading text-3xl font-extrabold ${s.color ?? "text-navy"}`}>
                {s.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Search + filter */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <svg className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-navy/15 bg-white py-3 pl-11 pr-4 text-sm text-navy placeholder:text-navy/35 shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "active", "pending", "suspended"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`rounded-full px-4 py-2 text-xs font-semibold capitalize transition-colors ${
                filter === s
                  ? "bg-navy text-white"
                  : "bg-white border border-navy/15 text-navy/60 hover:text-navy"
              }`}
            >
              {s}
              <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                filter === s ? "bg-white/20 text-white" : "bg-navy/8 text-navy/40"
              }`}>
                {counts[s]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 rounded-full border-2 border-navy/20 border-t-brand animate-spin" />
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-navy/10 bg-white text-center">
          <p className="font-heading text-sm font-bold text-navy/40">No members found</p>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="rounded-2xl border border-navy/10 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-navy/8 bg-mist">
                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-navy/45">Member</th>
                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-navy/45">Business</th>
                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-navy/45">Location</th>
                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-navy/45">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-navy/45">Joined</th>
                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-navy/45">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/6">
                {filtered.map((m) => (
                  <motion.tr
                    key={m.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-mist/50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-navy">{m.full_name}</p>
                      <p className="text-xs text-navy/45">{m.phone}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-navy">{m.business_name}</p>
                      <p className="text-xs text-navy/45">{m.business_category}</p>
                    </td>
                    <td className="px-5 py-4 text-xs text-navy/60">{m.market_location}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusConfig[m.membership_status].className}`}>
                        {statusConfig[m.membership_status].label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-navy/45">
                      {new Date(m.joined_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5">
                        {m.membership_status !== "active" && (
                          <button
                            type="button"
                            disabled={updating === m.id}
                            onClick={() => updateStatus(m.id, "active")}
                            className="rounded-lg bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700 hover:bg-green-200 transition-colors disabled:opacity-50"
                          >
                            Approve
                          </button>
                        )}
                        {m.membership_status !== "suspended" && (
                          <button
                            type="button"
                            disabled={updating === m.id}
                            onClick={() => updateStatus(m.id, "suspended")}
                            className="rounded-lg bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-200 transition-colors disabled:opacity-50"
                          >
                            Suspend
                          </button>
                        )}
                        {m.membership_status !== "pending" && (
                          <button
                            type="button"
                            disabled={updating === m.id}
                            onClick={() => updateStatus(m.id, "pending")}
                            className="rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 hover:bg-amber-200 transition-colors disabled:opacity-50"
                          >
                            Pending
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}