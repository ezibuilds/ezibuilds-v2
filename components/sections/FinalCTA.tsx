"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/sections/ContactForm";
import { VIEWPORT, fadeUp, stagger } from "@/lib/motion";

/**
 * Final CTA panel. Dark background and oversized type so it lands as a
 * deliberate ending to the page rather than a thin strip above the footer.
 *
 * Headline is hand-split across lines so the big word ("remembering") gets
 * its own block; the inline list of contact channels keeps the panel useful
 * for visitors who don't want to fill a form.
 */
export function FinalCTA() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <section
        id="contact"
        className="bg-ink px-edge py-32 text-paper sm:py-40"
      >
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-6xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-6 text-meta text-paper/60"
          >
            Let&apos;s talk
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2.5rem,8vw,8rem)] leading-[0.92] tracking-[-0.03em]"
          >
            Ready to build
            <br />
            something worth
            <br />
            <span className="text-paper/55">remembering?</span>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="mt-14 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              data-cursor="hover"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-pill bg-paper px-6 text-meta text-ink transition-colors hover:bg-paper/90 sm:min-h-0 sm:py-3"
            >
              Book a strategy call
              <Arrow />
            </button>

            <a
              href="mailto:hello@ezibuilds.studio"
              data-cursor="hover"
              className="link-sweep inline-flex min-h-[44px] items-center text-meta text-paper/80 transition-colors hover:text-paper sm:min-h-0"
            >
              hello@ezibuilds.studio
            </a>
          </motion.div>

          {/* Channels row. Acts as the secondary proof point — a small cluster
              of social links that mirrors the Footer so the final panel does
              not feel like an information dead end. */}
          <motion.ul
            variants={fadeUp}
            className="mt-16 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-paper/15 pt-10 sm:grid-cols-4"
          >
            {CHANNELS.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="group block"
                >
                  <span className="block text-[11px] uppercase tracking-[0.22em] text-paper/55">
                    {c.label}
                  </span>
                  <span className="mt-1 block text-meta text-paper transition-colors group-hover:text-paper/70">
                    {c.value}
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </section>

      <ContactForm open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

const CHANNELS = [
  { label: "Email", value: "hello@ezibuilds.studio", href: "mailto:hello@ezibuilds.studio" },
  { label: "Instagram", value: "@ezibuilds", href: "https://instagram.com" },
  { label: "LinkedIn", value: "ezibuilds studio", href: "https://linkedin.com" },
  { label: "X", value: "@ezibuilds", href: "https://twitter.com" },
];

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
