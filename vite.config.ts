import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    // By default, vitest does not provide global APIs for explicitness, so set it to true
    globals: true,
    // The environment that will be used for testing. We need browser globals to be resolved for testing
    environment: "jsdom"
  }
})
