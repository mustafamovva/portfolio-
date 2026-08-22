"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Exploded axonometric of a web application.
 *
 * A drawing set opens with a general arrangement: the whole assembly, drawn
 * once, with its parts pulled apart along an explosion axis so you can see
 * every one of them. Here the assembly is a full-stack app and the parts are
 * its three layers — which states what he actually does without a sentence
 * of copy, and gives the sheet a subject rather than an ornament.
 *
 * True isometric projection: x' = (x − y)·cos30, y' = (x + y)·sin30.
 */

const S = 132; // plane edge, in drawing units
const CX = 190;
const LAYER_Y = [70, 190, 310];

const COS30 = 0.8660254;
const SIN30 = 0.5;

/**
 * Perimeter of one projected plane, worked out rather than measured.
 *
 * Each edge projects to (±S·cos30, ±S·sin30), and cos²30 + sin²30 = 1, so every
 * edge is exactly S long on screen and the outline is 4S. Knowing the number
 * lets the draw-in run on stroke-dashoffset directly, instead of on motion's
 * pathLength — which normalises against the browser's own idea of the length
 * and, on a closed shape, leaves the last edge outside the dash.
 */
const PERIMETER = 4 * 132;
const GRID_LENGTH = 4 * 132;

function iso(x: number, y: number): [number, number] {
  return [(x - y) * COS30, (x + y) * SIN30];
}

/**
 * One plane, closed by drawing back to the first point rather than with Z.
 *
 * The draw-in animation works by normalising the outline — motion sets the SVG
 * pathLength attribute to 1 and expresses the dash in that space. The browser
 * does not count an implicit closing segment when it works out the scale for
 * that normalisation, so with Z (or with a <polygon>, which closes implicitly)
 * the fourth edge falls outside the dash and is never painted. Spelling the
 * closing line out as a real segment leaves nothing implicit to be dropped.
 */
function planePath(cy: number): string {
  const pts = (
    [
      [0, 0],
      [S, 0],
      [S, S],
      [0, S],
    ] as const
  ).map(([x, y]) => {
    const [ix, iy] = iso(x, y);
    return `${(CX + ix).toFixed(1)},${(cy + iy).toFixed(1)}`;
  });
  return `M${pts[0]}L${pts[1]}L${pts[2]}L${pts[3]}L${pts[0]}`;
}

/** Two-way division lines drawn across a plane, like a component grid. */
function planeGrid(cy: number): string {
  const parts: string[] = [];
  for (const k of [S / 3, (S * 2) / 3]) {
    const [ax, ay] = iso(k, 0);
    const [bx, by] = iso(k, S);
    parts.push(`M${(CX + ax).toFixed(1)} ${(cy + ay).toFixed(1)}L${(CX + bx).toFixed(1)} ${(cy + by).toFixed(1)}`);
    const [cx2, cy2] = iso(0, k);
    const [dx, dy] = iso(S, k);
    parts.push(`M${(CX + cx2).toFixed(1)} ${(cy + cy2).toFixed(1)}L${(CX + dx).toFixed(1)} ${(cy + dy).toFixed(1)}`);
  }
  return parts.join(" ");
}

const LAYERS = [
  { name: "UI LAYER", spec: "Next.js · React · TypeScript" },
  { name: "API LAYER", spec: "Node.js · tRPC" },
  { name: "DATA LAYER", spec: "PostgreSQL · Prisma" },
];

export default function Axonometric({
  invert = false,
  className = "",
}: {
  invert?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.5 });
  const py = useSpring(my, { stiffness: 60, damping: 18, mass: 0.5 });
  const shiftX = useTransform(px, (v) => v * 18);
  const shiftY = useTransform(py, (v) => v * 14);

  const line = invert ? "#8FB4D2" : "#3B4C68";
  const lineSoft = invert ? "#4F7BA3" : "#A6B0BE";
  const label = invert ? "#DCE9F2" : "#16233A";
  const labelSoft = invert ? "#8FB4D2" : "#75849B";
  const accent = invert ? "#DCE9F2" : "#C03A28";

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) / r.width);
    my.set((e.clientY - (r.top + r.height / 2)) / r.height);
  }

  return (
    <motion.svg
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ x: shiftX, y: shiftY }}
      viewBox="0 0 530 480"
      className={`h-full w-full ${className}`}
      role="img"
      aria-label="Exploded axonometric drawing of a full-stack web application: a UI layer built with Next.js, React and TypeScript, an API layer on Node.js and tRPC, and a data layer on PostgreSQL and Prisma."
    >
      {/* Explosion axis — the dashed line parts are pulled apart along */}
      <line
        x1={CX}
        y1={LAYER_Y[0] - 34}
        x2={CX}
        y2={LAYER_Y[2] + S + 26}
        stroke={lineSoft}
        strokeWidth="1"
        strokeDasharray="7 5"
        vectorEffect="non-scaling-stroke"
      />

      {/* Overall dimension: the whole stack, measured */}
      <g stroke={line} strokeWidth="1" vectorEffect="non-scaling-stroke">
        <line x1="52" y1={LAYER_Y[0] + SIN30 * S} x2="52" y2={LAYER_Y[2] + SIN30 * S} />
        <line x1="46" y1={LAYER_Y[0] + SIN30 * S} x2="58" y2={LAYER_Y[0] + SIN30 * S} />
        <line x1="46" y1={LAYER_Y[2] + SIN30 * S} x2="58" y2={LAYER_Y[2] + SIN30 * S} />
      </g>
      <text
        x="44"
        y={(LAYER_Y[0] + LAYER_Y[2]) / 2 + SIN30 * S}
        fill={accent}
        fontSize="10.5"
        letterSpacing="2"
        textAnchor="middle"
        transform={`rotate(-90 44 ${(LAYER_Y[0] + LAYER_Y[2]) / 2 + SIN30 * S})`}
        style={{ fontFamily: "var(--font-plex-mono), monospace" }}
      >
        FULL STACK
      </text>

      {LAYERS.map((layer, i) => {
        const cy = LAYER_Y[i];
        const edgeX = CX + COS30 * S;
        const edgeY = cy + SIN30 * S;

        return (
          <motion.g
            key={layer.name}
            animate={
              reduce ? undefined : { y: [0, i === 1 ? 5 : -5, 0] }
            }
            transition={{
              duration: 9 + i * 1.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            {/* the plane */}
            <motion.path
              d={planePath(cy)}
              fill={invert ? "rgba(220,233,242,0.05)" : "rgba(22,35,58,0.045)"}
              stroke={line}
              strokeWidth="1.4"
              strokeLinejoin="round"
              /*
               * No non-scaling-stroke on the dashed paths. It makes the browser
               * measure the dash in screen pixels while PERIMETER is in drawing
               * units, so the dash falls short by exactly the SVG's scale factor
               * and the last stretch of outline never gets painted.
               */
              strokeDasharray={reduce ? undefined : PERIMETER}
              initial={reduce ? false : { strokeDashoffset: PERIMETER }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.1, delay: 0.15 + i * 0.22, ease: "easeInOut" }}
            />
            {/* component divisions drawn on it */}
            <motion.path
              d={planeGrid(cy)}
              stroke={lineSoft}
              strokeWidth="1.05"
              fill="none"
              strokeDasharray={reduce ? undefined : GRID_LENGTH}
              initial={reduce ? false : { strokeDashoffset: GRID_LENGTH }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.9, delay: 0.5 + i * 0.22, ease: "easeInOut" }}
            />
            {/* corner node on the explosion axis */}
            <circle cx={CX} cy={cy} r="2.6" fill={accent} />

            {/* leader line out to the label */}
            <line
              x1={edgeX}
              y1={edgeY}
              x2={edgeX + 52}
              y2={edgeY}
              stroke={lineSoft}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <text
              x={edgeX + 60}
              y={edgeY - 3}
              fill={label}
              fontSize="11"
              letterSpacing="1.6"
              style={{ fontFamily: "var(--font-plex-mono), monospace" }}
            >
              {layer.name}
            </text>
            <text
              x={edgeX + 60}
              y={edgeY + 12}
              fill={labelSoft}
              fontSize="9.5"
              letterSpacing="0.6"
              style={{ fontFamily: "var(--font-plex-mono), monospace" }}
            >
              {layer.spec}
            </text>
          </motion.g>
        );
      })}
    </motion.svg>
  );
}
