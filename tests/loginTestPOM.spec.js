import { test, expect } from "@playwright/test";
import POManager from "../pageobjets/POManager";

test.only("Add to Cart", async ({ page }) => {
  const selectedProduct = "ZARA COAT 3";

  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.validLogin("96nextgen99@gmail.com", "Auto@2026");

  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.addProductToCart(selectedProduct);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  const cartTexts = await cartPage.getCartItemsText();
  expect(cartTexts).toContain(selectedProduct);
  await cartPage.clickCheckout();

  await page.locator("[placeholder='Select Country']").pressSequentially("Sr",{ delay: 100 });
  await page.getByRole('button', { name: ' Sri Lanka' }).click();
  await expect(page.getByRole('textbox', { name: 'Select Country' })).toHaveValue('Sri Lanka');

  await page.locator(".action__submit").click();
  await expect(page.locator("h1.hero-primary")).toHaveText("Thankyou for the order.");
  var orderId = await page.locator("label.ng-star-inserted").textContent();
  console.log(orderId);

  await page.locator("label:has-text('Orders History Page')").click();
  const orderids = await page.locator("[scope='row']")
  await orderids.first().waitFor();
  const count1 = await orderids.count();

  for (let i = 0; i < count1; i++) {
    if (orderId.includes(await orderids.nth(i).textContent())) {
      await page.getByRole('button', { name: 'View' }).nth(i).click();
      break;
    }
  }
  await page.waitForLoadState("networkidle");
  const orderDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderDetails)).toBeTruthy();  
});
