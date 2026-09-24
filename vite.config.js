import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import { generateSeoHtml } from './seo-plugin.js'

// Use GitHub Pages subpath for production builds or when GITHUB_PAGES is set
const isProduction = process.env.NODE_ENV === 'production' || process.env.GITHUB_PAGES === 'true';
const base = isProduction ? '/Ashu-s_Portfolio/' : '/';

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), viteCompression(), generateSeoHtml()],
})
