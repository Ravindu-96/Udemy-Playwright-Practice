// This test demonstrates how to use Playwright's storage state feature to maintain session information across tests.
// It logs in to the application, saves the session state, and then uses that state in a subsequent test to access authenticated pages without needing to log in again.

import { test, expect } from "@playwright/test";

let webContext;

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

test.only("Session Storage Test", async () => {
    const page1 = await webContext.newPage();
    await page1.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
    await page1.locator("[routerlink*='myorders']").click();
    await page1.waitForLoadState("networkidle");
    await page1.pause();
});
