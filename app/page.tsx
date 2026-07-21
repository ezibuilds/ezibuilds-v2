import { Header } from "@/components/Header";
import { RouteTransition } from "@/components/ui/RouteTransition";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Expertise } from "@/components/sections/Expertise";
import { Testimonials } from "@/components/sections/Testimonials";

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
          <Testimonials />
        </main>
      </RouteTransition>
      <Footer />
    </>
  );
}
