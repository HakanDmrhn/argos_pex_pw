import { test, expect } from '@playwright/test';
import { argosScreenshot } from "@argos-ci/playwright";
import { ignoreFreshChat, ignoreYoutube } from '../support/helpers'



test.describe('Integration test with visual testing - opened menus', function () {
  test.describe.configure({ retries: 2 });

    test('take argos screenshot of opened menus on main page', async function ({ page }) {

        //load main page
        await page.goto('/', { waitUntil: 'load' });
        await page.waitForFunction(() => document.fonts.ready);

        // blackout FreshChat
        await ignoreFreshChat(page)
        // blackout YouTube
        await ignoreYoutube(page)

        //********************** OPEN MENU PLISSEE NACH FARBEN *********************************

        // hover Plissee nach Farben
        const farbelement = await page.locator('li').filter({ hasText: ' Plissee nach Farben ' });
        await expect(farbelement).toBeVisible();
        await expect(farbelement).toBeEnabled();
        await farbelement.hover();

        // take argos screenshot
        await argosScreenshot(page, 'Menu - Plissee nach Farben', { // do not use viewport options - menu closes
            fullPage: false,
            disableHover: false
        });

        // Move mouse to a neutral position to hide the tooltip
        await page.mouse.move(0, 0);

        //********************** OPEN MENU PLISSEE FÜR RÄUME *********************************

        // hover Plissee für Räume
        const raumelement = await page.locator('li').filter({ hasText: 'Plissee für Räume' });
        await expect(raumelement).toBeVisible();
        await expect(raumelement).toBeEnabled();
        await raumelement.hover();

        // take argos screenshot
        await argosScreenshot(page, 'Menu - Plissee für Räume', { // do not use viewport options - menu closes
            fullPage: false,
            disableHover: false
        });

        await page.mouse.move(0, 0);
    });
});
