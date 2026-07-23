/**
 * Card screenshot. "desktop" shots are browser captures shown as a window
 * peeking from the card's bottom edge; "mobile" shots are phone-tall
 * captures shown as a device panel. Full-page captures (the *-complete
 * files) are pre-cropped to their top viewport as *-hero.webp — anything
 * still taller than the panel is cropped by object-top, so the card always
 * shows the top of the product.
 */
export type WorkShot = {
  src: string;
  kind: "desktop" | "mobile";
  /**
   * How a full-bleed shot fills its card. "cover" (the default) crops to the
   * card and suits browser captures, whose aspect is close to the card's.
   * "contain" fits the whole image inside and lets the card's accent show
   * through — the only way a near-square capture reads without losing half
   * of itself to the crop.
   */
  fit?: "cover" | "contain";
};

export type Work = {
  slug: string;
  client: string;
  title: string;
  category: string;
  tags: string[];
  year: string;
  accent: string;
  textColor?: string;
  href: string;
  comingSoon?: boolean;
  shot?: WorkShot;
};

export const categories = [
  "DESIGN",
  "BUILD",
  "SAAS",
  "MOBILE",
  "AI",
];

export const works: Work[] = [
  {
    slug: "wacrm",
    client: "WaCRM",
    title: "WaCRM",
    category: "WhatsApp CRM",
    tags: ["DESIGN", "BUILD", "SAAS"],
    year: "2025",
    accent: "#C5CEF0",
    textColor: "#1d1d1d",
    href: "/work/wacrm",
  },
  {
    slug: "hostelgo",
    client: "HostelGo",
    title: "HostelGo",
    category: "Transit App",
    tags: ["DESIGN", "BUILD", "MOBILE"],
    year: "2025",
    accent: "#F5D9A8",
    textColor: "#1d1d1d",
    href: "/work/hostelgo",
    shot: { src: "/projects/hostelgo-shot-1.webp", kind: "mobile" },
  },
  {
    slug: "fraudex",
    client: "FraudEx",
    title: "FraudEx",
    category: "Fraud Detection",
    tags: ["BUILD", "AI", "SAAS"],
    year: "2025",
    accent: "#A9E5E3",
    textColor: "#1d1d1d",
    href: "/work/fraudex",
    shot: { src: "/projects/fraudex-hero.webp", kind: "desktop" },
  },
  {
    slug: "jobezi",
    client: "JobEzi",
    title: "JobEzi",
    category: "Talent Marketplace",
    tags: ["DESIGN", "BUILD", "SAAS"],
    year: "2025",
    accent: "#DDB3E9",
    textColor: "#1d1d1d",
    href: "/work/jobezi",
    shot: { src: "/projects/jobezi-wide.webp", kind: "desktop" },
  },
  {
    slug: "tambolens",
    client: "Tambolens",
    title: "Tambolens",
    category: "Analytics Platform",
    tags: ["DESIGN", "BUILD", "AI"],
    year: "2024",
    accent: "#AFD9A4",
    textColor: "#1d1d1d",
    href: "/work/tambolens",
    shot: { src: "/projects/tambolens-hero.webp", kind: "desktop" },
  },
  {
    slug: "assetflow",
    client: "AssetFlow",
    title: "AssetFlow",
    category: "Asset Management",
    tags: ["DESIGN", "BUILD", "SAAS"],
    year: "2024",
    accent: "#CFE0F2",
    textColor: "#1d1d1d",
    href: "/work/assetflow",
  },
];

/**
 * The hero's first carousel: a strip of finished screens, shown full-bleed.
 *
 * Separate from `works` on purpose. These are pieces of visual work, not case
 * studies — none of them has a /work/[slug] page behind it, so every card
 * points at the work index rather than a detail route that does not exist.
 * Keeping them out of `works` also keeps them off the /work grid, which is
 * driven by the entries that do have write-ups.
 *
 * `accent` is each image's own background colour. It is what shows around a
 * "contain" shot, so the card reads as one surface rather than a letterbox.
 */
export const showcase: Work[] = [
  {
    slug: "amipay",
    client: "Amipay",
    title: "Amipay",
    category: "Crypto Payments",
    tags: ["DESIGN", "MOBILE"],
    year: "2025",
    accent: "#8B5CF6",
    textColor: "#ffffff",
    href: "/work",
    shot: { src: "/projects/amipay.webp", kind: "desktop" },
  },
  {
    slug: "kapoma",
    client: "Kapoma",
    title: "Kapoma",
    category: "E-commerce",
    tags: ["DESIGN", "BUILD"],
    year: "2025",
    accent: "#FCEBE0",
    href: "/work",
    shot: { src: "/projects/kapoma.webp", kind: "desktop" },
  },
  {
    slug: "flowance",
    client: "Flowance",
    title: "Flowance",
    category: "Studio Site",
    tags: ["DESIGN", "BUILD"],
    year: "2025",
    accent: "#3E9BD6",
    textColor: "#ffffff",
    href: "/work",
    shot: { src: "/projects/flowance.webp", kind: "desktop" },
  },
  {
    slug: "jee-pricing",
    client: "Prepwise",
    title: "Prepwise",
    category: "Ed-tech",
    tags: ["DESIGN", "SAAS"],
    year: "2025",
    accent: "#F2F2F2",
    href: "/work",
    shot: { src: "/projects/jee-pricing.webp", kind: "desktop" },
  },
  {
    slug: "flodesk",
    client: "Flodesk",
    title: "Flodesk",
    category: "Marketing Site",
    tags: ["DESIGN", "BUILD"],
    year: "2025",
    accent: "#FAF7F0",
    href: "/work",
    shot: { src: "/projects/flodesk.webp", kind: "desktop" },
  },
  {
    // 1920x1867 — almost square, so it is the one shot that has to be
    // contained rather than cropped, or the bottom four widgets are lost.
    slug: "widgets",
    client: "Widgets",
    title: "Widgets",
    category: "UI System",
    tags: ["DESIGN"],
    year: "2025",
    accent: "#EFEFEF",
    href: "/work",
    shot: { src: "/projects/widgets.webp", kind: "desktop", fit: "contain" },
  },
];

export type CapabilityCategory = {
  id: "design" | "build" | "launch";
  label: string;
  tagline: string;
  description: string;
  groups: { title: string; items: string[] }[];
};

export const capabilities: CapabilityCategory[] = [
  {
    id: "design",
    label: "Design",
    tagline: "Design products people love.",
    description:
      "Before writing code, we understand users, validate ideas, and create intuitive experiences that solve real problems.",
    groups: [
      {
        title: "Product Design",
        items: [
          "UX Research",
          "User Flows",
          "Information Architecture",
          "Wireframes",
          "UI Design",
          "Website Design",
          "Mobile App Design",
          "SaaS Product Design",
          "Dashboard Design",
          "Design Systems",
          "Interactive Prototypes",
        ],
      },
    ],
  },
  {
    id: "build",
    label: "Build",
    tagline: "Engineer products that scale.",
    description:
      "We transform ideas into production-ready digital products built with modern technologies.",
    groups: [
      {
        title: "Engineering",
        items: [
          "Website Development",
          "Web Applications",
          "Mobile App Development",
          "SaaS Development",
          "Shopify Development",
          "AI Solutions",
          "AI Agent Development",
          "Automation",
          "API Development & Integrations",
          "CMS Development",
          "Maintenance & Support",
        ],
      },
    ],
  },
  {
    id: "launch",
    label: "Launch & Scale",
    tagline: "Turn products into successful businesses.",
    description:
      "Building the product is only the beginning. We help businesses launch confidently with compelling creative content and measurable growth systems.",
    groups: [
      {
        title: "Creative Production",
        items: [
          "Video Editing",
          "Product Videos",
          "Explainer Videos",
          "Motion Graphics",
          "Animation",
          "Social Media Reels",
          "Short-form Videos",
          "YouTube Video Editing",
          "Podcast Editing",
          "AI Product Visuals",
          "AI Lifestyle Visuals",
          "AI Brand Visuals",
          "AI Marketing Creatives",
          "Social Media Creatives",
        ],
      },
      {
        title: "Growth",
        items: [
          "Social Media Marketing",
          "Performance Marketing",
          "Influencer Marketing",
          "UGC Marketing",
          "Conversion Rate Optimization (CRO)",
          "Email Marketing",
          "Analytics & Reporting",
          "Shopify Growth",
          "Quick Commerce Setup",
          "Growth Consulting",
        ],
      },
    ],
  },
];

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** One of: product, saas, mobile, web, launch. */
  group:
    | "product"
    | "saas"
    | "mobile"
    | "web"
    | "launch";
};

export const products: Product[] = [
  {
    slug: "product-design",
    name: "Product Design",
    tagline: "Interfaces people love using.",
    description:
      "End-to-end product design: research, flows, UI, prototypes, and design systems handed off to engineering.",
    group: "product",
  },
  {
    slug: "saas",
    name: "SaaS",
    tagline: "Multi-tenant SaaS platforms.",
    description:
      "Design and engineer SaaS products: auth, billing, dashboards, roles, and the infrastructure that scales with them.",
    group: "saas",
  },
  {
    slug: "mobile-apps",
    name: "Mobile Apps",
    tagline: "Native-feeling mobile products.",
    description:
      "iOS and Android apps with the polish of native: gestures, motion, offline behaviour, and release-ready builds.",
    group: "mobile",
  },
  {
    slug: "websites",
    name: "Websites",
    tagline: "Marketing sites that convert.",
    description:
      "Performance-first websites with motion, CMS integrations, and the analytics wiring to learn from every visitor.",
    group: "web",
  },
  {
    slug: "launch-systems",
    name: "Launch Systems",
    tagline: "Creative that ships the product.",
    description:
      "Launch creative in one motion system: product video, motion graphics, AI-generated visuals, and social cuts.",
    group: "launch",
  },
];

export type Offer = {
  slug: string;
  name: string;
  /**
   * One intro line under the name — the only intro copy on the card. It
   * describes the offering itself ("Monthly design retainer…") rather than
   * naming an audience ("For startups…"), so a card speaks to anyone the
   * service fits, not a single buyer type.
   */
  position: string;
  /**
   * Standard inclusions — the buyer-anxiety list. Maydit shows these as plain
   * text bullets, no icons; the visual weight is on the `highlights` below.
   * Capped at five: related services are merged into one row so the card
   * scans as a list, not a wall.
   */
  includes: string[];
  /**
   * The last two items in each list, rendered in the brand accent colour so
   * the eye lands on the trust differentiators ("risk-free trial", "pause
   * anytime") rather than the feature list.
   */
  highlights: string[];
  /** Small uppercase line below the card, e.g. "WE CAP CLIENTS…". */
  assurance: string;
  cta: string;
  /**
   * The offer's colour, in the pastel vocabulary used across the site. The
   * cards themselves are ink and paper, so this is not a fill: it marks the
   * assurance line at the foot of the card and is the only place the palette
   * shows up in that section.
   */
  accent: string;
  /**
   * The recommended offer. Exactly one carries this. It renders as the ink
   * card and is placed in the middle of the row with a "Most popular" badge —
   * the standard pricing-table convention.
   */
  featured?: boolean;
};

export const offers: Offer[] = [
  {
    slug: "product-partnership",
    name: "Embedded Team",
    position:
      "A monthly design and development partner for teams that want ongoing product work without the hassle.",
    includes: [
      "Dedicated designer & full-stack developer",
      "Weekly sprints & product roadmapping",
      "Unlimited design requests",
      "AI solutions & automation",
      "Priority support on Slack / WhatsApp",
    ],
    highlights: [
      "7-day risk-free trial",
      "Pause or cancel anytime",
    ],
    assurance: "We cap clients to protect quality. Limited slots open.",
    cta: "Schedule Strategy Call",
    accent: "#C5CEF0",
    featured: true,
  },
  {
    slug: "fixed-scope",
    name: "Project Launch",
    position:
      "Ideal for fixed-scope projects like a website, app, or MVP, designed and built end to end.",
    includes: [
      "Discovery workshop & UX/UI design",
      "Website or app development",
      "AI integration where it fits",
      "QA, SEO & performance testing",
      "Documentation & handover",
    ],
    // "50% upfront" lives in the assurance line only — it sat in both and
    // read as padding.
    highlights: [
      "14 days of launch support",
      "Fixed timeline, no scope creep",
    ],
    assurance: "Split payment — 50% now, 50% upon completion.",
    cta: "Schedule Strategy Call",
    // Was ink, back when this card was a solid dark block among two pastels.
    // As a marker on a paper card an ink dot reads as a bullet rather than a
    // colour, so it takes the sand from the works set.
    accent: "#F5D9A8",
  },
  {
    slug: "growth-partnership",
    name: "Growth Partner",
    position:
      "Creative production and growth work that keeps a live product moving month after month.",
    includes: [
      "Product videos & motion graphics",
      "Social reels & short-form video",
      "AI creative production",
      "Performance marketing",
      "Conversion rate optimization",
    ],
    highlights: [
      "Monthly growth reports",
      "Weekly optimization reviews",
    ],
    assurance: "Performance-based, with monthly growth reporting.",
    cta: "Schedule Strategy Call",
    accent: "#AFD9A4",
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  /** Optional label below the description, e.g. the artefact produced. */
  output: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start with the problem, not the solution. Calls, audits, and a shared brief that everyone signs up to.",
    output: "Brief & success metrics",
  },
  {
    number: "02",
    title: "Research",
    description:
      "User interviews, competitor teardowns, and a positioning pass. The work that prevents six months of guesswork.",
    output: "Research report",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Wireframes, prototypes, and a design system your engineering team can build against without translation.",
    output: "Figma & design system",
  },
  {
    number: "04",
    title: "Build",
    description:
      "Engineering in sprints, with weekly demos and a shared backlog. Ship to staging every Friday.",
    output: "Production-ready code",
  },
  {
    number: "05",
    title: "Launch",
    description:
      "Launch creative, landing pages, and the analytics wiring to know what happens in week one, not month three.",
    output: "Launch kit & site",
  },
  {
    number: "06",
    title: "Scale",
    description:
      "We stay on to iterate on what the data shows. New features, growth experiments, and the next version of the brief.",
    output: "Roadmap & experiments",
  },
];

export type Founder = {
  name: string;
  role: string;
  bio: string;
  mission: string;
  story: string;
  links: { label: string; href: string }[];
};

export const founder: Founder = {
  name: "Jay Sathwara",
  role: "Founder, ezibuilds",
  bio: "Designer and engineer building the studio I wished existed when I shipped my first product.",
  mission:
    "Build a studio that designs, ships, and launches like a product company — not an agency.",
  story:
    "ezibuilds started as a one-person studio taking on product design and engineering work for founders who needed a partner, not a vendor. The team grew, the framework stayed the same: design, build, launch, and scale — owned end to end by the same small team, with the same accountability for outcomes.",
  links: [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "Newsletter", href: "https://newsletter.ezibuilds.studio" },
  ],
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "ezibuilds took our rough idea and shipped a production-ready product in eight weeks. The team thinks like founders, not vendors.",
    author: "Priya Sharma",
    role: "Co-founder & CEO",
    company: "WaCRM",
  },
  {
    quote:
      "Their framework of design, build and launch gave us clarity at every stage. Best agency engagement we have had.",
    author: "Marcus Lin",
    role: "Founder",
    company: "HostelGo",
  },
  {
    quote:
      "From wireframes to growth marketing, ezibuilds owns the entire funnel. Our conversions tripled in the first quarter.",
    author: "Anika Patel",
    role: "Head of Product",
    company: "FraudEx",
  },
  {
    quote:
      "They treat quality like it is personal. The build, the polish, the motion: everything feels considered.",
    author: "Daniel Okafor",
    role: "CTO",
    company: "JobEzi",
  },
  {
    quote:
      "A studio that genuinely understands product. They challenged our assumptions and made the product sharper.",
    author: "Sara Mendes",
    role: "VP Marketing",
    company: "BrewGreen",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  accent: string;
};

export const team: TeamMember[] = [
  {
    name: "Aarav Mehta",
    role: "Founder & Creative Director",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. 10+ years designing products across fintech and SaaS.",
    accent: "#C5CEF0",
  },
  {
    name: "Maya Iyer",
    role: "Head of Design",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leads design systems and brand work for global clients.",
    accent: "#F5D9A8",
  },
  {
    name: "Rohan Verma",
    role: "Engineering Lead",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Full-stack engineer specialised in scalable SaaS architectures.",
    accent: "#A9E5E3",
  },
  {
    name: "Sneha Kapoor",
    role: "Product Strategist",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Translates customer insight into shipped product bets.",
    accent: "#DDB3E9",
  },
  {
    name: "Vikram Rao",
    role: "AI Solutions Architect",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Builds AI agents and automation tools for ops teams.",
    accent: "#AFD9A4",
  },
  {
    name: "Tara Singh",
    role: "Growth Lead",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Performance marketing and lifecycle for D2C brands.",
    accent: "#F7C9D4",
  },
];

export type WorkDetail = {
  /** One-line positioning statement, shown large under the hero. */
  summary: string;
  services: string[];
  sections: { title: string; body: string }[];
};

/**
 * Long-form content for /work/[slug], keyed by Work.slug.
 *
 * Lengths are tuned to the rendered layout: `summary` sits in display type at
 * ~29 characters per line, so it is kept under ~85 to stay within three lines;
 * `sections[].body` runs ~72 characters per line and is kept under ~190 so it
 * holds to three lines on desktop and four on mobile.
 */
export const workDetails: Record<string, WorkDetail> = {
  wacrm: {
    summary:
      "Salon booking, payments, and analytics running on one WhatsApp number.",
    services: ["WhatsApp CRM", "Booking System", "Payments", "Owner Dashboard"],
    sections: [
      {
        title: "Challenge",
        body: "Indian salons run on phone calls and paper diaries. Missed calls cost bookings, no-shows went unpunished, and owners had no view of revenue or barber performance.",
      },
      {
        title: "Approach",
        body: "We extended WaCRM into a vertical salon SaaS. The flows engine already handled WhatsApp, so the work went into the booking model, slot concurrency, payments, and the owner console.",
      },
      {
        title: "Outcome",
        body: "Customers book, reschedule, and cancel in chat. Barbers manage check-ins and queues. Owners get analytics, waitlists, GST invoicing, and automated reminders.",
      },
    ],
  },
  hostelgo: {
    summary:
      "Live shuttle tracking for students, drivers, and admins in one app.",
    services: ["Mobile App", "Live Tracking", "QR Boarding", "Admin Dashboard"],
    sections: [
      {
        title: "Challenge",
        body: "Campus shuttles run on guesswork. Students wait without knowing when a van arrives, drivers cannot see who is waiting, and admins have no data on fleet use.",
      },
      {
        title: "Approach",
        body: "A React Native app with three role-specific interfaces over WebSockets. Students mark themselves ready and scan a QR to board, drivers work a live queue, admins manage trips and fleet.",
      },
      {
        title: "Outcome",
        body: "Live queue visibility, QR boarding, van tracking on a map, and an admin dashboard with audit logs, all kept in sync by WebSocket events.",
      },
    ],
  },
  fraudex: {
    summary:
      "Explainable fraud detection that shows why a transaction was flagged.",
    services: ["FastAPI Backend", "Anomaly Detection", "Data Visualization"],
    sections: [
      {
        title: "Challenge",
        body: "Auditing financial records is manual and reactive. Suspicious rows hide inside thousands of transactions, and most tools flag them without explaining why.",
      },
      {
        title: "Approach",
        body: "A Next.js frontend over a Python FastAPI backend running Benford's Law, Z-score and IQR outliers, vendor concentration, round-number and duplicate checks. Every flag carries its reason.",
      },
      {
        title: "Outcome",
        body: "Upload a CSV and get a risk score, flagged transactions, a Benford's Law chart, and a plain explanation in under two minutes. It informs auditors rather than accusing.",
      },
    ],
  },
  jobezi: {
    summary:
      "A talent marketplace where recruiters pay only for accepted intros.",
    services: ["Web App", "Supabase Auth", "Assessments", "Credit Billing"],
    sections: [
      {
        title: "Challenge",
        body: "Recruiters drown in unvetted applicants. Candidates are tired of being spammed and cannot signal interest without exposing who they are. Neither side has trust signals.",
      },
      {
        title: "Approach",
        body: "Candidates stay redacted until they accept an intro. Ranking uses verifiable signals: GitHub activity, timed assessments, responsiveness. Recruiters pay per accepted intro.",
      },
      {
        title: "Outcome",
        body: "Ranked shortlists, salary-band matching, credit holds on sends, and details revealed only on accept. Assessments give percentile badges and every credit move is audited.",
      },
    ],
  },
  tambolens: {
    summary:
      "Explore your database in plain language, with charts built on the fly.",
    services: ["Product Design", "Next.js Frontend", "MCP Integration", "Tambo SDK"],
    sections: [
      {
        title: "Challenge",
        body: "Business data sits in databases, but getting insight needs SQL and BI expertise. AI chat tools lack structured access and cannot hold UI state, so analysts become the bottleneck.",
      },
      {
        title: "Approach",
        body: "A plug-and-play layer over existing databases: MCP servers guard query execution and the Tambo SDK renders generative UI. Connect a database, authorise tables, then ask questions.",
      },
      {
        title: "Outcome",
        body: "Postgres, MySQL, and MongoDB support with encrypted credentials, schema-aware permissions, guarded querying, and saved dashboards. No migration and no SQL required.",
      },
    ],
  },
  assetflow: {
    summary:
      "Asset tracking, allocation, and maintenance on one structured lifecycle.",
    services: ["Web App", "PostgreSQL", "Role-based Access", "Reporting"],
    sections: [
      {
        title: "Challenge",
        body: "Organisations still track assets on spreadsheets and paper. Nobody can see who holds what, what condition it is in, or what is overdue, so conflicts surface too late.",
      },
      {
        title: "Approach",
        body: "A greenfield Next.js app on Prisma and PostgreSQL covering the full lifecycle: registration, allocation with conflict detection, transfers, booking, and maintenance approval.",
      },
      {
        title: "Outcome",
        body: "Role-based dashboards, calendar booking, maintenance workflows, audit cycles, and exportable reports, each scoped to Admin, Manager, Department Head, or Employee.",
      },
    ],
  },
};
