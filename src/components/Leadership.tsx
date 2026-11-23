"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Leader = {
  name: string;
  role: string;
  image: string | null;
  highlight?: boolean;
};

const leaders: Leader[] = [
  {
    name: "Alhaji Hamza Adamu Kyari",
    role: "Chairman, PHHTTAI",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782384853/WhatsApp_Image_2026-06-25_at_10.18.29_kau8fe.jpg",
    highlight: true,
  },
  {
    name: "Engr. Ernest Ikechukwu Nwabuko",
    role: "National Secretary",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782828818/WhatsApp_Image_2026-06-30_at_14.50.26_k2lihz.jpg",
  },
  {
    name: "Dr Dominion Adie",
    role: "National Director of Administration",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782384853/WhatsApp_Image_2026-06-25_at_10.04.56_lmufqm.jpg",
  },
  {
    name: "Prof. Ekaette Ekpo",
    role: "Director of Women Affairs South.",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795290813/WhatsApp_Image_2026-11-21_at_20.25.48_xfqpkw.jpg",
  },
  {
    name: "Timothy Enoch",
    role: "National Director of Conflict & Resolution",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782384853/WhatsApp_Image_2026-06-25_at_09.27.17_m6djp4.jpg",
  },
  {
    name: "Gowon Elaigwu",
    role: "National Director of Complaints",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782384853/WhatsApp_Image_2026-06-25_at_09.30.41_fznhcc.jpg",
  },
   {
    name: "Ben Akpa",
    role: "National Director Stakeholders Collaboration",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782985544/WhatsApp_Image_2026-07-01_at_18.05.43_cnhowr.jpg",
  },
   {
    name: "Ojo Monday",
    role: "National Director of Finance",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782999136/WhatsApp_Image_2026-07-02_at_12.12.30_qvqoj9.jpg",
  },
  {
    name: "Hamza Mukhtar",
    role: "Vice Chairman North",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782985545/WhatsApp_Image_2026-07-01_at_18.04.39_ydom90.jpg",
  },
  {
    name: "Amb Cletus Aniekan Ukoh",
    role: "Vice chairman south",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1789046520/WhatsApp_Image_2026-09-10_at_14.13.14_ndyjns.jpg",
  },
   {
    name: "Eriye felicia",
    role: "Director of Social Welfare",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782985544/WhatsApp_Image_2026-07-01_at_12.45.06_mfhvfh.jpg",
  },
  {
    name: "Rev Dr Abraham Donubari Vin-Azor",
    role: "Director, Policy & Implementation",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782384854/WhatsApp_Image_2026-06-25_at_09.29.42_elsg7c.jpg",
  },
  {
    name: "Engr Melody E. Omorodion ",
    role: "Asst. National Director of Administration.",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782670419/WhatsApp_Image_2026-06-26_at_12.41.13_u4vecf.jpg",
  },
  {
    name: "Janet Bennet Dangana",
    role: "Assistant National Secretary",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1784107409/Screenshot_2026-07-15_101923_rxmgis.png",
  },

  {
    name: "Prince Oyibo Jonathan",
    role: "National PRO",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782985544/WhatsApp_Image_2026-07-01_at_18.06.43_smhorb.jpg",
  },
  {
    name: "Amb. G T. Joseph Gbenga",
    role: "National Advisor/Spokesman",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782829467/WhatsApp_Image_2026-06-30_at_09.52.17_mofhwf.jpg",
  },
  {
    name: "Bar. Obi Joseph Chukwuma ",
    role: "Secretary, South Region",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1789046520/WhatsApp_Image_2026-09-10_at_14.06.02_uj1hvw.jpg",
  },
  {
    name: "PROF. SIMEON PETER OLUSOLA GBELEYI (PhD, MD)",
    role: "Zonal Director, South West",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782670419/WhatsApp_Image_2026-06-26_at_12.41.13_1_adtbzl.jpg",
  },
 {
    name: "Hon AUWALU SULE MARBINI",
    role: "Director of Northeast",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1789045163/WhatsApp_Image_2026-09-10_at_11.38.56_ddnudp.jpg",
  },
  {
    name: "Honourable Chidi Sam Wike",
    role: " Director South South",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1782988523/WhatsApp_Image_2026-07-02_at_11.16.28_twprzn.jpg",
  },
  {
    name: "Hon Mrs Nnenna Chris- Otuonye.",
    role: "Southeast Zonal Director",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1788359882/WhatsApp_Image_2026-09-02_at_13.54.40_kk8ach.jpg",
  },

  {
    name: "ALIYU MUHAMMAD RABIU",
    role: "North Central Zonal Director",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1788359882/WhatsApp_Image_2026-09-02_at_13.54.41_cwxokx.jpg",
  },
  {
    name: "Anthony obo Claudius ogosu",
    role: "Dir of social welfare south south",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1789045163/WhatsApp_Image_2026-09-10_at_13.56.32_wp5iye.jpg",
  },
  {
    name: "AGUWA QUEEN IJEOMA",
    role: "Member National Legal Adviser",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1789051432/WhatsApp_Image_2026-09-10_at_15.28.47_iwlogn.jpg",
  },
  {
    name: "NSIKAN ETUKUDO UKPONG, ESQ",
    role: "LEGAL ADVISER SOUTH.",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1789046520/WhatsApp_Image_2026-09-10_at_14.21.29_vz29sw.jpg",
  },
  {
    name: " Amb. Comr. Michael Godspower Eboigbe ",
    role: "Director, Transport and Logistics (South)",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795082761/WhatsApp_Image_2026-11-18_at_12.15.15_deufkp.jpg",
  },
  {
    name: " Hon. Suleiman Shika",
    role: "Zonal Director Northwest ",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795177567/WhatsApp_Image_2026-11-20_at_12.37.23_ydc54c.jpg",
  },
];

// State Commissioners get their own subsection below the main leadership grid.
const commissioners: Leader[] = [
  {
    name: "AJEWOLE OLUSOLA TOSIN ",
    role: "LAGOS STATE COMMISSIONER",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1784107393/WhatsApp_Image_2026-07-03_at_12.49.04_c7epvt.jpg",
  },
  {
    name: "ADETAYO FUNMITO ADESEYE",
    role: "OGUN STATE COMMISSIONER",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1784107391/WhatsApp_Image_2026-07-03_at_12.49.04_4_yufcsb.jpg",
  },
  {
    name: "OLAJIDE AYORINDE EMMANUEL",
    role: "OYO STATE COMMISSIONER",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1784107392/WhatsApp_Image_2026-07-03_at_12.49.04_2_dosymx.jpg",
  },
  {
    name: "ONILE KAMORUDEEN OLANIRAN ",
    role: "ONDO STATE COMMISSIONER",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1784107393/WhatsApp_Image_2026-07-03_at_12.49.05_wolswa.jpg",
  },
  {
    name: "AMUSA ISHOLA. O. ",
    role: "EKITI STATE COMMISSIONER",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1784107391/WhatsApp_Image_2026-07-03_at_12.49.05_4_z0vdot.jpg",
  },
  {
    name: "AREMU ELIJAH ABIOYE ",
    role: "OSUN STATE COMMISSIONER",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1784108332/edit_ttoxsq.jpg",
  },
  {
    name: "AMB. PRINCE AKOR ELIAS AKOR (JP) ",
    role: "Enugu State Commissioner",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1789045163/WhatsApp_Image_2026-09-10_at_13.27.13_fjbcyl.jpg",
  },
  {
    name: "Akpagu Gloria oluchi",
    role: "Ebonyi State Commissioner.",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1789045163/WhatsApp_Image_2026-09-10_at_13.46.22_uqvuar.jpg",
  },
  {
    name: "AMB.MRS CHIKEZIE AKUDO AUGUSTA",
    role: "IMO State Commissioner.",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1789051480/WhatsApp_Image_2026-09-10_at_15.07.15_cwuac9.jpg",
  },
  {
    name: "Hon Ornguga Henry Teryima",
    role: "Benue state commissioner",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1794947165/WhatsApp_Image_2026-11-17_at_11.49.36_h1q5wv.jpg",
  },
  {
    name: "Hon Kelvin O Ojior",
    role: "Delta State Commissioner",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1794947165/WhatsApp_Image_2026-11-17_at_12.01.56_nosryj.jpg",
  },
  {
    name: "Prof, Bassey Emmanuel",
    role: "Bayelsa State Commissioner",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1794947184/WhatsApp_Image_2026-11-17_at_17.35.05_1_sohjs1.jpg",
  },
  {
    name: "Hon. Ezege Okon Eja",
    role: "Cross River Commissioner.",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795082760/WhatsApp_Image_2026-11-18_at_13.29.46_zjvafq.jpg",
  },
  {
    name: "Uduak Okokon Ekpeyong",
    role: "Akwa Ibom State commissioner",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795082760/WhatsApp_Image_2026-11-18_at_21.13.54_ncwn1o.jpg",
  },
  {
    name: "HON. AMB. UMWENI MATHEW ORHUE",
    role: "Edo State Commissioner",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795111819/WhatsApp_Image_2026-11-19_at_18.57.18_u7yovr.jpg",
  },
  {
    name: "Ismail Musa Muhammad",
    role: "Nasarawa Commissioner",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795182964/WhatsApp_Image_2026-11-20_at_13.59.09_xhjekv.jpg",
  },
  
];


const SenatorialDistrictCoordinator : Leader[] = [
  {
    name: "HON ADEDUYITE CHARLES",
    role: "SENATORIAL DISTRICT COORDINATOR ONDO STATE",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795440390/WhatsApp_Image_2026-11-22_at_20.04.32_x1dsx6.jpg",
  },
  {
    name: "AMB MRS SHITTU SHEFIAT ABIMBOLA ",
    role: "OYO SOUTH SENATORIAL COORDINATOR",
    image: "https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795440390/WhatsApp_Image_2026-11-21_at_18.07.48_xiqogb.jpg",
  },
  {
    name: "OJUDU CLEMENT AJAYI",
    role: "ONDO NORTH SENATORIAL DISTRICT COORDINATOR",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795440390/WhatsApp_Image_2026-11-21_at_20.08.56_yvqyil.jpg",
  },
  {
    name: "OKEBUNMI ABAYOMI ODUNAYO",
    role: "OYO NORTH SENATORIAL DISTRICT COORDINATOR",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795440391/WhatsApp_Image_2026-11-21_at_20.08.57_dbrudw.jpg",
  },
  {
    name: "Oladunjoye Temitope Ebenezer",
    role: "Ekiti Central Senatorial Coordinator",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795440390/WhatsApp_Image_2026-11-21_at_20.25.24_rummkw.jpg",
  },
  {
    name: "Adeyemi Tolulope Adeyinka",
    role: "Post-Osun West Senatorial District Coordinator ",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795441105/WhatsApp_Image_2026-11-23_at_14.25.08_c8xoto.jpg",
  },
  {
    name: "Biragbara Dornu Gift",
    role: "Rivers south East Senatorial District Coordinator",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795441104/WhatsApp_Image_2026-11-23_at_14.25.09_dhqkgp.jpg",
  },
  {
    name: "Imasuen Mercy Eunice ",
    role: "Oyo Central senatorial District Coordinator",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795441104/WhatsApp_Image_2026-11-23_at_14.25.09_1_omjemy.jpg",
  },
  {
    name: "Ojike Ojike Kalu",
    role: "Abia North Senatorial coordinator",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795441103/WhatsApp_Image_2026-11-23_at_14.25.09_2_qg44tg.jpg",
  },
  {
    name: "Sofusi Adetutu Olubusayo",
    role: "Ogun center senatorial district coordinator",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795441102/WhatsApp_Image_2026-11-23_at_14.25.10_pueneh.jpg",
  },
  {
    name: "Dr. Williams Agbam",
    role: "Rivers East senotorial coordinator",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795441102/WhatsApp_Image_2026-11-23_at_14.25.10_1_jtrksx.jpg",
  },
  {
    name: "Dr NOSIRU TIJANI ABAYOMI,PhD",
    role: "OGUN WEST SENATORIAL DISTRICT COORDINATOR",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795441102/WhatsApp_Image_2026-11-23_at_14.25.10_2_zpq6wa.jpg",
  },
  {
    name: "LADE-FASUA FLORENCE",
    role: "Ondo Central Senatorial District Coordinator",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795441102/WhatsApp_Image_2026-11-23_at_14.25.11_a90har.jpg",
  },
  {
    name: "LADE-FASUA FLORENCE",
    role: "Ondo Central Senatorial District Coordinator",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795441102/WhatsApp_Image_2026-11-23_at_14.25.11_a90har.jpg",
  },
  {
    name: "EDIAGBONYA MAUREEN IYORE",
    role: "EDO NORTH SENATORIAL DISTRICT COORDINATOR",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795441102/WhatsApp_Image_2026-11-23_at_14.25.12_mkoa0f.jpg",
  },
  {
    name: "Amaka Ann Orogwu ",
    role: "Ebonyi North Senatorial District Coordinator ",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795441101/WhatsApp_Image_2026-11-23_at_14.25.12_1_hs7bdi.jpg",
  },
  {
    name: "Samuel chuks onwochei",
    role: "Lagos State central senatorial district coordinator ",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795441102/WhatsApp_Image_2026-11-23_at_14.25.13_zckxuy.jpg",
  },
  {
    name: "AMOS IKECHUKWU",
    role: "ABIA SOUTH SENATORIAL DISTRICT COORDINATOR",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795441101/WhatsApp_Image_2026-11-23_at_14.25.13_1_cafu42.jpg",
  },
  {
    name: "David Ejoor Igbuduma",
    role: "Delta South Senatorial Coordinator",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795441101/WhatsApp_Image_2026-11-23_at_14.25.14_xyrg3i.jpg",
  },
  {
    name: "Hon.Uche Benjamin Chiejina",
    role: "Delta North Senatorial Coordinator",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795441101/WhatsApp_Image_2026-11-23_at_14.25.15_b3zogj.jpg",
  },
  {
    name: "AMB  DR .JAMES GRAHAM",
    role: "BAYELSA EAST SENATORIAL COORDINATOR ",
    image:"https://res.cloudinary.com/dfdtcwwh3/image/upload/v1795441101/WhatsApp_Image_2026-11-23_at_14.31.34_umy7rp.jpg",
  },
  
 
  
];

function LeaderCard({ leader, index }: { leader: Leader; index: number }) {
  const initials = leader.name === "TBA"
    ? "TBA"
    : leader.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col items-center rounded-2xl border bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-navy/10 ${
        leader.highlight ? "border-brand/30 ring-1 ring-brand/20" : "border-navy/10"
      }`}
    >
      {leader.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-0.5 text-[10px] font-bold text-navy">
          Chairman
        </span>
      )}

      {/* Photo */}
      <div className={`relative mb-4 overflow-hidden rounded-full ${
        leader.highlight ? "h-28 w-28 ring-4 ring-brand/30" : "h-24 w-24"
      }`}>
        {leader.image ? (
          <Image
            src={leader.image}
            alt={leader.name}
            fill
            sizes="112px"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-navy/8">
            <span className="font-heading text-lg font-bold text-navy/30">{initials}</span>
          </div>
        )}
      </div>

      <h3 className={`font-heading font-bold leading-snug text-navy ${
        leader.highlight ? "text-base" : "text-sm"
      }`}>
        {leader.name === "TBA" ? (
          <span className="text-navy/30 italic">To be announced</span>
        ) : leader.name}
      </h3>
      <p className="mt-1 text-xs font-medium text-navy/50">{leader.role}</p>
    </motion.div>
  );
}

export default function Leadership() {
  return (
    <section id="leadership" className="bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              Leadership
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              The team driving reform
            </h2>
            <p className="mt-3 text-base text-navy/60">
              Meet the National Working Committee leading PHHTTAI's advocacy for
              tax reform across Nigeria.
            </p>
          </div>
          {/* <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-brand-600"
          >
            Full organogram
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link> */}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.07 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {leaders.map((leader, i) => (
            <LeaderCard key={leader.name + leader.role} leader={leader} index={i} />
          ))}
        </motion.div>

        {/* Commissioners subsection */}
        <div className="mt-16">
          <div className="mb-8">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              Commissioners
            </span>
            <h3 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              State Commissioners
            </h3>
            <p className="mt-2 text-base text-navy/60">
              Representing PHHTTAI across Nigeria's states.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.07 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            {commissioners.map((leader, i) => (
              <LeaderCard key={leader.name + leader.role} leader={leader} index={i} />
            ))}
          </motion.div>
        </div>
        {/* Senatorial District Coordinators subsection */}
        <div className="mt-16">
          <div className="mb-8">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              Senatorial District Coordinators
            </span>
            <h3 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              Senatorial District Coordinators
            </h3>
            <p className="mt-2 text-base text-navy/60">
              Representing PHHTTAI across Nigeria's states.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.07 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            {SenatorialDistrictCoordinator.map((leader, i) => (
              <LeaderCard key={leader.name + leader.role} leader={leader} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}