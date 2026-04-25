import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { InventoryItem } from '../models/InventoryItem.js';
import { Plan } from '../models/Plan.js';
import { Tenant } from '../models/Tenant.js';

export async function seedInitialData() {
  const existingUsers = await User.countDocuments();
  if (existingUsers > 0) return;

  const passHash = await bcrypt.hash('pass123', 10);
  await User.insertMany([
    { name: 'Owner User', email: 'owner@shopvridhi.com', passwordHash: passHash, role: 'owner' },
    { name: 'Manager User', email: 'manager@shopvridhi.com', passwordHash: passHash, role: 'manager' },
    { name: 'Cashier User', email: 'cashier@shopvridhi.com', passwordHash: passHash, role: 'cashier' },
    { name: 'Staff User', email: 'staff@shopvridhi.com', passwordHash: passHash, role: 'staff' },
    { name: 'Admin User', email: 'admin@shopvridhi.com', passwordHash: passHash, role: 'admin' }
  ]);

  await InventoryItem.insertMany([
    { name: 'Aashirvaad Atta 5kg', sku: 'KIR-001', barcode: '8901030865432', category: 'Kirana', price: 265, stock: 48, location: 'R1-S1-B2', online: true },
    { name: 'Surf Excel 1kg', sku: 'KIR-002', barcode: '8901030401012', category: 'Kirana', price: 118, stock: 32, location: 'R1-S2-B1', online: true },
    { name: 'LED Bulb 12W', sku: 'ELC-101', barcode: '8901122009030', category: 'Electrical', price: 149, stock: 20, location: 'R2-S1-B3', online: false }
  ]);

  await Plan.insertMany([
    { code: 'starter', name: 'Starter', monthlyPrice: 799, features: ['billing', 'inventory'] },
    { code: 'growth', name: 'Growth', monthlyPrice: 1499, features: ['billing', 'inventory', 'crm', 'ecommerce'] },
    { code: 'premium', name: 'Premium', monthlyPrice: 2499, features: ['all'] }
  ]);

  await Tenant.create({ name: 'Demo Tenant', status: 'active', planCode: 'growth' });
}
