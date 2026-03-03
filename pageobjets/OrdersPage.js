class OrdersPage {
    constructor(page) {
        this.page = page;
        this.ordersHistoryLink = page.locator("label:has-text('Orders History Page')");
        this.orderRows = page.locator("[scope='row']");
        this.viewButton = page.getByRole('button', { name: 'View' });
        this.orderDetails = page.locator(".col-text");
    }

    async navigateToOrdersHistory() {
        await this.ordersHistoryLink.click();
        await this.orderRows.first().waitFor();
    }

    async searchAndVerifyOrder(orderId) {
        const count = await this.orderRows.count();
        for (let i = 0; i < count; i++) {
            const rowText = await this.orderRows.nth(i).textContent();
            if (orderId.includes(rowText)) {
                await this.viewButton.nth(i).click();
                break;
            }
        }
        await this.page.waitForLoadState('networkidle');
        const orderDetailsText = await this.orderDetails.textContent();
        return orderId.includes(orderDetailsText);
    }
}

export default OrdersPage;
