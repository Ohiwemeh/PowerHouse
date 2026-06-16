"use client";

import { motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import {
  TrainingIcon,
  GlobeIcon,
  HandshakeIcon,
  ShieldIcon,
  GrowthIcon,
  CommunityIcon,
} from "./icons";

type Aim = {
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const aims: Aim[] = [
  {
    title: "Skills & Training",
    description:
      "Hands-on workshops in bookkeeping, digital payments, and customer service to sharpen every trader's edge.",
    Icon: TrainingIcon,
  },
  {
    title: "Market Access",
    description:
      "Connecting members to new buyers, suppliers, and regional markets — locally and across borders.",
    Icon: GlobeIcon,
  },
  {
    title: "Strategic Partnerships",
    description:
      "Bridging traders with banks, government, and NGOs to unlock funding and opportunity.",
    Icon: HandshakeIcon,
  },
  {
    title: "Advocacy & Rights",
    description:
      "A united voice protecting fair pricing, safe stalls, and the dignity of every market worker.",
    Icon: ShieldIcon,
  },
  {
    title: "Business Growth",
    description:
      "Access to micro-finance, savings groups, and tools that turn day-traders into enterprises.",
    Icon: GrowthIcon,
  },
  {
    title: "Community & Welfare",
    description:
      "Solidarity funds, health drives, and a network that supports members through every season.",
    Icon: CommunityIcon,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function Aims() {
  return (
    <section id="aims" className="relative bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-gold-600">
            What we do
          </span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Our aims, built for real market life
          </h2>
          <p className="mt-4 text-lg text-navy/65">
            Six pillars that turn everyday trade into lasting prosperity for our
            members and their communities.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.08 }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {aims.map(({ title, description, Icon }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-navy/10 bg-white/70 p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-xl hover:shadow-navy/10"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gold/5 transition-colors duration-300 group-hover:bg-gold/15" />
              <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-gold">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="relative mt-5 font-heading text-xl font-bold text-navy">
                {title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-navy/65">
                {description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
