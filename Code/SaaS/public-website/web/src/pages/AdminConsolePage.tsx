import { useEffect, useState } from 'react';
import { authenticatedRequest } from '../lib/apiClient';
import { trackEvent } from '../lib/publicApi';

type Tenant = { _id: string; name: string; status: string; planCode: string };
type User = { _id: string; name: string; email: string; role: string; active: boolean };
type Plan = { _id: string; code: string; name: string; monthlyPrice: number };
type AuditLog = { _id: string; action: string; entityType: string; createdAt: string };

export function AdminConsolePage() {
  const [tab, setTab] = useState<'tenants' | 'users' | 'plans' | 'audits'>('tenants');
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      authenticatedRequest<{ tenants: Tenant[] }>('/api/v1/admin/tenants'),
      authenticatedRequest<{ users: User[] }>('/api/v1/admin/users'),
      authenticatedRequest<{ plans: Plan[] }>('/api/v1/admin/plans'),
      authenticatedRequest<{ logs: AuditLog[] }>('/api/v1/admin/audit-logs')
    ])
      .then(([t, u, p, l]) => {
        setTenants(t.tenants);
        setUsers(u.users);
        setPlans(p.plans);
        setLogs(l.logs);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load admin console'));
  }, []);

  return (
    <section className="panel">
      <h2>Admin Control Tower</h2>
      {error ? <p className="error-text">{error}</p> : null}
      <div className="chip-row">
        <button className="btn" type="button" onClick={() => { setTab('tenants'); void trackEvent('admin_tab_opened', { tab: 'tenants' }); }}>Tenants</button>
        <button className="btn" type="button" onClick={() => { setTab('users'); void trackEvent('admin_tab_opened', { tab: 'users' }); }}>Users</button>
        <button className="btn" type="button" onClick={() => { setTab('plans'); void trackEvent('admin_tab_opened', { tab: 'plans' }); }}>Plans</button>
        <button className="btn" type="button" onClick={() => { setTab('audits'); void trackEvent('admin_tab_opened', { tab: 'audits' }); }}>Audits</button>
      </div>

      {tab === 'tenants' ? (
        <table className="table"><thead><tr><th>Name</th><th>Status</th><th>Plan</th></tr></thead><tbody>{tenants.map((t) => <tr key={t._id}><td>{t.name}</td><td>{t.status}</td><td>{t.planCode}</td></tr>)}</tbody></table>
      ) : null}
      {tab === 'users' ? (
        <table className="table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Active</th></tr></thead><tbody>{users.map((u) => <tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.active ? 'Yes' : 'No'}</td></tr>)}</tbody></table>
      ) : null}
      {tab === 'plans' ? (
        <table className="table"><thead><tr><th>Code</th><th>Name</th><th>Monthly</th></tr></thead><tbody>{plans.map((p) => <tr key={p._id}><td>{p.code}</td><td>{p.name}</td><td>{p.monthlyPrice}</td></tr>)}</tbody></table>
      ) : null}
      {tab === 'audits' ? (
        <table className="table"><thead><tr><th>Action</th><th>Entity</th><th>Time</th></tr></thead><tbody>{logs.map((l) => <tr key={l._id}><td>{l.action}</td><td>{l.entityType}</td><td>{new Date(l.createdAt).toLocaleString()}</td></tr>)}</tbody></table>
      ) : null}
    </section>
  );
}
