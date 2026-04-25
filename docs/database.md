# ShopVridhi - Universal Retail Operating System

Version: 1.0  
Audience: Product Managers, Engineering, UX, QA, Data, DevOps, Investors  
Prepared for: Multi-category Indian retail digitization at scale

---

## 1) Product Vision & PRD

### Vision
ShopVridhi is a universal, offline-first retail operating system for Indian small and mid-sized shops across categories: kirana, garments, electrical, hardware, stationery, gifts, pharmacy-lite, and more.  
It unifies billing, inventory, GST, udhaar, CRM, hyperlocal commerce, and analytics into one modular SaaS platform with a low-training Hindi-first UX.

### Mission
- Help shops digitize without changing how they operate.
- Reduce daily operational friction (billing, stock, udhaar tracking).
- Increase revenue through CRM + WhatsApp marketing + local e-commerce.
- Enable future marketplace growth using existing inventory data.

### Product Principles (Non-Negotiable)
1. Offline-first operation; automatic background sync.
2. Task speed: item creation to billing in seconds.
3. Configurable fields/modules for all retail categories.
4. No code changes required to support new shop types.
5. Inventory should directly power marketplace listing.
6. Minimal training for low-tech users.
7. Full payment mode support including split payments.
8. Deep reports with actionable recommendations.
9. Architecture ready for long-term scale without re-architecture.

### Problem Statement
Most small retailers currently use multiple disconnected systems:
- Billing software for invoices and GST
- Separate ledger apps for udhaar
- Manual notebooks for purchase and stock
- No meaningful CRM or marketing automation
- Weak online discoverability for nearby buyers

### Success Criteria
- Invoice completion time under 25 seconds for repeat customers.
- Stock mismatch reduction by 40% within 3 months.
- Udhaar recovery cycle improved by 20%.
- 30% of active shops use CRM campaigns within 60 days.
- 15% of shops receiving e-commerce orders by month 6.

### Functional Scope
- POS billing, returns, exchanges, discounts
- Inventory and location tracking (rack/shelf/bin)
- Purchase and supplier lifecycle
- Udhaar ledger and reminders
- CRM, loyalty, WhatsApp marketing
- Hyperlocal order discovery and routing
- Delivery partner integration
- Reporting and GST compliance
- Admin SaaS management and subscription hooks

### Non-Functional Requirements
- p95 billing action response under 200ms (local/offline mode)
- Sync reconciliation latency under 5 mins after reconnect
- Uptime target: 99.9% for cloud services
- Data durability: daily backups + point-in-time restore
- Tenant isolation: strict at query, API, and storage layers

---

## 2) Feature Mapping Table vs Vyapar, OkCredit, Khatabook

| Capability | Vyapar | OkCredit | Khatabook | ShopVridhi |
|---|---:|---:|---:|---:|
| Fast POS billing | Yes | No | No | Yes (optimized flows + shortcuts) |
| GST invoices and reports | Yes | No | No | Yes (multi-tax engine) |
| Inventory with stock updates | Yes | Limited | Limited | Yes (rack/bin + expiry + variants) |
| Udhaar ledger simplicity | Limited | Strong | Strong | Strong + advanced reminders + analytics |
| Supplier purchase tracking | Yes | Limited | Limited | Yes (PO, GRN, payable aging) |
| CRM and loyalty | Basic | No | No | Advanced (segments, campaigns, points) |
| WhatsApp marketing | Basic | Reminders only | Reminders only | Advanced templates + campaigns |
| Barcode generation/scanning | Partial | No | No | Full support |
| Hyperlocal e-commerce | No | No | No | Native pincode catalog + order routing |
| Delivery integration | No | No | No | Native partner API integration |
| Offline-first desktop + sync | Limited | Mobile-focused | Mobile-focused | Core architecture principle |
| Multi-tenant SaaS controls | Limited | N/A | N/A | Full admin + plans + observability |
| Custom fields by shop type | Limited | No | No | Full schema-extensible model |

---

## 3) User Roles and Permissions

### Role Matrix (High-Level)

| Action Area | Owner | Manager | Cashier | Staff | SV Admin | Customer | Delivery Partner |
|---|---:|---:|---:|---:|---:|---:|---:|
| Configure store profile | Yes | Limited | No | No | Yes | No | No |
| Create/edit items | Yes | Yes | Limited | Limited | No | No | No |
| Billing and returns | Yes | Yes | Yes | Limited | No | No | No |
| View full financials | Yes | Yes | Limited | No | Yes (support scope) | No | No |
| Udhaar management | Yes | Yes | Yes | Limited | No | No | No |
| Purchase + suppliers | Yes | Yes | Limited | Limited | No | No | No |
| CRM campaigns | Yes | Yes | Limited | No | No | No | No |
| Admin tenant controls | No | No | No | No | Yes | No | No |
| Place customer order | No | No | No | No | No | Yes | No |
| Accept delivery tasks | No | No | No | No | No | No | Yes |

### Role Definitions
- **Shop Owner**: Full business control, subscription, reports, settings.
- **Manager**: Operational control; excludes critical billing plan/security controls.
- **Cashier**: Fast billing, payment collection, basic customer handling.
- **Staff**: Inventory updates, inward/outward, limited item maintenance.
- **ShopVridhi Admin**: Platform support, compliance, tenant health management.
- **Customer (E-commerce)**: Browse, cart, order, track, reorder.
- **Delivery Partner**: Pickup, route updates, delivery status, OTP verification.

---

## 4) Detailed Modules with Workflows

### 4.1 POS Billing (Fast UX)
Flow:
1. Open POS (keyboard-centric).
2. Add item via barcode/shortcode/search/favorites.
3. Auto-fetch latest local price/tax/stock.
4. Add customer (optional) and discount rules.
5. Select payment mode (cash/UPI/card/split).
6. Print/share invoice instantly; queue sync event.

Optimizations:
- Global search under 100ms from local DB.
- Recent items, quick quantity modifiers (+1, +5, -1).
- Offline invoice numbering with conflict-safe prefixes.
- Smart fallback when printer/QR device unavailable.

### 4.2 Item Creation & Barcode
Flow:
1. Quick-add template by category.
2. Mandatory fields: name, unit, price, tax class.
3. Optional fields: brand, color, size, batch, expiry, custom fields.
4. Barcode auto-generate or map external barcode.
5. Save locally and sync to cloud.

### 4.3 Inventory with Rack/Shelf/Bin
Flow:
1. Item inward entry maps to location hierarchy.
2. Auto stock ledger entries per movement type.
3. Transfer stock between locations.
4. Cycle counts and variance posting.
5. Dead-stock and fast-moving flags.

### 4.4 Purchase Entry & Supplier Ledger
Flow:
1. Create PO with expected date and items.
2. Receive goods (GRN) with partial receipt support.
3. Capture supplier invoice and GST details.
4. Auto update stock + payable ledger.
5. Track due dates and payment status.

### 4.5 Customer CRM & Loyalty
- Unified customer profile: spend, last purchase, preferred items.
- Segments: inactive customers, high spenders, frequent udhaar users.
- Loyalty: points per invoice, redemption rules, bonus campaigns.
- Campaigns: WhatsApp template + audience filter + schedule.

### 4.6 Udhaar Ledger with Reminders
Flow:
1. Create/assign customer ledger.
2. Credit sale entries auto-post from POS.
3. Payments settle oldest entries first (configurable).
4. Automated reminder schedule (day 1/3/7/15).
5. WhatsApp reminder with payment link/UPI QR.

### 4.7 WhatsApp Order Receiver
- Customer sends message with item or product code.
- NLP-lite parser suggests mapped items (human confirmation).
- Staff creates draft order from message thread.
- Order converted to invoice or hyperlocal order.

### 4.8 Reports and Analytics
Core reports:
- Daily sales summary, payment mix, tax summary
- Item/category margin analytics
- Dead stock aging, fast-moving SKUs
- Stock-out opportunities
- Top customers and retention cohorts

### 4.9 GST, Tax, Legal Reports
- GSTR-ready sales and purchase extracts
- HSN/SAC summaries
- Input/output tax reconciliation
- Credit/debit note tracking

### 4.10 Custom Fields & Extensibility
- Schema-driven custom attributes by category/shop type.
- Computed fields (e.g., cloth GSM x width metadata).
- Custom validations and conditional visibility.
- Plugin-ready hooks for future module marketplace.

---

## 5) Hyperlocal E-commerce Design

### Inventory-Powered Catalog
- Published SKU = in-stock + e-commerce-enabled item.
- Real-time available quantity from local + synced stock.
- Price rules: in-store price, online markup, promotional overrides.

### Pincode-Based Discovery
- Customer enters pincode.
- System shows eligible nearby shops by service radius.
- Ranking: stock availability, distance, SLA, rating.

### Order Routing
1. Customer places order.
2. Order service identifies best eligible shop.
3. Shop panel receives order with timer for accept/reject.
4. On reject/timeout, reroute to next eligible shop.

### Delivery Partner API
- Create shipment request
- Assign rider
- Track status webhooks
- OTP-based delivery completion

---

## 6) Offline-First Architecture & Sync Mechanism

### Core Model
- Local-first app stores all transaction data in PouchDB.
- Cloud CouchDB cluster acts as synchronization and distribution layer.
- Every write goes local first, then async replicated.

### Sync Strategy
- Bi-directional replication with filtered feeds by tenant/shop.
- Revision-based conflict handling (`_rev` lineage).
- Deterministic conflict resolver:
  - Financial docs: immutable entries + reversal model
  - Master docs: latest timestamp + role priority

### Event Queue
- POS actions emit local events with idempotency keys.
- Retry with exponential backoff.
- Dead-letter queue for manual admin review.

### Offline Guarantees
- Billing, stock movement, udhaar posting, and customer search must never block on internet.
- Queue state visible in UI (synced / pending / failed).

---

## 7) Recommended Tech Stack

- **Frontend Web/POS**: React + TypeScript + Vite
- **Desktop App (Windows)**: Electron + React + local print/scanner bridge
- **Mobile App**: React Native (Android priority, iOS optional phase 3+)
- **Backend**: Node.js + Express/NestJS (MERN-compatible services)
- **Primary cloud DB**: MongoDB (tenant metadata, analytics, configs)
- **Offline sync DB**: CouchDB + PouchDB replication
- **Cache/Queue**: Redis + BullMQ
- **Search**: Meilisearch/Elastic for product lookup at scale
- **Messaging**: WhatsApp Business API provider (Gupshup/Meta partner)
- **Observability**: OpenTelemetry + Prometheus + Grafana + Loki

---

## 8) Complete Database Schema (Collections/Tables)

### Core Tenant and Access
- `tenants` (tenant_id, plan, status, region, created_at)
- `shops` (shop_id, tenant_id, name, category, gstin, address, pincode)
- `users` (user_id, tenant_id, phone, role, status, preferred_language)
- `role_permissions` (role, module, actions[])

### Catalog and Inventory
- `items` (item_id, tenant_id, sku, name, tax_code, pricing, attributes_json)
- `item_variants` (variant_id, item_id, option_map, barcode)
- `stock_ledger` (entry_id, item_id, movement_type, qty, source_doc, location_id, ts)
- `locations` (location_id, shop_id, rack, shelf, bin)
- `batches` (batch_id, item_id, mfg, exp, purchase_rate)

### Billing and Finance
- `invoices` (invoice_id, shop_id, customer_id, totals, payment_split, status)
- `invoice_lines` (invoice_line_id, invoice_id, item_id, qty, rate, tax)
- `payments` (payment_id, ref_type, ref_id, mode, amount, txn_ref, ts)
- `credit_notes`, `debit_notes`
- `udhaar_ledger` (entry_id, customer_id, invoice_id, debit, credit, balance)

### Procurement
- `suppliers` (supplier_id, shop_id, gstin, contact, credit_terms)
- `purchase_orders` (po_id, supplier_id, status, expected_date)
- `grn_receipts` (grn_id, po_id, received_lines, variance)
- `supplier_invoices` (supplier_invoice_id, supplier_id, totals, due_date)

### CRM and Engagement
- `customers` (customer_id, phone, segment_tags, loyalty_points, last_visit)
- `campaigns` (campaign_id, type, template_id, audience_query, schedule)
- `campaign_logs` (message_id, campaign_id, status, delivered_ts)

### E-commerce and Delivery
- `online_catalog` (listing_id, item_id, is_active, online_price, stock_buffer)
- `online_orders` (order_id, customer_id, routed_shop_id, status, payment_mode)
- `delivery_tasks` (task_id, order_id, partner_id, otp, status, eta)

### System and Audit
- `sync_events` (event_id, doc_type, doc_id, state, retries)
- `audit_logs` (actor_id, action, module, payload_hash, ts)
- `feature_flags` (tenant_id, flag_key, enabled)

---

## 9) API Structure and Endpoints

Base pattern: `/api/v1/{service}`

### Auth & Session
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`

### POS
- `POST /pos/invoices`
- `GET /pos/invoices/{id}`
- `POST /pos/invoices/{id}/refund`
- `POST /pos/invoices/{id}/share`

### Catalog & Inventory
- `POST /items`
- `GET /items/search?q=`
- `PATCH /items/{id}`
- `POST /inventory/movements`
- `GET /inventory/stock?location_id=`

### Procurement
- `POST /purchases/po`
- `POST /purchases/grn`
- `POST /purchases/supplier-invoice`

### Ledger & CRM
- `GET /ledger/customers/{id}`
- `POST /ledger/customers/{id}/payment`
- `POST /crm/campaigns`
- `POST /crm/campaigns/{id}/send`

### E-commerce
- `GET /marketplace/shops?pincode=`
- `GET /marketplace/items?shop_id=`
- `POST /marketplace/orders`
- `POST /marketplace/orders/{id}/accept`

### Delivery
- `POST /delivery/tasks`
- `PATCH /delivery/tasks/{id}/status`
- `POST /delivery/tasks/{id}/verify-otp`

### Admin
- `GET /admin/tenants`
- `PATCH /admin/tenants/{id}/plan`
- `GET /admin/system/health`

---

## 10) Role-wise Screen Wireframes (Textual Layout)

### Owner Dashboard
- Top bar: shop switcher, notifications, sync status, profile
- KPI cards: sales today, gross margin, pending udhaar, low stock
- Quick actions: new bill, add item, receive stock, send reminder
- Charts: 7-day sales, category mix, payment split

### Cashier POS
- Left: item search + favorites + scanner input
- Center: invoice lines with editable qty/rate/discount
- Right: totals, payment panel, customer quick-add
- Footer: print/share/hold bill/clear

### Manager Inventory
- Tabs: stock overview, transfer, cycle count, dead stock
- Filters: category, supplier, location, aging buckets
- Actions: transfer, adjust, reorder suggestion

### Staff Receiving Screen
- Pending PO list
- GRN entry with barcode scan
- Variance and damaged quantity notes

### ShopVridhi Admin Console
- Tenant health overview
- Plan utilization
- Support ticket queue
- Sync failure monitoring

### Customer App
- Pincode entry -> nearby shops
- Shop catalog with search/filter
- Cart/checkout/payment
- Order tracking and reorder

### Delivery Partner App
- Assigned tasks
- Pickup checklist
- Map route + call customer
- OTP completion

---

## 11) UI/UX Principles for Indian Retailers

- Hindi-first labels with regional language packs.
- Numeric keypad-friendly input patterns.
- Minimum taps per core workflow (billing <= 7 interactions).
- Large touch targets and high-contrast visual hierarchy.
- Offline state clarity with simple status badges.
- Contextual tips for first-time users; no heavy onboarding videos.
- Printer/scanner flows exposed as one-click actions.

---

## 12) Admin Panel Architecture

Services:
- Tenant service (creation, plan, status)
- Billing service (subscription lifecycle)
- Support and ticketing
- Operational observability (sync errors, API latency, incidents)
- Compliance and audit logs

Admin Data Views:
- Tenant 360
- Shop health (active users, pending sync, failed jobs)
- Revenue and churn analytics
- Feature adoption tracking

---

## 13) SaaS Pricing Hooks

Plan hooks to implement:
- Tier by invoices/month, users, and modules.
- Add-ons: WhatsApp credits, advanced reports, marketplace pack.
- Trial to paid conversion triggers.
- In-app upgrade nudges when quota reaches 80%.
- Usage counters at tenant and shop level.

Suggested plans:
- Starter, Growth, Premium, Enterprise.

---

## 14) Security, Multi-tenant Isolation, Backups

- JWT auth + short-lived access token + refresh rotation.
- Per-tenant row/document scoping enforced at service layer.
- Encryption at rest (DB) and in transit (TLS 1.2+).
- Secrets management using vault service.
- Daily full backup + 15-min incremental snapshots.
- Quarterly restore drills and disaster recovery testing.
- Immutable audit trails for finance-impacting operations.

---

## 15) Deployment Architecture

- Frontend: CDN-hosted web app.
- Backend: containerized microservices (Kubernetes).
- Sync DB: CouchDB cluster with region replicas.
- Primary DB: MongoDB replica set/sharded as growth requires.
- Queue: Redis cluster.
- File storage: object store for invoices/reports.
- CI/CD: branch pipelines + staging + canary production rollout.

---

## 16) Shop Onboarding Flow

1. Signup via phone OTP.
2. Select business category template.
3. Enter GST and shop metadata.
4. Import catalog (CSV, manual, barcode scan batch).
5. Configure invoice settings and payment QR.
6. Add staff and role permissions.
7. Run guided first bill demo.
8. Go live with health checklist.

---

## 17) Public Website Content for Shop Onboarding

### Core Sections
- Hero: "Apni dukaan ka smart operating system"
- Benefits by shop type
- Product tour video
- Trust indicators (GST-ready, secure, support)
- Pricing comparison
- Free trial CTA + demo booking

### Conversion copy blocks
- "Billing, udhaar, inventory, WhatsApp - sab ek app mein."
- "Internet ho ya na ho, dukaan kabhi nahi rukegi."
- "3 din mein live onboarding support."

---

## 18) Product Analytics & Metrics

### North Star
- Active revenue-generating shops per month (ARGS)

### Operational Metrics
- Bills/day/shop
- Avg invoice time
- Sync failure rate
- Stock discrepancy rate
- Udhaar outstanding aging

### Growth Metrics
- Trial to paid conversion
- 30/60/90 day retention
- CRM campaign conversion
- Marketplace order penetration

---

## 19) Phase-wise MVP Roadmap (Phase 1 to 4)

### Phase 1 (Core Operations)
- POS billing, item master, inventory basics, udhaar, GST invoice, offline desktop.
- Target: Kirana and general retail readiness.

### Phase 2 (Control & Insights)
- Purchase/supplier, advanced reports, rack/bin, loyalty, role permissions.
- Target: Manager-level operational control.

### Phase 3 (Growth Engine)
- WhatsApp campaigns, customer app, pincode discovery, online ordering.
- Target: Revenue expansion via hyperlocal commerce.

### Phase 4 (Scale & Platform)
- Delivery API ecosystem, plugin/extensibility, enterprise controls, advanced AI insights.
- Target: Multi-city scale with ecosystem integrations.

---

## Appendices

### A) Data Governance
- GST/legal retention policy by document type.
- PII minimization and consent management for marketing.

### B) QA Strategy
- Offline/online transition test matrix.
- Tax calculation regression suite.
- Role-permission negative test cases.
- Sync conflict simulation automation.

### C) Investor Snapshot
- TAM: India SMB retail digitization.
- Moat: offline-first + category customization + local commerce mesh.
- Expansion path: embedded payments, financing, procurement network.
