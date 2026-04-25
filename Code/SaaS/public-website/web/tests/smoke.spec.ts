import { test, expect } from '@playwright/test';

test('public to auth navigation works', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('ShopVridhi')).toBeVisible();
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'Login to ShopVridhi Console' })).toBeVisible();
});

test('inventory page renders when session exists', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('shopvridhi.session', JSON.stringify({
      accessToken: 'fake-token',
      refreshToken: 'fake-refresh',
      user: { id: '1', name: 'Owner User', email: 'owner@shopvridhi.com', role: 'owner' }
    }));
  });
  await page.goto('/inventory');
  await expect(page.getByRole('heading', { name: 'Inventory' })).toBeVisible();
});

test('orders page renders checkout controls', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('shopvridhi.session', JSON.stringify({
      accessToken: 'fake-token',
      refreshToken: 'fake-refresh',
      user: { id: '1', name: 'Owner User', email: 'owner@shopvridhi.com', role: 'owner' }
    }));
  });
  await page.goto('/orders');
  await expect(page.getByRole('heading', { name: 'E-commerce Orders' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Create Order' })).toBeVisible();
});
