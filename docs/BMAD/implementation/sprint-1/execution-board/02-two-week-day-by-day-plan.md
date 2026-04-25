# Two-Week Day-by-Day Plan (Sprint-1)

## Week 1

### Day 1 (Kickoff + Freeze)
- BA: freeze S1-01..S1-06 acceptance criteria
- UX/Forms: freeze fields for S1-01, S1-02
- Tech: freeze API contract drafts for S1-01, S1-02
- PM: confirm dependencies and no-open ambiguity

### Day 2
- Dev starts S1-01 core draft/post flow
- DB sets invoice/payment constraints for split payment
- QA drafts test cases for S1-01 and S1-02

### Day 3
- Dev starts S1-02 scanner + search fallback behavior
- UI validates keyboard/scanner interactions in staging build
- QA prepares device-specific scanner scenarios

### Day 4
- Dev starts S1-03 aggregation endpoints
- DB starts closure snapshot structure
- BA validates mismatch reason policy and closure rules

### Day 5
- Dev starts S1-04 location hierarchy + transfer flow
- DB adds location-aware stock ledger changes
- QA executes first regression pass for S1-01/S1-02

## Week 2

### Day 6
- Dev starts S1-05 udhaar auto-post and collection flow
- BA + Growth confirm reminder preset behavior
- QA prepares ledger consistency checks

### Day 7
- Dev starts S1-06 sync badge and retry APIs/UI
- DevOps connects sync telemetry dashboards
- Security reviews retry and idempotency safeguards

### Day 8
- Integration day: S1-01..S1-06 cross-flow validation
- fix dependency defects and edge-case handling
- PM runs blocker burndown

### Day 9
- Full QA cycle (functional + role + offline/sync + calculations)
- performance checks for local search and posting latency
- UAT dry-run with scripted merchant scenarios

### Day 10 (Release Readiness)
- final defect triage and closure
- go/no-go review with QA + DevOps + PM
- release notes and support handoff checklist

## Daily Non-Negotiables
- standup: progress/blockers/dependencies
- end-of-day update: status per story and risk changes
- no new scope unless approved via PM risk review
