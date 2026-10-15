import { defineConfig } from 'vitest/config'

// Kept separate from vite.config.js so the React Router plugin doesn't run under Vitest
export default defineConfig({
  test: {
    include: ['src/**/*.test.js'],
  },
})
