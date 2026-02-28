class DashboardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async addProductToCart(selectedProduct) {
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if ((await this.products.nth(i).locator("b").textContent()) === selectedProduct) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();
        await this.page.waitForLoadState("networkidle");
    }
}

export default DashboardPage;
