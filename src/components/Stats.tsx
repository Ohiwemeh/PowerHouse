"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  { value: 1000, suffix: "+", label: "Registered Traders" },
  { value: 50, suffix: "+", label: "Training Workshops" },
  { value: 12, label: "Strategic Partnerships" },
  { value: 8, label: "Markets Served" },
];

function CountUp({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="impact" className="relative isolate overflow-hidden bg-navy">
      <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-gold-400">
            Our impact in numbers
          </span>
          <h2 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
            Trade, at the scale of a movement
          </h2>
        </div>

        <dl className="grid grid-cols-2 gap-y-10 gap-x-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dd className="font-heading text-4xl font-extrabold tracking-tight text-gold sm:text-5xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
              <dt className="mt-2 text-sm font-medium text-white/70">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
