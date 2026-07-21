"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { offers } from "@/lib/data";
import { cn } from "@/lib/cn";
import { ContactForm } from "@/components/sections/ContactForm";
import { VIEWPORT, fadeUp, stagger, revealProps } from "@/lib/motion";

/**
 * Three offer cards, modelled on Studio Maydit's "Ways we work" section.
 *
 * The visual weight is on a plain-text bullet list (no icons, no chips) so
 * the buyer can scan "what do I actually get" in a single glance. The last
 * two bullets in each card are highlighted in brand green to draw the eye to
 * the trust differentiators ("risk-free trial", "pause anytime") — Maydit
 * uses the same trick with "Free Framer development".
 *
 * Below the cards, a small uppercase "assurance" line sits on its own — this
 * is the scarcity / payment line that Maydit shows ("WE CAP CLIENTS…",
 * "SPLIT PAYMENT…") and reduces buyer anxiety about scope and commitment.
 */
export function WaysWeWork() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section id="offers" className="bg-paper py-24 sm:py-32">
      <div className="px-edge">
        <motion.header {...revealProps()} className="mb-12 max-w-4xl sm:mb-16">
          <p className="mb-3 text-meta text-muted">Ways we work</p>
          <h2 className="text-[clamp(2rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
            Three ways to
            <br />
            <span className="text-muted">work with us.</span>
          </h2>
        </motion.header>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {offers.map((o) => (
            <motion.div key={o.slug} variants={fadeUp} className="flex">
              <OfferCard offer={o} onCta={() => setContactOpen(true)} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ContactForm open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}

/**
 * Brand green for the highlight check icons. Hard-coded rather than going
 * through the theme because the existing --color-accent is a pastel blue
 * that would clash with the trust signals here.
 */
const HIGHLIGHT = "#1f9e5b";

function OfferCard({
  offer,
  onCta,
}: {
  offer: (typeof offers)[number];
  onCta: () => void;
}) {
  const text = offer.textColor ?? "#1d1d1d";

  return (
    <article
      style={{ background: offer.accent, color: text }}
      className="flex w-full flex-col rounded-card p-7 sm:p-9"
    >
      <h3 className="text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.05] tracking-[-0.02em]">
        {offer.name}
      </h3>

      <p className="mt-3 text-sm leading-relaxed opacity-80 sm:text-base">
        {offer.tagline}
      </p>

      <p className="mt-2 text-sm leading-relaxed opacity-70 sm:text-base">
        {offer.position}
      </p>

      <p className="mt-8 mb-3 text-[11px] uppercase tracking-[0.22em] opacity-65">
        Inside the partnership
      </p>

      <ul className="space-y-2 text-sm sm:text-base">
        {offer.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            {/* Standard rows use a tiny disc — same rhythm as the row labels
                on the work-detail page so the card reads as part of the
                site, not its own thing. */}
            <span
              aria-hidden
              className="mt-2.5 inline-block h-1 w-1 shrink-0 rounded-full bg-current opacity-70"
            />
            <span>{item}</span>
          </li>
        ))}
        {offer.highlights.map((item) => (
          // The text stays in the card's normal colour — only the icon
          // carries the green, so the eye reads it as "this is a trust
          // signal" rather than "this whole row is a different colour".
          <li key={item} className="flex items-start gap-2.5">
            <Check />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-10">
        <button
          type="button"
          onClick={onCta}
          data-cursor="hover"
          className={cn(
            "inline-flex min-h-[44px] items-center gap-2 rounded-pill px-5 text-meta transition-colors sm:min-h-0 sm:py-2.5",
            // Light cards get the same ink-on-paper pill as the hero CTA; the
            // dark card inverts it so the CTA reads on its own background.
            offer.slug === "fixed-scope"
              ? "bg-paper text-ink hover:bg-paper/90"
              : "bg-ink text-paper hover:bg-ink-soft"
          )}
        >
          {offer.cta}
          <Arrow />
        </button>

        {/* Maydit's trust line. Uppercase, tight tracking, slightly muted so
            it reads as fine print rather than a heading. mt-3 keeps it close
            to the CTA — same vertical relationship as the reference. */}
        <p className="mt-3 text-[11px] uppercase tracking-[0.22em] opacity-65">
          {offer.assurance}
        </p>
      </div>
    </article>
  );
}

function Arrow() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path
        d="M1 5h8m0 0L5 1m4 4L5 9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Small check icon used to mark the trust differentiators in each card.
 * Sits at the same baseline position as the disc bullet (mt-2.5 in the
 * parent <li>) so the two row types line up vertically.
 */
function Check() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className="mt-2 shrink-0"
      style={{ color: HIGHLIGHT }}
    >
      <path
        d="M2.5 6.5l2.5 2.5L9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
