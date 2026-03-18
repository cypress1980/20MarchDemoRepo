// spec: testPlan/test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('SauceDemo E2E Tests - Additional Scenarios', () => {
  test('should validate checkout form fields', async ({ page }) => {
    // 1. Complete the flow until checkout information page
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    // 2. Leave First Name field empty and try to continue
    await page.locator('[data-test="continue"]').click();
    await expect(page.getByText('Error: First Name is required')).toBeVisible();

    // 3. Fill First Name but leave Last Name empty and try to continue
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="continue"]').click();
    await expect(page.getByText('Error: Last Name is required')).toBeVisible();

    // 4. Fill First and Last Name but leave Zip Code empty and try to continue
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="continue"]').click();
    await expect(page.getByText('Error: Postal Code is required')).toBeVisible();

    // 5. Test with invalid data formats (if applicable)
    await page.locator('[data-test="postalCode"]').fill('ABC!@#');
    await page.locator('[data-test="continue"]').click();
    // The system accepts invalid postal code format and proceeds to checkout overview
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
  });
});