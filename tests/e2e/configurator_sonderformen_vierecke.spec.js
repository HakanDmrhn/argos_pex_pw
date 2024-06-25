import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube } from '../support/helpers'

let scrollToBottom = require("scroll-to-bottomjs");



test('load configurator Sonderformen - Vierecke with Pearl-Light-4555', async function ({ page }) {

    //load PDP page
    await page.goto('/pearl-light-4555');

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
    const galleryImages_count = 12; // --> Pearl-Light-4555 has got 12 gallery images
    const galleryImages_visible = await page.locator('.small_gallery > ul > li > img:visible').count()  // count the visible gallery images

    await expect(galleryImages_count).toStrictEqual(galleryImages_visible)  // expect both values to be equal

    // await console.log('total gallery images = ' + galleryImages_count)
    // await console.log('visible gallery images = ' + galleryImages_visible)

    // select DF TAB
    await page.getByText('Sonderformen', { exact: true }).click()

    // select window shape
    await expect(page.locator("label[for='rectangle']")).toBeVisible();
    await page.locator("label[for='rectangle']").click()


    // take argos screenshot
    await argosScreenshot(page, 'Sonderformen Vierecke - Startseite mit Pearl-Light-4555', {
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
        "bildschirmarbeitsplatz-img",
        "rueckseite-weiss-perlex-img",
        "oekotex-img",
        "feuchtraumgeeignet-img",
        "massanfertigung-img",
        "made-in-germany-img"];


    for (var i = 0; i < attributes.length; i++) {
        // console.log(attributes[i])

        await page.locator('#' + attributes[i]).dispatchEvent('mouseover');
        await argosScreenshot(page, 'Sonderformen Vierecke - Eigenschaft Pearl-Light-4555 ' + attributes[i], {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ],
        });
    }

    //------------------------------------------ PLISSEE-TYPEN-------------------------------------------\\
    //------------------------------------------ Vierecke ------------------------------------------------\\
    //****************************************************************************************************\\

    //Plisseetypen
    var types = [
        "f1",
        "f3",
        "f5",
        "fk",
        "fs1",
        "fs2",
        "vs2sc",
        "vs3",
        "vssd",
        "vs4s1",
        "vs4s2",
        "vs7",
        "vs8"
    ]

    //select plissee types and make snapshot
    for (var i = 0; i < types.length; i++) {

        await page.locator("label[for=" + types[i] + "]").click()
        await page.locator("label[for=" + types[i] + "]").hover()

        await argosScreenshot(page, 'Sonderformen Vierecke - Auswahl und Tooltip ' + types[i], {
            disableHover: false
        });
        await page.waitForTimeout(1000); // avoid crossing tooltips & allow time to load correct pricelists
    }


    //----------------------------------- BEFESTIGUNGEN - AUSWAHL ---------------------------------------------\\
    //**********************************************************************************************************\\

    // switch back to f1 to make all befestigungen visible
    await page.locator("label[for='f1']").click()

    // Befestigungen
    var befestigungen = [
        "direkt_vor_der_scheibe",
        "am_fensterfluegel",
        "klemmtraeger",
        "am_mauerwerk"
    ]

    // select available befestigungen and make snapshots
    for (var i = 0; i < befestigungen.length; i++) {

        await page.locator("label[for=" + befestigungen[i] + "] > p").click();
        await argosScreenshot(page, 'Sonderformen Vierecke - Auswahl Befestigung ' + befestigungen[i], {
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
        await argosScreenshot(page, 'Sonderformen Vierecke - Tooltip Befestigung ' + befestigungen[i], {  // do not use viewport options - tooltip disappears
            disableHover: false
        });
        await page.waitForTimeout(1000); // avoid crossing tooltips
    }



    //----------------------------------- BEDIENSEITE & PENDELSICHERUNG TOOLTIP ---------------------------------------------\\
    //************************************************************************************************************************\\

    // capture tooltip Bedienseite
    await page.locator("section.bedienseite_container div.tooltip_icon").hover();
    await argosScreenshot(page, 'Sonderformen Vierecke - Tooltip Bedienseite', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });

    await page.waitForTimeout(1000); // avoid crossing tooltips

    // capture tooltip Pendelsicherung
    await page.locator("section.pendelsicherung_container div.tooltip_icon").hover();
    await argosScreenshot(page, 'Sonderformen Vierecke - Tooltip Pendelsicherung', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });


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
        await argosScreenshot(page, 'Sonderformen Vierecke - Auswahl Schienenfarbe ' + schienenfarben[i], {
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
        await argosScreenshot(page, 'Sonderformen Vierecke - Tooltip Schienenfarbe ' + schienenfarben[i], {  // do not use viewport options - tooltip disappears
            disableHover: false
        });
        await page.waitForTimeout(1000); // avoid crossing tooltips
    }
});
