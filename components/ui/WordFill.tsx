"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  text: string;
  className?: string;
  /** Rendered inline after the last word, e.g. a "Learn more" pill. */
  children?: React.ReactNode;
};

/**
 * Scroll-linked word-by-word colour fill: words sit in --color-gray and
 * resolve to --color-ink as the block moves through the viewport.
 *
 * Words render at their final colour so the copy stays readable if JS
 * never runs; GSAP applies the greyed start state on mount.
 */
export function WordFill({ text, className = "", children }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { color: "#e5e5e5" },
        {
          color: "#1d1d1d",
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            // Fixed range rather than the block's own height, so a short
            // paragraph doesn't finish filling within a flick of the wheel.
            end: "+=80%",
            scrub: 0.6,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text]);

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} data-word>
          {word}{" "}
        </span>
      ))}
      {children}
    </p>
  );
}
