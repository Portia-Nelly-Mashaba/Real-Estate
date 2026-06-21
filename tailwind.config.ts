import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        muted: "var(--muted)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          secondary: "var(--accent-secondary)",
        },
        charcoal: {
          DEFAULT: "var(--charcoal)",
          hero: "var(--hero-charcoal)",
          deep: "var(--hero-charcoal-deep)",
        },
        cream: "#FDFBF7",
        beige: "#F7F3EF",
        tobacco: {
          DEFAULT: "#7D5D3F",
          hover: "#634931",
        },
        gold: {
          DEFAULT: "#9A7B5F",
          light: "#C1A37E",
          hover: "#8A6B4F",
        },
        "logo-taupe": "#B8A898",
        bronze: {
          DEFAULT: "#8E735B",
          hover: "#7A634E",
        },
        "btn-black": {
          DEFAULT: "#1A1A1A",
          hover: "#000000",
        },
        forest: {
          DEFAULT: "#2D4A3E",
          light: "#3D5F50",
        },
        "nav-glass": "var(--nav-glass)",
        "nav-glass-border": "var(--nav-glass-border)",
        "nav-active": "var(--nav-active)",
        "nav-active-scrolled": "var(--nav-active-scrolled)",
        overlay: "var(--overlay)",
        "hero-text": "var(--hero-text)",
        "hero-search": "var(--hero-search)",
        "hero-dim": "var(--hero-dim)",
        "search-green": {
          DEFAULT: "var(--search-green)",
          hover: "var(--search-green-hover)",
        },
        "dropdown-cream": "var(--dropdown-cream)",
        "dropdown-active": "var(--dropdown-active)",
        "dropdown-text": "var(--dropdown-text)",
        "brown-light": "var(--brown-light)",
        "why-section-bg": "var(--why-section-bg)",
        "gallery-band": "var(--gallery-band)",
        "gallery-content": "var(--gallery-content)",
        "gallery-control": "var(--gallery-control)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        label: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.15em" }],
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(26, 26, 26, 0.08)",
        elevated: "0 8px 30px rgba(26, 26, 26, 0.12)",
        nav: "0 4px 24px rgba(26, 26, 26, 0.08)",
      },
      backdropBlur: {
        nav: "16px",
        glass: "20px",
      },
    },
  },
};

export default config;
