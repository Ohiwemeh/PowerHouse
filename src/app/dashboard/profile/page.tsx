"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";

type Profile = {
  full_name: string;
  business_name: string;
  market_location: string;
  phone: string;
  business_category: string;
  bio: string;
};

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

const inputClass =
  "w-full rounded-xl border border-navy/15 bg-mist px-4 py-3 text-sm text-navy placeholder:text-navy/35 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors";
const labelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/70";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [form, setForm] = useState<Profile>({
    full_name: "",
    business_name: "",
    market_location: "",
    phone: "",
    business_category: "",
    bio: "",
  });

  const set = (k: keyof Profile, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      const { data } = await supabase
        .from("profiles")
        .select(
          "full_name, business_name, market_location, phone, business_category, bio"
        )
        .eq("id", user.id)
        .single();

      if (data) {
        setForm({
          full_name: data.full_name ?? "",
          business_name: data.business_name ?? "",
          market_location: data.market_location ?? "",
          phone: data.phone ?? "",
          business_category: data.business_category ?? "",
          bio: data.bio ?? "",
        });
      }
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
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: form.full_name,
        business_name: form.business_name,
        market_location: form.market_location,
        phone: form.phone,
        business_category: form.business_category,
        bio: form.bio,
      })
      .eq("id", userId!);

    if (updateError) {
      setError("Failed to save changes. Please try again.");
      setSaving(false);
      return;
    }

    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  }

  const bioLength = form.bio.length;
  const bioMax = 300;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-navy/20 border-t-brand animate-spin" />
          <p className="text-sm text-navy/45">Loading your profile…</p>
        </div>
      </div>
    );
  }

  const initials = form.full_name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-mist px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-2xl font-extrabold text-navy">
              My Profile
            </h1>
            <p className="mt-1 text-sm text-navy/55">
              Your info appears on the public trader directory once your
              membership is active.
            </p>
          </div>

          {/* Avatar preview */}
          <div className="mb-6 flex items-center gap-4 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-navy font-heading text-2xl font-bold text-brand">
              {initials || "PH"}
            </span>
            <div>
              <p className="font-heading text-base font-bold text-navy">
                {form.full_name || "Your Name"}
              </p>
              <p className="text-sm text-navy/55">
                {form.business_name || "Business Name"}
              </p>
              <p className="text-xs text-navy/40 mt-0.5">
                {form.market_location || "Market Location"}
              </p>
            </div>
          </div>

          {/* Alerts */}
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
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Profile updated successfully. Changes are live in the directory.
            </motion.div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm space-y-5"
          >
            {/* Personal info */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-navy/40">
                Personal Information
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.full_name}
                    onChange={(e) => set("full_name", e.target.value)}
                    placeholder="Amaka Okafor"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+234 801 234 5678"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-navy/8 pt-5">
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-navy/40">
                Business Information
              </p>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Business Name</label>
                    <input
                      type="text"
                      required
                      value={form.business_name}
                      onChange={(e) => set("business_name", e.target.value)}
                      placeholder="Amaka Fabrics"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Business Category</label>
                    <select
                      required
                      value={form.business_category}
                      onChange={(e) => set("business_category", e.target.value)}
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
                </div>
                <div>
                  <label className={labelClass}>Market / Location</label>
                  <input
                    type="text"
                    required
                    value={form.market_location}
                    onChange={(e) => set("market_location", e.target.value)}
                    placeholder="Balogun Market, Lagos"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="border-t border-navy/8 pt-5">
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-navy/40">
                Public Bio
              </p>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={labelClass} style={{ marginBottom: 0 }}>
                    About your business
                  </label>
                  <span
                    className={`text-xs font-medium ${
                      bioLength > bioMax ? "text-red-500" : "text-navy/35"
                    }`}
                  >
                    {bioLength}/{bioMax}
                  </span>
                </div>
                <textarea
                  rows={4}
                  maxLength={bioMax}
                  value={form.bio}
                  onChange={(e) => set("bio", e.target.value)}
                  placeholder="Tell other traders and customers what you sell, where you operate, and what makes your business stand out…"
                  className={`${inputClass} resize-none`}
                />
                <p className="mt-1.5 text-xs text-navy/40">
                  This appears on your public directory card. Keep it clear and
                  professional.
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="border-t border-navy/8 pt-5 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={saving || bioLength > bioMax}
                className="flex-1 rounded-full bg-navy py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy/90 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? "Saving changes…" : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="rounded-full border border-navy/15 px-6 py-3 text-sm font-medium text-navy/60 transition-colors hover:border-navy/30 hover:text-navy"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}