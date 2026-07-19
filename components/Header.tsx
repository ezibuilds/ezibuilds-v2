"use client";

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
          <a
            href="#top"
            data-cursor="hover"
            className="flex items-center gap-2 font-medium tracking-tight"
          >
            <span className="text-[15px] font-semibold">Form&amp;Fun</span>
            <span className="text-[15px] text-muted">Studio</span>
          </a>
          <nav className="flex items-center gap-2 text-[14px]">
            <a
              href="#work"
              data-cursor="hover"
              className="rounded-full px-4 py-2 transition-colors hover:bg-ink/5"
            >
              Work
            </a>
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
