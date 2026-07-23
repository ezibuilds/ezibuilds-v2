"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { offers } from "@/lib/data";
import { cn } from "@/lib/cn";
import { ContactForm } from "@/components/sections/ContactForm";
import { VIEWPORT, fadeUp, stagger, revealProps } from "@/lib/motion";

/**
 * Three offer cards, modelled on Studio Maydit's "Ways we work" section.
 *
 * The visual weight is on a plain check list (no chips, no pastel fills) so
 * the buyer can scan "what do I actually get" in a single glance. The last
 * rows in each card carry a filled green tick rather than a hairline one, to
 * draw the eye to the trust differentiators ("risk-free trial", "pause
 * anytime") — Maydit uses the same trick with "Free Framer development".
 *
 * Below each CTA, a small uppercase "assurance" line sits on its own — the
 * scarcity / payment line that reduces buyer anxiety about scope and
 * commitment, marked with the offer's colour so the site palette still shows
 * up in a section that is otherwise ink and paper.
 *
 * The section chrome is the site's, not the reference's: full-bleed at the
 * page edge on paper, with the left-aligned eyebrow and display heading every
 * other section on the page uses. Only the cards come from the reference.
 */
/**
 * The featured offer moved to the middle of the row, its neighbours kept in
 * their original order around it. Computed once at module load — the offers
 * list is static. Falls back to the raw order if the shape is ever not
 * "exactly one featured among three".
 */
const orderedOffers = (() => {
  const featured = offers.filter((o) => o.featured);
  const rest = offers.filter((o) => !o.featured);
  if (featured.length === 1 && rest.length === 2) {
    return [rest[0], featured[0], rest[1]];
  }
  return offers;
})();

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

        {/* On md+ the ink card sits dead centre — the pricing-table
            convention that reads the middle card as the recommended one. On
            mobile the stack keeps its natural order (the recommended card in
            the middle of the three), which is fine one-per-row. */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-1 items-stretch gap-5 pt-4 md:grid-cols-3"
        >
          {orderedOffers.map((o) => (
            <motion.div key={o.slug} variants={fadeUp} className="flex">
              <OfferCard
                offer={o}
                featured={!!o.featured}
                onCta={() => setContactOpen(true)}
              />
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
  featured,
  onCta,
}: {
  offer: (typeof offers)[number];
  featured: boolean;
  onCta: () => void;
}) {
  return (
    <article
      className={cn(
        "relative flex w-full flex-col rounded-[20px] p-7 sm:rounded-[28px] sm:p-9",
        featured
          ? "bg-ink text-paper md:-my-3 md:pt-12 md:pb-12"
          : "border border-line bg-paper text-ink"
      )}
    >
      {/* Straddles the top edge, half on the paper above and half on the ink
          card — a paper pill reads on both. It is what gives the centred dark
          card a stated reason to stand out rather than just being darker. */}
      {featured && (
        <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-pill border border-line bg-paper px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-ink shadow-sm">
          Most popular
        </span>
      )}

      <h3 className="text-display-sm">{offer.name}</h3>

      {/* One intro line, not two: the old tagline + position pair said the
          same thing twice and pushed the list below the fold of a glance.
          The "for X" line is the one that lets a buyer self-select. */}
      <p
        className={cn(
          "mt-3 text-sm leading-relaxed sm:text-base",
          featured ? "text-paper/60" : "text-muted"
        )}
      >
        {offer.position}
      </p>

      {/* No "Inside the partnership" eyebrow — a list under the offer name
          explains itself, and the caps register is reserved for the assurance
          fine print at the foot of the card. */}
      <ul className="mt-8 space-y-3.5 text-sm sm:text-base">
        {offer.includes.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Tick />
            <span>{item}</span>
          </li>
        ))}
        {offer.highlights.map((item) => (
          // The text stays in the card's normal colour — only the mark
          // carries the green, so the eye reads it as "this is a trust
          // signal" rather than "this whole row is a different colour". The
          // solid disc is what separates it from the hairline ticks above.
          <li key={item} className="flex items-start gap-3">
            <TickBadge />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Full-width CTA, pinned to the foot so all three buttons land on one
          line however uneven the lists above them are. */}
      <div className="mt-auto pt-10">
        <button
          type="button"
          onClick={onCta}
          data-cursor="hover"
          className={cn(
            "flex min-h-[48px] w-full items-center justify-center gap-2 rounded-pill px-5 text-meta transition-colors",
            featured
              ? "bg-paper text-ink hover:bg-gray"
              : "bg-ink text-paper hover:bg-ink-soft"
          )}
        >
          {/* Same Meet mark as the hero CTA — names the medium before the
              click, since the drawer books a Meet. Its inner square is a hole
              in the alpha, so on the paper (featured) button the button shows
              through it and on the ink button the ink does; it reads on both.
              The arrow is dropped here: this pill is full-width and centred,
              and a trailing arrow pulled the lockup off-centre. */}
          <Image
            src="/logos/google-meet.png"
            alt=""
            width={24}
            height={24}
            className="h-[24px] w-[24px] shrink-0"
          />
          {offer.cta}
        </button>

        {/* Maydit's trust line. Uppercase, tight tracking, muted so it reads
            as fine print rather than a heading, and centred under the button
            it qualifies. The dot is the offer's colour — the only place the
            pastel palette appears in this section. */}
        <p
          className={cn(
            "mt-4 flex items-center justify-center gap-2 text-center text-[11px] leading-normal uppercase tracking-[0.22em]",
            featured ? "text-paper/55" : "text-muted"
          )}
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: offer.accent }}
          />
          {offer.assurance}
        </p>
      </div>
    </article>
  );
}

/** Hairline tick for the standard inclusions. */
function Tick() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className="mt-1 shrink-0 opacity-70"
    >
      <path
        d="M2 6.2l2.6 2.6L10 3.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Filled tick for the trust differentiators. Sits at the same baseline as the
 * hairline tick above it so the two row types share one text edge.
 */
function TickBadge() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="mt-0.5 shrink-0"
    >
      <circle cx="7" cy="7" r="7" fill={HIGHLIGHT} />
      <path
        d="M4 7.2l2.2 2.2L10 5.2"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
