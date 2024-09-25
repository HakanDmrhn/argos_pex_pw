import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, ignoreFacebook, checkButtonAvailability } from '../support/helpers';

const data = require("../fixtures/cms_prio1.json");
const cmsPrio1_pages = data.URLS;
const scrollToBottom = require("scroll-to-bottomjs");

test.describe('Integration test with visual testing - cms prio1 pages', function () {

  cmsPrio1_pages.forEach((link) => {
    test(`load page: ${link} & take argos snapshot`, async ({ page }) => {
      try {
        console.log(`Navigating to ${link}`);
        await page.goto(link, { waitUntil: 'load' });
        console.log(`Page loaded: ${link}`);
        
        await page.waitForFunction(() => document.fonts.ready);
        console.log(`Fonts ready for ${link}`);

        // Scroll to bottom of the page
        await page.evaluate(scrollToBottom);
        console.log(`Scrolled to bottom for ${link}`);

        try {
          // Blackout FreshChat
          await ignoreFreshChat(page);
        } catch (error) {
          console.error(`Error blacking out FreshChat for ${link}: ${error.message}`);
        }

        try {
          // Blackout YouTube
          await ignoreYoutube(page);
        } catch (error) {
          console.error(`Error blacking out YouTube for ${link}: ${error.message}`);
        }

        try {
          // Blackout Facebook
          await ignoreFacebook(page);
        } catch (error) {
          console.error(`Error blacking out Facebook for ${link}: ${error.message}`);
        }

        // Use the imported buttonCheck function
         await checkButtonAvailability(page);

        try {
          // Take Argos screenshot
          await argosScreenshot(page, link, {
            viewports: [
              "macbook-16", // Use device preset for macbook-16
              "iphone-6"    // Use device preset for iphone-6
            ]
          });
          console.log(`Screenshot taken for ${link}`);
          await page.mouse.move(0, 0); // Move mouse away 
          
        } catch (error) {
          console.error(`Error taking Argos screenshot for ${link}: ${error.message}`);
        }

      } catch (error) {
        console.error(`Error in test for ${link}: ${error.message}`);
        console.error(error.stack);
      }
    });
  });
});
