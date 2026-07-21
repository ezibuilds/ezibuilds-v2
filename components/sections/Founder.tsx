"use client";

import { motion } from "framer-motion";
import { founder } from "@/lib/data";
import { VIEWPORT, fadeUp, stagger, revealProps } from "@/lib/motion";

/**
 * Founder / studio story section.
 *
 * The plan called for a large portrait, but the studio does not have one yet.
 * The placeholder block reuses the same pastel-card vocabulary from the team
 * grid so swapping in a real photo later is a one-element change: replace the
 * initials panel with a Next/Image and remove the aria-hidden decorative
 * type below.
 */
export function Founder() {
  return (
    <section id="founder" className="bg-paper py-24 sm:py-32">
      <div className="px-edge">
        <motion.header {...revealProps()} className="mb-12 max-w-3xl sm:mb-16">
          <p className="mb-3 text-meta text-muted">The studio</p>
          <h2 className="text-[clamp(2rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
            Why
            <br />
            <span className="text-muted">ezibuilds exists.</span>
          </h2>
        </motion.header>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_6fr] lg:gap-16"
        >
          <motion.div variants={fadeUp}>
            <Portrait />
          </motion.div>

          <div className="flex flex-col">
            <motion.p
              variants={fadeUp}
              className="mb-4 text-meta uppercase tracking-[0.22em] text-muted"
            >
              {founder.role}
            </motion.p>
            <motion.h3
              variants={fadeUp}
              className="text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]"
            >
              {founder.name}
            </motion.h3>

            <motion.p
              variants={fadeUp}
              className="mt-8 text-display-sm text-muted"
            >
              {founder.bio}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-10 max-w-xl text-base leading-relaxed text-ink"
            >
              {founder.story}
            </motion.p>

            <motion.blockquote
              variants={fadeUp}
              className="mt-10 max-w-xl border-l border-line pl-6 text-display-sm italic text-ink"
            >
              &ldquo;{founder.mission}&rdquo;
            </motion.blockquote>

            <motion.ul
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-2"
            >
              {founder.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="inline-flex min-h-[44px] items-center rounded-full border border-line px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition-colors hover:border-ink hover:bg-ink hover:text-paper sm:min-h-0"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Portrait() {
  // The plan's brief was "huge image, not corporate." Until a real photo is
  // shot, this block stands in: pastel background, full-bleed initials, and
  // the role tag in the corner — the same vocabulary as Team.tsx so the two
  // sections sit comfortably next to each other.
  const initials = founder.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const firstName = founder.name.split(" ")[0];

  return (
    <div
      data-cursor="hover"
      className="relative flex aspect-[5/6] w-full items-end overflow-hidden rounded-[28px] bg-[#F5D9A8] p-8 sm:p-12"
      aria-label={`${founder.name}, ${founder.role}`}
    >
      <span
        aria-hidden
        className="absolute right-6 top-6 rounded-full border border-ink/20 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-ink/70"
      >
        {initials}
      </span>

      {/* Decorative first name, big and bleeding off the corner. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-6 select-none text-[clamp(5rem,16vw,14rem)] leading-none tracking-[-0.05em] text-ink/[0.12]"
      >
        {firstName}
      </span>

      <div className="relative z-10">
        <p className="text-[11px] uppercase tracking-[0.22em] text-ink/70">
          {founder.role}
        </p>
        <p className="mt-3 text-[clamp(1.5rem,3.6vw,2.75rem)] leading-[1.05] tracking-[-0.02em] text-ink">
          {founder.name}
        </p>
      </div>
    </div>
  );
}
