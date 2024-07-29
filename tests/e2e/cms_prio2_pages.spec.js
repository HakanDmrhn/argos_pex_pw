import { argosScreenshot } from "@argos-ci/playwright";
import { test } from '@playwright/test';
import Freezeframe from 'freezeframe';
import { ignoreFreshChat, ignoreYoutube } from '../support/helpers';

const data = require("../fixtures/cms_prio2.json");
const cmsPrio2_pages = data.URLS;
const scrollToBottom = require("scroll-to-bottomjs");

test.describe('Integration test with visual testing - cms prio2 pages', () => {

    cmsPrio2_pages.forEach(link => {

        test(`load page: ${link} & take argos snapshot`, async ({ page }) => {

            // visit URL
            await page.goto(link);

            // Scroll to the bottom to ensure all images are loaded
            await page.evaluate(scrollToBottom);

            // Blackout FreshChat
            await ignoreFreshChat(page);
            // Blackout YouTube
            await ignoreYoutube(page);

            // Setup Freezeframe instance with custom selector and options
            const animated_vs2 = new Freezeframe('#mainimage_plisseetyp_vs2', {
                trigger: false
            });

            const animated_vs1 = new Freezeframe('#mainimage_plisseetyp_vs1', {
                trigger: false
            });

            animated_vs2.stop(); // Stop animation
            animated_vs1.stop(); // Stop animation

            // Wait a moment to ensure GIFs are reset to the first frame
            await page.waitForTimeout(500);

            // Take Argos screenshot
            await argosScreenshot(page, link, {
                viewports: [
                    "macbook-16", // Device preset for macbook-16 --> 1536 x 960
                    "iphone-6" // Device preset for iphone-6 --> 375x667
                ],
                animations: "disabled" // Disable animations
            });

        });
    });
});
