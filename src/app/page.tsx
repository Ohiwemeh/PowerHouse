import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Aims from "@/components/Aims";
import Stats from "@/components/Stats";
import Spotlight from "@/components/Spotlight";
import News from "@/components/News";
import JoinCTA from "@/components/JoinCTA";
import Footer from "@/components/Footer";
import GalleryPreview from "@/components/GalleryPreview";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Aims />
        <Stats />
        <Spotlight />
        <GalleryPreview /> 
        <News />
        <JoinCTA />
      </main>
      <Footer />
    </>
  );
}
