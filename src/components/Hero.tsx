"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "./icons";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <Image
        src="/images/hero.jpg"
        alt="Traders working together in a bustling market"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Darkening + brand gradient overlay */}
      <div className="absolute inset-0 bg-navy/70" />
      <div className="absolute inset-0 bg-gradient-to-tr from-navy via-navy/60 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-28 pb-16 sm:px-8">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-400"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Power House Market Traders Initiative
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 max-w-3xl font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Empowering the{" "}
          <span className="text-gold">Pulse of Trade.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/80"
        >
          We unite, train, and uplift market traders — building stronger
          businesses, fairer markets, and thriving communities across the
          continent.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="#join"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-navy shadow-xl shadow-gold/20 transition-transform hover:scale-[1.03]"
          >
            Become a Member
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#impact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Our Impact
          </a>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-mist to-transparent" />
    </section>
  );
}
