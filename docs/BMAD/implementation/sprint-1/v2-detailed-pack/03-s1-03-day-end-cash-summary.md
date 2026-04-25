# S1-03 Detailed Spec: Day-End Cash Summary with Mismatch Flags

## Story Meta
- Story ID: `SV-S1-03`
- Primary persona: Owner/Manager
- Business outcome: accurate closure and accountability per shift/day

## Scope
- aggregate totals by payment mode
- cashier-wise and shift/date filters
- mismatch logging with reason codes

## UI Components
- day-end dashboard card + detailed report view
- filter toolbar
- mismatch entry modal
- export action (PDF/CSV)

## Field-Level Spec
- `business_date`: required
- `cashier_id`: optional filter
- `shift_id`: optional filter
- `declared_cash_amount`: conditional when closing cash
- `mismatch_reason_code`: required if mismatch != 0
- `mismatch_note`: optional (required for large mismatch as policy)

## Validation Rules
- computed totals must derive from posted invoices/payments only
- mismatch reason mandatory when declared != computed
- closure record immutable after final submission (reversal flow if needed)

## API Contract Draft
- `GET /api/v1/reports/day-end?date=&cashier_id=&shift_id=`
- `POST /api/v1/reports/day-end/close`
- `GET /api/v1/reports/day-end/{id}/export?format=pdf|csv`

## DB/Schema Impact
- `day_end_closures` table/collection for closure snapshots
- link closures to invoice/payment aggregates and actor metadata
- audit entries for closure and mismatch actions

## Role/Permission Requirements
- cashier: view own summary (optional by policy)
- manager/owner: finalize closure, log mismatch

## Telemetry Events
- `day_end_summary_viewed`
- `day_end_closure_submitted`
- `day_end_mismatch_logged`
- `day_end_export_triggered`

## Edge Cases
- late-posted invoice after closure -> next-day adjustment/reconciliation note
- duplicate closure attempts -> block with existing closure reference

## Acceptance Criteria
- totals reconcile with posted transactions accurately
- mismatch logging enforces reason compliance
- export output matches visible report data

## Definition of Done Checklist
- aggregation logic validated against sample ledgers
- closure immutability and reversal policy tested
- permission boundaries verified
- QA verifies financial correctness scenarios
