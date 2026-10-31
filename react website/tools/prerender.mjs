// Writes one real HTML file per route, so links open directly and pages show before JavaScript runs.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '..');
const CLIENT = path.join(ROOT, 'dist', 'client');
const OUT = path.join(ROOT, 'dist', 'site');
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
const { render, routes } = await import(pathToFileURL(path.join(ROOT, 'dist', 'server', 'entry-server.js')));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const headTags = (h) => [
  `<title>${esc(h.title)}</title>`,
  `<link rel="canonical" href="${esc(h.canonical)}">`,
  `<meta name="description" content="${esc(h.description)}">`,
  `<meta name="robots" content="${esc(h.robots)}">`,
  `<meta property="og:title" content="${esc(h.ogTitle)}">`,
  `<meta property="og:type" content="${esc(h.ogType)}">`,
  `<meta property="og:image" content="${esc(h.ogImage)}">`,
  `<meta property="og:url" content="${esc(h.ogUrl)}">`,
  `<meta property="og:description" content="${esc(h.ogDescription)}">`,
].join('\n    ');

rmSync(OUT, { recursive: true, force: true });
cpSync(CLIENT, OUT, { recursive: true });
const template = readFileSync(path.join(CLIENT, 'index.html'), 'utf8');

for (const route of routes) {
  const location = route.path === '*' ? `${base}/404` : base + route.path;
  const styles = route.styles.map((css) => `<style data-page-style>${css}</style>`).join('');
  const html = template
    .replace('<!--head-->', () => headTags(route.head))
    .replace('<!--styles-->', () => styles)
    .replace('<!--app-->', () => render(location, base || '/'));
  const file = route.path === '*' ? '404.html' : path.join(route.path.slice(1), 'index.html');
  mkdirSync(path.dirname(path.join(OUT, file)), { recursive: true });
  writeFileSync(path.join(OUT, file), html);
}

// The live site's two redirects.
const redirect = (dir, to) => {
  mkdirSync(path.join(OUT, dir), { recursive: true });
  writeFileSync(path.join(OUT, dir, 'index.html'), `<!DOCTYPE html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${esc(to)}"><script>location.replace(${JSON.stringify(to)})</script>`);
};
redirect('review', 'https://search.google.com/local/writereview?placeid=ChIJ_0gwEX__sUARKPOo-xSZzTo');
redirect('scan', `${base}/`);
console.log(`Prerendered ${routes.length} pages into dist/site (base "${base || '/'}")`);
