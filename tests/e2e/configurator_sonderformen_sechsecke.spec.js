import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube } from '../support/helpers'

let scrollToBottom = require("scroll-to-bottomjs");



test('load configurator Sonderformen - Sechsecke with Perlissimo-5125', async function ({ page }) {

    //load PDP page
    await page.goto('/perlissimo-5125');

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
    const galleryImages_count = 11; // --> Perlissimo-5125 has got 11 gallery images
    const galleryImages_visible = await page.locator('.small_gallery > ul > li > img:visible').count()  // count the visible gallery images

    await expect(galleryImages_count).toStrictEqual(galleryImages_visible)  // expect both values to be equal

    // await console.log('total gallery images = ' + galleryImages_count)
    // await console.log('visible gallery images = ' + galleryImages_visible)

    // select DF TAB
    await page.getByText('Sonderformen', { exact: true }).click()

    // select window shape
    await expect(page.locator("label[for='hexagon']")).toBeVisible();
    await page.locator("label[for='hexagon']").click()


    // take argos screenshot
    await argosScreenshot(page, 'Sonderformen Sechsecke - Startseite mit Perlissimo-5125', {
        viewports: [
            "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
            "iphone-6" // Use device preset for iphone-6 --> 375x667
        ]
    });


    //--------------------------------- STOFF-EIGENSCHAFTEN-----------------------------------------\\
    //***********************************************************************************************\\

    // Stoffeinegnschaften
    var attributes = [
        "transparenz-img",
        "rueckseite-perlex-img",
        "feuchtraumgeeignet-img",
        "waschbar-img",
        "massanfertigung-img",
        "made-in-germany-img"];


    for (var i = 0; i < attributes.length; i++) {
        // console.log(attributes[i])

        await page.locator('#' + attributes[i]).dispatchEvent('mouseover');
        await argosScreenshot(page, 'Sonderformen Sechsecke - Eigenschaft Perlissimo-5125 ' + attributes[i], {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ],
        });
    }

    //------------------------------------------ PLISSEE-TYPEN-------------------------------------------\\
    //------------------------------------------ Sechsecke ------------------------------------------------\\
    //****************************************************************************************************\\

    //Plisseetypen
    var types = [
        "vs6",
        "vs6sd"
    ]

    //select plissee types and make snapshot
    for (var i = 0; i < types.length; i++) {

        await page.locator("label[for=" + types[i] + "] > p").click()
        await page.locator("label[for=" + types[i] + "]").hover()

        await argosScreenshot(page, 'Sonderformen Sechsecke - Auswahl und Tooltip ' + types[i], {
            disableHover: false
        });
        await page.waitForTimeout(1000); // avoid crossing tooltips & allow time to load correct pricelists
    }


    //----------------------------------- BEFESTIGUNGEN - AUSWAHL ---------------------------------------------\\
    //**********************************************************************************************************\\

    // Befestigungen
    var befestigungen = [
        "direkt_vor_der_scheibe",
        "am_fensterfluegel",
        "klemmtraeger"
    ]

    // select available befestigungen and make snapshots
    for (var i = 0; i < befestigungen.length; i++) {

        await page.locator("label[for=" + befestigungen[i] + "] > p").click();
        await argosScreenshot(page, 'Sonderformen Sechsecke - Auswahl Befestigung ' + befestigungen[i], {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ]
        });
    }


    //----------------------------------- BEFESTIGUNGEN - TOOLTIPS --------------------------------------------\\
    //**********************************************************************************************************\\

    // select available befestigungen and make snapshots
    for (var i = 0; i < befestigungen.length; i++) {

        await page.locator("label[for=" + befestigungen[i] + "] + div.tooltip_icon").hover();
        await argosScreenshot(page, 'Sonderformen Sechsecke - Tooltip Befestigung ' + befestigungen[i], {  // do not use viewport options - tooltip disappears
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
        await argosScreenshot(page, 'Sonderformen Sechsecke - Auswahl Schienenfarbe ' + schienenfarben[i], {  // do not use viewport options - tooltip disappears
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
        await argosScreenshot(page, 'Sonderformen Sechsecke - Tooltip Schienenfarbe ' + schienenfarben[i], {  // do not use viewport options - tooltip disappears
            disableHover: false
        });
        await page.waitForTimeout(1000); // avoid crossing tooltips
    }

    //----------------------------------- BEDIENGRIFFE - AUSWAHL ---------------------------------------------\\
    //**********************************************************************************************************\\

    // select Standard
    await page.locator("label[for='standard'] > p").click();  // in order to avoid previous tooltip visibility
    
    await argosScreenshot(page, 'Sonderformen Sechsecke - Bediengriff Standard', {
        viewports: [
            "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
            "iphone-6" // Use device preset for iphone-6 --> 375x667
        ]
    });

    // switch to Design
    await page.locator("label[for='design'] > p").click();

    // take screenshot
    await argosScreenshot(page, 'Sonderformen Sechsecke - Bediengriff Design', {
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
    await argosScreenshot(page, 'Sonderformen Sechsecke - Tooltip Bediengriff Standard', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });

    await page.waitForTimeout(1000); // avoid crossing tooltips

    // hover on desing info
    await page.locator("label[for='design'] + div.tooltip_icon").hover();
    // take screenshot
    await argosScreenshot(page, 'Sonderformen Sechsecke - Tooltip Bediengriff Design', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });


    //----------------------------------- BEDIENSTÄBE - AUSWAHL & TOOLTIP ---------------------------------------------\\
    //****************************************************************************************************************\\

    // Bedienstäbe
    // open Bedienstäbe & take argos screenshot
    await page.locator("#bedienstab_select").click()
    await argosScreenshot(page, 'Sonderformen Sechsecke -  Bedienstäbe', { fullPage: false }) // do not use viewport options - dropdown closes 
    await page.locator("#bedienstab_select").click() //close dropdown menu

    // hover on Bedienstab info
    await page.locator("div.bedienstab_container div.tooltip_icon").hover()

    // take screenshot
    await argosScreenshot(page, 'Sonderformen Sechsecke - Tooltip Bedienstäbe', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });
});
