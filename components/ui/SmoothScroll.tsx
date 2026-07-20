"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      lerp: 0.1,
    });
    lenisRef.current = lenis;
    // Exposed so overlays can freeze the page behind them. `overflow: hidden`
    // alone does nothing here: Lenis preventDefaults the wheel and scrolls
    // programmatically, so it has to be told to stop.
    window.__lenis = lenis;

    // Drive Lenis from GSAP's ticker and let ScrollTrigger observe Lenis,
    // otherwise scrub-linked animations never see the smoothed scroll.
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // ScrollTrigger caches every start/end at creation time. The hero stage
    // collapses from 100svh to 62svh once fonts resolve, roughly 350px into
    // the page, which leaves every trigger below it firing that much late.
    // Recompute whenever the document height actually changes.
    let lastHeight = document.body.scrollHeight;
    let pending = 0;
    const observer = new ResizeObserver(() => {
      const height = document.body.scrollHeight;
      if (height === lastHeight) return;
      lastHeight = height;
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        lenis.resize();
      });
    });
    observer.observe(document.body);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(pending);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // reducedMotion="user" keeps opacity fades but drops transform animation
  // for anyone who asked for it, across every motion component at once.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
