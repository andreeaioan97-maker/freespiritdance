// Same CookieConsent version and settings as the live site, including its Google Analytics and Meta Pixel ids.
import * as CookieConsent from 'vanilla-cookieconsent';
import { asset } from './asset.js';

const GA_ID = 'G-F8HNSENK7C';
const PIXEL_ID = '896101656625945';
let gaLoaded = false;
let pixelLoaded = false;

function loadGa(id) {
  if (gaLoaded) return;
  gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
  const s = document.createElement('script');
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  s.async = true;
  s.onload = () => {
    window.gtag('js', new Date());
    window.gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
    window.gtag('config', id);
  };
  s.onerror = () => console.warn('gtag.js blocked or failed to load');
  document.head.appendChild(s);
}

function loadPixel(id) {
  if (pixelLoaded) return;
  pixelLoaded = true;
  if (!window.fbq) {
    const q = (window.fbq = function () { q.callMethod ? q.callMethod.apply(q, arguments) : q.queue.push(arguments); });
    if (!window._fbq) window._fbq = q;
    q.push = q; q.loaded = true; q.version = '2.0'; q.queue = [];
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://connect.facebook.net/en_US/fbevents.js';
    const first = document.getElementsByTagName('script')[0];
    first.parentNode.insertBefore(s, first);
  }
  window.fbq('consent', 'grant');
  window.fbq('init', id);
  window.fbq('track', 'PageView');
}

function revokePixel() {
  window.fbq?.('consent', 'revoke');
  for (const c of ['_fbp', '_fbc']) document.cookie = `${c}=; Max-Age=0; path=/`;
}

export function startCookieConsent() {
  CookieConsent.run({
    root: '#cc-container',
    guiOptions: {
      consentModal: { layout: 'box inline', position: 'bottom left' },
      preferencesModal: { layout: 'box', position: 'right', equalWeightButtons: true, flipButtons: false },
    },
    categories: {
      necessary: { readOnly: true },
      functionality: {},
      analytics: { enabled: true, services: { ga: { label: 'Google Analytics', onAccept: () => loadGa(GA_ID), onReject: () => {}, cookies: [{ name: /^_ga/ }, { name: '_gid' }, { name: '_gat' }] } } },
      marketing: { enabled: true, services: { meta: { label: 'Meta Pixel', onAccept: () => loadPixel(PIXEL_ID), onReject: () => revokePixel(), cookies: [{ name: '_fbp' }, { name: '_fbc' }] } } },
    },
    language: {
      default: 'ro',
      autoDetect: 'browser',
      translations: {
        ro: {
          consentModal: {
            title: 'Salut călătorule, e timpul pentru cookie-uri!',
            description: 'Folosim cookie-uri pentru a-ți oferi o experiență mai bună pe site, pentru a analiza traficul și pentru a personaliza conținutul. Poți accepta toate cookie-urile sau să îți gestionezi preferințele.',
            acceptAllBtn: 'Acceptă tot',
            acceptNecessaryBtn: 'Respinge toate',
            showPreferencesBtn: 'Gestionează preferințele',
            footer: `
                <a href="${asset('/legal/politica-de-confidentialitate')}" target="_blank">Politica de confidențialitate</a>
                <a href="${asset('/legal/termeni-si-conditii')}" target="_blank">Termeni și condiții</a>
                <a href="${asset('/legal/politica-de-cookie-uri')}" target="_blank">Politica de cookie-uri</a>
            `,
          },
          preferencesModal: {
            title: 'Centrul de preferințe pentru consimțământ',
            acceptAllBtn: 'Acceptă tot',
            acceptNecessaryBtn: 'Respinge toate',
            savePreferencesBtn: 'Salvează preferințele',
            closeIconLabel: 'Închide fereastra',
            serviceCounterLabel: 'Serviciu|Servicii',
            sections: [
              { title: 'Utilizarea cookie-urilor', description: 'Cookie-urile ne ajută să îmbunătățim funcționarea site-ului, să personalizăm conținutul și să analizăm traficul pentru a-ți oferi cea mai bună experiență.' },
              { title: 'Cookie-uri strict necesare <span class="pm__badge">Întotdeauna activate</span>', description: 'Aceste cookie-uri sunt esențiale pentru funcționarea site-ului și nu pot fi dezactivate. Ele includ setările de securitate și autentificare.', linkedCategory: 'necessary' },
              { title: 'Cookie-uri pentru analiză', description: 'Folosim aceste cookie-uri pentru a colecta date despre cum utilizezi site-ul, astfel încât să putem îmbunătăți performanța și conținutul oferit.', linkedCategory: 'analytics' },
              { title: 'Cookie-uri pentru marketing', description: 'Folosim aceste cookie-uri pentru a personaliza conținutul și reclamele în funcție de preferințele tale.', linkedCategory: 'marketing' },
              { title: 'Mai multe informații', description: `Pentru orice întrebări legate de politica noastră privind cookie-urile și opțiunile tale, te rugăm să ne <a class="cc__link" href="${asset('/contact')}">contactezi</a>.` },
            ],
          },
        },
      },
    },
  });
}
