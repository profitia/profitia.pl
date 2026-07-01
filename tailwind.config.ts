import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './stores/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './runtime/**/*.{js,ts,jsx,tsx,mdx}',
    './services/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#F4F6FA',
          100: '#E6EDF5',
          200: '#D6E2EA',
          300: '#CAD2E3',
          400: '#A6A6A6',
          500: '#767171',
          600: '#3B3838',
          700: '#485E88',
          800: '#2D3B56',
          900: '#242F44',
          950: '#1A2233',
        },
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
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '3xl': '1.5rem',
      },
      zIndex: {
        advisory: '9999',
        'advisory-modal': '10000',
      },
      boxShadow: {
        'advisory-sm': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        advisory: '0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'advisory-lg': '0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.06)',
        'advisory-xl': '0 32px 64px rgba(0,0,0,0.14), 0 16px 32px rgba(0,0,0,0.08)',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'indicator-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fade-in 0.2s ease-out',
        'indicator-blink': 'indicator-blink 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
