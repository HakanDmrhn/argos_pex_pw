import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube } from '../support/helpers'

let scrollToBottom = require("scroll-to-bottomjs");



test('load configurator Senkrechte Fenster with Liviano 4313', async function ({ page }) {

    //load PDP page
    await page.goto('liviano-4313');

    //load js files --> workaround:
    await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-5,00/);
    await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-2,50/);

    //scroll to bottom with npm package to be sure that alls ressources are loaded
    await page.evaluate(scrollToBottom);
    // blackout FreshChat
    await ignoreFreshChat(page)
    // blackout YouTube
    await ignoreYoutube(page)

    //check if main image is visible
    await expect(page.locator('#image')).toBeVisible();


    // --------------- BE SURE THAT ALL GALLERY IMAGES ARE LOADED ------------------------\\
    //------------------------------------------------------------------------------------\\
    // get count of visible gallery images and compare with total number of gallery images
    const galleryImages_count = 8; // --> Liviano-4313 has got 9 gallery images
    const galleryImages_visible = await page.locator('.small_gallery > ul > li > img:visible').count()  // count the visible gallery images

    await expect(galleryImages_count).toStrictEqual(galleryImages_visible)  // expect both values to be equal


    // take argos screenshot
    await argosScreenshot(page, 'Senkrechte Fenster - Startseite mit Liviano 4313', {
        viewports: [
            "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
            "iphone-6" // Use device preset for iphone-6 --> 375x667
        ]
    });


    //--------------------------------- STOFF-EIGENSCHAFTEN-----------------------------------------\\
    //***********************************************************************************************\\
    //capture all 'Eigenschaften' of the loaded plissee-cloth /meran-5076

    // Stoffeinegnschaften
    var attributes = [
        "transparenz-img",
        "rueckseite-gleich-vorderseite-img",
        "wasser-schmutz-abweisend-img",
        "oekotex-img",
        "feuchtraumgeeignet-img",
        "massanfertigung-img",
        "made-in-germany-img"];


    for (var i = 0; i < attributes.length; i++) {
        // console.log(attributes[i])

        await page.locator('#' + attributes[i]).dispatchEvent('mouseover');
        await argosScreenshot(page, 'Senkrechte Fenster - Eigenschaft Meran 5076 ' + attributes[i], {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ],
        });
    }

    //------------------------------------------ PLISSEE-TYPEN-------------------------------------------\\
    //****************************************************************************************************\\

    // select VS1
    await page.locator('li').filter({ hasText: 'Verspannt VS1 - Plissee ist oben fest' }).click()
    await argosScreenshot(page, 'Senkrechte Fenster - Auswahl Plisseetyp - VS1', {
        viewports: [
            "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
            "iphone-6" // Use device preset for iphone-6 --> 375x667
        ],
    });

    // select VS2
    await page.locator('li').filter({ hasText: 'Verspannt VS2 - Plissee kann' }).click()
    await argosScreenshot(page, 'Senkrechte Fenster - Auswahl Plisseetyp - VS2', {
        viewports: [
            "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
            "iphone-6" // Use device preset for iphone-6 --> 375x667
        ],
    });


    //------------------------------------------ CAPTURE TOOLTIPS PLISSEETYPEN -------------------------------------------\\

    // capture tooltip VS1
    await page.locator('li').filter({ hasText: 'Verspannt VS1 - Plissee ist oben fest' }).locator('div.tooltip_icon').hover();
    await argosScreenshot(page, 'Senkrechte Fenster - Tooltip Plisseetyp VS1', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });

    await page.waitForTimeout(1000); // avoid crossing tooltips

    // capture tooltip VS2
    await page.locator('li').filter({ hasText: 'Verspannt VS2 - Plissee kann' }).locator('div.tooltip_icon').hover();
    await argosScreenshot(page, 'Senkrechte Fenster - Tooltip Plisseetyp VS2', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });



    //----------------------------------- BEFESTIGUNGEN - AUSWAHL ---------------------------------------------\\
    //**********************************************************************************************************\\
    //Befestigungen
    var befestigungen = [
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
    ]

    // select available befestigungen and make snapshots
    for (var i = 0; i < befestigungen.length; i++) {

        await page.locator("label[for=" + befestigungen[i] + "] > p").click();
        await argosScreenshot(page, 'Senkrechte Fenster - Auswahl Befestigung ' + befestigungen[i], {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ]
        });
    }


    //----------------------------------- BEFESTIGUNGEN - TOOLTIPS --------------------------------------------\\
    //**********************************************************************************************************\\

    //select available befestigungen and make snapshots
    for (var i = 0; i < befestigungen.length; i++) {

        await page.locator("label[for=" + befestigungen[i] + "] + div.tooltip_icon").hover();
        await argosScreenshot(page, 'Senkrechte Fenster - Tooltip Befestigung ' + befestigungen[i], {  // do not use viewport options - tooltip disappears
            disableHover: false
        });
        await page.waitForTimeout(1000); // avoid crossing tooltips
    }


    //----------------------------------- SCHIENENFARBEN - AUSWAHL --------------------------------------------\\
    //**********************************************************************************************************\\

    //Schienenfarben
    var schienenfarben = [
        "weiss",
        "schwarzbraun",
        "silber",
        "bronze",
        "anthrazit"
    ]

    // TRIGGER available schienenfarben-tooltips and make snapshots
    for (var i = 0; i < schienenfarben.length; i++) {

        await page.locator("label[for=" + schienenfarben[i] + "] > p").click();
        await argosScreenshot(page, 'Senkrechte Fenster - Auswahl Schienenfarbe ' + schienenfarben[i], {  
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ]
        });
    }

    //----------------------------------- SCHIENENFARBEN - TOOLTIPS --------------------------------------------\\
    //**********************************************************************************************************\\

    // TRIGGER available schienenfarben-tooltips and make snapshots
    for (var i = 0; i < schienenfarben.length; i++) {

        await page.locator("label[for=" + schienenfarben[i] + "] + div.tooltip_icon").hover();
        await argosScreenshot(page, 'Senkrechte Fenster - Tooltip Schienenfarbe ' + schienenfarben[i], {  // do not use viewport options - tooltip disappears
            disableHover: false
        });
        await page.waitForTimeout(1000); // avoid crossing tooltips
    }



    //----------------------------------- BEDIENGRIFFE - AUSWAHL ---------------------------------------------\\
    //**********************************************************************************************************\\

    // select Standard
    await page.locator("label[for='standard'] > p").click();  // in order to avoid previous tooltip visibility

    await argosScreenshot(page, 'Senkrechte Fenster - Bediengriff Standard', {  // do not use viewport options - tooltip disappears
        viewports: [
            "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
            "iphone-6" // Use device preset for iphone-6 --> 375x667
        ]
    });

    // switch to Design
    await page.locator("label[for='design'] > p").click();

    // take screenshot
    await argosScreenshot(page, 'Senkrechte Fenster - Bediengriff Design', {  // do not use viewport options - tooltip disappears
        viewports: [
            "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
            "iphone-6" // Use device preset for iphone-6 --> 375x667
        ]
    });


    //----------------------------------- BEDIENGRIFFE - TOOLTIP ---------------------------------------------\\
    //**********************************************************************************************************\\

    // hover on standard info
    await page.locator("label[for='standard'] + div.tooltip_icon").hover();
    // take screenshot
    await argosScreenshot(page, 'Senkrechte Fenster - Tooltip Bediengriff Standard', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });
    await page.waitForTimeout(1000); // avoid crossing tooltips & allow time to load correct pricelists

    // hover on desing info
    await page.locator("label[for='design'] + div.tooltip_icon").hover();
    // take screenshot
    await argosScreenshot(page, 'Senkrechte Fenster - Tooltip Bediengriff Design', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });
    await page.waitForTimeout(1000); // avoid crossing tooltips & allow time to load correct pricelists


    //----------------------------------- BEDIENSTÄBE - AUSWAHL & TOOLTIP ---------------------------------------------\\
    //****************************************************************************************************************\\

    // Bedienstäbe
    // open Bedienstäbe & take argos screenshot
    await page.locator("#bedienstab_select").click()
    await argosScreenshot(page, 'Senkrechte Fenster -  Bedienstäbe', { fullPage: false }) // do not use viewport options - dropdown closes 
    await page.locator("#bedienstab_select").click() //close dropdown menu

    // hover on Bedienstab info
    await page.locator("div.bedienstab_container div.tooltip_icon").hover()

    // take screenshot
    await argosScreenshot(page, 'Senkrechte Fenster - Tooltip Bedienstäbe', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });
});
