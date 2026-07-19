import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const MENU = [
  { label: "Studio", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
  { label: "Work", href: "#work" },
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
                  className="text-meta text-ink transition-colors break-words hover:text-muted"
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
                  className="text-meta text-ink transition-colors break-words hover:text-muted"
                >
                  {label}
                </a>
              </li>
            ))}
          </Column>

          <div className="space-y-6">
            <Column title="Business enquiries">
              <li>
                <a
                  href="mailto:hello@ezibuilds.studio"
                  data-cursor="hover"
                  className="text-meta text-ink transition-colors break-words hover:text-muted"
                >
                  hello@ezibuilds.studio
                </a>
              </li>
            </Column>
            <Column title="Join our team">
              <li>
                <a
                  href="mailto:apply@ezibuilds.studio"
                  data-cursor="hover"
                  className="text-meta text-ink transition-colors break-words hover:text-muted"
                >
                  apply@ezibuilds.studio
                </a>
              </li>
            </Column>
          </div>
        </div>
      </div>

      {/* Full-bleed wordmark, cropped at the page edge */}
      <div className="mt-24 overflow-hidden" aria-hidden>
        {/* Sized so the word *and* its trailing ™ clear the container. At
            26vw the ™ pushed past the right edge and overflow-hidden cropped
            it. Smaller on mobile, where the fixed gutter costs more width. */}
        <span className="block whitespace-nowrap text-[23vw] leading-[0.78] tracking-[-0.04em] text-ink md:text-[25.5vw]">
          ezibuilds
          <sup className="align-super text-[0.18em] tracking-normal">™</sup>
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
      <ul className="space-y-2">{children}</ul>
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
