const pledgeLines = [
  {
    text: "I solemnly pledge to uphold the Vision, Mission, Values, and Principles of the PowerHouse Harmonised Traders & Tax Advocacy Initiative.",
    icon: "handshake",
  },
  {
    text: "I shall serve with integrity, professionalism, accountability, transparency, and patriotism.",
    icon: "shield",
  },
  {
    text: "I shall respect the Constitution and laws of the Federal Republic of Nigeria and uphold the policies of PHHTTAI.",
    icon: "scale",
  },
  {
    text: "I shall promote taxpayer education, voluntary compliance, stakeholder engagement, and national development.",
    icon: "cap",
  },
  {
    text: "I shall never use my office for personal gain or engage in any act capable of bringing the Initiative into disrepute.",
    icon: "block",
  },
  {
    text: "With honesty, dedication, and excellence, I pledge to contribute my knowledge, skills, and time toward creating a tax-friendly environment for the prosperity of Nigeria.",
    icon: "map",
  },
];

const icons = {
  handshake: (
    <path d="M3 12l4-3 3 2 4-3 4 2 3-2M3 12v3l4 3 3-2 4 3 4-2 3-3v-3" />
  ),
  shield: <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />,
  scale: <path d="M12 3v18M6 7h12M6 7l-3 6h6l-3-6zM18 7l-3 6h6l-3-6zM7 17h10" />,
  cap: <path d="M12 4l10 5-10 5L2 9l10-5zM6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />,
  block: <path d="M12 3a9 9 0 100 18 9 9 0 000-18zM6 6l12 12" />,
  map: <path d="M12 3a6 6 0 016 6c0 4.5-6 12-6 12S6 13.5 6 9a6 6 0 016-6z" />,
};

export default function OfficialPledge() {
  return (
    <div className="mb-14">
      <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
        Code of Conduct
      </span>
      <h2 className="mt-3 font-heading text-2xl font-extrabold text-navy sm:text-3xl">
        The PHHTTAI Pledge
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy/60">
        All members shall recite the following pledge at official gatherings.
      </p>

      <div className="relative mt-7 rounded-2xl border border-navy/10 bg-white p-6 sm:p-8">
        {/* connecting spine */}
        <div className="absolute left-[34px] top-10 bottom-10 w-0.5 bg-brand/20 hidden sm:block" />

        <ol className="space-y-5">
          {pledgeLines.map((line, i) => (
            <li key={i} className="relative flex items-start gap-4 sm:pl-0">
              <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-brand shadow-sm">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {icons[line.icon]}
                </svg>
              </span>
              <p className="pt-2 text-sm leading-relaxed text-navy/75">{line.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-7 flex justify-center">
          <span className="rounded-full bg-brand/10 px-6 py-2 font-heading text-sm font-bold italic text-brand-600">
            So, help us God.
          </span>
        </div>
      </div>
    </div>
  );
}