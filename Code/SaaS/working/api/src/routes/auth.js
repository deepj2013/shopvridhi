import { Router } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { User } from '../models/User.js';
import { RefreshToken } from '../models/RefreshToken.js';
import { createAccessToken, createRefreshToken, hashToken, verifyRefreshToken } from '../utils/tokens.js';
import { requireAuth } from '../middleware/auth.js';
import { loginRateLimit } from '../middleware/rateLimit.js';

const router = Router();
const LOGIN_LOCK_MAX_ATTEMPTS = 5;
const LOGIN_LOCK_WINDOW_MS = 15 * 60 * 1000;
const RESET_TOKEN_TTL_MS = 30 * 60 * 1000;

function getDeviceContext(req) {
  return {
    deviceId: String(req.headers['x-device-id'] || ''),
    userAgent: String(req.headers['user-agent'] || ''),
    ipAddress: String(req.ip || req.socket?.remoteAddress || '')
  };
}

router.post('/login', loginRateLimit(), async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, active: true });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  if (user.lockUntil && user.lockUntil > new Date()) {
    return res.status(423).json({ message: 'Account temporarily locked due to failed login attempts' });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
    if (user.failedLoginAttempts >= LOGIN_LOCK_MAX_ATTEMPTS) {
      user.lockUntil = new Date(Date.now() + LOGIN_LOCK_WINDOW_MS);
    }
    await user.save();
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  const device = getDeviceContext(req);

  user.failedLoginAttempts = 0;
  user.lockUntil = null;
  await user.save();

  await RefreshToken.create({
    userId: user._id,
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    ...device
  });

  return res.json({
    accessToken,
    refreshToken,
    user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role }
  });
});

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: 'refreshToken is required' });

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const existing = await RefreshToken.findOne({
      userId: decoded.sub,
      tokenHash: hashToken(refreshToken),
      revoked: false
    });

    if (!existing || existing.expiresAt < new Date()) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const user = await User.findById(decoded.sub);
    if (!user || !user.active) return res.status(401).json({ message: 'Invalid user' });

    const newAccessToken = createAccessToken(user);
    const newRefreshToken = createRefreshToken(user);
    const device = getDeviceContext(req);

    existing.revoked = true;
    await existing.save();

    await RefreshToken.create({
      userId: user._id,
      tokenHash: hashToken(newRefreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      ...device
    });

    return res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (_error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
});

router.post('/logout', requireAuth, async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) {
    await RefreshToken.updateMany(
      { userId: req.user.id, tokenHash: hashToken(refreshToken), revoked: false },
      { $set: { revoked: true } }
    );
  }
  return res.json({ success: true });
});

router.post('/request-password-reset', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'email is required' });

  const user = await User.findOne({ email, active: true });
  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    user.resetTokenHash = hashToken(token);
    user.resetTokenExpiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS);
    await user.save();

    // In production this token should be sent via secure email/SMS provider.
    return res.json({ success: true, resetToken: token });
  }

  // Do not reveal whether email exists to avoid user enumeration.
  return res.json({ success: true });
});

router.post('/reset-password', async (req, res) => {
  const { email, resetToken, newPassword } = req.body;
  if (!email || !resetToken || !newPassword) {
    return res.status(400).json({ message: 'email, resetToken and newPassword are required' });
  }

  const user = await User.findOne({ email, active: true });
  if (!user) return res.status(400).json({ message: 'Invalid reset request' });

  const tokenMatches = user.resetTokenHash === hashToken(resetToken);
  const tokenValid = user.resetTokenExpiresAt && user.resetTokenExpiresAt > new Date();

  if (!tokenMatches || !tokenValid) {
    return res.status(400).json({ message: 'Invalid or expired reset token' });
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.resetTokenHash = '';
  user.resetTokenExpiresAt = null;
  user.failedLoginAttempts = 0;
  user.lockUntil = null;
  await user.save();

  return res.json({ success: true });
});

export default router;
