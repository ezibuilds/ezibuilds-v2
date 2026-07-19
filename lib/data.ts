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

export const works: Work[] = [
  {
    slug: "oreo-pacman",
    client: "Oreo x Pacman",
    title: "Oreo x Pacman",
    category: "AR Experience",
    tags: ["DIGITAL", "AR", "GAMING", "IMMERSIVE"],
    year: "2024",
    accent: "#1c1c1c",
    textColor: "#fff",
    href: "https://www.formandfun.co/oreo-pacman",
  },
  {
    slug: "doordash-sodp",
    client: "Doordash",
    title: "Summer of Dashpass",
    category: "Campaign",
    tags: ["DIGITAL", "EXPERIENTIAL", "MOTION"],
    year: "2024",
    accent: "#ff2d55",
    textColor: "#fff",
    href: "https://www.formandfun.co/doordash-sodp",
  },
  {
    slug: "widllet",
    client: "Widllet",
    title: "Widllet",
    category: "Brand Identity, App",
    tags: ["BRAND", "DIGITAL"],
    year: "2025",
    accent: "#f4f1ea",
    textColor: "#0a0a0a",
    href: "#",
    comingSoon: true,
  },
  {
    slug: "powerade-mindzone",
    client: "Powerade",
    title: "Mindzone",
    category: "VR Experience",
    tags: ["VR", "IMMERSIVE", "GEN-AI", "SPATIAL"],
    year: "2024",
    accent: "#0b3d91",
    textColor: "#fff",
    href: "https://www.formandfun.co/powerade-mind-zone",
  },
];

export const categories = [
  "DIGITAL",
  "EXPERIENTIAL",
  "MOTION",
  "SPATIAL",
  "VR",
  "GEN-AI",
  "AR",
  "GAMING",
  "VIRTUAL-FASHION",
  "IMMERSIVE",
  "BRAND",
];

export type Award = {
  index: string;
  title: string;
  project: string;
  category: string;
  year: string;
};

export const awards: Award[] = [
  {
    index: "01",
    title: "Awwwards",
    project: "Form&Fun Portfolio",
    category: "1x Site of the Day\n1x Portfolio Honors\n1x Developer Award\n1x Honorable Mention",
    year: "2025",
  },
  {
    index: "02",
    title: "Webby Awards",
    project: "Powerade Mind Zone",
    category: "AI, Immersive & Games",
    year: "2025",
  },
  {
    index: "03",
    title: "Clio Awards — Gold",
    project: "Oreo & Pacman Supermarcade",
    category: "Interactive/Experiental",
    year: "2025",
  },
  {
    index: "04",
    title: "3x Clio Awards — Shortlist",
    project: "Oreo & Pacman Supermarcade",
    category: "1x Entertainment\n1x Use of New Realities",
    year: "2025",
  },
  {
    index: "05",
    title: "Auggie Award",
    project: "Oreo & Pacman Supermarcade",
    category: "Best Campaign",
    year: "2025",
  },
  {
    index: "06",
    title: "3x ADC Festival  — Silver",
    project: "Oreo & Pacman Supermarcade",
    category: "1x Craft AR/VR\n1x Digital Out of Home\n1x Point-of-Sale Media",
    year: "2025",
  },
  {
    index: "07",
    title: "2x ADC Festival  — Bronze",
    project: "Oreo & Pacman Supermarcade",
    category: "1x Gaming Experiences\n1x Craft for Spatial Experiences AR/VR",
    year: "2025",
  },
  {
    index: "08",
    title: "Clio Awards — Silver",
    project: "Powerade Mind Zone",
    category: "Digital/Mobile",
    year: "2024",
  },
  {
    index: "09",
    title: "Cannes Lions — Bronze",
    project: "Oreo & Pacman Supermarcade",
    category: "Outdoor",
    year: "2024",
  },
  {
    index: "10",
    title: "4x Cannes Lions — Shortlist",
    project: "Oreo & Pacman Supermarcade",
    category: "Outdoor",
    year: "2024",
  },
  {
    index: "11",
    title: "New York Festivals — Bronze",
    project: "Oreo & Pacman Supermarcade",
    category: "Digital/Mobile: Best use",
    year: "2024",
  },
];

export const expertise = {
  Technology: [
    "Spatial Computing (AR, VR, XR)",
    "AI Tools & Experiences",
    "Web Development",
    "WebGL Experiences",
    "Web3 / Blockchain",
    "Game Development",
    "Rapid Prototyping",
  ],
  Design: [
    "Creative Direction",
    "Art Direction",
    "User Experience Design",
    "User Interface Design",
    "Brand Identity",
    "Design Systems",
    "Concept Design",
  ],
  "Motion & CGI": [
    "2D & 3D Animation",
    "2D & 3D Illustration",
    "Concept Art",
    "FOOH",
    "Character Design",
    "Motion Identity",
  ],
};

export type TrustedLogo = {
  name: string;
  white: string;
  color?: string;
};

export const trustedBy: TrustedLogo[] = [
  { name: "Powerade", white: "/logos/powerade.svg", color: "/logos/powerade-color.svg" },
  { name: "Spotify", white: "/logos/spotify-white.svg", color: "/logos/spotify.svg" },
  { name: "Doordash", white: "/logos/doordash-white.svg", color: "/logos/doordash.svg" },
  { name: "Oreo", white: "/logos/oreo-white.svg", color: "/logos/oreo.svg" },
  { name: "Google", white: "/logos/google-white.svg", color: "/logos/google.svg" },
  { name: "Ogilvy", white: "/logos/ogilvy-white.svg", color: "/logos/ogilvy.svg" },
  { name: "Coca-Cola", white: "/logos/cocacola-white.svg", color: "/logos/cocacola.svg" },
  { name: "Saatchi & Saatchi", white: "/logos/saatchi-white.svg", color: "/logos/saatchi.svg" },
];
