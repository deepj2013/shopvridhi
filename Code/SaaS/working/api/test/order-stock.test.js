import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import mongoose from 'mongoose';
import { createApp } from '../src/app.js';
import { connectDatabase } from '../src/config/db.js';
import { seedInitialData } from '../src/seed/seedData.js';

const app = createApp();
let ownerToken = '';

test.before(async () => {
  await connectDatabase();
  await seedInitialData();
  const login = await request(app).post('/api/v1/auth/login').send({ email: 'owner@shopvridhi.com', password: 'pass123' }).expect(200);
  ownerToken = login.body.accessToken;
});

test.after(async () => {
  await mongoose.connection.close();
});

test('order creation deducts stock and cancellation creates refund note', async () => {
  const products = await request(app)
    .get('/api/v1/ecommerce/products')
    .set('Authorization', `Bearer ${ownerToken}`)
    .expect(200);

  const product = products.body.products[0];
  const beforeStock = product.stock;

  const orderResp = await request(app)
    .post('/api/v1/ecommerce/orders')
    .set('Authorization', `Bearer ${ownerToken}`)
    .send({
      customerName: 'Test Customer',
      customerPhone: '9999999999',
      items: [{ productId: product._id, quantity: 1 }]
    })
    .expect(201);

  const orderId = orderResp.body.order._id;
  await request(app)
    .post(`/api/v1/ecommerce/orders/${orderId}/cancel`)
    .set('Authorization', `Bearer ${ownerToken}`)
    .send({ reason: 'qa-check' })
    .expect(200);

  const productsAfter = await request(app)
    .get('/api/v1/ecommerce/products')
    .set('Authorization', `Bearer ${ownerToken}`)
    .expect(200);
  const updated = productsAfter.body.products.find((p) => p._id === product._id);
  assert.equal(updated.stock, beforeStock);
});
