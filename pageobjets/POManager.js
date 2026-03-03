import CartPage from "./CartPage";
import DashboardPage from "./DashboardPage";
import LoginPage from "./LoginPage";
import OrdersPage from "./OrdersPage";

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.ordersPage = new OrdersPage(page);
    }
    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getOrdersPage() {
        return this.ordersPage;
    }
}

export default POManager;