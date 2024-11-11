import { setWorldConstructor, setDefaultTimeout } from "@cucumber/cucumber";
import { Page } from "playwright";

// Default timeout for each test step
setDefaultTimeout(60000); // 60 seconds

// Custom world constructor to pass the page object across steps
class CustomWorld {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}

setWorldConstructor(CustomWorld);
