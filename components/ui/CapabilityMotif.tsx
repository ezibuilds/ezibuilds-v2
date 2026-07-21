"use client";

import { motion } from "framer-motion";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";

type Kind = "design" | "build" | "launch";

const INK = "#1d1d1d";

/**
 * Decorative motif for a capability card.
 *
 * Drawn rather than generated: three images that read as a set need identical
 * palette, weight and level of abstraction, which is exactly where generated
 * art drifts. These share primitives and pull their colour from the card, so
 * they stay consistent by construction and cost nothing to ship.
 */
export function CapabilityMotif({ kind, fill }: { kind: Kind; fill: string }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="aspect-square w-full rounded-card"
      style={{ background: fill }}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      aria-hidden
    >
      {kind === "design" && <Design />}
      {kind === "build" && <Build />}
      {kind === "launch" && <Launch />}
    </motion.svg>
  );
}

/** Children settle in sequence rather than arriving together. */
const piece = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

const stagger = (each: number, delay = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: each, delayChildren: delay } },
});

/** Loose blocks resolving into an aligned layout. */
function Design() {
  // width/height, not w/h: <rect> ignores the shorthand and renders nothing.
  const blocks = [
    { x: 28, y: 32, width: 144, height: 16 },
    { x: 28, y: 60, width: 62, height: 48 },
    { x: 98, y: 60, width: 74, height: 48 },
    { x: 28, y: 120, width: 144, height: 48 },
  ];
  return (
    <motion.g variants={stagger(0.1)}>
      {blocks.map((b, i) => (
        <motion.rect
          key={i}
          {...b}
          rx="5"
          fill="#ffffff"
          fillOpacity={i === 2 ? 0.95 : 0.55}
          stroke={INK}
          strokeOpacity="0.5"
          strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
          variants={piece}
        />
      ))}
    </motion.g>
  );
}

/** Modular units stacking upward into a structure. */
function Build() {
  // Bottom row first, so the stack reads as assembling rather than falling.
  const units = [
    { x: 32, y: 124 },
    { x: 80, y: 124 },
    { x: 128, y: 124 },
    { x: 56, y: 78 },
    { x: 104, y: 78 },
    { x: 80, y: 32 },
  ];
  return (
    <motion.g variants={stagger(0.08)}>
      {units.map((u, i) => (
        <motion.rect
          key={i}
          x={u.x}
          y={u.y}
          width="40"
          height="40"
          rx="5"
          fill="#ffffff"
          fillOpacity={i === 5 ? 0.95 : 0.6}
          stroke={INK}
          strokeOpacity="0.5"
          strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
          variants={piece}
        />
      ))}
    </motion.g>
  );
}

/** A trajectory leaving expanding rings behind it. */
function Launch() {
  const rings = [18, 32, 46];
  return (
    <motion.g variants={stagger(0.1)}>
      {rings.map((r, i) => (
        <motion.circle
          key={r}
          cx="56"
          cy="150"
          r={r}
          fill="none"
          stroke={INK}
          strokeOpacity={0.4 - i * 0.1}
          strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
          variants={{
            hidden: { opacity: 0, scale: 0.6 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: DURATION.slow, ease: EASE },
            },
          }}
          style={{ transformOrigin: "56px 150px" }}
        />
      ))}

      <motion.path
        d="M56 150 C 92 144, 126 114, 160 44"
        fill="none"
        stroke={INK}
        strokeOpacity="0.75"
        // No non-scaling-stroke here. Framer animates pathLength by setting
        // pathLength="1" with a normalised stroke-dasharray, and
        // non-scaling-stroke makes the browser resolve those dashes in screen
        // units instead, shattering the line into a 1px dash pattern. Width is
        // pre-divided by the card's viewBox scale (~2.3x) to match the
        // hairlines the other shapes get from the vector effect.
        strokeWidth="0.9"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.1, ease: EASE },
          },
        }}
      />

      <motion.circle
        cx="160"
        cy="44"
        r="9"
        fill="#ffffff"
        stroke={INK}
        strokeOpacity="0.6"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        variants={{
          hidden: { opacity: 0, scale: 0.4 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: DURATION.base, ease: EASE, delay: 0.85 },
          },
        }}
        style={{ transformOrigin: "160px 44px" }}
      />
    </motion.g>
  );
}
