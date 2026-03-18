// spec: testPlan/test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('SauceDemo E2E Tests - Additional Scenarios', () => {
  test('should complete purchase with multiple products', async ({ page }) => {
    // 1. Login and navigate to product inventory page
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify product inventory page is displayed
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('.title')).toContainText('Products');

    // 2. Add multiple products to cart: Sauce Labs Backpack and Sauce Labs Bike Light
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Verify cart badge shows '2' items
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('2');

    // Verify both products have 'Remove' buttons
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();

    // 3. Navigate to cart and verify both items
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Verify cart displays both products with correct quantities and prices
    await expect(page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Sauce Labs Bike Light' })).toBeVisible();
    await expect(page.locator('.inventory_item_price').filter({ hasText: '$29.99' })).toBeVisible();
    await expect(page.locator('.inventory_item_price').filter({ hasText: '$9.99' })).toBeVisible();

    // Verify total quantity is 2
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('2');

    // 4. Complete checkout process with personal information
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    // Verify order summary shows both products
    await expect(page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Sauce Labs Bike Light' })).toBeVisible();

    // Verify total price includes both items plus tax
    await expect(page.locator('.summary_subtotal_label')).toContainText('Item total: $39.98');
    await expect(page.locator('.summary_tax_label')).toContainText('Tax: $3.20');
    await expect(page.locator('.summary_total_label')).toContainText('Total: $43.18');

    // 5. Complete the purchase
    await page.locator('[data-test="finish"]').click();

    // Verify order confirmation displays successfully
    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    await expect(page.locator('.title')).toContainText('Checkout: Complete!');

    // Verify thank you message appears
    await expect(page.locator('.complete-header')).toContainText('Thank you for your order!');
  });
});