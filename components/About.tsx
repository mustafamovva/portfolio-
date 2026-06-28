import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-[1180px] px-[6vw] pb-[90px] pt-[130px]"
    >
      <div
        data-reveal
        className="mb-[18px] font-mono text-[13px] tracking-[2px] text-cyan"
      >
        01 / ABOUT
      </div>
      <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[0.9fr_1.4fr]">
        {/* Portrait / full-stack illustration (temporary — swap with a real photo later) */}
        <div data-reveal className="relative">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/40 to-violet/30 blur-[26px]" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-white/10 bg-[#0d1424]">
            <Image
              src="/about.png"
              alt="Mustafa Mahmoud — full-stack web developer building front-end and back-end"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover"
            />
          </div>
        </div>

        <div data-reveal>
          <h2 className="m-0 mb-[22px] font-display text-[clamp(28px,3.4vw,42px)] font-bold leading-[1.12] tracking-[-0.02em] text-heading">
            Self-taught full-stack developer who grew into a Team Lead.
          </h2>
          <p className="m-0 mb-[18px] text-base leading-[1.7] text-body">
            I started by teaching myself to code and never stopped shipping.
            Within two years, I went from Frontend Developer to Team Lead at{" "}
            <span className="text-[#CBD5E1]">Eaalim</span>, where I lead the
            development of a multilingual education platform serving 700+ families
            across 15+ countries — owning everything from architecture to
            production.
          </p>
          <p className="m-0 mb-[30px] text-base leading-[1.7] text-body">
            I care about clean systems, performance, and security. I built the
            platform on Next.js 15 with a headless CMS (Payload + PostgreSQL),
            engineered multi-layer caching that cut response times dramatically,
            and hardened it with CSP, CSRF protection, and rate limiting —
            building the whole stack and taking it all the way to deployment.
          </p>
          <div className="flex flex-wrap gap-[30px]">
            <div>
              <div className="font-display text-[15px] font-semibold text-heading">
                Architecture → Deploy
              </div>
              <div className="mt-1 font-mono text-xs text-muted">
                end-to-end ownership
              </div>
            </div>
            <div>
              <div className="font-display text-[15px] font-semibold text-heading">
                Performance &amp; Security
              </div>
              <div className="mt-1 font-mono text-xs text-muted">
                caching · CSP · RBAC
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
