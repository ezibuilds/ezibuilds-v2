import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { FontsReady } from "@/components/ui/FontsReady";
import { NavHistory } from "@/components/ui/NavHistory";

const switzer = localFont({
  src: "./fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ezibuilds | Creative Technology Studio",
  description:
    "ezibuilds is a creative technology studio designing, building, and launching digital products that drive real business outcomes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={switzer.variable}>
      <body className="min-h-screen bg-paper text-ink font-sans antialiased">
        <FontsReady />
        <NavHistory />
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
