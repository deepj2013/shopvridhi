import mongoose from 'mongoose';
const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['active', 'suspended'], default: 'active' },
  planCode: { type: String, default: 'starter' }
}, { timestamps: true });
export const Tenant = mongoose.model('Tenant', tenantSchema);
