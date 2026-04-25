import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { authenticatedRequest } from '../lib/apiClient';
import { trackEvent } from '../lib/publicApi';

type InventoryItem = {
  _id: string;
  name: string;
  sku: string;
  barcode: string;
  category: string;
  price: number;
  stock: number;
  location: string;
  online: boolean;
};

type InventoryResponse = {
  items: InventoryItem[];
  pagination: { page: number; totalPages: number; total: number };
};

const defaultForm = { name: '', sku: '', category: '', price: '0', stock: '0', location: '', online: false };

export function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [filters, setFilters] = useState({ search: '', category: '', location: '', online: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [form, setForm] = useState(defaultForm);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState<InventoryItem | null>(null);
  const [movement, setMovement] = useState({ itemId: '', movementType: 'inward', quantity: '1', fromLocation: '', toLocation: '' });
  const [auditId, setAuditId] = useState('');
  const [auditCount, setAuditCount] = useState({ itemId: '', physicalQty: '0' });
  const [message, setMessage] = useState('');

  const query = useMemo(() => {
    const params = new URLSearchParams({ page: String(page), limit: '5', search: filters.search });
    if (filters.category) params.set('category', filters.category);
    if (filters.location) params.set('location', filters.location);
    if (filters.online) params.set('online', filters.online);
    return params.toString();
  }, [filters, page]);

  async function loadItems() {
    const data = await authenticatedRequest<InventoryResponse>(`/api/v1/inventory/items?${query}`);
    setItems(data.items);
    setTotalPages(data.pagination.totalPages || 1);
  }

  useEffect(() => {
    loadItems().catch(() => setMessage('Could not load items'));
  }, [query]);

  function validateForm() {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.sku.trim()) errors.sku = 'SKU is required';
    if (!form.category.trim()) errors.category = 'Category is required';
    if (Number(form.price) < 0) errors.price = 'Price must be >= 0';
    if (Number(form.stock) < 0) errors.stock = 'Stock must be >= 0';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function addItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateForm()) return;
    await authenticatedRequest('/api/v1/inventory/items', {
      method: 'POST',
      body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) })
    });
    void trackEvent('inventory_item_added', { sku: form.sku, category: form.category });
    setForm(defaultForm);
    setMessage('Item added');
    await loadItems();
  }

  async function saveEdit() {
    if (!editing) return;
    await authenticatedRequest(`/api/v1/inventory/items/${editing._id}`, {
      method: 'PATCH',
      body: JSON.stringify({ name: editing.name, category: editing.category, price: editing.price, stock: editing.stock, location: editing.location, online: editing.online })
    });
    setEditing(null);
    setMessage('Item updated');
    await loadItems();
  }

  async function submitMovement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await authenticatedRequest('/api/v1/inventory/movements', {
      method: 'POST',
      body: JSON.stringify({ ...movement, quantity: Number(movement.quantity) })
    });
    setMessage('Stock movement posted');
    await loadItems();
  }

  async function startAudit() {
    const data = await authenticatedRequest<{ audit: { _id: string } }>('/api/v1/inventory/audits/start', { method: 'POST' });
    setAuditId(data.audit._id);
    setMessage(`Audit started: ${data.audit._id}`);
  }

  async function submitAuditCount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!auditId) return;
    await authenticatedRequest(`/api/v1/inventory/audits/${auditId}/counts`, {
      method: 'POST',
      body: JSON.stringify({ counts: [{ itemId: auditCount.itemId, physicalQty: Number(auditCount.physicalQty) }] })
    });
    setMessage('Audit count saved');
  }

  async function closeAudit(postVariance: boolean) {
    if (!auditId) return;
    await authenticatedRequest(`/api/v1/inventory/audits/${auditId}/close`, {
      method: 'POST',
      body: JSON.stringify({ postVariance })
    });
    setMessage('Audit closed');
    setAuditId('');
    await loadItems();
  }

  return (
    <>
      <section className="panel">
        <h2>Inventory</h2>
        {message ? <p>{message}</p> : null}
        <div className="chip-row">
          {['Kirana', 'Electrical', 'Stationery'].map((chip) => (
            <button key={chip} className="btn" onClick={() => setFilters((f) => ({ ...f, category: chip }))} type="button">{chip}</button>
          ))}
          <button className="btn" type="button" onClick={() => setFilters({ search: '', category: '', location: '', online: '' })}>Reset filters</button>
        </div>
        <div className="inline-form">
          <input className="input" value={filters.search} onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))} placeholder="Search SKU/name/barcode" />
          <input className="input" value={filters.location} onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))} placeholder="Location e.g. R1-S1-B2" />
        </div>
      </section>

      <section className="panel">
        <h3>Add Item</h3>
        <form className="form-grid" onSubmit={addItem}>
          <label>Name<input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          {formErrors.name ? <span className="error-text">{formErrors.name}</span> : null}
          <label>SKU<input className="input" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} /></label>
          {formErrors.sku ? <span className="error-text">{formErrors.sku}</span> : null}
          <label>Category<input className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
          {formErrors.category ? <span className="error-text">{formErrors.category}</span> : null}
          <div className="inline-form">
            <label>Price<input className="input" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></label>
            <label>Stock<input className="input" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></label>
          </div>
          <label>Location<input className="input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></label>
          <button className="btn primary" type="submit">Add Item</button>
        </form>
      </section>

      <section className="panel">
        <h3>Items</h3>
        <table className="table">
          <thead><tr><th>Name</th><th>SKU</th><th>Stock</th><th>Location</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.sku}</td>
                <td>{item.stock}</td>
                <td>{item.location}</td>
                <td><button className="btn" type="button" onClick={() => setEditing(item)}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-row">
          <button className="btn" type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
          <span>Page {page}/{totalPages}</span>
          <button className="btn" type="button" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      </section>

      <section className="panel">
        <h3>Stock Movement</h3>
        <form className="form-grid" onSubmit={submitMovement}>
          <select className="input" value={movement.itemId} onChange={(e) => setMovement({ ...movement, itemId: e.target.value })} required>
            <option value="">Select item</option>
            {items.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
          </select>
          <select className="input" value={movement.movementType} onChange={(e) => setMovement({ ...movement, movementType: e.target.value })}>
            <option value="inward">Inward</option>
            <option value="outward">Outward</option>
            <option value="transfer">Transfer</option>
          </select>
          <label>Quantity<input className="input" type="number" min="1" value={movement.quantity} onChange={(e) => setMovement({ ...movement, quantity: e.target.value })} /></label>
          <div className="inline-form">
            <input className="input" placeholder="From location" value={movement.fromLocation} onChange={(e) => setMovement({ ...movement, fromLocation: e.target.value })} />
            <input className="input" placeholder="To location" value={movement.toLocation} onChange={(e) => setMovement({ ...movement, toLocation: e.target.value })} />
          </div>
          <button className="btn primary" type="submit">Post Movement</button>
        </form>
      </section>

      <section className="panel">
        <h3>Stock Audit</h3>
        <div className="action-row">
          <button className="btn" type="button" onClick={startAudit}>Start Audit</button>
          <button className="btn" type="button" onClick={() => closeAudit(false)} disabled={!auditId}>Close without posting</button>
          <button className="btn primary" type="button" onClick={() => closeAudit(true)} disabled={!auditId}>Close + Post variance</button>
        </div>
        <form className="inline-form" onSubmit={submitAuditCount}>
          <select className="input" value={auditCount.itemId} onChange={(e) => setAuditCount({ ...auditCount, itemId: e.target.value })} required>
            <option value="">Select item</option>
            {items.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
          </select>
          <input className="input" type="number" value={auditCount.physicalQty} onChange={(e) => setAuditCount({ ...auditCount, physicalQty: e.target.value })} />
          <button className="btn" type="submit" disabled={!auditId}>Save Count</button>
        </form>
      </section>

      {editing ? (
        <section className="modal-surface">
          <div className="panel">
            <h3>Edit Item</h3>
            <label>Name<input className="input" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></label>
            <label>Category<input className="input" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} /></label>
            <label>Location<input className="input" value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} /></label>
            <div className="action-row">
              <button className="btn" type="button" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn primary" type="button" onClick={saveEdit}>Save</button>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
