import Image from "next/image";
import { cn } from "@/lib/cn";
import type { WorkShot } from "@/lib/data";

/**
 * A project screenshot peeking from a card edge.
 *
 * Rendered flush to the card's bottom so the window reads as continuing
 * past the edge — the card's overflow-hidden does the cropping. Desktop
 * shots get a browser-window radius, mobile shots a device radius and a
 * fixed phone aspect (the caller sets only a height and the width follows).
 *
 * Callers own the geometry (position, size) via className; this component
 * owns the framing: hairline ring, drop shadow, and the object-top crop
 * that keeps oversized captures anchored to the top of the product.
 */
export function ProjectShot({
  shot,
  sizes,
  className,
  eager = false,
}: {
  shot: WorkShot;
  sizes: string;
  className?: string;
  /**
   * Preload instead of lazy-load. Set on shots that sit above the fold
   * (the hero carousel's first copy, the top row of the work grid) —
   * lazy-loading those made cards render as bare pastel for a beat until
   * the image arrived.
   */
  eager?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.25)] ring-1 ring-black/10 transition-transform duration-500 ease-(--ease-out) group-hover:-translate-y-1.5",
        shot.kind === "mobile" ? "rounded-t-[1.5rem]" : "rounded-t-[0.625rem]",
        className
      )}
      // Phone captures are 800x1733; pinning the ratio here lets callers
      // size the panel by height alone.
      style={shot.kind === "mobile" ? { aspectRatio: "800 / 1733" } : undefined}
    >
      <Image
        src={shot.src}
        alt=""
        fill
        sizes={sizes}
        quality={90}
        priority={eager}
        className="object-cover object-top"
      />
    </div>
  );
}
