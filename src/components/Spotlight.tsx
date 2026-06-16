"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { QuoteIcon } from "./icons";

type Trader = {
  name: string;
  trade: string;
  market: string;
  image: string;
  quote: string;
};

const traders: Trader[] = [
  {
    name: "Amaka Okafor",
    trade: "Textiles & Fabrics",
    market: "Balogun Market",
    image: "/images/trader1.jpg",
    quote:
      "Power House taught me to track my stock and accept mobile payments. My sales doubled in one season — and for the first time I have savings.",
  },
  {
    name: "Ibrahim Sule",
    trade: "Fresh Produce",
    market: "Mile 12 Market",
    image: "/images/trader2.jpg",
    quote:
      "Through the initiative I found suppliers two states away. The partnership network opened doors I couldn't reach on my own.",
  },
  {
    name: "Grace Adeyemi",
    trade: "Household Goods",
    market: "Oyingbo Market",
    image: "/images/trader3.jpg",
    quote:
      "When the levy disputes started, Power House spoke for all of us. Knowing I'm not alone in this trade changed everything.",
  },
];

export default function Spotlight() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + traders.length) % traders.length);
  }, []);

  useEffect(() => {
    const id = setInterval(() => go(1), 7000);
    return () => clearInterval(id);
  }, [go]);

  const trader = traders[index];

  return (
    <section id="spotlight" className="bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-gold-600">
            Trader spotlight
          </span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Real people. Real progress.
          </h2>
        </div>

        <div className="overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-xl shadow-navy/5">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-0 md:grid-cols-2"
            >
              <div className="relative h-72 md:h-auto">
                <Image
                  src={trader.image}
                  alt={trader.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent md:bg-gradient-to-r" />
              </div>

              <div className="flex flex-col justify-center p-8 sm:p-12">
                <QuoteIcon className="h-10 w-10 text-gold" />
                <blockquote className="mt-5 font-heading text-xl font-semibold leading-relaxed text-navy sm:text-2xl">
                  “{trader.quote}”
                </blockquote>
                <div className="mt-6">
                  <p className="font-heading text-lg font-bold text-navy">
                    {trader.name}
                  </p>
                  <p className="text-sm text-navy/60">
                    {trader.trade} · {trader.market}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between border-t border-navy/10 px-8 py-5">
            <div className="flex gap-2">
              {traders.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label={`Show ${t.name}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-gold" : "w-2 bg-navy/20"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous trader"
                onClick={() => go(-1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-navy/15 text-navy transition-colors hover:border-gold hover:text-gold"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path d="m14 6-6 6 6 6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next trader"
                onClick={() => go(1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-navy/15 text-navy transition-colors hover:border-gold hover:text-gold"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path d="m10 6 6 6-6 6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
