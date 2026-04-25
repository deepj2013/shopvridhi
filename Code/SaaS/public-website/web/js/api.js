const API_BASE = 'http://localhost:4000/api/v1';

function getAuth() {
  return JSON.parse(localStorage.getItem('sv_auth') || '{}');
}

function setAuth(auth) {
  localStorage.setItem('sv_auth', JSON.stringify(auth));
}

async function request(path, options = {}, retry = true) {
  const auth = getAuth();
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };

  if (auth.accessToken) headers.Authorization = `Bearer ${auth.accessToken}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401 && retry && auth.refreshToken) {
    const refreshed = await refreshSession(auth.refreshToken);
    if (refreshed) return request(path, options, false);
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  return res.json();
}

async function refreshSession(refreshToken) {
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });
    if (!res.ok) return false;
    const tokens = await res.json();
    setAuth({ ...getAuth(), ...tokens });
    return true;
  } catch (_error) {
    return false;
  }
}

export const api = {
  login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () => request('/auth/logout', { method: 'POST', body: JSON.stringify({ refreshToken: getAuth().refreshToken }) }),
  getDashboardSummary: () => request('/dashboard/summary'),
  getInventory: () => request('/inventory/items'),
  addInventoryItem: (payload) => request('/inventory/items', { method: 'POST', body: JSON.stringify(payload) }),
  getProducts: () => request('/ecommerce/products'),
  createOrder: (payload) => request('/ecommerce/orders', { method: 'POST', body: JSON.stringify(payload) }),
  getTenants: () => request('/admin/tenants'),
  createTenant: (payload) => request('/admin/tenants', { method: 'POST', body: JSON.stringify(payload) }),
  getUsers: () => request('/admin/users'),
  getPlans: () => request('/admin/plans')
};
