// spec: testPlan/test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('SauceDemo E2E Tests - Negative Scenarios', () => {
  test('should show error with invalid login credentials', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');
    
    // 2. Enter 'invalid_user' in the Username field
    await page.locator('[data-test="username"]').fill('invalid_user');
    
    // 3. Enter 'invalid_password' in the Password field
    await page.locator('[data-test="password"]').fill('invalid_password');
    
    // 4. Click the Login button
    await page.locator('[data-test="login-button"]').click();
    
    // Verify login fails and error message is displayed
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    
    // Verify error message has a close button (X)
    await expect(page.locator('[data-test="error-button"]')).toBeVisible();
    
    // Verify user remains on login page (URL should not change)
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});