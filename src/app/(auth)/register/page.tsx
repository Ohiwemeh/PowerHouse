"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";

const categories = [
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

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    full_name: "",
    business_name: "",
    market_location: "",
    phone: "",
    business_category: "",
    email: "",
    password: "",
  });

  const set = (k: string, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.full_name,
          business_name: form.business_name,
          market_location: form.market_location,
          phone: form.phone,
          business_category: form.business_category,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-mist flex items-center justify-center px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg"
      >
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-navy font-display text-xl text-brand">
            PH
          </span>
          <span className="font-heading text-sm font-bold uppercase leading-tight tracking-wide text-navy">
            Power House
            <span className="block text-[10px] font-medium tracking-widest text-brand-600">
              Market Traders Initiative
            </span>
          </span>
        </div>

        <div className="rounded-2xl border border-navy/10 bg-white p-8 shadow-xl shadow-navy/5">
          <h1 className="font-heading text-2xl font-extrabold text-navy">
            Become a member
          </h1>
          <p className="mt-1 text-sm text-navy/60">
            Join thousands of traders building stronger businesses.
          </p>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/70">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={form.full_name}
                  onChange={(e) => set("full_name", e.target.value)}
                  placeholder="Amaka Okafor"
                  className="w-full rounded-xl border border-navy/15 bg-mist px-4 py-3 text-sm text-navy placeholder:text-navy/35 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/70">
                  Business Name
                </label>
                <input
                  type="text"
                  required
                  value={form.business_name}
                  onChange={(e) => set("business_name", e.target.value)}
                  placeholder="Amaka Fabrics"
                  className="w-full rounded-xl border border-navy/15 bg-mist px-4 py-3 text-sm text-navy placeholder:text-navy/35 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/70">
                  Market / Location
                </label>
                <input
                  type="text"
                  required
                  value={form.market_location}
                  onChange={(e) => set("market_location", e.target.value)}
                  placeholder="Balogun Market, Lagos"
                  className="w-full rounded-xl border border-navy/15 bg-mist px-4 py-3 text-sm text-navy placeholder:text-navy/35 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/70">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+234 801 234 5678"
                  className="w-full rounded-xl border border-navy/15 bg-mist px-4 py-3 text-sm text-navy placeholder:text-navy/35 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/70">
                Business Category
              </label>
              <select
                required
                value={form.business_category}
                onChange={(e) => set("business_category", e.target.value)}
                className="w-full rounded-xl border border-navy/15 bg-mist px-4 py-3 text-sm text-navy focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                <option value="" disabled>Select a category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="border-t border-navy/8 pt-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-navy/50">
                Login credentials
              </p>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/70">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="amaka@example.com"
                    className="w-full rounded-xl border border-navy/15 bg-mist px-4 py-3 text-sm text-navy placeholder:text-navy/35 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/70">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={form.password}
                    onChange={(e) => set("password", e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full rounded-xl border border-navy/15 bg-mist px-4 py-3 text-sm text-navy placeholder:text-navy/35 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-full bg-navy py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-navy/90 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating your account…" : "Create Account"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-navy/55">
            Already a member?{" "}
            <Link href="/login" className="font-semibold text-brand-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}