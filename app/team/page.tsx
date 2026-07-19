import { Header } from "@/components/Header";
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
      <main className="pt-28 sm:pt-32">
        <Team />
      </main>
      <Footer />
    </>
  );
}
