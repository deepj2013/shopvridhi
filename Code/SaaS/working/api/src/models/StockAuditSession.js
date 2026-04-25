import mongoose from 'mongoose';

const stockAuditLineSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem', required: true },
  sku: { type: String, required: true },
  location: { type: String, default: '' },
  systemQty: { type: Number, required: true },
  physicalQty: { type: Number, required: true },
  varianceQty: { type: Number, required: true }
}, { _id: false });

const stockAuditSessionSchema = new mongoose.Schema({
  status: { type: String, enum: ['started', 'closed'], default: 'started' },
  startedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  closedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lines: { type: [stockAuditLineSchema], default: [] },
  postedVariance: { type: Boolean, default: false }
}, { timestamps: true });

export const StockAuditSession = mongoose.model('StockAuditSession', stockAuditSessionSchema);
