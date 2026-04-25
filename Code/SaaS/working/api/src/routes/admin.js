import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { requirePermission } from '../middleware/rbac.js';
import { Tenant } from '../models/Tenant.js';
import { User } from '../models/User.js';
import { Plan } from '../models/Plan.js';
import { AuditLog } from '../models/AuditLog.js';
import { maskSensitivePayload } from '../utils/mask.js';

const router = Router();
router.use(requireAuth);
router.use(requirePermission('admin.read'));

function requireReason(reason) {
  return typeof reason === 'string' && reason.trim().length >= 5;
}

router.get('/tenants', async (_req, res) => {
  const tenants = await Tenant.find().lean();
  res.json({ tenants });
});

router.post('/tenants', requirePermission('admin.write'), async (req, res) => {
  const { name, planCode } = req.body;
  if (!name) return res.status(400).json({ message: 'name is required' });

  const tenant = await Tenant.create({ name, planCode: planCode || 'starter' });
  await AuditLog.create({
    actorId: req.user.id,
    action: 'admin.tenant.create',
    entityType: 'Tenant',
    entityId: tenant._id.toString(),
    payload: { name: tenant.name, planCode: tenant.planCode }
  });
  return res.status(201).json({ tenant });
});

router.patch('/tenants/:id/plan', requirePermission('admin.write'), async (req, res) => {
  const { planCode, reason } = req.body;
  const tenant = await Tenant.findById(req.params.id);
  if (!tenant) return res.status(404).json({ message: 'Tenant not found' });
  if (!planCode) return res.status(400).json({ message: 'planCode is required' });
  if (!requireReason(reason)) return res.status(400).json({ message: 'reason is required (min 5 chars)' });

  tenant.planCode = planCode;
  await tenant.save();

  await AuditLog.create({
    actorId: req.user.id,
    action: 'admin.tenant.plan.update',
    entityType: 'Tenant',
    entityId: tenant._id.toString(),
    payload: { planCode, reason }
  });

  return res.json({ tenant });
});

router.patch('/tenants/:id/plan-override', requirePermission('admin.write'), async (req, res) => {
  const { planCode, reason } = req.body;
  const tenant = await Tenant.findById(req.params.id);
  if (!tenant) return res.status(404).json({ message: 'Tenant not found' });
  if (!planCode) return res.status(400).json({ message: 'planCode is required' });
  if (!requireReason(reason)) return res.status(400).json({ message: 'reason is required (min 5 chars)' });

  tenant.planCode = planCode;
  await tenant.save();

  await AuditLog.create({
    actorId: req.user.id,
    action: 'admin.tenant.plan.override',
    entityType: 'Tenant',
    entityId: tenant._id.toString(),
    payload: { planCode, reason }
  });

  return res.json({ tenant });
});

router.patch('/tenants/:id/suspend', requirePermission('tenant.suspend'), async (req, res) => {
  const { reason } = req.body;
  if (!requireReason(reason)) return res.status(400).json({ message: 'reason is required (min 5 chars)' });

  const tenant = await Tenant.findById(req.params.id);
  if (!tenant) return res.status(404).json({ message: 'Tenant not found' });
  if (tenant.status === 'suspended') return res.status(400).json({ message: 'Tenant already suspended' });

  tenant.status = 'suspended';
  await tenant.save();

  await AuditLog.create({
    actorId: req.user.id,
    action: 'admin.tenant.suspend',
    entityType: 'Tenant',
    entityId: tenant._id.toString(),
    payload: { reason }
  });

  return res.json({ tenant });
});

router.patch('/tenants/:id/reactivate', requirePermission('tenant.reactivate'), async (req, res) => {
  const { reason } = req.body;
  if (!requireReason(reason)) return res.status(400).json({ message: 'reason is required (min 5 chars)' });

  const tenant = await Tenant.findById(req.params.id);
  if (!tenant) return res.status(404).json({ message: 'Tenant not found' });
  if (tenant.status === 'active') return res.status(400).json({ message: 'Tenant already active' });

  tenant.status = 'active';
  await tenant.save();

  await AuditLog.create({
    actorId: req.user.id,
    action: 'admin.tenant.reactivate',
    entityType: 'Tenant',
    entityId: tenant._id.toString(),
    payload: { reason }
  });

  return res.json({ tenant });
});

router.get('/users', async (_req, res) => {
  const users = await User.find().select('name email role active createdAt').lean();
  res.json({ users });
});

router.patch('/users/:id/role', requirePermission('user.role.update'), async (req, res) => {
  const { role, reason } = req.body;
  const allowedRoles = new Set(['owner', 'manager', 'cashier', 'staff', 'admin']);
  if (!allowedRoles.has(role)) return res.status(400).json({ message: 'Invalid role' });
  if (!requireReason(reason)) return res.status(400).json({ message: 'reason is required (min 5 chars)' });

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.role = role;
  await user.save();

  await AuditLog.create({
    actorId: req.user.id,
    action: 'admin.user.role.update',
    entityType: 'User',
    entityId: user._id.toString(),
    payload: { role, reason }
  });

  return res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, active: user.active } });
});

router.patch('/users/:id/status', requirePermission('user.status.update'), async (req, res) => {
  const { active, reason } = req.body;
  if (typeof active !== 'boolean') return res.status(400).json({ message: 'active boolean is required' });
  if (!requireReason(reason)) return res.status(400).json({ message: 'reason is required (min 5 chars)' });

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.active = active;
  await user.save();

  await AuditLog.create({
    actorId: req.user.id,
    action: 'admin.user.status.update',
    entityType: 'User',
    entityId: user._id.toString(),
    payload: { active, reason }
  });

  return res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, active: user.active } });
});

router.get('/plans', async (_req, res) => {
  const plans = await Plan.find().lean();
  res.json({ plans });
});

router.get('/audit-logs', requirePermission('admin.read'), async (req, res) => {
  const {
    action,
    entityType,
    actorId,
    page = '1',
    limit = '25'
  } = req.query;

  const query = {};
  if (action) query.action = String(action);
  if (entityType) query.entityType = String(entityType);
  if (actorId) query.actorId = String(actorId);

  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(100, Math.max(1, Number(limit) || 25));
  const skip = (pageNum - 1) * limitNum;

  const [logs, total] = await Promise.all([
    AuditLog.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
    AuditLog.countDocuments(query)
  ]);

  const maskedLogs = logs.map((log) => ({
    ...log,
    payload: maskSensitivePayload(log.payload || {})
  }));

  return res.json({
    logs: maskedLogs,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum)
    }
  });
});

export default router;
