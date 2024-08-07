import { argosScreenshot } from "@argos-ci/playwright";
import { test } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, waitForAnimationEnd } from '../support/helpers';


var data = require("../fixtures/cms_prio2.json");
var cmsPrio2_pages = data.URLS;
let scrollToBottom = require("scroll-to-bottomjs");


test.describe('Integration test with visual testing - cms prio2 pages', function () {
  test.describe.configure({ retries: 2 });

    cmsPrio2_pages.forEach(function (link) {

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

            const animatedImageLocator_vs2 = page.locator('#mainimage_plisseetyp_vs2'); 
            const animatedImageLocator_vs1 = page.locator('#mainimage_plisseetyp_vs1');
  
            // Check if the elements are present before waiting for the animation to end
            if (await animatedImageLocator_vs2.isVisible()) {
             await waitForAnimationEnd(animatedImageLocator_vs2);
             await page.waitForTimeout(10000);
            }
  
           if (await animatedImageLocator_vs1.isVisible()) {
              await waitForAnimationEnd(animatedImageLocator_vs1);
            }

            // take argos screenshot
            await argosScreenshot(page, link, {
                viewports: [
                    "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                    "iphone-6" // Use device preset for iphone-6 --> 375x667
                ],
                animations: "disabled"  // because of gifs on /ratgeber/plisseetyp
            });
        });
    })
})