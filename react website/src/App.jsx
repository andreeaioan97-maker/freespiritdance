import { useEffect, useLayoutEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router';
import Navbar from './generated/Navbar.jsx';
import Footer from './generated/Footer.jsx';
import DesignSwitcher from './components/DesignSwitcher.jsx';
import { mainClass, routes } from './generated/routes.js';
import { startCookieConsent } from './lib/cookieConsent.js';
import { revealOnScroll, scheduleFilter } from './lib/pageEffects.js';

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el && value != null) el.setAttribute(attr, value);
};

function applyHead(head, styles) {
  document.title = head.title;
  setMeta('link[rel="canonical"]', 'href', head.canonical);
  setMeta('meta[name="description"]', 'content', head.description);
  setMeta('meta[name="robots"]', 'content', head.robots);
  setMeta('meta[property="og:title"]', 'content', head.ogTitle);
  setMeta('meta[property="og:type"]', 'content', head.ogType);
  setMeta('meta[property="og:image"]', 'content', head.ogImage);
  setMeta('meta[property="og:url"]', 'content', head.ogUrl);
  setMeta('meta[property="og:description"]', 'content', head.ogDescription);
  const current = [...document.head.querySelectorAll('style[data-page-style]')];
  if (current.length === styles.length && current.every((el, i) => el.textContent === styles[i])) return;
  current.forEach((el) => el.remove());
  for (const css of styles) {
    const el = document.createElement('style');
    el.setAttribute('data-page-style', '');
    el.textContent = css;
    document.head.append(el);
  }
}

// A page plus what used to come with loading it: head tags, page styles, scroll position and page scripts.
function Page({ route }) {
  const { hash } = useLocation();
  useLayoutEffect(() => {
    applyHead(route.head, route.styles);
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) target.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route, hash]);
  useEffect(() => {
    const stopReveal = revealOnScroll();
    const stopFilter = scheduleFilter();
    return () => { stopReveal(); stopFilter(); };
  }, [route]);
  return <route.Component />;
}

function Layout() {
  useEffect(startCookieConsent, []);
  return (
    <>
      <Navbar />
      <main className={mainClass}>
        <Outlet />
      </main>
      <Footer />
      <DesignSwitcher />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<Page key={route.path} route={route} />} />
        ))}
      </Route>
    </Routes>
  );
}
