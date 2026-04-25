import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, required: true, enum: ['owner', 'manager', 'cashier', 'staff', 'admin'] },
  active: { type: Boolean, default: true },
  failedLoginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date, default: null },
  resetTokenHash: { type: String, default: '' },
  resetTokenExpiresAt: { type: Date, default: null }
}, { timestamps: true });
export const User = mongoose.model('User', userSchema);
