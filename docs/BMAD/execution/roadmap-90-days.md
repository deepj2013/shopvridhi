# 90-Day BMAD Execution Roadmap (Production-Ready Foundation)

## Objective

Deliver a deployable Phase-1 + Phase-2 foundation with fast POS, reliable stock tracking, udhaar, purchase flow, and modern UI/UX baseline.

## Team Stream Mapping

- BA: scope slicing, acceptance criteria, compliance rules
- Tech: architecture baseline and service contracts
- DB: schema/migrations/indexes/sync policies
- UI/UX: design system + POS/inventory/customer flows
- QA: automation and release gates
- DevOps: CI/CD, observability, backup posture
- Growth: CRM + WhatsApp + order-to-bill flow strategy
- PM: coordination, blockers, milestone integrity

## Phase Plan

### Days 1-15: Foundation Alignment

- Finalize module-level scope for POS, item master, inventory ledger, udhaar, purchase entry.
- Freeze architecture direction for offline-first sync and service boundaries.
- Publish design system v1 (colors, typography, spacing, states, component behavior).
- Define baseline schema and migration policy.
- Establish CI checks, staging environment, error tracking.

Exit criteria:
- shared acceptance criteria approved
- architecture and schema signed off
- UI component baseline ready

### Days 16-45: Core Build Sprint

- Implement POS billing, hold/resume, split payments, print/share.
- Implement stock ledger with rack/shelf/bin model.
- Implement purchase entry with supplier invoice linkage.
- Implement udhaar ledger and reminder trigger framework.
- Build key dashboards: day-end cash, low stock, sales by category.

Exit criteria:
- critical user journeys functional
- offline sync tested on unstable network conditions
- tax and stock validations pass

### Days 46-70: Hardening and Scale Readiness

- Optimize performance for product search, invoice generation, report APIs.
- Add audit logs, role restrictions, and failure recovery flows.
- Expand QA matrix for conflict scenarios and permission negatives.
- Add observability dashboards and release runbooks.

Exit criteria:
- release candidate passes quality gates
- p95 latency targets met in staging benchmarks
- rollback drills validated

### Days 71-90: Growth Hooks + Launch Prep

- Add CRM segmentation baseline and WhatsApp campaign engine skeleton.
- Add online order intake to POS draft-order conversion.
- Add commission rules draft for marketplace transactions.
- Run UAT with pilot merchants and finalize launch checklist.

Exit criteria:
- pilot readiness sign-off
- launch runbook approved
- post-launch metric dashboard active

## Weekly Rituals

- Monday: planning + dependency review
- Wednesday: blocker and quality risk review
- Friday: demo, metrics, and release confidence check

## KPI Dashboard (Must Track Weekly)

- average invoice completion time
- sync failure rate
- stock variance ratio
- blocker defect count
- deployment success rate
- active user and feature adoption signals
