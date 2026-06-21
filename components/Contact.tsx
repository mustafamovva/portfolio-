import { contactLinks } from "@/lib/data";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto mt-10 max-w-[1100px] px-[6vw]"
    >
      <div
        data-reveal
        className="relative overflow-hidden rounded-[28px] border border-white/10 bg-surface/50 px-[clamp(28px,5vw,72px)] py-[clamp(40px,6vw,84px)] text-center glass-strong"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[120px] left-1/2 h-[340px] w-[560px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(37,99,235,0.35),rgba(124,58,237,0.18)_45%,transparent_70%)] blur-[40px]"
        />
        <div className="relative">
          <div className="mb-[18px] font-mono text-[13px] tracking-[2px] text-cyan">
            05 / CONTACT
          </div>
          <h2 className="mx-auto m-0 mb-5 max-w-[680px] font-display text-[clamp(32px,4.6vw,58px)] font-bold leading-[1.05] tracking-[-0.02em] text-heading">
            Have something to build? Let&apos;s make it real.
          </h2>
          <p className="mx-auto m-0 mb-9 max-w-[520px] text-[17px] leading-[1.6] text-body">
            I&apos;m open to full-stack roles and ambitious freelance projects.
            Drop a line — I reply fast.
          </p>
          <a
            href={`mailto:${contactLinks.email}`}
            className="inline-flex items-center gap-2.5 rounded-[14px] bg-gradient-to-br from-primary to-violet px-8 py-4 text-base font-semibold text-heading no-underline shadow-[0_10px_36px_rgba(37,99,235,0.45)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_46px_rgba(37,99,235,0.6)]"
          >
            {contactLinks.email}
          </a>
          <div className="mt-[30px] flex flex-wrap justify-center gap-3.5">
            <a
              href={contactLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[11px] border border-white/[0.12] bg-base/50 px-[22px] py-[11px] font-mono text-[13px] text-[#CBD5E1] no-underline transition-all duration-200 hover:border-cyan/50 hover:text-heading"
            >
              LinkedIn ↗
            </a>
            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[11px] border border-white/[0.12] bg-base/50 px-[22px] py-[11px] font-mono text-[13px] text-[#CBD5E1] no-underline transition-all duration-200 hover:border-cyan/50 hover:text-heading"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
