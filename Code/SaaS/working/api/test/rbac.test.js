import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import mongoose from 'mongoose';
import { createApp } from '../src/app.js';
import { connectDatabase } from '../src/config/db.js';
import { seedInitialData } from '../src/seed/seedData.js';

const app = createApp();

test.before(async () => {
  await connectDatabase();
  await seedInitialData();
});

test.after(async () => {
  await mongoose.connection.close();
});

test('staff user cannot create inventory item', async () => {
  const login = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'staff@shopvridhi.com', password: 'pass123' })
    .expect(200);

  const token = login.body.accessToken;
  assert.ok(token);

  const create = await request(app)
    .post('/api/v1/inventory/items')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Denied Item',
      sku: 'DENY-001',
      category: 'Test',
      price: 10,
      stock: 1
    })
    .expect(403);

  assert.match(create.body.message, /Forbidden/);
});
