import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mustafa Mahmoud — Full-Stack Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The share card is the title block of the drawing set, at sheet size. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#DEE3E1",
          color: "#16233A",
          fontFamily: "sans-serif",
          padding: 44,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            border: "2px solid #16233A",
          }}
        >
          {/* Sheet strip */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #A6B0BE",
              padding: "18px 34px",
              fontSize: 22,
              letterSpacing: 4,
              color: "#3B4C68",
            }}
          >
            <div style={{ display: "flex" }}>A-101 · GENERAL ARRANGEMENT</div>
            <div style={{ display: "flex" }}>SCALE 1:1</div>
          </div>

          {/* Body */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
              padding: "0 34px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 76,
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: -2.5,
                textTransform: "uppercase",
              }}
            >
              I build complete web apps
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 76,
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: -2.5,
                textTransform: "uppercase",
                color: "#C03A28",
              }}
            >
              from code to production.
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 27,
                color: "#3B4C68",
                marginTop: 34,
                letterSpacing: 2,
              }}
            >
              MUSTAFA MAHMOUD · TEAM LEAD @ EAALIM · GIZA, EG
            </div>
          </div>

          {/* Title block */}
          <div
            style={{
              display: "flex",
              borderTop: "1px solid #A6B0BE",
              fontSize: 21,
              letterSpacing: 3,
              color: "#3B4C68",
            }}
          >
            <div style={{ display: "flex", padding: "16px 34px", borderRight: "1px solid #A6B0BE" }}>
              NEXT.JS
            </div>
            <div style={{ display: "flex", padding: "16px 34px", borderRight: "1px solid #A6B0BE" }}>
              TYPESCRIPT
            </div>
            <div style={{ display: "flex", padding: "16px 34px", borderRight: "1px solid #A6B0BE" }}>
              NODE.JS
            </div>
            <div style={{ display: "flex", padding: "16px 34px" }}>POSTGRESQL</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
