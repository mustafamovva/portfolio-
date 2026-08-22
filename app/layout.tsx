import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { siteConfig } from "@/lib/data";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Mustafa Mahmoud — Full-Stack Web Developer | Next.js & Node.js",
    template: "%s | Mustafa Mahmoud",
  },
  description:
    "Mustafa Mahmoud is a full-stack web developer and Team Lead at Eaalim, building complete, production-ready web apps with Next.js, React, TypeScript, Node.js, and tRPC. Based in Giza, Egypt — available for roles and freelance projects.",
  keywords: [
    "Mustafa Mahmoud",
    "Full-Stack Web Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "Frontend Developer Egypt",
    "Web Developer Egypt",
    "Team Lead Eaalim",
    "SaaS Developer",
    "hire full-stack developer",
  ],
  authors: [{ name: "Mustafa Mahmoud", url: siteConfig.url }],
  creator: "Mustafa Mahmoud",
  publisher: "Mustafa Mahmoud",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "Mustafa Mahmoud",
    title: "Mustafa Mahmoud — Full-Stack Web Developer",
    description:
      "Full-stack developer & Team Lead at Eaalim. Building complete web apps with Next.js, TypeScript, and Node.js — from code to production.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mustafa Mahmoud — Full-Stack Web Developer",
    description:
      "Full-stack developer & Team Lead at Eaalim. Next.js · TypeScript · Node.js — from code to production.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mustafa Mahmoud",
  url: siteConfig.url,
  jobTitle: "Full-Stack Web Developer",
  email: `mailto:${siteConfig.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Giza",
    addressCountry: "EG",
  },
  worksFor: { "@type": "Organization", name: "Eaalim" },
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "tRPC",
    "Prisma",
    "PostgreSQL",
    "Firebase",
    "Full-Stack Web Development",
  ],
  sameAs: siteConfig.sameAs,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${plexMono.variable} bg-table font-sans text-ink antialiased`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
