"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { works } from "@/lib/data";
import { WordFill } from "@/components/ui/WordFill";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-paper">
      {/* Wordmark holds the full viewport until fonts resolve, then collapses */}
      <div className="hero-stage flex items-center justify-center px-edge">
        {/* Smaller on mobile: the fixed 1rem gutter eats proportionally
            more width there than 1vw does on desktop. */}
        <h1 className="intro-mark w-full text-center text-[24vw] leading-[0.85] tracking-[-0.04em] md:text-[26vw]">
          ezibuilds
        </h1>
      </div>

      {/* Works carousel, rises from below once the wordmark settles */}
      {/* No top padding here: it has to sit inside the overflow containers
          below, or it does nothing for the hover lift. */}
      <div className="hero-rise relative pb-10">
        <CarouselMobile />
        <CarouselDesktop />
      </div>

      {/* Studio intro: words fill from grey to ink on scroll */}
      <div className="px-edge pb-20 pt-16">
        <p className="mb-6 text-meta text-ink">The studio</p>
        <WordFill
          className="text-display-lg"
          text="We are a global product studio designing, building, and launching digital products that drive real business outcomes, from first wireframe to scale."
        />

        {/* Deliberately a block, not inline after the last word. At this type
            size the copy fills the measure at every breakpoint, so an inline
            pill always wrapped onto a line of its own and read as detached. */}
        <a
          href="#capabilities"
          data-cursor="hover"
          className="group mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-pill bg-ink px-5 text-meta text-paper transition-colors hover:bg-ink-soft sm:min-h-0 sm:py-2.5"
        >
          Learn more
          <Arrow className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}

/**
 * Mobile carousel.
 *
 * Drives native scrollLeft rather than a transform, so the auto-advance and a
 * finger swipe act on the same property and cannot fight each other. The
 * desktop track cannot be reused here: it early-returns on (hover: none), which
 * left the row completely static on a phone.
 */
function CarouselMobile() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SPEED = 0.35; // px per frame, gentler than desktop on a small screen
    let raf = 0;
    let paused = false;
    let resumeTimer = 0;
    // Position is tracked as a float here rather than read back from the
    // element each frame: scrollLeft can round to an integer, which swallows a
    // sub-pixel increment entirely and leaves the row sitting still.
    let pos = el.scrollLeft;

    const step = () => {
      if (paused) {
        pos = el.scrollLeft; // resync so a swipe is not undone on resume
      } else {
        // The list is rendered twice; wrapping at the halfway mark makes the
        // loop seamless because the second copy is pixel-identical.
        const half = el.scrollWidth / 2;
        pos += SPEED;
        if (pos >= half) pos -= half;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    // Yield to the user the moment they touch it, and stay out of the way for
    // a beat after they let go so it does not yank the row back into motion.
    const hold = () => {
      paused = true;
      window.clearTimeout(resumeTimer);
    };
    const release = () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => (paused = false), 2500);
    };

    el.addEventListener("touchstart", hold, { passive: true });
    el.addEventListener("touchend", release, { passive: true });
    el.addEventListener("touchcancel", release, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resumeTimer);
      el.removeEventListener("touchstart", hold);
      el.removeEventListener("touchend", release);
      el.removeEventListener("touchcancel", release);
    };
  }, []);

  return (
    <div
      ref={scrollerRef}
      // data-lenis-prevent so Lenis keeps its hands off this nested scroller
      // and the horizontal swipe stays native.
      data-lenis-prevent
      // pt-4 is inside the overflow box on purpose: overflow-y is hidden to
      // stop vertical drift, so a card's 6px hover lift is clipped at the top
      // without headroom here.
      className="no-scrollbar overflow-x-auto overflow-y-hidden px-edge pt-4 lg:hidden"
    >
      <div className="flex w-max gap-4">
        {[...works, ...works].map((w, i) => (
          <WorkCard key={`${w.slug}-${i}`} work={w} />
        ))}
      </div>
    </div>
  );
}

function CarouselDesktop() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(hover: none)").matches) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SPEED = 0.6; // px per frame, constant auto-scroll
    let pos = 0;
    let raf = 0;
    let paused = false;

    const step = () => {
      if (!paused) {
        pos -= SPEED;
        const halfWidth = track.scrollWidth / 2;
        // wrap when one full set has scrolled
        if (-pos >= halfWidth) pos += halfWidth;
        track.style.transform = `translate3d(${pos}px,0,0)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    // Hold still while a card is being pointed at or focused. The track drifts
    // ~38px/s, so without this a card slides out from under the cursor between
    // press and release and the link is fiddly to hit.
    const pause = () => (paused = true);
    const resume = () => (paused = false);
    track.addEventListener("pointerenter", pause);
    track.addEventListener("pointerleave", resume);
    track.addEventListener("focusin", pause);
    track.addEventListener("focusout", resume);

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("pointerenter", pause);
      track.removeEventListener("pointerleave", resume);
      track.removeEventListener("focusin", pause);
      track.removeEventListener("focusout", resume);
    };
  }, []);

  return (
    <div className="hidden overflow-hidden px-edge pt-4 lg:block">
      <div ref={trackRef} className="flex w-max gap-5 will-change-transform">
        {[...works, ...works, ...works, ...works].map((w, i) => (
          <WorkCard key={`${w.slug}-${i}`} work={w} />
        ))}
      </div>
    </div>
  );
}

// Plain <a> forced a full document reload on every card click. Link keeps it
// client-side and lets the route transition run.
const MotionLink = motion.create(Link);

function WorkCard({ work }: { work: (typeof works)[number] }) {
  const text = work.textColor || "#0a0a0a";
  return (
    <MotionLink
      href={work.href}
      transitionTypes={["nav-forward"]}
      data-cursor="view"
      data-cursor-label={work.comingSoon ? "SOON" : "VIEW"}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", damping: 22, stiffness: 240 }}
      // On a phone 68vw is a 265px-wide column at 490px tall, far narrower
      // than the reference. Widen it and let the card sit closer to square.
      className="group relative flex h-[46vh] min-h-[300px] w-[84vw] max-w-[820px] flex-col justify-between overflow-hidden rounded-[20px] p-6 sm:h-[58vh] sm:min-h-[420px] sm:w-[68vw] sm:rounded-[28px] sm:p-10 lg:w-[58vw] lg:max-w-[760px]"
      style={{ background: work.accent, color: text }}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs uppercase tracking-[0.22em] opacity-80">
          {work.client}
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-current/30 px-3 py-1 text-[10px] uppercase tracking-[0.22em]">
          {work.comingSoon ? (
            <>
              Coming soon
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
            </>
          ) : (
            <>
              {work.category}
              <Arrow className="opacity-80" />
            </>
          )}
        </span>
      </div>

      <div className="mt-auto">
        <h3 className="text-[clamp(1.875rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em]">
          {work.client}
        </h3>
      </div>

      <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] opacity-80">
        <span>{work.year}</span>
        <span>{work.tags.slice(0, 2).join(" / ")}</span>
      </div>
    </MotionLink>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      className={className}
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
