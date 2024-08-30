import { test } from '@playwright/test';
import { argosScreenshot } from "@argos-ci/playwright";
import { ignoreFreshChat, ignoreYoutube, ignoreFacebook, checkButtonAvailability } from '../support/helpers';



test.describe('Integration test with visual testing - opened menus', function () {
  test.describe.configure({ retries: 2 });

    test('take argos screenshot of opened menus on main page', async function ({ page }) {

        // block FreshChat script execution
        await ignoreFreshChat(page);
        await page.goto('/', { waitUntil: 'load' });
        await page.waitForFunction(() => document.fonts.ready);

        // blackout YouTube
        await ignoreYoutube(page)
        await checkButtonAvailability(page);

        //********************** OPEN MENU PLISSEE NACH FARBEN *********************************

        // hover Plissee nach Farben
        await page.locator('li').filter({ hasText: ' Plissee nach Farben ' }).hover()

        // take argos screenshot
        await argosScreenshot(page, 'Menu - Plissee nach Farben', { // do not use viewport options - menu closes
            fullPage: false,
            disableHover: false
        });

        //********************** OPEN MENU PLISSEE FÜR RÄUME *********************************

        // hover Plissee für Räume
        await page.locator('li').filter({ hasText: 'Plissee für Räume' }).hover()
        // take argos screenshot
        await argosScreenshot(page, 'Menu - Plissee für Räume', { // do not use viewport options - menu closes
            fullPage: false,
            disableHover: false
        });
    });
});
