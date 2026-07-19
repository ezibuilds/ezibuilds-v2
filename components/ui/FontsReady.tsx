"use client";

import { useEffect } from "react";

/**
 * Adds `.fonts-ready` to <html>, which collapses the hero and lets the
 * carousel rise. Gated on webfonts resolving so the layout is settled before
 * it animates, plus a minimum hold so the centred wordmark is actually
 * legible as a moment rather than a flash.
 */

/** Switzer resolves in ~150ms, which is too fast to read as a beat. */
const MIN_HOLD_MS = 1400;

export function FontsReady() {
  useEffect(() => {
    const root = document.documentElement;
    let cancelled = false;
    let holdTimer = 0;

    const start = performance.now();
    const mark = () => {
      if (!cancelled) root.classList.add("fonts-ready");
    };

    // Anyone who has asked for less motion gets the settled layout at once.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      mark();
      return;
    }

    const markAfterHold = () => {
      if (cancelled) return;
      const elapsed = performance.now() - start;
      holdTimer = window.setTimeout(mark, Math.max(0, MIN_HOLD_MS - elapsed));
    };

    // Safety net: never leave the hero stuck at full height.
    const safety = window.setTimeout(mark, 3000);

    if (document.fonts) {
      document.fonts.ready.then(markAfterHold).catch(markAfterHold);
    } else {
      markAfterHold();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(safety);
      window.clearTimeout(holdTimer);
    };
  }, []);

  return null;
}
