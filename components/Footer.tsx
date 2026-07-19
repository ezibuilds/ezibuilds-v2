import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-cream px-6 py-12 sm:px-10">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-6 border-t border-line pt-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="font-medium text-ink">ezibuilds studio</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/" data-cursor="hover" className="hover:text-ink">
            Home
          </Link>
          <Link href="/team" data-cursor="hover" className="hover:text-ink">
            Team
          </Link>
          <a
            href="mailto:hello@ezibuilds.studio"
            data-cursor="hover"
            className="hover:text-ink"
          >
            hello@ezibuilds.studio
          </a>
          <span>Made with care</span>
        </div>
      </div>
    </footer>
  );
}
