"use client";

import { useEffect, useRef } from "react";

/**
 * Reference geometry, drawn the way an orthographic view is drawn.
 *
 * A-101 carries the pictorial view of the work — an exploded axonometric. This
 * is its counterpart: a true orthographic projection, no perspective, with the
 * convention that actually distinguishes an engineering drawing from a picture
 * of a shape — edges that fall behind the solid are drawn as dashes, and the
 * ones you could really see are drawn solid.
 *
 * The visibility is worked out properly rather than faked by depth: each face
 * gets a normal, and an edge is visible when either of the two faces meeting
 * along it turns toward the viewer. On a convex solid that is exact.
 */

type P3 = { x: number; y: number; z: number };

const PHI = (1 + Math.sqrt(5)) / 2;

/* Icosahedron: (0, ±1, ±φ) and its cyclic permutations, on the unit sphere. */
const VERTS: P3[] = (() => {
  const v: P3[] = [];
  for (const a of [-1, 1]) {
    for (const b of [-1, 1]) {
      v.push({ x: 0, y: a, z: b * PHI });
      v.push({ x: a, y: b * PHI, z: 0 });
      v.push({ x: b * PHI, y: 0, z: a });
    }
  }
  const len = Math.hypot(1, PHI);
  return v.map((p) => ({ x: p.x / len, y: p.y / len, z: p.z / len }));
})();

const dist = (a: P3, b: P3) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);

/* Shortest vertex-to-vertex distance is the edge length on a regular solid. */
const EDGE_LEN = (() => {
  let min = Infinity;
  for (let i = 0; i < VERTS.length; i++) {
    for (let j = i + 1; j < VERTS.length; j++) {
      min = Math.min(min, dist(VERTS[i], VERTS[j]));
    }
  }
  return min;
})();

const near = (i: number, j: number) => dist(VERTS[i], VERTS[j]) <= EDGE_LEN * 1.05;

const EDGES: [number, number][] = (() => {
  const out: [number, number][] = [];
  for (let i = 0; i < VERTS.length; i++) {
    for (let j = i + 1; j < VERTS.length; j++) {
      if (near(i, j)) out.push([i, j]);
    }
  }
  return out;
})();

/* Any three mutually adjacent vertices bound a face. */
const FACES: [number, number, number][] = (() => {
  const out: [number, number, number][] = [];
  for (let i = 0; i < VERTS.length; i++) {
    for (let j = i + 1; j < VERTS.length; j++) {
      if (!near(i, j)) continue;
      for (let k = j + 1; k < VERTS.length; k++) {
        if (near(i, k) && near(j, k)) out.push([i, j, k]);
      }
    }
  }
  return out;
})();

/** The two faces meeting along each edge. */
const EDGE_FACES: number[][] = EDGES.map(([a, b]) =>
  FACES.reduce<number[]>((acc, f, i) => {
    if (f.includes(a) && f.includes(b)) acc.push(i);
    return acc;
  }, []),
);

function rotate(p: P3, ax: number, ay: number): P3 {
  const cx = Math.cos(ax);
  const sx = Math.sin(ax);
  const y1 = p.y * cx - p.z * sx;
  const z1 = p.y * sx + p.z * cx;
  const cy = Math.cos(ay);
  const sy = Math.sin(ay);
  return { x: p.x * cy + z1 * sy, y: y1, z: -p.x * sy + z1 * cy };
}

const INK = "#16233A";
const HIDDEN = "#A6B0BE";
const FAINT = "#C3CBD5";
const RED = "#C03A28";

export default function ReferenceSolid({
  className = "",
}: {
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const draw = (t: number) => {
      if (!w || !h) return;
      ctx.clearRect(0, 0, w, h);

      const R = Math.min(w, h) * 0.33;
      const cx = w / 2;
      const cy = h / 2;
      const ay = t * 0.26;
      const ax = 0.42 + Math.sin(t * 0.17) * 0.22;

      // Orthographic projection: no perspective divide, by definition.
      const P = VERTS.map((v) => {
        const r = rotate(v, ax, ay);
        return { x: cx + r.x * R, y: cy - r.y * R, z: r.z };
      });

      const faceTowardViewer = FACES.map((f) => {
        // On a solid centred at the origin the centroid direction is the normal.
        const n = f.reduce(
          (acc, i) => {
            const r = rotate(VERTS[i], ax, ay);
            return { x: acc.x + r.x, y: acc.y + r.y, z: acc.z + r.z };
          },
          { x: 0, y: 0, z: 0 },
        );
        return n.z > 0;
      });

      /* ---- Centre lines: long dash, short dash, the drafting convention ---- */
      ctx.save();
      ctx.strokeStyle = FAINT;
      ctx.lineWidth = 1;
      ctx.setLineDash([12, 4, 3, 4]);
      ctx.beginPath();
      ctx.moveTo(cx, cy - R * 1.55);
      ctx.lineTo(cx, cy + R * 1.55);
      ctx.moveTo(cx - R * 1.55, cy);
      ctx.lineTo(cx + R * 1.55, cy);
      ctx.stroke();
      ctx.restore();

      /* ---- Hidden edges first, dashed and lighter ---- */
      ctx.save();
      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = HIDDEN;
      ctx.lineWidth = 1;
      ctx.beginPath();
      EDGES.forEach(([a, b], i) => {
        if (EDGE_FACES[i].some((f) => faceTowardViewer[f])) return;
        ctx.moveTo(P[a].x, P[a].y);
        ctx.lineTo(P[b].x, P[b].y);
      });
      ctx.stroke();
      ctx.restore();

      /* ---- Visible edges: solid, full weight ---- */
      ctx.strokeStyle = INK;
      ctx.lineWidth = 1.35;
      ctx.lineJoin = "round";
      ctx.beginPath();
      EDGES.forEach(([a, b], i) => {
        if (!EDGE_FACES[i].some((f) => faceTowardViewer[f])) return;
        ctx.moveTo(P[a].x, P[a].y);
        ctx.lineTo(P[b].x, P[b].y);
      });
      ctx.stroke();

      /* ---- Vertices on the near half ---- */
      ctx.fillStyle = RED;
      P.forEach((p) => {
        if (p.z <= 0.15) return;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      /* ---- Overall dimension across the widest extent ---- */
      const dy = cy + R * 1.42;
      ctx.strokeStyle = RED;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - R, dy - 6);
      ctx.lineTo(cx - R, dy + 6);
      ctx.moveTo(cx + R, dy - 6);
      ctx.lineTo(cx + R, dy + 6);
      ctx.moveTo(cx - R, dy);
      ctx.lineTo(cx + R, dy);
      ctx.stroke();
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const nw = Math.round(r.width);
      const nh = Math.round(r.height);
      if (!nw || !nh || (nw === w && nh === h)) return;
      w = nw;
      h = nh;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(0.6);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    if (reduce) {
      draw(0.6);
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = 0;
    let elapsed = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      elapsed += dt;
      draw(elapsed);
    };
    const play = () => {
      if (raf) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const pause = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? play() : pause()),
      { rootMargin: "120px 0px" },
    );
    io.observe(canvas);

    return () => {
      pause();
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
