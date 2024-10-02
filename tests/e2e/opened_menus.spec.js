import { test } from '@playwright/test';
import { argosScreenshot } from "@argos-ci/playwright";
import { ignoreYoutubeAndFreshchat, checkButtonAvailability } from '../support/helpers';

test.describe('Integration test with visual testing - opened menus', function () {


    test('take argos screenshot of opened menus on main page', async function ({ page }) {
        try {
            // Block FreshChat script execution
            await ignoreYoutubeAndFreshchat(page);
            console.log('Navigating to the main page');
            await page.goto('/', { waitUntil: 'load' });
            await page.waitForFunction(() => document.fonts.ready);
            await checkButtonAvailability(page);

            //********************** OPEN MENU PLISSEE NACH FARBEN *********************************

            console.log('Hovering over "Plissee nach Farben" menu');
            await page.locator('li').filter({ hasText: ' Plissee nach Farben ' }).hover();
            console.log('Taking Argos screenshot for "Plissee nach Farben" menu');
            await argosScreenshot(page, 'Menu - Plissee nach Farben', {
                fullPage: false,
                disableHover: false
            });

            await page.mouse.move(0, 0); // Move mouse away 

            //********************** OPEN MENU PLISSEE FÜR RÄUME *********************************

            console.log('Hovering over "Plissee für Räume" menu');
            await page.locator('li').filter({ hasText: 'Plissee für Räume' }).hover();
            console.log('Taking Argos screenshot for "Plissee für Räume" menu');
            await argosScreenshot(page, 'Menu - Plissee für Räume', {
                fullPage: false,
                disableHover: false
            });

            console.log('Successfully completed screenshot of opened menus');
        } catch (error) {
            console.error(`Error during menu screenshot process: ${error.message}`);
        }
    });
});
