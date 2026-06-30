import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Leadership from "@/components/Leadership";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-mist pt-24 pb-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">

          {/* Header */}
          <div className="mb-14 max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              About PHHTTAI
            </span>
            <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Who we are
            </h1>
            <p className="mt-4 text-base leading-relaxed text-navy/65">
              PowerHouse Harmonized Traders &amp; Tax Advocacy Initiative (PHHTTAI) is an advocacy group promoting
              tax reform and awareness among Nigerians and the diaspora. Chaired by{" "}
              <span className="font-semibold text-navy">Alhaji Hamza Adamu Kyari</span>,
              PHHTTAI drives tax reform across Nigeria&apos;s formal and informal sectors —
              reaching market traders, associations, and businesses nationwide.
            </p>
          </div>

          {/* Mission cards */}
          <div className="mb-16 grid gap-5 sm:grid-cols-2">
            {[
              {
                title: "Our Mission",
                text: "To complement Government efforts by providing nationwide taxpayer education, grassroots sensitization, compliance advocacy, stakeholder mobilization, and technology-driven public engagement programmes that support national economic development.",
              },
              {
                title: "Our vision",
                text: "To become Nigeria's foremost stakeholder engagement and taxpayer advocacy organization, promoting voluntary tax compliance, public confidence, and sustainable revenue mobilization through education, innovation, and strategic partnerships in indirect tax compliance across Nigeria's informal sector.",
              },
              {
                title: "Our Approach",
                text: "Sensitization, dialogue, and grassroots compliance — bridging the gap between government tax policy and everyday traders.",
              },
              {
                title: "Our Motto",
                text: "...Creating a Tax-Friendly Environment. The motto reflects the Initiative's conviction that sustainable tax compliance is best achieved through education, trust, transparency, cooperation, and mutual respect between Government and taxpayers.",
              },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
                <h3 className="font-heading text-base font-bold text-navy mb-2">{c.title}</h3>
                <p className="text-sm leading-relaxed text-navy/65">{c.text}</p>
              </div>
            ))}
          </div>

          <Leadership />

          {/* Organogram */}
          <div className="mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              Organogram
            </span>
            <h2 className="mt-3 font-heading text-2xl font-extrabold text-navy sm:text-3xl mb-6">
              Governance structure
            </h2>
            <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
              <img
                src="https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782831924/WhatsApp_Image_2026-06-30_at_14.40.54_1_byowzj.jpg"
                alt="PHHTTAI Governance Structure Organogram"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Anti-Bribery & Anti-Corruption Policy */}
          <div className="mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              Governance &amp; Conduct
            </span>
            <h2 className="mt-3 font-heading text-2xl font-extrabold text-navy sm:text-3xl mb-6">
              Anti-Bribery and Anti-Corruption Policy
            </h2>
            <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
              <img
                src="https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782830491/WhatsApp_Image_2026-06-30_at_15.30.56_nm8dvd.jpg"
                alt="PHHTTAI Anti-Bribery and Anti-Corruption Policy"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Official Pledge */}
          <div className="mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              Code of Conduct
            </span>
            <h2 className="mt-3 font-heading text-2xl font-extrabold text-navy sm:text-3xl mb-6">
              The PHHTTAI Pledge
            </h2>
            <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
              <img
                src="https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782830492/WhatsApp_Image_2026-06-30_at_15.30.48_lzqrb3.jpg"
                alt="PHHTTAI Official Pledge"
                className="w-full h-auto"
              />
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
                Chairman, PowerHouse Harmonized Traders &amp; Tax Advocacy Initiative (PHHTTAI)
              </p>
              <p className="mt-1 text-xs text-navy/45">
                Chairman of the Board of Trustees — Overall head of the organization
              </p>
            </div>
          </div>
        </div>

        {/* Contact / Office */}
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="mt-8 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
            <h3 className="font-heading text-base font-bold text-navy mb-4">Abuja Office</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="h-4 w-4 shrink-0 text-brand mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm text-navy/65 leading-relaxed">
                  No. 8, Zambezi Crescent, Veterinary Council of Nigeria Building,
                  Fourth Floor, Maitama District, Abuja, Nigeria.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="h-4 w-4 shrink-0 text-brand mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="space-y-1">
                  <a href="tel:+2348032173995" className="block text-sm text-navy/65 hover:text-brand transition-colors">+234 (0) 803 217 3995</a>
                  <a href="tel:+2348089514854" className="block text-sm text-navy/65 hover:text-brand transition-colors">+234 (0) 808 951 4854</a>
                  <a href="tel:+2348166120777" className="block text-sm text-navy/65 hover:text-brand transition-colors">+234 (0) 816 612 0777</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:tradersmarket819@gmail.com" className="text-sm text-navy/65 hover:text-brand transition-colors">
                  tradersmarket819@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}