"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Trader = {
  id: string;
  full_name: string;
  business_name: string;
  business_category: string;
  market_location: string;
  phone: string;
  bio: string | null;
  joined_at: string;
};

const categories = [
  "All Categories",
  "Textiles & Fabrics",
  "Fresh Produce",
  "Household Goods",
  "Electronics",
  "Food & Beverages",
  "Beauty & Personal Care",
  "Building Materials",
  "Fashion & Accessories",
  "Other",
];

function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const colors = [
    "bg-blue-600",
    "bg-emerald-600",
    "bg-violet-600",
    "bg-amber-600",
    "bg-rose-600",
    "bg-teal-600",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];

  return (
    <span
      className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${color} font-heading text-lg font-bold text-white shadow-sm`}
    >
      {initials}
    </span>
  );
}

function TraderCard({ trader }: { trader: Trader }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="group rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/8"
    >
      <div className="flex items-start gap-4">
        <InitialsAvatar name={trader.full_name} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-heading text-base font-bold text-navy leading-tight">
                {trader.business_name}
              </h3>
              <p className="text-sm text-navy/55">{trader.full_name}</p>
            </div>
            <span className="shrink-0 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-600">
              {trader.business_category}
            </span>
          </div>

          <div className="mt-3 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs text-navy/55">
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {trader.market_location}
            </div>
            <div className="flex items-center gap-2 text-xs text-navy/55">
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href={`tel:${trader.phone}`} className="transition-colors hover:text-brand-600">
                {trader.phone}
              </a>
            </div>
          </div>

          {trader.bio && (
            <div className="mt-3">
              <p className={`text-sm leading-relaxed text-navy/65 ${!expanded ? "line-clamp-2" : ""}`}>
                {trader.bio}
              </p>
              {trader.bio.length > 100 && (
                <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  className="mt-1 text-xs font-semibold text-brand-600 hover:underline"
                >
                  {expanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          )}

          <p className="mt-3 text-[11px] text-navy/35">
            Member since {new Date(trader.joined_at).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function DirectoryPage() {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, business_name, business_category, market_location, phone, bio, joined_at")
        .eq("membership_status", "active")
        .order("business_name", { ascending: true });

      setTraders(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return traders.filter((t) => {
      const matchesSearch =
        !q ||
        t.full_name.toLowerCase().includes(q) ||
        t.business_name.toLowerCase().includes(q) ||
        t.market_location.toLowerCase().includes(q) ||
        t.bio?.toLowerCase().includes(q);

      const matchesCategory =
        category === "All Categories" || t.business_category === category;

      return matchesSearch && matchesCategory;
    });
  }, [traders, search, category]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-mist pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              Member Directory
            </span>
            <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Find a PHMTI trader
            </h1>
            <p className="mt-3 max-w-xl text-base text-navy/60">
              Browse our network of active members — market traders, business owners,
              and association leaders driving tax reform across Nigeria.
            </p>
          </motion.div>

          {/* Search + Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/35"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder="Search by name, business, or location…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-navy/15 bg-white py-3 pl-11 pr-4 text-sm text-navy placeholder:text-navy/35 shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 sm:w-56"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </motion.div>

          {/* Result count */}
          {!loading && (
            <p className="mb-5 text-sm text-navy/45">
              {filtered.length === 0
                ? "No traders found"
                : `${filtered.length} trader${filtered.length === 1 ? "" : "s"} found`}
              {category !== "All Categories" && ` in ${category}`}
              {search && ` matching "${search}"`}
            </p>
          )}

          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <div className="h-10 w-10 rounded-full border-2 border-navy/20 border-t-brand animate-spin" />
              <p className="text-sm text-navy/45">Loading directory…</p>
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="h-16 w-16 rounded-full bg-white border border-navy/10 flex items-center justify-center mb-4 shadow-sm">
                <svg className="h-8 w-8 text-navy/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="font-heading text-base font-bold text-navy/40">No traders found</p>
              <p className="mt-1 text-sm text-navy/30">Try adjusting your search or category filter.</p>
              {(search || category !== "All Categories") && (
                <button
                  type="button"
                  onClick={() => { setSearch(""); setCategory("All Categories"); }}
                  className="mt-4 rounded-full border border-navy/15 px-5 py-2 text-sm font-medium text-navy/60 transition-colors hover:border-brand hover:text-brand-600"
                >
                  Clear filters
                </button>
              )}
            </motion.div>
          )}

          {/* Grid */}
          {!loading && filtered.length > 0 && (
            <motion.div
              layout
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((trader) => (
                  <motion.div
                    key={trader.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <TraderCard trader={trader} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* CTA for non-members */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 rounded-3xl bg-navy px-8 py-12 text-center"
          >
            <h2 className="font-heading text-2xl font-extrabold text-white">
              Not listed yet?
            </h2>
            <p className="mt-2 text-sm text-white/65 max-w-sm mx-auto">
              Join PHMTI and get your business in front of thousands of traders, buyers, and partners.
            </p>
            <Link
              href="/register"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand px-7 py-3 text-sm font-semibold text-navy shadow-lg shadow-brand/20 transition-transform hover:scale-105"
            >
              Become a Member
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}