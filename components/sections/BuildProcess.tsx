"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/data";
import { revealProps } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sticky-scroll process timeline.
 *
 * Layout: a two-column row on lg. The left column stays pinned in view while
 * the right column scrolls past, and each step is driven by ScrollTrigger so
 * the active step is whichever one currently sits at the trigger line.
 *
 * Why GSAP instead of Framer Motion's useScroll: we already drive Lenis from
 * the GSAP ticker and ScrollTrigger is wired into that same loop, so scrub
 * motion is automatically synced to the smooth scroll. Using framer-motion's
 * scroll progress here would race with Lenis and produce visible stutter.
 *
 * The mobile fallback drops the pinning entirely and just renders a vertical
 * timeline, because sticky pinning on a phone tends to feel stuck rather
 * than guided.
 */
export function BuildProcess() {
  return (
    <section id="process" className="bg-paper py-24 sm:py-32">
      <div className="px-edge">
        <motion.header {...revealProps()} className="mb-12 max-w-3xl sm:mb-16">
          <p className="mb-3 text-meta text-muted">Build process</p>
          <h2 className="text-[clamp(2rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
            Six steps from
            <br />
            <span className="text-muted">idea to launched product.</span>
          </h2>
        </motion.header>

        <DesktopTimeline />
        <MobileTimeline />
      </div>
    </section>
  );
}

function DesktopTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Skip on phones; sticky pinning on a touch viewport tends to feel broken.
    const mq = window.matchMedia("(hover: none)");
    if (mq.matches) return;

    const ctx = gsap.context(() => {
      // One ScrollTrigger per step. The step is "active" while its centre sits
      // between 35% and 65% of the viewport, so the user feels each step hold
      // for a beat before the next one arrives.
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="hidden lg:block">
      <div className="grid grid-cols-[minmax(220px,28%)_1fr] gap-12">
        <div className="sticky top-32 self-start">
          <StepRail active={active} />
        </div>

        <ol className="flex flex-col gap-32 pb-12">
          {processSteps.map((s, i) => (
            <li
              key={s.number}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="min-h-[60vh]"
            >
              <StepBlock step={s} active={i === active} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/**
 * The pinned rail. Renders the index on top, the active title in big type, and
 * a hairline list of all six steps with the current one filled in. Updates
 * instantly on `active` rather than tweening between indices, because the
 * pinned block is already scrubbing with the scroll and tweening the title
 * would lag behind the row you're reading.
 */
function StepRail({ active }: { active: number }) {
  return (
    <div>
      <p className="mb-3 text-meta text-muted">
        Step {processSteps[active].number} of {String(processSteps.length).padStart(2, "0")}
      </p>
      <h3 className="text-[clamp(1.75rem,4.4vw,4.5rem)] leading-[0.95] tracking-[-0.02em]">
        {processSteps[active].title}
      </h3>

      <ul className="mt-10 space-y-3 border-l border-line pl-5">
        {processSteps.map((s, i) => (
          <li
            key={s.number}
            className={
              i === active
                ? "text-meta text-ink"
                : "text-meta text-muted transition-colors"
            }
          >
            <span className="mr-2 font-mono text-[11px]">{s.number}</span>
            {s.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepBlock({
  step,
  active,
}: {
  step: (typeof processSteps)[number];
  active: boolean;
}) {
  return (
    <article
      data-cursor="hover"
      className="flex flex-col justify-center rounded-[28px] border border-line bg-white/40 p-10 transition-colors duration-500 sm:p-14"
      style={{
        // The active card is the only one in the rail; tinting it gently
        // gives the eye a target without animating anything heavy.
        borderColor: active ? "var(--color-ink)" : undefined,
      }}
    >
      <span className="mb-6 font-mono text-meta text-muted">{step.number}</span>
      <h4 className="text-[clamp(1.5rem,3vw,2.75rem)] leading-[1.05] tracking-[-0.02em]">
        {step.title}
      </h4>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
        {step.description}
      </p>
      <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-ink">
        <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-ink" />
        Output · {step.output}
      </p>
    </article>
  );
}

function MobileTimeline() {
  return (
    <ol className="flex flex-col gap-10 lg:hidden">
      {processSteps.map((s) => (
        <motion.li
          key={s.number}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[28px] border border-line bg-white/40 p-8"
        >
          <span className="mb-4 block font-mono text-meta text-muted">
            {s.number}
          </span>
          <h4 className="text-2xl tracking-tight">{s.title}</h4>
          <p className="mt-3 text-sm leading-relaxed text-muted">{s.description}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-ink">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-ink" />
            {s.output}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}
