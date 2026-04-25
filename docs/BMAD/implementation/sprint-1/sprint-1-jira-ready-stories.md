# Sprint 1 Jira-Ready Stories

## Story Format
- ID
- Title
- Persona
- Business Value
- Dependencies
- Acceptance Criteria

## S1-01
- ID: `SV-S1-01`
- Title: Keyboard-first POS with hold/resume and split payment
- Persona: Cashier
- Business Value: Faster checkout and reduced queue time
- Dependencies: role permissions for rate/discount edits
- Acceptance Criteria:
  - hold/resume available via keyboard shortcuts
  - split payment validates total before posting
  - failed validation shows inline error

## S1-02
- ID: `SV-S1-02`
- Title: Barcode scan + instant search fallback
- Persona: Cashier
- Business Value: Faster item addition and fewer billing delays
- Dependencies: local product index and scanner input handling
- Acceptance Criteria:
  - exact barcode resolves first
  - fallback search returns top matches quickly
  - item-not-found allows quick add path

## S1-03
- ID: `SV-S1-03`
- Title: Day-end cash summary and mismatch flags
- Persona: Owner/Manager
- Business Value: Better daily reconciliation and fraud/mistake visibility
- Dependencies: invoice + payment aggregation reliability
- Acceptance Criteria:
  - payment mode totals visible and filterable
  - mismatch entry requires reason code
  - closure report export available

## S1-04
- ID: `SV-S1-04`
- Title: Rack/shelf/bin location in item and stock workflows
- Persona: Inventory staff
- Business Value: Faster stock handling and fewer pick errors
- Dependencies: location master hierarchy
- Acceptance Criteria:
  - item quick-add supports location assignment
  - stock transfer captures from/to location
  - ledger audit displays location metadata

## S1-05
- ID: `SV-S1-05`
- Title: Udhaar auto-post and reminder trigger presets
- Persona: Owner/Cashier
- Business Value: Better recovery rate with lower manual effort
- Dependencies: customer ledger and payment settlement logic
- Acceptance Criteria:
  - credit sale posts ledger entry automatically
  - customer outstanding updates after payment
  - reminder preset scheduling is available

## S1-06
- ID: `SV-S1-06`
- Title: Offline sync status and retry controls
- Persona: All shop users
- Business Value: Trust in offline workflow and issue transparency
- Dependencies: sync event queue state exposure
- Acceptance Criteria:
  - status badge reflects synced/pending/failed
  - pending and failed counts visible
  - manual retry for failed events works
