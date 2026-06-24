const groups = [
  {
    title: "Initiative",
    links: ["About Us", "Our Aims", "Leadership", "Careers"],
  },
  {
    title: "Members",
    links: ["Become a Member", "Training", "Micro-finance", "Member Login"],
  },
  {
    title: "Resources",
    links: ["News", "Events", "Partners", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer id="about" className="bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
               <img src="https://res.cloudinary.com/dfdtcwwh3/image/upload/f_auto,q_auto/WhatsApp_Image_2026-06-22_at_19.49.13-removebg-preview_l95zju" alt="logo" className="h-15 w-25" />
              <span className="font-heading text-base font-bold uppercase leading-tight tracking-wide">
                Power House
                <span className="block text-[11px] font-medium tracking-widest text-brand-400">
                  Market Traders Initiative
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Empowering the pulse of trade — uniting, training, and uplifting
              market traders to build thriving communities.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {groups.map((g) => (
              <div key={g.title}>
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-brand-400">
                  {g.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {g.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-white/65 transition-colors hover:text-brand"
                      >
                        {l}
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
            © {new Date().getFullYear()} Power House Market Traders Initiative.
            All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-white/50">
            <a href="#" className="transition-colors hover:text-brand">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-brand">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-brand">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
