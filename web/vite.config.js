import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactRouter()],
  server: {
    port: 3000,
    host: '127.0.0.1', // Use IPv4 instead of IPv6 to avoid permission issues
    strictPort: false, // Try next available port if 3000 is taken
    open: false, // Don't auto-open browser
  },
})
