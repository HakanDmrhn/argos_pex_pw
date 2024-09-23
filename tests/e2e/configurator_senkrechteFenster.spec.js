import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, ignoreFacebook, checkButtonAvailability } from '../support/helpers';

let scrollToBottom = require("scroll-to-bottomjs");

test('load configurator Senkrechte Fenster with Liviano 4313', async function ({ page }) {
    try {
        console.log('Test started: load configurator Senkrechte Fenster with Liviano 4313');

        // Block FreshChat script execution
        await ignoreFreshChat(page);
        console.log('FreshChat script blocked');

        await page.goto('liviano-4313', { waitUntil: 'load' });
        console.log('Page loaded: liviano-4313');

        await page.waitForFunction(() => document.fonts.ready);
        console.log('Fonts ready');

        // Load JS files workaround
        await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-5,00/);
        await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-2,50/);
        console.log('Verified JS files and price amounts');

        // Scroll to bottom to ensure all resources are loaded
        await page.evaluate(scrollToBottom);
        console.log('Scrolled to the bottom of the page');

        await checkButtonAvailability(page);
        console.log('Checked button availability');

        // Blackout YouTube
        await ignoreYoutube(page);
        console.log('YouTube iframe blacked out');

        // Check if main image is visible
        await expect(page.locator('#image')).toBeVisible();
        console.log('Main image is visible');

        // Verify gallery images
        const galleryImages_count = 8; // Liviano-4313 has 9 gallery images
        const galleryImages_visible = await page.locator('.small_gallery > ul > li > img:visible').count();
        await expect(galleryImages_count).toStrictEqual(galleryImages_visible);
        console.log(`Gallery images verified. Visible: ${galleryImages_visible}, Expected: ${galleryImages_count}`);

        // Take Argos screenshots for different viewports
        await argosScreenshot(page, 'Senkrechte Fenster - Startseite mit Liviano 4313', {
            viewports: ["macbook-16", "iphone-6"]
        });
        console.log('Argos screenshot taken for start page');

        //--------------------------------- STOFF-EIGENSCHAFTEN-----------------------------------------\\

        const attributes = [
            "transparenz-img",
            "rueckseite-gleich-vorderseite-img",
            "wasser-schmutz-abweisend-img",
            "oekotex-img",
            "feuchtraumgeeignet-img",
            "massanfertigung-img",
            "made-in-germany-img"
        ];

        for (let i = 0; i < attributes.length; i++) {
            await page.locator('#' + attributes[i]).dispatchEvent('mouseover');
            await argosScreenshot(page, 'Senkrechte Fenster - Eigenschaft Meran 5076 ' + attributes[i], {
                viewports: ["macbook-16", "iphone-6"],
            });
            console.log(`Screenshot taken for attribute: ${attributes[i]}`);
            await page.mouse.move(0, 0); // Move mouse away 
        }

        //----------------------------------- PLISSEE-TYPEN-------------------------------------------\\

        // Select and verify VS1
        await page.locator('li').filter({ hasText: 'Verspannt VS1 - Plissee ist oben fest' }).click();
        await argosScreenshot(page, 'Senkrechte Fenster - Auswahl Plisseetyp - VS1', {
            viewports: ["macbook-16", "iphone-6"],
        });
        console.log('Screenshot for Plisseetyp VS1 taken');
        await page.mouse.move(0, 0); // Move mouse away 

        // Select and verify VS2
        await page.locator('li').filter({ hasText: 'Verspannt VS2 - Plissee kann' }).click();
        await argosScreenshot(page, 'Senkrechte Fenster - Auswahl Plisseetyp - VS2', {
            viewports: ["macbook-16", "iphone-6"],
        });
        console.log('Screenshot for Plisseetyp VS2 taken');
        await page.mouse.move(0, 0); // Move mouse away 

        //----------------------------------- TOOLTIP CAPTURES-------------------------------------------\\

        // Tooltip VS1
        const tooltipIconLocatorPlisseetypVS1 = page.locator('li').filter({ hasText: 'Verspannt VS1 - Plissee ist oben fest' }).locator('div.tooltip_icon');
        await tooltipIconLocatorPlisseetypVS1.hover();
        const tooltipLocatorPlisseetypVS1 = page.locator('li').filter({ hasText: 'Verspannt VS1 - Plissee ist oben fest' }).locator('div.option_item_tooltip');
        await tooltipLocatorPlisseetypVS1.waitFor({ state: 'visible' });
        console.log('Tooltip for Plisseetyp VS1 is visible.');
        await argosScreenshot(page, 'Senkrechte Fenster - Tooltip Plisseetyp VS1', { disableHover: false });
        console.log('Tooltip screenshot for VS1 taken');
        await page.mouse.move(0, 0); // Move mouse away to hide the tooltip
        // Wait for tooltip to hide
        await tooltipLocatorPlisseetypVS1.waitFor({ state: 'hidden' });

        // Tooltip VS2
        const tooltipIconLocatorPlisseetypVS2 = page.locator('li').filter({ hasText: 'Verspannt VS2 - Plissee kann' }).locator('div.tooltip_icon');
        await tooltipIconLocatorPlisseetypVS2.hover();
        const tooltipLocatorPlisseetypVS2 = page.locator('li').filter({ hasText: 'Verspannt VS2 - Plissee kann' }).locator('div.option_item_tooltip');
        await tooltipLocatorPlisseetypVS2.waitFor({ state: 'visible' });
        console.log('Tooltip for Plisseetyp VS2 is visible.');
        await argosScreenshot(page, 'Senkrechte Fenster - Tooltip Plisseetyp VS2', { disableHover: false });
        console.log('Tooltip screenshot for VS2 taken');
        await page.mouse.move(0, 0); // Move mouse away to hide the tooltip
        // Wait for tooltip to hide
        await tooltipLocatorPlisseetypVS2.waitFor({ state: 'hidden' });

        //----------------------------------- BEFESTIGUNGEN - AUSWAHL---------------------------------------------\\

        const befestigungen = [
            "direkt_vor_der_scheibe",
            "stick_fix",
            "am_fensterfluegel",
            "klemmtraeger",
            "klemmtraeger_slim",
            "stick_fix_front",
            "gelenkklebeplatten",
            "klebeleisten",
            "glasleistenwinkel",
            "falzfix"
        ];

        for (const befestigung of befestigungen) {
            try {
                // Click the option item for the given befestigung
                await page.locator("label[for=" + befestigung + "] > p").click();
                // Take a screenshot after selection
                await argosScreenshot(page, `Senkrechte Fenster - Auswahl Befestigung ${befestigung}`, {
                    viewports: ["macbook-16", "iphone-6"]
                });
                console.log(`Screenshot taken for Befestigung: ${befestigung}`);
                await page.mouse.move(0, 0); // Move mouse away 
            } catch (error) {
                console.error(`Error while processing Befestigung ${befestigung}: ${error.message}`);
            }
        }

        //----------------------------------- BEFESTIGUNGEN - TOOLTIPS --------------------------------------------\\

        const befestigungstypen = [
            "Befestigung direkt vor der Scheibe",
            "Befestigung direkt vor der Scheibe ohne Bohren mit innovativer Klebetechnik",
            "Befestigung am Fensterflügel",
            "Befestigung am Fensterflügel ohne Bohren mit Klemmträgern",
            "Befestigung am Fensterflügel ohne Bohren mit Klemmträgern Slim",
            "Befestigung direkt vor der Scheibe ohne Bohren mit Stick & Fix Front",
            "Befestigung direkt vor der Scheibe mit Gelenkklebeplatten",
            "Befestigung mit Klebeleisten direkt auf der Scheibe ohne Bohren",
            "Befestigung am Fensterflügel mit Glasleistenwinkeln",
            "Befestigung direkt vor der Scheibe ohne Bohren mit Falzfix"
        ];

        for (const befestigung of befestigungstypen) {
            try {
                const tooltipIconLocatorBefestigung = await page.locator('li.option_item').filter({ hasText: befestigung }).locator('div.tooltip_icon').first();
                await tooltipIconLocatorBefestigung.hover();
                const tooltipLocatorBefestigung = page.locator('li.option_item').filter({ hasText: befestigung }).locator('div.option_item_tooltip').first();
                await tooltipLocatorBefestigung.waitFor({ state: 'visible' });
                console.log('Tooltip ' + befestigung + ' is visible.');

                await argosScreenshot(page, 'Senkrechte Fenster - Tooltip Befestigung ' + befestigung, {
                    disableHover: false
                });
                console.log(`Screenshot taken for Tooltip: ${befestigung}`);

                await page.mouse.move(0, 0); // Move mouse away to hide the tooltip
                // Wait for tooltip to hide
                await tooltipLocatorBefestigung.waitFor({ state: 'hidden' });
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
                await page.locator('label').filter({ hasText: farbe }).click();
                
                // Take a screenshot for the selected color
                await argosScreenshot(page, `Senkrechte Fenster - Auswahl Schienenfarbe ${farbe}`, {
                    viewports: ["macbook-16", "iphone-6"]
                });
        
                // Tooltip interaction
                const tooltipIconSchienenfarbe = page.locator('li').filter({ hasText: farbe }).locator('div.tooltip_icon');
                await tooltipIconSchienenfarbe.hover();
        
                const tooltipLocatorSchienenfarbe = page.locator('li').filter({ hasText: farbe }).locator('div.option_item_tooltip');
                await tooltipLocatorSchienenfarbe.waitFor({ state: 'visible' });
                console.log('Tooltip ' + schienenfarbe + ' is visible.');

                // Take a screenshot for the tooltip
                await argosScreenshot(page, `Senkrechte Fenster - Tooltip Schienenfarbe ${farbe}`, {
                    disableHover: false
                });
                console.log(`Screenshot taken for Tooltip: ${farbe}`);

                await page.mouse.move(0, 0); // Move mouse away to hide the tooltip
                // Wait for tooltip to hide
                await tooltipLocatorSchienenfarbe.waitFor({ state: 'hidden' });
        
            } catch (error) {
                console.error(`Error processing ${schienenfarbe}: ${error.message}`);
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
                await page.locator('label').filter({ hasText: griff }).click();
                
                // Take a screenshot for the selected color
                await argosScreenshot(page, `Senkrechte Fenster - Auswahl Schienenfarbe ${griff}`, {
                    viewports: ["macbook-16", "iphone-6"]
                });

                // Tooltip interaction
                const tooltipIconBediengriff = page.locator('li').filter({ hasText: griff }).locator('div.tooltip_icon');
                await tooltipIconBediengriff.hover();

                const tooltipLocatorBediengriff = page.locator('li').filter({ hasText: griff }).locator('div.option_item_tooltip');
                await tooltipLocatorBediengriff.waitFor({ state: 'visible' });
                console.log('Tooltip ' + griff + ' is visible.');

                // Take a screenshot for the tooltip
                await argosScreenshot(page, `Senkrechte Fenster - Tooltip Bediengriff ${griff}`, {
                    disableHover: false
                });
                console.log(`Screenshot taken for Tooltip: ${griff}`);

                await page.mouse.move(0, 0); // Move mouse away to hide the tooltip

                // Wait for tooltip to hide
                await tooltipLocatorBediengriff.waitFor({ state: 'hidden' });
            } catch (error) {
                console.error(`Error processing ${griff}: ${error.message}`);
            }
        }
    } catch (error) {
        console.error(`Overall test error: ${error.message}`);
    }
});
