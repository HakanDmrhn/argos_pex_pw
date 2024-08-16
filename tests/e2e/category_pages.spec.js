import { argosScreenshot } from "@argos-ci/playwright";
import { test, chromium } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube } from '../support/helpers';

var data = require("../fixtures/category_pages.json");
var categoryPages = data.URLS;
let scrollToBottom = require("scroll-to-bottomjs");

test.describe('Integration test with visual testing - category pages', function () {
  test.describe.configure({ retries: 2, timeout: 120000 });

  categoryPages.forEach(function (link) {
    test('load page: ' + link + ' & take argos snapshot', async function () {
      const browser = await chromium.launch({
        headless: true,
        args: ['--disable-gpu', '--no-sandbox']
      });
      const context = await browser.newContext({
        userAgent: 'testing_agent_visual',
      });
      const page = await context.newPage();

      try {
        console.log(`Navigating to ${link}`);
        await page.goto(link, { waitUntil: 'networkidle' });
        console.log(`Page loaded: ${link}`);
        await page.waitForFunction(() => document.fonts.ready);
        console.log(`Fonts ready for ${link}`);

        await page.evaluate(scrollToBottom);
        console.log(`Scrolled to bottom for ${link}`);

        await ignoreFreshChat(page);
        await ignoreYoutube(page);

        console.log(`Taking screenshot for ${link}`);
        await argosScreenshot(page, link, {
          viewports: [
            "macbook-16",
            "iphone-6"
          ]
        });
      } catch (error) {
        console.error(`Error in test for ${link}: ${error}`);
      } finally {
        await context.close();
        await browser.close();
      }
    });
  });
});
