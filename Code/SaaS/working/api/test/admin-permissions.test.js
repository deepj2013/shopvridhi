import test from 'node:test';
import request from 'supertest';
import mongoose from 'mongoose';
import { createApp } from '../src/app.js';
import { connectDatabase } from '../src/config/db.js';
import { seedInitialData } from '../src/seed/seedData.js';

const app = createApp();
let managerToken = '';

test.before(async () => {
  await connectDatabase();
  await seedInitialData();
  const login = await request(app).post('/api/v1/auth/login').send({ email: 'manager@shopvridhi.com', password: 'pass123' }).expect(200);
  managerToken = login.body.accessToken;
});

test.after(async () => {
  await mongoose.connection.close();
});

test('manager cannot access admin endpoints', async () => {
  await request(app)
    .get('/api/v1/admin/tenants')
    .set('Authorization', `Bearer ${managerToken}`)
    .expect(403);
});
