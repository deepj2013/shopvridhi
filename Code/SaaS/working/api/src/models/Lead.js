import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    shopType: { type: String, required: true, trim: true, maxlength: 120 },
    sourcePage: { type: String, default: 'unknown', trim: true, maxlength: 60 }
  },
  { timestamps: true }
);

export const Lead = mongoose.model('Lead', leadSchema);
