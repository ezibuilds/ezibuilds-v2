import Image from "next/image";
import { trustedBy } from "@/lib/data";

export function TrustedBy() {
  const list = [...trustedBy, ...trustedBy];
  return (
    <section className="bg-ink py-20 text-cream sm:py-28">
      <div className="mx-auto mb-12 max-w-[88rem] px-6 sm:px-10">
        <p className="text-xs uppercase tracking-[0.22em] text-cream/60">
          Trusted by the world&apos;s leading brands
        </p>
      </div>

      <div className="overflow-hidden">
        <div className="marquee-track animate-marquee gap-16 pr-16">
          {list.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex h-12 shrink-0 items-center sm:h-14"
            >
              <Image
                src={logo.white}
                alt={logo.name}
                width={200}
                height={56}
                className="h-full w-auto opacity-90"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
