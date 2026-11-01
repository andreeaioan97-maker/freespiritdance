import { useLocation } from 'react-router';
import { routes } from '../generated/routes.js';
import './design-switcher.css';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const REDESIGN = BASE.replace(/\/original$/, '');

// The same page in the other published version; a page that doesn't exist goes to its home page.
export default function DesignSwitcher() {
  const { pathname, hash } = useLocation();
  const current = pathname.replace(/\/$/, '') || '/';
  const known = routes.some((r) => r.path === current);
  return (
    <nav className="design-switcher" aria-label="Versiuni ale site-ului">
      <a className="active" aria-current="page" href={`${BASE}${known ? current : '/'}${hash}`}>Original</a>
      <a href={`${REDESIGN}${known ? current : '/'}${hash}`}>Redesign</a>
    </nav>
  );
}
