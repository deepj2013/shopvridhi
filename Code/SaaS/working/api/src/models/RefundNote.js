import mongoose from 'mongoose';

const refundNoteSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
  amount: { type: Number, required: true, min: 0 },
  reason: { type: String, default: '' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const RefundNote = mongoose.model('RefundNote', refundNoteSchema);
