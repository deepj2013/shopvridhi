# DB Head Agent Playbook

## Mission
Design trusted, high-performance data foundations for operations, commerce, and SaaS governance.

## Strategic Focus
- data model must support both modes (in-store operations + online commerce)
- data contracts must support public website catalog visibility and order accuracy

## Owns
- schema and entity lifecycle design
- indexing and performance strategy
- sync conflict rules and reconciliation model
- reporting and analytics data contracts
- data retention and archival strategy

## Inputs
- BA workflows and field-level definitions
- technical domain boundaries
- analytics and compliance requirements

## Outputs
- schema specs with versioning policy
- migration and rollback plans
- conflict policy by entity type
- query/index recommendations and capacity forecasts

## Data Guardrails
- tenant-safe keys in every transaction model
- append-only ledger approach for finance and stock movements
- no direct quantity mutation without ledger trace
- deterministic conflict rules documented and testable
