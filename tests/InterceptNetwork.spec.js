// This test demonstrates how to use Playwright's storage state feature to maintain session information across tests.
// It logs in to the application, saves the session state, and then uses that state in a subsequent test to access authenticated pages without needing to log in again.

import { test, expect } from "@playwright/test";
import { url } from "node:inspector";

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

// This test verifies that when there are no orders in the cart, the application correctly displays a "No Orders" message.
//  It mocks the API response to return an empty orders list and checks the UI for the appropriate message.
test("No Orders in Cart", async () => {
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


// This test verifies that users cannot access order details of other users by manipulating the API request.
test.only("Security Check for view other users orders", async () => {
    const page2 = await webContext.newPage();
    await page2.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");

    await page2.locator("[routerlink*='myorders']").click();

    // Route page for order details API and attempt to access another user's order details
    page2.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", route => {
        route.continue({
            url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=12345", // Attempt to access another user's order details
        });
    });
    await page2.locator("button:has-text('View')").first().click();
    await expect(page2.locator(".blink_me")).toBeVisible();

});