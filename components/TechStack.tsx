import { stack } from "@/lib/data";

export default function TechStack() {
  return (
    <section className="relative mx-auto max-w-[1180px] px-[6vw] pb-[90px] pt-[70px]">
      <div
        data-reveal
        className="mb-[18px] font-mono text-[13px] tracking-[2px] text-cyan"
      >
        02 / STACK
      </div>
      <h2
        data-reveal
        className="m-0 mb-10 font-display text-[clamp(26px,3vw,38px)] font-bold tracking-[-0.02em] text-heading"
      >
        Tools I reach for daily
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-4">
        {stack.map((t) => (
          <div
            key={t.name}
            data-reveal
            style={{ animationDelay: `${t.delay}ms` }}
            className="group relative cursor-default rounded-2xl border border-white/[0.08] bg-surface/[0.55] px-[22px] py-6 glass transition-[transform,border-color,box-shadow] duration-[250ms] hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_12px_36px_rgba(37,99,235,0.22)]"
          >
            <div className="mb-4 flex h-[46px] w-[46px] items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-primary/25 to-violet/[0.18] font-mono text-[15px] font-semibold text-cyan">
              {t.abbr}
            </div>
            <div className="font-display text-[17px] font-semibold text-heading">
              {t.name}
            </div>
            <div className="mt-[5px] font-mono text-xs text-muted">{t.cat}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
