// This test demonstrates how to use Playwright's API testing capabilities to authenticate a user,
//  Retrieve an order ID, and then verify that the order details are correctly displayed in the UI. 
// It uses a utility class to handle API interactions and maintains the authentication token across tests by injecting it into the browser's local storage.

import { test, expect, request } from "@playwright/test";
import APIUtils from "../utils/APIUtils";

const LoginPayload = {
    userEmail: "96nextgen99@gmail.com",
    userPassword: "Auto@2026",
};

const orderPayload = {
    orders: [
        {
            country: "Israel",
            productOrderedId: "6960eac0c941646b7a8b3e68",
        },
    ],
};

let token;
let orderId;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, LoginPayload);
    token = await apiUtils.getToken();
    orderId = await apiUtils.getOrderId(orderPayload);
});

test.only("Add to Cart", async ({ page }) => {
    await page.addInitScript((value) => {
        window.localStorage.setItem("token", value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");

    await page.locator("[routerlink*='myorders']").click();
    await page.waitForLoadState("networkidle");

    const orderids = page.locator("[scope='row']");
    await orderids.first().waitFor();
    const count1 = await orderids.count();

    for (let i = 0; i < count1; i++) {
        if (orderId.includes(await orderids.nth(i).textContent())) {
            await page.getByRole("button", { name: "View" }).nth(i).click();
            break;
        }
    }
    await page.waitForLoadState("networkidle");
    const orderDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderDetails)).toBeTruthy();
});
