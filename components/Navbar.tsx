import Link from "next/link";
import { navLinks, contactLinks } from "@/lib/data";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-[60] flex items-center justify-between px-[6vw] py-4 glass-nav border-b border-white/[0.08] bg-base/60">
      <Link href="#top" className="flex items-center gap-2.5 no-underline">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary to-violet font-display text-[15px] font-bold tracking-[0.5px] text-heading shadow-[0_0_24px_rgba(37,99,235,0.5)]">
          MM
        </span>
        <span className="font-mono text-xs tracking-[1px] text-muted">
          mustafa.dev
        </span>
      </Link>

      <div className="hidden items-center gap-[34px] md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-body no-underline transition-colors duration-200 hover:text-heading"
          >
            {link.label}
          </Link>
        ))}
        <a
          href={contactLinks.resume}
          className="inline-flex items-center gap-2 rounded-[10px] border border-white/[0.12] bg-surface/60 px-[18px] py-[9px] text-[13px] font-semibold text-heading no-underline transition-all duration-200 hover:border-cyan/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
