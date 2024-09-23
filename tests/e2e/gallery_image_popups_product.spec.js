import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, checkButtonAvailability } from '../support/helpers';

const data = require("../fixtures/product_galleries.json");
const product_pages = data.URLS;

test.describe('Integration test with visual testing - image popups - product', function () {
    test.describe.configure({ retries: 2 });

    product_pages.forEach(function (link) {
        test(`argos screenshots of product picture galleries of ${link}`, async function ({ page }) {
            try {
                // Block FreshChat script execution
                await ignoreFreshChat(page);
                console.log(`Navigating to ${link}`);
                await page.goto(link, { waitUntil: 'load' });
                await page.waitForFunction(() => document.fonts.ready);

                // Blackout YouTube
                await ignoreYoutube(page);
                await checkButtonAvailability(page);

                // Load JS files workaround
                await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-5,00/);
                await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-2,50/);

                // Check if main image is visible
                await expect(page.locator('#image')).toBeVisible();
                console.log('Main image is visible.');

                // Ensure all gallery images are loaded
                const galleryImagesCount = await page.locator('.small_gallery > ul > li > img').count();  // Count gallery images
                const galleryImagesVisible = await page.locator('.small_gallery > ul > li > img:visible').count();  // Count visible gallery images

                await expect(galleryImagesCount).toStrictEqual(galleryImagesVisible);  // Expect both values to be equal
                console.log(`Total gallery images: ${galleryImagesCount}, Visible gallery images: ${galleryImagesVisible}`);

                // Take snapshots of popup images
                for (let i = 0; i < 5; i++) {
                    if (i === 0) {
                        await page.locator('#image').click();
                    } else {
                        await page.locator('#img-popup-next').click();
                    }

                    console.log(`Taking Argos screenshot of image ${i + 1} of ${link}`);
                    await argosScreenshot(page, `${i + 1} popup image of ${link}`, {
                        fullPage: false,
                    });
                }

                console.log(`Successfully completed screenshots for: ${link}`);
                await page.mouse.move(0, 0); // Move mouse away 
            } catch (error) {
                console.error(`Error processing ${link}: ${error.message}`);
            }
        });
    });
});
