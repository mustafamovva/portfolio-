// Central content for the portfolio. The shapes here follow the drawing-set
// conventions the site is built on: a bill of materials for the stack, a
// revision history for the career, numbered notes for the write-up.

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
  phone: "+20 155 273 5127",
  resume: "/Mustafa-Mahmoud-CV.pdf",
  linkedin: "https://www.linkedin.com/in/mustafa-movva/",
  github: "https://github.com/mustafamovva",
};

/* ---- Sheet A-101: the quantities, drawn as dimensions ---- */
export type Measure = { value: string; label: string };

export const measures: Measure[] = [
  { value: "2+", label: "years shipping" },
  { value: "700+", label: "families served" },
  { value: "15+", label: "countries reached" },
  { value: "3", label: "languages supported" },
];

/* ---- Sheet A-201: general notes ---- */
export const generalNotes: string[] = [
  "Self-taught. I learned by building things that had to work, not by collecting certificates, and I still have no degree — the work is the argument.",
  "Joined Eaalim Institute in January 2024 as a frontend developer. Fifteen months later I was leading the team.",
  "I now lead three developers and own the platform end to end, from the PostgreSQL data layer and the API up to the interface people actually touch.",
  "Two products are in daily production use: eaalim.com and eaalim.com/lessons, serving 700+ families across 15+ countries in Arabic, English and French.",
  "I keep building in the open to stay sharp. LinkFlow is live and its source is public.",
  "Open to freelance work and full-time roles, remote or in Egypt.",
];

/* ---- Sheet A-301: bill of materials ---- */
export type Part = {
  item: string;
  qty: string;
  name: string;
  spec: string;
};

export const billOfMaterials: Part[] = [
  { item: "001", qty: "1", name: "Next.js", spec: "v16 · App Router, Server Components" },
  { item: "002", qty: "1", name: "React", spec: "v19" },
  { item: "003", qty: "1", name: "TypeScript", spec: "strict mode throughout" },
  { item: "004", qty: "1", name: "Node.js", spec: "server runtime" },
  { item: "005", qty: "1", name: "tRPC", spec: "end-to-end typed API layer" },
  { item: "006", qty: "1", name: "Prisma", spec: "ORM · schema migrations" },
  { item: "007", qty: "1", name: "PostgreSQL", spec: "primary datastore" },
  { item: "008", qty: "1", name: "Payload CMS", spec: "headless · 15+ collections, RBAC" },
  { item: "009", qty: "1", name: "Stripe", spec: "subscription billing" },
  { item: "010", qty: "1", name: "Cloudflare", spec: "CDN · R2 · Turnstile" },
  { item: "011", qty: "1", name: "Tailwind CSS", spec: "styling system" },
  { item: "012", qty: "1", name: "Firebase", spec: "auth · Firestore" },
];

/* ---- Sheets A-401 … A-404: detail drawings ---- */
export type Project = {
  mark: string;
  title: string;
  desc: string;
  tags: string[];
  image?: string;
  alt?: string;
  status: string;
  href?: string;
  repo?: string;
  domain?: string;
  highlight?: string;
  period?: string;
  /** Annotations pointing at what matters in the drawing. */
  notes: string[];
};

export const projects: Project[] = [
  {
    mark: "A",
    title: "Eaalim Platform",
    desc: "The institute's main platform, teaching Quran, Tajweed and Arabic across 15+ countries. Its centrepiece is Mushaf Aalim, a colour-coded Qur'an that highlights each syllable as a beginner reads. I started on the frontend and now lead the platform end to end.",
    tags: ["Next.js 15", "React 19", "Payload CMS", "PostgreSQL", "TypeScript"],
    image: "/projects/eaalim.png",
    alt: "Eaalim platform home page — an online Quran school with course, pricing and library navigation, and the Mushaf Aalim colour-coded reader",
    status: "In production",
    href: "https://eaalim.com",
    domain: "eaalim.com",
    highlight: "700+ families · 15+ countries · 3 languages",
    period: "2024 — present",
    notes: [
      "Headless CMS on Payload + PostgreSQL, 15+ collections with role-based access",
      "Multi-layer caching: Next.js ISR behind Cloudflare edge",
      "Full RTL alongside English and French, with per-locale routing",
    ],
  },
  {
    mark: "B",
    title: "Eaalim Lessons",
    desc: "An interactive learning product built on a modular-monolith and plugin architecture, with a drag-and-drop lesson builder and server-scored attempts.",
    tags: ["Next.js 16", "tRPC", "Prisma", "PostgreSQL", "Stripe"],
    image: "/projects/lessons.png",
    alt: "Eaalim Lessons admin dashboard — active students, completion rate and enrollment trend for the learning platform",
    status: "In production",
    href: "https://eaalim.com/lessons",
    domain: "eaalim.com/lessons",
    highlight: "55 lesson-block types · drag-and-drop builder",
    period: "2026 — present",
    notes: [
      "55 reusable lesson-block types behind one plugin interface",
      "Stripe subscription billing with a full CI and testing pipeline",
      "Internationalised end to end, right-to-left included",
    ],
  },
  {
    mark: "C",
    title: "LinkFlow",
    desc: "A URL shortener with analytics, taken all the way from an empty README to a deployed product in fifteen days. Open source.",
    tags: ["Next.js 16", "tRPC", "Prisma", "PostgreSQL", "NextAuth"],
    image: "/projects/linkflow.png",
    alt: "LinkFlow home page — paste a long URL and get a short link, with click, device and referrer analytics behind it",
    status: "Live · open source",
    href: "https://link-flow-movva.vercel.app",
    repo: "https://github.com/mustafamovva/link-flow",
    domain: "link-flow-movva.vercel.app",
    highlight: "Built and shipped in 15 days",
    period: "2026",
    notes: [
      "Click tracking by device, browser and referrer, charted per link",
      "GitHub auth so each account sees only its own links",
      "Redirects use 302, not 301 — a 301 gets cached and the count stops",
    ],
  },
  {
    mark: "D",
    title: "Support Notes",
    desc: "An internal tool the support team at Eaalim writes and keeps its notes in, with accounts and real-time sync across devices. Built for a need the team actually had.",
    tags: ["Next.js", "Firebase", "Firestore"],
    image: "/projects/notes.png",
    alt: "Support Notes sign-in screen — the internal note-taking tool built for the Eaalim team",
    status: "In use",
    domain: "internal tool",
    highlight: "Used across the team at Eaalim",
    period: "2025",
    notes: [
      "Firebase Auth with Firestore, so notes sync between devices as they are written",
      "Accounts are keyed to the team's own domain, so signing in is one field",
    ],
  },
];

/* ---- Sheet A-501: revision history ---- */
export type Revision = {
  rev: string;
  date: string;
  description: string;
  by: string;
};

export const revisions: Revision[] = [
  {
    rev: "00",
    date: "Jan 2024",
    description:
      "Issued for construction. Joined Eaalim Institute as a frontend developer, building production interfaces with Next.js, React and Tailwind.",
    by: "MM",
  },
  {
    rev: "01",
    date: "Feb 2024",
    description:
      "Eaalim Platform started. Contributed the multilingual interface across Arabic, English and French, and the reusable component set behind it.",
    by: "MM",
  },
  {
    rev: "02",
    date: "Apr 2025",
    description:
      "Scope extended to full stack. Promoted to Team Lead — three developers, and ownership of the platform from the data layer up.",
    by: "MM",
  },
  {
    rev: "03",
    date: "2025",
    description:
      "Platform architecture reissued: headless Payload CMS on PostgreSQL, multi-layer caching, and security hardening across the stack.",
    by: "MM",
  },
  {
    rev: "04",
    date: "Apr 2026",
    description:
      "Eaalim Lessons issued to production — modular-monolith and plugin architecture, 55 lesson-block types, Stripe billing.",
    by: "MM",
  },
  {
    rev: "05",
    date: "Aug 2026",
    description:
      "LinkFlow released and opened. First of a public series, built end to end in fifteen days.",
    by: "MM",
  },
];
