import { argosScreenshot } from "@argos-ci/playwright";
import { test } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, checkButtonAvailability } from '../support/helpers';
import scrollToBottom from "scroll-to-bottomjs";

// Define search terms for each page
const productSearchTerms = {
    "/plissee-blau": "ozean",
    "/plissee-gelb": "1=1",
    "/ravenna-1011": "ravenna",
    "/palermo-1078": "palermo",
    "/cremona-1091": "cremona",
    "/rovereto-1141": "rovereto",
    "/bozen-1162": "bozen",
    "/peschiera-2039": "peschiera",
    "/syrakus-2079": "syrakus",
    "/duo-4010": "duo",
};

test.describe('Integration test with visual testing - search function', function () {

    Object.entries(productSearchTerms).forEach(([link, searchTerm]) => {
        test(`Load page: ${link} - Enter search term "${searchTerm}" and take Argos snapshot`, async function ({ page }) {
            try {
                // Block FreshChat script execution
                await ignoreFreshChat(page);
                await ignoreYoutube(page);
                console.log(`Navigating to ${link}`);
                await page.goto(link, { waitUntil: 'load' });
                await page.waitForFunction(() => document.fonts.ready);

                // Scroll to the bottom of the page to ensure all images are loaded
                console.log(`Scrolling to bottom of the page: ${link}`);
                await page.evaluate(scrollToBottom);

                // Blackout YouTube
                await ignoreYoutube(page);
                await checkButtonAvailability(page);

                // Enter the search term into the input field
                console.log(`Entering search term "${searchTerm}"`);
                await page.fill('#search', searchTerm);
                
                // Click the search button
                console.log(`Clicking search button`);
                await page.click('#search_form_btn');
                await page.waitForFunction(() => document.fonts.ready);

                // Take Argos screenshot
                console.log(`Taking Argos screenshot for: ${link}`);
                await argosScreenshot(page, link, {
                    viewports: [
                        "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                        "iphone-6" // Use device preset for iphone-6 --> 375x667
                    ]
                });

                await page.mouse.move(0, 0); // Move mouse away 

                console.log(`Successfully completed snapshot for: ${link}`);
            } catch (error) {
                console.error(`Error processing ${link} with search term "${searchTerm}": ${error.message}`);
            }
        });
    });
});
