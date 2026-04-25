import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isSessionExpiringSoon, logout, subscribePendingRequests } from '../lib/apiClient';
import { useSession } from '../context/SessionContext';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/orders', label: 'Orders' },
  { to: '/admin-console', label: 'Admin' }
];

export function AppLayout() {
  const navigate = useNavigate();
  const { session, logout: clearLocalSession } = useSession();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => subscribePendingRequests(setPendingCount), []);

  async function onLogout() {
    if (pendingCount > 0 && !window.confirm('There are active operations. Logout anyway?')) {
      return;
    }
    await logout();
    clearLocalSession();
    navigate('/login');
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">ShopVridhi Console</div>
        <nav className="nav">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button className="btn" type="button" onClick={onLogout}>Logout</button>
      </header>
      <main className="container">
        {isSessionExpiringSoon() ? <div className="warn-banner">Session expiring soon. Keep working, auto-refresh is enabled.</div> : null}
        <div className="panel nested"><strong>Signed in as:</strong> {session?.user.name} ({session?.user.role})</div>
        <Outlet />
      </main>
    </div>
  );
}
