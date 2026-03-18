// spec: testPlan/test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('SauceDemo E2E Tests - Negative Scenarios', () => {
  test('should show error when login with empty fields', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');

    // 2. Leave Username field empty - verify it remains empty
    await expect(page.locator('[data-test="username"]')).toHaveValue('');

    // 3. Leave Password field empty - verify it remains empty
    await expect(page.locator('[data-test="password"]')).toHaveValue('');

    // 4. Click the Login button
    await page.locator('[data-test="login-button"]').click();

    // Verify login fails and validation error message is displayed
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();

    // Verify user remains on login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Verify error message has a close button (X)
    await expect(page.locator('[data-test="error-button"]')).toBeVisible();
  });
});