# Shared Goal and Guardrails

## Product Goal

Build ShopVridhi as a universal, offline-first operating system for unorganized Indian retail that combines:

- Vyapar-level billing practicality
- OkCredit/Khatabook-level simplicity
- advanced CRM, rack inventory, barcode POS, WhatsApp ordering
- bulk ordering, commission engine, and hyperlocal marketplace readiness

## Core Outcomes (12-Month)

- Billing completion for repeat customer in <= 25 seconds
- 40% stock mismatch reduction for active shops
- 20% faster udhaar recovery cycle
- >= 30% CRM campaign adoption among active shops
- >= 15% shops receiving online/local orders

## Non-Negotiable Product Behaviors

- Works without internet for critical operations.
- Syncs safely and automatically when internet returns.
- Handles multiple shop categories with minimal setup.
- Keeps UI simple for low-tech users and high-throughput cashiers.
- Provides CA-ready compliance outputs and audit trails.

## Design + Engineering Quality Bar

- Modern but practical UI (clarity over visual noise)
- Keyboard-first POS, large touch targets, bilingual-ready labels
- p95 local billing interactions under 200ms
- secure by default, strict tenant isolation
- observability and rollback-ready deployments

## Micro-Execution Principles

- Every critical workflow must have field-level specification before build.
- Each form must define completion-time target and validation behavior.
- Role-based visibility must reduce clutter and speed up user decisions.
- Universal admin should control SaaS + e-commerce through one audited plane.
- Feature quality is measured by speed, correctness, and support load reduction.

## Prioritization Rule

When priorities conflict, choose in this order:

1. Billing speed and reliability
2. Data correctness (financial and stock)
3. Offline continuity and sync recovery
4. Simple UX for daily operations
5. Growth features and marketplace expansion
