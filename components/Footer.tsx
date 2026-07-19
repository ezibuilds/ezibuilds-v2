import Link from "next/link";

const navCols = [
  {
    title: "Studio",
    links: [
      { label: "About", href: "/" },
      { label: "Team", href: "/team" },
      { label: "Capabilities", href: "/#capabilities" },
      { label: "Selected Work", href: "/#work" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "hello@ezibuilds.studio", href: "mailto:hello@ezibuilds.studio" },
      { label: "Instagram", href: "https://instagram.com/ezibuilds" },
      { label: "LinkedIn", href: "https://linkedin.com/company/ezibuilds" },
      { label: "X / Twitter", href: "https://x.com/ezibuilds" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-paper text-ink">
      {/* Top: giant wordmark + CTA */}
      <div className="mx-auto max-w-[88rem] px-6 pt-20 sm:px-10 sm:pt-28">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted">
              Let&apos;s build something
            </p>
            <a
              href="mailto:hello@ezibuilds.studio"
              data-cursor="hover"
              className="block text-[clamp(2.5rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em] text-ink transition-opacity hover:opacity-80"
            >
              hello@ezibuilds<span className="font-serif italic text-muted">.studio</span>
            </a>
          </div>
          <a
            href="mailto:hello@ezibuilds.studio"
            data-cursor="hover"
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Start a project
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
            >
              <path
                d="M1 6h10m0 0L7 2m4 4L7 10"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Mid: nav columns + brand */}
      <div className="mx-auto mt-20 max-w-[88rem] border-t border-line px-6 py-14 sm:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              data-cursor="hover"
              className="inline-flex items-baseline gap-2 text-2xl font-medium tracking-tight text-ink"
            >
              ezibuilds
              <span className="text-muted">studio</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              A global creative tech studio forging delightful products by
              blending design, technology, and storytelling.
            </p>
          </div>

          {navCols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-5 text-[11px] uppercase tracking-[0.22em] text-muted">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      data-cursor="hover"
                      className="text-[15px] text-ink/85 transition-colors hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: legal row */}
      <div className="mx-auto max-w-[88rem] border-t border-line px-6 py-6 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-3 text-xs text-muted sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} ezibuilds studio. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <a
              href="/privacy"
              data-cursor="hover"
              className="transition-colors hover:text-ink"
            >
              Privacy
            </a>
            <a
              href="/terms"
              data-cursor="hover"
              className="transition-colors hover:text-ink"
            >
              Terms
            </a>
            <span>Made with care</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
