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

test("Admin can check out a CHECKED_IN visitor", async ({ page }) => {
  await loginAsAdmin(page);

  // Wait for visitor table to load
  await page.waitForSelector("[data-testid='visitor-row']", { timeout: 30000 });

  // Find first Check Out button and click it
  const checkOutButton = page.locator("[data-testid='checkout-btn']").first();
  await checkOutButton.waitFor({ state: "visible", timeout: 30000 });
  await checkOutButton.click();

  // Wait for table to refresh
  await expect(
    page
    .locator("[data-testid='visitor-status']")
    .filter({ hasText: "CHECKED_OUT"})
    .first()
  ).toBeVisible();
});
