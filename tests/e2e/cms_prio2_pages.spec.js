import { argosScreenshot } from "@argos-ci/playwright";
import { test } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, checkButtonAvailability, waitForAnimationEnd } from '../support/helpers';

const data = require("../fixtures/cms_prio2.json");
const cmsPrio2_pages = data.URLS;
let scrollToBottom = require("scroll-to-bottomjs");

test.describe('Integration test with visual testing - cms prio2 pages', function () {

    cmsPrio2_pages.forEach(function (link) {
        test('load page: ' + link + ' & take argos snapshot', async function ({ page }) {
            try {
                // Blackout FreshChat
                console.log(`Blackouting FreshChat for ${link}`);
                await ignoreFreshChat(page);
                await ignoreYoutube(page);

                // Navigate to the URL
                console.log(`Navigating to ${link}`);
                await page.goto(link, { waitUntil: 'load' });
                console.log(`Page loaded for ${link}`);

                // Wait for fonts to be ready
                await page.waitForFunction(() => document.fonts.ready);
                console.log(`Fonts are ready for ${link}`);

                // Scroll to the bottom to ensure all images are loaded
                console.log(`Scrolling to the bottom for ${link}`);
                await page.evaluate(scrollToBottom);

                // Ignore YouTube iframes
                await ignoreYoutube(page);
                console.log(`YouTube iframes ignored for ${link}`);

                // Check button availability
                await checkButtonAvailability(page);
                console.log(`Button availability checked for ${link}`);

                // Handle animations for images
                const animatedImageLocator_vs2 = page.locator('#mainimage_plisseetyp_vs2'); 
                const animatedImageLocator_vs1 = page.locator('#mainimage_plisseetyp_vs1');

                if (await animatedImageLocator_vs2.isVisible()) {
                    console.log(`Waiting for animation to end for vs2 image`);
                    await waitForAnimationEnd(animatedImageLocator_vs2);
                    await page.waitForTimeout(10000); // Optional additional wait
                }

                if (await animatedImageLocator_vs1.isVisible()) {
                    console.log(`Waiting for animation to end for vs1 image`);
                    await waitForAnimationEnd(animatedImageLocator_vs1);
                }

                // Take Argos screenshot
                console.log(`Taking Argos screenshot for ${link}`);
                await argosScreenshot(page, link, {
                    viewports: [
                        "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                        "iphone-6"    // Use device preset for iphone-6 --> 375 x 667
                    ],
                    animations: "disabled" // Disable animations for GIFs on /ratgeber/plisseetyp
                });

                // Move mouse away from the page after the screenshot
                await page.mouse.move(0, 0);
                console.log(`Mouse moved away from the page for ${link}`);

            } catch (error) {
                // Log the error details
                console.error(`Error during test for ${link}: ${error.message}`);
                console.error(error.stack);
            }
        });
    });
});
