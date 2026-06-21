"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive wireframe sphere rendered on a canvas.
 * Points are distributed with a Fibonacci sphere; nearby projected points are
 * linked with depth-faded cyan lines. The whole sphere rotates slowly and
 * eases toward the cursor position. Ported from the design prototype.
 */
export default function WireframeSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      if (!W || !H) return;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 170;
    const pts: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      pts.push({ x: Math.cos(theta) * rad, y, z: Math.sin(theta) * rad });
    }

    let mx = 0;
    let my = 0;
    let tmx = 0;
    let tmy = 0;
    const onMove = (e: MouseEvent) => {
      tmx = e.clientX / window.innerWidth - 0.5;
      tmy = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let ang = 0;
    const loop = () => {
      if (!W || !H) resize();
      ang += 0.0024;
      mx += (tmx - mx) * 0.045;
      my += (tmy - my) * 0.045;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.min(W, H) * 0.38;
      const rotY = ang + mx * 0.9;
      const rotX = my * 0.7;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const proj = pts.map((p) => {
        const x = p.x * cosY + p.z * sinY;
        const z = -p.x * sinY + p.z * cosY;
        const y = p.y;
        const y2 = y * cosX - z * sinX;
        const z2 = y * sinX + z * cosX;
        return { sx: cx + x * R, sy: cy + y2 * R, z: z2 };
      });
      const maxD = R * 0.52;
      for (let i = 0; i < proj.length; i++) {
        for (let j = i + 1; j < proj.length; j++) {
          const a = proj[i];
          const b = proj[j];
          const dx = a.sx - b.sx;
          const dy = a.sy - b.sy;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxD) {
            const depth = ((a.z + b.z) / 2 + 1) / 2;
            const alpha = (1 - d / maxD) * 0.22 * (0.3 + depth * 0.7);
            if (alpha > 0.01) {
              ctx.strokeStyle = "rgba(34,211,238," + alpha.toFixed(3) + ")";
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(a.sx, a.sy);
              ctx.lineTo(b.sx, b.sy);
              ctx.stroke();
            }
          }
        }
      }
      proj.sort((a, b) => a.z - b.z);
      proj.forEach((p) => {
        const depth = (p.z + 1) / 2;
        const size = 0.8 + depth * 2.0;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        const r = Math.round(96 + depth * 110);
        const g = Math.round(165 + depth * 70);
        ctx.fillStyle =
          "rgba(" + r + "," + g + ",255," + (0.28 + depth * 0.62).toFixed(3) + ")";
        ctx.fill();
      });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="relative z-[2] h-[480px] w-full animate-float-slow"
    />
  );
}
