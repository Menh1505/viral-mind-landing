/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
        "2xl": "5rem",
      },
    },
    extend: {
      colors: {
        viral: {
          bg: "#0D0B1C",
          "bg-secondary": "#16132B",
          "bg-tertiary": "#24203D",
          text: "#F8F4F2",
          "text-muted": "#D0C4D2",
          "text-subtle": "#90859A",
          accent: "#F39F5A",
          "accent-hover": "#F8C46E",
          "accent-light": "#FFE3B3",
          ok: "#87D6A5",
          alert: "#F16F61",
          border: "#4B345C",
          "border-hover": "#AE445A",
        },
      },
      fontFamily: {
        display: ["Cabin", "system-ui", "sans-serif"],
        body: ["Mulish", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.035em", fontWeight: 700 }],
        "display-lg": ["clamp(2.25rem, 6vw, 3.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: 700 }],
        "display-md": ["clamp(1.75rem, 4vw, 2.5rem)", { lineHeight: "1.2", fontWeight: 600 }],
        "display-sm": ["clamp(1.375rem, 3vw, 1.875rem)", { lineHeight: "1.25", fontWeight: 600 }],
        "heading-xl": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        "heading-lg": ["1.25rem", { lineHeight: "1.35", fontWeight: 600 }],
        "heading-md": ["1.125rem", { lineHeight: "1.4", fontWeight: 600 }],
        "heading-sm": ["1rem", { lineHeight: "1.45", fontWeight: 600 }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: 400 }],
        "body-md": ["1rem", { lineHeight: "1.6", fontWeight: 400 }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: 400 }],
        "label-lg": ["0.875rem", { lineHeight: "1.5", fontWeight: 500, letterSpacing: "0.02em" }],
        "label-md": ["0.75rem", { lineHeight: "1.5", fontWeight: 500, letterSpacing: "0.03em" }],
        "label-sm": ["0.625rem", { lineHeight: "1.5", fontWeight: 500, letterSpacing: "0.04em" }],
      },
      borderRadius: {
        "card-sm": "12px",
        "card-md": "16px",
        "card-lg": "20px",
        "card-xl": "24px",
      },
      boxShadow: {
        "card": "0 20px 60px -28px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255,255,255,.08)",
        "card-hover": "0 26px 70px -28px rgba(69, 25, 82, .9), 0 0 0 1px rgba(243,159,90,.25)",
        "accent": "0 10px 36px -12px rgba(243,159,90,.75)",
        "inner-glow": "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern": "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "48px 48px",
      },
      transitionDuration: {
        "fast": "150ms",
        "normal": "250ms",
        "slow": "350ms",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
