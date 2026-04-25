# Cross-Story Contracts and Standards (Sprint-1)

## Common API Standards
- Base path: `/api/v1`
- Auth: bearer token with tenant + shop scope
- Request id: `x-request-id` required for tracing
- Idempotency key required for financial posting and sync retries
- Error envelope:
  - `code`
  - `message`
  - `details[]`
  - `retryable` (boolean)

## Common UI Standards
- keyboard-first for cashier-critical flows
- touch targets >= 44px
- inline validation before submission
- destructive actions require confirmation + reason (where applicable)

## Common Data Standards
- tenant_id and shop_id on all transactional records
- created_by and updated_by for audit
- created_at and updated_at in ISO format
- financial and stock-changing actions append to ledger/event history

## Common Telemetry Standards
- event naming: `domain_action_result`
- include: tenant_id, shop_id, role, latency_ms, success/fail
- no sensitive PII in analytics payload

## Common Definition of Done
- API and UI contracts documented
- role permissions enforced and tested
- telemetry events emitted and validated
- runbook and release notes updated
