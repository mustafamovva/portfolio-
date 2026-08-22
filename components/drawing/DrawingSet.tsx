"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { SheetFrame } from "./primitives";

export type Plate = {
  code: string;
  title: string;
  scale?: string;
  invert?: boolean;
  render: (invert: boolean) => ReactNode;
};

const VH_PER_PLATE = 150;
const DESKTOP_MIN = 1024;

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ------------------------------------------------------------------ *
 * One sheet, flown through by the camera.
 * ------------------------------------------------------------------ */
function CameraPlate({
  plate,
  index,
  total,
  progress,
  active,
  inPlay,
}: {
  plate: Plate;
  index: number;
  total: number;
  progress: MotionValue<number>;
  active: boolean;
  /** Near enough to the camera to be worth compositing. */
  inPlay: boolean;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const span = end - start;
  const at = (f: number) => start + span * f;

  const first = index === 0;
  const last = index === total - 1;

  /**
   * Depth is real translateZ against the stage's perspective, not a scale.
   * That difference is the whole effect: a scaled sheet just gets bigger,
   * a sheet moved along Z has its edges converge, so it reads as a plane you
   * are travelling toward and then passing through.
   *
   * The first sheet is already on the table at load; the last one stops in
   * front of you instead of disappearing into the camera.
   */
  const motionStops = first
    ? [start, at(0.72), end]
    : last
      ? [start, at(0.3), end]
      : [start, at(0.3), at(0.72), end];

  const pick = <T,>(a: T[], b: T[], c: T[]) => (first ? a : last ? b : c);

  const z = useTransform(
    progress,
    motionStops,
    pick([0, 0, 1180], [-1500, 0, 0], [-1500, 0, 0, 1180]),
  );
  // The incoming sheet arrives from where the outgoing one's callout sat.
  const x = useTransform(
    progress,
    motionStops,
    pick(["0%", "0%", "-5%"], ["13%", "0%", "0%"], ["13%", "0%", "0%", "-5%"]),
  );
  const y = useTransform(
    progress,
    motionStops,
    pick(["0%", "0%", "-4%"], ["10%", "0%", "0%"], ["10%", "0%", "0%", "-4%"]),
  );
  // A sheet lying on a table is never quite square to the eye until you read it.
  const rotateX = useTransform(
    progress,
    motionStops,
    pick([0, 0, 7], [-11, 0, 0], [-11, 0, 0, 7]),
  );
  const rotateY = useTransform(
    progress,
    motionStops,
    pick([0, 0, -4], [7, 0, 0], [7, 0, 0, -4]),
  );

  const opacityStops = first
    ? [start, at(0.78), at(0.95)]
    : last
      ? [start, at(0.22), end]
      : [start, at(0.22), at(0.78), at(0.95)];
  const opacity = useTransform(
    progress,
    opacityStops,
    pick([1, 1, 0], [0, 1, 1], [0, 1, 1, 0]),
  );

  // Depth of field: sharp only while the sheet is being read.
  const blur = useTransform(
    progress,
    motionStops,
    pick([0, 0, 7], [8, 0, 0], [8, 0, 0, 7]),
  );
  const filter = useTransform(blur, (v) =>
    v < 0.15 ? "none" : `blur(${v.toFixed(2)}px)`,
  );

  return (
    <motion.div
      style={{
        z,
        x,
        y,
        rotateX,
        rotateY,
        opacity,
        filter,
        /*
         * Only the sheets near the camera get composited.
         *
         * Nine full-viewport layers, each carrying a blur and each pinned with
         * will-change, is more compositor memory than a GPU will reliably hold.
         * When it runs out, a layer stops being repainted and the last frame it
         * held stays on screen — a stale sheet floating over a sharp one, which
         * a reload clears because it rebuilds the layers. Hiding the sheets that
         * are nowhere near their turn keeps at most three layers alive.
         */
        visibility: inPlay ? "visible" : "hidden",
        pointerEvents: active ? "auto" : "none",
        willChange: inPlay ? "transform, opacity" : "auto",
      }}
      // Asymmetric margins: the sheet index sits in the left one.
      className="absolute inset-0 flex items-center justify-center py-[clamp(24px,4vh,52px)] pl-[clamp(114px,7.5vw,150px)] pr-[clamp(20px,3.5vw,84px)]"
      aria-hidden={!active}
    >
      <div className="h-full w-full max-w-[1560px]">
        <SheetFrame
          code={plate.code}
          title={plate.title}
          scale={plate.scale}
          invert={plate.invert}
          index={index}
          total={total}
          className={
            plate.invert
              ? "bg-blueprint drafting-grid-invert shadow-[0_40px_90px_-40px_rgba(0,0,0,0.75)]"
              : "bg-paper drafting-grid shadow-[0_40px_90px_-40px_rgba(22,35,58,0.55)]"
          }
        >
          {plate.render(!!plate.invert)}
        </SheetFrame>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Sheet index — the drawing set's contents, and the site's navigation.
 * ------------------------------------------------------------------ */
function SheetIndex({
  plates,
  active,
  onJump,
}: {
  plates: Plate[];
  active: number;
  onJump: (i: number) => void;
}) {
  return (
    <nav
      aria-label="Sheet index"
      className="pointer-events-auto fixed left-[clamp(10px,2vw,26px)] top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-1 lg:flex"
    >
      {plates.map((p, i) => {
        const on = i === active;
        return (
          <button
            key={p.code}
            type="button"
            onClick={() => onJump(i)}
            aria-current={on ? "true" : undefined}
            className={`group flex items-center gap-2.5 py-[3px] text-left outline-none transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-redline ${
              on ? "text-ink" : "text-ink-3 hover:text-ink-2"
            }`}
          >
            <span
              aria-hidden
              className={`h-px transition-all duration-300 ${
                on ? "w-7 bg-redline" : "w-3.5 bg-ink-4 group-hover:w-5"
              }`}
            />
            <span className="lettering font-medium">{p.code}</span>
          </button>
        );
      })}
    </nav>
  );
}

/**
 * How far through the set you are. The title block now lives inside each
 * sheet where it belongs, so all the fixed chrome still owes the reader is
 * this — a hairline along the bottom edge, reading as the drawing unrolling.
 */
function SetProgress({ progress }: { progress: MotionValue<number> }) {
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-0 left-0 z-50 h-[2px] w-full bg-ink-4/35"
    >
      <motion.div style={{ width }} className="h-full bg-redline" />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Grid references — the letters and numbers printed along a sheet's
 * edges so a person can say "it's in C-4".
 * ------------------------------------------------------------------ */
function GridRefs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 hidden lg:block">
      <div className="absolute inset-x-[clamp(14px,3vw,44px)] top-[18px] flex justify-between">
        {["A", "B", "C", "D", "E", "F", "G", "H"].map((c) => (
          <span key={c} className="lettering text-ink-4">
            {c}
          </span>
        ))}
      </div>
      <div className="absolute inset-y-[clamp(48px,7vh,72px)] right-[16px] flex flex-col justify-between">
        {["1", "2", "3", "4", "5", "6"].map((n) => (
          <span key={n} className="lettering text-ink-4">
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * The plain stack: what the server renders, what phones get, and what
 * anyone who asked for reduced motion keeps. Same sheets, no camera.
 * ------------------------------------------------------------------ */
function StackedSet({ plates }: { plates: Plate[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  /*
   * Phones and tablets get the same idea as the camera at a fraction of the
   * cost: each sheet tilts onto the table as it scrolls in, driven entirely by
   * a CSS transition. No JS runs per frame, and the hidden state is armed here
   * rather than rendered by the server — so the delivered HTML always shows
   * every sheet, and nothing can be left invisible if the observer never runs.
   */
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    root.dataset.reveal = "armed";
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "true";
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    root.querySelectorAll("section").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="mx-auto flex max-w-[1240px] flex-col gap-[clamp(20px,4vw,44px)] px-[clamp(12px,3vw,40px)] py-[clamp(20px,4vw,44px)]"
    >
      {plates.map((p, i) => (
        <section key={p.code} id={p.code.toLowerCase()} className="min-h-[80vh]">
          <SheetFrame
            code={p.code}
            title={p.title}
            scale={p.scale}
            invert={p.invert}
            index={i}
            total={plates.length}
            className={
              p.invert
                ? "bg-blueprint drafting-grid-invert"
                : "bg-paper drafting-grid"
            }
          >
            {p.render(!!p.invert)}
          </SheetFrame>
        </section>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
export default function DrawingSet({ plates }: { plates: Plate[] }) {
  const reduce = useReducedMotion();
  const [camera, setCamera] = useState(false);

  // The stack is what renders on the server, so the markup a crawler sees is
  // the whole drawing set in document order. The camera is an upgrade applied
  // before first paint, and only where it belongs.
  useIsoLayoutEffect(() => {
    const decide = () =>
      setCamera(!reduce && window.innerWidth >= DESKTOP_MIN);
    decide();
    window.addEventListener("resize", decide);
    return () => window.removeEventListener("resize", decide);
  }, [reduce]);

  /*
   * The camera is its own component on purpose. useScroll measures its target
   * in an effect, so the element has to exist by the time that effect runs —
   * and it only exists once this mode is chosen. Keeping the hook up here, in
   * a component whose first render returns the stack instead, would have it
   * measure a ref that is still null.
   */
  return camera ? (
    <CameraSet plates={plates} />
  ) : (
    <StackedSet plates={plates} />
  );
}

function CameraSet({ plates }: { plates: Plate[] }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.floor(v * plates.length);
    setActive(Math.max(0, Math.min(plates.length - 1, i)));
  });

  const jump = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      /*
       * useScroll spreads progress 0..1 across (track height − viewport), not
       * across the track's full height — the last viewport of the track is
       * where progress reaches 1. Dividing by the full height instead drifts
       * further out with every sheet, which is why the later ones landed
       * mid-transition while the first two looked fine.
       */
      const top = track.getBoundingClientRect().top + window.scrollY;
      const range = track.offsetHeight - window.innerHeight;
      // 0.5 through a plate's window is the middle of its sharp, held phase.
      window.scrollTo({
        top: top + (range * (i + 0.5)) / plates.length,
        behavior: "smooth",
      });
    },
    [plates.length],
  );

  return (
    <>
      <GridRefs />
      <SheetIndex plates={plates} active={active} onJump={jump} />
      <SetProgress progress={scrollYProgress} />

      <div
        ref={trackRef}
        style={{ height: `${plates.length * VH_PER_PLATE}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden [perspective:1600px]">
          {plates.map((p, i) => (
            <CameraPlate
              key={p.code}
              plate={p}
              index={i}
              total={plates.length}
              progress={scrollYProgress}
              active={active === i}
              inPlay={Math.abs(i - active) <= 1}
            />
          ))}
        </div>
      </div>
    </>
  );
}
