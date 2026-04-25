import mongoose from 'mongoose';

const publicEventSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true, trim: true, maxlength: 80 },
    eventData: { type: Object, default: {} },
    source: { type: String, default: 'web', trim: true, maxlength: 40 }
  },
  { timestamps: true }
);

export const PublicEvent = mongoose.model('PublicEvent', publicEventSchema);
