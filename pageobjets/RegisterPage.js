class RegisterPage {
    constructor(page) {
        this.page = page;
        this.createAccountLink = page.locator('[data-test="sign-in-create-account-link"]');
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.createAccountButton = page.locator('[data-test="sign-up-create-account-button"]');
        this.otpInput = page.locator('[data-test="confirm-sign-up-confirmation-code-input"]');
        this.confirmButton = page.locator('[data-test="confirm-sign-up-confirm-button"]');
        this.signInButton = page.locator('[data-test="sign-in-sign-in-button"]');
    }

    // Navigate to the registration page
    async goToRegistrationPage() {
        await this.page.goto('https://playground.mailslurp.com/');
    }

    // Click the create account link to start registration
    async clickCreateAccountLink() {
        await this.createAccountLink.click();
    }

    // Fill the registration form with email and password
    async fillRegistrationForm(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    // Click the create account button to submit the form
    async submitRegistrationForm() {
        await this.createAccountButton.click();
    }

    // Fill the OTP code for confirmation
    async fillOtpCode(otpCode) {
        await this.otpInput.fill(otpCode);
    }

    // Click the confirm button to complete registration
    async confirmRegistration() {
        await this.confirmButton.click();
    }

    // Verify that the sign-in button is visible after successful registration
    async getSignInButton() {
        return this.signInButton;
    }
}

export default RegisterPage;