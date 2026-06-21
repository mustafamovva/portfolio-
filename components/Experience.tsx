import { timeline } from "@/lib/data";

export default function Experience() {
  return (
    <section className="relative mx-auto max-w-[900px] px-[6vw] pb-[90px] pt-[70px]">
      <div
        data-reveal
        className="mb-[18px] font-mono text-[13px] tracking-[2px] text-cyan"
      >
        04 / EXPERIENCE
      </div>
      <h2
        data-reveal
        className="m-0 mb-[46px] font-display text-[clamp(26px,3vw,38px)] font-bold tracking-[-0.02em] text-heading"
      >
        From first commit to Team Lead
      </h2>
      <div className="relative pl-[34px]">
        <div className="absolute bottom-1.5 left-[7px] top-1.5 w-0.5 bg-[linear-gradient(180deg,#22D3EE,#7C3AED,transparent)]" />
        {timeline.map((e) => (
          <div
            key={e.period}
            data-reveal
            style={{ animationDelay: `${e.delay}ms` }}
            className="relative pb-[38px]"
          >
            <div className="absolute -left-[34px] top-1 h-4 w-4 rounded-full border-2 border-cyan bg-base shadow-[0_0_14px_rgba(34,211,238,0.6)]" />
            <div className="mb-2 font-mono text-xs text-cyan">{e.period}</div>
            <div className="font-display text-[19px] font-semibold text-heading">
              {e.role}
            </div>
            <div className="mb-2.5 mt-[3px] text-sm text-muted">{e.org}</div>
            <p className="m-0 max-w-[560px] text-[14.5px] leading-[1.6] text-body">
              {e.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
