import { stats } from "@/lib/data";

export default function Stats() {
  return (
    <section className="relative z-[2] mx-auto max-w-[1180px] px-[6vw]">
      <div
        data-reveal
        className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-px overflow-hidden rounded-[18px] border border-white/[0.08] bg-white/[0.07] glass"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="bg-surface/60 px-[26px] py-[30px]">
            <div
              className={`font-display text-[34px] font-bold ${
                stat.gradient ? "gradient-text-static" : "text-heading"
              }`}
            >
              {stat.value}
              {stat.unit ? (
                <span className="text-base text-cyan"> {stat.unit}</span>
              ) : null}
            </div>
            <div className="mt-1.5 font-mono text-xs tracking-[0.4px] text-muted">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
