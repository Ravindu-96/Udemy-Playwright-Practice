import { test, expect } from "@playwright/test";

// Visual testing to verify that the Google homepage appears as expected. 
// It captures a screenshot of the page and compares it to a baseline image to detect any visual regressions.
test.only("Visual testing", async ({page}) => {
    await page.goto("https://www.google.com/");
    await page.waitForLoadState("networkidle");
    expect(await page.screenshot()).toMatchSnapshot("google-homepage.png");
});