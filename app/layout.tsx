import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/lib/data";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Mustafa Mahmoud — Full-Stack Web Developer | Next.js & Node.js",
    template: "%s | Mustafa Mahmoud",
  },
  description:
    "Mustafa Mahmoud is a full-stack web developer and Team Lead at Eaalim, building production-ready SaaS platforms, dashboards, and e-commerce apps with Next.js, React, Node.js, and Laravel. Based in Giza, Egypt — available for roles and freelance projects.",
  keywords: [
    "Mustafa Mahmoud",
    "Full-Stack Web Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Laravel Developer",
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
      "Full-stack developer & Team Lead at Eaalim. Building SaaS platforms, dashboards, and e-commerce with Next.js, Node.js, and Laravel — from code to production.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mustafa Mahmoud — Full-Stack Web Developer",
    description:
      "Full-stack developer & Team Lead at Eaalim. Next.js · Node.js · Laravel — from code to production.",
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
    "Laravel",
    "Firebase",
    "WebRTC",
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
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans bg-base text-body antialiased`}
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
