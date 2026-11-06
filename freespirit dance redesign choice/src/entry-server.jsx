import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App.jsx';
import { routes } from './generated/routes.js';
import originalCss from './generated/styles/original.css?raw';
import { pageHead } from './seo.js';

export { originalCss, pageHead, routes };

export function render(location, basename) {
  return renderToString(
    <StaticRouter location={location} basename={basename}>
      <App />
    </StaticRouter>,
  );
}
