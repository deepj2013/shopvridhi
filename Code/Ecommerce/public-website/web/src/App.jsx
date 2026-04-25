import heroVisual from './assets/ecommerce-hero.svg';

export default function App() {
  return (
    <div className="site">
      <header className="topbar">
        <div className="brand">ShopVridhi Commerce</div>
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <button className="btn">Start Trial</button>
      </header>

      <main className="container">
        <section className="hero">
          <div>
            <p className="eyebrow">Modern E-commerce Platform</p>
            <h1>Launch your online store with speed, style, and scale.</h1>
            <p className="muted">
              Build storefronts, manage inventory, process orders, and grow repeat revenue from one unified commerce dashboard.
            </p>
            <div className="cta">
              <button className="btn primary">Create Store</button>
              <button className="btn secondary">Book Demo</button>
            </div>
            <div className="stats">
              <div><strong>1.5M+</strong><span>Monthly checkouts</span></div>
              <div><strong>99.95%</strong><span>Uptime reliability</span></div>
              <div><strong>35%</strong><span>Faster order flow</span></div>
            </div>
          </div>
          <div className="visual card">
            <img src={heroVisual} alt="E-commerce platform dashboard" />
          </div>
        </section>

        <section id="features" className="grid three">
          <article className="card"><h3>Storefront Builder</h3><p>Create premium web storefronts with responsive layouts and fast checkout UX.</p></article>
          <article className="card"><h3>Inventory Sync</h3><p>Real-time stock updates across catalog, warehouse, and order channels.</p></article>
          <article className="card"><h3>Order Command Center</h3><p>Track every order from payment to shipment and after-sales support.</p></article>
          <article className="card"><h3>Smart Promotions</h3><p>Run discount campaigns, bundles, and loyalty offers with full margin visibility.</p></article>
          <article className="card"><h3>Payments + Settlements</h3><p>Accept secure payments and monitor reconciliation from a single panel.</p></article>
          <article className="card"><h3>Customer Retention</h3><p>Use behavior insights for segmented messaging and repeat purchase journeys.</p></article>
        </section>

        <section id="pricing" className="grid three pricing">
          <article className="card"><h3>Starter</h3><p className="price">INR 1499/mo</p><p>Perfect for new stores launching online.</p></article>
          <article className="card featured"><h3>Growth</h3><p className="price">INR 3499/mo</p><p>For scaling brands with multi-channel operations.</p></article>
          <article className="card"><h3>Scale</h3><p className="price">INR 6999/mo</p><p>Advanced analytics and enterprise-grade controls.</p></article>
        </section>

        <section id="faq" className="card faq">
          <h2>Frequently Asked Questions</h2>
          <details><summary>Can I start without a developer?</summary><p>Yes. You can launch with templates and configure products, prices, and shipping from the admin panel.</p></details>
          <details><summary>Does it support mobile commerce?</summary><p>Yes. Your storefront is mobile-first and supports high-conversion checkout flows.</p></details>
          <details><summary>Can I integrate shipping and payments?</summary><p>Yes. You can connect payment gateways and logistics providers in your operations stack.</p></details>
        </section>
      </main>
    </div>
  );
}
