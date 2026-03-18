// spec: testPlan/test-plan.md  
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('SauceDemo E2E Tests - Negative Scenarios', () => {
  test('should show error when locked out user tries to login', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');

    // 2. Enter 'locked_out_user' in the Username field
    await page.locator('[data-test="username"]').fill('locked_out_user');

    // 3. Enter 'secret_sauce' in the Password field
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // 4. Click the Login button
    await page.locator('[data-test="login-button"]').click();

    // Verify login fails and error message is displayed
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();

    // Verify user remains on login page
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();

    // Verify error message has a close button (X)
    await expect(page.locator('[data-test="error-button"]')).toBeVisible();
  });
});