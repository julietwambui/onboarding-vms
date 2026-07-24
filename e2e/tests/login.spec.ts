import { test, expect } from "@playwright/test";

test("Admin can log in successfully", async ({ page }) => {
  // Go directly to login page instead of clicking the link
  await page.goto("/login");
  
  // Wait for page to fully load
  await page.waitForLoadState("domcontentloaded");
  await page.waitForSelector("#email", { state: "visible", timeout: 30000 });

  // Verify we're on login page
  await expect(page).toHaveURL(/login/);

  // Fill credentials
  await page.fill("#email", "admin@vms.com");
  await page.fill("#password", "admin123");

  // Click Login button
  await page.getByRole("button", { name: "Login" }).click();

  // Verify redirect to dashboard
  await expect(page).toHaveURL(/dashboard/, { timeout: 30000 });
});

test("Admin login fails with wrong credentials", async ({ page }) => {
  await page.goto("/login");
  await page.waitForLoadState("domcontentloaded");
   await page.waitForSelector("#email", { state: "visible", timeout: 30000 });
  
  await page.fill("#email", "wrong@email.com");
  await page.fill("#password", "wrongpassword");

  await page.getByRole("button", { name: "Login" }).click();

  // Should stay on login page
  await expect(page).toHaveURL(/login/);
});