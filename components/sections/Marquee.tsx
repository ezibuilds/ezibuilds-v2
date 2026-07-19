import Image from "next/image";

export function Marquee({
  speed = "normal",
}: {
  speed?: "slow" | "normal" | "fast";
}) {
  const animClass =
    speed === "slow"
      ? "animate-marquee-slow"
      : speed === "fast"
      ? "[animation-duration:22s]"
      : "animate-marquee";

  return (
    <div className="overflow-hidden bg-ink py-10 text-cream sm:py-14">
      <div className={`marquee-track ${animClass} gap-12 pr-12`}>
        {[0, 1, 2, 3].map((i) => (
          <Row key={i} />
        ))}
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      <span className="text-[clamp(4rem,11vw,9rem)] font-medium leading-none tracking-[-0.02em]">
        Creative
      </span>
      <span className="text-[clamp(4rem,11vw,9rem)] font-medium leading-none tracking-[-0.02em] text-cream/60">
        Technology
      </span>
      <span className="text-[clamp(4rem,11vw,9rem)] font-medium leading-none tracking-[-0.02em]">
        Studio
      </span>
      <span className="flex h-[clamp(3.5rem,9vw,7rem)] items-center">
        <Image
          src="/logos/formfun.svg"
          alt="Form&Fun"
          width={649}
          height={108}
          className="h-full w-auto"
        />
      </span>
    </div>
  );
}
