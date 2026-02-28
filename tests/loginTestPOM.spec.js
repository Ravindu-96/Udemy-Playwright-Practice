import { test, expect } from "@playwright/test";
import LoginPage from "../pageobjets/LoginPage";
import DashboardPage from "../pageobjets/DashboardPage";

test.only("Add to Cart", async ({ page }) => {
  const selectedProduct = "ZARA COAT 3";

  const loginPage = new LoginPage(page);
  await loginPage.validLogin("96nextgen99@gmail.com", "Auto@2026");

  const dashboardPage = new DashboardPage(page);
  await dashboardPage.addProductToCart(selectedProduct);
  await dashboardPage.navigateToCart();

  // Wait for the cart section to load and contain elements
  const cartItems = page.locator(".cartSection h3");
  await cartItems.first().waitFor(); // Ensure at least one item is loaded

  // Assert that one of the cart item headers contains the selected product text
  await expect(cartItems).toContainText(selectedProduct);

  // Click on the checkout button
  await page.locator("text=Checkout").click();

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
