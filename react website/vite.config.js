import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Actions sets BASE_PATH to /<repository>/ so every link and file works from a project page.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  ssr: { noExternal: ['react-router'] },
});
