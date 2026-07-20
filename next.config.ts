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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
    ],
  },
};

export default nextConfig;
