# Mustafa Mahmoud — Portfolio

A premium, dark-mode personal portfolio for **Mustafa Mahmoud**, Full-Stack Web
Developer & Team Lead at Eaalim. Built with **Next.js (App Router) + TypeScript +
Tailwind CSS**, implemented from the design exported via Claude Design.

## Tech stack

- **Next.js 14** (App Router, static-rendered single page)
- **TypeScript** (strict)
- **Tailwind CSS** with a custom theme (exact brand palette, fonts, keyframes)
- **next/font** for Space Grotesk, Inter, and JetBrains Mono (self-hosted)
- Interactive wireframe-sphere hero rendered on `<canvas>` (client component)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Project structure

```
app/
  layout.tsx        # fonts, metadata, global shell
  page.tsx          # assembles all sections in order
  globals.css       # base styles + CSS scroll-reveal + glass/gradient utilities
components/
  Navbar.tsx        # sticky glass navbar (MM logo, links, Resume)
  Hero.tsx          # headline, CTAs, aurora glow, grid, orbital rings
  WireframeSphere.tsx  # canvas sphere that reacts to the cursor ("use client")
  Stats.tsx         # 2+ yrs · 700+ families · 15+ countries · Team Lead
  About.tsx         # story + avatar placeholder
  TechStack.tsx     # 8 glowing tech cards
  Projects.tsx      # 3 featured project cards
  Experience.tsx    # vertical timeline
  Contact.tsx       # CTA panel + email/LinkedIn/GitHub
  Footer.tsx
lib/
  data.ts           # all copy/content (stats, stack, projects, timeline, links)
```

All editable content lives in **`lib/data.ts`** — update copy there rather than
in the components.

## Design fidelity

The visual design (colors, type, spacing, animations) is ported faithfully from
the prototype in `project/Portfolio.dc.html`. Key choices:

- Exact palette: `#0A0E1A` background, `#2563EB`/`#7C3AED`/`#22D3EE` accents,
  `#F8FAFC` headings, `#94A3B8` body — defined as Tailwind theme tokens in
  `tailwind.config.ts`.
- Scroll-reveal uses **CSS scroll-driven animations** (`animation-timeline:
  view()`), matching the prototype's final approach, with content visible by
  default so it can never be stranded hidden and degrades gracefully where the
  feature is unsupported. Honors `prefers-reduced-motion`.

## TODO — swap in real content

These placeholders are intentional (kept per the original design hand-off):

- **Avatar portrait** — striped placeholder in `components/About.tsx`.
- **Project screenshots** — striped placeholders in `components/Projects.tsx`.
- **Links** — `resume`, `linkedin`, and `github` are `#` in `lib/data.ts`; set
  them to your real URLs.

## Design source

The original Claude Design export is preserved for reference:

- `project/Portfolio.dc.html` — the exported HTML/JS prototype
- `chats/` — the design conversation transcript
