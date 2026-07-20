import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { BackLink } from "@/components/ui/BackLink";
import { RouteTransition } from "@/components/ui/RouteTransition";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { works, workDetails } from "@/lib/data";

type Params = { slug: string };

// Prerender all six project pages at build time.
export function generateStaticParams(): Params[] {
  return works.map((w) => ({ slug: w.slug }));
}

// params is a Promise in Next 16 and must be awaited.
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) return {};

  const detail = workDetails[slug];
  return {
    title: `${work.client} | ezibuilds`,
    description: detail?.summary ?? `${work.client}, ${work.category}.`,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const index = works.findIndex((w) => w.slug === slug);
  if (index === -1) notFound();

  const work = works[index];
  const detail = workDetails[slug];
  const next = works[(index + 1) % works.length];

  return (
    <>
      <Header />
      <RouteTransition>
        <main>
          {/* Accent panel, carrying the colour from the card you clicked. Shares
            a ViewTransition name with that card so the two are treated as one
            object moving, rather than one element replacing another. */}
          <ViewTransition name={`work-${work.slug}`} share="morph">
            <section
              className="px-edge pt-28 sm:pt-32"
              style={{
                background: work.accent,
                color: work.textColor ?? "#1d1d1d",
              }}
            >
              <div className="flex flex-col justify-between gap-10 pb-14 pt-16 sm:pb-20 sm:pt-24">
                <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.22em]">
                  <BackLink />
                  <span aria-hidden className="opacity-40">
                    |
                  </span>
                  <span className="opacity-85">{work.category}</span>
                  <span aria-hidden className="opacity-85">
                    /
                  </span>
                  <span className="opacity-85">{work.year}</span>
                </div>
                <h1 className="text-[clamp(3rem,12vw,11rem)] leading-[0.85] tracking-[-0.04em]">
                  {work.client}
                </h1>
              </div>
            </section>
          </ViewTransition>

          {/* Summary */}
          <Reveal as="section" className="px-edge py-20 sm:py-28">
            <p className="mb-6 text-meta text-muted">Overview</p>
            <p className="max-w-5xl text-display-lg">{detail.summary}</p>
          </Reveal>

          {/* Facts, in the hairline-row language used across the site */}
          <Reveal as="section" className="px-edge pb-20">
            <dl className="divide-y divide-line border-t border-line">
              <Row label="Client" value={work.client} />
              <Row label="Year" value={work.year} />
              <Row label="Category" value={work.category} />
              <Row label="Services" value={detail.services.join(", ")} />
            </dl>
          </Reveal>

          {/* Narrative */}
          <section className="px-edge pb-24 sm:pb-32">
            <ul className="divide-y divide-line border-t border-line">
              {detail.sections.map((s, i) => (
                <Reveal
                  key={s.title}
                  as="li"
                  delay={i * 0.06}
                  className="grid grid-cols-[3rem_1fr] gap-6 py-10 sm:grid-cols-[4rem_1.2fr_2fr] sm:gap-10 sm:py-14"
                >
                  <span className="font-mono text-sm text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-display-sm">{s.title}</h2>
                  <p className="col-span-2 max-w-2xl text-base leading-relaxed text-muted sm:col-span-1">
                    {s.body}
                  </p>
                </Reveal>
              ))}
            </ul>
          </section>

          {/* Next project */}
          <Reveal as="section" className="px-edge pb-24">
            <Link
              href={next.href}
              transitionTypes={["nav-forward"]}
              data-cursor="view"
              data-cursor-label="VIEW"
              className="group block rounded-[28px] p-8 transition-transform duration-300 ease-out hover:scale-[0.995] sm:p-12"
              style={{
                background: next.accent,
                color: next.textColor ?? "#1d1d1d",
              }}
            >
              <span className="text-[11px] uppercase tracking-[0.22em] opacity-85">
                Next project
              </span>
              <span className="mt-6 flex items-center gap-4 text-[clamp(2rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em]">
                {next.client}
                <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-2">
                  &rarr;
                </span>
              </span>
            </Link>

            <Link
              href="/#work"
              transitionTypes={["nav-back"]}
              data-cursor="hover"
              className="group mt-10 inline-flex min-h-[44px] items-center gap-2 text-meta text-muted transition-colors hover:text-ink sm:min-h-0"
            >
              <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-x-1">
                &larr;
              </span>
              Back to all work
            </Link>
          </Reveal>
        </main>
      </RouteTransition>
      <Footer />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:gap-10">
      <dt className="text-meta text-muted">{label}</dt>
      <dd className="text-meta text-ink">{value}</dd>
    </div>
  );
}
