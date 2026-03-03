import { test as base } from "@playwright/test";

// Custom test with fixtures
exports.customtest = base.extend({
    testData: {
        userName: "96nextgen99@gmail.com",
        password: "Auto@2026",
        productName: "ZARA COAT 3"
    }
});