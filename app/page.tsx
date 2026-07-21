import { Header } from "@/components/Header";
import { RouteTransition } from "@/components/ui/RouteTransition";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Expertise } from "@/components/sections/Expertise";
import { OutcomeCards } from "@/components/sections/OutcomeCards";
import { WaysWeWork } from "@/components/sections/WaysWeWork";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Header />
      <RouteTransition>
        <main>
          <Hero />
          <Marquee
            text={["design", "build", "launch", "scale", "technology"]}
          />
          <Expertise />
          <OutcomeCards />
          <WaysWeWork />
          <Testimonials />
          <FinalCTA />
        </main>
      </RouteTransition>
      <Footer />
    </>
  );
}
