import { Given, When, Then } from "@cucumber/cucumber";
import { strict as assert } from "assert";
import { page } from "../support/hooks";

const BASE_URL = "http://localhost:3000";

Given("I am on the dashboard page", async () => {
  await page.goto(`${BASE_URL}/dashboard`);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);

  console.log("Current URL:", page.url());

  const rows = await page.$$("[data-testid='visitor-name']");
  console.log("Rows found:", rows.length);
});

When("I type {string} in the search box", async (searchTerm: string) => {
  await page.fill('input[placeholder="Search visitors..."]', searchTerm);
  await page.waitForTimeout(500);
});

Then("I should only see visitors whose name contains {string}", async (name: string) => {
  const visitorNames = await page.$$eval(
    "[data-testid='visitor-name']",
    (elements) => elements.map((el) => el.textContent?.trim() || "")
  );
console.log("Visitors found:", visitorNames);

  assert.ok(visitorNames.length > 0, "Expected at least one visitor");

  assert.ok(
    visitorNames.every((n) => n.toLowerCase().includes(name.toLowerCase())),
    `Expected all visitors to contain "${name}"`
  );
});

Then("I should see {string}", async (message: string) => {
 await page.waitForTimeout(500);

 const noResults = page.locator(`text=${message}`);
 await assert.ok(await noResults.isVisible());
});
