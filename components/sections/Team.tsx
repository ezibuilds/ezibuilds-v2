"use client";

import { motion } from "framer-motion";
import { team } from "@/lib/data";
import { DURATION, EASE, VIEWPORT, revealProps } from "@/lib/motion";

export function Team() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="px-edge">
        <motion.header {...revealProps()} className="mb-16 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">
            The studio
          </p>
          <h2 className="text-[clamp(2rem,6.5vw,6rem)] leading-[0.95] tracking-[-0.02em]">
            A small team of
            <br />
            <span className="text-muted">makers &amp; builders</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            We&apos;re designers, engineers, and strategists shipping the
            products we wish existed. Distributed, async-first, and obsessed
            with craft.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, idx) => (
            <motion.article
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: DURATION.base,
                ease: EASE,
                delay: (idx % 3) * 0.06,
              }}
              data-cursor="hover"
              className="group overflow-hidden rounded-3xl border border-line bg-white/40 transition-colors hover:border-ink"
            >
              <div
                className="relative flex aspect-[5/6] items-end overflow-hidden p-6"
                style={{ background: m.accent }}
              >
                {/* Decorative initials */}
                <span
                  className="absolute right-4 top-4 text-[10px] uppercase tracking-[0.22em] text-white/70"
                  style={{ color: m.accent === "#ffd166" ? "#0a0a0a" : "#fff" }}
                >
                  {m.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <span
                  className="absolute -bottom-12 -right-4 select-none text-[clamp(4rem,12vw,11rem)] leading-none tracking-[-0.04em]"
                  style={{
                    color: m.accent === "#ffd166" ? "rgba(10,10,10,0.18)" : "rgba(255,255,255,0.18)",
                  }}
                  aria-hidden
                >
                  {m.name.split(" ")[0]}
                </span>
                <div
                  className="relative z-10 text-xs uppercase tracking-[0.22em]"
                  style={{ color: m.accent === "#ffd166" ? "#0a0a0a" : "#fff" }}
                >
                  {m.role}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl tracking-tight">{m.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {m.bio}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
