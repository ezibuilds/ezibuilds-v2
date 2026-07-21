"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { DURATION, EASE, fadeUp, stagger } from "@/lib/motion";
import { CONTACT_EVENT } from "@/lib/contact";
import { ContactForm } from "@/components/sections/ContactForm";
import { Logo } from "@/components/ui/Logo";

const NAV = [
  { label: "Build", href: "/#build" },
  { label: "Offers", href: "/#offers" },
  { label: "Team", href: "/team" },
];

export function Header() {
  const [contactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lets "Book a call" buttons elsewhere on the page open this drawer.
  useEffect(() => {
    const open = () => setContactOpen(true);
    window.addEventListener(CONTACT_EVENT, open);
    return () => window.removeEventListener(CONTACT_EVENT, open);
  }, []);

  // The menu covers the page, so the body behind it must not scroll.
  useEffect(() => {
    if (!menuOpen) return;
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        // viewTransitionName keeps the header out of the directional route
        // slide: it stays put as the fixed reference while content moves.
        style={{ viewTransitionName: "site-header" }}
        className={cn(
          "intro intro-delay-1 fixed inset-x-0 top-0 z-40 px-edge transition-all duration-300",
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
            className="flex min-h-[44px] items-center gap-2.5 tracking-tight sm:min-h-0"
          >
            <Logo size={26} />
            <span className="flex items-baseline gap-1.5">
              <span className="text-[15px]">ezibuilds</span>
              <span className="text-[15px] text-muted">studio</span>
            </span>
          </Link>
          <nav className="flex items-center gap-1 text-[14px] sm:gap-2">
            {NAV.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                data-cursor="hover"
                className="link-sweep hidden rounded-full px-4 py-2 transition-colors hover:bg-ink/5 sm:inline-block"
              >
                {label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              data-cursor="hover"
              className="flex min-h-[44px] items-center rounded-full bg-ink px-4 text-paper transition-colors hover:bg-ink-soft sm:min-h-0 sm:py-2"
            >
              Contact
            </button>
            {/* Below sm the links above are hidden; without this the Team and
                Capabilities pages have no reachable entry point on a phone. */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full transition-colors hover:bg-ink/5 sm:hidden"
            >
              <span className="flex w-5 flex-col gap-[5px]">
                <span className="h-px w-full bg-ink" />
                <span className="h-px w-full bg-ink" />
              </span>
            </button>
          </nav>
        </div>
      </header>

      {/* AnimatePresence so the panel animates out as well. Without it the
          close is an instant unmount, which reads as a glitch after a
          deliberate opening slide. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: DURATION.base, ease: EASE }}
            className="fixed inset-0 z-50 flex flex-col bg-paper px-edge pt-5 sm:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo size={26} />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-[15px]"
              >
                Close
              </button>
            </div>

            {/* Links follow the panel in rather than arriving with it, so the
                slide resolves before the eye has to read anything. */}
            <motion.nav
              variants={stagger(0.06, 0.18)}
              initial="hidden"
              animate="visible"
              className="mt-12 flex flex-col"
            >
              {NAV.map(({ label, href }) => (
                <motion.div key={label} variants={fadeUp}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="link-sweep block border-b border-line py-5 text-display-md"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={fadeUp}>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setContactOpen(true);
                  }}
                  className="w-full border-b border-line py-5 text-left text-display-md"
                >
                  Contact
                </button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactForm open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
