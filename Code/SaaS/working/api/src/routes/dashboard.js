import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { requirePermission } from '../middleware/rbac.js';
import { InventoryItem } from '../models/InventoryItem.js';
import { Order } from '../models/Order.js';

const router = Router();

router.get('/summary', requireAuth, requirePermission('dashboard.read'), async (_req, res) => {
  const [itemCount, lowStockCount, orderCount] = await Promise.all([
    InventoryItem.countDocuments(),
    InventoryItem.countDocuments({ stock: { $lt: 10 } }),
    Order.countDocuments()
  ]);

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const orderTrend = await Order.aggregate([
    { $match: { createdAt: { $gte: since } } },
    {
      $group: {
        _id: {
          day: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          }
        },
        count: { $sum: 1 },
        revenue: { $sum: '$total' }
      }
    },
    { $sort: { '_id.day': 1 } }
  ]);

  return res.json({
    kpis: { itemCount, lowStockCount, orderCount },
    trends: {
      orderTrend: orderTrend.map((row) => ({ day: row._id.day, count: row.count, revenue: row.revenue }))
    }
  });
});

export default router;
