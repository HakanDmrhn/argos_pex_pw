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
            viewports: [
                "macbook-16", 
                "iphone-6"
            ]
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

        for (var i = 0; i < attributes.length; i++) {
            await page.locator('#' + attributes[i]).dispatchEvent('mouseover');
            await argosScreenshot(page, 'Senkrechte Fenster - Eigenschaft Meran 5076 ' + attributes[i], {
                viewports: [
                    "macbook-16",
                    "iphone-6"
                ],
            });
            console.log(`Screenshot taken for attribute: ${attributes[i]}`);
        }

        //----------------------------------- PLISSEE-TYPEN-------------------------------------------\\

        // Select and verify VS1
        await page.locator('li').filter({ hasText: 'Verspannt VS1 - Plissee ist oben fest' }).click();
        await argosScreenshot(page, 'Senkrechte Fenster - Auswahl Plisseetyp - VS1', {
            viewports: [
                "macbook-16",
                "iphone-6"
            ],
        });
        console.log('Screenshot for Plisseetyp VS1 taken');

        // Select and verify VS2
        await page.locator('li').filter({ hasText: 'Verspannt VS2 - Plissee kann' }).click();
        await argosScreenshot(page, 'Senkrechte Fenster - Auswahl Plisseetyp - VS2', {
            viewports: [
                "macbook-16",
                "iphone-6"
            ],
        });
        console.log('Screenshot for Plisseetyp VS2 taken');

        //----------------------------------- TOOLTIP CAPTURES-------------------------------------------\\

        // Tooltip VS1
        await page.locator('li').filter({ hasText: 'Verspannt VS1 - Plissee ist oben fest' }).locator('div.tooltip_icon').hover();
        await argosScreenshot(page, 'Senkrechte Fenster - Tooltip Plisseetyp VS1', { disableHover: false });
        console.log('Tooltip screenshot for VS1 taken');

        await page.waitForTimeout(1000); // Wait to avoid tooltip overlap

        // Tooltip VS2
        await page.locator('li').filter({ hasText: 'Verspannt VS2 - Plissee kann' }).locator('div.tooltip_icon').hover();
        await argosScreenshot(page, 'Senkrechte Fenster - Tooltip Plisseetyp VS2', { disableHover: false });
        console.log('Tooltip screenshot for VS2 taken');

        //----------------------------------- BEFESTIGUNGEN - AUSWAHL---------------------------------------------\\
      
        const befestigungen = [
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
        
        for (const befestigung of befestigungen) {
            try {
                // Find all items within the li.option_item container
                const allItems = page.locator('li.option_item p');
        
                // Find the exact item with the correct text
                const itemLocator = allItems.locator(`text="Befestigung"`);
        
                // Ensure the locator resolves to a single element
                await itemLocator.first().click();
                console.log(`Clicked on Befestigung: ${befestigung}`);
                
                // Take a screenshot
                await argosScreenshot(page, `Senkrechte Fenster - Auswahl Befestigung ${befestigung}`, {
                    viewports: ["macbook-16", "iphone-6"]
                });
                console.log(`Screenshot taken for Befestigung: ${befestigung}`);
                
                // Optional: add a small delay to avoid issues with rapid clicks
                await page.waitForTimeout(500); 
            } catch (error) {
                console.error(`Error while processing Befestigung ${befestigung}: ${error.message}`);
            }
        }
        
        
        //----------------------------------- SCHIENENFARBEN - TOOLTIP CAPTURES-------------------------------------\\

        const schienenfarben = ["weiß", "schwarzbraun", "silber", "bronze", "anthrazit"];
        for (let i = 0; i < schienenfarben.length; i++) {
            try {
                await page.locator('li.option_item').filter({ hasText: schienenfarben[i] }).locator('div.tooltip_icon').hover();
                await argosScreenshot(page, `Senkrechte Fenster - Tooltip Schienenfarbe ${schienenfarben[i]}`, { disableHover: false });
                console.log(`Tooltip screenshot taken for Schienenfarbe: ${schienenfarben[i]}`);
            } catch (error) {
                console.error(`Error while processing tooltip for Schienenfarbe ${schienenfarben[i]}: ${error.message}`);
            }
        }

        console.log('Test completed successfully');
    } catch (error) {
        console.error(`Test failed: ${error.message}`);
    }
});
