# Sprint 1 Implementation Spec (Speed and Core Reliability)

## Sprint Theme
Win cashier and owner trust with speed, accuracy, and daily control.

## Sprint Scope (P1)
- S1-01 Keyboard-first POS with hold/resume and split payment
- S1-02 Barcode scan/search with instant item match
- S1-03 Day-end cash summary with mismatch flags
- S1-04 Rack/shelf/bin in item quick-add and stock movement
- S1-05 Udhaar ledger auto-post with reminder trigger
- S1-06 Offline sync status indicator and retry visibility

## S1-01 POS Keyboard + Hold/Resume + Split Payment
### Outcome
Cashier can complete routine billing rapidly without mouse dependency.

### UX/Field Spec
- `item_input` required, autofocus, scanner buffer support
- `qty` required default 1 with keyboard quick increments
- `rate` conditional edit by role
- `discount` optional policy-capped
- `payment_mode` required with split option
- `hold_bill_reason` optional

### Tech/Data Notes
- invoice state: `draft`, `hold`, `posted`
- split payment lines must sum invoice total exactly
- hold bills retain local timestamp and cashier id

### Acceptance Criteria
- hold and resume works without internet
- split payment validates exact total before post
- repeat billing can complete within target threshold

## S1-02 Barcode + Search
### Outcome
Cashier can add items instantly via barcode or fast search.

### UX/Field Spec
- scanner input with debounce and exact barcode priority
- search fallback by name, sku, alias
- quick pick list when multiple close matches

### Tech/Data Notes
- local index for barcode and tokenized name search
- not-found flow prompts item quick-add

### Acceptance Criteria
- barcode match appears near-instant in local mode
- fallback search returns relevant items in stable order

## S1-03 Day-End Cash Summary
### Outcome
Owner/manager can close day with confidence on payment mix and mismatch.

### UX/Field Spec
- date/shop/cashier filters
- totals by cash, UPI, card, split
- mismatch entry with reason and note

### Acceptance Criteria
- totals reconcile with posted invoices and payments
- mismatch logging requires reason selection

## S1-04 Rack/Shelf/Bin Mapping
### Outcome
Item and stock operations reflect physical location for faster handling.

### UX/Field Spec
- item quick-add includes optional location assignment
- stock movement requires source and target location
- location selector supports rack > shelf > bin hierarchy

### Acceptance Criteria
- stock movement creates auditable ledger with location
- item search can show current storage location

## S1-05 Udhaar Auto-Post + Reminder Trigger
### Outcome
Credit sales automatically update ledger and simplify collection follow-up.

### UX/Field Spec
- credit sale toggle in POS payment section
- outstanding summary in customer profile
- reminder schedule presets (day 1/3/7/15)

### Acceptance Criteria
- credit invoice auto-posts udhaar entry
- payment settlement updates outstanding correctly

## S1-06 Sync Indicator + Retry
### Outcome
Staff can trust offline behavior and know pending/failure status.

### UX/Field Spec
- top bar sync badge: `synced`, `pending`, `failed`
- queue details panel with retry action
- error guidance text for common failures

### Acceptance Criteria
- badge updates on network transitions
- manual retry supported for failed sync events
