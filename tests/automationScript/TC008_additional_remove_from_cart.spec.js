// TC008_Remove_Product_From_Cart
// Test Suite: SauceDemo E2E Tests - Additional Scenarios

const { test, expect } = require('@playwright/test');

test.describe('SauceDemo E2E Tests - Additional Scenarios', () => {
  test('should remove product from cart successfully', async ({ page }) => {
    // 1. Login and add a product to cart
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Verify login successful and add product to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Verify product is successfully added to cart and cart badge shows '1'
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

    // 2. Navigate to cart page
    await page.locator('[data-test="shopping-cart-link"]').click();
    
    // Verify cart displays the added product
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('$29.99')).toBeVisible();

    // 3. Click 'Remove' button for the product in cart
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    
    // Verify product is removed from cart, cart becomes empty, and cart badge no longer shows count
    await expect(page.getByText('Sauce Labs Backpack')).not.toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();

    // 4. Verify cart state after removal
    // Verify cart page shows no items (QTY header still visible but no product items)
    await expect(page.getByText('QTY')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack')).not.toBeVisible();
    
    // Verify Continue Shopping button remains functional
    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page.url()).toContain('/inventory.html');
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
  });
});