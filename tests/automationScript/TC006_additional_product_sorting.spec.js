// spec: testPlan/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('SauceDemo E2E Tests - Additional Scenarios', () => {
  test('should sort products correctly', async ({ page }) => {
    // 1. Login with valid credentials and access product inventory
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Verify product inventory page is displayed with all 6 products
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    await expect(page.locator('.title')).toHaveText('Products');
    
    // Get initial product order (default: Name A to Z)
    const productNames = page.locator('[data-test="inventory-item-name"]');
    await expect(productNames).toHaveCount(6);
    
    // 2. Click the sort dropdown and select 'Name (Z to A)'
    await page.locator('[data-test="product-sort-container"]').selectOption(['Name (Z to A)']);
    
    // Verify products are sorted alphabetically in descending order
    await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue('za');
    const sortedZtoA = await page.locator('[data-test="inventory-item-name"]').allTextContents();
    expect(sortedZtoA).toEqual([
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Onesie',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Bike Light',
      'Sauce Labs Backpack'
    ]);
    
    // 3. Select 'Price (low to high)' from sort dropdown
    await page.locator('[data-test="product-sort-container"]').selectOption(['Price (low to high)']);
    
    // Verify products are sorted by price from lowest to highest
    await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue('lohi');
    const pricesLowToHigh = await page.locator('.inventory_item_price').allTextContents();
    expect(pricesLowToHigh).toEqual(['$7.99', '$9.99', '$15.99', '$15.99', '$29.99', '$49.99']);
    
    const productsLowToHigh = await page.locator('[data-test="inventory-item-name"]').allTextContents();
    expect(productsLowToHigh).toEqual([
      'Sauce Labs Onesie',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Backpack',
      'Sauce Labs Fleece Jacket'
    ]);
    
    // 4. Select 'Price (high to low)' from sort dropdown
    await page.locator('[data-test="product-sort-container"]').selectOption(['Price (high to low)']);
    
    // Verify products are sorted by price from highest to lowest
    await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue('hilo');
    const pricesHighToLow = await page.locator('.inventory_item_price').allTextContents();
    expect(pricesHighToLow).toEqual(['$49.99', '$29.99', '$15.99', '$15.99', '$9.99', '$7.99']);
    
    const productsHighToLow = await page.locator('[data-test="inventory-item-name"]').allTextContents();
    expect(productsHighToLow).toEqual([
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Backpack',
      'Sauce Labs Bolt T-Shirt',
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Bike Light',
      'Sauce Labs Onesie'
    ]);
  });
});