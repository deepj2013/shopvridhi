# UI/UX Production Checklist for ShopVridhi

## Design Language

- clean card-based layout with clear hierarchy
- neutral base palette + high-contrast action colors
- readable typography optimized for busy counters
- icon + label pairing for low-learning users

## Core Experience Rules

- POS opens in ready-to-scan state by default
- primary actions always visible above fold
- no hidden critical actions in deep menus
- loading and sync states always visible and understandable

## Screen Priorities

- Cashier POS: speed, keyboard shortcuts, scan reliability
- Owner Dashboard: top KPIs, actionable alerts, day-end closure
- Inventory: location-aware stock view and quick adjustments
- Purchase Entry: invoice accuracy and fast inward flow

## Interaction Standards

- touch target minimum 44px
- common actions available via keyboard shortcuts
- confirmation dialogs only for destructive actions
- instant inline validation for quantity, tax, and payment fields

## Performance Perception Standards

- responses under 200ms feel instant for local actions
- skeleton loaders for report-heavy pages
- optimistic UI where data safety allows
- graceful fallback for printer/scanner disconnected state

## Localization and Accessibility

- English-first with Hindi-ready labels and copy slots
- avoid jargon in cashier-facing UI
- support number pad and local decimal habits
- ensure contrast and readable font sizing on low-cost monitors

## Release Checklist for UI

- usability test with at least 5 real shop scenarios
- accessibility contrast checks complete
- no blocker visual defects on POS and inventory screens
- interaction specs and component docs updated
