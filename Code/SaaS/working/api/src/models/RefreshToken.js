import mongoose from 'mongoose';
const refreshTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  tokenHash: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: true },
  revoked: { type: Boolean, default: false },
  deviceId: { type: String, default: '' },
  userAgent: { type: String, default: '' },
  ipAddress: { type: String, default: '' }
}, { timestamps: true });
export const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
