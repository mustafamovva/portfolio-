import type { ReactNode } from "react";

/**
 * The vocabulary of a drawing set, as components.
 *
 * Each one is a real drafting convention rather than an invented decoration,
 * and each is used where its meaning actually applies: dimensions measure
 * quantities, callouts point at the sheet that details them, redlines carry
 * the corrections a person wrote in the margin.
 */

/* ---------------------------------------------------------------- *
 * Sheet frame — the ruled border every drawing is printed inside,
 * with its number and title in the strip along the top edge.
 * ---------------------------------------------------------------- */
export function SheetFrame({
  code,
  title,
  scale = "1:1",
  invert = false,
  index,
  total,
  children,
  className = "",
}: {
  code: string;
  title: string;
  scale?: string;
  invert?: boolean;
  index: number;
  total: number;
  children: ReactNode;
  className?: string;
}) {
  const line = invert ? "border-blueprint-3/50" : "border-ink-4";
  const faint = invert ? "text-blueprint-2" : "text-ink-3";
  const strong = invert ? "text-blueprint-line" : "text-ink";

  return (
    <div
      className={`relative flex h-full w-full flex-col border ${line} ${className}`}
    >
      {/* Corner registration marks */}
      {(
        [
          "left-0 top-0 border-l-2 border-t-2",
          "right-0 top-0 border-r-2 border-t-2",
          "left-0 bottom-0 border-b-2 border-l-2",
          "right-0 bottom-0 border-b-2 border-r-2",
        ] as const
      ).map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={`pointer-events-none absolute h-4 w-4 ${pos} ${
            invert ? "border-blueprint-2" : "border-ink-2"
          }`}
        />
      ))}

      {/* Top strip: sheet number, title, scale */}
      <div
        className={`flex shrink-0 items-center justify-between gap-4 border-b ${line} px-4 py-2 sm:px-6`}
      >
        <div className="flex items-baseline gap-3 sm:gap-5">
          <span className={`lettering ${strong} font-medium`}>{code}</span>
          <span className={`lettering ${faint} truncate`}>{title}</span>
        </div>
        <span className={`lettering ${faint} hidden shrink-0 sm:inline`}>
          SCALE {scale}
        </span>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>

      {/*
       * Title block. On a real drawing it is printed inside the border in the
       * bottom-right corner, which is exactly where it belongs here too — as a
       * floating overlay it covered the corner of whichever sheet was on top.
       */}
      <div
        className={`flex shrink-0 items-stretch justify-between border-t ${line}`}
      >
        <div className="hidden min-w-0 items-center gap-3 px-4 sm:flex sm:px-6">
          <span
            className={`font-display text-[12.5px] font-bold uppercase tracking-[0.08em] ${strong}`}
          >
            Mustafa Mahmoud
          </span>
          <span aria-hidden className={`h-3 w-px ${invert ? "bg-blueprint-3" : "bg-ink-4"}`} />
          <span className={`lettering truncate ${faint}`}>
            Full-stack web developer · Giza, EG
          </span>
        </div>

        <div className={`flex ${invert ? "divide-blueprint-3/50" : "divide-ink-4"} divide-x`}>
          {[
            { k: "Drawn by", v: "M. Mahmoud" },
            { k: "Sheet", v: code },
            { k: "Of", v: `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}` },
            { k: "Rev", v: "08 · 26" },
          ].map((cell, i) => (
            <div
              key={cell.k}
              className={`px-3 py-1.5 sm:px-4 ${i === 0 ? `border-l ${line} hidden sm:block` : ""}`}
            >
              <div className={`lettering ${faint}`}>{cell.k}</div>
              <div className={`lettering mt-0.5 font-medium tabular-nums ${strong}`}>
                {cell.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Dimension line — measures a quantity the way a drawing measures a
 * part: extension ticks at both ends, the value sitting on the line.
 * ---------------------------------------------------------------- */
export function Dimension({
  value,
  label,
  invert = false,
  className = "",
}: {
  value: string;
  label: string;
  invert?: boolean;
  className?: string;
}) {
  const rule = invert ? "bg-blueprint-3" : "bg-ink-3";
  const text = invert ? "text-blueprint-line" : "text-ink";
  const sub = invert ? "text-blueprint-2" : "text-ink-3";

  return (
    <div className={`min-w-[8rem] flex-1 ${className}`}>
      <div
        className={`font-display text-[clamp(28px,3.6vw,44px)] font-bold leading-none tracking-[-0.03em] tabular-nums ${text}`}
      >
        {value}
      </div>
      {/* the measured span */}
      <div aria-hidden className="mt-2.5 flex items-center gap-0">
        <span className={`h-2.5 w-px ${rule}`} />
        <span className={`h-px flex-1 ${rule}`} />
        <span className={`h-2.5 w-px ${rule}`} />
      </div>
      <div className={`lettering mt-2 ${sub}`}>{label}</div>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Detail callout — the circled region that says "this is drawn at
 * full size on another sheet". It is also literally where the next
 * sheet zooms out of, so the convention and the navigation agree.
 * ---------------------------------------------------------------- */
export function Callout({
  mark,
  sheet,
  invert = false,
  className = "",
}: {
  mark: string;
  sheet: string;
  invert?: boolean;
  className?: string;
}) {
  const stroke = invert ? "border-blueprint-2" : "border-redline";
  const text = invert ? "text-blueprint-line" : "text-redline";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-dashed ${stroke}`}
      >
        <span className={`lettering font-medium ${text}`}>{mark}</span>
      </span>
      <span aria-hidden className={`h-px w-8 ${invert ? "bg-blueprint-2" : "bg-redline"}`} />
      <span className={`lettering ${text}`}>
        SEE {sheet}
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Redline — the annotation layer. A leader line and a hand-added
 * note, in the red every set of drawing corrections is marked in.
 * ---------------------------------------------------------------- */
export function Redline({
  children,
  side = "left",
  className = "",
}: {
  children: ReactNode;
  side?: "left" | "right";
  className?: string;
}) {
  return (
    <div
      className={`flex items-start gap-2.5 ${
        side === "right" ? "flex-row-reverse text-right" : ""
      } ${className}`}
    >
      <svg
        aria-hidden
        viewBox="0 0 28 22"
        className="mt-[3px] h-5 w-7 shrink-0 text-redline"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d={side === "right" ? "M27 4 6 4 1 18" : "M1 4h21l5 14"} />
        <circle cx={side === "right" ? 27 : 1} cy="4" r="1.6" fill="currentColor" stroke="none" />
      </svg>
      <span className="lettering max-w-[22ch] text-redline">{children}</span>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Break line — the zigzag that means "this part continues past the
 * edge of the sheet". Used between plates.
 * ---------------------------------------------------------------- */
export function BreakLine({
  invert = false,
  className = "",
}: {
  invert?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 12"
      preserveAspectRatio="none"
      className={`h-3 w-full ${
        invert ? "text-blueprint-3" : "text-ink-4"
      } ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      vectorEffect="non-scaling-stroke"
    >
      <path d="M0 6h180l8-5 8 10 8-5h196" />
    </svg>
  );
}

/* ---------------------------------------------------------------- *
 * Note number — the small square index a drawing note is keyed to.
 * ---------------------------------------------------------------- */
export function NoteMark({
  n,
  invert = false,
}: {
  n: number | string;
  invert?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={`lettering mt-[3px] flex h-6 w-6 shrink-0 items-center justify-center border font-medium ${
        invert
          ? "border-blueprint-3 text-blueprint-line"
          : "border-ink-3 text-ink"
      }`}
    >
      {n}
    </span>
  );
}
