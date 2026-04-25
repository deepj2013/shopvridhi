# S1-06 Detailed Spec: Offline Sync Status Indicator and Retry Visibility

## Story Meta
- Story ID: `SV-S1-06`
- Primary persona: All shop users
- Business outcome: trust in offline-first operations and transparent sync recovery

## Scope
- top bar sync status badge
- pending/failed queue counters
- retry failed event action
- queue details panel

## UI Components
- sync status badge
- queue summary popover
- failed events list and retry action

## Field-Level Spec
- `sync_state`: enum (`synced`,`pending`,`failed`,`syncing`)
- `pending_count`: integer
- `failed_count`: integer
- `last_sync_at`: timestamp
- `event_id`: retry target id

## Validation Rules
- retry action only for failed events
- concurrent retry protection per event
- idempotency key mandatory on replay

## API Contract Draft
- `GET /api/v1/sync/status`
- `GET /api/v1/sync/events?state=failed|pending`
- `POST /api/v1/sync/events/{id}/retry`

## DB/Schema Impact
- `sync_events` state and retry metadata fields
- retry attempt counter and last_error snapshot
- dead-letter state for repeated permanent failures

## Role/Permission Requirements
- all users can view status
- manager/owner can manual-retry failed events (policy configurable)

## Telemetry Events
- `sync_status_viewed`
- `sync_event_retry_clicked`
- `sync_event_retry_success`
- `sync_event_retry_failed`

## Edge Cases
- repeated failure due to schema mismatch
- user retry flood attempts
- app restart with pending queue

## Acceptance Criteria
- badge reflects real queue state transitions
- failed events are visible with actionable retry
- retries are safe, idempotent, and auditable

## Definition of Done Checklist
- sync state transitions covered by tests
- retry behavior protected against duplicates
- queue visibility understandable to non-technical users
- support runbook includes common sync failure guidance
