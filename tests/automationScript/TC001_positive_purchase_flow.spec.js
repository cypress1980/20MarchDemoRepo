// spec: testPlan/test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('SauceDemo E2E Tests - Positive Scenarios', () => {
  test('should complete successful purchase flow', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');

    // 2. Enter 'standard_user' in the Username field
    await page.locator('[data-test="username"]').fill('standard_user');

    // 3. Enter 'secret_sauce' in the Password field
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // 4. Click the Login button
    await page.locator('[data-test="login-button"]').click();

    // 5. Verify product listing page is displayed
    await expect(page.getByText('Products')).toBeVisible();

    // 6. Add the 'Sauce Labs Backpack' ($29.99) to the cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 7. Click the shopping cart badge to navigate to cart
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 8. Verify product is present in the cart
    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    // 9. Click the 'Checkout' button
    await page.locator('[data-test="checkout"]').click();

    // 10. Enter 'John' in First Name field
    await page.locator('[data-test="firstName"]').fill('John');

    // 11. Enter 'Doe' in Last Name field
    await page.locator('[data-test="lastName"]').fill('Doe');

    // 12. Enter '12345' in Zip Code field
    await page.locator('[data-test="postalCode"]').fill('12345');

    // 13. Click 'Continue' button
    await page.locator('[data-test="continue"]').click();

    // 14. Review order summary details (verify product, payment, shipping, price breakdown)
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
    await expect(page.getByText('SauceCard #31337')).toBeVisible();
    await expect(page.getByText('Free Pony Express Delivery!')).toBeVisible();
    await expect(page.getByText('Total: $32.39')).toBeVisible();

    // 15. Click 'Finish' button to complete the order
    await page.locator('[data-test="finish"]').click();

    // Expected Result: Order confirmation message "Thank you for your order!" is displayed
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
  });
});