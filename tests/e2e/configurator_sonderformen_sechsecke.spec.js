import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, checkButtonAvailability } from '../support/helpers';
const scrollToBottom = require("scroll-to-bottomjs");

test('load configurator Sonderformen - Sechsecke with Perlissimo-5125', async function({ page}) {
    try {
        console.log("Blocking FreshChat script execution...");
        await ignoreFreshChat(page);

        console.log("Navigating to '/perlissimo-5125'...");
        await page.goto('/perlissimo-5125', {
            waitUntil: 'load'
        });
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
        await page.getByText('Sonderformen', {
            exact: true
        }).click();

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
            await tooltipLocatorPlisseetyp.waitFor({
                state: 'visible'
            });
            console.log(`Tooltip for Plisseetype ${types[i]} is visible.`);
            await argosScreenshot(page, `Sonderformen Sechsecke - Auswahl und Tooltip Plisseetyp ${types[i]}`, {
                disableHover: false
            });
            await page.mouse.move(0, 0); // Move mouse away to hide the tooltip
            // Wait for tooltip to hide
            await tooltipLocatorPlisseetyp.waitFor({
                state: 'hidden'
            });
        }


        //----------------------------------- BEFESTIGUNGEN & TOOLTIPS --------------------------------------------\\

        const befestigungstypen = [
            "Befestigung direkt vor der Scheibe",
            "Befestigung am Fensterflügel",
            "Befestigung am Fensterflügel ohne Bohren mit Klemmträgern",
        ];


        for (const befestigung of befestigungstypen) {
            try {
                const LocatorBefestigung = await page.locator('li.option_item').filter({
                    hasText: befestigung
                }).first();
                await LocatorBefestigung.click();
                await argosScreenshot(page, 'Sonderformen Sechsecke - Auswahl ' + befestigung, {
                    viewports: ["macbook-16", "iphone-6"]
                });
                console.log(`Screenshot taken for: ${befestigung}`);
                await page.mouse.move(0, 0); // Move mouse away to hide the tooltip
            } catch (error) {
                console.error(`Error while processing Tooltip ${befestigung}: ${error.message}`);
            }
        }



        for (const befestigung of befestigungstypen) {
            try {
                const tooltipIconLocatorBefestigung = await page.locator('li.option_item').filter({
                    hasText: befestigung
                }).locator('div.tooltip_icon').first();
                await tooltipIconLocatorBefestigung.hover();
                const tooltipLocatorBefestigung = page.locator('li.option_item').filter({
                    hasText: befestigung
                }).locator('div.option_item_tooltip').first();
                await tooltipLocatorBefestigung.waitFor({
                    state: 'visible'
                });
                console.log('Tooltip ' + befestigung + ' is visible.');

                await argosScreenshot(page, 'Sonderformen Sechsecke - Tooltip ' + befestigung, {
                    disableHover: false,
                });
                console.log(`Screenshot taken for Tooltip: ${befestigung}`);

                await page.mouse.move(0, 0); // Move mouse away to hide the tooltip
                // Wait for tooltip to hide
                await tooltipLocatorBefestigung.waitFor({
                    state: 'hidden'
                });
            } catch (error) {
                console.error(`Error while processing Tooltip ${befestigung}: ${error.message}`);
            }
        }


        //----------------------------------- SCHIENENFARBEN - AUSWAHL --------------------------------------------\\

        const schienenfarben = [
            "weiß",
            "schwarzbraun",
            "silber",
            "bronze",
            "anthrazit"
        ];


        for (const farbe of schienenfarben) {
            try {
                // Click on the color label
                await page.locator('label').filter({
                    hasText: farbe
                }).click();

                // Take a screenshot for the selected color
                await argosScreenshot(page, `Sonderformen Sechsecke - Auswahl Schienenfarbe ${farbe}`, {
                    viewports: ["macbook-16", "iphone-6"]
                });

                // Tooltip interaction
                const tooltipIconSchienenfarbe = page.locator('li').filter({
                    hasText: farbe
                }).locator('div.tooltip_icon');
                await tooltipIconSchienenfarbe.hover();

                const tooltipLocatorSchienenfarbe = page.locator('li').filter({
                    hasText: farbe
                }).locator('div.option_item_tooltip');
                await tooltipLocatorSchienenfarbe.waitFor({
                    state: 'visible'
                });
                console.log('Tooltip ' + farbe + ' is visible.');

                // Take a screenshot for the tooltip
                await argosScreenshot(page, `Sonderformen Sechsecke - Tooltip Schienenfarbe ${farbe}`, {
                    disableHover: false
                });
                console.log(`Screenshot taken for Tooltip: ${farbe}`);

                await page.mouse.move(0, 0); // Move mouse away to hide the tooltip
                // Wait for tooltip to hide
                await tooltipLocatorSchienenfarbe.waitFor({
                    state: 'hidden'
                });

            } catch (error) {
                console.error(`Error processing ${farbe}: ${error.message}`);
            }
        }



        //----------------------------------- BEDIENGRIFFE - AUSWAHL ---------------------------------------------\\

        const bediengriffe = [
            "Standard",
            "Design",
        ];

        for (const griff of bediengriffe) {
            try {
                // Click on the color label
                await page.locator('label').filter({
                    hasText: griff
                }).click();

                // Take a screenshot for the selected color
                await argosScreenshot(page, `Sonderformen Sechsecke - Auswahl Bediengriff ${griff}`, {
                    viewports: ["macbook-16", "iphone-6"]
                });
                console.log(`Screenshot taken for Bediengriff: ${griff}`);

                // Tooltip interaction
                const tooltipIconBediengriff = page.locator('li').filter({
                    hasText: griff
                }).locator('div.tooltip_icon');
                await tooltipIconBediengriff.hover();

                const tooltipLocatorBediengriff = page.locator('li').filter({
                    hasText: griff
                }).locator('div.option_item_tooltip');
                await tooltipLocatorBediengriff.waitFor({
                    state: 'visible'
                });
                console.log('Tooltip ' + griff + ' is visible.');

                // Take a screenshot for the tooltip
                await argosScreenshot(page, `Sonderformen Sechsecke - Tooltip Bediengriff ${griff}`, {
                    disableHover: false
                });
                console.log(`Screenshot taken for Tooltip: ${griff}`);

                await page.mouse.move(0, 0); // Move mouse away to hide the tooltip

                // Wait for tooltip to hide
                await tooltipLocatorBediengriff.waitFor({
                    state: 'hidden'
                });
            } catch (error) {
                console.error(`Error processing ${griff}: ${error.message}`);
            }
        }


        await page.mouse.move(0, 0); // Move mouse away to hide the tooltip    

        // capture Bedienstab
        // open Bedienstäbe & take argos screenshot
        const bedienstabLocator = page.getByRole('combobox', {
            id: 'bedienstab_select'
        });
        await expect(bedienstabLocator).toBeVisible();
        await bedienstabLocator.click();
        await argosScreenshot(page, 'Sonderformen Sechsecke - Dropdown Bedienstab', {
            fullPage: false
        }) // do not use viewport options - dropdown closes 
        await bedienstabLocator.click(); // close dropdown menu
        await page.mouse.move(0, 0);
        // hover on Bedienstab info
        await page.locator("div.bedienstab_container div.tooltip_icon").hover()

        // take screenshot
        await argosScreenshot(page, 'Sonderformen Sechsecke - Tooltip Bedienstäbe', { // do not use viewport options - tooltip disappears
            disableHover: false
        });



    } catch (error) {
        console.error("An error occurred during the test:", error);
        throw error; // Re-throw to ensure the test fails if an error occurs
    }
});