import dashboardPreview from '../assets/saas-hero-illustration.svg';
import { trackCtaClick } from '../lib/analytics';

export function HomePage() {
  return (
    <>
      <section className="hero-wrap modern-hero">
        <div className="hero-copy panel hero hero-grad hero-elevated">
          <div className="eyebrow">Retail SaaS Platform</div>
          <h1>Build, run, and scale your retail business from one modern workspace</h1>
          <p>
            ShopVridhi brings POS, inventory, e-commerce, CRM, and AI insights into one connected stack so teams can move faster and grow profitably.
          </p>
          <div className="cta-row">
            <button className="btn primary" onClick={() => trackCtaClick('hero_start_free_trial', 'home')}>Start Free Trial</button>
            <button className="btn ghost" onClick={() => trackCtaClick('hero_book_live_demo', 'home')}>Book Live Demo</button>
          </div>
          <div className="hero-stats">
            <div><strong>1.2M+</strong><span>Orders processed monthly</span></div>
            <div><strong>99.95%</strong><span>Platform uptime</span></div>
            <div><strong>38%</strong><span>Average faster checkout</span></div>
          </div>
        </div>
        <div className="hero-visual panel hero-visual-modern">
          <img src={dashboardPreview} alt="ShopVridhi dashboard preview" />
        </div>
      </section>

      <section className="panel">
        <div className="muted-title">Trusted by fast-growing retail teams</div>
        <div className="logo-row">
          <span>NovaMart Retail</span>
          <span>Urban Basket</span>
          <span>Pixel Electronics</span>
          <span>TrendLine Fashion</span>
          <span>Daily Essentials Co.</span>
        </div>
      </section>

      <section className="grid three">
        <article className="panel"><h3>Lightning POS</h3><p>Sub-10 second checkout with smart barcode search, split payments, and offline sync.</p></article>
        <article className="panel"><h3>AI Inventory Guard</h3><p>Predict low stock, suggest reorder quantity, and reduce dead inventory automatically.</p></article>
        <article className="panel"><h3>Unified Commerce</h3><p>Sell in-store, on web, and from mobile catalogs with one product and pricing source.</p></article>
        <article className="panel"><h3>Customer Cloud</h3><p>Build repeat sales through smart segments, loyalty flows, and campaign automation.</p></article>
        <article className="panel"><h3>Ops Analytics</h3><p>Get branch-wise revenue, margins, conversion, and staff productivity in real time.</p></article>
        <article className="panel"><h3>Secure by Design</h3><p>Role-based access, audit logs, and granular policy controls for every operation.</p></article>
      </section>

      <section className="panel">
        <div className="muted-title">How it works</div>
        <h2>Everything your retail team needs, connected end-to-end</h2>
        <div className="grid three">
          <article className="step-card"><strong>Connect Catalog</strong><p>Import product data and organize variants, bundles, taxes, and suppliers.</p></article>
          <article className="step-card"><strong>Run Daily Operations</strong><p>Billing, fulfillment, inventory, and customer workflows happen in one dashboard.</p></article>
          <article className="step-card"><strong>Scale with Insights</strong><p>Use AI recommendations and live analytics to increase revenue and margins.</p></article>
        </div>
      </section>

      <section className="panel">
        <h2>Built for every team</h2>
        <div className="grid three">
          <article className="step-card"><strong>Owners</strong><p>Track profitability by product, category, and location with executive dashboards.</p></article>
          <article className="step-card"><strong>Operations</strong><p>Standardize billing and inventory SOPs while reducing manual reconciliation.</p></article>
          <article className="step-card"><strong>Growth</strong><p>Launch campaigns, recover carts, and measure repeat customer contribution.</p></article>
        </div>
      </section>

      <section className="panel">
        <h2>Simple pricing for every growth stage</h2>
        <div className="grid three">
          <article className="panel nested pricing-card"><h3>Starter</h3><p>INR 999/month</p><p>POS, catalog, inventory, and basic reports.</p></article>
          <article className="panel nested pricing-card featured"><h3>Growth</h3><p>INR 2499/month</p><p>CRM automation, online ordering, and multi-user workflows.</p></article>
          <article className="panel nested pricing-card"><h3>Scale</h3><p>INR 4999/month</p><p>Multi-store analytics, advanced controls, and priority support.</p></article>
        </div>
      </section>

      <section className="panel">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details>
            <summary>Can we use ShopVridhi across multiple branches?</summary>
            <p>Yes. You can manage multiple stores with centralized analytics, inventory transfers, and role controls.</p>
          </details>
          <details>
            <summary>How long does onboarding take?</summary>
            <p>Most teams go live in 2-5 days depending on catalog size and number of branches.</p>
          </details>
          <details>
            <summary>Does it support web and mobile operations?</summary>
            <p>Yes, teams can run daily workflows from web dashboards and mobile-friendly operations screens.</p>
          </details>
        </div>
      </section>

      <section className="panel final-cta">
        <h2>Launch your modern retail stack in days, not months</h2>
        <p>Start with a free trial, import your products, and move your team to a faster operating system.</p>
        <button className="btn primary" onClick={() => trackCtaClick('final_try_shopvridhi', 'home')}>Try ShopVridhi</button>
      </section>
    </>
  );
}
