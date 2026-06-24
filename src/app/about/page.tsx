import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const governanceLevels = [
  {
    level: "1. Governance Level",
    title: "Board of Trustees (BOT)",
    description: "Highest decision-making body of the organization",
    roles: [
      { title: "Chairman, PHMTI", note: "Overall head of the organization" },
    ],
    color: "bg-brand text-navy",
    borderColor: "border-brand/30",
  },
  {
    level: "2. Executive Management Level",
    title: "National Working Committee (NWC)",
    description: "Implements BOT decisions and manages day-to-day operations",
    roles: [
      { title: "National Secretary", note: "Head of the National Secretariat; coordinates all NWC activities" },
      { title: "National Director of Administration", note: "Head of Administration & Human Resources" },
      { title: "National Directors", note: "Heads of various directorates; all members of the NWC" },
      { title: "Vice Chairman, North", note: "Member, NWC" },
      { title: "Vice Chairman, South", note: "Member, NWC" },
    ],
    color: "bg-navy text-white",
    borderColor: "border-navy/20",
  },
  {
    level: "3. Sub-National Level",
    title: "Sub-National Working Committee (Sub-NWC)",
    description: "Regional and Zonal coordination structure",
    roles: [
      { title: "Regional Directors", note: "" },
      { title: "Zonal Directors", note: "" },
      { title: "Commissioners", note: "" },
    ],
    color: "bg-navy/80 text-white",
    borderColor: "border-navy/15",
  },
  {
    level: "4. State & Grassroot Structure",
    title: "State & LGA Structure",
    description: "Reporting under Commissioners",
    roles: [
      { title: "State Executive Committee", note: "Manages PHMTI affairs at state level" },
      { title: "Senatorial District Coordinators", note: "Coordinate activities across senatorial zones" },
      { title: "LGA Coordinators", note: "Manage PHMTI operations at LGA level" },
    ],
    color: "bg-mist-200 text-navy",
    borderColor: "border-navy/10",
  },
];

const stateStructure = [
  "Commissioner",
  "State Secretary",
  "Head of Administration",
  "State Accountant",
  "State Auditor",
  "Legal Adviser",
  "Project Coordinator",
  "Welfare and Incentive Coordinator",
  "Chief Security Officer",
  "Head, ICT Unit",
];

const ictOfficers = ["ICT Officer 1", "ICT Officer 2", "ICT Officer 3", "ICT Officer 4"];

const lgaStructure = [
  "LGA Coordinator",
  "LGA Secretary",
  "Head of Administration",
  "LGA Accountant",
  "LGA Auditor",
  "Legal Adviser",
  "Supervisor 1",
  "Supervisor 2",
  "Supervisor 3",
  "Supervisor 4",
  "Trade Coordinator",
  "Haulage Coordinator",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-mist pt-24 pb-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">

          {/* Header */}
          <div className="mb-14 max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              About PHMTI
            </span>
            <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Who we are
            </h1>
            <p className="mt-4 text-base leading-relaxed text-navy/65">
              Power House Market Traders Initiative (PHMTI) is an advocacy group promoting
              tax reform and awareness among Nigerians and the diaspora. Chaired by{" "}
              <span className="font-semibold text-navy">Alhaji Hamza Adamu Kyari</span>,
              PHMTI drives tax reform across Nigeria&apos;s formal and informal sectors —
              reaching market traders, associations, and businesses nationwide.
            </p>
          </div>

          {/* Mission cards */}
          <div className="mb-16 grid gap-5 sm:grid-cols-3">
            {[
              {
                title: "Our Mission",
                text: "To advocate for a fair, transparent tax system that benefits ordinary Nigerians — especially market traders and informal sector workers.",
              },
              {
                title: "Our Reach",
                text: "Mobilizing market traders, haulage associations, and business groups nationwide through existing market structures.",
              },
              {
                title: "Our Approach",
                text: "Sensitization, dialogue, and grassroots compliance — bridging the gap between government tax policy and everyday traders.",
              },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
                <h3 className="font-heading text-base font-bold text-navy mb-2">{c.title}</h3>
                <p className="text-sm leading-relaxed text-navy/65">{c.text}</p>
              </div>
            ))}
          </div>

          {/* Organogram */}
          <div className="mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              Organogram
            </span>
            <h2 className="mt-3 font-heading text-2xl font-extrabold text-navy sm:text-3xl mb-8">
              Governance structure
            </h2>

            <div className="relative">
              {/* Vertical connector line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-navy/10 hidden sm:block" />

              <div className="space-y-4">
                {governanceLevels.map((level, i) => (
                  <div key={level.title} className="relative sm:pl-16">
                    {/* Level number circle */}
                    <div className={`absolute left-0 top-5 hidden sm:grid h-12 w-12 place-items-center rounded-full font-heading text-sm font-bold shadow-sm ${level.color}`}>
                      {i + 1}
                    </div>

                    <div className={`rounded-2xl border bg-white p-6 shadow-sm ${level.borderColor}`}>
                      <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-1">
                        {level.level}
                      </p>
                      <h3 className="font-heading text-lg font-bold text-navy">{level.title}</h3>
                      <p className="mt-1 text-sm text-navy/55 mb-4">{level.description}</p>

                      <div className="grid gap-2 sm:grid-cols-2">
                        {level.roles.map((role) => (
                          <div key={role.title} className="flex items-start gap-2.5 rounded-xl bg-mist px-3 py-2.5">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                            <div>
                              <p className="text-xs font-bold text-navy">{role.title}</p>
                              {role.note && (
                                <p className="text-[11px] text-navy/50 mt-0.5">{role.note}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* State structure */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-base font-bold text-navy mb-1">
                State Executive Structure
              </h3>
              <p className="text-xs text-navy/45 mb-4">Reporting to the Commissioner</p>
              <ol className="space-y-2">
                {stateStructure.map((role, i) => (
                  <li key={role} className="flex items-center gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy/8 font-mono text-[10px] font-bold text-navy/50">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-navy">{role}</span>
                  </li>
                ))}
                {/* ICT sub-roles */}
                <li className="ml-9 space-y-1.5 pt-1">
                  {ictOfficers.map((officer) => (
                    <div key={officer} className="flex items-center gap-2 text-xs text-navy/55">
                      <span className="h-1 w-1 rounded-full bg-navy/30" />
                      {officer}
                    </div>
                  ))}
                </li>
              </ol>
            </div>

            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-base font-bold text-navy mb-1">
                LGA Executive Structure
              </h3>
              <p className="text-xs text-navy/45 mb-4">Reporting to the LGA Coordinator</p>
              <ol className="space-y-2">
                {lgaStructure.map((role, i) => (
                  <li key={role} className="flex items-center gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy/8 font-mono text-[10px] font-bold text-navy/50">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-navy">{role}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Chairman callout */}
          <div className="rounded-2xl border border-brand/20 bg-brand/5 px-7 py-6 flex items-center gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy font-heading text-base font-bold text-brand">
              AK
            </span>
            <div>
              <p className="font-heading text-lg font-bold text-navy">
                Alhaji Hamza Adamu Kyari
              </p>
              <p className="text-sm text-navy/60">
                Chairman, Power House Market Traders Initiative (PHMTI)
              </p>
              <p className="mt-1 text-xs text-navy/45">
                Chairman of the Board of Trustees — Overall head of the organization
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}