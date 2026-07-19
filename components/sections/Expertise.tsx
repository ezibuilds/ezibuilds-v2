"use client";

import { motion } from "framer-motion";
import { capabilities } from "@/lib/data";

export function Expertise() {
  return (
    <section id="capabilities" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] px-6 sm:px-10">
        <header className="mb-16 max-w-4xl">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">
            Expertise &amp; Capabilities
          </p>
          <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.02em]">
            What we do best
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-3">
          {capabilities.map((cap, idx) => (
            <Column key={cap.id} cap={cap} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Column({
  cap,
  index,
}: {
  cap: (typeof capabilities)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <h3 className="mb-6 text-[11px] uppercase tracking-[0.22em] text-muted">
        {cap.label}
      </h3>
      <ul className="space-y-3">
        {cap.groups.flatMap((g) => g.items).map((item) => (
          <li
            key={item}
            className="text-[clamp(1.05rem,1.6vw,1.4rem)] font-medium tracking-tight text-ink"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
