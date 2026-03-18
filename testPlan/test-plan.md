# SauceDemo E2E Test Plan

## Application Overview

Comprehensive test plan for the SauceDemo application covering the end-to-end product purchase flow, login functionality, error handling, and edge cases. The application is an e-commerce demo site with product inventory, shopping cart, and checkout functionality.

## Test Scenarios

### 1. Positive Test Scenarios

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC001_Successful_Purchase_Flow

**File:** `tests/positive/successful-purchase-flow.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: The SauceDemo login page is displayed
    - expect: Username and Password fields are visible
    - expect: Login button is present
  2. Enter 'standard_user' in the Username field
    - expect: Username field accepts the input
  3. Enter 'secret_sauce' in the Password field
    - expect: Password field accepts the input (masked)
  4. Click the Login button
    - expect: User is redirected to product inventory page
    - expect: Products page displays 6 available products
    - expect: Page URL changes to /inventory.html
  5. Verify product listing page is displayed
    - expect: Products title is visible
    - expect: All 6 products are displayed with prices
    - expect: Each product has an 'Add to cart' button
    - expect: Sort dropdown is functional
  6. Add the 'Sauce Labs Backpack' ($29.99) to the cart
    - expect: Cart badge shows '1' item
    - expect: Add to cart button changes to 'Remove' for the selected product
  7. Click the shopping cart badge to navigate to cart
    - expect: User is redirected to cart page
    - expect: Page URL changes to /cart.html
    - expect: Cart displays 'Your Cart' header
  8. Verify product is present in the cart
    - expect: Sauce Labs Backpack is listed in cart with quantity 1
    - expect: Product description and price ($29.99) are displayed
    - expect: Remove button is available
  9. Click the 'Checkout' button
    - expect: User is redirected to checkout information page
    - expect: Page displays 'Checkout: Your Information' header
    - expect: Three input fields are visible: First Name, Last Name, Zip Code
  10. Enter 'John' in First Name field
    - expect: First Name field accepts the input
  11. Enter 'Doe' in Last Name field
    - expect: Last Name field accepts the input
  12. Enter '12345' in Zip Code field
    - expect: Zip Code field accepts the input
  13. Click 'Continue' button
    - expect: User is redirected to checkout overview page
    - expect: Page displays 'Checkout: Overview' header
    - expect: Order summary is displayed
  14. Review order summary details
    - expect: Product details are correct: Sauce Labs Backpack, Qty: 1
    - expect: Payment Information shows: SauceCard #31337
    - expect: Shipping Information shows: Free Pony Express Delivery!
    - expect: Price breakdown shows: Item total: $29.99, Tax: $2.40, Total: $32.39
  15. Click 'Finish' button to complete the order
    - expect: User is redirected to order confirmation page
    - expect: Page displays 'Checkout: Complete!' header
    - expect: Success message 'Thank you for your order!' is displayed
    - expect: Order dispatched message is shown
    - expect: 'Back Home' button is available

### 2. Negative Test Scenarios

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC002_Invalid_Login_Credentials

**File:** `tests/negative/invalid-login-credentials.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: SauceDemo login page is displayed
  2. Enter 'invalid_user' in the Username field
    - expect: Username field accepts the input
  3. Enter 'invalid_password' in the Password field
    - expect: Password field accepts the input (masked)
  4. Click the Login button
    - expect: Login fails
    - expect: Error message is displayed: 'Epic sadface: Username and password do not match any user in this service'
    - expect: User remains on login page
    - expect: Error message has a close button (X)

#### 2.2. TC003_Locked_Out_User_Login

**File:** `tests/negative/locked-out-user-login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: SauceDemo login page is displayed
  2. Enter 'locked_out_user' in the Username field
    - expect: Username field accepts the input
  3. Enter 'secret_sauce' in the Password field
    - expect: Password field accepts the input (masked)
  4. Click the Login button
    - expect: Login fails
    - expect: Error message is displayed: 'Epic sadface: Sorry, this user has been locked out.'
    - expect: User remains on login page
    - expect: Error message has a close button (X)

#### 2.3. TC004_Empty_Fields_Validation

**File:** `tests/negative/empty-fields-validation.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: SauceDemo login page is displayed
  2. Leave Username field empty
    - expect: Username field remains empty
  3. Leave Password field empty
    - expect: Password field remains empty
  4. Click the Login button
    - expect: Login fails
    - expect: Validation error message is displayed: 'Epic sadface: Username is required'
    - expect: User remains on login page
    - expect: Error message has a close button (X)

#### 2.4. TC005_Checkout_Without_Items

**File:** `tests/negative/checkout-without-items.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: SauceDemo login page is displayed
  2. Login with valid credentials (standard_user/secret_sauce)
    - expect: User successfully logs in to product inventory page
  3. Click the shopping cart badge without adding any items
    - expect: User is redirected to empty cart page
    - expect: Cart shows no items
    - expect: Checkout button behavior should be verified
  4. Verify checkout button accessibility with empty cart
    - expect: System handles empty cart scenario appropriately

### 3. Additional Test Scenarios

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC006_Product_Sorting_Functionality

**File:** `tests/additional/product-sorting.spec.ts`

**Steps:**
  1. Login with valid credentials and access product inventory
    - expect: Product inventory page is displayed with all 6 products
  2. Click the sort dropdown and select 'Name (Z to A)'
    - expect: Products are sorted alphabetically in descending order
    - expect: Product order changes correctly
  3. Select 'Price (low to high)' from sort dropdown
    - expect: Products are sorted by price from lowest to highest
    - expect: Price order is: $7.99, $9.99, $15.99, $15.99, $29.99, $49.99
  4. Select 'Price (high to low)' from sort dropdown
    - expect: Products are sorted by price from highest to lowest
    - expect: Price order is reversed

#### 3.2. TC007_Multiple_Products_Purchase

**File:** `tests/additional/multiple-products-purchase.spec.ts`

**Steps:**
  1. Login and navigate to product inventory page
    - expect: Product inventory page is displayed
  2. Add multiple products to cart: Sauce Labs Backpack and Sauce Labs Bike Light
    - expect: Cart badge shows '2' items
    - expect: Both products have 'Remove' buttons
  3. Navigate to cart and verify both items
    - expect: Cart displays both products with correct quantities and prices
    - expect: Total quantity is 2
  4. Complete checkout process with personal information
    - expect: Order summary shows both products
    - expect: Total price includes both items plus tax
  5. Complete the purchase
    - expect: Order confirmation displays successfully
    - expect: Thank you message appears

#### 3.3. TC008_Remove_Product_From_Cart

**File:** `tests/additional/remove-product-from-cart.spec.ts`

**Steps:**
  1. Login and add a product to cart
    - expect: Product is successfully added to cart
    - expect: Cart badge shows '1'
  2. Navigate to cart page
    - expect: Cart displays the added product
  3. Click 'Remove' button for the product in cart
    - expect: Product is removed from cart
    - expect: Cart becomes empty
    - expect: Cart badge no longer shows count
  4. Verify cart state after removal
    - expect: Cart page shows no items
    - expect: Continue Shopping button remains functional

#### 3.4. TC009_Navigation_And_Menu_Functionality

**File:** `tests/additional/navigation-menu.spec.ts`

**Steps:**
  1. Login and access the hamburger menu
    - expect: Menu opens with options: All Items, About, Logout, Reset App State
  2. Click 'About' link in menu
    - expect: User is redirected to https://saucelabs.com/ (external site)
  3. Return to application and test 'Reset App State'
    - expect: Application state is reset
    - expect: Cart is cleared
    - expect: User remains logged in
  4. Test 'Logout' functionality
    - expect: User is logged out
    - expect: Redirected to login page
    - expect: Session is terminated

#### 3.5. TC010_Checkout_Form_Validation

**File:** `tests/additional/checkout-form-validation.spec.ts`

**Steps:**
  1. Complete the flow until checkout information page
    - expect: Checkout information form is displayed
  2. Leave First Name field empty and try to continue
    - expect: Validation error should appear for required field
  3. Fill First Name but leave Last Name empty and try to continue
    - expect: Validation error should appear for Last Name field
  4. Fill First and Last Name but leave Zip Code empty and try to continue
    - expect: Validation error should appear for Zip Code field
  5. Test with invalid data formats (if applicable)
    - expect: System should handle invalid input appropriately