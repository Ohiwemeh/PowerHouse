const prohibitedConduct = [
  {
    title: "Offer or accept bribes",
    note: "No exchange of cash, gifts, or favors to influence decisions",
  },
  {
    title: "Solicit improper benefits",
    note: "No demanding payment or perks in exchange for services",
  },
  {
    title: "Misuse organizational resources",
    note: "Funds, property, and data used only for PHHTTAI's mandate",
  },
  {
    title: "Abuse official authority",
    note: "No leveraging position for personal gain at any level",
  },
];

const pillars = [
  { label: "Integrity", note: "We do what is right — always." },
  { label: "Accountability", note: "We are answerable for our actions." },
  { label: "Transparency", note: "We operate with openness and honesty." },
  { label: "Zero Tolerance", note: "We do not tolerate corruption in any form." },
];

export default function AntiCorruptionPolicy() {
  return (
    <div className="mb-14">
      <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
        Governance &amp; Conduct
      </span>
      <h2 className="mt-3 font-heading text-2xl font-extrabold text-navy sm:text-3xl">
        Anti-Bribery and Anti-Corruption Policy
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy/60">
        No officer, employee, volunteer, consultant, contractor, or partner of PHHTTAI shall engage in
        the following conduct.
      </p>

      <div className="mt-7 grid gap-5 lg:grid-cols-[1.3fr_1fr] lg:items-stretch">
        {/* Prohibited conduct — graphic card grid */}
        <div className="grid gap-3 sm:grid-cols-2">
          {prohibitedConduct.map((item) => (
            <div
              key={item.title}
              className="relative overflow-hidden rounded-2xl border border-red-200/70 bg-white p-5 shadow-sm"
            >
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-red-500" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p className="mt-3 text-sm font-bold text-navy leading-snug">{item.title}</p>
              <p className="mt-1 text-xs text-navy/50 leading-relaxed">{item.note}</p>
            </div>
          ))}
        </div>

        {/* No-handshake visual + statement */}
        <div className="flex flex-col rounded-2xl border border-navy/10 bg-navy p-6 text-white">
          <svg viewBox="0 0 120 120" className="h-24 w-24 self-center">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#ef4444" strokeWidth="6" />
            <line x1="22" y1="22" x2="98" y2="98" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
            <path
              d="M35 70 L50 58 L62 64 L80 50"
              stroke="#facc15"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="80" cy="50" r="4" fill="#facc15" />
          </svg>
          <p className="mt-5 text-center text-sm leading-relaxed text-white/75">
            PHHTTAI shall maintain a culture of <span className="font-semibold text-brand">integrity</span>{" "}
            through training, awareness, due diligence, and disciplinary enforcement.
          </p>
        </div>
      </div>

      {/* Four pillars strip */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {pillars.map((p) => (
          <div key={p.label} className="rounded-xl bg-mist-200 px-4 py-4 text-center">
            <p className="font-heading text-sm font-bold text-navy">{p.label}</p>
            <p className="mt-1 text-[11px] leading-snug text-navy/50">{p.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}