"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ContactForm } from "@/components/sections/ContactForm";

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
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          scrolled ? "px-4 pt-3" : "px-6 pt-5"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[88rem] items-center justify-between transition-all",
            scrolled &&
              "rounded-full border border-line bg-cream/70 px-5 py-2 backdrop-blur-xl"
          )}
        >
          <Link
            href="/"
            data-cursor="hover"
            className="flex items-baseline gap-1.5 font-medium tracking-tight"
          >
            <span className="text-[15px] font-semibold">ezibuilds</span>
            <span className="text-[15px] text-muted">studio</span>
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
              className="rounded-full bg-ink px-4 py-2 font-medium text-cream transition-colors hover:bg-ink-2"
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
