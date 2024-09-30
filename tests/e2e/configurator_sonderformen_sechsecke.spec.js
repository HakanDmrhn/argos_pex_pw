import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, ignoreFacebook, checkButtonAvailability } from '../support/helpers';
let scrollToBottom = require("scroll-to-bottomjs");

test('load configurator Sonderformen - Sechsecke with Perlissimo-5125', async function ({ page }) {
    try {
        console.log("Blocking FreshChat script execution...");
        await ignoreFreshChat(page);

        console.log("Navigating to '/perlissimo-5125'...");
        await page.goto('/perlissimo-5125', { waitUntil: 'load' });
        await page.waitForFunction(() => document.fonts.ready);

        console.log("Checking if prices are loaded correctly...");
        await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-5,00/);
        await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-2,50/);

        console.log("Scrolling to the bottom of the page...");
        await page.evaluate(scrollToBottom);
        await checkButtonAvailability(page);

        console.log("Blackout YouTube...");
        await ignoreYoutube(page);

        console.log("Checking if main image is visible...");
        await expect(page.locator('#image')).toBeVisible();

        console.log("Verifying gallery images...");
        const galleryImages_count = 11;
        const galleryImages_visible = await page.locator('.small_gallery > ul > li > img:visible').count();
        console.log(`Total gallery images: ${galleryImages_count}, Visible gallery images: ${galleryImages_visible}`);
        await expect(galleryImages_count).toStrictEqual(galleryImages_visible);

        console.log("Selecting Sonderformen tab...");
        await page.getByText('Sonderformen', { exact: true }).click();

        console.log("Selecting hexagon window shape...");
        await expect(page.locator("label[for='hexagon']")).toBeVisible();
        await page.locator("label[for='hexagon']").click();

        console.log("Taking Argos screenshot: 'Sonderformen Sechsecke - Startseite mit Perlissimo-5125'...");
        await argosScreenshot(page, 'Sonderformen Sechsecke - Startseite mit Perlissimo-5125', {
            viewports: ["macbook-16", "iphone-6"]
        });

        // Stoffeigenschaften section
        const attributes = [
            "transparenz-img", "rueckseite-perlex-img", "feuchtraumgeeignet-img",
            "waschbar-img", "massanfertigung-img", "made-in-germany-img"
        ];

        for (let i = 0; i < attributes.length; i++) {
            console.log(`Hovering over attribute: ${attributes[i]}...`);
            await page.locator('#' + attributes[i]).dispatchEvent('mouseover');
            await argosScreenshot(page, `Sonderformen Sechsecke - Eigenschaft Perlissimo-5125 ${attributes[i]}`, {
                viewports: ["macbook-16", "iphone-6"]
            });
            await page.mouse.move(0, 0);
        }

        // Plisseetypen section
        const types = ["vs6", "vs6sd"];
        for (let i = 0; i < types.length; i++) {
            console.log(`Selecting plisseetype: ${types[i]}...`);
            await page.locator(`label[for=${types[i]}] > p`).click();
            await page.locator(`label[for=${types[i]}]`).hover();
            const tooltipLocatorPlisseetyp = page.locator('div.option_item_tooltip');
            await tooltipLocatorPlisseetyp.waitFor({ state: 'visible' });
            console.log(`Tooltip for Plisseetype ${types[i]} is visible.`);
            await argosScreenshot(page, `Sonderformen Sechsecke - Auswahl und Tooltip ${types[i]}`, { disableHover: false });
            await page.mouse.move(0, 0); // Move mouse away to hide the tooltip
            // Wait for tooltip to hide
            await tooltipLocatorPlisseetyp.waitFor({ state: 'hidden' });
        }



        // Befestigungen section
        const befestigungen = ["direkt_vor_der_scheibe", "am_fensterfluegel", "klemmtraeger"];
        for (let i = 0; i < befestigungen.length; i++) {
            console.log(`Selecting befestigung: ${befestigungen[i]}...`);
            await page.locator(`label[for=${befestigungen[i]}] > p`).click();
            await argosScreenshot(page, `Sonderformen Sechsecke - Auswahl Befestigung ${befestigungen[i]}`, {
                viewports: ["macbook-16", "iphone-6"]
            });
            await page.mouse.move(0, 0);
        }







        //----------------------------------- BEFESTIGUNGEN - TOOLTIPS --------------------------------------------\\

        const befestigungstypen = [
            "Befestigung direkt vor der Scheibe",
            "Befestigung am Fensterflügel",
            "Befestigung am Fensterflügel ohne Bohren mit Klemmträgern",
           ];

           for (const befestigung of befestigungstypen) {
            try {
                const LocatorBefestigung = await page.locator('li.option_item').filter({ hasText: befestigung }).first();
                await LocatorBefestigung.click;
                console.log( befestigung + ' is visible.');

                await argosScreenshot(page, 'Senkrechte Fenster - Auswahl ' + befestigung, {
                    viewports: ["macbook-16", "iphone-6"]                   
                });
                console.log(`Screenshot taken for ${befestigung}`);
                await page.mouse.move(0, 0); // Move mouse away to hide the tooltip
            } catch (error) {
                console.error(`Error while processing ${befestigung}: ${error.message}`);
            }
        }


        for (const tooltip of befestigungstypen) {
            try {
                const tooltipIconLocatorBefestigung = await page.locator('li.option_item').filter({ hasText: tooltip }).locator('div.tooltip_icon').first();
                await tooltipIconLocatorBefestigung.hover();
                const tooltipLocatorBefestigung = page.locator('li.option_item').filter({ hasText: tooltip }).locator('div.option_item_tooltip').first();
                await tooltipLocatorBefestigung.waitFor({ state: 'visible' });
                console.log('Tooltip ' + tooltip + ' is visible.');

                await argosScreenshot(page, 'Senkrechte Fenster - Tooltip Befestigung ' + tooltip, {
                    viewports: ["macbook-16", "iphone-6"],     
                    disableHover: false
                });
                console.log(`Screenshot taken for Tooltip: ${tooltip}`);

                await page.mouse.move(0, 0); // Move mouse away to hide the tooltip
                // Wait for tooltip to hide
                await tooltipLocatorBefestigung.waitFor({ state: 'hidden' });
            } catch (error) {
                console.error(`Error while processing Tooltip ${tooltip}: ${error.message}`);
            }
        }



        // Schienenfarben section
        const schienenfarben = ["weiss", "schwarzbraun", "silber", "bronze", "anthrazit"];
        for (let i = 0; i < schienenfarben.length; i++) {
            console.log(`Selecting schienenfarbe: ${schienenfarben[i]}...`);
            await page.locator(`label[for=${schienenfarben[i]}] > p`).click();
            await argosScreenshot(page, `Sonderformen Sechsecke - Auswahl Schienenfarbe ${schienenfarben[i]}`, {
                viewports: ["macbook-16", "iphone-6"]
            });
            await page.mouse.move(0, 0);
        }

        // Schienenfarben tooltips
        for (let i = 0; i < schienenfarben.length; i++) {
            console.log(`Hovering over schienenfarbe tooltip: ${schienenfarben[i]}...`);
            await page.locator(`label[for=${schienenfarben[i]}] + div.tooltip_icon`).hover();
            await argosScreenshot(page, `Sonderformen Sechsecke - Tooltip Schienenfarbe ${schienenfarben[i]}`, { disableHover: false });
            await page.mouse.move(0, 0);
        }

        // Bediengriffe section
        console.log("Selecting Standard bediengriff...");
        await page.locator("label[for='standard'] > p").click();
        await argosScreenshot(page, 'Sonderformen Sechsecke - Bediengriff Standard', {
            viewports: ["macbook-16", "iphone-6"]
        });

        console.log("Switching to Design bediengriff...");
        await page.locator("label[for='design'] > p").click();
        await argosScreenshot(page, 'Sonderformen Sechsecke - Bediengriff Design', {
            viewports: ["macbook-16", "iphone-6"]
        });

        console.log("Hovering over Standard bediengriff tooltip...");
        await page.locator("label[for='standard'] + div.tooltip_icon").hover();
        await argosScreenshot(page, 'Sonderformen Sechsecke - Tooltip Bediengriff Standard', { disableHover: false });

        console.log("Hovering over Design bediengriff tooltip...");
        await page.locator("label[for='design'] + div.tooltip_icon").hover();
        await argosScreenshot(page, 'Sonderformen Sechsecke - Tooltip Bediengriff Design', { disableHover: false });

        // Bedienstäbe section
        console.log("Opening Bedienstäbe dropdown...");
        await page.locator("#bedienstab_select").click();
        await argosScreenshot(page, 'Sonderformen Sechsecke - Bedienstäbe', { fullPage: false });
        await page.locator("#bedienstab_select").click();

        console.log("Hovering over Bedienstäbe tooltip...");
        await page.locator("div.bedienstab_container div.tooltip_icon").hover();
        await argosScreenshot(page, 'Sonderformen Sechsecke - Tooltip Bedienstäbe', { disableHover: false });

    } catch (error) {
        console.error("An error occurred during the test:", error);
        throw error; // Re-throw to ensure the test fails if an error occurs
    }
});
