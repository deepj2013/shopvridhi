# S1-01 Detailed Spec: Keyboard-First POS with Hold/Resume + Split Payment

## Story Meta
- Story ID: `SV-S1-01`
- Primary persona: Cashier
- Business outcome: faster checkout and fewer billing interruptions

## Scope
- invoice creation with keyboard-first controls
- hold bill with resume list
- split payments across cash/UPI/card

## Out of Scope
- advanced loyalty redemption
- partial refund flows (future sprint)

## UI Components
- POS shell layout
- scanner/search input component
- invoice line grid
- payment mode panel
- split payment modal/panel
- hold bill drawer/list

## Field-Level Spec
- `item_input`: required, autofocus, scanner/search mixed input
- `qty`: required, integer/decimal as unit rules allow, default `1`
- `rate`: required, editable for allowed roles only
- `discount_type`: optional (`percent`/`amount`)
- `discount_value`: conditional when discount applied
- `customer_id`: optional
- `payment_lines[]`: required at posting
  - `mode`: required (`cash`,`upi`,`card`,`other`)
  - `amount`: required, > 0
- `hold_reason`: optional

## Validation Rules
- sum(payment_lines.amount) must equal net_total
- discount cannot exceed role policy threshold
- qty > 0 and within stock policy bounds (if strict stock enabled)
- hold action allowed only for non-posted invoices

## API Contract Draft
- `POST /api/v1/pos/invoices/draft`
  - purpose: create/update draft invoice
- `POST /api/v1/pos/invoices/{id}/hold`
  - body: `{ hold_reason? }`
- `POST /api/v1/pos/invoices/{id}/resume`
- `POST /api/v1/pos/invoices/{id}/post`
  - body includes payment lines and final totals

## DB/Schema Impact
- `invoices`: add/use status (`draft`,`hold`,`posted`), hold metadata
- `invoice_lines`: standard line persistence
- `payments`: one row per payment line on post
- `audit_logs`: hold/resume/post events

## Role/Permission Requirements
- cashier: create draft, hold, resume, post (within policy)
- manager: override discount caps
- owner: full override

## Telemetry Events
- `pos_invoice_draft_saved`
- `pos_invoice_held`
- `pos_invoice_resumed`
- `pos_invoice_posted`
- `pos_split_payment_validation_failed`

## Edge Cases
- network loss during post -> local queue + pending sync marker
- duplicate post retry -> idempotent handling
- payment mismatch -> block post with inline correction

## Acceptance Criteria
- keyboard-only operation supports full billing path
- held invoice resumes with all line/payment context intact
- split payment post succeeds only on exact total match

## Definition of Done Checklist
- API contracts implemented and documented
- UI interactions match keyboard-first behavior
- role checks enforced in backend + UI
- telemetry events validated in staging
- QA passes functional + edge-case suites
