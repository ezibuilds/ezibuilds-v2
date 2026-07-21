import { Header } from "@/components/Header";
import { RouteTransition } from "@/components/ui/RouteTransition";
import { BackLink } from "@/components/ui/BackLink";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Work | ezibuilds studio",
  description:
    "Selected work from ezibuilds studio — products we've designed, built, and launched.",
};

export default function WorkPage() {
  return (
    <>
      <Header />
      <RouteTransition>
        <main>
          {/* Back row clears the fixed header; SelectedWork drops its own top
              padding to sit right under it. Falls back to home when opened
              from a shared link with no in-app history to pop. */}
          <div className="px-edge pt-28 pb-8 sm:pt-32">
            <BackLink fallbackHref="/" />
          </div>
          <SelectedWork />
        </main>
      </RouteTransition>
      <Footer />
    </>
  );
}
