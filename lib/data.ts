// Central content for the portfolio — edit here to update copy across the site.

export type Stat = {
  value: string;
  unit?: string;
  label: string;
  gradient?: boolean;
};

export type Tech = {
  name: string;
  abbr: string;
  cat: string;
  delay: number;
};

export type Project = {
  title: string;
  desc: string;
  tags: string[];
  shot: string;
  status: string;
  statusColor: string;
  delay: number;
};

export type TimelineEntry = {
  period: string;
  role: string;
  org: string;
  detail: string;
  delay: number;
};

export type NavLink = { label: string; href: string };

// TODO: replace "#" with your real Resume / LinkedIn / GitHub URLs.
export const contactLinks = {
  email: "hello@mustafamahmoud.dev",
  resume: "#",
  linkedin: "#",
  github: "#",
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const stats: Stat[] = [
  { value: "2+", unit: "yrs", label: "building & shipping" },
  { value: "700+", label: "families served" },
  { value: "15+", label: "countries reached" },
  { value: "Team Lead", label: "@ Eaalim", gradient: true },
];

export const stack: Tech[] = [
  { name: "Next.js", abbr: "Nx", cat: "react framework", delay: 0 },
  { name: "React", abbr: "Re", cat: "ui library", delay: 50 },
  { name: "TypeScript", abbr: "Ts", cat: "typed js", delay: 100 },
  { name: "Node.js", abbr: "No", cat: "runtime", delay: 150 },
  { name: "Laravel", abbr: "La", cat: "php framework", delay: 200 },
  { name: "Firebase", abbr: "Fb", cat: "backend / auth", delay: 250 },
  { name: "MongoDB", abbr: "Mo", cat: "database", delay: 300 },
  { name: "Tailwind", abbr: "Tw", cat: "styling", delay: 350 },
];

export const projects: Project[] = [
  {
    title: "Eaalim Platform",
    desc: "A real-time learning platform with a custom WebRTC video classroom, interactive Quran reader, and full CMS — serving 700+ families across 15+ countries.",
    tags: ["Next.js", "WebRTC", "Node.js", "MongoDB"],
    shot: "[ classroom dashboard ]",
    status: "Live",
    statusColor: "#22D3EE",
    delay: 0,
  },
  {
    title: "Note-Taking App",
    desc: "A fast, offline-friendly notes app with real-time sync, rich-text editing, and instant search — built on Next.js and Firebase.",
    tags: ["Next.js", "Firebase", "TypeScript"],
    shot: "[ notes ui ]",
    status: "Live",
    statusColor: "#22D3EE",
    delay: 80,
  },
  {
    title: "eaalim-lessons",
    desc: "A structured lesson-marketplace and scheduling experience for tutors and students. Currently in active development.",
    tags: ["Next.js", "Laravel", "Tailwind"],
    shot: "[ lessons preview ]",
    status: "Coming soon",
    statusColor: "#A78BFA",
    delay: 160,
  },
];

export const timeline: TimelineEntry[] = [
  {
    period: "2025 — Present",
    role: "Team Lead",
    org: "Eaalim",
    detail:
      "Leading platform development end-to-end — architecture, real-time systems, and shipping to production. Mentoring developers and owning the technical roadmap.",
    delay: 0,
  },
  {
    period: "2024 — 2025",
    role: "Full-Stack Developer",
    org: "Eaalim",
    detail:
      "Built the WebRTC classroom and CMS, scaled the product to 700+ families, and took ownership of the full Next.js + Node.js stack.",
    delay: 90,
  },
  {
    period: "2023 — 2024",
    role: "Frontend Developer",
    org: "Eaalim",
    detail:
      "Joined as a self-taught developer, shipped interactive learning interfaces, and grew into full-stack ownership within months.",
    delay: 180,
  },
];
