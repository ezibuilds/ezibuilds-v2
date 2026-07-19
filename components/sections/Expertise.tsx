"use client";

import { motion } from "framer-motion";
import { capabilities } from "@/lib/data";

/** Pastel card fills, matching the original's three-up colour rhythm. */
const CARD_FILLS = ["#A9E5E3", "#DDB3E9", "#AFD9A4"];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Expertise() {
  return (
    <section id="capabilities" className="bg-paper px-edge py-20 sm:py-28">
      <p className="mb-4 text-meta text-ink">Expertise &amp; Capabilities</p>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
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

  return (
    <motion.div variants={item} id={cap.id} className="flex flex-col">
      <div
        className="aspect-square w-full rounded-card"
        style={{ background: fill }}
        aria-hidden
      />

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
