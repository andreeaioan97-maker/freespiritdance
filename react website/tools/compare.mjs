// Compares every built page with its saved original, element by element.
// Expected differences are normalised: scripts and page styles, lucide <i> tags (drawn as <svg>),
// logo links, the contact form's action, and the base path.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { parse } from 'parse5';

const ROOT = path.resolve(import.meta.dirname, '..');
const SITE = path.join(ROOT, '..', 'static website', 'site');
const BUILT = path.join(ROOT, 'dist', 'site');
const manifest = JSON.parse(readFileSync(path.join(ROOT, '..', 'static website', 'manifest.json'), 'utf8'));
const images = new Map(manifest.results.filter((r) => r.url.startsWith('/_image') && r.file).map((r) => [r.url, '/' + r.file]));
const LIVE = new Set('menu calendar arrow-right check-circle-2 music crown users check heart clock map-pin chevron-right phone instagram facebook check-circle x user star chevron-down mail youtube music-2 layers cookie'.split(' '));

const find = (n, t) => { if (n.nodeName === t) return n; for (const c of n.childNodes ?? []) { const r = find(c, t); if (r) return r; } return null; };

function flat(node, out = []) {
  for (const c of node.childNodes ?? []) {
    if (c.nodeName === '#comment' || c.nodeName === 'script' || c.nodeName === 'style') continue;
    if (c.nodeName === '#text') {
      const t = c.value.replace(/\s+/g, ' ').trim();
      if (t) { if (typeof out.at(-1) === 'string' && out.at(-1).startsWith('T:')) out[out.length - 1] += ' ' + t; else out.push('T:' + t); }
      continue;
    }
    const a = Object.fromEntries((c.attrs ?? []).map((x) => [x.name, x.value]));
    let tag = c.nodeName;
    // Added by React and React Router: an image preload hint and a link marker.
    if (tag === 'link' && a.rel === 'preload') continue;
    delete a['data-discover'];
    if (tag === 'i' && LIVE.has(a['data-lucide'])) {
      tag = 'icon';
      a.class = `lucide lucide-${a['data-lucide']} ${a.class ?? ''}`;
    }
    if (tag === 'svg') {
      tag = 'icon';
      for (const k of ['xmlns', 'width', 'height', 'viewbox', 'viewBox', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'aria-hidden']) delete a[k];
    }
    if (a.src && images.has(a.src)) a.src = images.get(a.src);
    if (a.action === '/api/contact') a.action = 'mailto:freespiritdance9@gmail.com';
    if (a.class !== undefined) a.class = a.class.split(/\s+/).filter(Boolean).sort().join(' ');
    if (a.style !== undefined) a.style = a.style.replace(/\s+/g, '').replace(/;$/, '');
    if (a.href && a.href.startsWith('/') && a.href.length > 1) a.href = a.href.replace(/\/$/, '');
    const attrs = Object.keys(a).sort().map((k) => `${k}=${a[k]}`).join('|');
    out.push(`<${tag} ${attrs}>`);
    if (tag !== 'icon') flat(c, out);
    out.push(`</${tag}>`);
  }
  return out;
}

const findRoot = (n) => { if (n.attrs?.some((a) => a.name === 'id' && a.value === 'root')) return n; for (const c of n.childNodes ?? []) { const r = findRoot(c); if (r) return r; } return null; };
const body = (file) => { const d = parse(readFileSync(file, 'utf8')); return { doc: d, flat: flat(findRoot(d) ?? find(d, 'body')) }; };
const headValue = (doc, tag, key, val, out) => {
  const head = find(doc, 'head');
  const n = head.childNodes.find((c) => c.nodeName === tag && c.attrs?.some((a) => a.name === key && a.value === val));
  return n?.attrs.find((a) => a.name === out)?.value;
};

let ok = 0;
let bad = 0;
for (const f of readdirSync(SITE, { recursive: true }).filter((x) => x.endsWith('.html')).sort()) {
  const builtFile = path.join(BUILT, f);
  if (!existsSync(builtFile)) { console.log('MISSING', f); bad++; continue; }
  const a = body(path.join(SITE, f));
  const b = body(builtFile);
  const problems = [];
  const n = Math.max(a.flat.length, b.flat.length);
  for (let i = 0; i < n; i++) {
    if (a.flat[i] !== b.flat[i]) { problems.push(`at ${i}\n  original: ${a.flat[i]?.slice(0, 300)}\n  react:    ${b.flat[i]?.slice(0, 300)}`); break; }
  }
  if (find(a.doc, 'title').childNodes[0].value !== find(b.doc, 'title').childNodes[0].value) problems.push('title');
  for (const [tag, key, val, attr] of [['link', 'rel', 'canonical', 'href'], ['meta', 'name', 'description', 'content'], ['meta', 'name', 'robots', 'content'], ['meta', 'property', 'og:title', 'content'], ['meta', 'property', 'og:url', 'content'], ['meta', 'property', 'og:image', 'content'], ['meta', 'property', 'og:description', 'content']]) {
    if (headValue(a.doc, tag, key, val, attr) !== headValue(b.doc, tag, key, val, attr)) problems.push(val);
  }
  if (problems.length) { console.log('DIFF', f, problems.join('; ')); bad++; } else ok++;
}
console.log(`identical ${ok}, different ${bad}`);
process.exit(bad ? 1 : 0);
