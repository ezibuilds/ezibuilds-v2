import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

// Root-relative, not bare hashes: the footer renders on /team and
// /work/[slug] too, where "#work" would resolve to "/team#work".
const MENU = [
  { label: "Studio", href: "/#capabilities" },
  { label: "Work", href: "/#work" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Team", href: "/team" },
];

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Behance", href: "https://behance.net" },
];

export function Footer() {
  return (
    <footer className="bg-paper px-edge pt-24">
      {/* Mark far left, link columns clustered in the right half */}
      {/* Split to two halves only at lg. At md the right half is too narrow
          for an unbreakable email address and forces horizontal scroll. */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Mark />

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <Column title="Menu">
            {MENU.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  data-cursor="hover"
                  className="link-sweep inline-flex min-h-[44px] items-center text-meta text-ink transition-colors break-words hover:text-muted sm:min-h-0"
                >
                  {label}
                </Link>
              </li>
            ))}
          </Column>

          <Column title="Social">
            {SOCIAL.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="link-sweep inline-flex min-h-[44px] items-center text-meta text-ink transition-colors break-words hover:text-muted sm:min-h-0"
                >
                  {label}
                </a>
              </li>
            ))}
          </Column>

          <Column title="Business enquiries">
            <li>
              <a
                href="mailto:hello@ezibuilds.studio"
                data-cursor="hover"
                className="link-sweep inline-flex min-h-[44px] items-center text-meta text-ink transition-colors break-words hover:text-muted sm:min-h-0"
              >
                hello@ezibuilds.studio
              </a>
            </li>
          </Column>
        </div>
      </div>

      {/* Full-bleed wordmark, cropped at the page edge */}
      <div className="mt-24 overflow-hidden" aria-hidden>
        {/* Smaller on mobile, where the fixed gutter costs more width. */}
        <span className="block whitespace-nowrap text-[24.5vw] leading-[0.78] tracking-[-0.04em] text-ink md:text-[26.5vw]">
          ezibuilds
        </span>
      </div>
    </footer>
  );
}

function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 text-meta text-muted">{title}</p>
      <ul className="space-y-0 sm:space-y-2">{children}</ul>
    </div>
  );
}

function Mark() {
  return (
    <Link href="/" data-cursor="hover" className="inline-block">
      <span className="sr-only">ezibuilds home</span>
      <Logo size={44} />
    </Link>
  );
}
