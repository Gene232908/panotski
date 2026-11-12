import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand core — #000000 / #f5f5f6 / #346A5C
        ink: "#000000",
        paper: "#f5f5f6",
        // The home hero's base fill — a green-black the photograph dissolves
        // into on mobile, so the fade has to land on exactly this value.
        night: "#07100d",
        // Reading tones. Pure #000 on #fff vibrates at paragraph sizes, so
        // body copy uses these lifted neutrals instead — same brand family,
        // far calmer over a long page. Headlines still use `ink`.
        graphite: {
          DEFAULT: "#141a18",
          soft: "#3d4846",
          muted: "#6b7570",
        },
        // Light-dominant surface ladder. Sections alternate between these
        // to create scroll rhythm without going dark. See RULES.md § Styling.
        surface: {
          DEFAULT: "#ffffff",
          soft: "#f5f5f6",
          muted: "#ededef",
        },
        teal: {
          50: "#eaf5f2",
          100: "#d0e9e2",
          200: "#a3d3c5",
          300: "#74bca8",
          400: "#4a9f8a",
          500: "#2c8571",
          600: "#1f7562",
          700: "#346A5C",
          800: "#14513f",
          900: "#0e3b2c",
          950: "#08221a",
        },
      },
      fontFamily: {
        // Single family. There is intentionally no `serif` stack — the
        // italic-serif accent word is a generated-template cliché and was
        // removed. Contrast comes from weight/size/tracking. See RULES.md.
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1320px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
        // Slower settle for large surfaces — reads as weight, not lag.
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Idle glow on the Contact artwork. The client asked for a half-second
        // lift in brightness that settles back, so the rise lands at 12.5% of
        // the 4s cycle (= 0.5s) and is home again by 30%. The flat tail is
        // deliberate: a continuous swell would read as a flicker beside a form
        // someone is trying to fill in.
        glowPulse: {
          "0%, 100%": { filter: "brightness(1)" },
          "12.5%": { filter: "brightness(1.4)" },
          "30%": { filter: "brightness(1)" },
        },
      },
      animation: {
        marquee: "marquee 70s linear infinite",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
      },
      boxShadow: {
        soft: "0 24px 60px -28px rgba(0, 0, 0, 0.22)",
        lift: "0 32px 70px -30px rgba(0, 0, 0, 0.28)",
        nav: "0 10px 40px -12px rgba(0, 0, 0, 0.35)",
      },
      letterSpacing: {
        eyebrow: "0.24em",
      },
    },
  },
  plugins: [],
};

export default config;
