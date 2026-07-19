"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { works } from "@/lib/data";

export function Hero() {
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = introRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) el.classList.add("in-view");
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-cream pt-28 sm:pt-32"
    >
      {/* Works carousel band — horizontal scroll on touch, drag on desktop */}
      <div
        data-cursor="drag"
        data-cursor-label="DRAG"
        className="relative -mx-6 overflow-x-auto overflow-y-hidden px-6 pb-8 sm:-mx-10 sm:px-10 lg:overflow-hidden"
      >
        <div className="flex min-w-max gap-4 lg:hidden">
          {works.map((w) => (
            <WorkCard key={w.slug} work={w} />
          ))}
        </div>

        {/* Desktop auto-scrolling carousel */}
        <CarouselDesktop />
      </div>

      {/* Studio intro */}
      <div className="mx-auto max-w-[88rem] px-6 pb-16 sm:px-10">
        <div ref={introRef} className="reveal-mask">
          <p className="text-[clamp(1.5rem,3.4vw,3.25rem)] font-medium leading-[1.1] tracking-tight">
            The studio — we are a global creative tech studio forging delightful
            experiences by blending design, technology, and storytelling. Driven to
            create value for people and brands through interaction.
          </p>
          <a
            href="#about"
            data-cursor="hover"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:bg-ink hover:text-cream"
          >
            Learn more
            <Arrow />
          </a>
        </div>
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

    let pos = 0;
    let velocity = 0.6;
    let dragging = false;
    let startX = 0;
    let startPos = 0;
    let lastX = 0;
    let lastT = 0;
    let raf = 0;

    const animate = () => {
      if (!dragging) pos -= velocity;
      const halfWidth = track.scrollWidth / 2;
      if (-pos >= halfWidth) pos += halfWidth;
      track.style.transform = `translate3d(${pos}px,0,0)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onDown = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      startPos = pos;
      lastX = e.clientX;
      lastT = performance.now();
      velocity = 0.6;
      track.setPointerCapture(e.pointerId);
      document.body.style.userSelect = "none";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      pos = startPos + dx;
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      velocity = ((e.clientX - lastX) / dt) * 14;
      lastX = e.clientX;
      lastT = now;
    };
    const onUp = () => {
      dragging = false;
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
      {/* project client label */}
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

      {/* big project name */}
      <div className="mt-auto">
        <h3 className="text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em]">
          {work.client}
        </h3>
      </div>

      {/* footer meta */}
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
