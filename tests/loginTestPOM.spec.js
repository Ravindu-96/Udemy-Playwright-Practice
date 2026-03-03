import { test, expect } from "@playwright/test";
import POManager from "../pageobjets/POManager";

// JSON --> String --> Object
import loginTestData from "../utils/loginTestPOMTestData.json";
const testData = JSON.parse(JSON.stringify(loginTestData));

// Data Driven Testing - iterate through test data and run the same test with different data sets
for (const data of testData) {
  test.only(`Add to Cart for ${data.productName}`, async ({ page }) => {
    const selectedProduct = data.productName;

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.validLogin(data.userName, data.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.addProductToCart(selectedProduct);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    const cartTexts = await cartPage.getCartItemsText();
    expect(cartTexts).toContain(selectedProduct);
    await cartPage.clickCheckout();
    // select country (action) and assert value in spec
    const countryValue = await cartPage.selectCountry('Sr', 'Sri Lanka');
    expect(countryValue).toBe('Sri Lanka');

    // place order and capture id
    await cartPage.placeOrder();
    await expect(page.locator('h1.hero-primary')).toHaveText('Thankyou for the order.');
    const orderId = await cartPage.getOrderId();
    console.log(orderId);

    // verify order in orders history via OrdersPage
    const ordersPage = poManager.getOrdersPage();
    await ordersPage.navigateToOrdersHistory();
    expect(await ordersPage.searchAndVerifyOrder(orderId)).toBeTruthy();
  });
}