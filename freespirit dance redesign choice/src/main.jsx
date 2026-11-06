import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';
const root = document.getElementById('root');
const app = (
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);
// Built pages arrive already rendered (tools/prerender.mjs); the dev server sends an empty page.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
