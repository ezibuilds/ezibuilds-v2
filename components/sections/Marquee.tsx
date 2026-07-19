export function Marquee({
  speed = "normal",
  text = ["ezibuild", "design", "technology", "studio"],
  logo,
}: {
  speed?: "slow" | "normal" | "fast";
  text?: string[];
  logo?: string;
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
          <Row key={i} text={text} logo={logo} />
        ))}
      </div>
    </div>
  );
}

function Row({ text, logo }: { text: string[]; logo?: string }) {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {text.map((word, i) => (
        <span
          key={word + i}
          className={`text-[clamp(4rem,11vw,9rem)] font-medium leading-none tracking-[-0.02em] ${
            i % 2 === 1 ? "text-cream/60" : ""
          }`}
        >
          {word}
        </span>
      ))}
      {logo && (
        <span className="flex h-[clamp(3.5rem,9vw,7rem)] items-center text-[clamp(4rem,11vw,9rem)] font-medium leading-none tracking-[-0.02em]">
          {logo}
        </span>
      )}
    </div>
  );
}
