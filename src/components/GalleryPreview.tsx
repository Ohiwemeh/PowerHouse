"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase";

type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  media_type: "image" | "video";
  url: string;
  category: string;
  featured: boolean;
};

export default function GalleryPreview() {
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("gallery")
        .select("*")
        .eq("featured", true)
        .order("published_at", { ascending: false })
        .limit(6);
      setItems(data ?? []);
    }
    load();
  }, []);

  if (items.length === 0) return null;

  return (
    <section id="gallery" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              Gallery
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              PHMTI in action
            </h2>
            <p className="mt-3 text-base text-navy/60">
              Moments from our advocacy drives, workshops, and community events across Nigeria.
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-brand-600"
          >
            View all photos
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.08 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-2xl bg-mist ${
                i === 0 ? "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2" : ""
              }`}
              style={{ aspectRatio: i === 0 ? "auto" : "4/3", minHeight: i === 0 ? "300px" : "180px" }}
            >
              <Image
                src={item.url}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="mb-1 inline-block rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-bold text-navy">
                  {item.category}
                </span>
                <p className="font-heading text-sm font-bold text-white leading-snug">
                  {item.title}
                </p>
              </div>
              {item.media_type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-white/90 shadow-lg">
                    <svg className="h-5 w-5 text-navy ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}