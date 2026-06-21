import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exact palette from the design brief
        base: "#0A0E1A", // deep space navy / near-black background
        surface: "#111827", // cards / surfaces
        primary: "#2563EB", // electric blue
        violet: "#7C3AED", // gradient accent end
        cyan: "#22D3EE", // glow / highlight accent
        heading: "#F8FAFC", // heading text
        body: "#94A3B8", // body text
        muted: "#64748B",
        faint: "#475569",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      keyframes: {
        mmfloat: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        mmspin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        mmspinr: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        mmaurora: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(4%,-3%) scale(1.08)" },
          "66%": { transform: "translate(-3%,3%) scale(0.96)" },
          "100%": { transform: "translate(0,0) scale(1)" },
        },
        mmpulse: {
          "0%,100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        mmgrad: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        mmreveal: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        float: "mmfloat 7s ease-in-out infinite",
        "float-slow": "mmfloat 8s ease-in-out infinite",
        spin28: "mmspin 28s linear infinite",
        spinr22: "mmspinr 22s linear infinite",
        aurora: "mmaurora 16s ease-in-out infinite",
        "aurora-rev": "mmaurora 20s ease-in-out infinite reverse",
        pulse2: "mmpulse 2s infinite",
        grad: "mmgrad 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
