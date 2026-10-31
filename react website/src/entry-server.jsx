import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App.jsx';
import { routes } from './generated/routes.js';

export { routes };

export function render(location, basename) {
  return renderToString(
    <StaticRouter location={location} basename={basename}>
      <App />
    </StaticRouter>,
  );
}
