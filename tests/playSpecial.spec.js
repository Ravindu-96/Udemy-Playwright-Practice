// This test suite demonstrates various Playwright features, including interacting with web elements,
// Handling dialog boxes, hovering over elements, and working with iframes.

import { test, expect } from "@playwright/test";

test("Playwright Special", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const userName = page.getByPlaceholder("email@example.com");
    const password = page.getByPlaceholder("enter your passsword");
    const selectProduct = "ZARA COAT 3";

    await userName.fill("96nextgen99@gmail.com");
    await password.fill("Auto@2026");

    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState("networkidle");

    await page.locator(".card-body").filter({hasText: selectProduct}).getByRole("button", {name: "Add To Cart"}).click();
    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();

    await expect(page.getByRole('heading', { name: 'ZARA COAT' })).toBeVisible();

    await page.pause();
});

test("Calander", async ({ page }) => {

    const year = "2024";
    const month = "March";
    const date = "20";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__calendar-button").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__decade-view__years button").filter({ hasText: year }).click();
    await page.locator(".react-calendar__year-view__months button").filter({ hasText: month }).click();
    await page.locator(".react-calendar__month-view__days button").filter({ hasText: date }).click();

    await page.pause();
});


test.only("Dialog Box", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    // Dialog Box
    page.on("dialog", dialog => {
        console.log(dialog.message());
        dialog.accept();
    });
    await page.locator("#confirmbtn").click();

    // Hovering
    await page.locator("#mousehover").hover();
    await page.locator(".mouse-hover-content a").filter({ hasText: "Top" }).click();

    // Iframe
    const frame = page.frameLocator("#courses-iframe");
    await frame.locator("li a[href*='lifetime']:visible").click();

    const countLocator = frame.locator("h2:has-text('Join') span");
    const countText = await countLocator.textContent();
    console.log(countText);

});