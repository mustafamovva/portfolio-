import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section
      id="work"
      className="relative mx-auto max-w-[1180px] px-[6vw] pb-[90px] pt-[70px]"
    >
      <div
        data-reveal
        className="mb-[18px] font-mono text-[13px] tracking-[2px] text-cyan"
      >
        03 / SELECTED WORK
      </div>
      <h2
        data-reveal
        className="m-0 mb-10 font-display text-[clamp(26px,3vw,38px)] font-bold tracking-[-0.02em] text-heading"
      >
        Featured projects
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-6">
        {projects.map((p) => (
          <div
            key={p.title}
            data-reveal
            style={{ animationDelay: `${p.delay}ms` }}
            className="relative flex flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-surface/[0.55] glass transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-cyan/40 hover:shadow-[0_20px_50px_rgba(37,99,235,0.25)]"
          >
            {/* Project mockup placeholder — TODO: drop a real screenshot here */}
            <div className="relative flex h-[190px] items-end justify-between border-b border-white/[0.06] bg-[#0c1322] p-4 [background-image:repeating-linear-gradient(45deg,rgba(34,211,238,0.06)_0_2px,transparent_2px_14px)]">
              <span className="font-mono text-[11px] text-faint">{p.shot}</span>
              <span
                className="rounded-full border border-white/[0.12] bg-base/60 px-2.5 py-[5px] font-mono text-[11px]"
                style={{ color: p.statusColor }}
              >
                {p.status}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="m-0 mb-2.5 font-display text-[21px] font-bold text-heading">
                {p.title}
              </h3>
              <p className="m-0 mb-[18px] flex-1 text-[14.5px] leading-[1.6] text-body">
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-primary/[0.22] bg-primary/[0.12] px-[11px] py-[5px] font-mono text-[11px] text-[#93C5FD]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
