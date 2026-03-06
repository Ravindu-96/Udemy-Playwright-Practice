import { test, expect } from '@playwright/test';
import { getOtpFromEmail } from '../utils/OtpMail';

const userData = {
    email: 'test05@bivou0qb.mailosaur.net',
    password: '2026@QA@mail'
};

// This test simulates user registration on the playground.mailslurp.com website, including filling out the registration form and confirming the account with an OTP code.
test('User Registration', async ({ page }) => {
    await page.goto('https://playground.mailslurp.com/');

    await page.locator('[data-test="sign-in-create-account-link"]').click();

    await page.locator('input[name="email"]').fill(userData.email);
    await page.locator('input[name="password"]').fill(userData.password);

    await page.locator('[data-test="sign-up-create-account-button"]').click();

    const otpCode = await getOtpFromEmail(userData.email);
    await page.locator('[data-test="confirm-sign-up-confirmation-code-input"]').fill(otpCode);

    await page.locator('[data-test="confirm-sign-up-confirm-button"]').click();
    await expect(page.locator('[data-test="sign-in-sign-in-button"]')).toBeVisible();
});