import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreYoutubeAndFreshchat, checkButtonAvailability } from '../support/helpers';

let scrollToBottom = require("scroll-to-bottomjs");

test('load configurator Sonderformen - Plafond with Blackout-4019', async function ({ page }) {

    try {
        console.log('Blocking FreshChat script execution...');
        await ignoreYoutubeAndFreshchat(page);
        console.log('Navigating to /blackout-4019...');
        await page.goto('/blackout-4019', { waitUntil: 'load' });
        await page.waitForFunction(() => document.fonts.ready);
        console.log('Scrolling to bottom to ensure all resources are loaded...');
        await page.evaluate(scrollToBottom);
        await checkButtonAvailability(page);
        console.log('Checking if the main image is visible...');
        await expect(page.locator('#image')).toBeVisible();
        console.log('Verifying prices...');
        await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-5,00/);
        await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-2,50/);


        // --------------- BE SURE THAT ALL GALLERY IMAGES ARE LOADED ------------------------\\
        console.log('Verifying gallery images...');
        const galleryImages_count = 8; // Expected count of images
        const galleryImages_visible = await page.locator('.small_gallery > ul > li > img:visible').count();
        console.log(`Visible gallery images: ${galleryImages_visible}`);
        expect(galleryImages_count).toStrictEqual(galleryImages_visible);

        console.log('Selecting Sonderformen tab...');
        await page.getByText('Sonderformen', { exact: true }).click();

        console.log('Selecting Plafond window shape...');
        await expect(page.locator("label[for='plafond']")).toBeVisible();
        await page.locator("label[for='plafond']").click();

        console.log('Taking Argos screenshot for Sonderformen Plafond - Startseite with Blackout-4019...');
        await argosScreenshot(page, 'Sonderformen Plafond - Startseite mit Blackout-4019', {
            viewports: ["macbook-16", "iphone-6"]
        });


        //--------------------------------- STOFF-EIGENSCHAFTEN -----------------------------------------
        console.log('Handling Stoffeigenschaften...');

        var attributes = [
            "transparenz-img",
            "bildschirmarbeitsplatz-img",
            "rueckseite-weiss-img",
            "oekotex-img",
            "feucht-abwischbar-img",
            "massanfertigung-img",
            "made-in-germany-img"
        ];

        for (var i = 0; i < attributes.length; i++) {
            console.log(`Hovering over and taking screenshot for ${attributes[i]}...`);
            await page.locator('#' + attributes[i]).dispatchEvent('mouseover');
            await argosScreenshot(page, 'Sonderformen Plafond - Eigenschaft Blackout-4019 ' + attributes[i], {
                viewports: ["macbook-16", "iphone-6"]
            });
            await page.mouse.move(0, 0);
        }

        //----------------------------------- PLISSEE-TYPEN -------------------------------------------
        console.log('Handling Plissee Typen...');

        var types = [
            "pl11",
            "pl40",
            "plk13"
        ];

        for (var i = 0; i < types.length; i++) {
            console.log(`Selecting and taking screenshot for ${types[i]}...`);
            await page.locator("label[for=" + types[i] + "] > p").click();
            await page.locator("label[for=" + types[i] + "]").hover();
            await argosScreenshot(page, 'Sonderformen Plafond - Auswahl und Tooltip ' + types[i], { disableHover: false });
            await page.mouse.move(0, 0);
        }


        //----------------------------------- BEFESTIGUNGEN - AUSWAHL -----------------------------------
        console.log('Handling Befestigungen...');
        var befestigungen = ["Clip", "Winkel", "Montageprofile mit Montagewinkeln", "Montageprofile mit Haltebolzen"];

        for (var i = 0; i < befestigungen.length; i++) {
            console.log(`Selecting and taking screenshot for ${befestigungen[i]}...`);
            await page.locator('li').filter({ hasText: befestigungen[i] }).first().click();
            await argosScreenshot(page, 'Sonderformen Plafond - Auswahl Befestigung ' + befestigungen[i], {
                viewports: ["macbook-16", "iphone-6"]
            });
            await page.mouse.move(0, 0);
        }

        //----------------------------------- BEFESTIGUNGEN - TOOLTIPS -----------------------------------
        console.log('Handling tooltips for Befestigungen...');
        for (var i = 0; i < befestigungen.length; i++) {
            const tooltipIconLocator = page.locator('li').filter({ hasText: befestigungen[i] }).first().locator('div.tooltip_icon');
            await tooltipIconLocator.hover();
            console.log('Hovered over the tooltip icon for ' + befestigungen[i]);

            const tooltipLocator = page.locator('li').filter({ hasText: befestigungen[i] }).first().locator('div.option_item_tooltip');
            await tooltipLocator.waitFor({ state: 'visible' });
            console.log('Tooltip for ' + befestigungen[i] + ' is visible.');

            await argosScreenshot(page, 'Sonderformen Plafond - Tooltip Befestigung ' + befestigungen[i], { disableHover: false });
            await page.mouse.move(0, 0);
        }


      //-------------------------------------------- BEDIENSEITE TOOLTIP -----------------------------------------------------\\

       // capture tooltip Bedienseite
       await page.locator("section.bedienseite_container div.tooltip_icon").hover();
       await argosScreenshot(page, 'Sonderformen Plafond - Tooltip Bedienseite', {  // do not use viewport options - tooltip disappears
           disableHover: false
       });
   
      //----------------------------------- SCHIENENFARBEN - TOOLTIPS --------------------------------------------\\

        //Schienenfarben
        var schienenfarben = [
            "weiss",
            "schwarzbraun",
            "silber",
          //  "bronze", disabled for PLK13 with Ticket PEX-4115
            "anthrazit"
        ]
    
        // TRIGGER available schienenfarben-tooltips and make snapshots
        for (var i = 0; i < schienenfarben.length; i++) {
    
            await page.locator("label[for=" + schienenfarben[i] + "] > p").click();
            await argosScreenshot(page, 'Sonderformen Plafond - Auswahl Schienenfarbe ' + schienenfarben[i], {  // do not use viewport options - tooltip disappears
                viewports: [
                    "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                    "iphone-6" // Use device preset for iphone-6 --> 375x667
                ]
            });
        }

      //----------------------------------- SCHIENENFARBEN - TOOLTIPS --------------------------------------------\\

        //Schienenfarben
        var schienenfarben = [
            "weiss",
            "schwarzbraun",
            "silber",
          //  "bronze", disabled for PLK13 with Ticket PEX-4115
            "anthrazit"
        ]
    
        // TRIGGER available schienenfarben-tooltips and make snapshots
        for (var i = 0; i < schienenfarben.length; i++) {
    
            await page.locator("label[for=" + schienenfarben[i] + "] > p").click();
            await argosScreenshot(page, 'Sonderformen Plafond - Auswahl Schienenfarbe ' + schienenfarben[i], {  // do not use viewport options - tooltip disappears
                viewports: [
                    "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                    "iphone-6" // Use device preset for iphone-6 --> 375x667
                ]
            });
        }
    

        //----------------------------------- BEDIENUNG - AUSWAHL -----------------------------------
        console.log('Selecting Kurbel and taking screenshot...');
        await page.locator("label[for='kurbel'] > p").click();
        await argosScreenshot(page, 'Sonderformen Plafond - Bediengriff Kurbel', {
            viewports: ["macbook-16", "iphone-6"]
        });

        console.log('Opening Kurbel dropdown...');
        await page.locator("#handkurbel_select").click();
        await argosScreenshot(page, 'Sonderformen Plafond -  Kurbel');

        //----------------------------------- BEDIENUNG - TOOLTIP ---------------------------------------------------\\

        console.log('Hovering over Bedienseite tooltip and taking screenshot...');
        await page.locator("label[for='kurbel'] + div.tooltip_icon").hover();
        await argosScreenshot(page, 'Sonderformen Plafond - Tooltip Bediengriff Standard', { disableHover: false });

        console.log('Test completed successfully.');
    } catch (error) {
        console.error('An error occurred during the test execution:', error);
    }
});
