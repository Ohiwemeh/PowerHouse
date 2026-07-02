"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Leader = {
  name: string;
  role: string;
  image: string | null;
  highlight?: boolean;
};

const leaders: Leader[] = [
  {
    name: "Alhaji Hamza Adamu Kyari",
    role: "Chairman, PHHTTAI",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782384853/WhatsApp_Image_2026-06-25_at_10.18.29_kau8fe.jpg",
    highlight: true,
  },
  {
    name: "Engr. Ernest Ikechukwu Nwabuko",
    role: "National Secretary",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782828818/WhatsApp_Image_2026-06-30_at_14.50.26_k2lihz.jpg",
  },
  {
    name: "Dr Dominion Adie",
    role: "National Director of Administration",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782384853/WhatsApp_Image_2026-06-25_at_10.04.56_lmufqm.jpg",
  },
  {
    name: "Timothy Enoch",
    role: "National Director of Conflict & Resolution",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782384853/WhatsApp_Image_2026-06-25_at_09.27.17_m6djp4.jpg",
  },
  {
    name: "Gowon Elaigwu",
    role: "National Director of Complaints",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782384853/WhatsApp_Image_2026-06-25_at_09.30.41_fznhcc.jpg",
  },
   {
    name: "Ben Akpa",
    role: "National Director Stakeholders Collaboration",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782985544/WhatsApp_Image_2026-07-01_at_18.05.43_cnhowr.jpg",
  },
  {
    name: "Hamza Mukhtar",
    role: "Vice Chairman North",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782985545/WhatsApp_Image_2026-07-01_at_18.04.39_ydom90.jpg",
  },
  {
    name: "Captain Cletus Ukoh",
    role: "Vice Chairman, South",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782384853/WhatsApp_Image_2026-06-25_at_09.30.05_jakfsn.jpg",
  },
   {
    name: "Eriye felicia",
    role: "Director of Social Welfare",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782985544/WhatsApp_Image_2026-07-01_at_12.45.06_mfhvfh.jpg",
  },
  {
    name: "Rev Dr Abraham Donubari Vin-Azor",
    role: "Director, Policy & Implementation",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782384854/WhatsApp_Image_2026-06-25_at_09.29.42_elsg7c.jpg",
  },
  {
    name: "PROF. SIMEON PETER OLUSOLA GBELEYI (PhD, MD)",
    role: "Zonal Director, South West",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782670419/WhatsApp_Image_2026-06-26_at_12.41.13_1_adtbzl.jpg",
  },
  {
    name: "Honourable Chidi Sam Wike",
    role: " Director South South",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782988523/WhatsApp_Image_2026-07-02_at_11.16.28_twprzn.jpg",
  },
   {
    name: "Prince Oyibo Jonathan",
    role: "National PRO",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782985544/WhatsApp_Image_2026-07-01_at_18.06.43_smhorb.jpg",
  }, 
  {
    name: "Amb. G T. Joseph Gbenga",
    role: "National Advisor/Spokesman",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782829467/WhatsApp_Image_2026-06-30_at_09.52.17_mofhwf.jpg",
  },
  {
    name: "Engr Melody E. Omorodion ",
    role: "Asst. National Director of Administration.",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782670419/WhatsApp_Image_2026-06-26_at_12.41.13_u4vecf.jpg",
  },
  
  
 
  
 
  
 
 
  
];

function LeaderCard({ leader, index }: { leader: Leader; index: number }) {
  const initials = leader.name === "TBA"
    ? "TBA"
    : leader.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col items-center rounded-2xl border bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-navy/10 ${
        leader.highlight ? "border-brand/30 ring-1 ring-brand/20" : "border-navy/10"
      }`}
    >
      {leader.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-0.5 text-[10px] font-bold text-navy">
          Chairman
        </span>
      )}

      {/* Photo */}
      <div className={`relative mb-4 overflow-hidden rounded-full ${
        leader.highlight ? "h-28 w-28 ring-4 ring-brand/30" : "h-24 w-24"
      }`}>
        {leader.image ? (
          <Image
            src={leader.image}
            alt={leader.name}
            fill
            sizes="112px"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-navy/8">
            <span className="font-heading text-lg font-bold text-navy/30">{initials}</span>
          </div>
        )}
      </div>

      <h3 className={`font-heading font-bold leading-snug text-navy ${
        leader.highlight ? "text-base" : "text-sm"
      }`}>
        {leader.name === "TBA" ? (
          <span className="text-navy/30 italic">To be announced</span>
        ) : leader.name}
      </h3>
      <p className="mt-1 text-xs font-medium text-navy/50">{leader.role}</p>
    </motion.div>
  );
}

export default function Leadership() {
  return (
    <section id="leadership" className="bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              Leadership
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              The team driving reform
            </h2>
            <p className="mt-3 text-base text-navy/60">
              Meet the National Working Committee leading PHHTTAI's advocacy for
              tax reform across Nigeria.
            </p>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-brand-600"
          >
            Full organogram
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.07 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {leaders.map((leader, i) => (
            <LeaderCard key={leader.name + leader.role} leader={leader} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}