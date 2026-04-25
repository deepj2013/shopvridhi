# Owner-Wise Task Assignment (Sprint-1)

## Story Ownership Matrix

| Story ID | Feature | Primary Owner | Supporting Owners | Exit Owner |
|---|---|---|---|---|
| SV-S1-01 | POS hold/resume + split payment | Technical-Head-Agent | UIUX-Head-Agent, DB-Head-Agent, RBAC-Identity-Agent | QA-Head-Agent |
| SV-S1-02 | Barcode scan + search fallback | Technical-Head-Agent | DB-Head-Agent, UIUX-Head-Agent, Forms-Optimization-Agent | QA-Head-Agent |
| SV-S1-03 | Day-end cash summary | BA-Agent | Technical-Head-Agent, DB-Head-Agent, UIUX-Head-Agent | QA-Head-Agent |
| SV-S1-04 | Rack/shelf/bin workflows | DB-Head-Agent | Technical-Head-Agent, UIUX-Head-Agent | QA-Head-Agent |
| SV-S1-05 | Udhaar auto-post + reminders | BA-Agent | Technical-Head-Agent, DB-Head-Agent, Growth-Marketplace-Agent | QA-Head-Agent |
| SV-S1-06 | Sync status + retry | DevOps-SRE-Agent | Technical-Head-Agent, UIUX-Head-Agent, Security-Compliance-Agent | QA-Head-Agent |

## Role Responsibilities

### BA-Agent
- freeze acceptance criteria and edge cases
- clarify compliance constraints for financial flows

### Technical-Head-Agent
- finalize API and service contract decisions
- ensure cross-story dependency compatibility

### DB-Head-Agent
- apply schema/index changes and migration notes
- validate ledger and aggregation integrity

### UIUX-Head-Agent + Forms-Optimization-Agent
- freeze fields and interaction specs
- validate keyboard-first and clarity constraints

### RBAC-Identity-Agent
- enforce role policies on sensitive fields and actions

### DevOps-SRE-Agent
- release checks, observability, and rollback readiness

### QA-Head-Agent
- map acceptance to test IDs
- gate each story for release

### Program-Manager-Agent
- run daily dependency and blocker control
- maintain sprint burn and risk visibility
