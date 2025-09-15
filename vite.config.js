import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: set this to your repository name for GitHub Pages project sites
  // If your repo is p0oru.github.io, use '/'
  base: './', // <-- ADD THIS LINE

})
