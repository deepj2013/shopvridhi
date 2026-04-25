# Sprint 1 Test and Acceptance Pack

## QA Objective
Ensure sprint-1 delivers speed, reliability, and correctness with minimal production risk.

## Test Suites

### A) Functional Core
- POS create invoice with mixed items
- hold and resume invoice
- split payment validation and posting
- barcode scan and fallback search
- item quick-add with location assignment
- day-end closure and mismatch logging
- udhaar posting and settlement
- sync badge status transitions

### B) Role and Security
- cashier restricted from owner-only actions
- manager override behavior audited
- sensitive changes log actor and timestamp

### C) Offline and Sync
- internet loss mid-billing
- queued events on reconnect
- failed event retry and recovery
- duplicate retry idempotency checks

### D) Calculation Integrity
- invoice totals and tax correctness
- split payment arithmetic equality
- udhaar balance progression checks

### E) Performance Benchmarks
- local item search responsiveness
- invoice post latency in offline mode
- day-end report generation performance

## UAT Checklist (Merchant Pilot)
- cashier completes repeat sale quickly
- owner can close day without confusion
- inventory staff can locate stock by rack quickly
- udhaar recovery workflow is understandable
- sync states are trusted and actionable

## Exit Criteria
- all P1 stories pass acceptance criteria
- no blocker or high-severity unresolved defect
- KPI instrumentation enabled for sprint metrics
