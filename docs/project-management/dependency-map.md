# Dependency Map

Flow: BA -> UX -> Tech -> DB -> QA -> DevOps

## Dependency Chain
1. BA freezes story acceptance and edge cases.
2. UX freezes flow + field behavior.
3. Tech freezes API contract + service behavior.
4. DB freezes schema/index/migration implications.
5. QA maps acceptance to executable tests.
6. DevOps validates release and rollback readiness.

## Current Dependencies
- Inventory movement depends on BA acceptance freeze.
- Stock audit depends on movement ledger model.
- Admin suspend/reactivate depends on RBAC policy checks.
- Order cancellation/refund depends on stock reversal rules.
