import { Header } from "@/components/Header";
import { RouteTransition } from "@/components/ui/RouteTransition";
import { BackLink } from "@/components/ui/BackLink";
import { Team } from "@/components/sections/Team";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Team | ezibuilds studio",
  description:
    "Meet the designers, engineers, and strategists behind ezibuilds studio.",
};

export default function TeamPage() {
  return (
    <>
      <Header />
      <RouteTransition>
        <main>
          <div className="px-edge pt-28 pb-8 sm:pt-32">
            <BackLink fallbackHref="/" />
          </div>
          <Team />
        </main>
      </RouteTransition>
      <Footer />
    </>
  );
}
