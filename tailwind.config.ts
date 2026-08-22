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
        /* The drafting table the sheets are laid on */
        table: "#C6CDCA",
        "table-deep": "#B4BCB9",

        /* Paper */
        paper: "#DEE3E1",
        "paper-hi": "#ECEFED",
        "paper-sunk": "#D2D8D6",

        /* Ink — one hue, four depths, the way a drawing uses line weights */
        ink: "#16233A",
        "ink-2": "#3B4C68",
        "ink-3": "#75849B",
        "ink-4": "#A6B0BE",

        /* The annotation layer: corrections, revisions, the human voice */
        redline: "#C03A28",
        "redline-2": "#D98274",

        /* Reproduction print — used whole-sheet on the detail plates */
        blueprint: "#0E2E4F",
        "blueprint-deep": "#0A2440",
        "blueprint-line": "#DCE9F2",
        "blueprint-2": "#8FB4D2",
        "blueprint-3": "#4F7BA3",
      },
      fontFamily: {
        display: ["var(--font-archivo)", "Helvetica Neue", "Arial", "sans-serif"],
        sans: ["var(--font-archivo)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      letterSpacing: {
        note: "0.14em",
        stamp: "0.22em",
      },
      keyframes: {
        mmblink: {
          "0%,49%": { opacity: "1" },
          "50%,100%": { opacity: "0" },
        },
        mmdash: {
          to: { strokeDashoffset: "-24" },
        },
        mmdrift: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        blink: "mmblink 1.1s steps(1) infinite",
        dash: "mmdash 1.4s linear infinite",
        drift: "mmdrift 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
