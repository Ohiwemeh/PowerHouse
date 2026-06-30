"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase";

type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  media_type: "image" | "video";
  url: string;
  thumbnail_url: string | null;
  category: string;
  featured: boolean;
  published_at: string;
};

const categories = ["All", "Events", "Workshops", "Advocacy", "Community", "General"];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("gallery")
        .select("*")
        .order("published_at", { ascending: false });
      setItems(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = category === "All" ? items : items.filter((i) => i.category === category);

  const counts: Record<string, number> = { All: items.length };
  categories.slice(1).forEach((c) => {
    counts[c] = items.filter((i) => i.category === c).length;
  });

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
              Gallery
            </span>
            <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              PHHTTAI in action
            </h1>
            <p className="mt-3 max-w-xl text-base text-navy/60">
              Photos and videos from our advocacy drives, workshops, and community events across Nigeria.
            </p>
          </motion.div>

          {/* Category filter */}
          <div className="mb-8 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  category === cat
                    ? "bg-navy text-white"
                    : "bg-white border border-navy/15 text-navy/60 hover:border-navy/30 hover:text-navy"
                }`}
              >
                {cat}
                {counts[cat] > 0 && (
                  <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    category === cat ? "bg-white/20 text-white" : "bg-navy/8 text-navy/40"
                  }`}>
                    {counts[cat]}
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

          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="font-heading text-base font-bold text-navy/40">No media found</p>
              <p className="mt-1 text-sm text-navy/30">Try a different category filter.</p>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <motion.div layout className="columns-2 gap-4 sm:columns-3 lg:columns-4">
              <AnimatePresence>
                {filtered.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="group mb-4 break-inside-avoid"
                  >
                    <button
                      type="button"
                      onClick={() => setLightbox(item)}
                      className="relative block w-full overflow-hidden rounded-2xl bg-navy/5 cursor-zoom-in"
                    >
                      <Image
                        src={item.thumbnail_url ?? item.url}
                        alt={item.title}
                        width={600}
                        height={400}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="mb-1 inline-block rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-navy">
                          {item.category}
                        </span>
                        <p className="font-heading text-xs font-bold text-white leading-snug">
                          {item.title}
                        </p>
                      </div>
                      {item.media_type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow-lg">
                            <svg className="h-4 w-4 text-navy ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 px-4 py-8"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute -top-10 right-0 text-white/60 hover:text-white text-sm font-medium"
              >
                Close (Esc)
              </button>
              <div className="relative overflow-hidden rounded-2xl bg-navy">
                <Image
                  src={lightbox.url}
                  alt={lightbox.title}
                  width={1200}
                  height={800}
                  className="w-full object-contain max-h-[75vh]"
                />
              </div>
              <div className="mt-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-heading text-base font-bold text-white">{lightbox.title}</p>
                    {lightbox.description && (
                      <p className="mt-1 text-sm text-white/60">{lightbox.description}</p>
                    )}
                  </div>
                  <span className="shrink-0 rounded-full bg-brand/20 px-3 py-1 text-xs font-semibold text-brand-400">
                    {lightbox.category}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}