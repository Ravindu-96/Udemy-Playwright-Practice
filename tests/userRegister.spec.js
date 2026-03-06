import { test, expect } from '@playwright/test';
import { getOtpFromEmail } from '../utils/OtpMail';
import POManager from '../pageobjets/POManager';

// Generate a unique email for each test run to avoid conflicts
const generateUniqueEmail = () => {
    const timestamp = Date.now();
    return `test${timestamp}@bivou0qb.mailosaur.net`;
};

const userData = {
    password: '2026@QA@mail'
};

// This test simulates user registration on the playground.mailslurp.com website,
// including filling out the registration form and confirming the account with an OTP code.
// It uses the Page Object Model (POM) pattern for better maintainability.
test('User Registration', async ({ page }) => {
    // Generate a unique email for this test run
    const uniqueEmail = generateUniqueEmail();

    // Initialize Page Object Manager
    const poManager = new POManager(page);
    const registerPage = poManager.getRegisterPage();

    // Navigate to the registration page
    await registerPage.goToRegistrationPage();

    // Click the create account link
    await registerPage.clickCreateAccountLink();

    // Fill the registration form
    await registerPage.fillRegistrationForm(uniqueEmail, userData.password);

    // Submit the registration form
    await registerPage.submitRegistrationForm();

    // Retrieve OTP from email
    const otpCode = await getOtpFromEmail(uniqueEmail);

    // Fill the OTP code
    await registerPage.fillOtpCode(otpCode);

    // Confirm the registration
    await registerPage.confirmRegistration();

    // Verify successful registration by checking if sign-in button is visible
    const signInButton = await registerPage.getSignInButton();
    await expect(signInButton).toBeVisible();
});