import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube } from '../support/helpers'

var data = require("../fixtures/zubehoer_galleries.json");
var zubehoer_pages = data.URLS;


test.describe('Integration test with visual testing - image popups - zubehoer', function () {
  test.describe.configure({ retries: 2 });

    zubehoer_pages.forEach(function (link) {

        test('argos screenshots of zubehoer picture galleries of ' + link, async function ({ page }) {

            // visit url
            await page.goto(link, { waitUntil: 'load' });
            await page.waitForFunction(() => document.fonts.ready);

            // blackout FreshChat
            await ignoreFreshChat(page)
            // blackout YouTube
            await ignoreYoutube(page)

            // check if main image is visible
            await expect(page.locator('#image')).toBeVisible();

            // --------------- BE SURE THAT ALL GALLERY IMAGES ARE LOADED ------------------------\\
            // get count of total gallery images and compare with visible number of gallery images
            const galleryImages_count = await page.locator('.small_gallery > ul > li > img').count()  // count gallery images
            const galleryImages_visible = await page.locator('.small_gallery > ul > li > img:visible').count()  // count the VISIBLE gallery images

            await expect(galleryImages_count).toStrictEqual(galleryImages_visible)  // expect both values to be equal

            // await console.log('total gallery images of ' + link + ' = ' + galleryImages_count)
            // await console.log('visible gallery images of ' + link + ' = ' + galleryImages_visible)


            // take snapshot of first image
            await page.locator('#image').click();
            await argosScreenshot(page, '1st popup image of ' + link, {
                fullPage: false,
            });

            // take snapshot of second image
            await page.locator('#img-popup-next').click();
            await argosScreenshot(page, '2nd popup image of ' + link, {
                fullPage: false,
            });

            // take snapshot of third image
            await page.locator('#img-popup-next').click();
            await argosScreenshot(page, '3rd popup image of ' + link, {
                fullPage: false,
            });

            // take snapshot of fourth image
            await page.locator('#img-popup-next').click();
            await argosScreenshot(page, '4th popup image of ' + link, {
                fullPage: false,
            });
        });
    });
});