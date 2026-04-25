import { useEffect, useMemo, useState } from 'react';
import { authenticatedRequest } from '../lib/apiClient';
import { useSession } from '../context/SessionContext';

type SummaryResponse = { kpis: { itemCount: number; lowStockCount: number; orderCount: number } };

const roleCards: Record<string, string[]> = {
  owner: ['Sales trend', 'Low-stock alerts', 'Sync health', 'Udhaar dues'],
  manager: ['Team productivity', 'Pending stock audits', 'Open orders', 'Daily variance'],
  cashier: ['Quick bill create', 'Hold/resume bills', 'Payment mode split', 'Customer lookup'],
  staff: ['Stock count actions', 'Rack transfer tasks', 'Inward queue', 'Cycle count status'],
  admin: ['Tenant health', 'Plan conversion', 'Policy action queue', 'Audit anomalies']
};

export function DashboardPage() {
  const { session } = useSession();
  const [summary, setSummary] = useState<SummaryResponse['kpis'] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    authenticatedRequest<SummaryResponse>('/api/v1/dashboard/summary')
      .then((data) => setSummary(data.kpis))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load dashboard'));
  }, []);

  const cards = useMemo(() => roleCards[session?.user.role || 'staff'] || roleCards.staff, [session?.user.role]);

  return (
    <section className="panel">
      <h2>Role Dashboard</h2>
      {error ? <p className="error-text">{error}</p> : null}
      <div className="grid three">
        <article className="step-card"><strong>Total Items</strong><p>{summary?.itemCount ?? '-'}</p></article>
        <article className="step-card"><strong>Low Stock</strong><p>{summary?.lowStockCount ?? '-'}</p></article>
        <article className="step-card"><strong>Total Orders</strong><p>{summary?.orderCount ?? '-'}</p></article>
      </div>
      <h3>Role Quick Panels</h3>
      <div className="grid three">
        {cards.map((card) => <article key={card} className="step-card">{card}</article>)}
      </div>
    </section>
  );
}
