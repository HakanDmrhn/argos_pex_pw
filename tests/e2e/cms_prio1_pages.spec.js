import { argosScreenshot } from "@argos-ci/playwright";
import { test } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, ignoreFacebook } from '../support/helpers'

var data = require("../fixtures/cms_prio1.json");
var cmsPrio1_pages = data.URLS;
let scrollToBottom = require("scroll-to-bottomjs");


test.describe('Integration test with visual testing - cms prio1 pages', function () {
  test.describe.configure({ retries: 2 });

    cmsPrio1_pages.forEach(function (link) {

        test('load page: ' + link + ' & take argos snapshot', async function ({ page }) {

            // visit url
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

            // blackout FreshChat
            await ignoreFreshChat(page)
            // blackout YouTube
            await ignoreYoutube(page)
            // blackout Facebbok icon
            await ignoreFacebook(page)

            // take argos screenshot
            await argosScreenshot(page, link, {
                viewports: [
                    "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                    "iphone-6" // Use device preset for iphone-6 --> 375x667
                ]
            });
        });
    })
})