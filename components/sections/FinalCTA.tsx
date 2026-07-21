"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Cal, { getCalApi } from "@calcom/embed-react";
import { VIEWPORT, fadeUp, stagger } from "@/lib/motion";

/**
 * Final CTA panel — two-column on lg: headline, channels, and the email
 * escape hatch on the left, Cal.com inline embed on the right.
 *
 * The embed is configured for "month_view" so the calendar picker fills
 * the column. On mobile it collapses below the copy — `min-h` on the
 * wrapper keeps the embed from collapsing to a sliver before its iframe
 * loads, and `aspect-square sm:aspect-auto sm:min-h-[640px]` gives the
 * embed a sensible height across breakpoints.
 */
export function FinalCTA() {
  useEffect(() => {
    // Configure Cal.com UI once on mount. getCalApi returns a promise; we
    // await it inside the effect so we don't block render.
    (async () => {
      const cal = await getCalApi({ namespace: "client-meeting" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "auto",
      });
    })();
  }, []);

  return (
    <section
      id="contact"
      className="bg-ink px-edge py-24 text-paper sm:py-32"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="flex flex-col"
        >
          <motion.p variants={fadeUp} className="mb-6 text-meta text-paper/60">
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
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="mailto:hello@ezibuilds.studio"
              data-cursor="hover"
              className="link-sweep inline-flex min-h-[44px] items-center text-meta text-paper/80 transition-colors hover:text-paper sm:min-h-0"
            >
              hello@ezibuilds.studio
            </a>
          </motion.div>

          {/* Channels grid. Mirrors the Footer so the panel never feels like
              an information dead end. mt-auto pins it to the bottom of the
              left column so its position stays consistent regardless of the
              embed's rendered height. */}
          <motion.ul
            variants={fadeUp}
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-paper/15 pt-10 sm:grid-cols-2 lg:mt-auto"
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

        {/* The embed wrapper. bg-paper gives the Cal.com UI (which is light
            by default in auto theme) a solid background so it does not bleed
            into the surrounding ink section. rounded-card matches the design
            language used elsewhere on the site. */}
        <div className="min-h-140 overflow-hidden rounded-card bg-paper text-ink aspect-square sm:aspect-auto sm:min-h-160">
          <Cal
            namespace="client-meeting"
            calLink="ezibuilds/client-meeting"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{
              layout: "month_view",
              useSlotsViewOnSmallScreen: "true",
              theme: "light",
            }}
          />
        </div>
      </div>
    </section>
  );
}

const CHANNELS = [
  { label: "Email", value: "hello@ezibuilds.studio", href: "mailto:hello@ezibuilds.studio" },
  { label: "Instagram", value: "@ezibuilds", href: "https://instagram.com" },
  { label: "LinkedIn", value: "ezibuilds studio", href: "https://linkedin.com" },
  { label: "X", value: "@ezibuilds", href: "https://twitter.com" },
];
