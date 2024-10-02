import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, checkButtonAvailability } from '../support/helpers';

// Assuming cmsPrio1_pages is defined correctly in JSON format in cms_prio1_II.json
const data = require("../fixtures/cms_prio1_II.json");
const cmsPrio1_pages = data.URLS;
let scrollToBottom = require("scroll-to-bottomjs");

test.describe('Integration test with visual testing - cms prio1 pages without freshchat icon', () => {

    cmsPrio1_pages.forEach(function (link) {
        test('load page: ' + link + ' & take argos snapshot', async function ({ page }) {

            try {
                // Block FreshChat script execution
                await ignoreFreshChat(page);
                await ignoreYoutubeAndFreshchat(page);
                console.log(`Navigating to ${link}\n`);     
                await page.goto(link, { waitUntil: 'load' });
                console.log(`Page loaded: ${link}`);

                // Wait for fonts to be ready
                await page.waitForFunction(() => document.fonts.ready);
                console.log(`Fonts ready for ${link}`);

                // Scroll to the bottom of the page
                await page.evaluate(scrollToBottom);
                console.log(`Scrolled to bottom for ${link}`);

                // Log the custom user agent and verify it
                const userAgent = await page.evaluate(() => navigator.userAgent);
                console.log(`Custom User Agent for ${link}: ${userAgent}`);
                expect(userAgent).toContain('testing_agent_visual');

                // Check button availability
                await checkButtonAvailability(page);
                console.log('Button availability checked.');

                // Take the screenshot using Argos
                console.log(`Taking screenshot for ${link}`);
                await argosScreenshot(page, link, {
                    viewports: [
                        "macbook-16", // Use device preset for macbook-16
                        "iphone-6"    // Use device preset for iphone-6
                    ]
                });
                await page.mouse.move(0, 0); // Move mouse away 
                console.log(`Screenshot taken for ${link}.\n`);

            } catch (error) {
                console.error(`Error in test for ${link}: ${error.message}`);
                console.error(error.stack);
            }
        });
    });
});
