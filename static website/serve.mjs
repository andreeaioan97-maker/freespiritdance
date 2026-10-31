// Serves the untouched copy in site/ the way the live site answers: clean URLs,
// /_image?... links, its redirects and its 404 page. Run: node serve.mjs [port]
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.join(ROOT, 'site');
const PORT = Number(process.argv[2] ?? 4414);
const manifest = JSON.parse(await readFile(path.join(ROOT, 'manifest.json'), 'utf8'));

const images = new Map();
const redirects = new Map();
for (const r of manifest.results) {
  if (r.url.startsWith('/_image') && r.file) images.set(r.url, r.file);
  if (r.location) redirects.set(r.url, r.location.replace('https://freespiritdance.ro', '') || '/');
}

const TYPES = { html: 'text/html; charset=utf-8', css: 'text/css; charset=utf-8', js: 'application/javascript; charset=utf-8', svg: 'image/svg+xml', ico: 'image/x-icon', xml: 'application/xml', txt: 'text/plain; charset=utf-8' };

async function send(res, status, file) {
  const type = TYPES[path.extname(file).slice(1)] ?? 'application/octet-stream';
  const body = await readFile(path.join(SITE, file));
  res.writeHead(status, { 'content-type': type });
  res.end(body);
}

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const key = url.pathname + url.search;
  if (redirects.has(url.pathname)) {
    res.writeHead(307, { location: redirects.get(url.pathname) });
    return res.end();
  }
  if (images.has(key)) return send(res, 200, images.get(key));
  const clean = path.posix.normalize(decodeURI(url.pathname)).replace(/^\/+/, '');
  for (const file of [clean, path.posix.join(clean, 'index.html')]) {
    try {
      if (req.method === 'GET' || req.method === 'HEAD') return await send(res, 200, file || 'index.html');
    } catch {}
  }
  return send(res, 404, '404.html').catch(() => res.writeHead(404).end());
}).listen(PORT, '127.0.0.1', () => console.log(`http://localhost:${PORT}`));
