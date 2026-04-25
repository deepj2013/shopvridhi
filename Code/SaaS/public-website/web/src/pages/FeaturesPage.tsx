const modules = [
  'POS Billing',
  'Inventory + Rack Management',
  'Barcode Generation and Scan',
  'Purchase + Supplier Ledger',
  'CRM + Udhaar Recovery',
  'Admin Control Tower'
];

export function FeaturesPage() {
  return (
    <section className="panel">
      <h2>Feature Modules</h2>
      <p>Production-focused modules aligned to BMAD execution and offline-first architecture.</p>
      <ul>
        {modules.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    </section>
  );
}
