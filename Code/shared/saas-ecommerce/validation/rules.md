# Shared Validation Rules

- required string fields must be trimmed and non-empty
- numeric quantities/prices must be >= 0
- id references must be valid object ids in API layer
- write actions require role permission checks
- financial and stock updates must create audit events
