import { argosScreenshot } from "@argos-ci/playwright";
import { test } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, checkButtonAvailability } from '../support/helpers';

var data = require("../fixtures/cms_prio3.json");
var cmsPrio3_pages = data.URLS;
let scrollToBottom = require("scroll-to-bottomjs");

test.describe('Integration test with visual testing - cms prio3 pages', function () {

    cmsPrio3_pages.forEach(function (link) {
        test('load page: ' + link + ' & take argos snapshot', async function ({ page }) {
            try {
                // Block FreshChat script execution
                console.log(`Blocking FreshChat for ${link}`);
                await ignoreFreshChat(page);

                // Navigate to the URL
                console.log(`Navigating to ${link}`);
                await page.goto(link, { waitUntil: 'load' });
                console.log(`Page loaded: ${link}`);

                // Wait for fonts to be ready
                await page.waitForFunction(() => document.fonts.ready);
                console.log(`Fonts ready for ${link}`);

                // Scroll to the bottom to ensure all images are loaded
                console.log(`Scrolling to the bottom of the page for ${link}`);
                await page.evaluate(scrollToBottom);

                // Blackout YouTube videos
                await ignoreYoutube(page);
                console.log(`YouTube content ignored for ${link}`);

                // Check button availability
                await checkButtonAvailability(page);
                console.log(`Button availability checked for ${link}`);

                // Take Argos screenshot
                console.log(`Taking Argos screenshot for ${link}`);
                await argosScreenshot(page, link, {
                    viewports: [
                        "macbook-16",  // Macbook-16 viewport preset (1536 x 960)
                        "iphone-6"     // iPhone-6 viewport preset (375 x 667)
                    ]
                });

                // Move the mouse away from the page
                await page.mouse.move(0, 0);
                console.log(`Mouse moved away from the page for ${link}`);

            } catch (error) {
                // Handle and log any errors that occur
                console.error(`Error during test for ${link}: ${error.message}`);
                console.error(error.stack);
            }
        });
    });
});
