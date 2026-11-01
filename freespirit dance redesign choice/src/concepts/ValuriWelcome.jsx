import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import * as c from '../content.js';
import { asset } from '../lib/asset.js';
import { MenuButton } from '../shared.jsx';
import { Footer, Ribbon, ValuriPage } from './Valuri.jsx';
import { PhotoRing, Team } from './ValuriLogo.jsx';

export { Footer };
export const rootClass = 'va vl vw';
export const InnerExtra = Ribbon;

const DESPRE = c.siteLinks.find((g) => g.title === 'Despre Noi').links;

// A mouse opens it by hovering and Despre stays a link. A finger has no hover, so a tap opens and closes it instead.
function DespreMenu({ href, label }) {
  const root = useRef(null);
  const touch = useRef(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onOutside = (e) => { if (!root.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', onOutside);
    return () => document.removeEventListener('pointerdown', onOutside);
  }, [open]);

  const onClick = (e) => {
    if (!touch.current) return;
    e.preventDefault();
    setOpen((was) => !was);
  };

  return (
    <div ref={root} className={`vw-sub${open ? ' open' : ''}`}>
      <Link to={href} onPointerDown={(e) => { touch.current = e.pointerType === 'touch'; }} onClick={onClick}>{label}</Link>
      <div className="vw-sub-menu" onClick={() => setOpen(false)}>
        {DESPRE.map(([text, to]) => <Link key={to} to={to}>{text}</Link>)}
      </div>
    </div>
  );
}

export function Header() {
  return (
    <header className="vl-nav">
      <Link to="/" aria-label="Free Spirit Dance"><img src={asset('/logo.svg')} alt="Logo" width="224" height="265" /></Link>
      <nav>
        {c.nav.map((n) => (n.label === 'Despre'
          ? <DespreMenu key={n.href} href={n.href} label={n.label} />
          : <Link key={n.href} to={n.href}>{n.label}</Link>))}
      </nav>
      <Link className="vl-nav-cta" to="/#booking">Rezervă</Link>
      <MenuButton />
    </header>
  );
}

export default function ValuriWelcome() {
  return <ValuriPage className={rootClass} nav={<Header />} photoExtra={<PhotoRing />} team={<Team />} />;
}
