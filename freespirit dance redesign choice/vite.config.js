import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const ORIGINAL_PORT = 4419;

// In `npm run dev`, also run the original React site at /original/ (as it is published),
// so the Original/Redesign switcher works locally. Builds are unaffected.
function originalSite() {
  let child;
  return {
    name: 'original-site',
    apply: 'serve',
    configureServer(server) {
      child = spawn('npx', ['vite', '--port', String(ORIGINAL_PORT), '--strictPort', '--host', '127.0.0.1'], {
        cwd: fileURLToPath(new URL('../react website', import.meta.url)),
        env: { ...process.env, BASE_PATH: '/original/' },
        stdio: 'ignore',
      });
      const stop = () => child?.kill();
      server.httpServer?.once('close', stop);
      process.once('exit', stop);
    },
  };
}

// GitHub Actions sets BASE_PATH to the folder this version is served from.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), originalSite()],
  server: {
    port: 4418,
    strictPort: true,
    host: '127.0.0.1',
    proxy: { '/original': { target: `http://127.0.0.1:${ORIGINAL_PORT}`, ws: true } },
  },
});
