import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { authenticatedRequest } from '../lib/apiClient';
import { trackEvent } from '../lib/publicApi';

type Product = { _id: string; name: string; price: number; stock: number };
type OrderLine = { productId: string; name: string; quantity: number; unitPrice: number; lineTotal: number };
type Order = { _id: string; customerName: string; customerPhone: string; status: 'pending' | 'accepted' | 'completed' | 'cancelled'; total: number; items: OrderLine[] };

export function OrdersPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [message, setMessage] = useState('');
  const [checkout, setCheckout] = useState({ customerName: '', customerPhone: '', productId: '', quantity: '1' });

  async function load() {
    const [p, o] = await Promise.all([
      authenticatedRequest<{ products: Product[] }>('/api/v1/ecommerce/products'),
      authenticatedRequest<{ orders: Order[] }>('/api/v1/ecommerce/orders')
    ]);
    setProducts(p.products);
    setOrders(o.orders);
  }

  useEffect(() => {
    load().catch(() => setMessage('Could not load orders'));
  }, []);

  const grouped = useMemo(() => {
    const map: Record<Order['status'], Order[]> = { pending: [], accepted: [], completed: [], cancelled: [] };
    for (const order of orders) map[order.status].push(order);
    return map;
  }, [orders]);

  async function createOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await authenticatedRequest('/api/v1/ecommerce/orders', {
      method: 'POST',
      body: JSON.stringify({
        customerName: checkout.customerName,
        customerPhone: checkout.customerPhone,
        items: [{ productId: checkout.productId, quantity: Number(checkout.quantity) }]
      })
    });
    void trackEvent('order_created', { customerPhone: checkout.customerPhone, quantity: Number(checkout.quantity) });
    setCheckout({ customerName: '', customerPhone: '', productId: '', quantity: '1' });
    setMessage('Order created');
    await load();
  }

  async function changeStatus(orderId: string, status: Order['status']) {
    await authenticatedRequest(`/api/v1/ecommerce/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
    await load();
  }

  async function cancelOrder(orderId: string) {
    const reason = window.prompt('Cancellation reason', 'customer-request') || 'customer-request';
    await authenticatedRequest(`/api/v1/ecommerce/orders/${orderId}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    });
    setMessage('Order cancelled with refund note');
    await load();
  }

  return (
    <>
      <section className="panel">
        <h2>E-commerce Orders</h2>
        {message ? <p>{message}</p> : null}
        <h3>Checkout</h3>
        <form className="form-grid" onSubmit={createOrder}>
          <div className="inline-form">
            <label>Customer Name<input className="input" value={checkout.customerName} onChange={(e) => setCheckout({ ...checkout, customerName: e.target.value })} required /></label>
            <label>Customer Phone<input className="input" value={checkout.customerPhone} onChange={(e) => setCheckout({ ...checkout, customerPhone: e.target.value })} required /></label>
          </div>
          <div className="inline-form">
            <select className="input" value={checkout.productId} onChange={(e) => setCheckout({ ...checkout, productId: e.target.value })} required>
              <option value="">Select product</option>
              {products.map((product) => <option key={product._id} value={product._id}>{product.name} (Stock {product.stock})</option>)}
            </select>
            <label>Qty<input className="input" type="number" min="1" value={checkout.quantity} onChange={(e) => setCheckout({ ...checkout, quantity: e.target.value })} /></label>
          </div>
          <button className="btn primary" type="submit">Create Order</button>
        </form>
      </section>

      <section className="grid four">
        {(['pending', 'accepted', 'completed', 'cancelled'] as const).map((status) => (
          <article className="panel" key={status}>
            <h3>{status.toUpperCase()}</h3>
            {(grouped[status] || []).map((order) => (
              <div className="step-card order-card" key={order._id}>
                <strong>{order.customerName}</strong>
                <p>INR {order.total}</p>
                <div className="action-row">
                  <button className="btn" type="button" onClick={() => setSelectedOrder(order)}>View</button>
                  {status !== 'cancelled' && status !== 'completed' ? (
                    <button className="btn" type="button" onClick={() => changeStatus(order._id, status === 'pending' ? 'accepted' : 'completed')}>
                      {status === 'pending' ? 'Accept' : 'Complete'}
                    </button>
                  ) : null}
                  {status !== 'cancelled' ? <button className="btn" type="button" onClick={() => cancelOrder(order._id)}>Cancel+Refund</button> : null}
                </div>
              </div>
            ))}
          </article>
        ))}
      </section>

      {selectedOrder ? (
        <section className="drawer-surface">
          <article className="panel drawer-panel">
            <h3>Order Detail</h3>
            <p><strong>Customer:</strong> {selectedOrder.customerName} ({selectedOrder.customerPhone})</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <table className="table">
              <thead><tr><th>Item</th><th>Qty</th><th>Total</th></tr></thead>
              <tbody>{selectedOrder.items.map((line, idx) => <tr key={`${line.productId}-${idx}`}><td>{line.name}</td><td>{line.quantity}</td><td>{line.lineTotal}</td></tr>)}</tbody>
            </table>
            <button className="btn" type="button" onClick={() => setSelectedOrder(null)}>Close</button>
          </article>
        </section>
      ) : null}
    </>
  );
}
