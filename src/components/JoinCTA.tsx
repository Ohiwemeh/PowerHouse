"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "./icons";

export default function JoinCTA() {
  return (
    <section id="join" className="bg-mist px-5 py-20 sm:px-8 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-navy px-8 py-14 text-center sm:px-16 sm:py-20"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />

        <h2 className="relative font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Join the Power House.
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/75">
          Become part of a movement that puts traders first. Membership is open
          to every market worker ready to grow.
        </p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#join"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-navy shadow-xl shadow-brand/20 transition-transform hover:scale-[1.03]"
          >
            Become a Member
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            Talk to our team
          </a>
        </div>
      </motion.div>
    </section>
  );
}
