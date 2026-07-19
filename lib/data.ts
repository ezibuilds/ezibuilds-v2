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
    category: "SaaS Platform",
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
    category: "Marketplace",
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
    category: "AI Security",
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
    category: "Mobile App",
    tags: ["DESIGN", "BUILD", "MOBILE"],
    year: "2025",
    accent: "#DDB3E9",
    textColor: "#1d1d1d",
    href: "/work/jobezi",
  },
  {
    slug: "tambolens",
    client: "Tambolens",
    title: "Tambolens",
    category: "D2C Commerce",
    tags: ["DESIGN", "BUILD"],
    year: "2024",
    accent: "#AFD9A4",
    textColor: "#1d1d1d",
    href: "/work/tambolens",
  },
  {
    slug: "assetflow",
    client: "AssetFlow",
    title: "AssetFlow",
    category: "Fintech Dashboard",
    tags: ["DESIGN", "SAAS"],
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
 * PLACEHOLDER COPY: the structure is real, the words are not. Every `summary`
 * and `body` below needs replacing with the actual project story. Deliberately
 * free of invented metrics so nothing reads as a fabricated result claim.
 */
export const workDetails: Record<string, WorkDetail> = {
  wacrm: {
    summary:
      "A customer operations platform rebuilt around the way sales teams actually work.",
    services: ["UX Research", "Product Design", "Design System", "Web App"],
    sections: [
      {
        title: "Challenge",
        body: "Describe the problem the client arrived with, the constraints on the engagement, and what success needed to look like.",
      },
      {
        title: "Approach",
        body: "Describe how the work was scoped and run: the research, the decisions that shaped the product, and why they were made.",
      },
      {
        title: "Outcome",
        body: "Describe what shipped and what changed for the business afterwards. Replace with real, verifiable results.",
      },
    ],
  },
  hostelgo: {
    summary:
      "A booking marketplace reimagined for travellers who plan on the move.",
    services: ["Product Design", "Mobile App", "Web Development", "Brand"],
    sections: [
      {
        title: "Challenge",
        body: "Describe the problem the client arrived with, the constraints on the engagement, and what success needed to look like.",
      },
      {
        title: "Approach",
        body: "Describe how the work was scoped and run: the research, the decisions that shaped the product, and why they were made.",
      },
      {
        title: "Outcome",
        body: "Describe what shipped and what changed for the business afterwards. Replace with real, verifiable results.",
      },
    ],
  },
  fraudex: {
    summary:
      "Real-time risk scoring that gives analysts a reason for every decision.",
    services: ["AI Solutions", "Dashboard Design", "Web App", "Integrations"],
    sections: [
      {
        title: "Challenge",
        body: "Describe the problem the client arrived with, the constraints on the engagement, and what success needed to look like.",
      },
      {
        title: "Approach",
        body: "Describe how the work was scoped and run: the research, the decisions that shaped the product, and why they were made.",
      },
      {
        title: "Outcome",
        body: "Describe what shipped and what changed for the business afterwards. Replace with real, verifiable results.",
      },
    ],
  },
  jobezi: {
    summary:
      "A jobs marketplace built mobile-first for candidates who apply between shifts.",
    services: ["UX Research", "Mobile App Design", "App Development", "Growth"],
    sections: [
      {
        title: "Challenge",
        body: "Describe the problem the client arrived with, the constraints on the engagement, and what success needed to look like.",
      },
      {
        title: "Approach",
        body: "Describe how the work was scoped and run: the research, the decisions that shaped the product, and why they were made.",
      },
      {
        title: "Outcome",
        body: "Describe what shipped and what changed for the business afterwards. Replace with real, verifiable results.",
      },
    ],
  },
  tambolens: {
    summary:
      "A direct-to-consumer storefront where the product photography does the selling.",
    services: ["Brand Identity", "Shopify Development", "Creative", "CRO"],
    sections: [
      {
        title: "Challenge",
        body: "Describe the problem the client arrived with, the constraints on the engagement, and what success needed to look like.",
      },
      {
        title: "Approach",
        body: "Describe how the work was scoped and run: the research, the decisions that shaped the product, and why they were made.",
      },
      {
        title: "Outcome",
        body: "Describe what shipped and what changed for the business afterwards. Replace with real, verifiable results.",
      },
    ],
  },
  assetflow: {
    summary:
      "A finance dashboard that turns portfolio data into decisions, not spreadsheets.",
    services: ["Product Design", "Design System", "Web App", "Data Viz"],
    sections: [
      {
        title: "Challenge",
        body: "Describe the problem the client arrived with, the constraints on the engagement, and what success needed to look like.",
      },
      {
        title: "Approach",
        body: "Describe how the work was scoped and run: the research, the decisions that shaped the product, and why they were made.",
      },
      {
        title: "Outcome",
        body: "Describe what shipped and what changed for the business afterwards. Replace with real, verifiable results.",
      },
    ],
  },
};
