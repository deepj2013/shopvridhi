# Sprint-1 Risk Register and Mitigation

## Risk Scale
- Probability: Low / Medium / High
- Impact: Low / Medium / High

| Risk ID | Risk Description | Probability | Impact | Affected Stories | Owner | Mitigation | Fallback |
|---|---|---|---|---|---|---|---|
| R1 | Scanner behavior inconsistent across low-cost devices | Medium | High | S1-02 | UIUX-Head-Agent | test with device matrix early (Day 3) | manual search fallback shortcuts |
| R2 | Split payment rounding mismatch causes posting failures | Medium | High | S1-01 | DB-Head-Agent | strict arithmetic and decimal policy | temporary rounding guard with warning |
| R3 | Day-end totals mismatch due to late postings | Medium | Medium | S1-03 | Technical-Head-Agent | closure snapshot and adjustment policy | mark pending adjustment in next closure |
| R4 | Location transfer race causes stale stock errors | Medium | High | S1-04 | DB-Head-Agent | source-qty revalidation at commit time | retry with latest quantity prompt |
| R5 | Udhaar settlement logic produces incorrect outstanding | Low | High | S1-05 | BA-Agent | ledger math test set and reconciliation checks | reversal + corrected repost workflow |
| R6 | Sync retry creates duplicate records | Low | High | S1-06 | DevOps-SRE-Agent | idempotency keys and replay guards | dead-letter and manual reconciliation |
| R7 | Role policy gaps allow unauthorized price/discount edits | Medium | High | S1-01,S1-05 | RBAC-Identity-Agent | explicit server-side auth checks | disable risky edits by feature flag |
| R8 | QA cycle compressed due to integration delays | Medium | High | All | Program-Manager-Agent | freeze scope and enforce Day 8 integration | defer non-critical polish to next sprint |
| R9 | Local performance misses target on large catalogs | Medium | Medium | S1-02 | Technical-Head-Agent | pre-index and query optimization | reduce result payload and tune search weights |
| R10 | Observability insufficient for production diagnostics | Medium | Medium | S1-06 | DevOps-SRE-Agent | mandatory telemetry checklist before release | temporary enhanced logs in staged rollout |

## Risk Review Cadence
- Day 1: initial baseline
- Day 5: mid-sprint risk refresh
- Day 8: pre-QA integration risk review
- Day 10: release risk sign-off
