class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator(".cartSection h3");
        this.checkoutButton = page.locator("text=Checkout");
        this.countryDropdown = page.locator("[placeholder='Select Country']");
        this.submitButton = page.locator(".action__submit");
        this.orderConfirmationText = page.locator("h1.hero-primary");
        this.orderIdLabel = page.locator("label.ng-star-inserted");
    }
    async getCartItemsText() {
        await this.cartItems.first().waitFor();
        return await this.cartItems.allTextContents();
    }
    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async selectCountry(countryPartialText, fullCountryName) {
        await this.countryDropdown.pressSequentially(countryPartialText, { delay: 100 });
        await this.page.getByRole('button', { name: ` ${fullCountryName}` }).click();
        await this.page.waitForLoadState('networkidle');
        return await this.page.getByRole('textbox', { name: 'Select Country' }).inputValue();
    }

    async placeOrder() {
        await this.submitButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async getOrderId() {
        await this.orderConfirmationText.waitFor();
        return await this.orderIdLabel.textContent();
    }
}

export default CartPage;