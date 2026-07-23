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
 * the column, and is themed dark to sit seamlessly on the ink section.
 * Height is left to Cal's own iframe auto-resize: picking a slot expands
 * the booker, and the panel grows with it instead of scrolling inside a
 * cropped card. On mobile it collapses below the copy.
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
        // The embed sits directly on the ink section, so it is pinned dark
        // and its tokens are driven to the site palette: cal-bg matches the
        // section's #1d1d1d exactly so the iframe is seamless, borders reuse
        // the border-paper/15 hairline weight, and the brand (buttons,
        // selected day) is the same white-pill-on-ink the site's dark
        // surfaces already use. cssVarsPerTheme keys are Cal's design
        // tokens (no `--`).
        theme: "dark",
        styles: {
          branding: { brandColor: "#ffffff" },
          body: { background: "#1d1d1d" },
        },
        cssVarsPerTheme: {
          dark: {
            "cal-brand": "#ffffff",
            "cal-brand-emphasis": "#e5e5e5",
            "cal-brand-text": "#1d1d1d",
            "cal-brand-subtle": "#333333",
            "cal-bg": "#1d1d1d",
            "cal-bg-emphasis": "#333333",
            "cal-bg-subtle": "#292929",
            "cal-bg-muted": "#232323",
            "cal-border": "rgba(255,255,255,0.14)",
            "cal-border-subtle": "rgba(255,255,255,0.08)",
            "cal-border-emphasis": "rgba(255,255,255,0.32)",
            "cal-border-booker": "rgba(255,255,255,0.14)",
            "cal-text": "#ffffff",
            "cal-text-emphasis": "#ffffff",
            "cal-text-subtle": "#a3a3a3",
            "cal-text-muted": "#888888",
          },
          // Kept as a sensible inverse in case the embed ever falls back to
          // light; the config below forces dark.
          light: {
            "cal-brand": "#1d1d1d",
            "cal-brand-text": "#ffffff",
            "cal-bg": "#ffffff",
            "cal-bg-subtle": "#f5f5f5",
            "cal-border": "rgba(29,29,29,0.12)",
            "cal-text": "#1d1d1d",
            "cal-text-subtle": "#888888",
          },
        },
      });
    })();
  }, []);

  return (
    <section
      id="contact"
      className="bg-ink px-edge py-24 text-paper sm:py-32"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
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

          {/* Full-bleed section, so the left column is now ~half the viewport.
              The clamp max is held to a rem value the longest word
              ("remembering?") still fits inside the narrowest lg column
              (~590px at the lg breakpoint) so it never slides under the
              calendar. */}
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2.25rem,6vw,6rem)] leading-[0.95] tracking-[-0.03em]"
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

        {/* The embed wrapper: a hairline frame instead of the old white
            card. cal-bg matches the section ink, so the frame is the only
            thing marking the panel's edge. Crucially there is no fixed
            height or aspect ratio any more — Cal's inline embed resizes its
            own iframe to fit the content, and the old height + overflow
            combination is what cropped the booker into an inner scrollbar
            when picking a slot expanded it. min-h only guards against the
            pre-load collapse. */}
        <div className="min-h-[560px] self-start overflow-hidden rounded-2xl border border-paper/15 p-2 sm:p-3">
          <Cal
            namespace="client-meeting"
            calLink="ezibuilds/client-meeting"
            style={{ width: "100%" }}
            config={{
              layout: "month_view",
              useSlotsViewOnSmallScreen: "true",
              theme: "dark",
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
