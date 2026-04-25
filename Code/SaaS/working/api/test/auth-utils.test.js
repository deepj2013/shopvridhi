import test from 'node:test';
import assert from 'node:assert/strict';
import { createAccessToken, createRefreshToken, hashToken } from '../src/utils/tokens.js';

test('token utilities create and hash tokens', () => {
  const user = { _id: '507f1f77bcf86cd799439011', role: 'owner', email: 'owner@shopvridhi.com' };
  const access = createAccessToken(user);
  const refresh = createRefreshToken(user);
  const hash = hashToken(refresh);

  assert.equal(typeof access, 'string');
  assert.equal(typeof refresh, 'string');
  assert.equal(hash.length, 64);
});
