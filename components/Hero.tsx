import WireframeSphere from "./WireframeSphere";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-[1320px] overflow-hidden px-[clamp(24px,6vw,72px)] pb-[110px] pt-24">
      {/* Accent grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-[200px] bottom-0 z-0 bg-[length:64px_64px] [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,#000_30%,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,#000_30%,transparent_75%)]"
      />
      {/* Aurora glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-[35%] z-0 h-[520px] w-[520px] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.28),transparent_65%)] blur-[40px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-10 z-0 h-[480px] w-[480px] animate-aurora-rev rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.24),transparent_65%)] blur-[50px]"
      />

      <div className="relative z-[2] grid min-h-[560px] grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="text-center md:text-left">
          <div
            data-reveal
            className="mb-[30px] inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-surface/50 px-3.5 py-[7px]"
          >
            <span className="h-[7px] w-[7px] animate-pulse2 rounded-full bg-cyan shadow-[0_0_10px_#22D3EE]" />
            <span className="font-mono text-xs tracking-[0.5px] text-body">
              Available for select projects
            </span>
          </div>

          <h1
            data-reveal
            className="m-0 mb-6 font-display text-[clamp(40px,5.4vw,72px)] font-bold leading-[1.02] tracking-[-0.02em] text-heading max-[860px]:text-[13vw]"
          >
            I build complete web apps — from{" "}
            <span className="gradient-text animate-grad">code to production</span>.
          </h1>

          <p
            data-reveal
            className="m-0 mb-7 mx-auto max-w-[540px] text-[clamp(16px,1.4vw,19px)] leading-[1.6] text-body md:mx-0"
          >
            Full-stack developer crafting SaaS platforms, dashboards, and
            e-commerce experiences with Next.js, Node.js, and Laravel —
            engineered for scale, shipped with care.
          </p>

          <div
            data-reveal
            className="mb-9 flex flex-wrap items-center justify-center gap-3.5 font-mono text-[13px] text-[#CBD5E1] md:justify-start"
          >
            <span className="font-semibold text-heading">Mustafa Mahmoud</span>
            <span className="text-[#334155]">/</span>
            <span className="text-body">
              Full-Stack Developer &amp; Team Lead @ Eaalim
            </span>
          </div>

          <div
            data-reveal
            className="flex flex-wrap justify-center gap-3.5 md:justify-start"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-br from-primary to-violet px-[26px] py-3.5 text-[15px] font-semibold text-heading no-underline shadow-[0_8px_30px_rgba(37,99,235,0.4)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.55)]"
            >
              View Work →
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/[0.14] bg-surface/50 px-[26px] py-3.5 text-[15px] font-semibold text-heading no-underline transition-all duration-200 hover:border-cyan/50 hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* 3D element */}
        <div className="relative order-first flex min-h-[300px] items-center justify-center md:order-none md:min-h-[480px]">
          <div className="absolute h-[62%] w-[62%] animate-float rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.4),rgba(124,58,237,0.2)_45%,transparent_70%)] blur-[34px]" />
          <div className="absolute h-[88%] w-[88%] animate-spin28 rounded-full border border-cyan/[0.12]" />
          <div className="absolute h-[70%] w-[70%] animate-spinr22 rounded-full border border-violet/[0.16]" />
          <WireframeSphere />
        </div>
      </div>
    </section>
  );
}
