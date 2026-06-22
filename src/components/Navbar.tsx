"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Our Aims", href: "#aims" },
  { label: "Impact", href: "#impact" },
  { label: "Traders", href: "#spotlight" },
  { label: "News", href: "#news" },
  { label: "Directory", href: "/directory" },
  { label: "Training", href: "/training" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/90 backdrop-blur-md shadow-lg shadow-navy/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand font-display text-xl text-navy">
            PH
          </span>
          <span className="font-heading text-sm font-bold uppercase leading-tight tracking-wide text-white">
            Power House
            <span className="block text-[10px] font-medium tracking-widest text-brand-400">
              Market Traders Initiative
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-brand"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="/register"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-navy shadow-lg shadow-brand/20 transition-transform hover:scale-105"
          >
            Become a Member
          </a>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden"
        >
          <span className="relative block h-4 w-6">
            <span className="absolute left-0 top-0 h-0.5 w-6 bg-current" />
            <span className="absolute left-0 top-1.5 h-0.5 w-6 bg-current" />
            <span className="absolute left-0 top-3 h-0.5 w-4 bg-current" />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-navy md:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-heading text-sm font-bold uppercase tracking-wide text-white">
                Power House
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                  <path
                    d="m6 6 12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              }}
              className="flex flex-1 flex-col justify-center gap-2 px-6"
            >
              {links.map((l) => (
                <motion.li
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-4 font-heading text-3xl font-bold text-white transition-colors hover:text-brand"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <div className="px-6 pb-10">
              <a
                href="#join"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-brand px-6 py-4 text-center text-base font-semibold text-navy"
              >
                Become a Member
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
