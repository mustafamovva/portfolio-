import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mustafa Mahmoud — Full-Stack Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0A0E1A 0%, #0D1326 60%, #141029 100%)",
          color: "#F8FAFC",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#22D3EE", letterSpacing: 2 }}>
          FULL-STACK WEB DEVELOPER
        </div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 700, marginTop: 18 }}>
          Mustafa Mahmoud
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#94A3B8", marginTop: 26 }}>
          Next.js · Node.js · Laravel — from code to production
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#7C3AED", marginTop: 44, fontWeight: 600 }}>
          Team Lead @ Eaalim
        </div>
      </div>
    ),
    { ...size }
  );
}
