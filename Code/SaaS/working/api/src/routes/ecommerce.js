import { Router } from 'express';
import { InventoryItem } from '../models/InventoryItem.js';
import { Order } from '../models/Order.js';
import { AuditLog } from '../models/AuditLog.js';
import { RefundNote } from '../models/RefundNote.js';
import { requireAuth } from '../middleware/auth.js';
import { requirePermission } from '../middleware/rbac.js';

const router = Router();
router.use(requireAuth);

router.get('/products', requirePermission('ecommerce.read'), async (_req, res) => {
  const products = await InventoryItem.find({ online: true, stock: { $gt: 0 } }).lean();
  res.json({ products });
});

router.get('/orders', requirePermission('ecommerce.read'), async (req, res) => {
  const { status, page = '1', limit = '20', sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(100, Math.max(1, Number(limit) || 20));
  const skip = (pageNum - 1) * limitNum;
  const query = status ? { status: String(status) } : {};
  const sort = { [String(sortBy)]: String(sortOrder) === 'asc' ? 1 : -1 };

  const [orders, total] = await Promise.all([
    Order.find(query).sort(sort).skip(skip).limit(limitNum).lean(),
    Order.countDocuments(query)
  ]);

  return res.json({
    orders,
    pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) }
  });
});

router.post('/orders', requirePermission('ecommerce.order.create'), async (req, res) => {
  const { customerName, customerPhone, items } = req.body;
  if (!customerName || !customerPhone || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'customerName, customerPhone and items are required' });
  }

  try {
    const normalizedItems = [];
    let total = 0;

    for (const rawItem of items) {
      const product = await InventoryItem.findById(rawItem.productId);
      const quantity = Number(rawItem.quantity || 1);
      if (!product) throw new Error('Product not found');
      if (quantity <= 0) throw new Error('Invalid quantity');
      if (product.stock < quantity) throw new Error(`Insufficient stock for ${product.name}`);

      product.stock -= quantity;
      await product.save();

      const lineTotal = quantity * product.price;
      total += lineTotal;
      normalizedItems.push({ productId: product._id, name: product.name, quantity, unitPrice: product.price, lineTotal });
    }

    const order = await Order.create({
      customerName, customerPhone, items: normalizedItems, total, createdBy: req.user.id
    });

    await AuditLog.create({
      actorId: req.user.id,
      action: 'ecommerce.order.create',
      entityType: 'Order',
      entityId: order._id.toString(),
      payload: { customerName, itemCount: normalizedItems.length, total }
    });

    return res.status(201).json({ order });
  } catch (error) {
    return res.status(400).json({ message: error.message || 'Order creation failed' });
  }
});

router.patch('/orders/:id/status', requirePermission('ecommerce.order.update'), async (req, res) => {
  const { status } = req.body;
  const allowed = new Set(['pending', 'accepted', 'completed', 'cancelled']);
  if (!allowed.has(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.status = status;
  await order.save();

  await AuditLog.create({
    actorId: req.user.id,
    action: 'ecommerce.order.status.update',
    entityType: 'Order',
    entityId: order._id.toString(),
    payload: { status }
  });

  return res.json({ order });
});

router.post('/orders/:id/cancel', requirePermission('ecommerce.order.cancel'), async (req, res) => {
  const { reason = 'cancelled-by-user', refundAmount } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (order.status === 'completed') return res.status(400).json({ message: 'Completed order cannot be cancelled' });
  if (order.status === 'cancelled') return res.status(400).json({ message: 'Order already cancelled' });

  try {
    for (const line of order.items) {
      const item = await InventoryItem.findById(line.productId);
      if (!item) continue;
      item.stock += line.quantity;
      await item.save();
    }

    order.status = 'cancelled';
    await order.save();

    const refund = await RefundNote.create({
      orderId: order._id,
      amount: Number(refundAmount ?? order.total),
      reason,
      createdBy: req.user.id
    });

    await AuditLog.create({
      actorId: req.user.id,
      action: 'ecommerce.order.cancel',
      entityType: 'Order',
      entityId: order._id.toString(),
      payload: { reason, refundAmount: Number(refundAmount ?? order.total), refundId: refund._id.toString() }
    });

    return res.json({ order, refundNote: refund });
  } catch (error) {
    return res.status(400).json({ message: error.message || 'Cancellation failed' });
  }
});

export default router;
