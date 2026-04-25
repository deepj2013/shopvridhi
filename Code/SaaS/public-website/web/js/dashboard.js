import { api } from './api.js';

const authRaw = localStorage.getItem('sv_auth');
if (!authRaw) window.location.href = './login.html';

const auth = JSON.parse(authRaw || '{}');
const user = auth.user || { name: 'Unknown', role: 'guest' };

document.getElementById('user-name').textContent = user.name;
document.getElementById('user-role').textContent = user.role;

document.getElementById('logout')?.addEventListener('click', async () => {
  try { await api.logout(); } catch (_e) {}
  localStorage.removeItem('sv_auth');
  window.location.href = './login.html';
});

const roleSections = {
  owner: ['inventory', 'ecommerce', 'reports'],
  manager: ['inventory', 'ecommerce', 'reports'],
  cashier: ['inventory', 'ecommerce'],
  staff: ['inventory'],
  admin: ['admin']
};

const visible = roleSections[user.role] || [];
for (const section of document.querySelectorAll('[data-section]')) {
  section.style.display = visible.includes(section.dataset.section) ? '' : 'none';
}

const tabs = document.querySelectorAll('[data-tab]');
const views = document.querySelectorAll('[data-view]');
tabs.forEach((tab) => tab.addEventListener('click', () => {
  const target = tab.dataset.tab;
  views.forEach((view) => { view.style.display = view.dataset.view === target ? '' : 'none'; });
}));

async function loadSummary() {
  const response = await api.getDashboardSummary();
  document.getElementById('kpi-items').textContent = String(response.kpis.itemCount || 0);
  document.getElementById('kpi-orders').textContent = String(response.kpis.orderCount || 0);
  document.getElementById('kpi-low-stock').textContent = String(response.kpis.lowStockCount || 0);
}

async function loadInventory() {
  const response = await api.getInventory();
  document.getElementById('inventory-rows').innerHTML = response.items.map((item) => `<tr><td>${item.name}</td><td>${item.sku}</td><td>${item.stock}</td><td>${item.location}</td><td>${item.online ? 'Yes' : 'No'}</td></tr>`).join('');
}

async function loadProducts() {
  const response = await api.getProducts();
  document.getElementById('product-list').innerHTML = response.products.map((product) => `<div class="card"><strong>${product.name}</strong><div class="mt-2">Rs ${product.price}</div><div>Stock: ${product.stock}</div><button class="btn btn-secondary mt-2" data-add-cart='${JSON.stringify({ id: product._id, name: product.name, price: product.price }).replace(/'/g, '&apos;')}'>Add to cart</button></div>`).join('');
}

async function loadAdminData() {
  const [tenantsRes, usersRes, plansRes] = await Promise.all([api.getTenants(), api.getUsers(), api.getPlans()]);
  document.getElementById('tenant-rows').innerHTML = tenantsRes.tenants.map((t) => `<tr><td>${t.name}</td><td>${t.status}</td><td>${t.planCode}</td></tr>`).join('');
  document.getElementById('user-rows').innerHTML = usersRes.users.map((u) => `<tr><td>${u.name}</td><td>${u.email}</td><td>${u.role}</td><td>${u.active ? 'Active' : 'Disabled'}</td></tr>`).join('');
  document.getElementById('plan-rows').innerHTML = plansRes.plans.map((p) => `<tr><td>${p.code}</td><td>${p.name}</td><td>Rs ${p.monthlyPrice}</td></tr>`).join('');
}

const cart = [];
document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-add-cart]');
  if (!button) return;
  const item = JSON.parse(button.getAttribute('data-add-cart').replaceAll('&apos;', "'"));
  cart.push(item);
  document.getElementById('cart-count').textContent = String(cart.length);
});

document.getElementById('inventory-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = {
    name: document.getElementById('i-name').value.trim(),
    sku: document.getElementById('i-sku').value.trim(),
    barcode: document.getElementById('i-barcode').value.trim(),
    category: document.getElementById('i-category').value.trim(),
    price: Number(document.getElementById('i-price').value),
    stock: Number(document.getElementById('i-stock').value),
    location: document.getElementById('i-location').value.trim(),
    online: document.getElementById('i-online').checked
  };

  try {
    await api.addInventoryItem(payload);
    event.target.reset();
    await Promise.all([loadInventory(), loadProducts(), loadSummary()]);
  } catch (error) {
    alert(error.message);
  }
});

document.getElementById('tenant-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = { name: document.getElementById('t-name').value.trim(), planCode: document.getElementById('t-plan').value.trim() || 'starter' };
  try {
    await api.createTenant(payload);
    event.target.reset();
    await loadAdminData();
  } catch (error) {
    alert(error.message);
  }
});

document.getElementById('checkout')?.addEventListener('click', async () => {
  if (!cart.length) return alert('Cart is empty');

  const aggregate = new Map();
  for (const item of cart) aggregate.set(item.id, (aggregate.get(item.id) || 0) + 1);

  const payload = {
    customerName: 'Walk-in Customer',
    customerPhone: '9999999999',
    items: Array.from(aggregate.entries()).map(([productId, quantity]) => ({ productId, quantity }))
  };

  try {
    const res = await api.createOrder(payload);
    alert(`Order created: ${res.order._id}`);
    cart.length = 0;
    document.getElementById('cart-count').textContent = '0';
    await Promise.all([loadInventory(), loadProducts(), loadSummary()]);
  } catch (error) {
    alert(error.message);
  }
});

(async function boot() {
  try {
    await loadSummary();
    if (['owner', 'manager', 'cashier', 'staff'].includes(user.role)) await loadInventory();
    if (['owner', 'manager', 'cashier'].includes(user.role)) await loadProducts();
    if (user.role === 'admin') await loadAdminData();
  } catch (error) {
    document.getElementById('status').textContent = `Initialization issue: ${error.message}`;
  }
})();
