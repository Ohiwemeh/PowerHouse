"use client";

import { motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import {
  ShieldIcon,
  GlobeIcon,
  HandshakeIcon,
  TrainingIcon,
  CommunityIcon,
  GrowthIcon,
} from "./icons";

type Aim = {
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const aims: Aim[] = [
  {
    title: "Tax Reform Advocacy",
    description:
      "Championing policy reforms that make Nigeria's tax system fair, transparent, and beneficial for every market trader — formal and informal.",
    Icon: ShieldIcon,
  },
  {
    title: "Nationwide Sensitization",
    description:
      "Reaching traders, haulage associations, and businesses across Nigeria to raise awareness of the new tax laws and what they mean in practice.",
    Icon: GlobeIcon,
  },
  {
    title: "Trader & Authority Dialogue",
    description:
      "Facilitating structured conversations between grassroots traders and government authorities to ensure trader voices shape tax policy.",
    Icon: HandshakeIcon,
  },
  {
    title: "Tax Education & Information",
    description:
      "Disseminating clear, accessible information on tax obligations, benefits, and compliance — so no trader is left in the dark.",
    Icon: TrainingIcon,
  },
  {
    title: "Grassroots Mobilization",
    description:
      "Organizing market traders and associations nationwide through existing market structures to drive inclusive, ground-up tax compliance.",
    Icon: CommunityIcon,
  },
  {
    title: "Diaspora Engagement",
    description:
      "Extending advocacy to Nigerians in the diaspora, ensuring tax reform awareness reaches communities beyond Nigeria's borders.",
    Icon: GrowthIcon,
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
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Our Focus
          </span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Advocating for a fairer tax system
          </h2>
          <p className="mt-4 text-lg text-navy/65">
            PHMTI drives tax reform awareness across Nigeria's formal and
            informal sectors — so ordinary Nigerians and market traders
            genuinely benefit from new tax laws.
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
              className="group relative overflow-hidden rounded-2xl border border-navy/10 bg-white/70 p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-xl hover:shadow-navy/10"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand/5 transition-colors duration-300 group-hover:bg-brand/15" />
              <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-brand">
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

        {/* Chairman credit */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 flex items-center gap-4 rounded-2xl border border-navy/10 bg-white/70 px-7 py-5 backdrop-blur-md shadow-sm"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy font-heading text-sm font-bold text-brand">
            AK
          </span>
          <div>
            <p className="font-heading text-base font-bold text-navy">
              Alhaji Hamza Adamu Kyari
            </p>
            <p className="text-sm text-navy/55">
              Chairman, Power House Market Traders Initiative
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}