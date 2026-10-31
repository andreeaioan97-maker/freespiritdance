// Turns the saved static pages into React components, so the markup stays identical to the
// original. Output: src/generated/. Run with `npm run generate` from this folder.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync, copyFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { parse } from 'parse5';

const ROOT = path.resolve(import.meta.dirname, '..');
const STATIC = path.join(ROOT, '..', 'static website');
const SITE = path.join(STATIC, 'site');
const OUT = path.join(ROOT, 'src', 'generated');
const PUBLIC = path.join(ROOT, 'public');

// Only these icons were registered by the live site; any other data-lucide stays an empty <i>, as it does there.
const LIVE_ICONS = new Set('Menu Calendar ArrowRight CheckCircle2 Music Crown Users Check Heart Clock MapPin ChevronRight Phone Instagram Facebook CheckCircle X User Star ChevronDown Mail Youtube Music2 Layers Cookie'.split(' '));
const pascal = (s) => s.replace(/^([A-Z])|[\s-_]+(\w)/g, (_, a, b) => (b ? b.toUpperCase() : a.toLowerCase())).replace(/^./, (c) => c.toUpperCase());

const ATTRS = { class: 'className', for: 'htmlFor', tabindex: 'tabIndex', frameborder: 'frameBorder', allowfullscreen: 'allowFullScreen', referrerpolicy: 'referrerPolicy', fetchpriority: 'fetchPriority', crossorigin: 'crossOrigin', srcset: 'srcSet', maxlength: 'maxLength', colspan: 'colSpan', rowspan: 'rowSpan', autoplay: 'autoPlay', playsinline: 'playsInline', readonly: 'readOnly', autocomplete: 'autoComplete', datetime: 'dateTime', enctype: 'encType', novalidate: 'noValidate', value: 'defaultValue', checked: 'defaultChecked' };
const PLAIN = new Set(['id', 'href', 'src', 'alt', 'title', 'type', 'name', 'rel', 'target', 'role', 'width', 'height', 'loading', 'decoding', 'placeholder', 'rows', 'cols', 'action', 'method', 'allow', 'sizes', 'min', 'max', 'step', 'lang', 'poster', 'controls', 'muted', 'loop', 'required', 'disabled', 'selected', 'multiple', 'hidden', 'download', 'style']);
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const BOOL = new Set(['required', 'disabled', 'selected', 'multiple', 'hidden', 'controls', 'muted', 'loop', 'allowfullscreen', 'autoplay', 'playsinline', 'readonly', 'novalidate', 'checked']);

const manifest = JSON.parse(readFileSync(path.join(STATIC, 'manifest.json'), 'utf8'));
const imageFiles = new Map(manifest.results.filter((r) => r.url.startsWith('/_image') && r.file).map((r) => [r.url, '/' + r.file]));

const str = (v) => (/["&{}<>\\\n]/.test(v) ? `{${JSON.stringify(v)}}` : `"${v}"`);
const find = (n, tag) => { if (n.nodeName === tag) return n; for (const c of n.childNodes ?? []) { const r = find(c, tag); if (r) return r; } return null; };
const attr = (n, name) => n.attrs?.find((a) => a.name === name)?.value;
const walk = (n, fn) => { fn(n); for (const c of n.childNodes ?? []) walk(c, fn); };

function styleObject(css) {
  const pairs = css.split(/;(?![^(]*\))/).map((d) => d.trim()).filter(Boolean).map((d) => {
    const i = d.indexOf(':');
    const k = d.slice(0, i).trim();
    return `${JSON.stringify(k.startsWith('--') ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()))}: ${JSON.stringify(d.slice(i + 1).trim())}`;
  });
  return `{{ ${pairs.join(', ')} }}`;
}

function attrsToJsx(node, ctx, skip = []) {
  const out = [];
  const id = attr(node, 'id');
  for (const { name, value } of node.attrs) {
    if (skip.includes(name)) continue;
    if (/^on/.test(name)) throw new Error(`inline handler ${name}`);
    if (name === 'class' && ctx.classOverride?.[id]) { out.push(`className=${ctx.classOverride[id]}`); continue; }
    if (name === 'style') { out.push(`style=${styleObject(value)}`); continue; }
    if (name === 'src' && value.startsWith('/_image?')) {
      const file = imageFiles.get(value);
      if (!file) throw new Error(`unknown image ${value}`);
      ctx.uses.add('asset');
      out.push(`src={asset(${JSON.stringify(file)})}`);
      continue;
    }
    if ((name === 'src' || name === 'href') && value.startsWith('/')) {
      ctx.uses.add('asset');
      out.push(`${name}={asset(${JSON.stringify(value)})}`);
      continue;
    }
    const jsxName = ATTRS[name] ?? name;
    if (!ATTRS[name] && !PLAIN.has(name) && !/^(data|aria)-/.test(name)) throw new Error(`unmapped attribute ${name}`);
    if (BOOL.has(name) && value === '') { out.push(jsxName); continue; }
    out.push(`${jsxName}=${str(value)}`);
  }
  return out;
}

function toJsx(node, ctx, depth) {
  const pad = '  '.repeat(depth);
  if (node.nodeName === '#comment') return '';
  if (node.nodeName === '#text') {
    const t = node.value.replace(/\s+/g, ' ');
    if (!t) return '';
    if (t === ' ') return `${pad}{" "}\n`;
    return /^\s|\s$|[{}<>&]/.test(t) ? `${pad}{${JSON.stringify(t)}}\n` : `${pad}${t}\n`;
  }
  const tag = node.nodeName;
  if (tag === 'script') return '';
  if (tag === 'style') { ctx.styles.push(node.childNodes.map((c) => c.value).join('')); return ''; }

  const icon = tag === 'i' ? attr(node, 'data-lucide') : null;
  if (icon && LIVE_ICONS.has(pascal(icon))) {
    ctx.uses.add('Icon');
    return `${pad}<Icon name="${pascal(icon)}" dataName="${icon}" ${attrsToJsx(node, ctx, ['data-lucide']).join(' ')} />\n`;
  }

  let name = tag;
  let attrs;
  const href = tag === 'a' ? attr(node, 'href') : null;
  if (href && href.startsWith('/') && !attr(node, 'target') && !/^\/(review|scan)\b/.test(href)) {
    ctx.uses.add('Link');
    name = 'Link';
    attrs = attrsToJsx(node, ctx, ['href']);
    attrs.unshift(`to=${str(href)}`);
  } else {
    attrs = attrsToJsx(node, ctx);
  }

  const id = attr(node, 'id');
  const cls = attr(node, 'class') ?? '';
  if (ctx.handlers?.[id]) attrs.push(ctx.handlers[id]);
  if (ctx.handlers?.mobileLink && cls.split(/\s+/).includes('mobile-link')) attrs.push(ctx.handlers.mobileLink);
  if (id === 'booking-form') {
    ctx.uses.add('submitBooking');
    attrs = attrs.filter((a) => !a.startsWith('action=') && !a.startsWith('method='));
    attrs.unshift('action="mailto:freespiritdance9@gmail.com"', 'method="POST"');
    attrs.push('onSubmit={submitBooking}');
  }

  const open = `${pad}<${[name, ...attrs].join(' ')}`;
  if (VOID.has(tag)) return `${open} />\n`;
  const kids = (tag === 'template' ? [] : node.childNodes).map((c) => toJsx(c, ctx, depth + 1)).join('');
  return kids ? `${open}>\n${kids}${pad}</${name}>\n` : `${open}></${name}>\n`;
}

function imports(ctx, prefix) {
  const lines = [];
  if (ctx.uses.has('Link')) lines.push(`import { Link } from 'react-router';`);
  if (ctx.uses.has('Icon')) lines.push(`import Icon from '${prefix}components/Icon.jsx';`);
  if (ctx.uses.has('asset')) lines.push(`import { asset } from '${prefix}lib/asset.js';`);
  if (ctx.uses.has('submitBooking')) lines.push(`import { submitBooking } from '${prefix}lib/bookingForm.js';`);
  return lines.join('\n');
}

const toggled = (base, drop, add, cond) => {
  const kept = base.split(/\s+/).filter((c) => !drop.includes(c)).join(' ');
  return `{\`${kept} \${${cond} ? ${JSON.stringify(add.join(' '))} : ${JSON.stringify(drop.join(' '))}}\`}`;
};

rmSync(OUT, { recursive: true, force: true });
mkdirSync(path.join(OUT, 'pages'), { recursive: true });
mkdirSync(path.join(OUT, 'styles'), { recursive: true });

const files = readdirSync(SITE, { recursive: true }).filter((f) => f.endsWith('.html')).sort();
const routes = [];
const styleFiles = new Map();
const addStyle = (css) => {
  const hash = createHash('sha1').update(css).digest('hex').slice(0, 10);
  styleFiles.set(hash, css);
  return hash;
};
const shared = {};

for (const f of files) {
  const doc = parse(readFileSync(path.join(SITE, f), 'utf8'));
  const head = find(doc, 'head');
  const body = find(doc, 'body');
  const main = find(body, 'main');
  const meta = (key, val) => attr(head.childNodes.find((n) => n.nodeName === 'meta' && attr(n, key) === val) ?? { attrs: [] }, 'content');
  const route = f === 'index.html' ? '/' : f === '404.html' ? '*' : '/' + f.replace(/\/?index\.html$/, '');
  const comp = 'Page' + createHash('sha1').update(route).digest('hex').slice(0, 8);

  const ctx = { uses: new Set(), styles: [] };
  const inner = main.childNodes.map((c) => toJsx(c, ctx, 3)).join('');

  // Shared parts must be the same on all pages once scripts and page styles are set aside.
  const before = body.childNodes.slice(0, body.childNodes.indexOf(main));
  const after = body.childNodes.slice(body.childNodes.indexOf(main) + 1);
  const pageCtx = { uses: new Set(), styles: [] };
  const footerText = after.map((c) => toJsx(c, pageCtx, 3)).join('');
  ctx.styles.push(...pageCtx.styles);
  shared.footer ??= { nodes: after, text: footerText };
  if (shared.footer.text !== footerText) throw new Error(`footer differs in ${f}`);
  shared.nav ??= before;
  shared.mainClass ??= attr(main, 'class');
  if (attr(main, 'class') !== shared.mainClass) throw new Error(`main differs in ${f}`);

  writeFileSync(path.join(OUT, 'pages', `${comp}.jsx`), `// Generated from static website/site/${f} by tools/generate.mjs\n${imports(ctx, '../../')}\n\nexport default function ${comp}() {\n  return (\n    <>\n${inner}    </>\n  );\n}\n`);

  const styles = [];
  for (const l of head.childNodes) {
    const hrefAttr = l.nodeName === 'link' && attr(l, 'rel') === 'stylesheet' ? attr(l, 'href') : '';
    if (hrefAttr?.startsWith('/_astro/') && !hrefAttr.includes('contact.')) styles.push(addStyle(readFileSync(path.join(SITE, hrefAttr.split('?')[0]), 'utf8')));
    if (l.nodeName === 'style') ctx.styles.push(l.childNodes.map((c) => c.value).join(''));
  }
  styles.push(...ctx.styles.map(addStyle));

  routes.push({
    route, comp, styles,
    head: {
      title: find(head, 'title').childNodes[0].value,
      canonical: attr(head.childNodes.find((n) => n.nodeName === 'link' && attr(n, 'rel') === 'canonical'), 'href'),
      description: meta('name', 'description'),
      robots: meta('name', 'robots'),
      ogTitle: meta('property', 'og:title'),
      ogType: meta('property', 'og:type'),
      ogImage: meta('property', 'og:image'),
      ogUrl: meta('property', 'og:url'),
      ogDescription: meta('property', 'og:description'),
    },
  });
}

// Navbar and mobile menu, with the live site's menu script expressed as state.
{
  let base = {};
  for (const n of shared.nav) walk(n, (x) => { const id = attr(x, 'id'); if (id) base[id] = attr(x, 'class'); });
  const ctx = {
    uses: new Set(), styles: [],
    classOverride: {
      navbar: toggled(base.navbar, ['bg-transparent'], ['bg-white/80', 'backdrop-blur-xl', 'shadow-premium', 'border-b', 'border-brand-purple/5'], 'scrolled'),
      'menu-icon': toggled(base['menu-icon'] + ' x', ['x'], ['scale-0', 'opacity-0', 'rotate-90'], 'open').replace(/ \$\{open \? ("[^"]*") : "x"\}/, ' ${open ? $1 : ""}'),
      'close-icon': toggled(base['close-icon'], ['scale-0', 'rotate-90', 'opacity-0'], [], 'open'),
      'mobile-menu': toggled(base['mobile-menu'], ['translate-y-full'], [], 'open'),
    },
    handlers: { 'menu-btn': 'onClick={toggle}', mobileLink: 'onClick={close}' },
  };
  const jsx = shared.nav.map((c) => toJsx(c, ctx, 3)).join('');
  writeFileSync(path.join(OUT, 'Navbar.jsx'), `// Generated by tools/generate.mjs\n${imports(ctx, '../')}\nimport { useNavbar } from '../lib/useNavbar.js';\n\nexport default function Navbar() {\n  const { open, scrolled, toggle, close } = useNavbar();\n  return (\n    <>\n${jsx}    </>\n  );\n}\n`);
}
{
  const ctx = { uses: new Set(), styles: [] };
  const jsx = shared.footer.nodes.map((c) => toJsx(c, ctx, 3)).join('');
  writeFileSync(path.join(OUT, 'Footer.jsx'), `// Generated by tools/generate.mjs\n${imports(ctx, '../')}\n\nexport default function Footer() {\n  return (\n    <>\n${jsx}    </>\n  );\n}\n`);
}

for (const [hash, css] of styleFiles) writeFileSync(path.join(OUT, 'styles', `${hash}.css`), css);

const pageImports = routes.map((r) => `import ${r.comp} from './pages/${r.comp}.jsx';`).join('\n');
const styleImports = [...styleFiles.keys()].map((h) => `import s${h} from './styles/${h}.css?raw';`).join('\n');
const routeRows = routes.map((r) => `  { path: ${JSON.stringify(r.route)}, Component: ${r.comp}, styles: [${r.styles.map((h) => `s${h}`).join(', ')}], head: ${JSON.stringify(r.head)} },`).join('\n');
writeFileSync(path.join(OUT, 'routes.js'), `// Generated by tools/generate.mjs\n${pageImports}\n${styleImports}\n\nexport const mainClass = ${JSON.stringify(shared.mainClass)};\n\nexport const routes = [\n${routeRows}\n];\n`);

// Files served as they are.
for (const file of ['favicon.svg', 'favicon.ico', 'robots.txt', 'sitemap-index.xml', 'sitemap-0.xml', '_astro/contact.CXdCRZIB.css', ...imageFiles.values()]) {
  const to = path.join(PUBLIC, file);
  mkdirSync(path.dirname(to), { recursive: true });
  copyFileSync(path.join(SITE, file), to);
}
writeFileSync(path.join(PUBLIC, '.nojekyll'), '');
console.log(`${routes.length} routes, ${styleFiles.size} page styles`);
