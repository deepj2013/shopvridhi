import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev-access-secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret';
const ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

export function createAccessToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role, email: user.email }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
}

export function createRefreshToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
}

export function verifyAccessToken(token) { return jwt.verify(token, ACCESS_SECRET); }
export function verifyRefreshToken(token) { return jwt.verify(token, REFRESH_SECRET); }
export function hashToken(token) { return crypto.createHash('sha256').update(token).digest('hex'); }
