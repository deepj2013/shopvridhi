# QA Test Case Mapping to Acceptance Criteria (Sprint-1)

## Mapping Format
- Story -> Acceptance Criterion -> Test Case IDs

## SV-S1-01
- AC1: keyboard-only billing path works
  - `TC-S1-01-001` keyboard navigation full flow
  - `TC-S1-01-002` shortcut behavior with hold/resume
- AC2: split payment exact total validation
  - `TC-S1-01-003` exact sum pass
  - `TC-S1-01-004` mismatch block with inline error
- AC3: hold/resume state integrity
  - `TC-S1-01-005` hold and resume line integrity
  - `TC-S1-01-006` hold resume after app restart

## SV-S1-02
- AC1: exact barcode resolves first
  - `TC-S1-02-001` valid barcode instant match
  - `TC-S1-02-002` duplicate barcode conflict handling
- AC2: fallback search relevance
  - `TC-S1-02-003` query ranking and stable ordering
  - `TC-S1-02-004` case-insensitive alias matching
- AC3: no-result quick-add in <= 2 steps
  - `TC-S1-02-005` miss to quick-add handoff

## SV-S1-03
- AC1: day-end totals reconcile accurately
  - `TC-S1-03-001` totals by payment mode
  - `TC-S1-03-002` filtered aggregation by cashier
- AC2: mismatch requires reason code
  - `TC-S1-03-003` mandatory mismatch reason validation
- AC3: export matches report data
  - `TC-S1-03-004` PDF/CSV consistency checks

## SV-S1-04
- AC1: transfer creates auditable location ledger
  - `TC-S1-04-001` transfer ledger entry with from/to location
- AC2: item shows location-aware stock
  - `TC-S1-04-002` item details location availability
- AC3: invalid transfer blocked
  - `TC-S1-04-003` qty overflow validation
  - `TC-S1-04-004` same source/target blocked

## SV-S1-05
- AC1: credit invoice auto-posts udhaar entry
  - `TC-S1-05-001` credit sale ledger debit creation
- AC2: payment settlement updates outstanding
  - `TC-S1-05-002` partial settlement progression
  - `TC-S1-05-003` full settlement closure
- AC3: reminder presets schedule properly
  - `TC-S1-05-004` d1/d3/d7/d15 schedule creation

## SV-S1-06
- AC1: sync badge reflects state transitions
  - `TC-S1-06-001` synced->pending->failed->synced transitions
- AC2: failed events visible and retryable
  - `TC-S1-06-002` failed list visibility and retry action
- AC3: retry is idempotent and audited
  - `TC-S1-06-003` duplicate retry protection
  - `TC-S1-06-004` retry audit log verification

## Regression Set Tags
- `REG-FIN` for financial correctness
- `REG-SYNC` for offline/sync behaviors
- `REG-RBAC` for permission boundary checks
- `REG-PERF` for latency and responsiveness checks
