// This test demonstrates how to use Playwright's storage state feature to maintain session information across tests.
// It logs in to the application, saves the session state, and then uses that state in a subsequent test to access authenticated pages without needing to log in again.

import { test, expect } from "@playwright/test";

let webContext;
let emptyOrdersResponse = { data: [], message: "No Orders" }

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("96nextgen99@gmail.com");
    await page.locator("#userPassword").fill("Auto@2026");
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForLoadState("networkidle");

    // Save the storage state to a file
    await context.storageState({ path: "state.json" });
    webContext = await browser.newContext({ storageState: "state.json" });

});

test.only("No Orders in Cart", async () => {
    const page1 = await webContext.newPage();
    await page1.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");

    // Route page for orders API and mock response with empty orders
    page1.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {
        const response = await page1.request.fetch(route.request());
        route.fulfill({
            response,
            body: JSON.stringify(emptyOrdersResponse),
        });
    });

    await page1.locator("[routerlink*='myorders']").click();

    // Wait for the mocked API response to be received
    await page1.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    // Verify that the "No Orders" message is displayed in the UI
    await expect(page1.locator("div .ng-star-inserted")).toBeVisible();
});
