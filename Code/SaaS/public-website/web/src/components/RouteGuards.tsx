import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../context/SessionContext';

type Role = 'owner' | 'manager' | 'cashier' | 'staff' | 'admin';

export function RequireAuth() {
  const { isAuthenticated } = useSession();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function RequireRole({ roles }: { roles: Role[] }) {
  const { session } = useSession();
  if (!session) return <Navigate to="/login" replace />;
  if (!roles.includes(session.user.role as Role)) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
