"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ContactForm } from "@/components/sections/ContactForm";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 px-edge transition-all duration-300",
          scrolled ? "pt-3" : "pt-5"
        )}
      >
        <div
          className={cn(
            // The border is always present and always has an explicit colour.
            // Dropping `border-line` instead would fall back to Tailwind v4's
            // `currentColor` default (opaque ink), and transition-all would
            // animate the hairline to black on the way out.
            "flex w-full items-center justify-between border transition-all",
            scrolled
              ? "rounded-full border-line bg-paper/70 px-5 py-2 backdrop-blur-xl"
              : "border-transparent"
          )}
        >
          <Link
            href="/"
            data-cursor="hover"
            className="flex items-center gap-2.5 tracking-tight"
          >
            <Logo size={26} />
            <span className="flex items-baseline gap-1.5">
              <span className="text-[15px]">ezibuilds</span>
              <span className="text-[15px] text-muted">studio</span>
            </span>
          </Link>
          <nav className="flex items-center gap-1 text-[14px] sm:gap-2">
            <a
              href="#capabilities"
              data-cursor="hover"
              className="hidden rounded-full px-4 py-2 transition-colors hover:bg-ink/5 sm:inline-block"
            >
              Capabilities
            </a>
            <a
              href="#work"
              data-cursor="hover"
              className="rounded-full px-4 py-2 transition-colors hover:bg-ink/5"
            >
              Work
            </a>
            <Link
              href="/team"
              data-cursor="hover"
              className="hidden rounded-full px-4 py-2 transition-colors hover:bg-ink/5 sm:inline-block"
            >
              Team
            </Link>
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              data-cursor="hover"
              className="rounded-full bg-ink px-4 py-2 text-paper transition-colors hover:bg-ink-soft"
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      <ContactForm open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
