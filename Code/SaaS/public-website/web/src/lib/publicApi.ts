const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) || 'http://localhost:4000';

export type LeadPayload = {
  name: string;
  phone: string;
  shopType: string;
  sourcePage: string;
};

export async function createLead(payload: LeadPayload): Promise<{ success: boolean }> {
  const response = await fetch(`${API_BASE_URL}/api/v1/public/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Lead submission failed');
  }
  return response.json();
}

export async function trackEvent(eventName: string, eventData: Record<string, unknown>): Promise<void> {
  await fetch(`${API_BASE_URL}/api/v1/public/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventName, eventData })
  }).catch(() => {
    // Event tracking should not block user actions.
  });
}
