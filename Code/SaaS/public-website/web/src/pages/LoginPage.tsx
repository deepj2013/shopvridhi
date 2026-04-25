import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../lib/apiClient';
import { useSession } from '../context/SessionContext';
import { trackEvent } from '../lib/publicApi';

export function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSession();
  const [email, setEmail] = useState('owner@shopvridhi.com');
  const [password, setPassword] = useState('pass123');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await login(email, password);
      void trackEvent('login_success', { email });
      navigate('/dashboard');
    } catch (err) {
      void trackEvent('login_failed', { email });
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="panel auth-panel">
      <h2>Login to ShopVridhi Console</h2>
      <p>Demo users: owner, manager, cashier, staff, admin with password `pass123`.</p>
      <form className="form-grid" onSubmit={onSubmit}>
        <label>Email<input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label>Password<input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
        <button className="btn primary" type="submit" disabled={submitting}>{submitting ? 'Signing in...' : 'Sign in'}</button>
      </form>
      {error ? <p className="error-text">{error}</p> : null}
    </section>
  );
}
