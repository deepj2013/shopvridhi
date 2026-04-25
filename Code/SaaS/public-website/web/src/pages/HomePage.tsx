import dashboardPreview from '../assets/saas-dashboard.svg';
import { trackCtaClick } from '../lib/analytics';

export function HomePage() {
  return (
    <>
      <section className="hero-wrap">
        <div className="hero-copy panel hero hero-grad">
          <div className="eyebrow">Smarter Retail Operating System</div>
          <h1>From billing to delivery, run your shop at 5-10 second speed</h1>
          <p>
            ShopVridhi combines POS, rack inventory, udhaar, CRM, and local e-commerce in one modern SaaS platform built for Indian retailers.
          </p>
          <div className="cta-row">
            <button className="btn primary" onClick={() => trackCtaClick('hero_start_free_trial', 'home')}>Start Free Trial</button>
            <button className="btn" onClick={() => trackCtaClick('hero_book_live_demo', 'home')}>Book Live Demo</button>
          </div>
          <div className="hero-stats">
            <div><strong>200+</strong><span>Merchants onboarded</span></div>
            <div><strong>5-10s</strong><span>POS action speed</span></div>
            <div><strong>99.9%</strong><span>Target uptime</span></div>
          </div>
        </div>
        <div className="hero-visual panel">
          <img src={dashboardPreview} alt="ShopVridhi dashboard preview" />
        </div>
      </section>

      <section className="panel">
        <div className="muted-title">Preferred by growth-focused merchants</div>
        <div className="logo-row">
          <span>Kirana+ Stores</span>
          <span>Hardware Chains</span>
          <span>Garment Retailers</span>
          <span>Electronics Shops</span>
          <span>Stationery Networks</span>
        </div>
      </section>

      <section className="grid three">
        <article className="panel"><h3>Fast POS</h3><p>Barcode-first billing, hold/resume, split payments, instant print/share.</p></article>
        <article className="panel"><h3>Rack Inventory</h3><p>Track stock by rack/shelf/bin with audit and variance posting.</p></article>
        <article className="panel"><h3>Udhaar + CRM</h3><p>Credit ledger, reminder automation, tags, and repeat-customer insights.</p></article>
        <article className="panel"><h3>Marketplace Ready</h3><p>Turn local stock into public catalog and nearby order intake.</p></article>
        <article className="panel"><h3>Admin Control Tower</h3><p>Tenant lifecycle, plans, usage, policy actions, and platform health.</p></article>
        <article className="panel"><h3>Role-secure</h3><p>Owner/Manager/Cashier/Staff scoped permissions and audit traces.</p></article>
      </section>

      <section className="panel">
        <div className="muted-title">What we do</div>
        <h2>AI-assisted operations for modern local retail</h2>
        <div className="grid three">
          <article className="step-card"><strong>Order Tracking</strong><p>Customers receive order updates instantly via app/WhatsApp style flows.</p></article>
          <article className="step-card"><strong>Product Discovery</strong><p>Fast suggestions based on category, stock and customer behavior.</p></article>
          <article className="step-card"><strong>After-Sales Support</strong><p>Returns/refund workflow tracked with audit-safe status transitions.</p></article>
        </div>
      </section>

      <section className="panel">
        <h2>How ShopVridhi Works</h2>
        <div className="grid three">
          <article className="step-card"><strong>Step 1</strong><p>Onboard shop and import items.</p></article>
          <article className="step-card"><strong>Step 2</strong><p>Run billing and inventory in offline-first mode.</p></article>
          <article className="step-card"><strong>Step 3</strong><p>Activate CRM and e-commerce growth channels.</p></article>
        </div>
      </section>

      <section className="panel">
        <h2>Pricing Snapshot</h2>
        <div className="grid three">
          <article className="panel nested"><h3>Starter</h3><p>INR 799/month</p><p>Billing + Inventory</p></article>
          <article className="panel nested"><h3>Growth</h3><p>INR 1499/month</p><p>CRM + Online Orders</p></article>
          <article className="panel nested"><h3>Premium</h3><p>INR 2499/month</p><p>Admin + Advanced Insights</p></article>
        </div>
      </section>

      <section className="panel">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <details>
            <summary>Can this run if internet goes down?</summary>
            <p>Yes, billing and inventory-critical actions are designed for offline-first execution.</p>
          </details>
          <details>
            <summary>Does it support multiple roles?</summary>
            <p>Owner, manager, cashier, staff, and admin role controls are included with audit logs.</p>
          </details>
          <details>
            <summary>Can we turn inventory into online catalog?</summary>
            <p>Yes, e-commerce-ready listings are generated from your managed inventory data.</p>
          </details>
        </div>
      </section>

      <section className="panel final-cta">
        <h2>Automate operations, grow revenue faster</h2>
        <p>Let ShopVridhi handle billing speed, inventory accuracy, and customer growth loops.</p>
        <button className="btn primary" onClick={() => trackCtaClick('final_try_shopvridhi', 'home')}>Try ShopVridhi</button>
      </section>
    </>
  );
}
