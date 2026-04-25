# Edge Cases Checklist

## Offline and Retry
- duplicate submit during unstable internet
- retry after timeout with idempotency key
- reconnect after offline order creation

## Security and Access
- disabled user attempts refresh
- role downgrade while session active
- tenant suspended during active request

## Inventory Integrity
- transfer source equals destination
- negative stock attempt
- concurrent stock updates from two actions

## Order Lifecycle
- cancellation after completion attempt
- refund without payment record
- stock reversal when item archived
