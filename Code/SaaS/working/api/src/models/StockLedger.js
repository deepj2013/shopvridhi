import mongoose from 'mongoose';

const stockLedgerSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem', required: true, index: true },
  movementType: { type: String, enum: ['inward', 'outward', 'transfer', 'adjustment'], required: true },
  quantity: { type: Number, required: true },
  fromLocation: { type: String, default: '' },
  toLocation: { type: String, default: '' },
  reason: { type: String, default: '' },
  source: { type: String, default: '' },
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const StockLedger = mongoose.model('StockLedger', stockLedgerSchema);
