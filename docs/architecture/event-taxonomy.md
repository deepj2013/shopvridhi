# ShopVridhi Event Taxonomy (v1)

## Naming Rules
- Use snake_case event names.
- Keep event payloads flat and avoid PII except masked identifiers.
- Include `source`, `role`, and `ts` where possible.

## Core Events
- `login_success`, `login_failed`
- `inventory_item_added`, `inventory_item_updated`
- `order_created`, `order_status_updated`, `order_cancelled`
- `admin_tab_opened`, `admin_policy_action`
- `cta_click`, `lead_submitted`

## Required Fields by Flow
- Auth: `email_domain`, `source`
- Inventory: `sku`, `category`, `source`
- Order: `order_id`, `item_count`, `total`, `source`
- Admin: `action`, `target_type`, `reason`

## Data Quality Rules
- Reject events with missing `eventName`.
- Drop payload fields larger than 4KB.
- Mask sensitive keys (`password`, `token`, `authorization`, `phone`) before persistence.
