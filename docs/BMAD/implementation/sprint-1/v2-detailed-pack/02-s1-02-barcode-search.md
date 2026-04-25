# S1-02 Detailed Spec: Barcode Scan and Instant Search

## Story Meta
- Story ID: `SV-S1-02`
- Primary persona: Cashier
- Business outcome: fast item discovery with minimal correction

## Scope
- scanner input handling
- exact barcode lookup
- fallback search by sku/name/alias
- not-found quick add handoff

## UI Components
- scanner-aware input
- match result list
- quick-add trigger CTA

## Field-Level Spec
- `scan_value`: required for scanner events
- `search_query`: optional fallback input
- `result_item_id`: selected item id

## Validation Rules
- exact barcode match takes highest priority
- fallback search normalizes case and token spacing
- quick-add opens with prefilled name when no result

## API Contract Draft
- `GET /api/v1/items/lookup?barcode=`
- `GET /api/v1/items/search?q=&limit=`

## DB/Schema Impact
- ensure indexes on `barcode`, `sku`, normalized `name_tokens`
- optional `item_aliases` structure/table for search breadth

## Role/Permission Requirements
- cashier can search/select items
- quick-add item may require manager/owner approval based on settings

## Telemetry Events
- `pos_barcode_lookup_success`
- `pos_barcode_lookup_miss`
- `pos_search_fallback_used`
- `pos_quick_add_initiated`

## Edge Cases
- scanner sends trailing chars/newline
- duplicate barcode found -> conflict resolution list
- very large catalog -> maintain stable <target latency behavior

## Acceptance Criteria
- barcode scan populates item near-instant in local mode
- fallback search returns relevant results in predictable order
- not-found path is actionable in <= 2 additional steps

## Definition of Done Checklist
- lookup/search APIs performant under expected catalog size
- scanner behavior validated across supported devices
- quick-add handoff tested with role restrictions
- telemetry confirms miss-rate and fallback usage
