import crypto from 'crypto';

export function attachRequestId(req, res, next) {
  const incoming = req.headers['x-request-id'];
  const requestId = typeof incoming === 'string' && incoming ? incoming : crypto.randomUUID();
  req.requestId = requestId;
  res.setHeader('x-request-id', requestId);
  next();
}

export function errorEnvelopeHandler(error, req, res, _next) {
  const status = error.statusCode || 500;
  const message = error.message || 'Internal server error';

  res.status(status).json({
    success: false,
    error: {
      code: status >= 500 ? 'INTERNAL_ERROR' : 'REQUEST_ERROR',
      message,
      details: [],
      retryable: status >= 500
    },
    meta: {
      requestId: req.requestId || ''
    }
  });
}
