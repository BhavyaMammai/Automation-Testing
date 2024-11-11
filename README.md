# Automation - PLaywright (End to End) Tests
This repository contains end-to-end tests for my Personal Portfolio website which is available at (https://github.com/BhavyaMammai/Personal-portfolio) using Playwright with TypeScript. The tests are written in the Cucumber BDD style, covering navigation, link verification, section visibility, and functionality validation.
## Getting Started
These instructions will guide you to set up and run the tests on your local machine.

## Prerequisites
- Node.js (version 14 or higher)
- Playwright
- Cucumber

## Setup
1. Clone the repository
- git clone https://github.com/bhavyamammai/Automation-testing.git
- cd automation-testing
2. Install Dependencies
- npm install
3. Install playwright browsers
- npm playwright install
## Running Tests
To run the test suite, Use the below command
- npx cucumber-js --require-module ts-node/register --require src/**/*.ts
- To run in headless mode, adjust the headless option in the BeforeAll hook in your TypeScript test file or by configuring the Playwright launch options in playwright.config.ts.
## Testing Scenarios
The test suite includes various scenarios to validate the behavior and functionality of the Personal Portfolio homepage. Here are the main scenarios:

- Verify Homepage Title: Confirms the title contains "Personal Portfolio".
- Navbar Links Verification: Checks the presence and functionality of sections like Home, About, Services, Portfolio, and Contact.
- Section Navigation: Validates that clicking navbar links navigates to the correct sections on the page.
- Read More Button: Ensures the "Read More" button in the About section displays detailed information.
- Footer Verification: Checks that the footer contains the expected copyright text.
- Social Media Links: Verifies that social media icons (Facebook, Instagram, LinkedIn) redirect to the correct external pages.

