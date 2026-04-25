import { AuditLog } from '../models/AuditLog.js';

const permissions = {
  owner: new Set([
    'dashboard.read',
    'inventory.read', 'inventory.write', 'inventory.update', 'inventory.archive',
    'inventory.movement.create', 'inventory.audit.create', 'inventory.audit.close',
    'ecommerce.read', 'ecommerce.order.create', 'ecommerce.order.update', 'ecommerce.order.cancel',
    'admin.read'
  ]),
  manager: new Set([
    'dashboard.read',
    'inventory.read', 'inventory.write', 'inventory.update',
    'inventory.movement.create', 'inventory.audit.create', 'inventory.audit.close',
    'ecommerce.read', 'ecommerce.order.create', 'ecommerce.order.update'
  ]),
  cashier: new Set([
    'dashboard.read',
    'inventory.read',
    'ecommerce.read', 'ecommerce.order.create'
  ]),
  staff: new Set([
    'dashboard.read',
    'inventory.read'
  ]),
  admin: new Set([
    'dashboard.read',
    'admin.read', 'admin.write',
    'tenant.suspend', 'tenant.reactivate',
    'user.role.update', 'user.status.update'
  ])
};

export function requirePermission(permission) {
  return async (req, res, next) => {
    const role = req.user?.role;
    const allowed = permissions[role] && permissions[role].has(permission);

    if (!allowed) {
      await AuditLog.create({
        actorId: req.user?.id,
        action: 'security.permission.denied',
        entityType: 'Permission',
        entityId: permission,
        payload: {
          role,
          requiredPermission: permission,
          path: req.originalUrl,
          method: req.method
        }
      });

      return res.status(403).json({ message: `Forbidden: missing permission ${permission}` });
    }

    return next();
  };
}
