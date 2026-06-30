"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase";

type Workshop = {
  id: string;
  title: string;
  description: string | null;
  facilitator: string | null;
  location: string | null;
  is_online: boolean;
  meeting_link: string | null;
  scheduled_at: string;
  duration_minutes: number;
  capacity: number | null;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
};

type Resource = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_url: string | null;
  external_url: string | null;
  file_type: "pdf" | "video" | "link" | "doc";
  published_at: string;
};

const fileTypeConfig = {
  pdf: {
    label: "PDF",
    className: "bg-red-100 text-red-700",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  doc: {
    label: "DOC",
    className: "bg-blue-100 text-blue-700",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  video: {
    label: "Video",
    className: "bg-purple-100 text-purple-700",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  link: {
    label: "Link",
    className: "bg-green-100 text-green-700",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
};

function WorkshopCard({ workshop }: { workshop: Workshop }) {
  const date = new Date(workshop.scheduled_at);
  const isPast = date < new Date();
  const isOnline = workshop.is_online;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/8"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isOnline ? "bg-brand/10 text-brand-600" : "bg-navy/8 text-navy/60"
          }`}>
            {isOnline ? "Online" : "In Person"}
          </span>
          {workshop.status === "cancelled" && (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
              Cancelled
            </span>
          )}
        </div>
        <div className="text-right">
          <p className="font-heading text-sm font-bold text-navy">
            {date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </p>
          <p className="text-xs text-navy/45">
            {date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
            {" · "}
            {workshop.duration_minutes} mins
          </p>
        </div>
      </div>

      <h3 className="font-heading text-lg font-bold text-navy leading-snug">
        {workshop.title}
      </h3>

      {workshop.description && (
        <p className="mt-2 text-sm leading-relaxed text-navy/60 line-clamp-2">
          {workshop.description}
        </p>
      )}

      <div className="mt-4 space-y-1.5">
        {workshop.facilitator && (
          <div className="flex items-center gap-2 text-xs text-navy/55">
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {workshop.facilitator}
          </div>
        )}
        {workshop.location && (
          <div className="flex items-center gap-2 text-xs text-navy/55">
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {workshop.location}
          </div>
        )}
        {workshop.capacity && (
          <div className="flex items-center gap-2 text-xs text-navy/55">
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Capacity: {workshop.capacity} attendees
          </div>
        )}
      </div>

      {!isPast && workshop.status !== "cancelled" && (
        <div className="mt-5">
          {isOnline && workshop.meeting_link ? (
            <a
              href={workshop.meeting_link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full bg-navy py-2.5 text-center text-xs font-semibold text-white transition-all hover:bg-navy/90"
            >
              Join Online
            </a>
          ) : (
            <a
              href="mailto:info@PHHTTAI.org"
              className="block w-full rounded-full bg-navy py-2.5 text-center text-xs font-semibold text-white transition-all hover:bg-navy/90"
            >
              Register Interest
            </a>
          )}
        </div>
      )}

      {isPast && (
        <p className="mt-4 text-xs text-navy/35 italic">This session has ended.</p>
      )}
    </motion.div>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  const cfg = fileTypeConfig[resource.file_type];
  const href = resource.file_url ?? resource.external_url ?? "#";

  return (
    <motion.a
      href={href}
      target={href !== "#" ? "_blank" : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group flex items-start gap-4 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/8 hover:border-brand/30"
    >
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${cfg.className}`}>
        {cfg.icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-heading text-sm font-bold text-navy leading-snug">
            {resource.title}
          </h3>
          <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${cfg.className}`}>
            {cfg.label}
          </span>
        </div>
        {resource.description && (
          <p className="mt-1.5 text-xs leading-relaxed text-navy/55 line-clamp-2">
            {resource.description}
          </p>
        )}
        <div className="mt-2 flex items-center justify-between">
          <span className="rounded-full bg-mist px-2.5 py-1 text-[10px] font-semibold text-navy/50">
            {resource.category}
          </span>
          <span className="text-[10px] text-navy/35">
            {new Date(resource.published_at).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
          </span>
        </div>
      </div>
      <svg
        className="h-4 w-4 shrink-0 text-navy/25 transition-colors group-hover:text-brand-600 mt-1"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    </motion.a>
  );
}

export default function TrainingPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"workshops" | "resources">("workshops");
  const [resourceCategory, setResourceCategory] = useState("All");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const [{ data: w }, { data: r }] = await Promise.all([
        supabase.from("workshops").select("*").order("scheduled_at", { ascending: true }),
        supabase.from("resources").select("*").order("published_at", { ascending: false }),
      ]);
      setWorkshops(w ?? []);
      setResources(r ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const upcomingWorkshops = workshops.filter(
    (w) => new Date(w.scheduled_at) >= new Date() && w.status !== "cancelled"
  );
  const pastWorkshops = workshops.filter(
    (w) => new Date(w.scheduled_at) < new Date() || w.status === "cancelled"
  );

  const resourceCategories = ["All", ...Array.from(new Set(resources.map((r) => r.category)))];
  const filteredResources =
    resourceCategory === "All" ? resources : resources.filter((r) => r.category === resourceCategory);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-mist pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              Training & Resources
            </span>
            <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Learn. Grow. Trade smarter.
            </h1>
            <p className="mt-3 max-w-xl text-base text-navy/60">
              Free workshops, guides, and resources to help every Nigerian trader
              understand tax reform and grow their business.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="mb-8 flex gap-2 border-b border-navy/10">
            {(["workshops", "resources"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-brand text-navy"
                    : "border-transparent text-navy/45 hover:text-navy"
                }`}
              >
                {tab}
                {!loading && (
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    activeTab === tab ? "bg-brand/10 text-brand-600" : "bg-navy/8 text-navy/40"
                  }`}>
                    {tab === "workshops" ? workshops.length : resources.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {loading && (
            <div className="flex items-center justify-center py-24">
              <div className="h-9 w-9 rounded-full border-2 border-navy/20 border-t-brand animate-spin" />
            </div>
          )}

          {/* Workshops */}
          {!loading && activeTab === "workshops" && (
            <div>
              {upcomingWorkshops.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-heading text-lg font-bold text-navy mb-5">
                    Upcoming Sessions
                    <span className="ml-2 rounded-full bg-brand/10 px-2.5 py-1 text-xs font-bold text-brand-600">
                      {upcomingWorkshops.length}
                    </span>
                  </h2>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {upcomingWorkshops.map((w) => (
                      <WorkshopCard key={w.id} workshop={w} />
                    ))}
                  </div>
                </div>
              )}

              {pastWorkshops.length > 0 && (
                <div>
                  <h2 className="font-heading text-lg font-bold text-navy/50 mb-5">
                    Past Sessions
                  </h2>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 opacity-60">
                    {pastWorkshops.map((w) => (
                      <WorkshopCard key={w.id} workshop={w} />
                    ))}
                  </div>
                </div>
              )}

              {workshops.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="h-16 w-16 rounded-full bg-white border border-navy/10 flex items-center justify-center mb-4 shadow-sm">
                    <svg className="h-8 w-8 text-navy/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="font-heading text-base font-bold text-navy/40">No workshops scheduled yet</p>
                  <p className="mt-1 text-sm text-navy/30">Check back soon — new sessions are added regularly.</p>
                </div>
              )}
            </div>
          )}

          {/* Resources */}
          {!loading && activeTab === "resources" && (
            <div>
              <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {resourceCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setResourceCategory(cat)}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                      resourceCategory === cat
                        ? "bg-navy text-white"
                        : "bg-white border border-navy/15 text-navy/60 hover:border-navy/30 hover:text-navy"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {filteredResources.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {filteredResources.map((r) => (
                    <ResourceCard key={r.id} resource={r} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <p className="font-heading text-base font-bold text-navy/40">No resources yet</p>
                  <p className="mt-1 text-sm text-navy/30">Resources will appear here as they are published.</p>
                </div>
              )}
            </div>
          )}

          {!loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16 rounded-3xl bg-navy px-8 py-12 text-center"
            >
              <h2 className="font-heading text-2xl font-extrabold text-white">
                Want to attend a workshop?
              </h2>
              <p className="mt-2 text-sm text-white/65 max-w-sm mx-auto">
                Become a PHHTTAI member to get notified of new sessions and access
                exclusive member-only training materials.
              </p>
              <Link
                href="/register"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-brand px-7 py-3 text-sm font-semibold text-navy shadow-lg shadow-brand/20 transition-transform hover:scale-105"
              >
                Become a Member
              </Link>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}