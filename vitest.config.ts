import { configDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    // e2e/*.spec.ts are Playwright specs (npm run test:e2e); Vitest's default
    // include pattern also matches *.spec.ts, so keep them out of unit runs.
    exclude: [...configDefaults.exclude, 'e2e/**'],
  },
  resolve: {
    alias: { '@': resolve(__dirname, '.') },
  },
})
