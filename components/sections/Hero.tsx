"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { works } from "@/lib/data";
import { WordFill } from "@/components/ui/WordFill";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-paper">
      {/* Wordmark holds the full viewport until fonts resolve, then collapses */}
      <div className="hero-stage flex items-center justify-center px-edge">
        {/* Smaller on mobile: the fixed 1.25rem gutter eats proportionally
            more width there than 1vw does on desktop. */}
        <h1 className="w-full text-center text-[22.5vw] leading-[0.85] tracking-[-0.04em] md:text-[25vw]">
          ezibuilds
          <sup className="align-super text-[0.14em] tracking-normal">™</sup>
        </h1>
      </div>

      {/* Works carousel, rises from below once the wordmark settles */}
      <div
        data-cursor="drag"
        data-cursor-label="DRAG"
        className="hero-rise relative overflow-x-auto overflow-y-hidden px-edge pt-4 pb-10 lg:overflow-hidden"
      >
        <div className="flex min-w-max gap-4 lg:hidden">
          {works.map((w) => (
            <WorkCard key={w.slug} work={w} />
          ))}
        </div>

        <CarouselDesktop />
      </div>

      {/* Studio intro: words fill from grey to ink on scroll */}
      <div className="px-edge pb-20 pt-16">
        <p className="mb-6 text-meta text-ink">The studio</p>
        <WordFill
          className="text-display-lg"
          text="We are a global product studio designing, building, and launching digital products that drive real business outcomes, from first wireframe to scale."
        >
          <a
            href="#capabilities"
            data-cursor="hover"
            className="ml-4 inline-flex translate-y-[-0.15em] items-center gap-2 rounded-pill bg-ink px-5 py-2.5 text-meta text-paper transition-colors hover:bg-ink-soft"
          >
            Learn more
            <Arrow />
          </a>
        </WordFill>
      </div>
    </section>
  );
}

function CarouselDesktop() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const SPEED = 0.6; // px per frame, constant auto-scroll
    let pos = 0;
    let offset = 0; // additional offset from drag
    let dragging = false;
    let startX = 0;
    let startOffset = 0;
    let raf = 0;

    const step = () => {
      if (!dragging) {
        pos -= SPEED;
      }
      const halfWidth = track.scrollWidth / 2;
      // wrap when one full set has scrolled
      if (-pos >= halfWidth) pos += halfWidth;
      track.style.transform = `translate3d(${pos + offset}px,0,0)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onDown = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      startOffset = offset;
      track.setPointerCapture(e.pointerId);
      document.body.style.userSelect = "none";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      offset = startOffset + (e.clientX - startX);
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      // bake the drag offset into the base pos so the loop continues smoothly
      pos += offset;
      offset = 0;
      document.body.style.userSelect = "";
    };

    track.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div className="hidden lg:block">
      <div
        ref={trackRef}
        className="flex w-max gap-5 will-change-transform select-none"
      >
        {[...works, ...works, ...works, ...works].map((w, i) => (
          <WorkCard key={`${w.slug}-${i}`} work={w} />
        ))}
      </div>
    </div>
  );
}

function WorkCard({ work }: { work: (typeof works)[number] }) {
  const text = work.textColor || "#0a0a0a";
  return (
    <motion.a
      href={work.href}
      data-cursor={work.comingSoon ? "view" : "drag"}
      data-cursor-label={work.comingSoon ? "SOON" : ""}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", damping: 22, stiffness: 240 }}
      className="group relative flex h-[58vh] min-h-[420px] w-[68vw] max-w-[820px] flex-col justify-between overflow-hidden rounded-[28px] p-8 sm:p-10 lg:w-[58vw] lg:max-w-[760px]"
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
        <h3 className="text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em]">
          {work.client}
        </h3>
      </div>

      <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] opacity-80">
        <span>{work.year}</span>
        <span>{work.tags.slice(0, 2).join(" / ")}</span>
      </div>
    </motion.a>
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
