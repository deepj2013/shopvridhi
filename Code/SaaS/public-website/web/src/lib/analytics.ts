import { trackEvent } from './publicApi';

export function trackCtaClick(ctaId: string, page: string): void {
  void trackEvent('cta_click', { ctaId, page, ts: new Date().toISOString() });
}
