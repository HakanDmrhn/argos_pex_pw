import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube } from '../support/helpers'

let scrollToBottom = require("scroll-to-bottomjs");



test('load configurator Sonderformen - Dreiecke with Blackout 4018', async function ({ page }) {

    //load PDP page
    await page.goto('blackout-4018');

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
    const galleryImages_count = 7; // --> Blackout 4018 has got 7 gallery images
    const galleryImages_visible = await page.locator('.small_gallery > ul > li > img:visible').count()  // count the visible gallery images

    await expect(galleryImages_count).toStrictEqual(galleryImages_visible)  // expect both values to be equal

    // select DF TAB
    await page.getByText('Sonderformen', { exact: true }).click()

    // select window shape
    await expect(page.locator("label[for='triangle']")).toBeVisible();
    await page.locator("label[for='triangle']").click()


    // take argos screenshot
    await argosScreenshot(page, 'Sonderformen Dreiecke - Startseite mit Blackout 4018', {
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
        "bildschirmarbeitsplatz-img",
        "rueckseite-weiss-img",
        "oekotex-img",
        "feucht-abwischbar-img",
        "massanfertigung-img",
        "made-in-germany-img"];


    for (var i = 0; i < attributes.length; i++) {
        // console.log(attributes[i])

        await page.locator('#' + attributes[i]).dispatchEvent('mouseover');
        await argosScreenshot(page, 'Sonderformen Dreiecke - Eigenschaft Meran 5076 ' + attributes[i], {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ],
        });
    }

    //------------------------------------------ PLISSEE-TYPEN-------------------------------------------\\
    //------------------------------------------ DREIECKE ------------------------------------------------\\
    //****************************************************************************************************\\

    //Plisseetypen
    var types = [
        "fds3",
        "fds4",
        "vs9",
        "vs10",
        "sd2",
        "sd3",
    ]

    //select plissee types and make snapshot
    for (var i = 0; i < types.length; i++) {

        await page.locator("label[for=" + types[i] + "] > p").click()
        await page.locator("label[for=" + types[i] + "]").hover()

        await argosScreenshot(page, 'Sonderformen Dreiecke - Auswahl und Tooltip ' + types[i], {
            disableHover: false
        });
        await page.waitForTimeout(1000); // avoid crossing tooltips & allow time to load correct pricelists
    }


    //----------------------------------- BEFESTIGUNGEN - AUSWAHL ---------------------------------------------\\
    //**********************************************************************************************************\\

    // select fds to make all befestigungen visible
    await page.locator("label[for='fds3'] > p").click()

    // Befestigungen
    var befestigungen = [
        "direkt_vor_der_scheibe",
        "am_fensterfluegel",
        "am_mauerwerk"
    ]

    // select available befestigungen and make snapshots
    for (var i = 0; i < befestigungen.length; i++) {

        await page.locator("label[for=" + befestigungen[i] + "] > p").click();
        await argosScreenshot(page, 'Sonderformen Dreiecke - Auswahl Befestigung ' + befestigungen[i], {
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
        await argosScreenshot(page, 'Sonderformen Dreiecke - Tooltip Befestigung ' + befestigungen[i], {  // do not use viewport options - tooltip disappears
            disableHover: false
        });
        await page.waitForTimeout(1000); // avoid crossing tooltips & allow time to load correct pricelists
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
        await argosScreenshot(page, 'Sonderformen Dreiecke - Auswahl Schienenfarbe ' + schienenfarben[i], {  // do not use viewport options - tooltip disappears
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
        await argosScreenshot(page, 'Sonderformen Dreiecke - Tooltip Schienenfarbe ' + schienenfarben[i], {  // do not use viewport options - tooltip disappears
            disableHover: false
        });
        await page.waitForTimeout(1000); // avoid crossing tooltips & allow time to load correct pricelists
    }
});
