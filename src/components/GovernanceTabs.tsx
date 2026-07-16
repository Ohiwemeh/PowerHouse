"use client";

import { useState } from "react";

type StateDoc = {
  state: string;
  url: string | null; // set the PDF link when ready; leave null for "coming soon"
};

// One entry per state — just fill in the `url` as each state's PDF becomes available.
// Example: { state: "Lagos", url: "https://res.cloudinary.com/.../lagos-structure.pdf" }
const stateStructureDocs: StateDoc[] = [
  { state: "Abia", url: null },
  { state: "Adamawa", url: null },
  { state: "Akwa Ibom", url: null },
  { state: "Anambra", url: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1784126080/ANAMBRA_ve1u6d.pdf" },
  { state: "Bauchi", url: null },
  { state: "Bayelsa", url: null },
  { state: "Benue", url: null },
  { state: "Borno", url: null },
  { state: "Cross River", url: null },
  { state: "Delta", url: null },
  { state: "Ebonyi", url: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1784126078/EBONYI_STATE_dia9sc.pdf" },
  { state: "Edo", url: null },
  { state: "Ekiti", url: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1784126078/EKITI_STATE_dqjpb1.pdf" },
  { state: "Enugu", url: null },
  { state: "Gombe", url: null },
  { state: "Imo", url: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1784125588/IMO_STATE_nmg6ii.pdf" },
  { state: "Jigawa", url: null },
  { state: "Kaduna", url: null },
  { state: "Kano", url: null },
  { state: "Katsina", url: null },
  { state: "Kebbi", url: null },
  { state: "Kogi", url: null },
  { state: "Kwara", url: null },
  { state: "Lagos", url: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1784126078/LAGOS_STATE_mmz421.pdf" },
  { state: "Nasarawa", url: null },
  { state: "Niger", url: null },
  { state: "Ogun", url: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1784126079/OGUN_STATE_g7keur.pdf" },
  { state: "Ondo", url: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1784126080/ONDO_STATE_qxtzy4.pdf" },
  { state: "Osun", url: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1784126078/OSUN_STATE_aadjcq.pdf" },
  { state: "Oyo", url: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1784126078/OYO_STATE_jjrw4f.pdf" },
  { state: "Plateau", url: null },
  { state: "Rivers", url: null },
  { state: "Sokoto", url: null },
  { state: "Taraba", url: null },
  { state: "Yobe", url: null },
  { state: "Zamfara", url: null },
  { state: "FCT (Abuja)", url: null },
];

const tabs = [
  { id: "organogram", label: "Organogram" },
  { id: "anti-bribery", label: "Anti-Bribery Policy" },
  { id: "pledge", label: "Pledge" },
  { id: "state-structure", label: "State Structure" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function DocIcon() {
  return (
    <svg className="h-8 w-8 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.5h7l5 5V19a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 016 19V5A1.5 1.5 0 017.5 3.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3.5V8a1 1 0 001 1h4.5" />
    </svg>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy/15 bg-white/50 px-6 py-14 text-center">
      <p className="text-sm font-medium text-navy/40">{text}</p>
    </div>
  );
}

function StateDocCard({ doc }: { doc: StateDoc }) {
  if (doc.url) {
    return (
      <a
        href={doc.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-xl border border-navy/10 bg-white px-4 py-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      >
        <DocIcon />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-navy">{doc.state}</p>
          <p className="mt-0.5 text-xs text-brand-600">View PDF</p>
        </div>
      </a>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-navy/10 bg-navy/[0.02] px-4 py-3.5 opacity-60">
      <DocIcon />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-navy/60">{doc.state}</p>
        <p className="mt-0.5 text-xs text-navy/35">Coming soon</p>
      </div>
    </div>
  );
}

export default function GovernanceTabs() {
  const [active, setActive] = useState<TabId>("organogram");
  const [stateQuery, setStateQuery] = useState("");

  const filteredStates = stateStructureDocs.filter((doc) =>
    doc.state.toLowerCase().includes(stateQuery.trim().toLowerCase())
  );

  return (
    <div className="mb-14">
      <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
        Governance
      </span>
      <h2 className="mt-3 font-heading text-2xl font-extrabold text-navy sm:text-3xl mb-6">
        Structure &amp; Conduct
      </h2>

      {/* Tab bar */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-navy/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`relative px-4 py-2.5 text-sm font-semibold transition-colors ${
              active === tab.id
                ? "text-brand-600"
                : "text-navy/50 hover:text-navy"
            }`}
          >
            {tab.label}
            {active === tab.id && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand-600" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {active === "organogram" && (
        <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
          <img
            src="https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782831924/WhatsApp_Image_2026-06-30_at_14.40.54_1_byowzj.jpg"
            alt="PHHTTAI Governance Structure Organogram"
            className="w-full h-auto"
          />
        </div>
      )}

      {active === "anti-bribery" && (
        <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
          <img
            src="https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782830491/WhatsApp_Image_2026-06-30_at_15.30.56_nm8dvd.jpg"
            alt="PHHTTAI Anti-Bribery and Anti-Corruption Policy"
            className="w-full h-auto"
          />
        </div>
      )}

      {active === "pledge" && (
        <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
          <img
            src="https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782830492/WhatsApp_Image_2026-06-30_at_15.30.48_lzqrb3.jpg"
            alt="PHHTTAI Official Pledge"
            className="w-full h-auto"
          />
        </div>
      )}

      {active === "state-structure" && (
        <div>
          <div className="relative mb-5 max-w-xs">
            <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <input
              type="text"
              value={stateQuery}
              onChange={(e) => setStateQuery(e.target.value)}
              placeholder="Search state..."
              className="w-full rounded-full border border-navy/15 bg-white py-2 pl-9 pr-4 text-sm text-navy placeholder:text-navy/35 focus:border-brand-600 focus:outline-none"
            />
          </div>

          {filteredStates.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStates.map((doc) => (
                <StateDocCard key={doc.state} doc={doc} />
              ))}
            </div>
          ) : (
            <EmptyState text={`No state matching "${stateQuery}".`} />
          )}
        </div>
      )}
    </div>
  );
}