import test from 'node:test';
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

test('inventory create enforces required fields', async () => {
  await request(app)
    .post('/api/v1/inventory/items')
    .set('Authorization', `Bearer ${ownerToken}`)
    .send({ name: '', sku: '', category: '' })
    .expect(400);
});
