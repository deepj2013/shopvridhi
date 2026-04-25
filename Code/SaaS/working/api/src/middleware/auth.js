import { verifyAccessToken } from '../utils/tokens.js';
import { User } from '../models/User.js';

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const [, token] = authHeader.split(' ');
    if (!token) return res.status(401).json({ message: 'Missing access token' });

    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.sub).lean();
    if (!user || !user.active) return res.status(401).json({ message: 'Invalid user session' });

    req.user = { id: user._id.toString(), role: user.role, email: user.email, name: user.name };
    return next();
  } catch (_error) {
    return res.status(401).json({ message: 'Invalid or expired access token' });
  }
}
