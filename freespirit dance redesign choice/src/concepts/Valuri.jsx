import { useRef } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Check, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link, useHref, useLinkClickHandler } from 'react-router';
import * as c from '../content.js';
import { asset } from '../lib/asset.js';
import { BookingForm, MenuButton, SiteLinks, useClassFilter } from '../shared.jsx';
import './valuri.css';

const ease = [0.2, 0.8, 0.2, 1];
const rise = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } } };
export const In = ({ as = 'div', delay = 0, children, ...props }) => {
  const M = motion[as];
  return <M initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={rise} transition={{ delay }} {...props}>{children}</M>;
};

export function Ribbon() {
  const { scrollYProgress } = useScroll();
  const length = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  return (
    <svg className="va-ribbon" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="va-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7c4dff" />
          <stop offset="1" stopColor="#ff4081" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 72 0 C 110 70, 5 110, 12 190 S 105 300, 88 390 S -5 490, 14 590 S 110 690, 84 780 S 10 900, 50 1000"
        fill="none" stroke="url(#va-grad)" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke"
        style={{ pathLength: length }}
      />
    </svg>
  );
}

function Hero({ photoExtra }) {
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 800], [0, 90]);
  const blobY = useTransform(scrollY, [0, 800], [0, -140]);
  const words = c.hero.title.split(' ');
  return (
    <section className="va-hero">
      <motion.div className="va-blob va-blob-a" style={{ y: blobY }} />
      <motion.div className="va-blob va-blob-b" style={{ y: photoY }} />
      <div className="va-hero-text">
        <motion.span className="va-badge" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>{c.hero.badge}</motion.span>
        <h1>
          {words.map((w, i) => (
            <span className="va-word" key={i}>
              <motion.span className={w === 'Zouk' ? 'va-grad' : ''} initial={{ y: '110%', rotate: 6 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 1, delay: 0.1 + i * 0.07, ease }}>{w}</motion.span>
            </span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }}>{c.hero.text}</motion.p>
        <motion.div className="va-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}>
          <a className="va-btn" href="#booking">Rezervă o lecție</a>
          <a className="va-btn va-btn-ghost" href="#orar">Vezi orarul</a>
        </motion.div>
      </div>
      <motion.div className="va-hero-photo" style={{ y: photoY }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease }}>
        <div className="va-morph"><img src={c.hero.image} alt="Zouk Brazilian" /></div>
        {photoExtra ?? <span className="va-tag">{c.hero.tagline}</span>}
      </motion.div>
    </section>
  );
}

function Course({ course, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  return (
    <article ref={ref} className={`va-course ${index % 2 ? 'va-course-flip' : ''}`}>
      <div className={`va-course-photo va-shape-${index}`}>
        <motion.img src={course.image} alt={course.title} style={{ y, scale: 1.15 }} loading="lazy" />
      </div>
      <In className="va-course-text">
        <h3>{course.title}</h3>
        <p>{course.text}</p>
        <Link to={course.href} className="va-link">Detalii Curs <ArrowRight size={18} /></Link>
      </In>
    </article>
  );
}

function Schedule() {
  const { filter, setFilter, visible } = useClassFilter(c.classes);
  // A plain motion.a, because AnimatePresence never removes cards made with motion.create(Link).
  const to = c.live('/contact');
  const href = useHref(to);
  const onClick = useLinkClickHandler(to);
  return (
    <section className="va-section" id="orar">
      <In className="va-head"><h2>{c.scheduleIntro.title}</h2><p>{c.scheduleIntro.text}</p></In>
      <div className="va-filters">
        {c.filters.map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)} className={filter === f.id ? 'on' : ''} aria-pressed={filter === f.id}>
            {filter === f.id && <motion.span layoutId="va-pill" className="va-pill" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />}
            <b>{f.label}</b>
          </button>
        ))}
      </div>
      <div className="va-classes">
        <AnimatePresence mode="popLayout">
          {visible.map((k) => (
            <motion.a layout key={k.day} href={href} onClick={onClick} className="va-class" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ type: 'spring', stiffness: 220, damping: 24 }}>
              <small>{k.day}</small>
              <strong>{k.time}</strong>
              <span>{k.name}</span>
              <em>{k.levelLabel}</em>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>
      <p className="va-foot">{c.scheduleIntro.footer} <a href="#booking">{c.scheduleIntro.footerLink}</a> {c.scheduleIntro.footerRest}</p>
    </section>
  );
}

function Team() {
  return (
    <section className="va-section" id="echipa">
      <In className="va-head"><h2>{c.teamIntro.title}</h2><p>{c.teamIntro.text}</p></In>
      <div className="va-team">
        {c.team.map((t, i) => (
          <In key={t.name} delay={i * 0.08} className={`va-person va-person-${i}`}>
            <div className="va-person-photo"><img src={t.image} alt={t.name} loading="lazy" /></div>
            <strong>{t.name}</strong>
            <span><a href={t.facebook}>Facebook</a> · <a href={t.instagram}>Instagram</a></span>
          </In>
        ))}
      </div>
    </section>
  );
}

export const rootClass = "va";

export function Header() {
  return (
      <header className="va-nav">
        <Link to="/" aria-label="Free Spirit Dance"><img src={asset('/logo.svg')} alt="Logo" width="50" height="50" /></Link>
        <nav>{c.nav.map((n) => <Link key={n.href} to={n.href}>{n.label}</Link>)}</nav>
        <Link className="va-btn va-btn-small" to="/#booking">Rezervă</Link>
        <MenuButton />
    </header>
  );
}

export function Footer() {
  return (
      <footer className="va-footer"><SiteLinks /><span>© 2026 Free Spirit Dance. Toate drepturile rezervate.</span></footer>
  );
}

// Idea 10 builds on this page and swaps these pieces.
export function ValuriPage({ className = 'va', nav = <Header />, backdrop = null, photoExtra, team }) {
  return (
    <div className={className}>
      {backdrop}
      <Ribbon />
      {nav}
      <main id="top">
        <Hero photoExtra={photoExtra} />
        <section className="va-values">
          {c.values.map((v, i) => (
            <In key={v.title} className={`va-value va-value-${i}`} delay={i * 0.1}>
              <span className="va-num">0{i + 1}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </In>
          ))}
        </section>
        <section className="va-section" id="cursuri">
          <In className="va-head"><h2>{c.coursesIntro.title}</h2><p>{c.coursesIntro.text}</p></In>
          {c.courses.map((course, i) => <Course key={course.title} course={course} index={i} />)}
        </section>
        <Schedule />
        <section className="va-section" id="preturi">
          <In className="va-head"><h2>{c.pricesIntro.title}</h2><p>{c.pricesIntro.text}</p></In>
          <div className="va-prices">
            {c.prices.map((p, i) => (
              <In key={i} delay={i * 0.12} className={`va-price ${p.popular ? 'va-price-top' : ''}`}>
                {p.popular && <span className="va-pop">{p.popular}</span>}
                <h3>{p.name}</h3>
                <div className="va-amount"><b>{p.amount}</b> <small>{p.unit}</small></div>
                <ul>{p.perks.map((x) => <li key={x}><Check size={16} /> {x}</li>)}</ul>
                <a href="#booking" className="va-btn">Alege Abonament</a>
              </In>
            ))}
          </div>
        </section>
        {team ?? <Team />}
        <section className="va-book" id="booking">
          <In className="va-book-card">
            <h2>{c.booking.title}</h2>
            <p>{c.booking.text}</p>
            <BookingForm />
          </In>
          <In className="va-where" delay={0.15}>
            <h3>{c.contact.title}</h3>
            <a href={c.contact.maps}><MapPin size={18} /> {c.contact.address}</a>
            <a href={`tel:${c.contact.phone}`}><Phone size={18} /> {c.contact.phone}</a>
            <a href={c.contact.whatsapp}><MessageCircle size={18} /> Scrie-ne pe WhatsApp</a>
            <div className="va-social">{c.contact.social.map((s) => <a key={s.label} href={s.href}>{s.label}</a>)}</div>
          </In>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function Valuri() {
  return <ValuriPage />;
}
