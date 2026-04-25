export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type SessionState = {
  accessToken: string;
  refreshToken: string;
  user: SessionUser;
  expiresAt?: number;
};

const SESSION_KEY = 'shopvridhi.session';

type SessionListener = (session: SessionState | null) => void;

const listeners = new Set<SessionListener>();

export function getSession(): SessionState | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionState;
  } catch (_error) {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function setSession(session: SessionState): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  notify(session);
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
  notify(null);
}

export function subscribeSession(listener: SessionListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify(session: SessionState | null): void {
  for (const listener of listeners) listener(session);
}
