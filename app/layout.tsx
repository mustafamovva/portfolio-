import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
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
  title: "Mustafa Mahmoud — Full-Stack Web Developer",
  description:
    "Full-stack developer crafting SaaS platforms, dashboards, and e-commerce experiences with Next.js, Node.js, and Laravel — engineered for scale, shipped with care.",
  openGraph: {
    title: "Mustafa Mahmoud — Full-Stack Web Developer",
    description:
      "Full-stack developer crafting SaaS platforms, dashboards, and e-commerce experiences — from code to production.",
    type: "website",
  },
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
      </body>
    </html>
  );
}
