# S1-05 Detailed Spec: Udhaar Auto-Post and Reminder Trigger Presets

## Story Meta
- Story ID: `SV-S1-05`
- Primary persona: Owner/Cashier
- Business outcome: improve dues tracking and recovery consistency

## Scope
- auto-post udhaar entry from credit invoice
- payment settlement against outstanding
- reminder schedule presets

## UI Components
- POS credit toggle and customer selection
- customer ledger timeline view
- reminder preset selector
- payment collection form

## Field-Level Spec
- `customer_id`: required for credit sale
- `credit_invoice_id`: generated link
- `ledger_entry_type`: auto (`debit` on credit sale, `credit` on recovery)
- `collect_amount`: required for payment collection
- `settlement_strategy`: default oldest-first
- `reminder_preset`: optional (`d1`,`d3`,`d7`,`d15`)

## Validation Rules
- credit sale blocked if customer missing (unless walk-in credit policy off)
- collect_amount > 0 and <= outstanding (unless overpay policy enabled)
- settlement updates must remain ledger-consistent

## API Contract Draft
- `POST /api/v1/ledger/udhaar/auto-post`
- `GET /api/v1/ledger/customers/{id}`
- `POST /api/v1/ledger/customers/{id}/collect`
- `POST /api/v1/ledger/customers/{id}/reminders/schedule`

## DB/Schema Impact
- `udhaar_ledger` append entries with source refs
- `reminder_jobs` schedule store (or queue metadata)
- customer outstanding snapshot/cache for fast display

## Role/Permission Requirements
- cashier: create credit sale, collect payment
- manager/owner: override settlement and reminder policies

## Telemetry Events
- `udhaar_auto_post_success`
- `udhaar_collect_submitted`
- `udhaar_reminder_scheduled`
- `udhaar_settlement_validation_failed`

## Edge Cases
- invoice cancellation after udhaar post -> reversal ledger entry
- partial payments across multiple old invoices
- reminder scheduling failure -> retry and visibility in queue

## Acceptance Criteria
- credit invoices auto-create ledger entries without manual steps
- payment collection updates outstanding accurately
- reminder presets can be scheduled from ledger context

## Definition of Done Checklist
- ledger append-only behavior validated
- settlement math reconciles across partial payments
- reminder scheduling observable and retry-safe
- role overrides audited
