# S1-04 Detailed Spec: Rack/Shelf/Bin Mapping in Item and Stock Movement

## Story Meta
- Story ID: `SV-S1-04`
- Primary persona: Inventory staff
- Business outcome: faster stock locating and fewer stock handling errors

## Scope
- location hierarchy management use in item quick-add
- stock movement with from/to location
- location visibility in item search/details

## UI Components
- location picker (rack -> shelf -> bin)
- item quick-add location section
- stock transfer form
- inventory line details with location chips

## Field-Level Spec
- `location_rack`: required for location creation
- `location_shelf`: optional/required by rack policy
- `location_bin`: optional/required by shelf policy
- `from_location_id`: required for transfer
- `to_location_id`: required for transfer
- `transfer_qty`: required, > 0
- `transfer_reason`: optional

## Validation Rules
- from_location != to_location
- transfer qty <= available qty at source location
- location nodes must belong to current shop scope

## API Contract Draft
- `POST /api/v1/inventory/locations`
- `GET /api/v1/inventory/locations?shop_id=`
- `POST /api/v1/inventory/transfers`
- `GET /api/v1/items/{id}/locations`

## DB/Schema Impact
- `locations` entity with hierarchy and active state
- `stock_ledger` entries include source and destination locations
- optional materialized stock-by-location view for fast reads

## Role/Permission Requirements
- inventory staff: create transfers
- manager/owner: create/edit location hierarchy

## Telemetry Events
- `inventory_location_created`
- `inventory_transfer_submitted`
- `inventory_transfer_failed_validation`
- `item_location_viewed`

## Edge Cases
- source stock changed between load and submit
- disabled/deleted location referenced in old records

## Acceptance Criteria
- transfers generate auditable stock ledger entries with locations
- item details show current location availability
- invalid transfers blocked with clear inline feedback

## Definition of Done Checklist
- hierarchy integrity checks implemented
- stock-by-location calculations verified
- permissions enforced per action type
- QA covers transfer race and stale data cases
