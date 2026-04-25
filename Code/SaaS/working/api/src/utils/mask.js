const SENSITIVE_KEYS = new Set([
  'password',
  'passwordHash',
  'token',
  'refreshToken',
  'accessToken',
  'resetToken',
  'otp'
]);

export function maskSensitivePayload(value) {
  if (Array.isArray(value)) {
    return value.map(maskSensitivePayload);
  }
  if (value && typeof value === 'object') {
    const result = {};
    for (const [key, val] of Object.entries(value)) {
      if (SENSITIVE_KEYS.has(key)) {
        result[key] = '***';
      } else {
        result[key] = maskSensitivePayload(val);
      }
    }
    return result;
  }
  return value;
}
