"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { showcase, works } from "@/lib/data";
import { cn } from "@/lib/cn";
import { openContact } from "@/lib/contact";
import { WordFill } from "@/components/ui/WordFill";
import { ProjectShot } from "@/components/ui/ProjectShot";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-paper">
      {/* Wordmark holds the full viewport until fonts resolve, then collapses */}
      <div className="hero-stage flex flex-col items-center justify-center gap-7 px-edge sm:gap-9">
        {/* Smaller on mobile: the fixed 1rem gutter eats proportionally
            more width there than 1vw does on desktop. */}
        <h1 className="intro-mark w-full text-center text-[24vw] leading-[0.85] tracking-[-0.04em] md:text-[26vw]">
          ezibuilds
        </h1>

        {/* CTAs live in the hero under the wordmark and arrive last in the
            intro sequence, once the mark has settled. */}
        <div className="intro intro-delay-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={openContact}
            data-cursor="hover"
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-pill bg-ink px-5 text-meta text-paper transition-colors hover:bg-ink-soft sm:min-h-0 sm:py-2.5"
          >
            Book a call
            <Arrow className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </button>

          <Link
            href="/work"
            data-cursor="hover"
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-line px-5 text-meta text-ink transition-colors hover:border-ink hover:bg-ink/5 sm:min-h-0 sm:py-2.5"
          >
            View our work
            <Arrow className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Works carousels, rise from below once the wordmark settles */}
      {/* No top padding here: it has to sit inside the overflow containers
          below, or it does nothing for the hover lift. */}
      <div className="hero-rise relative pb-10">
        <CarouselMobile items={ROW_A} />
        <CarouselDesktop items={ROW_A} />

        {/* Second row, running the other way. Two tracks of the same size
            moving in opposite directions read as one field of work rather
            than a single queue, and the counter-motion keeps the eye in the
            hero. Row B is phase-shifted half a card so the two rows never
            line up into a grid. */}
        <div className="mt-4 sm:mt-5">
          <CarouselMobile items={ROW_B} reverse />
          <CarouselDesktop items={ROW_B} reverse />
        </div>
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
          href="#build"
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
 * Row A is the showcase strip — finished screens shown full-bleed. Row B is
 * the case-study catalogue, so the two rows never carry the same card and the
 * linked work stays one row away from the eye candy.
 */
const ROW_A = showcase;
const ROW_B = works;

/**
 * Mobile carousel.
 *
 * Drives native scrollLeft rather than a transform, so the auto-advance and a
 * finger swipe act on the same property and cannot fight each other. The
 * desktop track cannot be reused here: it early-returns on (hover: none), which
 * left the row completely static on a phone.
 */
function CarouselMobile({
  items,
  reverse = false,
}: {
  items: typeof works;
  reverse?: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SPEED = 0.35; // px per frame, gentler than desktop on a small screen
    let raf = 0;
    let paused = false;
    let resumeTimer = 0;
    // A reverse row has to start at the halfway mark, not at 0: scrollLeft
    // cannot go negative, so from the left edge there is nothing to scroll
    // back into and the row would sit pinned at zero. The extra half-card
    // takes it off the other row's rhythm — every card is the same width now,
    // so without it the two rows would sit in a grid.
    let pos = reverse
      ? el.scrollWidth / 2 - el.scrollWidth / (4 * items.length)
      : el.scrollLeft;
    if (reverse) el.scrollLeft = pos;

    const step = () => {
      if (paused) {
        pos = el.scrollLeft; // resync so a swipe is not undone on resume
      } else {
        // The list is rendered twice; wrapping at the halfway mark makes the
        // loop seamless because the second copy is pixel-identical.
        const half = el.scrollWidth / 2;
        if (reverse) {
          pos -= SPEED;
          if (pos <= 0) pos += half;
        } else {
          pos += SPEED;
          if (pos >= half) pos -= half;
        }
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
  }, [reverse, items.length]);

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
        {[...items, ...items].map((w, i) => (
          <WorkCard key={`${w.slug}-${i}`} work={w} eager={i < 2} />
        ))}
      </div>
    </div>
  );
}

function CarouselDesktop({
  items,
  reverse = false,
}: {
  items: typeof works;
  reverse?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(hover: none)").matches) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SPEED = 0.6; // px per frame, constant auto-scroll
    // Reverse rows travel from -half up to 0, so there are always two full
    // sets of cards sitting off the left edge to slide back in. The extra
    // half-card phase-shifts this row off the other one's rhythm.
    let pos = reverse
      ? -track.scrollWidth / 2 + track.scrollWidth / (8 * items.length)
      : 0;
    let raf = 0;
    let paused = false;

    const step = () => {
      if (!paused) {
        const halfWidth = track.scrollWidth / 2;
        // wrap when one full set has scrolled
        if (reverse) {
          pos += SPEED;
          if (pos >= 0) pos -= halfWidth;
        } else {
          pos -= SPEED;
          if (-pos >= halfWidth) pos += halfWidth;
        }
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
  }, [reverse, items.length]);

  return (
    <div className="hidden overflow-hidden px-edge pt-4 lg:block">
      <div ref={trackRef} className="flex w-max gap-5 will-change-transform">
        {[...items, ...items, ...items, ...items].map((w, i) => (
          <WorkCard key={`${w.slug}-${i}`} work={w} eager={i < 2} />
        ))}
      </div>
    </div>
  );
}

// Plain <a> forced a full document reload on every card click. Link keeps it
// client-side and lets the route transition run.
const MotionLink = motion.create(Link);

function WorkCard({
  work,
  eager = false,
}: {
  work: (typeof works)[number];
  eager?: boolean;
}) {
  const text = work.textColor || "#0a0a0a";
  const shot = work.shot;
  // Browser captures are already landscape, so they fill the card outright.
  // Phone captures and projects with no capture at all fall back to the
  // pastel card — the same mix of screenshot and flat-colour panels the
  // reference row has.
  const fullBleed = shot?.kind === "desktop" ? shot : undefined;
  return (
    <MotionLink
      href={work.href}
      transitionTypes={["nav-forward"]}
      data-cursor="view"
      data-cursor-label={work.comingSoon ? "SOON" : "VIEW"}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", damping: 22, stiffness: 240 }}
      className={cn(
        "group relative flex h-[46vh] min-h-[300px] w-[84vw] max-w-[820px] shrink-0 flex-col overflow-hidden rounded-[20px] border border-line sm:h-[58vh] sm:min-h-[420px] sm:w-[68vw] sm:rounded-[28px] lg:w-[58vw] lg:max-w-[760px]",
        // A full-bleed card is the capture edge to edge, so the padding only
        // belongs to the cards that hold type.
        !fullBleed && "p-6 sm:p-10",
        // Screenshot cards read top-down (text, then the shot fills the
        // bottom); typographic cards keep the original spread layout with
        // the big name at the foot.
        !shot && "justify-between"
      )}
      // Full-bleed cards are the screenshot edge to edge, so the pastel only
      // dresses the cards that have no capture to show — or sits behind a
      // contained one, where it stands in for the image's own background.
      style={
        fullBleed && fullBleed.fit !== "contain"
          ? undefined
          : { background: work.accent, color: text }
      }
    >
      {fullBleed ? (
        <Image
          src={fullBleed.src}
          alt={work.client}
          fill
          sizes="(min-width: 1024px) 58vw, 84vw"
          quality={90}
          priority={eager}
          className={cn(
            "transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.03]",
            // object-top, not center: a browser capture's nav and headline
            // live at the top, so the crop has to come off the bottom.
            fullBleed.fit === "contain"
              ? "object-contain object-center"
              : "object-cover object-top"
          )}
        />
      ) : (
        <>
          <div className="relative z-10 flex flex-wrap items-start justify-between gap-2">
            <span className="text-xs uppercase tracking-[0.22em] opacity-80">
              {work.client}
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-current/30 px-3 py-1 text-[10px] uppercase tracking-[0.22em]">
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

          {shot ? (
            <>
              {/* Phone captures are far too tall to fill the card, so they
                  keep the device-panel treatment against the pastel. */}
              <div className="relative z-10 mt-4 sm:mt-6">
                <h3 className="text-[clamp(1.75rem,6vw,4rem)] leading-[0.95] tracking-[-0.02em]">
                  {work.client}
                </h3>
                <p className="mt-2.5 text-xs uppercase tracking-[0.22em] opacity-80">
                  {work.year} · {work.tags.slice(0, 2).join(" / ")}
                </p>
              </div>
              <ProjectShot
                shot={shot}
                eager={eager}
                sizes="(min-width: 1024px) 22vw, 40vw"
                className="bottom-0 right-[8%] h-[56%] sm:h-[66%]"
              />
            </>
          ) : (
            <>
              <div className="mt-auto">
                <h3 className="text-[clamp(1.875rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em]">
                  {work.client}
                </h3>
              </div>

              <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] opacity-80">
                <span>{work.year}</span>
                <span>{work.tags.slice(0, 2).join(" / ")}</span>
              </div>
            </>
          )}
        </>
      )}

      {/* The caption a full-bleed card cannot carry at rest. The custom
          cursor already says VIEW on hover; this says what you are viewing,
          and the scrim is the only thing that puts type over a capture. */}
      {fullBleed && (
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 bg-linear-to-t from-ink/75 to-transparent p-6 pt-20 text-paper opacity-0 transition-opacity duration-500 ease-(--ease-out) group-hover:opacity-100 sm:p-10 sm:pt-28">
          <span className="text-display-sm leading-none">{work.client}</span>
          <span className="text-xs uppercase tracking-[0.22em] opacity-80">
            {work.comingSoon ? "Coming soon" : work.category}
          </span>
        </div>
      )}
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
