"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorVariant = "default" | "hover" | "drag" | "view";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.4 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  const [variant, setVariant] = useState<CursorVariant>("default");
  const [label, setLabel] = useState<string>("");
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setHidden(false);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>("[data-cursor]");
      if (!el) {
        setVariant("default");
        setLabel("");
        return;
      }
      const v = el.dataset.cursor as CursorVariant;
      const lbl = el.dataset.cursorLabel || "";
      setVariant(v || "hover");
      setLabel(lbl);
    };

    const onDown = () => setVariant((v) => (v === "drag" ? "drag" : "default"));
    const onUp = () => setVariant((v) => v);

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [x, y]);

  if (hidden) return null;

  const size = variant === "drag" ? 72 : variant === "hover" ? 56 : 14;
  const isTextLabel = variant === "drag" || variant === "view";

  return (
    <>
      <motion.div
        ref={cursorRef}
        aria-hidden
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{
            width: size,
            height: size,
          }}
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
        >
          {isTextLabel && label && (
            <div
              ref={labelRef}
              className="absolute inset-0 flex items-center justify-center text-[10px] font-medium tracking-[0.18em] text-ink"
            >
              {label}
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
