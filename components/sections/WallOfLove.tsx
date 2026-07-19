"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";

export function WallOfLove() {
  return (
    <section id="love" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-[88rem] px-6 sm:px-10">
        <header className="mb-16 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">
            Wall of love
          </p>
          <h2 className="text-[clamp(2.5rem,6.5vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em]">
            What our partners
            <br />
            <span className="font-serif italic">say about us</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.figure
              key={t.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.06 }}
              className="flex flex-col justify-between rounded-3xl border border-line bg-white/40 p-7 transition-colors hover:border-ink"
            >
              <blockquote className="text-[15px] leading-relaxed text-ink">
                <span className="font-serif text-2xl text-muted">&ldquo;</span>
                {t.quote}
                <span className="font-serif text-2xl text-muted">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                <p className="font-medium text-ink">{t.author}</p>
                <p className="text-muted">
                  {t.role} · {t.company}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
