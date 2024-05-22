import { test, expect } from '@playwright/test';

var data = require("./fixtures/category_pages.json");
var categoryPages = data.URLS;
let scrollToBottom = require("scroll-to-bottomjs");


test.describe('Integration test with visual testing - category pages', function () {

    categoryPages.forEach(function (link) {

        test('load page: ' + link + ' & take argos snapshot', async function ({ page }) {

            // await page.goto(link);
            await page.goto(link);


            // // Hier scrollen wir bis zum Ende der Seite --> scroll dauert ca 20 sm --> evtl zu schnell
            // await page.evaluate(() => {
            //     window.scrollTo(0, document.body.scrollHeight);
            // });

            // Hier wird die Seite nach unten gescrollt um zu gewährleisten, dass alle Bilder geladen wurden
            await page.evaluate(scrollToBottom); // --> scroll dauert ca 1,5 sec 

            // await page.screenshot({ path: 'screenshot.png' });
            await page.screenshot({ path: 'screenshot.png', fullPage: true });

        });
    });
});
