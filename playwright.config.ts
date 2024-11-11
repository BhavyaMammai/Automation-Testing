import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    headless: false, // Ensure this is false so the browser is visible
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    actionTimeout: 10000, // Timeout for actions like clicks, waits
    trace: "on-first-retry",
  },
});
