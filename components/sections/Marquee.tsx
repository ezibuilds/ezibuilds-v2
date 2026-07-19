export function Marquee({
  speed = "normal",
  text = ["design", "build", "launch", "scale"],
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
    <div className="overflow-hidden bg-paper py-6" aria-hidden>
      {/* No gap on the track: the keyframe translates -50%, so the four rows
          must tile at exactly 4x row width or the loop shows a seam. Spacing
          lives on each row's trailing padding instead. */}
      <div className={`marquee-track ${animClass}`}>
        {[0, 1, 2, 3].map((i) => (
          <Row key={i} text={text} logo={logo} />
        ))}
      </div>
    </div>
  );
}

function Row({ text, logo }: { text: string[]; logo?: string }) {
  // vw, not em: the gap sits on the flex row, whose own font-size is the
  // inherited 16px, so an em value here would ignore the 7vw word size.
  return (
    <div className="flex shrink-0 items-center gap-[2.5vw] pr-[2.5vw]">
      {text.map((word, i) => (
        <span
          key={word + i}
          className="text-display-xl uppercase text-gray"
        >
          {word}
        </span>
      ))}
      {logo && (
        <span className="text-display-xl uppercase text-gray">{logo}</span>
      )}
    </div>
  );
}
