class LoginPage {
    constructor(page) {
        this.page = page;
        this.email = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginBtn = page.locator("[value='Login']");
    }

    async validLogin(username, password) {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await this.email.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
        await this.page.waitForLoadState("networkidle");
    }
}

export default LoginPage;