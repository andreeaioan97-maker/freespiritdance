import { useEffect, useLayoutEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { MotionConfig, motion } from 'motion/react';
import ValuriWelcome, { Footer, Header, InnerExtra, rootClass } from './concepts/ValuriWelcome.jsx';
import { mainClass, routes } from './generated/routes.js';
import originalCss from './generated/styles/original.css?raw';
import { revealOnScroll, scheduleFilter } from './lib/pageEffects.js';
import { pageTitle } from './seo.js';
import './base.css';
import './concepts/inner-themes.css';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

// The same page in the other published version; a page that doesn't exist goes to its home page.
function DesignSwitcher() {
  const { pathname, hash } = useLocation();
  const current = pathname.replace(/\/$/, '') || '/';
  const page = routes.some((r) => r.path === current) ? current : '/';
  return (
    <nav className="switcher" aria-label="Versiuni ale site-ului">
      <a href={`${BASE}/original${page}${hash}`}>Original</a>
      <a className="active" aria-current="page" href={`${BASE}${page}${hash}`}>Redesign</a>
    </nav>
  );
}

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) target.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

// Any page other than the home page: its original content, with the design's header and footer.
function InnerPage({ route }) {
  useLayoutEffect(() => {
    document.title = pageTitle(route);
    // The built page ships this page's styles; ours replace them so they don't linger on other pages.
    document.querySelectorAll('style[data-page-style]').forEach((el) => el.remove());
    const tags = [originalCss, ...route.styles].map((css) => {
      const el = document.createElement('style');
      el.textContent = css;
      document.head.append(el);
      return el;
    });
    return () => tags.forEach((el) => el.remove());
  }, [route]);
  useEffect(() => {
    const stopReveal = revealOnScroll();
    const stopFilter = scheduleFilter();
    return () => { stopReveal(); stopFilter(); };
  }, [route]);
  return (
    <div className={rootClass}>
      <Header />
      <div className={`inner-page bg-brand-light text-brand-dark font-sans antialiased`}>
        <InnerExtra />
        <motion.main className={mainClass} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}>
          <route.Component />
        </motion.main>
      </div>
      <Footer />
    </div>
  );
}

function Home() {
  useEffect(() => { document.title = pageTitle(routes.find((r) => r.path === '/')); }, []);
  return <ValuriWelcome />;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        {routes.filter((r) => r.path !== '/').map((r) => (
          <Route key={r.path} path={r.path} element={<InnerPage key={r.path} route={r} />} />
        ))}
      </Routes>
      <DesignSwitcher />
    </MotionConfig>
  );
}
