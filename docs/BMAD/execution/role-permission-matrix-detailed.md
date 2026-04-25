# Detailed Role and Permission Matrix (Multi-Role SaaS)

## Scope Levels
- Platform scope: all tenants (ShopVridhi internal admin only)
- Tenant scope: all shops in one tenant
- Shop scope: one store and its operations

## Platform Roles
- Super Admin: full access, including policy and emergency actions
- Ops Admin: tenant/shop operations and incident actions
- Support Admin: support actions, no financial overrides
- Finance Admin: plans, billing, settlements, commission controls
- Compliance Admin: audit/legal reports, policy enforcement

## Shop Roles
- Owner: full shop business control
- Manager: operational control, limited security/plan actions
- Cashier: POS, returns within policy, customer handling
- Inventory Staff: inward/outward, location transfers, stock audit entries
- Marketing Staff: CRM campaigns, no financial posting
- Delivery Coordinator: order prep, dispatch, delivery assignment

## Permission Atoms (Examples)
- `invoice.create`
- `invoice.refund`
- `inventory.adjust`
- `purchase.post`
- `ledger.recovery_message.send`
- `crm.campaign.publish`
- `admin.tenant.suspend`
- `billing.plan.override`
- `marketplace.commission.override`

## Speed-Safe Permission Rules
- cashier cannot access heavy reports screens by default
- manager can approve exceptions without leaving POS flow
- owner-only actions require re-auth for sensitive operations
