// Writes one real HTML file per route, with its own search and share tags and its content already
// rendered, plus robots.txt and the sitemap. GitHub Pages only serves real files, so this also makes
// every link open directly. Set SITE_INDEX=true once the site lives at SITE_URL (src/seo.js).
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SERVER = path.join(ROOT, 'dist-server');
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
const { render, routes, pageHead, originalCss } = await import(pathToFileURL(path.join(SERVER, 'entry-server.js')));
const { SITE_URL, indexing } = await import(pathToFileURL(path.join(ROOT, 'src', 'seo.js')));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const headTags = (h) => [
  `<title>${esc(h.title)}</title>`,
  `<meta name="description" content="${esc(h.description)}">`,
  `<meta name="robots" content="${h.robots}">`,
  h.canonical && `<link rel="canonical" href="${esc(h.canonical)}">`,
  `<meta property="og:type" content="website">`,
  `<meta property="og:site_name" content="Free Spirit Dance">`,
  `<meta property="og:locale" content="ro_RO">`,
  `<meta property="og:title" content="${esc(h.title)}">`,
  `<meta property="og:description" content="${esc(h.description)}">`,
  h.canonical && `<meta property="og:url" content="${esc(h.canonical)}">`,
  `<meta property="og:image" content="${esc(h.image)}">`,
  `<meta property="og:image:width" content="1200">`,
  `<meta property="og:image:height" content="630">`,
  `<meta name="twitter:card" content="summary_large_image">`,
  h.listed && `<link rel="sitemap" href="${base}/sitemap.xml">`,
  h.jsonLd && `<script type="application/ld+json">${JSON.stringify(h.jsonLd).replace(/</g, '\\u003c')}</script>`,
].filter(Boolean).join('\n    ');

const template = readFileSync(path.join(DIST, 'index.html'), 'utf8');
const listed = [];

for (const route of routes) {
  const head = pageHead(route);
  if (head.listed && head.robots.startsWith('index')) listed.push(head.canonical);
  // Inner pages keep the original site's styles; the home page has its own design.
  const styles = route.path === '/' ? [] : [originalCss, ...route.styles];
  const html = template
    .replace('<!--head-->', () => headTags(head))
    .replace('<!--styles-->', () => styles.map((css) => `<style data-page-style>${css}</style>`).join(''))
    .replace('<!--app-->', () => render(route.path === '*' ? `${base}/404` : base + route.path, base || '/'));
  const file = route.path === '*' ? '404.html' : path.join(route.path.slice(1), 'index.html');
  mkdirSync(path.dirname(path.join(DIST, file)), { recursive: true });
  writeFileSync(path.join(DIST, file), html);
}

// The live site's two short links (printed QR codes may use them); kept out of search results.
const redirect = (dir, to) => {
  mkdirSync(path.join(DIST, dir), { recursive: true });
  writeFileSync(path.join(DIST, dir, 'index.html'), `<!DOCTYPE html><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${esc(to)}"><script>location.replace(${JSON.stringify(to)})</script>`);
};
redirect('review', 'https://search.google.com/local/writereview?placeid=ChIJ_0gwEX__sUARKPOo-xSZzTo');
redirect('scan', `${base}/`);

writeFileSync(path.join(DIST, 'robots.txt'), indexing()
  ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
  : 'User-agent: *\nAllow: /\n');
writeFileSync(path.join(DIST, 'sitemap.xml'), [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...listed.map((url) => `  <url><loc>${esc(url)}</loc></url>`),
  '</urlset>',
  '',
].join('\n'));

rmSync(SERVER, { recursive: true, force: true });
console.log(`Prerendered ${routes.length} pages (base "${base || '/'}", ${indexing() ? `${listed.length} indexed` : 'not indexed: SITE_INDEX is off'})`);
