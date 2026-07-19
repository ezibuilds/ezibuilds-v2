"use client";

import { motion } from "framer-motion";
import { awards } from "@/lib/data";

export function Awards() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] px-6 sm:px-10">
        <header className="mb-16 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">
            Recognition
          </p>
          <h2 className="text-[clamp(2.5rem,6.5vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em]">
            An award
            <br />
            <span className="font-serif italic">winning</span> studio
          </h2>
        </header>

        <ul className="divide-y divide-line border-t border-line">
          {awards.map((a, idx) => (
            <motion.li
              key={a.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.05 }}
              className="group grid grid-cols-[3rem_1fr] gap-6 py-6 transition-colors hover:bg-ink/[0.03] sm:grid-cols-[4rem_1.4fr_1.6fr_auto] sm:gap-10 sm:py-8"
            >
              <span className="font-mono text-sm text-muted">{a.index}</span>

              <div>
                <h3 className="text-[clamp(1.1rem,1.7vw,1.5rem)] font-medium leading-tight tracking-tight">
                  {a.title}
                </h3>
                <p className="mt-1 text-sm text-muted">Project · {a.project}</p>
              </div>

              <div className="col-span-2 mt-1 text-sm text-muted sm:col-span-1 sm:mt-0">
                <p className="mb-1 text-[11px] uppercase tracking-[0.22em] text-ink/60 sm:hidden">
                  Category
                </p>
                <p className="whitespace-pre-line leading-snug">{a.category}</p>
              </div>

              <span className="col-span-2 mt-2 text-sm text-muted sm:col-span-1 sm:mt-0 sm:text-right">
                <span className="mb-1 block text-[11px] uppercase tracking-[0.22em] text-ink/60 sm:hidden">
                  Year
                </span>
                {a.year}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
