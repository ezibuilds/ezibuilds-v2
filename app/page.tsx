import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Expertise } from "@/components/sections/Expertise";
import { Projects } from "@/components/sections/Awards";
import { WallOfLove } from "@/components/sections/WallOfLove";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee text={["ezibuild", "design", "technology", "studio"]} />
        <SelectedWork />
        <Marquee
          text={["design", "build", "launch", "scale"]}
          speed="slow"
        />
        <Expertise />
        <Projects />
        <WallOfLove />
      </main>
      <Footer />
    </>
  );
}
