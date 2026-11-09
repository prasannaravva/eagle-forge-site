import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// On GitHub Pages the site lives under /<repo>/; locally it is served from the root.
export default defineConfig({
  base: process.env.PAGES_BASE || '/',
  plugins: [react()],
  resolve: {
    // '@/…' points at src/, as shadcn components expect
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // React changes rarely: keep it in its own long-cached chunk. Framer Motion is left to Rollup so LazyMotion can split its features out.
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
})
