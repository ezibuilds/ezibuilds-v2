"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories, works, type Work } from "@/lib/data";
import { cn } from "@/lib/cn";

export function SelectedWork() {
  const [active, setActive] = useState<string | null>(null);
  const filtered = active
    ? works.filter((w) => w.tags.includes(active))
    : works;

  return (
    <section id="work" className="relative bg-paper py-24 sm:py-32">
      <div className="px-edge">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">
              work
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
              Selected Work
              <span className="ml-3 align-top text-[0.4em] text-muted">
                (22-25)
              </span>
            </h2>
          </div>

          <div className="no-scrollbar -mx-2 flex max-w-full overflow-x-auto px-2">
            <div className="flex gap-2 pb-1">
              <Chip active={active === null} onClick={() => setActive(null)}>
                All
              </Chip>
              {categories.map((c) => (
                <Chip
                  key={c}
                  active={active === c}
                  onClick={() => setActive(active === c ? null : c)}
                >
                  {c}
                </Chip>
              ))}
            </div>
          </div>
        </header>

        {/* 3-up on large screens: keeps 8 cards to 3 rows rather than 4, so
            the full catalogue costs about the same scroll as 4 cards did. */}
        <motion.ul
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((w) => (
              <WorkCard key={w.slug} work={w} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="hover"
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition-all",
        active
          ? "border-ink bg-ink text-paper"
          : "border-line text-ink hover:border-ink"
      )}
    >
      {children}
    </button>
  );
}

function WorkCard({ work }: { work: Work }) {
  const text = work.textColor || "#0a0a0a";

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", damping: 24, stiffness: 220 }}
      className="group"
    >
      <a
        href={work.href}
        data-cursor="drag"
        data-cursor-label={work.comingSoon ? "SOON" : "VIEW"}
        className="block rounded-[28px] focus:outline-none"
      >
        <motion.div
          whileHover={{ scale: 0.99 }}
          transition={{ type: "spring", damping: 22, stiffness: 240 }}
          // The radius has to live on the element that scales. Rounding only
          // the parent means shrinking this child pulls its square corners
          // inside the parent's mask, and the corners go hard on hover.
          className="relative flex aspect-[5/6] flex-col justify-between overflow-hidden rounded-[28px] p-7 sm:p-9 lg:aspect-[4/5]"
          style={{ background: work.accent, color: text }}
        >
          <div className="flex items-start justify-between text-[11px] uppercase tracking-[0.22em] opacity-85">
            <span>{work.client}</span>
            <span className="rounded-full border border-current/30 px-3 py-1">
              {work.comingSoon ? "Coming soon" : work.category}
            </span>
          </div>
          <div>
            <h3 className="text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[0.95] tracking-[-0.02em]">
              {work.client}
            </h3>
            <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] opacity-80">
              <span>{work.year}</span>
              <span>{work.tags.slice(0, 3).join(" / ")}</span>
            </div>
          </div>
        </motion.div>
      </a>
    </motion.li>
  );
}
