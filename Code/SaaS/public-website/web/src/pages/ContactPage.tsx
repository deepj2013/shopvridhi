import { useState, type FormEvent } from 'react';
import { trackCtaClick } from '../lib/analytics';
import { createLead } from '../lib/publicApi';

export function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [shopType, setShopType] = useState('');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus('');
    try {
      trackCtaClick('contact_request_call', 'contact');
      await createLead({ name, phone, shopType, sourcePage: 'contact' });
      setStatus('Thanks. Our team will call you shortly.');
      setName('');
      setPhone('');
      setShopType('');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not submit lead');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="panel">
      <h2>Get Demo</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>Name<input type="text" className="input" placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} required /></label>
        <label>Phone<input type="tel" className="input" placeholder="Phone" value={phone} onChange={(event) => setPhone(event.target.value)} required /></label>
        <label>Shop Type<input type="text" className="input" placeholder="Kirana / Garments" value={shopType} onChange={(event) => setShopType(event.target.value)} required /></label>
        <button type="submit" className="btn primary" disabled={submitting}>{submitting ? 'Submitting...' : 'Request Call'}</button>
      </form>
      {status ? <p>{status}</p> : null}
    </section>
  );
}
