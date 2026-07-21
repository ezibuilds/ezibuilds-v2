import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only. Next blocks cross-origin requests to /_next dev assets, so
  // opening the site from a phone on the LAN (http://10.x.x.x:3000) fails to
  // load its JS chunks: the page server-renders but never hydrates, and every
  // element Framer Motion mounts with `initial={{ opacity: 0 }}` stays
  // invisible. Matching is per dot-segment, so these cover the usual private
  // ranges without naming a DHCP address that will change.
  allowedDevOrigins: ["10.*.*.*", "192.168.*.*", "172.16.*.*"],

  // Enables React's <ViewTransition>, used for the work-card -> project-page
  // morph and the directional route slides.
  experimental: {
    viewTransition: true,
  },

  images: {
    // Next 16 requires an explicit allowlist; without 90 here the `quality`
    // prop is rejected and everything falls back to the default 75, which
    // visibly softens detailed artwork.
    qualities: [75, 90],
    // AVIF first: at matched quality it holds gradients and fine detail far
    // better than WebP, which is exactly what these renders are made of.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
    ],
  },
};

export default nextConfig;
