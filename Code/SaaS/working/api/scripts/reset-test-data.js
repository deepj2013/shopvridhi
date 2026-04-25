import mongoose from 'mongoose';
import { connectDatabase } from '../src/config/db.js';
import { User } from '../src/models/User.js';
import { InventoryItem } from '../src/models/InventoryItem.js';
import { Order } from '../src/models/Order.js';
import { Tenant } from '../src/models/Tenant.js';
import { Plan } from '../src/models/Plan.js';
import { AuditLog } from '../src/models/AuditLog.js';
import { StockLedger } from '../src/models/StockLedger.js';
import { StockAuditSession } from '../src/models/StockAuditSession.js';
import { RefundNote } from '../src/models/RefundNote.js';
import { RefreshToken } from '../src/models/RefreshToken.js';
import { Lead } from '../src/models/Lead.js';
import { PublicEvent } from '../src/models/PublicEvent.js';

async function resetTestData() {
  await connectDatabase();
  await Promise.all([
    User.deleteMany({}),
    InventoryItem.deleteMany({}),
    Order.deleteMany({}),
    Tenant.deleteMany({}),
    Plan.deleteMany({}),
    AuditLog.deleteMany({}),
    StockLedger.deleteMany({}),
    StockAuditSession.deleteMany({}),
    RefundNote.deleteMany({}),
    RefreshToken.deleteMany({}),
    Lead.deleteMany({}),
    PublicEvent.deleteMany({})
  ]);
}

resetTestData()
  .then(async () => {
    await mongoose.connection.close();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error(error);
    await mongoose.connection.close();
    process.exit(1);
  });
