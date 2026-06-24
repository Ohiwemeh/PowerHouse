"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";
import Link from "next/link";

type Profile = {
  full_name: string;
  business_name: string;
  market_location: string;
  business_category: string;
  membership_status: string;
  dues_paid: boolean;
  joined_at: string;
};

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    label: "My Profile",
    href: "/dashboard/profile",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    label: "Disputes",
    href: "/dashboard/disputes",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    label: "Dues & Payments",
    href: "/dashboard/dues",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  },
  {
    label: "Training",
    href: "/training",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    label: "Directory",
    href: "/directory",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-mist flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-2 border-navy/20 border-t-brand animate-spin" />
          <p className="text-sm text-navy/50">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  const initials = profile?.full_name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() ?? "PH";

  const statusColor =
    profile?.membership_status === "active"
      ? "bg-green-100 text-green-700"
      : profile?.membership_status === "suspended"
      ? "bg-red-100 text-red-700"
      : "bg-amber-100 text-amber-700";

  return (
    <div className="min-h-screen bg-mist flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-navy text-white fixed inset-y-0 left-0 z-30">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
           <img src="https://res.cloudinary.com/dfdtcwwh3/image/upload/f_auto,q_auto/WhatsApp_Image_2026-06-22_at_19.49.13-removebg-preview_l95zju" alt="logo" className="h-15 w-25" />
          <span className="font-heading text-xs font-bold uppercase leading-tight tracking-wide">
            Power House
            <span className="block text-[10px] font-medium tracking-widest text-brand-400">
              Member Portal
            </span>
          </span>
        </div>
        

       <nav className="flex-1 px-3 py-6 space-y-1">
  {navItems.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-colors"
    >
      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
      </svg>
      {item.label}
    </Link>
  ))}
</nav>
        

        <div className="px-3 pb-6 border-t border-white/10 pt-4">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5">
            <img src="https://res.cloudinary.com/dfdtcwwh3/image/upload/f_auto,q_auto/WhatsApp_Image_2026-06-22_at_19.49.13-removebg-preview_l95zju" alt="logo" className="h-15 w-25" />
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-white">{profile?.full_name}</p>
              <p className="truncate text-[10px] text-white/50">{profile?.business_name}</p>
            </div>
          </div>
          <Link
  href="/dashboard/profile"
  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-white"
>
  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
  Edit Profile
</Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-2 w-full rounded-xl px-3 py-2 text-left text-xs font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-64 px-5 py-8 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="font-heading text-2xl font-extrabold text-navy">
                Good day, {profile?.full_name.split(" ")[0]} 👋
              </h1>
              <p className="mt-1 text-sm text-navy/55">{profile?.business_name} · {profile?.market_location}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusColor}`}>
              {profile?.membership_status}
            </span>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-8">
            {[
              { label: "Membership Status", value: profile?.membership_status ?? "—", highlight: true },
              { label: "Dues Paid", value: profile?.dues_paid ? "Up to date" : "Outstanding" },
              { label: "Business Category", value: profile?.business_category ?? "—" },
              { label: "Member Since", value: profile?.joined_at ? new Date(profile.joined_at).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : "—" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-medium text-navy/50">{s.label}</p>
                <p className="mt-1.5 font-heading text-base font-bold capitalize text-navy">
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          {/* Placeholder sections */}
          <div className="grid gap-5 lg:grid-cols-2">
            {/* Notices */}
            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-base font-bold text-navy mb-4">
                Latest Notices
              </h2>
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="h-12 w-12 rounded-full bg-mist flex items-center justify-center mb-3">
                  <svg className="h-6 w-6 text-navy/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-navy/40">No notices yet</p>
                <p className="text-xs text-navy/30 mt-1">Check back soon for updates from leadership.</p>
              </div>
            </div>

            {/* Upcoming Training */}
            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-base font-bold text-navy mb-4">
                Upcoming Training
              </h2>
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="h-12 w-12 rounded-full bg-mist flex items-center justify-center mb-3">
                  <svg className="h-6 w-6 text-navy/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-navy/40">No sessions scheduled</p>
                <p className="text-xs text-navy/30 mt-1">New workshops will appear here when posted.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}