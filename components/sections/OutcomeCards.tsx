"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/data";
import { VIEWPORT, fadeUp, stagger, revealProps } from "@/lib/motion";

/**
 * "Everything we build" as a typographic index, not another card grid.
 *
 * The section sits between two card layouts (the hero carousel above, the
 * offer cards below), so a third grid of pastel rectangles read as one long
 * wall of cards — and five items in a three-up grid always left an orphaned
 * last row. Full-width hairline rows solve both: they change the page's
 * rhythm the way formandfun.co breaks its media sections with type-only
 * indexes, and a list has no orphans.
 *
 * Each row keeps its product's pastel from the works palette, shown as a
 * small swatch and flooded across the whole row on hover. The list is
 * ordered along the arc the heading promises — design first, launch last —
 * and the final row floods ink instead of pastel, landing the "launch
 * trailer" beat and foreshadowing the dark CTA section further down.
 */
const ROW_FILLS: Record<string, { bg: string; text: string }> = {
  product: { bg: "#C5CEF0", text: "#1d1d1d" },
  saas: { bg: "#A9E5E3", text: "#1d1d1d" },
  mobile: { bg: "#F5D9A8", text: "#1d1d1d" },
  web: { bg: "#CFE0F2", text: "#1d1d1d" },
  launch: { bg: "#1d1d1d", text: "#ffffff" },
};

export function OutcomeCards() {
  return (
    <section id="build" className="bg-paper py-24 sm:py-32">
      <div className="px-edge">
        {/* No max-w: the <br/> sets the two-line lockup, and a width cap
            re-wrapped "wireframe" onto its own line at desktop sizes. */}
        <motion.header {...revealProps()} className="mb-12 sm:mb-16">
          <p className="mb-3 text-meta text-muted">Everything we build</p>
          <h2 className="text-[clamp(2rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
            From the first wireframe
            <br />
            <span className="text-muted">to the launch trailer.</span>
          </h2>
        </motion.header>

        <motion.ul
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="border-b border-line"
        >
          {products.map((p) => {
            const fill = ROW_FILLS[p.group] ?? ROW_FILLS.product;
            return (
              <motion.li key={p.slug} variants={fadeUp}>
                <Row
                  name={p.name}
                  tagline={p.tagline}
                  description={p.description}
                  bg={fill.bg}
                  text={fill.text}
                />
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

function Row({
  name,
  tagline,
  description,
  bg,
  text,
}: {
  name: string;
  tagline: string;
  description: string;
  bg: string;
  text: string;
}) {
  return (
    <article
      data-cursor="hover"
      // The flood colour and its readable text colour travel as CSS vars so
      // one hover rule serves both the pastel rows and the ink launch row.
      style={{ "--fill": bg, "--fill-text": text } as React.CSSProperties}
      className="group grid grid-cols-1 gap-x-[1vw] gap-y-3 border-t border-line py-7 text-ink transition-colors duration-500 ease-(--ease-out) hover:bg-(--fill) hover:text-(--fill-text) sm:py-9 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_auto] md:items-center"
    >
      <h3 className="flex items-center gap-4 text-display-md transition-transform duration-500 ease-(--ease-out) md:group-hover:translate-x-3">
        {/* The swatch carries the row's colour identity before any hover
            happens — on touch, where the flood never fires, it is the only
            trace of the palette. border-current keeps it visible once the
            row floods with its own colour. */}
        <span
          aria-hidden
          className="h-3 w-3 shrink-0 rounded-full border border-current/25"
          style={{ background: bg }}
        />
        {name}
      </h3>

      <div className="max-w-md md:justify-self-end md:pr-[2vw]">
        <p className="text-base">{tagline}</p>
        {/* Opacity, not text-muted: the grey token would vanish against the
            ink flood on the launch row, currentColor at 60% reads on both. */}
        <p className="mt-2 text-meta leading-normal opacity-60">
          {description}
        </p>
      </div>

      <Arrow className="hidden h-5 w-5 -translate-x-3 opacity-0 transition-all duration-500 ease-(--ease-out) group-hover:translate-x-0 group-hover:opacity-100 md:block" />
    </article>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" fill="none" className={className} aria-hidden>
      <path
        d="M1 5h8m0 0L5 1m4 4L5 9"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
