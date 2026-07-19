"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-paper py-24 sm:py-32">
      <div className="px-edge">
        <header className="mb-16 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">
            Testimonials
          </p>
          <h2 className="text-[clamp(2.5rem,6.5vw,6rem)] leading-[0.95] tracking-[-0.02em]">
            What our partners
            <br />
            <span className="text-muted">say about us</span>
          </h2>
        </header>

        <ul className="divide-y divide-line border-t border-line">
          {testimonials.map((t, idx) => (
            <motion.li
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.05 }}
              data-cursor="hover"
              className="group grid grid-cols-[3rem_1fr] gap-6 py-6 transition-colors hover:bg-ink/[0.03] sm:grid-cols-[4rem_1.4fr_2fr_auto] sm:gap-10 sm:py-8"
            >
              <span className="font-mono text-sm text-muted">
                {String(idx + 1).padStart(2, "0")}
              </span>

              <div>
                <h3 className="text-[clamp(1.1rem,1.7vw,1.5rem)] leading-tight tracking-tight">
                  {t.author}
                </h3>
                <p className="mt-1 text-sm text-muted">{t.role}</p>
              </div>

              <p className="col-span-2 mt-1 max-w-xl text-sm leading-relaxed text-muted sm:col-span-1 sm:mt-0">
                {t.quote}
              </p>

              <span className="col-span-2 mt-2 text-sm text-muted sm:col-span-1 sm:mt-0 sm:text-right">
                {t.company}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
