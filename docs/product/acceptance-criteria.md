# Acceptance Criteria Freeze

## Inventory Movement Ledger Story
- Movement types supported: inward, outward, transfer.
- Every movement creates immutable ledger row with actor and timestamp.
- Transfer requires valid source and destination location.
- Movement rejects when stock insufficient for outward/transfer.
- API returns updated stock snapshot after successful movement.

## Stock Audit Variance Story
- Audit session can be started and closed.
- Physical count capture allowed per SKU/location.
- Variance computed as physical - system quantity.
- Variance posting creates adjustment ledger entry.
- Closed audits become read-only and auditable.

## User Role Change + Disable/Enable Story
- Admin can change role for active user.
- Admin can disable/enable user account.
- Disabled users cannot login or refresh token.
- Every role/status change writes audit log with reason.

## Tenant Suspend/Reactivate Story
- Admin can suspend active tenant.
- Suspended tenant cannot use protected APIs.
- Admin can reactivate suspended tenant.
- Suspend/reactivate action requires reason code and audit log.

## Order Cancellation/Refund Story
- Order can be cancelled before completion.
- Cancelled order triggers stock reversal.
- Refund note created for paid orders.
- Cancellation and refund actions are auditable.

## Commission Event Points Story
- Commission event emitted on accepted/completed marketplace order.
- Event includes order id, tenant id, commission basis, amount.
- Failed commission write enters retry queue with visibility.
