import mongoose from 'mongoose';
const planSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  monthlyPrice: { type: Number, required: true, min: 0 },
  features: { type: [String], default: [] }
}, { timestamps: true });
export const Plan = mongoose.model('Plan', planSchema);
