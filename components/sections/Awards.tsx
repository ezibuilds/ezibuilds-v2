"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] px-6 sm:px-10">
        <header className="mb-16 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">
            Selected Work
          </p>
          <h2 className="text-[clamp(2.5rem,6.5vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em]">
            More projects we&apos;ve
            <br />
            <span className="font-serif italic">shipped</span>
          </h2>
        </header>

        <ul className="divide-y divide-line border-t border-line">
          {projects.map((p, idx) => (
            <motion.li
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.05 }}
              data-cursor="hover"
              className="group grid grid-cols-[3rem_1fr] gap-6 py-6 transition-colors hover:bg-ink/[0.03] sm:grid-cols-[4rem_1.4fr_2fr_auto] sm:gap-10 sm:py-8"
            >
              <span className="font-mono text-sm text-muted">{p.index}</span>

              <div>
                <h3 className="text-[clamp(1.1rem,1.7vw,1.5rem)] font-medium leading-tight tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{p.category}</p>
              </div>

              <p className="col-span-2 mt-1 max-w-xl text-sm leading-relaxed text-muted sm:col-span-1 sm:mt-0">
                {p.description}
              </p>

              <span className="col-span-2 mt-2 text-sm text-muted sm:col-span-1 sm:mt-0 sm:text-right">
                {p.year}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
