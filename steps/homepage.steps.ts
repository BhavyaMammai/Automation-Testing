import { Given, When, Then, BeforeAll, AfterAll } from "@cucumber/cucumber";
import { chromium, Page, Browser } from "playwright";

// Declare page and browser globally
let page: Page;
let browser: Browser;

// Open the browser
BeforeAll({ timeout: 15000 }, async () => {
  browser = await chromium.launch({
    headless: false,
    slowMo: 2000,
    args: ["--start-maximized"],
  });
  page = await browser.newPage();
  await page.goto("https://personal-portfoli-9.vercel.app/"); // Navigate to the homepage
  await page.waitForSelector("body");
});

Given("I am on the homepage", async () => {});

// Step to check the title of the page
When("I check the title", async () => {});

// Step to validate the title
Then('Title should contain "Personal Portfolio"', async () => {
  const title = await page.title();
  if (!title.includes("Personal Portfolio")) {
    throw new Error('Title does not contain "Personal Portfolio"');
  }
});

// Step to check the visibility of a navbar link
When("I look for the {string} link in the navbar", async (linkName: string) => {
  const link = await page.locator(`a:has-text("${linkName}")`);
  const isVisible = await link.isVisible();
  if (!isVisible) {
    throw new Error(`Link '${linkName}' is not visible`);
  }
});

// Step to click a navbar link and check the section
When("I click on the {string} link in the navbar", async (linkName: string) => {
  let link: any;
  if (linkName === "Portfolio") {
    link = await page.locator('a[href="#portfolio"]:has-text("Portfolio")');
  } else {
    link = await page.locator(`a:has-text("${linkName}")`);
  }
  const isEnabled = await link.isEnabled();
  const isVisible = await link.isVisible();
  if (!isVisible || !isEnabled) {
    throw new Error(`Link '${linkName}' is either not enabled or not visible`);
  }
  await link.click();
  await page.waitForTimeout(1000);

  try {
    let sectionLocator;

    if (linkName === "About") {
      sectionLocator = await page.locator('h2:has-text("About Me")');
    } else if (linkName === "Services") {
      sectionLocator = await page.locator('h2:has-text("Services")');
    } else if (linkName === "Contact") {
      sectionLocator = await page.locator('h2:has-text("Contact Me")');
    } else if (linkName === "Portfolio") {
      sectionLocator = await page.locator('h2:has-text("Latest Projects")');
    } else {
      throw new Error(`No section defined for the link: ${linkName}`);
    }

    await sectionLocator.waitFor({ state: "visible", timeout: 20000 });
  } catch (error) {
    console.error(`Error waiting for ${linkName} section to appear:`, error);
    throw new Error(`Failed to find the section for '${linkName}'`);
  }
});

// Step to verify the visibility of the 'Home' section link in the navbar
Then("it should be visible", async () => {
  const homeLink = await page.locator('a:has-text("Home")');
  const isVisible = await homeLink.isVisible();
  if (!isVisible) {
    throw new Error("Home link is not visible");
  }
});

// Step to verify the About section
Then("I should see the About section", async () => {
  const aboutSection = await page.locator("#about");
  const isVisible = await aboutSection.isVisible();
  if (!isVisible) {
    throw new Error("About section is not visible");
  }
});

When("I click on the Read More button in About section", async () => {
  const readMoreButton = page.locator('a.btn[href="about-me.html"]');

  // Ensure the button is visible and enabled
  const isVisible = await readMoreButton.isVisible();
  const isEnabled = await readMoreButton.isEnabled();
  if (!isVisible || !isEnabled) {
    throw new Error("Read More button is not visible or enabled.");
  }

  await readMoreButton.click();
  await page.waitForLoadState("domcontentloaded"); // Wait for navigation to complete
});

Then("I see detailed About section and return to homepage", async () => {
  // Verify the About section is visible on the new page
  const aboutHeading = page.locator("h1:has-text('About Me')");
  if (!(await aboutHeading.isVisible())) {
    throw new Error("Detailed About section is not visible.");
  }
  const homeLink = page.locator('a[href="index.html"]');
  await homeLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  if (!(await homeLink.isVisible())) {
    throw new Error("Home link is not visible on the page.");
  }
  await homeLink.click({ force: true });
  await page.waitForLoadState("domcontentloaded"); // Wait for homepage to load

  // Verify we are back on the homepage by checking the URL
  const currentUrl = await page.url();
  if (!currentUrl.endsWith("/index.html")) {
    throw new Error(
      "Failed to return to the homepage. Current URL: " + currentUrl
    );
  }
});

Then("I should see the Services section", async () => {
  const serviceSection = await page.locator("#services");
  const isVisible = await serviceSection.isVisible();
  if (!isVisible) {
    throw new Error("Service section is not visible");
  }
});
Then("I should see the Portfolio section", async () => {
  const portfolioSection = await page.locator("#portfolio");
  const isVisible = await portfolioSection.isVisible();
  if (!isVisible) {
    throw new Error("Portfolio section is not visible");
  }
});
Then("I should see the Contact section", async () => {
  const contactSection = await page.locator("#contact");
  const isVisible = await contactSection.isVisible();
  if (!isVisible) {
    throw new Error("About section is not visible");
  }
});

// Step to click on the Facebook social media icon and then return to the homepage
When("I click on the Facebook social media icon", async () => {
  const facebookIcon = await page.locator('a[href*="facebook.com"]');
  await facebookIcon.waitFor({ state: "visible", timeout: 10000 });
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle" }),
    facebookIcon.click(),
  ]);
});

Then("I should be redirected to Facebook and return to homepage", async () => {
  const currentUrl = await page.url();
  if (!currentUrl.includes("facebook.com")) {
    throw new Error(
      "Redirection to Facebook failed, current URL is: " + currentUrl
    );
  }
  // After Facebook, go back to the homepage
  await page.goBack();
  const homepageUrl = await page.url();
  if (!homepageUrl.includes("personal-portfoli-9.vercel.app")) {
    throw new Error(
      "Failed to return to the homepage. Current URL: " + homepageUrl
    );
  }
});

When("I click on the Instagram social media icon", async () => {
  const instaIcon = await page.locator('a[href*="instagram.com"]');
  await instaIcon.waitFor({ state: "visible", timeout: 10000 });
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle" }),
    instaIcon.click(),
  ]);
});

Then("I should be redirected to Instagram and return to homepage", async () => {
  const currentUrl = await page.url();
  if (!currentUrl.includes("instagram.com")) {
    throw new Error(
      "Redirection to Instagram failed, current URL is: " + currentUrl
    );
  }

  await page.goBack();
  const homepageUrl = await page.url();
  if (!homepageUrl.includes("personal-portfoli-9.vercel.app")) {
    throw new Error(
      "Failed to return to the homepage. Current URL: " + homepageUrl
    );
  }
});

When("I click on the LinkedIn social media icon", async () => {
  const linkedInIcon = await page.locator('a[href*="linkedin.com"]');
  await linkedInIcon.waitFor({ state: "visible", timeout: 10000 });
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle" }),
    linkedInIcon.click(),
  ]);
});

Then("I should be redirected to LinkedIn and return to homepage", async () => {
  const currentUrl = await page.url();
  if (!currentUrl.includes("linkedin.com")) {
    throw new Error(
      "Redirection to LinkedIn failed, current URL is: " + currentUrl
    );
  }

  await page.goBack();
  const homepageUrl = await page.url();
  if (!homepageUrl.includes("personal-portfoli-9.vercel.app")) {
    throw new Error(
      "Failed to return to the homepage. Current URL: " + homepageUrl
    );
  }
});

When("I look at the footer", async () => {});

// Step to verify footer content
Then("it should contain {string}", async (expectedText: string) => {
  const footer = await page.locator(".footer-text");
  const footerText = await footer.textContent();

  if (!footerText || !footerText.includes(expectedText)) {
    throw new Error(
      `Footer text does not contain expected text: "${expectedText}"`
    );
  }
});

// Close the browser after all tests
AfterAll(async () => {
  await browser.close();
});
