// This test suite covers basic UI interactions using Playwright, including navigating to a page, filling out forms, 
// Handling dropdowns and radio buttons, working with child windows, 
// Performing actions like adding items to a cart and checking out. 
// It demonstrates how to use Playwright's locators, assertions, and event handling to automate user interactions on a web application.

import { test, expect } from "@playwright/test";
import { text } from "node:stream/consumers";

test("Browser Context", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.saucedemo.com/");
});

test("Login Page Signin Wrong", async ({ page }) => {
  const userName = page.locator("#username");
  const password = page.locator("#password");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  await userName.fill("----");
  await password.fill("learning");
  await page.locator("#signInBtn").click();

  await expect(page.locator('[style="display: block;"]')).toContainText(
    "Incorrect",
  );
  await userName.fill("rahulshettyacademy");
  await password.fill("Learning@830$3mK2");
  await page.locator("#signInBtn").click();

  await expect(page).toHaveTitle("ProtoCommerce");
  console.log(await page.locator(".card-body a").last().textContent());
});

test("Get all elements", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const UserName = page.locator("#username");
  const password = page.locator("#password");

  await UserName.fill("rahulshettyacademy");
  await password.fill("Learning@830$3mK2");
  await page.locator("#signInBtn").click();

  await page.locator(".card-body a").last().waitFor();
  const allProducts = await page.locator(".card-body a").allTextContents();
  console.log(allProducts);
});

test("Drop Down", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("Learning@830$3mK2");

  // Dropdown
  const dropDown = page.locator("select.form-control");
  await dropDown.selectOption("Teacher");

  // Radio Button
  const radioButtons = page.locator(".radiotextsty");
  await radioButtons.nth(1).click();
  await page.locator("#okayBtn").click();
  await expect(radioButtons.nth(1)).toBeChecked();
  console.log(await radioButtons.nth(1).isChecked());

  // CheckBox
  const checkBox = page.locator("#terms");
  await checkBox.check();
  await expect(checkBox).toBeChecked();
  await checkBox.uncheck();
  await expect(checkBox).not.toBeChecked();

  // Doc Links
  const docLink = page.locator("[href*='documents-request']");
  await expect(docLink).toHaveAttribute(
    "href",
    "https://rahulshettyacademy.com/documents-request",
  );
});

test("Child Window", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const password = page.locator("#password");
  const docLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    docLink.click(),
  ]);

  await expect(newPage).toHaveTitle("RS Academy");

  const text = await newPage
    .locator('[href="mailto:mentor@rahulshettyacademy.com"]')
    .textContent();
  const email = text.split("@")[1];

  await userName.fill(email);

  console.log(await userName.textContent(), "Text Content");
  console.log(await userName.inputValue(), "Input Value");
});

test.only("Add to Cart", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  const userName = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const loginBtn = page.locator("#login");
  const selectedProduct = "ZARA COAT 3";

  await userName.fill("96nextgen99@gmail.com");
  await password.fill("Auto@2026");
  await loginBtn.click();
  await page.waitForLoadState("networkidle");

  const childLocator = page.locator(".card-body");
  const count = await childLocator.count();

  for (let i = 0; i < count; i++) {
    if (
      (await childLocator.nth(i).locator("b").textContent()) === selectedProduct
    ) {
      await childLocator.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();

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
  