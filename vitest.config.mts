/// <reference types="vitest" />
/// <reference types="vite/client" />

import { configDefaults, defineConfig } from 'vitest/config';
import { resolve } from 'path';

const exclude = [...configDefaults.exclude, 'node_modules', '*.d.ts'];

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      exclude: [...exclude, '**/__tests__'],
      reporter: ['html', 'text']
    },
    include: [...configDefaults.include, '**/?(*.){test,spec}.?(c|m)[jt]s?(x)'],
    setupFiles: [],
    environment: 'node',
    exclude
  },

  plugins: []
});
