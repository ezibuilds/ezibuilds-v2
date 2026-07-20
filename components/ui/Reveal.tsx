"use client";

import { motion } from "framer-motion";
import { revealProps } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  /** Seconds to hold before revealing, for sequencing sibling blocks. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
};

/**
 * Scroll reveal usable from server components, which cannot pass motion
 * props themselves. Uses the shared tokens in lib/motion so a reveal here
 * matches one in a client section.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const Tag = motion[as];
  return (
    <Tag {...revealProps(delay)} className={className}>
      {children}
    </Tag>
  );
}
