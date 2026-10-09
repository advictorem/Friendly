import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this repo at /Friendly/. Override with VITE_BASE=/ for a root domain.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/Friendly/',
  plugins: [react()],
  build: { outDir: 'docs', emptyOutDir: true },
})
