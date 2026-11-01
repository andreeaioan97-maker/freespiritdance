import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router';
import { booking, contact, siteLinks } from './content.js';

// Same behaviour as the GitHub version: opens the visitor's email app with the message filled in.
export function BookingForm({ className = '' }) {
  const [sent, setSent] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('goldpot')) return;
    const subject = `Rezervare lecție - ${data.get('nume')}`;
    const body = `Nume: ${data.get('nume')}\nTelefon: ${data.get('telefon')}\nEmail: ${data.get('email')}\n\n${data.get('mesaj')}`;
    setSent(true);
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <form className={`form ${className}`} onSubmit={submit}>
      <input type="text" name="goldpot" hidden tabIndex={-1} autoComplete="off" />
      <label><span>Nume Complet</span><input name="nume" required placeholder="ex. Alex Popescu" /></label>
      <label><span>Telefon</span><input name="telefon" type="tel" required placeholder="07xx xxx xxx" /></label>
      <label className="form-wide"><span>Email</span><input name="email" type="email" required placeholder="hello@exemplu.com" /></label>
      <label className="form-wide"><span>Mesaj</span><textarea name="mesaj" rows="3" required placeholder="Cum te putem ajuta?" /></label>
      <label className="form-check form-wide">
        <input type="checkbox" required />
        <em>Sunt de acord cu <Link to="/legal/termeni-si-conditii">Termenii și Condițiile</Link> și am citit <Link to="/legal/politica-de-confidentialitate">Politica de Confidențialitate</Link>.</em>
      </label>
      <button type="submit" className="form-wide form-submit">{booking.submit}</button>
      <p className="form-wide form-note" role="status">
        {sent ? `Se deschide aplicația ta de email. Apasă Trimite acolo ca să ajungă mesajul. Dacă nu se deschide, scrie-ne la ${contact.email}.` : booking.safe}
      </p>
    </form>
  );
}

export function useClassFilter(classes) {
  const [filter, setFilter] = useState('all');
  return { filter, setFilter, visible: classes.filter((c) => filter === 'all' || c.level === filter) };
}

export function SiteLinks() {
  return (
    <nav className="site-links" aria-label="Toate paginile">
      {siteLinks.map((group) => (
        <div key={group.title}>
          <strong>{group.title}</strong>
          {group.links.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}
        </div>
      ))}
    </nav>
  );
}

// The phone menu: every page of the site, in any design.
export function MenuButton() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  return (
    <>
      <button type="button" className="menu-btn" aria-label="Meniu" aria-expanded={open} onClick={() => setOpen(true)}><Menu size={22} /></button>
      {open && createPortal(
        <div className="site-menu" role="dialog" aria-label="Meniu" onClick={(e) => { if (e.target.closest('a')) setOpen(false); }}>
          <button type="button" aria-label="Închide" onClick={() => setOpen(false)}><X size={22} /></button>
          {siteLinks.map((group) => (
            <div key={group.title} style={{ display: 'contents' }}>
              <small>{group.title}</small>
              {group.links.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}
            </div>
          ))}
        </div>,
        document.body,
      )}
    </>
  );
}
