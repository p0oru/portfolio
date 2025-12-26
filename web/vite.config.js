import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Base path configuration:
  // - Local dev: '/' (root of dev server)
  // - Production/GitHub Pages: './' (relative paths work everywhere)
  // HashRouter handles routing, so base path mainly affects asset loading
  const base = mode === 'development' ? '/' : './'

  return {
    plugins: [react()],
    base: base,
    server: {
      port: 3000,
      host: '127.0.0.1', // Use IPv4 instead of IPv6 to avoid permission issues
      strictPort: false, // Try next available port if 3000 is taken
      open: false, // Don't auto-open browser
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      // Relative paths (./) work for both local preview and GitHub Pages
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
    },
  }
})
