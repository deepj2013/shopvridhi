const buckets = new Map();

export function loginRateLimit(options = {}) {
  const windowMs = options.windowMs || 60_000;
  const maxAttempts = options.maxAttempts || 10;

  return (req, res, next) => {
    const key = `${req.ip || 'unknown'}:login`;
    const now = Date.now();
    const existing = buckets.get(key);

    if (!existing || now > existing.expiresAt) {
      buckets.set(key, { count: 1, expiresAt: now + windowMs });
      return next();
    }

    existing.count += 1;
    if (existing.count > maxAttempts) {
      return res.status(429).json({
        message: 'Too many login attempts. Please wait and try again.'
      });
    }

    return next();
  };
}
