/** @type {import('tailwindcss').Config} */
export default {
  // Light is the default theme; <html class="dark"> turns on dark: variants.
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Theme colours come from CSS variables (src/styles/index.css) so light and dark share
        // one set of classes. "white" is the ink colour: white on dark, near-black on light.
        white: 'rgb(var(--c-fg) / <alpha-value>)',
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        panel: 'rgb(var(--c-panel) / <alpha-value>)',
        card: 'rgb(var(--c-card) / <alpha-value>)',
        raised: 'rgb(var(--c-raised) / <alpha-value>)',
        // Accents deepen on the light theme so they keep their contrast (values in index.css).
        crimson: { DEFAULT: 'rgb(var(--c-crimson) / <alpha-value>)', soft: 'rgb(var(--c-crimson-soft) / <alpha-value>)' },
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        amber: { DEFAULT: 'rgb(var(--c-amber) / <alpha-value>)', soft: 'rgb(var(--c-amber-soft) / <alpha-value>)' },
        ok: 'rgb(var(--c-ok) / <alpha-value>)',
        // shadcn component tokens, mapped to the site palette
        background: 'rgb(var(--c-bg) / <alpha-value>)',
        foreground: 'rgb(var(--c-fg) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"DM Sans"', '-apple-system', 'system-ui', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['"Space Grotesk"', '"DM Sans"', 'system-ui', 'sans-serif'],
        brand: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        display: '-0.045em',
        head: '-0.03em',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        pulseDot: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.35' } },
        toast: {
          '0%,12%': { opacity: '0', transform: 'translateY(12px)' },
          '18%,82%': { opacity: '1', transform: 'translateY(0)' },
          '88%,100%': { opacity: '0', transform: 'translateY(-6px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2.4s ease-in-out infinite',
        toast: 'toast 7s cubic-bezier(0.16,1,0.3,1) infinite',
      },
    },
  },
  plugins: [],
}
