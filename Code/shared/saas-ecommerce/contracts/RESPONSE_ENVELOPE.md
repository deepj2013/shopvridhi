# Unified API Response Envelope

## Success
{
  "success": true,
  "data": {},
  "meta": {}
}

## Error
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": [],
    "retryable": false
  }
}
