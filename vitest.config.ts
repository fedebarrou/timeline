import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'astro:content': resolve(__dirname, 'tests/__mocks__/astro-content.ts'),
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
  },
});
