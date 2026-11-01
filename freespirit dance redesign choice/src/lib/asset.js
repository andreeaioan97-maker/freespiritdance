// Prefixes a site path with the folder the site is served from.
export const asset = (p) => import.meta.env.BASE_URL.replace(/\/$/, '') + p;
