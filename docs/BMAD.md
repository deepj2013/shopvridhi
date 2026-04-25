# ShopVridhi BMAD Multi-Agent Operating Model

This folder defines a BMAD-style execution system so multiple specialist agents/teams can work in parallel while staying synced to one goal:

- Build a production-ready, offline-first retail SaaS for Indian shopkeepers.
- Deliver modern, fast, low-training UI/UX across POS, inventory, CRM, and marketplace.
- Preserve a 5-10 second execution standard for core shop operations.

## BMAD Roles in This Setup

- `BA-Agent`: business requirements, workflows, acceptance criteria
- `Technical-Head-Agent`: architecture, service boundaries, technical decisions
- `DB-Head-Agent`: data modeling, sync model, performance and consistency
- `UIUX-Head-Agent`: design system, information architecture, interaction speed
- `QA-Head-Agent`: test strategy, release gates, regression matrix
- `DevOps-SRE-Agent`: CI/CD, environments, observability, reliability
- `Growth-Marketplace-Agent`: hyperlocal commerce, WhatsApp ordering, commission logic
- `Program-Manager-Agent`: planning cadence, dependency control, risk tracking
- `Admin-Control-Tower-Agent`: universal control plane across SaaS + commerce
- `RBAC-Identity-Agent`: role hierarchy, policy enforcement, scoped authorization
- `Forms-Optimization-Agent`: field-level speed optimization and form standards
- `Product-Strategy-Agent`: competitive positioning and roadmap prioritization
- `Ecommerce-CommerceOps-Agent`: order operations and service-level quality
- `Pricing-Billing-SaaS-Agent`: plan/entitlement/metering/commission logic
- `Security-Compliance-Agent`: security controls, compliance and audit posture
- `Data-Analytics-Agent`: metrics taxonomy, telemetry, and decision dashboards

## Single Source of Truth

1. Product baseline: `docs/ShopVridhi_Complete_Documentation.md`
2. BMAD alignment: `docs/BMAD/shared-goal.md`
3. Role deliverables: `docs/BMAD/agents/*.md`
4. Execution plan: `docs/BMAD/execution/roadmap-90-days.md`
5. Expanded network: `docs/BMAD/execution/agent-network-expanded.md`
6. Universal admin model: `docs/BMAD/execution/universal-admin-control-plane.md`
7. Deep role matrix: `docs/BMAD/execution/role-permission-matrix-detailed.md`
8. Micro form design: `docs/BMAD/execution/forms-and-fields-micro-spec.md`
9. SaaS + commerce model: `docs/BMAD/execution/ecommerce-saas-operating-model.md`

## Working Agreement (All Agents)

- Every decision must map back to the shared goal document.
- No module design is "done" without production constraints:
  - offline behavior
  - role permissions
  - auditability
  - error handling
  - reporting impact
- UI changes must maintain speed benchmarks for cashier workflows.
- Data changes must include migration and backward compatibility notes.
- Any cross-team blocker must be raised in Program Manager weekly review.

## Sprint Cadence

- Weekly:
  - BA refreshes backlog and acceptance criteria
  - Tech + DB finalize solution design for next sprint scope
  - UI/UX delivers clickable flows and component specs
  - QA defines test cases before implementation starts
  - DevOps validates release readiness and deployment constraints
- Fortnightly:
  - architecture review for scalability and security
  - marketplace and growth review for monetization checkpoints

## Done Criteria (Cross-Team)

- Feature shipped with:
  - acceptance criteria passed
  - no blocker/high severity defects
  - offline + sync behavior verified
  - analytics events captured
  - role access controls enforced
  - docs updated
