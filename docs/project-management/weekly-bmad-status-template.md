# Weekly BMAD Status Template

Use this template for every weekly status update.  
Copy this file to a dated report, for example:

- `docs/project-management/weekly-status-YYYY-MM-DD.md`

---

## 1) Report Header

- Reporting Week: `YYYY-MM-DD to YYYY-MM-DD`
- Report Date: `YYYY-MM-DD`
- Prepared By: `Name / Role`
- Overall Release Confidence: `Green | Amber | Red`
- Current Sprint / Milestone: `Milestone ID + Name`

## 2) Executive Snapshot

- Overall Progress (%): `__%`
- Planned vs Shipped (This Week): `X planned / Y shipped`
- Critical Risks Count: `__`
- Blockers Count: `__`
- Decisions Needed from Leadership: `Yes/No` (if Yes, list in section 10)

## 3) Milestone Status (RAG)

| Milestone | Owner | Target Date | Current Status (G/A/R) | % Complete | Notes |
|---|---|---|---|---:|---|
| 0 Workspace Governance |  |  |  |  |  |
| 1 Delivery Control |  |  |  |  |  |
| 2 BA/Product Freeze |  |  |  |  |  |
| 3 Shared Contracts/Domain |  |  |  |  |  |
| 4 Backend Hardening |  |  |  |  |  |
| 5 Web App Modules |  |  |  |  |  |
| 6 Mobile Baseline |  |  |  |  |  |
| 7 Windows POS Baseline |  |  |  |  |  |
| 8 Analytics Instrumentation |  |  |  |  |  |
| 9 QA/Test Automation |  |  |  |  |  |
| 10 DevOps/Local Reliability |  |  |  |  |  |
| 11 Local Acceptance |  |  |  |  |  |
| 12 Final Vision Closure |  |  |  |  |  |

## 4) Team/Agent Weekly Updates

### BA Agent
- Completed:
- In Progress:
- Next:
- Risks/Dependencies:

### Technical Head Agent
- Completed:
- In Progress:
- Next:
- Risks/Dependencies:

### DB Head Agent
- Completed:
- In Progress:
- Next:
- Risks/Dependencies:

### UIUX Head Agent
- Completed:
- In Progress:
- Next:
- Risks/Dependencies:

### QA Head Agent
- Completed:
- In Progress:
- Next:
- Risks/Dependencies:

### DevOps/SRE Agent
- Completed:
- In Progress:
- Next:
- Risks/Dependencies:

### Program Manager Agent
- Completed:
- In Progress:
- Next:
- Risks/Dependencies:

## 5) Done This Week (Evidence-based)

> Only list items with evidence links (PR, commit, test run, screenshot, doc update, demo note).

| Item | Area | Evidence | Verified By | Verification Date |
|---|---|---|---|---|
|  |  |  |  |  |

## 6) Not Done / Carry Forward

| Item | Why Not Done | Owner | New Target Date | Dependency |
|---|---|---|---|---|
|  |  |  |  |  |

## 7) Quality and Runtime Health

### Build/Test Summary
- Build Status: `Pass/Fail` (command + date)
- Unit/Integration Tests: `Pass/Fail` (summary counts)
- Smoke/E2E: `Pass/Fail` (summary counts)
- Known Environment Issues:

### Production-readiness Checks
- [ ] Acceptance criteria validated for completed stories
- [ ] Role permissions validated
- [ ] Audit/event instrumentation validated
- [ ] Docs updated for all shipped changes
- [ ] No open P0/P1 defects for shipped scope

## 8) Blockers and Risk Register (Top 10)

| ID | Type (Blocker/Risk) | Description | Severity | Owner | Age (days) | Mitigation | ETA |
|---|---|---|---|---|---:|---|---|
| B1/R1 |  |  |  |  |  |  |  |

## 9) Dependency Status

| From Team | To Team | Dependency | Status | SLA Date | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## 10) Decisions Required

| Decision ID | Decision Needed | Options | Recommended | Needed By | Decision Owner |
|---|---|---|---|---|---|
| D-001 |  |  |  |  |  |

## 11) Next Week Plan (Commitments)

### Top 5 Commitments
1. 
2. 
3. 
4. 
5. 

### Delivery Guardrails for Next Week
- Scope freeze date:
- Risk review date:
- Mid-week quality gate:
- End-week acceptance gate:

## 12) PM Sign-off

- PM Recommendation: `Go | Caution | No-Go`
- Notes:
- Sign-off Date:

---

## Appendix A) Weekly Update Rules

- Do not mark done without evidence.
- If runtime/test is failing, confidence cannot be Green.
- Any billing reliability, data correctness, tenant isolation, or release safety issue must be escalated same day.
- Keep this weekly report aligned with `docs/project-management/TODO-MASTER.md`.

