import type { Variants } from "framer-motion";

/**
 * One motion vocabulary for the whole site.
 *
 * Before this, each section picked its own duration (0.5 / 0.8), distance
 * (20 / 24 / 30 / 40px) and easing, so reveals of the same kind landed at
 * different speeds as you scrolled. Everything below is expressive of intent
 * rather than of a number, and the raw values live in exactly one place.
 *
 * EASE mirrors --ease-out in globals.css; keep the two in sync so CSS-driven
 * and JS-driven motion share a feel.
 */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  /** Hovers and other direct-manipulation feedback. */
  fast: 0.35,
  /** The default for content arriving on scroll. */
  base: 0.6,
  /** Large surfaces: hero panels, full-width headings. */
  slow: 0.9,
} as const;

/** Distance a revealing element travels. Small on purpose. */
export const RISE = 24;

/**
 * Reveals fire slightly before the element is fully on screen, so the motion
 * reads as "already arriving" rather than starting once you can see it.
 */
export const VIEWPORT = { once: true, margin: "-80px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: RISE },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

/** Parent for a group whose children reveal in sequence. */
export const stagger = (each = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: each, delayChildren: delay } },
});

/** Shorthand for a one-off reveal that is not part of a stagger group. */
export const revealProps = (delay = 0) => ({
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: VIEWPORT,
  variants: {
    hidden: { opacity: 0, y: RISE },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.base, ease: EASE, delay },
    },
  } satisfies Variants,
});
