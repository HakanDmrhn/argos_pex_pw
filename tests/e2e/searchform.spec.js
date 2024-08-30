import { argosScreenshot } from "@argos-ci/playwright";
import { test } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, ignoreFacebook, checkButtonAvailability } from '../support/helpers';

let scrollToBottom = require("scroll-to-bottomjs");

// Define search terms for each page
const productSearchTerms = {
    "/ravenna-1011": "ravenna",
    "/palermo-1078": "palermo",
    "/cremona-1091": "cremona",
    "/rovereto-1141": "rovereto",
    "/bozen-1162": "bozen",
    "/peschiera-2039": "peschiera",
    "/syrakus-2079": "syrakus",
    "/duo-4010": "duo",
    "/": "ozean",
    "/": "1=1"
};


test.describe('Integration test with visual testing - search function', function () {
    test.describe.configure({ retries: 2 });

    Object.entries(productSearchTerms).forEach(([link, searchTerm]) => {

        test(`Load page: ${link} - Enter search term "${searchTerm}" and take Argos snapshot`, async function ({ page }) {
          
            // block FreshChat script execution
            await ignoreFreshChat(page);
            console.log(`Navigating to ${link}`);
            await page.goto(link, { waitUntil: 'load' });
            await page.waitForFunction(() => document.fonts.ready);

            // Hier wird die Seite nach unten gescrollt um zu gewährleisten, dass alle Bilder geladen wurden
            // await page.evaluate(() => {
            //     window.scrollTo(0, document.body.scrollHeight);
            // });
            // --> dieser Schritt dauert ca 20 ms und ist wohlmöglich zu schnell (fehlende Bilder)
            // --> stattdessen scrollToBottom verwenden (s.u.)

            // Hier wird die Seite nach unten gescrollt um zu gewährleisten, dass alle Bilder geladen wurden
            await page.evaluate(scrollToBottom); // --> scroll dauert ca 1,5 sec 

            // blackout YouTube
            await ignoreYoutube(page)
            await checkButtonAvailability(page);
            
            // Enter the search term into the input field
            await page.fill('#search', searchTerm);
            // Click the search button
            await page.click('#search_form_btn');
            await page.waitForFunction(() => document.fonts.ready);

            // take argos screenshot
            await argosScreenshot(page, link, {
                viewports: [
                    "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                    "iphone-6" // Use device preset for iphone-6 --> 375x667
                ]
            });
        });
    });
});
