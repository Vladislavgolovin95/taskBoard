import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: './docs',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      components: '/src/components',
      constants: '/src/constants',
      api: '/src/api',
      types: '/src/types',
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
  },
});
