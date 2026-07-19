import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Expertise } from "@/components/sections/Expertise";
import { Awards } from "@/components/sections/Awards";
import { TrustedBy } from "@/components/sections/TrustedBy";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <SelectedWork />
        <Marquee speed="slow" />
        <Expertise />
        <Awards />
        <TrustedBy />
        <Footer />
      </main>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-cream px-6 py-12 sm:px-10">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-6 border-t border-line pt-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="font-medium text-ink">Form&amp;Fun Studio</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href="https://www.formandfun.co/studio"
            data-cursor="hover"
            className="hover:text-ink"
          >
            Studio
          </a>
          <a
            href="mailto:hello@formandfun.co"
            data-cursor="hover"
            className="hover:text-ink"
          >
            hello@formandfun.co
          </a>
          <span>Made with care</span>
        </div>
      </div>
    </footer>
  );
}
