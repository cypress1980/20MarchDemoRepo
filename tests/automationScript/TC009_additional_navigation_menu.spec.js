// spec: TC009_Navigation_And_Menu_Functionality
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('SauceDemo E2E Tests - Additional Scenarios', () => {
  test('should navigate and use menu functionality correctly', async ({ page }) => {
    // 1. Login and access the hamburger menu
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Click hamburger menu to open it
    await page.getByRole('button', { name: 'Open Menu' }).click();
    
    // Verify menu opens with options: All Items, About, Logout, Reset App State
    await expect(page.getByRole('link', { name: 'All Items' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Reset App State' })).toBeVisible();

    // 2. Click 'About' link in menu
    // Verify user is redirected to https://saucelabs.com/ (external site)
    await page.locator('[data-test="about-sidebar-link"]').click();
    await expect(page).toHaveURL('https://saucelabs.com/');

    // 3. Return to application and test 'Reset App State'
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    // Add items to cart to test reset functionality
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    
    // Open menu and click reset
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="reset-sidebar-link"]').click();
    await page.getByRole('button', { name: 'Close Menu' }).click();
    
    // Verify application state is reset and cart is cleared
    // Check that no cart badge is visible (cart badge only appears when items are in cart)
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
    
    // Verify user remains logged in
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // 4. Test 'Logout' functionality
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    
    // Verify user is logged out and redirected to login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    
    // Verify session is terminated
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });
});