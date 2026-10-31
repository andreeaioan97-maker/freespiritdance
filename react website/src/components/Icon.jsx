import { createElement } from 'react';
import { ArrowRight, Calendar, Check, CheckCircle, CheckCircle2, ChevronDown, ChevronRight, Clock, Cookie, Crown, Facebook, Heart, Instagram, Layers, Mail, MapPin, Menu, Music, Music2, Phone, Star, User, Users, X, Youtube } from 'lucide';

const ICONS = { ArrowRight, Calendar, Check, CheckCircle, CheckCircle2, ChevronDown, ChevronRight, Clock, Cookie, Crown, Facebook, Heart, Instagram, Layers, Mail, MapPin, Menu, Music, Music2, Phone, Star, User, Users, X, Youtube };

const toProps = (attrs) => Object.fromEntries(Object.entries(attrs).map(([k, v]) => [k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v]));

// Draws the same <svg> the live site's lucide script puts in place of <i data-lucide>.
export default function Icon({ name, dataName, className, ...rest }) {
  return createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'data-lucide': dataName, 'aria-hidden': 'true', ...rest, className: `lucide lucide-${dataName} ${className ?? ''}`.trim() },
    ICONS[name].map(([tag, attrs], i) => createElement(tag, { key: i, ...toProps(attrs) })),
  );
}
