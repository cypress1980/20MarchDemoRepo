# 🧪 Story Title
Automate End-to-End Product Purchase Flow on SauceDemo

---

## 📖 Story Description
As a QA Engineer,  
I want to automate the product purchase flow on the SauceDemo website,  
so that the end-to-end checkout functionality can be validated during regression testing.

This automation ensures that a user can:
- Log in successfully
- Add a product to the cart
- Complete checkout
- Receive order confirmation

---

## 🌐 Application URL
https://www.saucedemo.com/

---

## 🔐 Credentials

| Field      | Value            |
|------------|------------------|
| Username   | standard_user    |
| Password   | secret_sauce     |

---

## ✅ Acceptance Criteria

### ✔️ Positive Test Case: Successful Purchase Flow

**Test Scenario:**  
User completes the purchase successfully with valid credentials and details.

**Steps:**
1. Open the SauceDemo website  
2. Enter valid username and password  
3. Click on Login  
4. Verify product listing page is displayed  
5. Add the first product to the cart  
6. Navigate to the cart  
7. Verify product is present in the cart  
8. Click on Checkout  
9. Enter valid details:
   - First Name
   - Last Name
   - Zip Code  
10. Click Continue  
11. Review order summary  
12. Click Finish  

**Expected Result:**
- User is able to complete the checkout process  
- Order confirmation message is displayed:  
  **"Thank you for your order!"**

---

### ❌ Negative Test Case: Invalid Login

**Test Scenario:**  
User attempts to log in with invalid credentials.

**Steps:**
1. Open the SauceDemo website  
2. Enter invalid username and/or password  
3. Click on Login  

**Expected Result:**
- Login should fail  
- Error message should be displayed:  
  **"Username and password do not match any user in this service"**