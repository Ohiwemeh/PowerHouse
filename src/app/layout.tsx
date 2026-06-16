import type { Metadata } from "next";
import { Montserrat, Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Power House — Empowering the Pulse of Trade",
  description:
    "Power House Market Traders Initiative empowers market traders through training, market access, and strategic partnerships across Africa's vibrant trade communities.",
  keywords: [
    "Power House",
    "market traders",
    "trade association",
    "Africa commerce",
    "trader empowerment",
  ],
  openGraph: {
    title: "Power House — Empowering the Pulse of Trade",
    description:
      "Training, market access, and strategic partnerships for market traders.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${bebas.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-mist text-navy antialiased">
        {children}
      </body>
    </html>
  );
}
