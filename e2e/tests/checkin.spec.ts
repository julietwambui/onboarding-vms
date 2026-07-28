import { test, expect } from "@playwright/test";

async function loginAsAdmin(page: any) {
  await page.goto("/login");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForSelector("#email", { state: "visible", timeout: 30000 });
  await page.fill("#email", "admin@vms.com");
  await page.fill("#password", "admin123");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/dashboard/, { timeout: 30000 });
}

test("Admin can check in a PENDING visitor", async ({ page }) => {
  await loginAsAdmin(page);

  // Wait for visitor table to load
  await page.waitForSelector("[data-testid='visitor-row']", { timeout: 30000 });

  // Find first Check In button and click it
  const checkInButton = page.locator("[data-testid='checkin-btn']").first();
  await checkInButton.waitFor({ state: "visible", timeout: 30000 });
  await checkInButton.click();

  await page.waitForTimeout(5000);
  // Wait for table to refresh
  const statusTexts = await page
    .locator("[data-testid='visitor-status']")
    .allTextContents();

  console.log("Statuses after check in:", statusTexts);
  expect(statusTexts.some((s) => s.includes("CHECKED_IN"))).toBe(true);
});
