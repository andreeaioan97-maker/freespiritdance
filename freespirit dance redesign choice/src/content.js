// All text is the live home page's own. Paths are this app's own routes.
const img = (id, size, query) => `https://cdn.sanity.io/images/kqqszoet/production/${id}-${size}.png?${query}&auto=format`;

export const live = (path) => path;

export const hero = {
  badge: 'Zouk Brazilian · București',
  title: 'Școala de dans Zouk în București',
  text: 'Free Spirit Dance este prima școală din București specializată în Brazilian Zouk. Te invităm să explorezi un stil de dans definit prin fluiditate și creativitate, alături de o comunitate vibrantă unde pasiunea și conexiunea autentică sunt pe primul loc.',
  image: img('ee12a9bb534a31c8ca18fad68a766386b890e386', '1694x2048', 'w=1200'),
  tagline: 'Fluiditate · Conexiune · Flow',
};

export const values = [
  { title: 'Instructori profesioniști', text: 'Echipa noastră este formată din dansatori cu experiență, dar mai presus de toate, din oameni calzi și răbdători, dedicați progresului tău.' },
  { title: 'Atmosferă relaxată', text: 'Am creat un studio de dans în unde te simți "ca acasă". Fără presiune, fără judecată - doar bucuria pură de a dansa.' },
  { title: 'Excelența în dans', text: 'Am creat cursuri optimizate special pentru ritmul de viață al adulților care își doresc un hobby de înaltă calitate, într-un mediu structurat și profesionist.' },
];

export const coursesIntro = {
  title: 'Alege cursul de dans care ți se potrivește',
  text: 'Evoluăm împreună, pas cu pas. Indiferent de experiența ta, avem o grupă potrivită pentru tine.',
};

export const courses = [
  { title: 'Cursuri de Zouk Brazilian', href: live('/cursuri/cursuri-zouk'), image: img('fe59b3c5e8201e3f9afa51f4b56a04b81ad0a1db', '1494x1766', 'w=1000'), text: 'Free Spirit Dance îți aduce, în inima capitalei, cele mai fluide și expresive cursuri de Zouk din București. Renumit pentru mișcările sale ample, conexiunea profundă și fluiditatea sa unică, Zouk-ul Brazilian este o adevărată călătorie.' },
  { title: 'Dansul mirilor', href: live('/cursuri/dansul-mirilor'), image: img('e87912ad341d937bd0d69a5624ca111ca198f6a1', '1170x780', 'w=1000'), text: 'Pregătește un moment special pentru nunta ta cu lecții dedicate de dansul mirilor. La Free Spirit Dance te ajutăm să înveți o coregrafie elegantă și naturală, adaptată stilului vostru și melodiei alese, astfel încât primul vostru dans să fie memorabil.' },
  { title: 'Cursuri de dans Latino', href: live('/cursuri/cursuri-latino'), image: img('5965b88102e693dc43ca10f56af96c2c71e5af18', '640x640', 'w=1000'), text: 'Dansurile latino sunt renumite pentru energia lor debordantă și capacitatea de a arde calorii într-un mod distractiv. Este cea mai bună metodă de a te deconecta și de a-ți încărca bateriile.' },
];

export const scheduleIntro = {
  title: 'Orar clase Zouk',
  text: 'Găsește grupa potrivită nivelului tău. Modulele de începători se deschid o dată la două luni.',
  footer: 'Nu găsești un interval potrivit?',
  footerLink: 'Scrie-ne un mesaj',
  footerRest: 'și te anunțăm când deschidem o grupă nouă de începători!',
};

export const filters = [
  { id: 'all', label: 'Toate Nivelurile' },
  { id: 'beginner', label: 'Începători' },
  { id: 'improvers', label: 'Improvers' },
  { id: 'intermediate', label: 'Intermediari' },
];

export const classes = [
  { day: 'Marți', time: '20:00 - 21:20', level: 'intermediate', levelLabel: 'Intermediari', name: 'Grupă Intermediari de Zouk Brazilian' },
  { day: 'Miercuri', time: '19:30 - 20:50', level: 'improvers', levelLabel: 'Improvers', name: 'Grupă Improvers de Zouk Brazilian' },
  { day: 'Joi', time: '20:00 - 21:20', level: 'beginner', levelLabel: 'Începători', name: 'Grupă Începători de Zouk Brazilian' },
];

export const pricesIntro = {
  title: 'Prețurile noastre',
  text: 'Transformă dansul într-un stil de viață! Abonamentele noastre sunt valabile 30 de zile. Poți plăti cash sau cu cardul la sală. Acces gratuit la petrecerile organizate.',
};

export const prices = [
  { name: 'O ședință', amount: 100, unit: 'LEI /ședință', perks: ['Ședințe de 1h 30min'] },
  { name: '4 Ședințe', amount: 280, unit: 'LEI /lună', popular: 'Cel mai popular', perks: ['Ședințe de 1h 30min', 'discount la evenimentele organizate', 'acces gratuit la practice party'] },
  { name: '4 Ședințe', amount: 500, unit: 'LEI /lună', perks: ['Abonament cuplu (2 pers)', 'Ședințe de 1h 30min', 'discount la evenimentele organizate', 'acces gratuit la practice party'] },
];

export const teamIntro = {
  title: 'Echipa noastră',
  text: 'Instructori pasionați, dedicați evoluției tale în comunitatea Zouk.',
};

export const team = [
  { name: 'Armin Sharm', image: img('ea75fcd35c705e7b7df802445d6674a3ccfe671c', '304x332', 'rect=19,0,266,332&w=600&h=750&fit=crop'), facebook: 'https://www.facebook.com/armin.sharm', instagram: 'https://www.instagram.com/dj_sharm/' },
  { name: 'Misha Tanasescu', image: img('628547b5eed41963a76bd5508902bf0e637c436d', '304x332', 'rect=19,0,266,332&w=600&h=750&fit=crop'), facebook: 'https://www.facebook.com/tanasescu.misha', instagram: 'https://www.instagram.com/mishatanasescu' },
  { name: 'Raluca Mihaela Ion', image: img('166cc7ea1209eba22509c2382a98ffec42773daa', '304x332', 'rect=19,0,266,332&w=600&h=750&fit=crop'), facebook: 'https://www.facebook.com/ion.raluca.mihaela', instagram: 'https://www.instagram.com/ralucamihaelaion/' },
  { name: 'Bogdan Chicos', image: img('b2ed1534e6e873295472786421b83d84cee75bd2', '1984x2651', 'rect=0,86,1984,2480&w=600&h=750&fit=crop'), facebook: 'https://www.facebook.com/chicos.bogdan.9', instagram: 'https://www.instagram.com/chicosbogdan/' },
  { name: 'Alexandru Dan Croitoriu', image: img('c82d5cc769eba529571197d11ed116f9b6ba016e', '689x1071', 'rect=0,106,689,861&w=600&h=750&fit=crop'), facebook: 'https://www.facebook.com/CroitoriuAlexandruDan', instagram: 'https://www.instagram.com/flowllex/' },
];

export const booking = {
  title: 'Rezervă o lecție',
  text: 'Ești gata să intri în lumea Brazilian Zouk? Trimite-ne un mesaj și te contactăm pentru a-ți confirma locul la prima ta ședință.',
  safe: 'Datele tale sunt în siguranță. Nu trimitem spam.',
  submit: 'Trimite Rezervarea',
};

export const contact = {
  title: 'Unde ne găsești',
  address: 'Intrarea Victor Eftimiu 2, 010154 București',
  maps: 'https://www.google.com/maps/search/?api=1&query=Free%20Spirit%20Dance&query_place_id=ChIJ_0gwEX__sUARKPOo-xSZzTo',
  phone: '+40735425765',
  email: 'freespiritdance9@gmail.com',
  whatsapp: 'https://wa.me/40735425765',
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/free.spiritdanceromania' },
    { label: 'Instagram', href: 'https://www.instagram.com/free.spiritdanceromania' },
    { label: 'YouTube', href: 'https://www.youtube.com/@free.spiritdanceromania' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@free.spiritdanceromania' },
  ],
};

export const nav = [
  { label: 'Cursuri', href: '/cursuri' },
  { label: 'Orar', href: '/orar' },
  { label: 'Evenimente', href: '/evenimente' },
  { label: 'Prețuri', href: '/preturi' },
  { label: 'Despre', href: '/despre/zouk' },
  { label: 'Contact', href: '/contact' },
];

export const siteLinks = [
  { title: 'Explorează', links: [['Acasă', '/'], ['Cursuri', '/cursuri'], ['Orar', '/orar'], ['Evenimente', '/evenimente'], ['Prețuri', '/preturi'], ['Contact', '/contact']] },
  { title: 'Cursuri', links: [['Zouk Brazilian', '/cursuri/cursuri-zouk'], ['Bachata', '/cursuri/cursuri-bachata'], ['Salsa', '/cursuri/cursuri-salsa'], ['Latino', '/cursuri/cursuri-latino'], ['Dansul mirilor', '/cursuri/dansul-mirilor']] },
  { title: 'Despre Noi', links: [['Brazilian Zouk', '/despre/zouk'], ['BachaZouk', '/despre/bachazouk'], ['Stiluri de Dans', '/despre/stiluri-de-dans']] },
  { title: 'Legal', links: [['Confidențialitate', '/legal/politica-de-confidentialitate'], ['Cookie-uri', '/legal/politica-de-cookie-uri'], ['Termeni', '/legal/termeni-si-conditii']] },
];
