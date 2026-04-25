import { clearSession, getSession, setSession } from './session';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) || 'http://localhost:4000';

let pending = 0;
const pendingListeners = new Set<(count: number) => void>();

function updatePending(next: number) {
  pending = Math.max(0, next);
  for (const listener of pendingListeners) listener(pending);
}

export function subscribePendingRequests(listener: (count: number) => void): () => void {
  pendingListeners.add(listener);
  listener(pending);
  return () => pendingListeners.delete(listener);
}

function decodeJwtExp(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return typeof payload.exp === 'number' ? payload.exp * 1000 : null;
  } catch (_error) {
    return null;
  }
}

export function isSessionExpiringSoon(withinMs = 5 * 60 * 1000): boolean {
  const session = getSession();
  if (!session?.accessToken) return false;
  const exp = decodeJwtExp(session.accessToken);
  if (!exp) return false;
  return exp - Date.now() < withinMs;
}

async function refreshAccessToken(): Promise<boolean> {
  const session = getSession();
  if (!session?.refreshToken) return false;
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: session.refreshToken })
  });
  if (!response.ok) return false;
  const data = await response.json();
  setSession({ ...session, accessToken: data.accessToken, refreshToken: data.refreshToken });
  return true;
}

export async function login(email: string, password: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Login failed');
  }
  const data = await response.json();
  setSession({ accessToken: data.accessToken, refreshToken: data.refreshToken, user: data.user });
}

export async function logout(): Promise<void> {
  const session = getSession();
  if (session?.accessToken) {
    await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${session.accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: session.refreshToken })
    }).catch(() => undefined);
  }
  clearSession();
}

export async function authenticatedRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const run = async (token: string) => fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
      Authorization: `Bearer ${token}`
    }
  });

  const session = getSession();
  if (!session?.accessToken) throw new Error('Unauthenticated');

  updatePending(pending + 1);
  try {
    let response = await run(session.accessToken);
    if (response.status === 401) {
      const refreshed = await refreshAccessToken();
      if (!refreshed) {
        clearSession();
        throw new Error('Session expired. Please login again.');
      }
      const next = getSession();
      response = await run(next!.accessToken);
    }
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Request failed');
    }
    if (response.status === 204) return undefined as T;
    return response.json();
  } finally {
    updatePending(pending - 1);
  }
}
