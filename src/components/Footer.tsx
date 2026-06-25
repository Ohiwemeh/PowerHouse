const groups = [
  {
    title: "Initiative",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Aims", href: "/#aims" },
      { label: "Leadership", href: "/about#organogram" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Members",
    links: [
      { label: "Become a Member", href: "/register" },
      { label: "Training", href: "/training" },
      { label: "Directory", href: "/directory" },
      { label: "Member Login", href: "/login" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "News", href: "/#news" },
      { label: "Contact Us", href: "mailto:tradersmarket819@gmail.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#11161f] text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_2fr]">

          {/* Brand + contact */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand font-display text-2xl text-navy">
                PH
              </span>
              <span className="font-heading text-base font-bold uppercase leading-tight tracking-wide">
                Power House
                <span className="block text-[11px] font-medium tracking-widest text-brand-400">
                  Market Traders Initiative
                </span>
              </span>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Advocating for tax reform that works for every Nigerian — sensitizing
              market traders, mobilizing associations, and bridging the gap between
              grassroots commerce and government policy.
            </p>

            {/* Office info */}
            <div className="mt-6 space-y-3">

              <div className="flex items-start gap-3">
                <svg className="h-4 w-4 shrink-0 text-brand mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-xs leading-relaxed text-white/55">
                  No. 8, Zambezi Crescent, Veterinary Council of Nigeria Building,
                  Fourth Floor, Maitama District, Abuja, Nigeria.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <svg className="h-4 w-4 shrink-0 text-brand mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="space-y-0.5">
                  <a href="tel:+2348032173995" className="block text-xs text-white/55 hover:text-brand transition-colors">
                    +234 (0) 803 217 3995
                  </a>
                  <a href="tel:+2348089514854" className="block text-xs text-white/55 hover:text-brand transition-colors">
                    +234 (0) 808 951 4854
                  </a>
                  <a href="tel:+2348166120777" className="block text-xs text-white/55 hover:text-brand transition-colors">
                    +234 (0) 816 612 0777
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href="mailto:tradersmarket819@gmail.com"
                  className="text-xs text-white/55 hover:text-brand transition-colors"
                >
                  tradersmarket819@gmail.com
                </a>
              </div>

            </div>
          </div>

          {/* Nav links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {groups.map((g) => (
              <div key={g.title}>
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-brand-400">
                  {g.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-white/65 transition-colors hover:text-brand"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Power House Market Traders Initiative. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-white/50">
            <a href="#" className="transition-colors hover:text-brand">Privacy</a>
            <a href="#" className="transition-colors hover:text-brand">Terms</a>
            <a href="mailto:tradersmarket819@gmail.com" className="transition-colors hover:text-brand">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
}