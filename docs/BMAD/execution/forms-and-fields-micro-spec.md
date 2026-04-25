# Forms and Fields Micro Specification (Speed First)

## Global Form Rules
- Define each field as: required, optional, computed, auto-filled, role-conditional.
- Prefer single-column flow for fast entry screens.
- Keep first meaningful action within first viewport.
- Preserve unsaved draft for interruption and device failure.

## POS Bill Form (Micro Fields)
- `item_input` (required, scanner/search combo, autofocus)
- `qty` (required, default 1, keyboard quick keys)
- `rate` (required, role-conditional edit)
- `discount` (optional, policy-limited)
- `customer` (optional but nudged)
- `payment_mode` (required)
- `split_payment` (optional, structured)
- `notes` (optional)

Target: complete repeat billing without customer entry in <= 25 seconds.

## Item Master Form
- Mandatory: name, unit, selling price, tax class
- Recommended: category, barcode, rack/shelf/bin
- Conditional: batch, expiry, variant attributes
- Advanced: reorder level, online visibility, margin threshold

Target: quick-add item in <= 12 seconds for common categories.

## Purchase Entry Form
- supplier (required)
- invoice number/date (required)
- line items with qty, cost, GST (required)
- rack allocation (recommended)
- payment terms and due date (required)

Target: 20-line supplier bill entry with keyboard support and minimal clicks.

## Udhaar Recovery Form
- customer (required)
- outstanding list (auto)
- collect amount (required)
- settlement method (required)
- reminder schedule (optional)

## Validation Rules
- inline validation, avoid disruptive modal errors
- currency and quantity with local format support
- hard-stop only on legally/financially critical fields

## Form Telemetry (Must Track)
- completion time
- validation failure count
- abandon rate
- correction loops per field
