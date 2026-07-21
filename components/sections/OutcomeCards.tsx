"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/data";
import { cn } from "@/lib/cn";
import { VIEWPORT, fadeUp, stagger, revealProps } from "@/lib/motion";

/**
 * Pastel fills used across the site, picked from the existing works palette so
 * the outcome cards feel like part of the same visual vocabulary rather than
 * a new colour system bolted on. `dark` is for cards that need higher contrast
 * against the otherwise light card grid.
 */
const CARD_FILLS: Record<string, { bg: string; text: string }> = {
  product: { bg: "#C5CEF0", text: "#1d1d1d" },
  ai: { bg: "#DDB3E9", text: "#1d1d1d" },
  saas: { bg: "#A9E5E3", text: "#1d1d1d" },
  mobile: { bg: "#F5D9A8", text: "#1d1d1d" },
  web: { bg: "#CFE0F2", text: "#1d1d1d" },
  launch: { bg: "#1d1d1d", text: "#ffffff" },
  growth: { bg: "#AFD9A4", text: "#1d1d1d" },
};

export function OutcomeCards() {
  return (
    <section id="build" className="bg-paper py-24 sm:py-32">
      <div className="px-edge">
        <motion.header {...revealProps()} className="mb-12 max-w-3xl sm:mb-16">
          <p className="mb-3 text-meta text-muted">
            Everything we build
          </p>
          <h2 className="text-[clamp(2rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
            From the first wireframe
            <br />
            <span className="text-muted">to the launch trailer.</span>
          </h2>
        </motion.header>

        {/* Bento-ish grid: two larger cards anchor the layout, the rest fill a
            three-up row beneath so the section reads as a single visual block
            rather than a uniform list. */}
        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((p, i) => {
            const fill = CARD_FILLS[p.group] ?? CARD_FILLS.product;
            // The first card gets to be a feature on lg; the launch card sits
            // dark so it breaks the row rhythm intentionally.
            const span = i === 0 ? "lg:col-span-2 lg:row-span-2" : "";
            const tall = i === 0 ? "lg:aspect-auto lg:min-h-[520px]" : "";
            return (
              <motion.li key={p.slug} variants={fadeUp} className={span}>
                <Card
                  name={p.name}
                  tagline={p.tagline}
                  description={p.description}
                  bg={fill.bg}
                  text={fill.text}
                  className={cn("h-full", tall)}
                />
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

function Card({
  name,
  tagline,
  description,
  bg,
  text,
  className = "",
}: {
  name: string;
  tagline: string;
  description: string;
  bg: string;
  text: string;
  className?: string;
}) {
  return (
    <article
      data-cursor="hover"
      // aspect-[5/6] keeps the small cards close to square on mobile, where
      // 3-col bento would otherwise produce thin strips. The lg:min-h on the
      // feature card overrides it.
      className={cn(
        "group relative flex aspect-[5/6] flex-col justify-between overflow-hidden rounded-[28px] p-7 sm:p-9",
        className
      )}
      style={{ background: bg, color: text }}
    >
      <span className="text-[11px] uppercase tracking-[0.22em] opacity-80">
        {name}
      </span>

      <div>
        <h3 className="text-[clamp(1.5rem,2.4vw,2.5rem)] leading-[1.05] tracking-[-0.02em]">
          {tagline}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed opacity-80 sm:text-base">
          {description}
        </p>
      </div>
    </article>
  );
}
