import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Actions sets BASE_PATH to the folder this version is served from.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  server: { port: 4418, strictPort: true, host: '127.0.0.1' },
});
