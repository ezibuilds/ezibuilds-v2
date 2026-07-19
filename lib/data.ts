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
    accent: "#5b3df6",
    textColor: "#fff",
    href: "#",
  },
  {
    slug: "hostelgo",
    client: "HostelGo",
    title: "HostelGo",
    category: "Marketplace",
    tags: ["DESIGN", "BUILD", "MOBILE"],
    year: "2025",
    accent: "#ff8a3d",
    textColor: "#0a0a0a",
    href: "#",
  },
  {
    slug: "fraudex",
    client: "FraudEx",
    title: "FraudEx",
    category: "AI Security",
    tags: ["BUILD", "AI", "SAAS"],
    year: "2025",
    accent: "#0d1b2a",
    textColor: "#fff",
    href: "#",
  },
  {
    slug: "jobezi",
    client: "JobEzi",
    title: "JobEzi",
    category: "Mobile App",
    tags: ["DESIGN", "BUILD", "MOBILE"],
    year: "2025",
    accent: "#ffd166",
    textColor: "#0a0a0a",
    href: "#",
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

export type ProjectEntry = {
  index: string;
  name: string;
  description: string;
  category: string;
  year: string;
};

export const projects: ProjectEntry[] = [
  {
    index: "01",
    name: "WaCRM",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A modern CRM platform built to scale customer operations.",
    category: "SaaS · CRM",
    year: "2025",
  },
  {
    index: "02",
    name: "HostelGo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A booking marketplace reimagined for the modern traveller.",
    category: "Marketplace · Travel",
    year: "2025",
  },
  {
    index: "03",
    name: "FraudEx",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. AI-powered fraud detection with real-time risk scoring.",
    category: "AI · Security",
    year: "2025",
  },
  {
    index: "04",
    name: "JobEzi",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mobile-first job marketplace connecting talent to opportunity.",
    category: "Mobile · Jobtech",
    year: "2025",
  },
  {
    index: "05",
    name: "Tambolens",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curated eyewear brand with a digital-first retail experience.",
    category: "D2C · Commerce",
    year: "2024",
  },
  {
    index: "06",
    name: "ArchGuard",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Construction-tech platform for managing on-site compliance.",
    category: "SaaS · ConTech",
    year: "2024",
  },
  {
    index: "07",
    name: "AssetFlow",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Asset management dashboard for finance and operations teams.",
    category: "Fintech · Dashboard",
    year: "2024",
  },
  {
    index: "08",
    name: "BrewGreen",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Direct-to-consumer coffee subscription with sustainability at its core.",
    category: "D2C · Subscription",
    year: "2024",
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
      "Their framework — design, build, launch — gave us clarity at every stage. Best agency engagement we have had.",
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
      "They treat quality like it is personal. The build, the polish, the motion — everything feels considered.",
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
    accent: "#5b3df6",
  },
  {
    name: "Maya Iyer",
    role: "Head of Design",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leads design systems and brand work for global clients.",
    accent: "#ff8a3d",
  },
  {
    name: "Rohan Verma",
    role: "Engineering Lead",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Full-stack engineer specialised in scalable SaaS architectures.",
    accent: "#0d1b2a",
  },
  {
    name: "Sneha Kapoor",
    role: "Product Strategist",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Translates customer insight into shipped product bets.",
    accent: "#ffd166",
  },
  {
    name: "Vikram Rao",
    role: "AI Solutions Architect",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Builds AI agents and automation tools for ops teams.",
    accent: "#7ad27a",
  },
  {
    name: "Tara Singh",
    role: "Growth Lead",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Performance marketing and lifecycle for D2C brands.",
    accent: "#ff5c8a",
  },
];
