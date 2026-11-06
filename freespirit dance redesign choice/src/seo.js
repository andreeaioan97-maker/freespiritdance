// Search and share tags for every page. The build writes them into each page's HTML (tools/prerender.mjs).
import { contact } from './content.js';

// The address the site is meant to live at: canonical links, the sitemap and share images point here.
export const SITE_URL = 'https://freespiritdance.ro';
const BRAND = 'Free Spirit Dance';

// Only pages listed here are indexed; the rest (404, thank-you, legal) ask search engines to skip them.
const descriptions = {
  '/': 'Free Spirit Dance este prima școală 100% dedicată Brazilian Zouk din București. Descoperă un dans fluid, bazat pe conexiune, creativitate și o comunitate caldă.',
  '/cursuri': 'Cursuri de Zouk Brazilian, Salsa, Bachata, dans Latino și dansul mirilor în București, adaptate pentru orice preferință și nivel, la Free Spirit Dance.',
  '/cursuri/cursuri-zouk': 'Cursuri de Zouk Brazilian în București: mișcări ample, conexiune profundă și fluiditate, în lecții construite progresiv, fără presiune, la Free Spirit Dance.',
  '/cursuri/cursuri-salsa': 'Cursuri de Salsa în București pentru primii pași sau pentru tehnică. Lecții progresive și dinamice, într-o comunitate relaxată, la Free Spirit Dance.',
  '/cursuri/cursuri-bachata': 'Cursuri de Bachata în București: descoperă cel mai romantic dans social, cu lecții progresive, fără presiune, alături de comunitatea Free Spirit Dance.',
  '/cursuri/cursuri-latino': 'Cursuri de dans Latino în București: energie, ritm și o metodă distractivă de a te deconecta și de a face mișcare. Lecții progresive la Free Spirit Dance.',
  '/cursuri/dansul-mirilor': 'Lecții de dansul mirilor în București: o coregrafie elegantă și naturală, adaptată stilului vostru și melodiei alese, pentru un prim dans memorabil.',
  '/despre/zouk': 'Ce este Zouk-ul Brazilian: un dans de cuplu fluid, născut din lambada, construit pe conexiunea dintre leader și follower și pe muzicalitate.',
  '/despre/bachazouk': 'Ce este BachaZouk: fuziunea dintre Bachata și Brazilian Zouk, apărută în jurul anului 2014. Află originea stilului și de ce primul pas este Zouk-ul.',
  '/despre/stiluri-de-dans': 'Stiluri de dans latin și club, pe scurt: de la Salsa, Bachata și Merengue la Popping & Locking. Află specificul fiecăruia și alege-l pe al tău.',
  '/orar': 'Orarul cursurilor Free Spirit Dance din București: grupe de Zouk Brazilian pentru începători, improvers și intermediari. Alege zilele care ți se potrivesc.',
  '/preturi': 'Prețurile abonamentelor Free Spirit Dance: pachete pentru cursurile de dans din București, valabile 30 de zile, cu ședințe pierdute recuperabile la alte grupe.',
  '/evenimente': 'Petreceri, workshop-uri și festivaluri de dans organizate sau promovate de Free Spirit Dance. Exersează ce ai învățat și distrează-te cu comunitatea.',
  '/evenimente/zouk-spirit-weekender-2026': 'Zouk Spirit Weekender 2026, 9–11 octombrie în București: workshop-uri și petreceri de Zouk cu Tiago & Emilia. Detalii, preț și rezervare.',
  '/evenimente/dance-casa-festival-2026': 'Dance Casa Festival 2026, 28–31 august la Budapesta: Zouk, Bachata și Kizomba cu instructori internaționali. Detalii, preț și rezervare.',
  '/evenimente/summer-salsa-fest-31-03-august-2026-official': 'Summer Salsa Fest, 31 iulie – 3 august 2026: maraton de dans în aer liber, workshop-uri, show-uri și petreceri pe plajă. Detalii, preț și rezervare.',
  '/evenimente/nice-and-cozy-or-zouk-lambada-and-travel-10th-edition': 'Nice & Cozy, ediția a 10-a, 15–19 mai 2026: Zouk, Lambada și călătorie, cu Otavio & Sara și Cedric & Romane. Detalii, preț și rezervare.',
  '/evenimente/modul-de-bachazouk': 'Modul de BachaZouk la Free Spirit Dance, 9–28 iunie 2025 în București: învață fuziunea dintre Bachata și Zouk. Detalii, program și preț.',
  '/evenimente/free-spirit-christmas-party': 'Free Spirit Christmas Party, 15 decembrie 2024 în București: petrecerea de Crăciun a comunității Free Spirit Dance. Detalii, locație și preț.',
  '/contact': 'Contactează Free Spirit Dance, școala de Zouk Brazilian din București: scrie-ne pentru întrebări sau ca să îți rezervi prima ședință de dans.',
};

// Indexing is off until the redesign moves to SITE_URL; the build sets it with SITE_INDEX=true.
export const indexing = () => typeof process !== 'undefined' && process.env.SITE_INDEX === 'true';

export const pageUrl = (path) => SITE_URL + (path === '/' ? '/' : `${path}/`);

// "X - Free Spirit Dance - Free Spirit Dance" becomes "X - Free Spirit Dance".
export const pageTitle = (route) => route.head.title.replace(/( - Free Spirit Dance)+$/, ` - ${BRAND}`);

// The school's details for Google (address, contact, profiles), on the home page.
const business = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'EducationalOrganization'],
  '@id': `${SITE_URL}/#school`,
  name: BRAND,
  description: descriptions['/'],
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.svg`,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: contact.phone,
  email: contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Intrarea Victor Eftimiu 2',
    postalCode: '010154',
    addressLocality: 'București',
    addressCountry: 'RO',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 44.4371069, longitude: 26.0941636 },
  hasMap: contact.maps,
  sameAs: contact.social.map((s) => s.href),
};

export function pageHead(route, index = indexing()) {
  const title = pageTitle(route);
  const description = descriptions[route.path] || descriptions['/'];
  const listed = route.path in descriptions;
  return {
    title,
    description,
    canonical: route.path === '*' ? null : pageUrl(route.path),
    robots: index && listed ? 'index, follow' : 'noindex, follow',
    listed,
    image: `${SITE_URL}/og-image.jpg`,
    jsonLd: route.path === '/' ? business : null,
  };
}
