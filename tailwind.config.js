/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#09090b',
        panel: '#0c0c0e',
        card: '#131316',
        raised: '#18181b',
        crimson: { DEFAULT: '#c81e3a', soft: '#fb7185' },
        amber: { DEFAULT: '#f59e0b', soft: '#fbbf24' },
        ok: '#10b981',
      },
      fontFamily: {
        sans: ['Geist', '-apple-system', 'system-ui', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
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
