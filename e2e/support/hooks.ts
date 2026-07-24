import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "playwright";

setDefaultTimeout(60000); // 60 seconds timeout for all steps

let browser: Browser;
let context: BrowserContext;
let page: Page;

Before(async () => {
  browser = await chromium.launch({
     headless: true,
    slowMo: 0,
 });
  context = await browser.newContext();
  page = await context.newPage();
});

After(async () => {
  try{
    if (page && !page.isClosed()) await page.close();
    if (context) await context.close();
    if(browser) await browser.close();
} catch (e) {
  console.error("Cleanup error:", e);
  }
});

export { page };