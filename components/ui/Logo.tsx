import Image from "next/image";

/**
 * The ezibuilds mark. Served straight from /public rather than through the
 * image optimizer. SVG is lossless vector, so there's nothing to optimize,
 * and routing it through /_next/image would require `dangerouslyAllowSVG`.
 */
export function Logo({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/logos/logo-black.svg"
      alt="ezibuilds"
      width={size}
      height={size}
      priority
      unoptimized
      className={className}
    />
  );
}
