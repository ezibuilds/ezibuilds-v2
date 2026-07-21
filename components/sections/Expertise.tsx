"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { capabilities } from "@/lib/data";
import { VIEWPORT, fadeUp, stagger, revealProps } from "@/lib/motion";

/** Pastel card fills, matching the original's three-up colour rhythm. */
const CARD_FILLS = ["#A9E5E3", "#DDB3E9", "#AFD9A4"];

export function Expertise() {
  return (
    <section id="capabilities" className="bg-paper px-edge py-20 sm:py-28">
      <motion.p {...revealProps()} className="mb-4 text-meta text-ink">
        Expertise &amp; Capabilities
      </motion.p>

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="grid grid-cols-1 gap-x-[1vw] gap-y-16 md:grid-cols-3"
      >
        {capabilities.map((cap, i) => (
          <Column key={cap.id} cap={cap} fill={CARD_FILLS[i % CARD_FILLS.length]} />
        ))}
      </motion.div>
    </section>
  );
}

function Column({
  cap,
  fill,
}: {
  cap: (typeof capabilities)[number];
  fill: string;
}) {
  // The original lists every service in two sub-columns under the heading.
  const services = cap.groups.flatMap((g) => g.items);
  const split = Math.ceil(services.length / 2);
  const columns = [services.slice(0, split), services.slice(split)];

  const bannerSrc =
    cap.id === "build"
      ? "/build.png"
      : cap.id === "design"
        ? "/design.png"
        : "/launch.png";

  return (
    <motion.div variants={fadeUp} id={cap.id} className="flex flex-col">
      <div className="relative aspect-square w-full overflow-hidden rounded-card" style={{ background: fill }}>
        <Image
          src={bannerSrc}
          alt=""
          fill
          className="object-cover"
          quality={90}
          // The card is ~33vw at three-up, but drops to one column below md,
          // so it is full-bleed there rather than at the 768px Tailwind stop.
          sizes="(min-width: 768px) 33vw, 100vw"
        />
      </div>

      <h3 className="mt-6 text-display-md">{cap.label}</h3>

      <div className="mt-6 grid grid-cols-2 gap-x-[1vw]">
        {columns.map((col, i) => (
          <ul key={i} className="space-y-2">
            {col.map((service) => (
              <li key={service} className="text-meta text-ink">
                {service}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </motion.div>
  );
}
