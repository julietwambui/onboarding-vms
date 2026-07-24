import { Given, When, Then } from "@cucumber/cucumber";
import { strict as assert } from "assert";
import { page } from "../support/hooks";

const BASE_URL = "http://localhost:3000";

Given("I am on the landing page", async () => {
  await page.goto(BASE_URL);
});

When("I choose Visitor", async () => {
  await page.getByRole("link", { name: "I'm a Visitor" }).click();
  await page.waitForLoadState("networkidle");
});

When("I fill in {string} as my full name", async (fullName: string) => {
  await page.fill('input[id="fullName"]', fullName);
});

When("I fill in {string} as my purpose of visit", async (purpose: string) => {
  await page.fill('input[id="purpose"]', purpose);
});

When("I leave the full name empty", async () => {
  await page.fill('input[id="fullName"]', "");
});

When("I leave the purpose empty", async () => {
  await page.fill('input[id="purpose"]', "");
});

When("I click the Register button", async () => {
  await page.click('button[type="submit"]');
});

Then("I should be redirected to the dashboard", async () => {
  await page.waitForURL(`${BASE_URL}/dashboard`, { timeout: 10000 });
  assert.ok(page.url().includes("/dashboard"));
});

Then("I should see an error message {string}", async (message: string) => {
  const errorText = await page.textContent("p.text-red-500");
  assert.ok(errorText?.includes(message));
});