import { test, expect } from "@playwright/test";
import POManager from "../pageobjets/POManager";
import { customtest } from "../utils/test-base";

// Using custom test with fixtures
customtest("Add to Cart @web", async ({ page, testData }) => {
  const selectedProduct = testData.productName;
  console.log("Custom Fixture Data:", testData);

  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.validLogin(testData.userName, testData.password);

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
