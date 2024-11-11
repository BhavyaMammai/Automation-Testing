import { Before, After } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";

// Declare page and browser globally
let browser: Browser;
let page: Page;

// Before hook to launch the browser before each scenario
Before(async () => {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
});

// After hook to close the browser after each scenario
After(async () => {
  await browser.close();
});
