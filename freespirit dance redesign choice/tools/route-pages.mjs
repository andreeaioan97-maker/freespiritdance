// GitHub Pages only serves real files, so every route gets its own copy of the page and links open directly.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const routes = readFileSync(path.join(ROOT, 'src/generated/routes.js'), 'utf8');
const paths = [...routes.matchAll(/path: "(\/[^"]+)"/g)].map((m) => m[1]);

for (const route of paths) {
  mkdirSync(path.join(DIST, route), { recursive: true });
  copyFileSync(path.join(DIST, 'index.html'), path.join(DIST, route, 'index.html'));
}
// Also shown for any address that doesn't exist; the app then displays its own not-found page.
copyFileSync(path.join(DIST, 'index.html'), path.join(DIST, '404.html'));
console.log(`Copied the page to ${paths.length} routes`);
