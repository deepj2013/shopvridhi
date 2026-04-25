import mongoose from 'mongoose';
const auditLogSchema = new mongoose.Schema({
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true, index: true },
  entityType: { type: String, required: true },
  entityId: { type: String, required: true },
  payload: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });

function blockMutation(next) {
  next(new Error('Audit logs are immutable and cannot be modified'));
}

auditLogSchema.pre('updateOne', blockMutation);
auditLogSchema.pre('updateMany', blockMutation);
auditLogSchema.pre('findOneAndUpdate', blockMutation);
auditLogSchema.pre('deleteOne', blockMutation);
auditLogSchema.pre('deleteMany', blockMutation);
auditLogSchema.pre('findOneAndDelete', blockMutation);

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
