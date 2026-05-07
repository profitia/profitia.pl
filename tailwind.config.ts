import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // ── Brandbook palette (official) ──────────────────────
          navy:    '#242F44', // Deep Navy - primary brand color
          blue:    '#006D9E', // Corporate Blue - interactive, hover
          bright:  '#0092D9', // Bright Blue - active states, data
          purple:  '#48103F', // Deep Purple - premium dark accent
          magenta: '#8E0055', // Magenta - high-contrast accent
          // ── Neutrals ──────────────────────────────────────────
          dark:    '#3B3838', // Dark Gray - body text
          medium:  '#767171', // Medium Gray - supporting text
          muted:   '#A6A6A6', // Soft Gray - placeholders
          border:  '#D9D9D9', // Light Gray - borders, dividers
          tint:    '#CAD2E3', // Blue Gray - section tints
          // ── Legacy aliases (point to brandbook values) ────────
          primary:   '#242F44', // was #1a365d placeholder - corrected
          secondary: '#006D9E', // was #2b6cb0 placeholder - corrected
          accent:    '#0092D9', // was #ed8936 - corrected
          light:     '#CAD2E3', // was #ebf8ff - corrected
        },
      },
      fontFamily: {
        // Inter is the sole typeface for Profitia UI.
        // Poppins (font-heading) is retired - do not use in new components.
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'], // legacy shim - outputs Inter
      },
      maxWidth: {
        'content': '65ch',   // paragraph max-width
        'headline': '42rem', // headline max-width (~xl)
        'wide': '80rem',     // wide content
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
}

export default config
