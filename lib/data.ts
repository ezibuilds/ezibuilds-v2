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
