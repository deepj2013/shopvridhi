# ShopVridhi MASTER TODO (Detailed Execution View)

Execution mode: **Autonomous-first**. This is the single source of truth.

How to use:
- Tick only when code/docs/tests are actually complete.
- Work order is top-to-bottom by milestone.
- Every milestone ends with a local run/verify checklist.

---

## 0) Workspace Governance (Docs separate, Code separate)
- [x] Keep all planning/product docs under `docs/`.
- [x] Keep all runnable apps/services under `Code/`.
- [x] Keep backend in `Code/SaaS/working/api`.
- [x] Keep web app in `Code/SaaS/public-website/web`.
- [x] Create `Code/SaaS/working/mobile` scaffold.
- [x] Create `Code/SaaS/working/windows` scaffold.
- [x] Create `Code/shared/saas-ecommerce` scaffold.
- [x] Add `docs/architecture/adr/` folder and ADR template.
- [x] Add `docs/project-management/change-log.md`.
- [x] Add `docs/project-management/decision-log.md`.
- [x] Add `docs/project-management/release-notes/` folder.

## 1) Program Manager / Delivery Control

### Milestone Ownership and Target Dates
| Milestone | Owner | Target Date |
|---|---|---|
| 0 Workspace Governance | Program Manager + Technical Head | 2026-04-26 |
| 1 Delivery Control | Program Manager | 2026-04-26 |
| 2 BA/Product Freeze | BA Agent | 2026-04-27 |
| 3 Shared Contracts/Domain | Technical Head + DB Head | 2026-04-28 |
| 4 Backend Hardening | Technical Head + DB Head + Security | 2026-04-30 |
| 5 Web App Modules | UIUX + Technical Head | 2026-05-02 |
| 6 Mobile Baseline | Mobile Lead | 2026-05-04 |
| 7 Windows POS Baseline | Windows Lead | 2026-05-04 |
| 8 Analytics Instrumentation | Data Analytics Agent | 2026-05-05 |
| 9 QA/Test Automation | QA Head Agent | 2026-05-06 |
| 10 DevOps/Local Reliability | DevOps/SRE Agent | 2026-05-06 |
| 11 Local Acceptance | Program Manager + QA | 2026-05-07 |
| 12 Final Vision Closure | Program Manager + All Owners | 2026-05-08 |

- [x] Single master TODO created.
- [x] Add owner to each major milestone section.
- [x] Add target date per milestone.
- [x] Add dependency map BA -> UX -> Tech -> DB -> QA -> DevOps.
- [x] Add blocker board with age buckets (0-1d, 2-3d, 4+d).
- [x] Add weekly shipped-vs-planned report format.
- [x] Add release sign-off table (BA/Tech/DB/QA/DevOps/Security).
- [x] Add rollback decision template for risky releases.

## 2) BA / Product Micro Tasks
- [x] Freeze acceptance criteria: inventory movement ledger.
- [x] Freeze acceptance criteria: stock audit variance flow.
- [x] Freeze acceptance criteria: user role change + disable/enable.
- [x] Freeze acceptance criteria: tenant suspend/reactivate.
- [x] Freeze acceptance criteria: order cancellation/refund.
- [x] Freeze acceptance criteria: commission event points.
- [x] Publish edge-case checklist (offline, retry, duplicate submit).
- [x] Publish persona-wise task success metrics.
- [x] Publish story traceability matrix -> QA test IDs.
- [x] Publish de-scope list for current release.

## 3) Shared Contracts + Domain (Both SaaS + E-commerce)
- [x] Create `Code/shared/saas-ecommerce/contracts/v1/`.
- [x] Add `auth.contract.json`.
- [x] Add `inventory.contract.json`.
- [x] Add `ecommerce.contract.json`.
- [x] Add `admin.contract.json`.
- [x] Add `dashboard.contract.json`.
- [x] Create `Code/shared/saas-ecommerce/domain/`.
- [x] Add shared entity definitions: user, tenant, plan, item, order, audit.
- [x] Add enums: roles, permissions, order states, tenant states.
- [x] Add shared validation rule docs.
- [x] Add contract versioning policy (`v1`, `v1.1`, deprecation rules).

## 4) Backend API Hardening (Node + Mongo)

### 4.1 Auth + Session
- [x] JWT access + refresh login implemented.
- [x] Refresh rotation endpoint implemented.
- [x] Logout endpoint implemented.
- [x] Add refresh token device metadata.
- [x] Add login rate limiting.
- [x] Add account lock policy after repeated failures.
- [x] Add password reset flow (token-based).

### 4.2 RBAC
- [x] Permission middleware in place.
- [x] Expand permission map to action granularity for all modules.
- [x] Add server-side permission audit logging.
- [x] Add role policy tests for deny paths.

### 4.3 Inventory
- [x] Inventory list and create endpoints implemented.
- [x] Add update endpoint with field-level validation.
- [x] Add delete/archive endpoint (soft delete).
- [x] Add filter/sort/pagination support.
- [x] Add search by sku/barcode/name.
- [x] Add low-stock endpoint.

### 4.4 Inventory Movement + Stock Audit
- [x] Add movement endpoints: inward/outward/transfer.
- [x] Add rack/shelf/bin transfer validation.
- [x] Add movement ledger collection/model.
- [x] Add stock audit session create/start/close endpoints.
- [x] Add variance posting endpoint.
- [x] Add stock reconciliation report endpoint.

### 4.5 E-commerce
- [x] Product listing endpoint implemented.
- [x] Order create with stock deduction implemented.
- [x] Add order status update endpoint.
- [x] Add cancellation endpoint with stock reversal logic.
- [x] Add refund note model + endpoint.
- [x] Add order filter/sort/pagination endpoints.

### 4.6 Admin Control Tower
- [x] Tenants/users/plans read endpoints implemented.
- [x] Tenant create endpoint implemented.
- [x] Add tenant suspend/reactivate endpoint.
- [x] Add user role change endpoint.
- [x] Add user activate/deactivate endpoint.
- [x] Add plan assignment override endpoint.
- [x] Add admin action reason capture for risky actions.

### 4.7 Audit + Security
- [x] Audit logging model implemented.
- [x] Add immutable audit policy guard.
- [x] Add audit log query endpoint with filters.
- [x] Add sensitive payload masking utility.
- [x] Add centralized error envelope middleware.
- [x] Add request-id propagation middleware.

## 5) Web App (SaaS + E-commerce Frontend)

### 5.1 Architecture
- [x] Base web app exists.
- [x] Refactor into route-based modules: public/auth/dashboard/admin.
- [x] Add reusable component folders (cards, tables, forms, modals).
- [x] Add shared state/session utility.

### 5.2 Auth UX
- [x] Login wired to API.
- [x] Add refresh-token silent re-auth UX.
- [x] Add logout confirmation for active operations.
- [x] Add session-expiry warning banner.

### 5.3 Dashboard + Role Views
- [x] Role-aware section toggles present.
- [x] Add true route guards by role.
- [x] Add owner dashboard cards (sales, low-stock, sync, dues).
- [x] Add manager dashboard cards (team + operations).
- [x] Add cashier quick actions panel.
- [x] Add staff inventory actions panel.
- [x] Add admin console split view (tenants/users/plans/audits).

### 5.4 Inventory UX
- [x] Add-item form and list exists.
- [x] Add inline form validation messages.
- [x] Add filter chips (category/location/online/stock).
- [x] Add pagination controls.
- [x] Add edit-item modal.
- [x] Add stock movement UI.
- [x] Add stock audit UI.

### 5.5 E-commerce UX
- [x] Product list + cart + create order exists.
- [x] Add order board (pending/accepted/completed/cancelled).
- [x] Add customer details form for checkout.
- [x] Add order detail drawer.
- [x] Add cancellation/refund action UI.

### 5.6 Public SaaS Website
- [x] Landing page baseline exists.
- [x] Add full nav pages: features, pricing, compare, security, contact.
- [x] Add product tour section with role-based screenshots.
- [x] Add CTA tracking events.
- [x] Add lead form with backend endpoint.

## 6) Mobile Platform Track
- [x] Initialize mobile runtime project.
- [x] Add auth flow with token storage.
- [x] Add dashboard screen with KPI cards.
- [x] Add inventory list screen.
- [x] Add add-item form screen.
- [x] Add order list screen.
- [x] Add order status update flow.
- [x] Add offline queue indicator.
- [x] Add network-retry UX for failed API calls.

## 7) Windows Platform Track (POS-first)
- [x] Initialize windows POS project shell.
- [x] Add barcode-first search input flow.
- [x] Add cart line editor with keyboard shortcuts.
- [x] Add hold bill / resume bill list.
- [x] Add split payment flow UI.
- [x] Add print invoice preview layout.
- [x] Add scanner and printer integration adapter stubs.
- [x] Add cashier shift close panel.

## 8) Data / Analytics Track
- [x] Create event taxonomy document in `docs/architecture`.
- [x] Add event instrumentation to login flow.
- [x] Add event instrumentation to add-item flow.
- [x] Add event instrumentation to order create flow.
- [x] Add event instrumentation to admin actions.
- [x] Add dashboard metrics API extension for trends.
- [x] Add telemetry QA checklist.

## 9) QA / Testing Track
- [x] Add unit tests for auth utils.
- [x] Add integration tests for login/refresh/logout.
- [x] Add RBAC deny-path integration tests.
- [x] Add inventory create/update validation tests.
- [x] Add order stock deduction + rollback tests.
- [x] Add admin endpoint permission tests.
- [x] Add web smoke tests for login + inventory + order.
- [x] Add test data reset utility.

## 10) DevOps / Local Run Reliability
- [x] Add backend Dockerfile.
- [x] Add docker-compose for api + mongo.
- [x] Add `.env.local.example` for local setup.
- [x] Add one-command local startup script.
- [x] Add health/readiness checks.
- [x] Add CI workflow (lint/test/build).
- [x] Add release pipeline skeleton.

## 11) Run-Local Acceptance (What you should see)
- [ ] Start backend locally with no manual hacks.
- [ ] Login works for owner/manager/cashier/staff/admin.
- [ ] Dashboard shows role-specific views.
- [ ] Inventory add/edit/list/filter works.
- [ ] E-commerce order creation reduces inventory stock.
- [ ] Admin can create/suspend/reactivate tenant.
- [ ] Admin can change user role and status.
- [ ] Audit log entries visible for critical actions.

## 12) Final Vision Closure Checklist
- [ ] SaaS website complete with conversion pages.
- [ ] SaaS auth + multi-role dashboards production-ready.
- [ ] Inventory (rack/bin + audit + movement) production-ready.
- [ ] E-commerce flows integrated with inventory and admin controls.
- [ ] Mobile baseline live and usable.
- [ ] Windows POS baseline live and usable.
- [x] Docs complete, clean, and updated with latest implementation.
- [x] Local run guide complete so full product is demoable end-to-end.
