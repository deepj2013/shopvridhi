import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { clearSession, getSession, setSession, subscribeSession, type SessionState } from '../lib/session';

type SessionContextValue = {
  session: SessionState | null;
  isAuthenticated: boolean;
  saveSession: (nextSession: SessionState) => void;
  logout: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSessionState] = useState<SessionState | null>(() => getSession());

  useEffect(() => {
    return subscribeSession((nextSession) => setSessionState(nextSession));
  }, []);

  const value = useMemo<SessionContextValue>(() => ({
    session,
    isAuthenticated: Boolean(session?.accessToken),
    saveSession: (nextSession: SessionState) => setSession(nextSession),
    logout: () => clearSession()
  }), [session]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used inside SessionProvider');
  return context;
}
