"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "./icons";

type NewsItem = {
  tag: string;
  title: string;
  excerpt?: string;
  date: string;
  image?: string;
  className: string;
};

const items: NewsItem[] = [
  {
    tag: "Feature",
    title: "Digital payments rollout reaches 600 stalls",
    excerpt:
      "Our cashless drive is helping traders get paid faster and build a verifiable sales history for loans.",
    date: "Jun 2026",
    image: "/images/news1.jpg",
    className: "sm:col-span-2 sm:row-span-2",
  },
  {
    tag: "Workshop",
    title: "Bookkeeping bootcamp — cohort 7 graduates",
    date: "May 2026",
    image: "/images/news2.jpg",
    className: "sm:col-span-2",
  },
  {
    tag: "Partnership",
    title: "New micro-finance line with regional bank",
    date: "May 2026",
    className: "bg-navy text-white",
  },
  {
    tag: "Community",
    title: "Solidarity fund supports 40 families",
    date: "Apr 2026",
    image: "/images/news3.jpg",
    className: "",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function News() {
  return (
    <section id="news" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-gold-600">
              News & updates
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Fresh from the market floor
            </h2>
          </div>
          <a
            href="#news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold-600"
          >
            View all stories
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid auto-rows-[180px] grid-cols-1 gap-5 sm:grid-cols-4"
        >
          {items.map((item) => {
            const dark = item.className.includes("bg-navy");
            return (
              <motion.article
                key={item.title}
                variants={cardVariants}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-navy/10 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-navy/10 ${
                  dark ? "bg-navy text-white" : "bg-mist text-navy"
                } ${item.className}`}
              >
                {item.image && (
                  <>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-transparent" />
                  </>
                )}
                <div className="relative">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      item.image
                        ? "bg-gold text-navy"
                        : dark
                          ? "bg-gold text-navy"
                          : "bg-navy/10 text-navy"
                    }`}
                  >
                    {item.tag}
                  </span>
                  <h3
                    className={`mt-3 font-heading text-lg font-bold leading-snug ${
                      item.image ? "text-white" : ""
                    }`}
                  >
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        item.image ? "text-white/80" : "text-navy/65"
                      }`}
                    >
                      {item.excerpt}
                    </p>
                  )}
                  <p
                    className={`mt-3 text-xs font-medium ${
                      item.image
                        ? "text-white/70"
                        : dark
                          ? "text-white/60"
                          : "text-navy/50"
                    }`}
                  >
                    {item.date}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
