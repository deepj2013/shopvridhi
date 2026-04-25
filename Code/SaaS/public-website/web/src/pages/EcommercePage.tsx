const demoCatalog = [
  { name: 'Aashirvaad Atta 5kg', price: 265, stock: 48, vendor: 'Kirana Prime', badge: 'Trending' },
  { name: 'Surf Excel 1kg', price: 118, stock: 32, vendor: 'DailyMart', badge: 'Best Seller' },
  { name: 'LED Bulb 12W', price: 149, stock: 20, vendor: 'ElectroHub', badge: 'New' },
  { name: 'Sugar 1kg', price: 52, stock: 75, vendor: 'Kirana Prime', badge: 'Popular' },
  { name: 'Basmati Rice 5kg', price: 510, stock: 15, vendor: 'Harvest Line', badge: 'Limited' },
  { name: 'Notebook A4 Pack', price: 135, stock: 41, vendor: 'Study Point', badge: 'Offer' }
];

export function EcommercePage() {
  return (
    <>
      <section className="promo-banner">
        <strong>Weekend Sale:</strong> up to 25% off selected essentials.
      </section>

      <section className="panel">
        <h2>ShopVridhi Market</h2>
        <p>Browse nearby shop inventory, compare products, and place instant local orders.</p>
      </section>

      <section className="store-layout">
        <aside className="panel store-sidebar">
          <h3>Collections</h3>
          <ul>
            <li>New Arrivals</li>
            <li>Kirana Essentials</li>
            <li>Electronics</li>
            <li>Home Utility</li>
            <li>Stationery</li>
            <li>Weekly Offers</li>
          </ul>
          <h3>Trending Search</h3>
          <ul>
            <li>atta</li>
            <li>rice</li>
            <li>detergent</li>
            <li>bulb</li>
          </ul>
        </aside>

        <div className="grid three">
          {demoCatalog.map((item) => (
            <article className="panel nested product-card" key={item.name}>
              <span className="badge">{item.badge}</span>
              <h3>{item.name}</h3>
              <p className="vendor">Vendor: {item.vendor}</p>
              <p className="price">INR {item.price}</p>
              <p>Stock: {item.stock}</p>
              <div className="action-row">
                <button className="btn">Quick View</button>
                <button className="btn primary">Add to cart</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h3>Newsletter</h3>
        <p>Get updates for local deals, stock drops, and festive offers.</p>
        <div className="inline-form">
          <input className="input" placeholder="Your email" />
          <button className="btn primary">Subscribe</button>
        </div>
      </section>
    </>
  );
}
