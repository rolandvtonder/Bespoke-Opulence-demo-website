import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/* Relative base: the built site works from any folder — the domain root,
   or GitHub Pages' /Bespoke-Opulence-demo-website/ — without changes.
   Image paths in src are written relative ("img/...") for the same reason. */
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
