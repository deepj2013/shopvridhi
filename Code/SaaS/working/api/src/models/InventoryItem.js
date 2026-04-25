import mongoose from 'mongoose';
const inventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true, index: true },
  barcode: { type: String, default: '', index: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  location: { type: String, default: '' },
  online: { type: Boolean, default: false },
  archived: { type: Boolean, default: false, index: true }
}, { timestamps: true });
export const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);
