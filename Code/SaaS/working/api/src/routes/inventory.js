import { Router } from 'express';
import { InventoryItem } from '../models/InventoryItem.js';
import { AuditLog } from '../models/AuditLog.js';
import { StockLedger } from '../models/StockLedger.js';
import { StockAuditSession } from '../models/StockAuditSession.js';
import { requireAuth } from '../middleware/auth.js';
import { requirePermission } from '../middleware/rbac.js';

const router = Router();
router.use(requireAuth);

router.get('/items', requirePermission('inventory.read'), async (_req, res) => {
  const {
    page = '1',
    limit = '20',
    search = '',
    category,
    location,
    online,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = _req.query;

  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(100, Math.max(1, Number(limit) || 20));
  const skip = (pageNum - 1) * limitNum;

  const query = { archived: { $ne: true } };
  if (category) query.category = String(category);
  if (location) query.location = String(location);
  if (online !== undefined) query.online = online === 'true';
  if (search) {
    const safe = String(search).trim();
    query.$or = [
      { name: { $regex: safe, $options: 'i' } },
      { sku: { $regex: safe, $options: 'i' } },
      { barcode: { $regex: safe, $options: 'i' } }
    ];
  }

  const sort = { [String(sortBy)]: String(sortOrder) === 'asc' ? 1 : -1 };
  const [items, total] = await Promise.all([
    InventoryItem.find(query).sort(sort).skip(skip).limit(limitNum).lean(),
    InventoryItem.countDocuments(query)
  ]);

  res.json({
    items,
    pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) }
  });
});

router.post('/items', requirePermission('inventory.write'), async (req, res) => {
  const { name, sku, barcode, category, price, stock, location, online } = req.body;
  if (!name || !sku || !category) {
    return res.status(400).json({ message: 'name, sku and category are required' });
  }

  const item = await InventoryItem.create({
    name, sku, barcode: barcode || '', category,
    price: Number(price || 0), stock: Number(stock || 0),
    location: location || '', online: Boolean(online)
  });

  await AuditLog.create({
    actorId: req.user.id,
    action: 'inventory.item.create',
    entityType: 'InventoryItem',
    entityId: item._id.toString(),
    payload: { name: item.name, sku: item.sku }
  });

  return res.status(201).json({ item });
});

router.patch('/items/:id', requirePermission('inventory.update'), async (req, res) => {
  const updates = {};
  const allowed = ['name', 'barcode', 'category', 'price', 'stock', 'location', 'online'];

  for (const key of allowed) {
    if (key in req.body) updates[key] = req.body[key];
  }

  if ('price' in updates && Number(updates.price) < 0) {
    return res.status(400).json({ message: 'price must be >= 0' });
  }
  if ('stock' in updates && Number(updates.stock) < 0) {
    return res.status(400).json({ message: 'stock must be >= 0' });
  }

  const item = await InventoryItem.findOneAndUpdate(
    { _id: req.params.id, archived: { $ne: true } },
    { $set: updates },
    { new: true }
  );

  if (!item) return res.status(404).json({ message: 'Item not found' });

  await AuditLog.create({
    actorId: req.user.id,
    action: 'inventory.item.update',
    entityType: 'InventoryItem',
    entityId: item._id.toString(),
    payload: updates
  });

  return res.json({ item });
});

router.delete('/items/:id', requirePermission('inventory.archive'), async (req, res) => {
  const item = await InventoryItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });

  item.archived = true;
  await item.save();

  await AuditLog.create({
    actorId: req.user.id,
    action: 'inventory.item.archive',
    entityType: 'InventoryItem',
    entityId: item._id.toString(),
    payload: { archived: true }
  });

  return res.json({ success: true });
});

router.get('/low-stock', requirePermission('inventory.read'), async (req, res) => {
  const threshold = Math.max(1, Number(req.query.threshold || 10));
  const items = await InventoryItem.find({
    archived: { $ne: true },
    stock: { $lt: threshold }
  }).lean();

  return res.json({ items, threshold });
});

router.post('/movements', requirePermission('inventory.movement.create'), async (req, res) => {
  const { itemId, movementType, quantity, fromLocation = '', toLocation = '', reason = '' } = req.body;
  const qty = Number(quantity);

  if (!itemId || !movementType || !qty || qty <= 0) {
    return res.status(400).json({ message: 'itemId, movementType and positive quantity are required' });
  }

  if (movementType === 'transfer' && (!fromLocation || !toLocation || fromLocation === toLocation)) {
    return res.status(400).json({ message: 'transfer requires different fromLocation and toLocation' });
  }

  const item = await InventoryItem.findOne({ _id: itemId, archived: { $ne: true } });
  if (!item) return res.status(404).json({ message: 'Item not found' });

  if (movementType === 'outward' || movementType === 'transfer') {
    if (item.stock < qty) return res.status(400).json({ message: 'Insufficient stock' });
    item.stock -= qty;
  } else {
    item.stock += qty;
  }
  await item.save();

  const ledger = await StockLedger.create({
    itemId: item._id,
    movementType,
    quantity: qty,
    fromLocation,
    toLocation,
    reason,
    source: 'manual',
    actorId: req.user.id
  });

  await AuditLog.create({
    actorId: req.user.id,
    action: 'inventory.movement.create',
    entityType: 'StockLedger',
    entityId: ledger._id.toString(),
    payload: { itemId, movementType, quantity: qty, fromLocation, toLocation }
  });

  return res.status(201).json({ ledger, item });
});

router.post('/audits/start', requirePermission('inventory.audit.create'), async (req, res) => {
  const audit = await StockAuditSession.create({
    startedBy: req.user.id,
    status: 'started'
  });
  return res.status(201).json({ audit });
});

router.post('/audits/:id/counts', requirePermission('inventory.audit.create'), async (req, res) => {
  const { counts } = req.body;
  if (!Array.isArray(counts) || counts.length === 0) {
    return res.status(400).json({ message: 'counts is required' });
  }

  const audit = await StockAuditSession.findById(req.params.id);
  if (!audit || audit.status !== 'started') {
    return res.status(404).json({ message: 'Started audit session not found' });
  }

  const lines = [];
  for (const row of counts) {
    const item = await InventoryItem.findById(row.itemId);
    if (!item) continue;
    const physicalQty = Number(row.physicalQty || 0);
    lines.push({
      itemId: item._id,
      sku: item.sku,
      location: row.location || item.location || '',
      systemQty: item.stock,
      physicalQty,
      varianceQty: physicalQty - item.stock
    });
  }

  audit.lines = lines;
  await audit.save();

  return res.json({ audit });
});

router.post('/audits/:id/close', requirePermission('inventory.audit.close'), async (req, res) => {
  const { postVariance = true } = req.body;
  const audit = await StockAuditSession.findById(req.params.id);
  if (!audit || audit.status !== 'started') {
    return res.status(404).json({ message: 'Started audit session not found' });
  }

  if (postVariance) {
    for (const line of audit.lines) {
      if (line.varianceQty === 0) continue;
      const item = await InventoryItem.findById(line.itemId);
      if (!item) continue;

      item.stock = line.physicalQty;
      await item.save();

      await StockLedger.create({
        itemId: item._id,
        movementType: 'adjustment',
        quantity: Math.abs(line.varianceQty),
        fromLocation: line.location,
        toLocation: line.location,
        reason: 'stock-audit-variance',
        source: `audit:${audit._id}`,
        actorId: req.user.id
      });
    }
  }

  audit.status = 'closed';
  audit.closedBy = req.user.id;
  audit.postedVariance = Boolean(postVariance);
  await audit.save();

  await AuditLog.create({
    actorId: req.user.id,
    action: 'inventory.audit.close',
    entityType: 'StockAuditSession',
    entityId: audit._id.toString(),
    payload: { postedVariance: audit.postedVariance, lineCount: audit.lines.length }
  });

  return res.json({ audit });
});

router.get('/reconciliation-report', requirePermission('inventory.read'), async (req, res) => {
  const { auditSessionId } = req.query;
  if (!auditSessionId) return res.status(400).json({ message: 'auditSessionId is required' });

  const audit = await StockAuditSession.findById(auditSessionId).lean();
  if (!audit) return res.status(404).json({ message: 'Audit session not found' });

  const summary = {
    totalLines: audit.lines.length,
    varianceLines: audit.lines.filter((line) => line.varianceQty !== 0).length,
    postedVariance: audit.postedVariance
  };

  return res.json({ audit, summary });
});

export default router;
