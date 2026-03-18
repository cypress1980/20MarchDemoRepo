// spec: testPlan/test-plan.md - TC005_Checkout_Without_Items
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('SauceDemo E2E Tests - Negative Scenarios', () => {
  test('should handle checkout without items in cart', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');
    
    // Verify the login page is displayed
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // 2. Login with valid credentials (standard_user/secret_sauce)
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Verify successful login to product inventory page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');

    // 3. Click the shopping cart badge without adding any items
    await page.locator('[data-test="shopping-cart-link"]').click();
    
    // Verify user is redirected to empty cart page
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(page.locator('.title')).toHaveText('Your Cart');
    
    // Verify cart shows no items
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page.locator('.cart_quantity_label')).toHaveText('QTY');
    await expect(page.locator('.cart_desc_label')).toHaveText('Description');
    
    // Verify checkout button is accessible 
    const checkoutButton = page.locator('[data-test="checkout"]');
    await expect(checkoutButton).toBeVisible();
    await expect(checkoutButton).toBeEnabled();

    // 4. Verify checkout button accessibility with empty cart
    await checkoutButton.click();
    
    // Verify system handles empty cart scenario - allows proceeding to checkout
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
    
    // Verify checkout form is displayed even with empty cart
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
    await expect(page.locator('[data-test="continue"]')).toBeVisible();
    await expect(page.locator('[data-test="cancel"]')).toBeVisible();
  });
});