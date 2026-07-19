"use client";

import { motion } from "framer-motion";
import { capabilities } from "@/lib/data";

export function Expertise() {
  return (
    <section id="capabilities" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] px-6 sm:px-10">
        <header className="mb-16 max-w-4xl">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">
            The ezibuilds framework™
          </p>
          <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.02em]">
            Every project follows
            <br />
            <span className="font-serif italic">the same system.</span>
          </h2>
        </header>

        <div className="space-y-20">
          {capabilities.map((cap, idx) => (
            <Pillar key={cap.id} cap={cap} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillar({
  cap,
  index,
}: {
  cap: (typeof capabilities)[number];
  index: number;
}) {
  const isLast = index === capabilities.length - 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      id={cap.id}
      className="grid grid-cols-1 gap-10 border-t border-line pt-10 md:grid-cols-[1fr_2fr]"
    >
      <div>
        <span className="block text-xs uppercase tracking-[0.22em] text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-2 text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[0.95] tracking-[-0.02em]">
          {cap.label}
        </h3>
        <p className="mt-4 text-lg font-medium leading-snug text-ink/90">
          {cap.tagline}
        </p>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
          {cap.description}
        </p>

        {!isLast && (
          <div
            aria-hidden
            className="mt-8 hidden text-3xl font-light text-muted md:block"
          >
            ↓
          </div>
        )}
      </div>

      <div
        className={
          cap.groups.length === 1 ? "md:grid-cols-1" : "md:grid-cols-2"
        }
      >
        <div
          className={`grid gap-10 ${
            cap.groups.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"
          }`}
        >
          {cap.groups.map((g) => (
            <div key={g.title}>
              <h4 className="mb-4 text-[11px] uppercase tracking-[0.22em] text-muted">
                {g.title}
              </h4>
              <ul className="space-y-2.5">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="text-[clamp(0.95rem,1.2vw,1.1rem)] font-medium tracking-tight text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
