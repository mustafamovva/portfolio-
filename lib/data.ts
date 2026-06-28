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
  image?: string;
  alt?: string;
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

// Site-wide config (used for SEO: metadata, sitemap, robots, JSON-LD).
// TODO: غيّر `url` لدومينك الحقيقي بعد ما تنشر على Vercel أو تشتري دومين.
export const siteConfig = {
  name: "Mustafa Mahmoud",
  url: "https://mustafamovva.vercel.app",
  jobTitle: "Full-Stack Web Developer",
  location: "Giza, Egypt",
  email: "mustafamovva@gmail.com",
  sameAs: [
    "https://www.linkedin.com/in/mustafa-movva/",
    "https://github.com/mustafamovva",
  ],
};

export const contactLinks = {
  email: "mustafamovva@gmail.com",
  resume: "/Mustafa-Mahmoud-CV.pdf",
  linkedin: "https://www.linkedin.com/in/mustafa-movva/",
  github: "https://github.com/mustafamovva",
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
  { name: "React", abbr: "Re", cat: "ui library", delay: 40 },
  { name: "TypeScript", abbr: "Ts", cat: "typed js", delay: 80 },
  { name: "Node.js", abbr: "No", cat: "runtime", delay: 120 },
  { name: "Laravel", abbr: "La", cat: "php framework", delay: 160 },
  { name: "PostgreSQL", abbr: "Pg", cat: "database", delay: 200 },
  { name: "MongoDB", abbr: "Mo", cat: "database", delay: 240 },
  { name: "Payload CMS", abbr: "Pa", cat: "headless cms", delay: 280 },
  { name: "Cloudflare", abbr: "Cf", cat: "cdn / edge", delay: 320 },
  { name: "Tailwind", abbr: "Tw", cat: "styling", delay: 360 },
];

export const projects: Project[] = [
  {
    title: "Eaalim Platform",
    desc: "A multilingual education platform built from scratch with Next.js 15, React 19, and a headless CMS (Payload + PostgreSQL) — featuring an interactive Quran reader, multi-layer caching, and full security hardening. Serves 700+ families across 15+ countries.",
    tags: ["Next.js 15", "Payload CMS", "PostgreSQL", "TypeScript"],
    shot: "[ education platform ]",
    image: "/projects/eaalim.png",
    alt: "Eaalim platform UI — multilingual education platform with a library, course pages, and an interactive Quran reader",
    status: "Live",
    statusColor: "#22D3EE",
    delay: 0,
  },
  {
    title: "Note-Taking App",
    desc: "An internal team tool for creating, editing, and managing notes — with authentication and real-time sync, built on Next.js, Firebase, and Firestore.",
    tags: ["Next.js", "Firebase", "Firestore"],
    shot: "[ notes ui ]",
    image: "/projects/notes.png",
    alt: "Note-taking app UI — notes sidebar, rich-text editor, and search",
    status: "Live",
    statusColor: "#22D3EE",
    delay: 80,
  },
  {
    title: "eaalim-lessons",
    desc: "A new product I'm building at Eaalim to expand the platform's learning experience. Currently in active development.",
    tags: ["Next.js", "Laravel", "Tailwind"],
    shot: "[ lessons preview ]",
    image: "/projects/lessons.png",
    alt: "eaalim-lessons UI — tutor marketplace with course cards and a lesson booking calendar",
    status: "Coming soon",
    statusColor: "#A78BFA",
    delay: 160,
  },
];

export const timeline: TimelineEntry[] = [
  {
    period: "Apr 2025 — Present",
    role: "Full-Stack Web Developer & Team Lead",
    org: "Eaalim",
    detail:
      "Lead a 3-developer team and own the platform end-to-end. Built a multilingual (EN/AR/FR, RTL) education platform with Next.js 15 and a Payload + PostgreSQL headless CMS, an interactive Quran reader, multi-layer caching (TTFB 480ms → 50ms), and full security hardening — serving 700+ families across 15+ countries.",
    delay: 0,
  },
  {
    period: "Jan 2024 — Apr 2025",
    role: "Frontend Developer",
    org: "Eaalim",
    detail:
      "Joined as a self-taught developer and shipped responsive, high-performance interfaces with Next.js, React, and Tailwind — then grew into full-stack ownership and a lead role.",
    delay: 90,
  },
];
