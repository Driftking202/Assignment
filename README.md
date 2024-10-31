Here's a basic example of a `README.md` file for a Cypress automation project that covers Amazon's login and add-to-cart functionality. This file includes instructions on setup, dependencies, test structure, and running tests.

---

# Amazon Login and Add-to-Cart Automation

This project automates the login and add-to-cart functionality on Amazon using Cypress.

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Test Structure](#test-structure)
- [Running Tests](#running-tests)
- [Sample Commands](#sample-commands)
- [Troubleshooting](#troubleshooting)

## Overview

This Cypress project automates two primary flows on Amazon:
1. **Login**: Logs into an Amazon account using valid credentials.
2. **Add to Cart**: Searches for a specific item, selects it, and adds it to the cart.

## Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v12 or later)
- [Cypress](https://www.cypress.io/) (v10 or later)

## Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Driftking202/Assignment.git
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the project root to store environment variables for secure storage of sensitive information like login credentials.

```plaintext
AMAZON_EMAIL=your-email@example.com
AMAZON_PASSWORD=yourpassword
```

To use these environment variables in Cypress, make sure to add `dotenv` to your `cypress.config.js` file or directly configure them in the test.

## Test Structure

- **Login/Add To Cart Test** (`cypress/e2e/login.spec.js`): Automates the login flow on Amazon, verifying successful login by checking the user’s name or account page.

### Example Test Flow

1. **Login Test**
   - Navigate to the Amazon login page.
   - Enter the email and password.
   - Verify that the login is successful.

2. **Add to Cart Test**
   - Search for an item by name or keyword.
   - Select the item from the search results.
   - Apply filters such as customer review and price range.
   - Sorting from low to high.
   - Add the item to the cart.
   - Verify the item is added to the cart successfully.

## Running Tests

### Running Tests in Cypress Test Runner

```bash
npm run test
```

This opens the Cypress Test Runner, where you can select and run individual test cases interactively.

### Running Tests in Headless Mode

```bash
npx cypress runnpx cypress run --config-file cypress/staging.config.ts```

This command runs all tests in headless mode, which is ideal for CI/CD pipelines.

## Sample Commands

**Run a Specific Test File:**
```bash
npx cypress run --spec "cypress/e2e/login.spec.js"
``
```

## Troubleshooting

- **Issue**: Unable to find element selectors.
  - **Solution**: Inspect and update selectors in your test files. Amazon's dynamic elements may change, so use stable selectors like `aria-label` or unique CSS classes when possible.

- **Issue**: Test fails on login due to CAPTCHA.
  - **Solution**: Amazon sometimes uses CAPTCHA to prevent bot access. For regular testing, use a testing environment if available. Alternatively, retry tests as CAPTCHA challenges are not always persistent.
  - Manual Intervention
In some cases, you can configure Cypress tests to pause for manual CAPTCHA entry. This approach is less efficient but might be useful if CAPTCHA-solving services or bypasses are not available.
Use cy.pause() to stop the test, allowing you to manually solve the CAPTCHA before resuming:
