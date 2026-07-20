import { Header } from "@/components/Header";
import { RouteTransition } from "@/components/ui/RouteTransition";
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
        <main className="pt-28 sm:pt-32">
          <Team />
        </main>
      </RouteTransition>
      <Footer />
    </>
  );
}
