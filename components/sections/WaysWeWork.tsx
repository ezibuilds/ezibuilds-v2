"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { offers } from "@/lib/data";
import { cn } from "@/lib/cn";
import { ContactForm } from "@/components/sections/ContactForm";
import { DURATION, EASE, VIEWPORT, fadeUp, stagger, revealProps } from "@/lib/motion";

/**
 * Three offer cards, modelled on the Studio Maydit rhythm: pastel fills, dark
 * anchor card in the middle, and an expanding panel that opens the
 * `includes` list without leaving the section.
 *
 * The expansion is the only state. We deliberately do not store the
 * "currently selected" offer across renders — opening one closes the other,
 * but a re-click on the active card collapses it back to the default
 * summary, so the cards always read as equal candidates.
 */
export function WaysWeWork() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section id="offers" className="bg-paper py-24 sm:py-32">
      <div className="px-edge">
        <motion.header {...revealProps()} className="mb-12 max-w-3xl sm:mb-16">
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
          {offers.map((o) => {
            const isOpen = openSlug === o.slug;
            return (
              <motion.div
                key={o.slug}
                variants={fadeUp}
                // Border-l on the row sits inside the card and animates open,
                // so on md the height difference between collapsed and open
                // cards does not push the row around — flex makes them equal.
                className="flex"
              >
                <OfferCard
                  offer={o}
                  open={isOpen}
                  onToggle={() =>
                    setOpenSlug(isOpen ? null : o.slug)
                  }
                  onCta={() => setContactOpen(true)}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <ContactForm open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}

function OfferCard({
  offer,
  open,
  onToggle,
  onCta,
}: {
  offer: (typeof offers)[number];
  open: boolean;
  onToggle: () => void;
  onCta: () => void;
}) {
  const text = offer.textColor ?? "#1d1d1d";

  return (
    <article
      style={{ background: offer.accent, color: text }}
      // min-h keeps cards the same height when collapsed; when one expands
      // the others stretch with it because the parent is flex on md+.
      className="flex w-full flex-col rounded-[28px] p-7 sm:p-9"
    >
      <span className="text-[11px] uppercase tracking-[0.22em] opacity-80">
        {offer.name}
      </span>

      <h3 className="mt-4 text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.05] tracking-[-0.02em]">
        {offer.tagline}
      </h3>

      <p className="mt-4 max-w-md text-sm leading-relaxed opacity-80 sm:text-base">
        {offer.description}
      </p>

      {/* Includes list. AnimatePresence so the height animates in and out;
          `open` is the only signal, so the layout never gets out of sync with
          what the user just clicked. */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            key="list"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: DURATION.base, ease: EASE }}
            className="mt-6 space-y-2 overflow-hidden text-sm sm:text-base"
          >
            {offer.includes.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span aria-hidden className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-current" />
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* mt-auto pins the CTAs to the bottom so they line up across the row
          even when one card has expanded. */}
      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={onToggle}
          data-cursor="hover"
          className="block text-[11px] uppercase tracking-[0.22em] opacity-80 transition-opacity hover:opacity-100"
        >
          {open ? "Hide details" : "What's included"}
        </button>
        <button
          type="button"
          onClick={onCta}
          data-cursor="hover"
          className={cn(
            "mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-pill px-5 text-meta transition-colors sm:min-h-0 sm:py-2.5",
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
      </div>
    </article>
  );
}

function Arrow() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
    >
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
