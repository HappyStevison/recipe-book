// In vitest.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// This imports your main Vite config
import config from './vite.config';

export default defineConfig({
  ...config, // Spread all the plugins from your main config
  test: {
    // And add the test-specific settings
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
});