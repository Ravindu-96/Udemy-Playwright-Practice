import CartPage from "./CartPage";
import DashboardPage from "./DashboardPage";
import LoginPage from "./LoginPage";
import OrdersPage from "./OrdersPage";
import RegisterPage from "./RegisterPage";

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.ordersPage = new OrdersPage(page);
        this.registerPage = new RegisterPage(page);
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
    getRegisterPage() {
        return this.registerPage;
    }
}

export default POManager;