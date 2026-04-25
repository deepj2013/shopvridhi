import { NavLink, Outlet } from 'react-router-dom';
import { trackCtaClick } from '../lib/analytics';

const links = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/compare', label: 'Compare' },
  { to: '/security', label: 'Security' },
  { to: '/ecommerce', label: 'E-commerce' },
  { to: '/contact', label: 'Contact' }
];

export function MainLayout() {
  return (
    <div className="app-shell">
      <div className="promo-strip">Launch offer: 30% off annual plans for early merchants.</div>
      <header className="topbar">
        <div className="brand">ShopVridhi</div>
        <nav className="nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => trackCtaClick(`nav_${link.label.toLowerCase()}`, 'global')}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
