import HeroSection from "@/components/hero-section";
import About from "@/components/About";
import Bento from "@/components/grid/GridLayout3";
import Gallery from "@/components/PhotoGallery";
import Team from "@/components/Team";

export default function Home() {
  return (
    <>
      <HeroSection />
      <About />
      <Bento />
      <Gallery />
      <Team />
  </>    
  );
}
