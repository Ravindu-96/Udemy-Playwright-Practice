class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator(".cartSection h3");
        this.checkoutButton = page.locator("text=Checkout");
    }
    async getCartItemsText() {
        await this.cartItems.first().waitFor();
        return await this.cartItems.allTextContents();
    }
    async clickCheckout() {
        await this.checkoutButton.click();
    }

}

export default CartPage;