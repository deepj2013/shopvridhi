# BMAD Operating Status (Live)

This document explains how BMAD works in this repository and what is currently considered complete vs pending.

## 1) How BMAD works here

BMAD in this project runs as a role-based delivery system:

- Shared goal and guardrails are defined in `docs/BMAD/shared-goal.md`.
- Each role has responsibilities in `docs/BMAD/agents/*.md`.
- Execution artifacts are created in `docs/BMAD/execution/`.
- Program tracking and release readiness are controlled in `docs/project-management/TODO-MASTER.md`.

## 2) Source-of-truth order

When there is a mismatch, use this order:

1. Actual code/runtime behavior in `Code/`
2. Test/build execution results from scripts in `scripts/`
3. `docs/project-management/TODO-MASTER.md`
4. Other planning docs

Reason: checklist items can be marked complete before runtime validation. Code + execution output is final truth.

## 3) BMAD workflow (recommended)

For each sprint/story:

1. BA defines acceptance criteria and edge cases.
2. Technical + DB define implementation and contracts.
3. UI/UX defines flows and component behavior.
4. Engineering implements in `Code/*`.
5. QA verifies against acceptance criteria.
6. DevOps validates build/test/runtime reliability.
7. Program Manager updates status and risks in docs.

## 4) Done criteria (enforced)

A task is "Done" only when all are true:

- Implementation merged in code.
- Relevant tests pass or approved test evidence exists.
- Role/permission behavior is validated where applicable.
- Analytics/audit requirements are satisfied where applicable.
- Documentation updated in `docs/`.

## 5) Current BMAD health snapshot

- BMAD documentation structure is present and organized.
- Core backend and web modules are largely implemented.
- Mobile and Windows tracks are still scaffold/stub-heavy.
- Final local acceptance checklist is still open in `docs/project-management/TODO-MASTER.md` section 11.
- Final vision closure checklist is still open in section 12.

## 6) Update rules for docs

To keep BMAD working correctly, update these files whenever scope/status changes:

- `docs/project-management/TODO-MASTER.md` (task status)
- `docs/project-management/change-log.md` (what changed)
- `docs/project-management/decision-log.md` (why it changed)
- `docs/BMAD/execution/*` (role outputs, plan artifacts)

## 7) Weekly BMAD operating checklist

- Review blockers and dependency map.
- Validate top-priority milestones against real execution evidence.
- Ensure unchecked acceptance items are not reported as fully shipped.
- Align all role documents with current implementation reality.

