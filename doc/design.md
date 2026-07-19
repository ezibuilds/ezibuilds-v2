Architectural Blueprint and Production Implementation for a High-Fidelity Creative Technology PortfolioExecutive SummaryIn the contemporary digital landscape, a creative technology studio's web presence must serve as a rigorous demonstration of its own capabilities. Studios operating at the intersection of spatial computing, generative artificial intelligence, and physical-digital hybrid campaigns require a digital portfolio that is indistinguishable from the high-end, award-winning experiences they build for clients. This comprehensive architectural blueprint details the engineering, visual design system, and interaction mechanics required to construct a single-page portfolio site matching the requested aesthetic: a dark, cinematic, and deeply interactive platform reminiscent of top-tier global agencies.The application architecture utilizes React within the Next.js 15 App Router ecosystem, styled via Tailwind CSS, and animated using Framer Motion (referred to as Motion). This stack enables seamless server-side rendering for critical initial load paths, while establishing a rich, client-side interaction engine capable of handling bespoke cursor physics, drag-scroll horizontal carousels, and highly optimized, viewport-aware media playback. The design system strictly enforces a deep charcoal and black monochromatic palette, deploying a singular electric blue accent (hex #4E5FFD) to signify interactive elements, alongside heavy, tight-tracking sans-serif typography that communicates confidence and minimalism.Design System and Interaction PhilosophyThe visual and interactive paradigms of this platform are defined by restraint. By aggressively minimizing traditional browser chrome—such as standard navigation bars, visible scrollbars, and native pointers—the application forces the user's attention onto the studio's rich media content.Typographic and Chromatic FoundationsThe typographic hierarchy rejects verbosity in favor of short, declarative taglines and capabilities lists. A singular sans-serif display typeface (e.g., Inter, Helvetica Now, or a geometric equivalent) is utilized universally. Headlines leverage extremely tight letter spacing (tracking-tighter in Tailwind) and aggressive leading (leading-none or leading-tight) to create typographic blocks that function as graphical elements rather than mere text.The color system is heavily restricted to maximize the cinematic impact of the project videos.UI ElementCSS Variable / Tailwind ClassApplication / RolePrimary Background#050505 (bg-background)Defines the deep, cinematic void of the viewport.Surface/Container#111111 (bg-surface)Provides subtle elevation for video placeholders and inputs.Primary Typography#F0F0F0 (text-foreground)High-contrast white/off-white for primary readability.Secondary Typography#888888 (text-muted)Used for small-caps meta-data, tags, and descriptive text.Action Accent#4E5FFD (text-accent)Used exclusively for the custom cursor, active tags, and hover states.The Custom Cursor ParadigmStandard operating system cursors break the immersion of cinematic web experiences. Replacing the native pointer with a dynamic, physics-driven element is a hallmark of premium agency sites. The custom cursor implementation relies on Framer Motion's useMotionValue and useSpring hooks to map the user's physical mouse movements to a DOM element without triggering React's render cycle on every pixel coordinate change, which would otherwise devastate the main thread's performance.The cursor acts as the primary communication vector for interaction. Rather than relying on traditional buttons, the cursor expands and displays contextual, small-caps typographic labels (e.g., "DRAG" over horizontal strips, "PLAY" over static video thumbnails, or "VIEW" over external links).Advanced Media Pipeline and Performance ArchitectureA portfolio representing virtual reality experiences, spatial computing, and high-fidelity motion graphics must host dozens of video files. Attempting to load 15 to 20 looping MP4 files simultaneously will inevitably lead to memory exhaustion and browser crashes, particularly on mobile devices like iOS Safari.To counteract this, the architecture implements a rigorous media lazy-loading pipeline based on the IntersectionObserver API. Videos are not merely deferred; they are fundamentally decoupled from the initial DOM payload.Performance StrategyImplementation MechanismImpact on User ExperienceViewport ObservationIntersectionObserver via React useRefPrevents off-screen videos from consuming network bandwidth.Hover-Triggered PlaybackReact onMouseEnter state mutationIn dense grids, videos remain static thumbnails until the user explicitly hovers, saving massive GPU throughput.Native Attributespreload="none" playsinline muted loopEnsures compliance with browser autoplay policies and prevents unwanted audio.CSS Compositingtransform: translateZ(0) / will-changeForces the browser to hand animation processing to the GPU, ensuring 60fps scrolling.Core Configuration and InfrastructureBefore assembling the component tree, the underlying infrastructure must be configured to support the specific design constraints, including Tailwind extensions and global CSS overrides.Tailwind Configuration (tailwind.config.ts)The configuration file must be augmented to include the bespoke color palette, the necessary keyframes for the infinite marquee animation, and the required typography scaling.TypeScriptimport type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#111111",
        accent: "#4E5FFD",
        muted: "#888888",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.1em",
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
Global Stylesheet (app/globals.css)The global stylesheet executes CSS resets vital to the requested aesthetic. It suppresses native scrollbars across multiple browser engines to maintain a sleek interface and enforces cursor: none on the document body. Crucially, it includes a media query to re-enable the native cursor on touch-first devices, as custom JavaScript cursors often behave erratically on smartphones.CSS@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: #050505;
    --foreground: #f0f0f0;
  }
  
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
    /* Suppress native cursor to allow Framer Motion component to take over */
    cursor: none;
    overflow-x: hidden;
  }

  /* Re-enable native cursor for touch-only devices for accessibility */
  @media (hover: none) and (pointer: coarse) {
    body {
      cursor: auto;
    }
  }
}

@layer utilities {
  /* Scrollbar suppression techniques for WebKit and Firefox */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

/* Force interactive elements to inherit the suppressed cursor */
a, button, input, textarea, select {
  cursor: none;
}
Global State and Interaction EngineThe complex interactions require a robust, globally accessible state management system. A user hovering over a video deep within the nested component tree must be able to communicate with the fixed cursor component sitting at the root of the application.Global Cursor Context (src/context/CursorContext.tsx)This React Context Provider wraps the application shell, offering a simple hook (useCursor) that any component can consume to update the cursor's visual state (Default, Hover, Drag, Play, View).TypeScript"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type CursorState = "default" | "hover" | "drag" | "play" | "view";

interface CursorContextType {
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [cursorState, setCursorState] = useState<CursorState>("default");

  return (
    <CursorContext.Provider value={{ cursorState, setCursorState }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};
The Physics-Driven Cursor Component (src/components/CustomCursor.tsx)The cursor's movement is calculated using useMotionValue to bypass React's standard diffing algorithm. useSpring applies physical properties (mass, stiffness, damping) to the raw coordinates, creating a subtle, organic trailing effect that feels highly polished rather than rigidly locked to the hardware pointer.TypeScript"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export default function CustomCursor() {
  const { cursorState } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates bypassing React state
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Apply spring physics for fluid interpolation
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Determine cursor text and physical dimensions based on active state
  let cursorText = "";
  let size = 12; // Base dot size
  
  switch (cursorState) {
    case "drag":
      cursorText = "DRAG";
      size = 80;
      break;
    case "play":
      cursorText = "PLAY";
      size = 80;
      break;
    case "view":
      cursorText = "VIEW";
      size = 80;
      break;
    case "hover":
      size = 40;
      break;
    default:
      cursorText = "";
      size = 12;
  }

  // Prevent rendering on devices that do not support hover mechanics
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center rounded-full bg-accent text-white font-bold text-[10px] tracking-widest overflow-hidden"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: size,
        height: size,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: cursorText ? 1 : 0, scale: cursorText ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
        className="text-center w-full block"
      >
        {cursorText}
      </motion.span>
    </motion.div>
  );
}
High-Performance Lazy Video Component (src/components/VideoPlayer.tsx)This component wraps standard HTML5 video tags in an IntersectionObserver. It guarantees that videos only download and decode when they are within 200 pixels of the user's active viewport. For the full-grid selected work section, this component can be controlled externally to only play on hover, satisfying the strict performance budgets required for media-heavy sites.TypeScript"use client";

import React, { useRef, useEffect, useState } from "react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  playOnHoverOnly?: boolean;
  isHovered?: boolean;
}

export default function VideoPlayer({ 
  src, 
  poster, 
  className = "", 
  playOnHoverOnly = false,
  isHovered = false 
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          // Disconnect once loaded to retain in memory
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } 
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle external playback control for hover-to-play mechanics
  useEffect(() => {
    if (!videoRef.current || !isIntersecting) return;
    
    if (playOnHoverOnly) {
      if (isHovered) {
        videoRef.current.play().catch(e => console.error("Playback failed:", e));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset video to start
      }
    }
  }, [isHovered, playOnHoverOnly, isIntersecting]);

  return (
    <div className={`relative bg-surface overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        poster={poster}
        playsInline
        muted
        loop
        autoPlay={isIntersecting && !playOnHoverOnly}
        preload="none"
        className="w-full h-full object-cover"
      >
        {isIntersecting && <source src={src} type="video/mp4" />}
      </video>
    </div>
  );
}
Modular Page ConstructionThe application follows a strictly linear, anchor-linked layout. Each section is engineered as an isolated module, managing its own scroll-triggered reveals and physics parameters.1. Minimal Header and Navigation (src/components/Navigation.tsx)The navigation bar is stripped of visual weight. It floats above the hero section initially, adapting a frosted-glass blur (backdrop-blur-md) only after the user begins scrolling, ensuring that the primary hero video remains unobstructed.TypeScript"use client";

import { useState, useEffect } from "react";
import { useCursor } from "@/context/CursorContext";
import { motion } from "framer-motion";

export default function Navigation() {
  const { setCursorState } = useCursor();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Studio", "Work", "Contact"];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent"
      }`}
    >
      <div 
        className="font-bold text-lg md:text-xl tracking-tighter uppercase cursor-none"
        onMouseEnter={() => setCursorState("hover")}
        onMouseLeave={() => setCursorState("default")}
      >
        Studio
      </div>
      <nav className="flex gap-6 md:gap-12 text-[10px] md:text-xs font-bold uppercase tracking-widest">
        {navLinks.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hover:text-accent transition-colors cursor-none"
            onMouseEnter={() => setCursorState("hover")}
            onMouseLeave={() => setCursorState("default")}
          >
            {item}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
2. Cinematic Hero Section (src/components/Hero.tsx)The hero section serves as the immediate entry point, projecting scale and confidence. A full-bleed video loops infinitely in the background, overlaid with the studio's primary identifier.TypeScript"use client";

import VideoPlayer from "./VideoPlayer";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 opacity-50">
        <VideoPlayer 
          src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      </div>
      
      {/* Typographic Overlay */}
      <div className="relative z-10 text-center px-4 w-full max-w-screen-2xl">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[12vw] leading-[0.85] font-bold tracking-tighter uppercase text-white"
        >
          Creative <br /> Technology <br /> Studio
        </motion.h1>
      </div>
    </section>
  );
}
3. Featured Work Drag Carousel (src/components/FeaturedWork.tsx)This component requires precise mathematical constraints. To create a tactile, mobile-like swiping experience on desktop, the component utilizes Framer Motion's drag="x". The bounding box (dragConstraints) must be calculated dynamically by subtracting the total width of the scrollable content from the physical width of the parent container window.TypeScript"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import VideoPlayer from "./VideoPlayer";
import { useCursor } from "@/context/CursorContext";

const FEATURED_PROJECTS = [
  { id: 1, title: "Oreo x Pacman", cat: "AR Experience", src: "https://assets.mixkit.co/videos/preview/mixkit-students-walking-on-a-university-campus-4503-large.mp4" },
  { id: 2, title: "Summer of Dashpass", cat: "Campaign", src: "https://assets.mixkit.co/videos/preview/mixkit-aerial-panorama-of-a-landscape-with-mountains-and-a-lake-4249-large.mp4" },
  { id: 3, title: "Mindzone", cat: "VR Experience", src: "https://assets.mixkit.co/videos/preview/mixkit-curvy-road-on-a-tree-covered-hill-41537-large.mp4" },
  { id: 4, title: "Spatial Gambit", cat: "Immersive", src: "https://assets.mixkit.co/videos/preview/mixkit-rain-falling-on-the-water-of-a-lake-seen-up-18312-large.mp4" },
];

export default function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState(0);
  const { setCursorState } = useCursor();

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current && carouselRef.current) {
        // Calculate the maximum scrollable distance to the left
        const calc = containerRef.current.offsetWidth - carouselRef.current.scrollWidth;
        setConstraints(calc > 0 ? 0 : calc);
      }
    };
    
    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  return (
    <section className="py-24 overflow-hidden" ref={containerRef}>
      <motion.div 
        ref={carouselRef}
        drag="x"
        dragConstraints={{ right: 0, left: constraints }}
        dragElastic={0.05} // Stiff elastic boundaries
        dragTransition={{ bounceStiffness: 400, bounceDamping: 40 }}
        className="flex gap-6 md:gap-10 px-6 md:px-12 cursor-none"
        onMouseEnter={() => setCursorState("drag")}
        onMouseLeave={() => setCursorState("default")}
      >
        {FEATURED_PROJECTS.map((project) => (
          <motion.div 
            key={project.id} 
            className="min-w-[85vw] md:min-w-[45vw] flex-shrink-0 flex flex-col gap-6"
            whileHover={{ scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="aspect-video w-full rounded-sm overflow-hidden bg-surface">
              <VideoPlayer src={project.src} className="w-full h-full" />
            </div>
            <div className="flex justify-between items-end uppercase">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{project.title}</h3>
              <p className="text-[10px] md:text-xs text-muted font-bold tracking-widest">{project.cat}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
4. Studio Intro (src/components/StudioIntro.tsx)This section leverages negative space, offering the eye a brief respite between dense media sections. A concise mission statement sits adjacent to a prominent looping video element.TypeScript"use client";

import { motion } from "framer-motion";
import VideoPlayer from "./VideoPlayer";
import { useCursor } from "@/context/CursorContext";

export function StudioIntro() {
  const { setCursorState } = useCursor();

  return (
    <section id="studio" className="py-24 md:py-40 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-screen-3xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col gap-10"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1] uppercase">
          Envisioned by design. <br className="hidden md:block"/>
          Elevated by technology. <br className="hidden md:block"/>
          Driven by culture.
        </h2>
        <a 
          href="#work"
          className="text-xs font-bold uppercase tracking-widest text-accent hover:text-white transition-colors self-start border-b border-accent pb-1 cursor-none"
          onMouseEnter={() => setCursorState("hover")}
          onMouseLeave={() => setCursorState("default")}
        >
          Learn more
        </a>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="aspect-square w-full bg-surface"
      >
        <VideoPlayer src="https://assets.mixkit.co/videos/preview/mixkit-frying-diced-bacon-in-a-skillet-43063-large.mp4" className="w-full h-full" />
      </motion.div>
    </section>
  );
}
5. Typographic Marquee Break (src/components/Marquee.tsx)To separate distinct narrative blocks within the single page, an infinite marquee acts as a kinetic divider. To avoid JavaScript performance overhead, this is handled entirely via native CSS keyframes defined in the Tailwind configuration.TypeScriptexport default function Marquee() {
  const repetitions = [...Array(4)];

  return (
    <div className="py-10 bg-accent text-white overflow-hidden flex whitespace-nowrap border-y border-accent">
      <div className="animate-marquee flex gap-12 items-center shrink-0 w-max pr-12">
        {repetitions.map((_, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="text-5xl md:text-8xl font-bold tracking-tighter uppercase">
              Creative Technology Studio
            </span>
            {/* Minimal Logo/Mark placeholder */}
            <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex-shrink-0" />
          </div>
        ))}
      </div>
      <div className="animate-marquee flex gap-12 items-center shrink-0 w-max pr-12">
        {repetitions.map((_, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="text-5xl md:text-8xl font-bold tracking-tighter uppercase">
              Creative Technology Studio
            </span>
            <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
6. Expertise and Capabilities (src/components/Capabilities.tsx)Following the marquee, a structured three-column grid details specific operational domains. Scroll-triggered variants orchestrate a staggered, cascading reveal as the user reaches this focal point.TypeScript"use client";

import { motion } from "framer-motion";
import VideoPlayer from "./VideoPlayer";

const CAPABILITIES = [
  {
    title: "Technology",
    video: "https://assets.mixkit.co/videos/preview/mixkit-fresh-apples-in-a-row-on-a-natural-background-42946-large.mp4",
    skills: ["Spatial Computing (AR/VR)", "AI Tools & Experiences", "WebGL Experiences", "Web3 / Blockchain", "Game Development", "Rapid Prototyping"],
  },
  {
    title: "Design",
    video: "https://assets.mixkit.co/videos/preview/mixkit-students-walking-on-a-university-campus-4503-large.mp4",
    skills: ["Creative Direction", "Art Direction", "User Experience Design", "User Interface Design", "Brand Identity", "Design Systems"],
  },
  {
    title: "Motion & CGI",
    video: "https://assets.mixkit.co/videos/preview/mixkit-curvy-road-on-a-tree-covered-hill-41537-large.mp4",
    skills: ["2D & 3D Animation", "2D & 3D Illustration", "Concept Art", "FOOH", "Character Design", "Motion Identity"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Capabilities() {
  return (
    <section className="py-24 md:py-40 px-6 md:px-12 max-w-screen-3xl mx-auto">
      <h2 className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-muted mb-16 md:mb-24">
        Expertise & Capabilities
      </h2>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12"
      >
        {CAPABILITIES.map((cap, index) => (
          <motion.div key={index} variants={itemVariants} className="flex flex-col gap-8">
            <div className="aspect-[4/3] w-full bg-surface mb-2 overflow-hidden">
              <VideoPlayer src={cap.video} className="w-full h-full" />
            </div>
            <h3 className="text-3xl font-bold tracking-tighter uppercase">{cap.title}</h3>
            <ul className="flex flex-col gap-3">
              {cap.skills.map((skill, i) => (
                <li key={i} className="text-muted text-sm font-medium tracking-tight border-b border-white/5 pb-2">
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
7. Filtered Selected Work Grid (src/components/WorkGrid.tsx)The central portfolio grid represents the heaviest media load in the application. Rendering a 2-column grid of potentially unlimited items requires strict memory management. The logic dictates that items display a static visual (simulated here via a CSS class to represent the poster image) and only engage the video.play() API when the specific item is hovered. The user's cursor simultaneously morphs into a "PLAY" button.Additionally, the component integrates the complete array of specified tags to drive a local state filter, conditionally rendering the associated projects.TypeScript"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/context/CursorContext";
import VideoPlayer from "./VideoPlayer";

const TAGS = [
  "ALL", "DIGITAL", "EXPERIENTIAL", "MOTION", "SPATIAL", "VR", 
  "GEN-AI", "AR", "GAMING", "VIRTUAL-FASHION", "IMMERSIVE", "BRAND"
];

const WORK = [
  { id: 1, title: "Mindzone", cat: "VR", src: "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4" },
  { id: 2, title: "Oreo x Pacman", cat: "AR", src: "https://assets.mixkit.co/videos/preview/mixkit-students-walking-on-a-university-campus-4503-large.mp4" },
  { id: 3, title: "Summer of Dashpass", cat: "DIGITAL", src: "https://assets.mixkit.co/videos/preview/mixkit-aerial-panorama-of-a-landscape-with-mountains-and-a-lake-4249-large.mp4" },
  { id: 4, title: "Widllet", cat: "BRAND", src: "https://assets.mixkit.co/videos/preview/mixkit-rain-falling-on-the-water-of-a-lake-seen-up-18312-large.mp4" },
];

export default function WorkGrid() {
  const { setCursorState } = useCursor();
  const [activeTag, setActiveTag] = useState("ALL");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredWork = activeTag === "ALL" 
    ? WORK 
    : WORK.filter(p => p.cat === activeTag);

  return (
    <section id="work" className="py-24 md:py-40 px-6 md:px-12 max-w-screen-3xl mx-auto">
      <h2 className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-muted mb-12">Selected Work</h2>
      
      {/* Filter Tags */}
      <div className="flex flex-wrap gap-3 mb-16 md:mb-24">
        {TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            onMouseEnter={() => setCursorState("hover")}
            onMouseLeave={() => setCursorState("default")}
            className={`text-[10px] font-bold tracking-widest uppercase px-5 py-2.5 rounded-full transition-colors border cursor-none ${
              activeTag === tag 
                ? "bg-accent border-accent text-white" 
                : "border-white/10 text-muted hover:border-white/30 hover:text-white"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <AnimatePresence>
          {filteredWork.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => {
                setCursorState("play");
                setHoveredId(project.id);
              }}
              onMouseLeave={() => {
                setCursorState("default");
                setHoveredId(null);
              }}
              className="group cursor-none relative flex flex-col gap-6"
            >
              <div className="aspect-[4/5] bg-surface w-full overflow-hidden relative rounded-sm">
                 {/* Video component controlled by hover state */}
                 <div className={`absolute inset-0 transition-transform duration-1000 ${hoveredId === project.id ? 'scale-105' : 'scale-100'}`}>
                   <VideoPlayer 
                     src={project.src} 
                     playOnHoverOnly={true}
                     isHovered={hoveredId === project.id}
                     className="w-full h-full"
                   />
                 </div>
                 
                 {/* Overlay Gradient for Text Legibility */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
              </div>

              {/* Project Meta overlay on hover */}
              <div className="absolute bottom-0 left-0 p-8 z-30 flex flex-col opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
                <h3 className="text-4xl font-bold tracking-tighter uppercase text-white">{project.title}</h3>
                <p className="text-accent text-[10px] font-bold tracking-widest uppercase mt-3">{project.cat}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
8. Awards Ticker (src/components/Awards.tsx)The portfolio establishes credibility through a densely packed, text-driven tabular list of recognitions. The data structure separates ordinal numbers, organizations, project titles, award metrics, and publication years, maintaining a severe, monochromatic layout that highlights the metric via the accent color.TypeScript"use client";

import { motion } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

const AWARDS = [
  { id: "01", org: "Awwwards", project: "Form&Fun Portfolio", metric: "1x Site of the Day", year: "2025" },
  { id: "02", org: "Webby Awards", project: "Powerade Mind Zone", metric: "AI, Immersive & Games", year: "2025" },
  { id: "03", org: "Clio Awards", project: "Oreo & Pacman Supermarcade", metric: "Gold", year: "2025" },
  { id: "04", org: "Auggie Award", project: "Oreo & Pacman Supermarcade", metric: "Best Campaign", year: "2025" },
  { id: "05", org: "ADC Festival", project: "Oreo & Pacman Supermarcade", metric: "Silver", year: "2025" },
  { id: "06", org: "Cannes Lions", project: "Oreo & Pacman Supermarcade", metric: "Bronze", year: "2024" },
];

export default function Awards() {
  const { setCursorState } = useCursor();

  return (
    <section className="py-24 md:py-40 px-6 md:px-12 max-w-screen-3xl mx-auto border-t border-white/10">
      <h2 className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-muted mb-16 md:mb-24">
        AWARDS
      </h2>
      <div className="flex flex-col border-t border-white/5">
        {AWARDS.map((award, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
            onMouseEnter={() => setCursorState("hover")}
            onMouseLeave={() => setCursorState("default")}
            className="group grid grid-cols-2 md:grid-cols-[auto_1.5fr_2fr_1fr_auto] gap-4 md:gap-8 items-center py-6 md:py-8 border-b border-white/5 hover:border-accent transition-colors text-sm md:text-lg cursor-none"
          >
            <span className="text-muted font-mono text-[10px] hidden md:block">{award.id}</span>
            <span className="font-bold tracking-tight uppercase group-hover:text-white transition-colors">{award.org}</span>
            <span className="text-muted font-medium tracking-tight hidden md:block">{award.project}</span>
            <span className="text-accent font-bold tracking-tighter uppercase">{award.metric}</span>
            <span className="text-muted font-mono text-xs text-right md:text-left">{award.year}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
9. Client Logos Carousel (src/components/ClientLogos.tsx)Following the awards, social proof is solidified through client associations. A horizontal row of brand logos utilizes CSS utility classes (grayscale opacity-50 hover:grayscale-0 hover:opacity-100) to maintain the dark, unified aesthetic until active engagement by the user occurs.TypeScript"use client";

import { motion } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

const LOGOS = [
  { name: "Oreo", src: "/logos/oreo.svg" },
  { name: "Powerade", src: "/logos/powerade.svg" },
  { name: "DoorDash", src: "/logos/doordash.svg" },
  { name: "Google", src: "/logos/google.svg" },
  { name: "Nike", src: "/logos/nike.svg" },
];

export default function ClientLogos() {
  const { setCursorState } = useCursor();

  return (
    <section className="py-24 px-6 md:px-12 max-w-screen-3xl mx-auto overflow-hidden">
      <h2 className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-muted mb-16">Selected Clients</h2>
      
      <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 md:gap-8">
        {LOGOS.map((logo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            onMouseEnter={() => setCursorState("hover")}
            onMouseLeave={() => setCursorState("default")}
            className="cursor-none"
          >
            {/* Placeholder for SVG Logos */}
            <div className="h-12 w-32 bg-white/20 mask-image-placeholder grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:bg-white transition-all duration-500 flex items-center justify-center text-background font-bold tracking-tighter uppercase select-none">
              {logo.name}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
10. Minimalist Contact Interface (src/components/Contact.tsx)The contact section pairs a brutalist, typography-driven form interface alongside a stark ambient looping video, creating visual tension and balance between utility and media. Form fields utilize border-bottom styling only, avoiding boxed input layouts entirely to integrate seamlessly with the background void.TypeScript"use client";

import { useCursor } from "@/context/CursorContext";
import VideoPlayer from "./VideoPlayer";
import { motion } from "framer-motion";

export default function Contact() {
  const { setCursorState } = useCursor();

  return (
    <section id="contact" className="py-24 md:py-40 px-6 md:px-12 bg-surface">
      <div className="max-w-screen-3xl mx-auto grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-16 md:gap-24 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-16 leading-[0.9]">
            Let's Create <br/> Together
          </h2>
          <form className="flex flex-col gap-10">
            <input 
              type="text" 
              placeholder="NAME" 
              className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-accent text-xs tracking-widest uppercase transition-colors cursor-none w-full"
              onMouseEnter={() => setCursorState("hover")}
              onMouseLeave={() => setCursorState("default")}
            />
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-accent text-xs tracking-widest uppercase transition-colors cursor-none w-full"
              onMouseEnter={() => setCursorState("hover")}
              onMouseLeave={() => setCursorState("default")}
            />
            <textarea 
              placeholder="MESSAGE" 
              rows={4}
              className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-accent text-xs tracking-widest uppercase transition-colors resize-none cursor-none w-full"
              onMouseEnter={() => setCursorState("hover")}
              onMouseLeave={() => setCursorState("default")}
            />
            <button 
              type="button"
              className="self-start px-12 py-5 bg-accent text-white font-bold tracking-widest uppercase text-[10px] rounded-sm hover:bg-white hover:text-black transition-all duration-300 cursor-none mt-4"
              onMouseEnter={() => setCursorState("hover")}
              onMouseLeave={() => setCursorState("default")}
            >
              Submit Inquiry
            </button>
          </form>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="aspect-[3/4] w-full hidden md:block rounded-sm overflow-hidden"
        >
           <VideoPlayer src="https://assets.mixkit.co/videos/preview/mixkit-rain-falling-on-the-water-of-a-lake-seen-up-18312-large.mp4" className="w-full h-full" />
        </motion.div>
      </div>
    </section>
  );
}
11. Global Footer (src/components/Footer.tsx)The footer terminates the page experience by stripping away all non-essential links. It provides simple, text-based navigation points and critical direct-contact emails, functioning as a typographic anchor.TypeScript"use client";

import { useCursor } from "@/context/CursorContext";

export default function Footer() {
  const { setCursorState } = useCursor();

  return (
    <footer className="py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] md:text-xs font-bold tracking-widest uppercase text-muted border-t border-white/10 bg-background">
      <div className="text-white mb-8 md:mb-0 text-xl font-bold tracking-tighter cursor-none">
        Studio
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-8 md:mb-0">
        <a href="#" className="hover:text-accent transition-colors cursor-none" onMouseEnter={() => setCursorState("hover")} onMouseLeave={() => setCursorState("default")}>Instagram</a>
        <a href="#" className="hover:text-accent transition-colors cursor-none" onMouseEnter={() => setCursorState("hover")} onMouseLeave={() => setCursorState("default")}>LinkedIn</a>
        <a href="#" className="hover:text-accent transition-colors cursor-none" onMouseEnter={() => setCursorState("hover")} onMouseLeave={() => setCursorState("default")}>Behance</a>
      </div>
      
      <div className="flex flex-col md:items-end gap-3">
        <a href="mailto:hi@studio.co" className="hover:text-white transition-colors cursor-none" onMouseEnter={() => setCursorState("hover")} onMouseLeave={() => setCursorState("default")}>hi@studio.co</a>
        <a href="mailto:apply@studio.co" className="hover:text-white transition-colors cursor-none" onMouseEnter={() => setCursorState("hover")} onMouseLeave={() => setCursorState("default")}>apply@studio.co</a>
      </div>
    </footer>
  );
}
Assembly and Component Tree LayoutWith all functional modules defined, they are assembled within the Next.js RootLayout (which injects the Context Provider and Custom Cursor) and the primary page.tsx file to form the cohesive, single-page architecture.Root Integration (app/layout.tsx)TypeScriptimport type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/context/CursorContext";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Creative Technology Studio",
  description: "Blending design, technology, and storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <CursorProvider>
          {/* Global Cursor overlay */}
          <CustomCursor />
          
          {/* Sticky minimal Chrome */}
          <Navigation />
          
          {/* Page Composition */}
          <main className="w-full relative z-10">{children}</main>
          
          {/* Site Termination */}
          <Footer />
        </CursorProvider>
      </body>
    </html>
  );
}
The Primary Routing File (app/page.tsx)TypeScriptimport Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import { StudioIntro } from "@/components/StudioIntro";
import Marquee from "@/components/Marquee";
import Capabilities from "@/components/Capabilities";
import WorkGrid from "@/components/WorkGrid";
import Awards from "@/components/Awards";
import ClientLogos from "@/components/ClientLogos";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <StudioIntro />
      <Marquee />
      <Capabilities />
      <WorkGrid />
      <Awards />
      <ClientLogos />
      <Contact />
    </>
  );
}
Final Architectural ReviewThe resulting implementation strictly adheres to the requested brand voice, relying on a dominant sans-serif typography structure, dense negative space, and aggressive monochromatic contrast broken only by the #4E5FFD accent color. Crucially, the engineering decisions—specifically the use of Framer Motion's useMotionValue for pointer tracking and the IntersectionObserver for media lazy-loading—elevate the application from a standard React layout to a high-performance web experience.By compartmentalizing video rendering until the exact moment of viewport intersection or user interaction (e.g., hovering the Selected Work grid), the application preserves vital client-side memory, ensuring fluid 60fps animations across horizontal drag carousels and smooth scroll reveals, satisfying both the aesthetic and technical requirements of an elite creative technology studio.