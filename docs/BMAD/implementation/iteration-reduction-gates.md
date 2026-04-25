# Iteration Reduction Gates (Must Pass)

## Why
Reduce back-and-forth by forcing clarity before implementation.

## Gate 1: Requirement Clarity (BA)
- problem statement and user persona explicit
- in-scope vs out-of-scope defined
- acceptance criteria measurable
- edge cases listed

## Gate 2: UX + Field Freeze
- flow diagram finalized
- fields categorized: required/optional/conditional/computed
- keyboard and scanner behavior defined
- validation rules and error copy defined

## Gate 3: Technical Contract Freeze
- API request/response contract versioned
- domain ownership clear per service
- idempotency and retry behavior defined
- offline + sync behavior defined

## Gate 4: Data Readiness
- schema and indexes reviewed
- conflict resolution policy documented
- migration + rollback plan prepared
- audit data captured for sensitive actions

## Gate 5: Test Readiness
- happy path + edge path tests documented
- role permission negatives covered
- tax/finance calculations covered
- performance acceptance criteria included

## Gate 6: Release Readiness
- observability for new flows enabled
- rollback path tested
- feature flags configured if needed
- runbook updated

## Stop-Ship Conditions
- ambiguous acceptance criteria
- unresolved security/permission gap
- missing audit trail for financial/admin actions
- unresolved sync conflict behavior
