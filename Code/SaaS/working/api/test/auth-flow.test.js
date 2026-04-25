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

test('login refresh logout flow works', async () => {
  const login = await request(app).post('/api/v1/auth/login').send({
    email: 'owner@shopvridhi.com',
    password: 'pass123'
  }).expect(200);

  assert.ok(login.body.accessToken);
  assert.ok(login.body.refreshToken);

  const refreshed = await request(app).post('/api/v1/auth/refresh').send({
    refreshToken: login.body.refreshToken
  }).expect(200);

  assert.ok(refreshed.body.accessToken);

  await request(app)
    .post('/api/v1/auth/logout')
    .set('Authorization', `Bearer ${refreshed.body.accessToken}`)
    .send({ refreshToken: refreshed.body.refreshToken })
    .expect(200);
});
