import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube } from '../support/helpers'

let scrollToBottom = require("scroll-to-bottomjs");



test('load configurator Sonderformen - Plafond with Blackout-4019', async function ({ page }) {

    //load PDP page
    await page.goto('/blackout-4019');

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
    const galleryImages_count = 8; // --> Blackout-4019 has got 8 gallery images
    const galleryImages_visible = await page.locator('.small_gallery > ul > li > img:visible').count()  // count the visible gallery images

    await expect(galleryImages_count).toStrictEqual(galleryImages_visible)  // expect both values to be equal

    // await console.log('total gallery images = ' + galleryImages_count)
    // await console.log('visible gallery images = ' + galleryImages_visible)

    // select DF TAB
    await page.getByText('Sonderformen', { exact: true }).click()

    // select window shape
    await expect(page.locator("label[for='plafond']")).toBeVisible();
    await page.locator("label[for='plafond']").click()


    // take argos screenshot
    await argosScreenshot(page, 'Sonderformen Plafond - Startseite mit Blackout-4019', {
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
        "rueckseite-weiss-img",
        "oekotex-img",
        "feucht-abwischbar-img",
        "massanfertigung-img",
        "made-in-germany-img"];


    for (var i = 0; i < attributes.length; i++) {
        // console.log(attributes[i])

        await page.locator('#' + attributes[i]).dispatchEvent('mouseover');
        await argosScreenshot(page, 'Sonderformen Plafond - Eigenschaft Blackout-4019 ' + attributes[i], {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ],
        });
    }

    //------------------------------------------ PLISSEE-TYPEN-------------------------------------------\\
    //------------------------------------------ Plafond ------------------------------------------------\\
    //****************************************************************************************************\\

    //Plisseetypen
    var types = [
        "pl11",
        "pl40",
        "plk13"
    ]

    //select plissee types and make snapshot
    for (var i = 0; i < types.length; i++) {

        await page.locator("label[for=" + types[i] + "] > p").click()
        await page.locator("label[for=" + types[i] + "]").hover()

        await argosScreenshot(page, 'Sonderformen Plafond - Auswahl und Tooltip ' + types[i], {
            disableHover: false
        });
        await page.waitForTimeout(1000); // avoid crossing tooltips & allow time to load correct pricelists
    }


    //----------------------------------- BEFESTIGUNGEN - AUSWAHL ---------------------------------------------\\
    //**********************************************************************************************************\\

    // Befestigungen
    var befestigungen = [
        "clip",
        "winkel",
        "montageprofil_mit_winkeln",
        "montageprofil_haltebolzen"
    ]

    // select available befestigungen and make snapshots
    for (var i = 0; i < befestigungen.length; i++) {

        await page.locator("label[for=" + befestigungen[i] + "] > p").click();
        await argosScreenshot(page, 'Sonderformen Plafond - Auswahl Befestigung ' + befestigungen[i], {
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
        await argosScreenshot(page, 'Sonderformen Plafond - Tooltip Befestigung ' + befestigungen[i], {  // do not use viewport options - tooltip disappears
            disableHover: false
        });
        await page.waitForTimeout(1000); // avoid crossing tooltips
    }


    //-------------------------------------------- BEDIENSEITE TOOLTIP -----------------------------------------------------\\
    //************************************************************************************************************************\\

    // capture tooltip Bedienseite
    await page.locator("section.bedienseite_container div.tooltip_icon").hover();
    await argosScreenshot(page, 'Sonderformen Vierecke - Tooltip Bedienseite', {  // do not use viewport options - tooltip disappears
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
        await argosScreenshot(page, 'Sonderformen Plafond - Auswahl Schienenfarbe ' + schienenfarben[i], {  // do not use viewport options - tooltip disappears
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
        await argosScreenshot(page, 'Sonderformen Plafond - Tooltip Schienenfarbe ' + schienenfarben[i], {  // do not use viewport options - tooltip disappears
            disableHover: false
        });
        await page.waitForTimeout(1000); // avoid crossing tooltips
    }

    //----------------------------------- BEDIENUNG - AUSWAHL -------------------------------------------------\\
    //**********************************************************************************************************\\

    // switch to Kurbel
    await page.locator("label[for='kurbel'] > p").click();
    await argosScreenshot(page, 'Sonderformen Plafond - Bediengriff Kurbel', {
        viewports: [
            "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
            "iphone-6" // Use device preset for iphone-6 --> 375x667
        ]
    });

    // dropdown-Menü Kurbel
    // open Kurbel & take argos screenshot
    await page.locator("#handkurbel_select").click()
    await argosScreenshot(page, 'Sonderformen Plafond -  Kurbel') // do not use viewport options - dropdown closes 



    // switch to Elektrostab
    await page.locator("label[for='elektrostab'] > p").click();
    await argosScreenshot(page, 'Sonderformen Plafond - Bediengriff Elektrostab', {
        viewports: [
            "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
            "iphone-6" // Use device preset for iphone-6 --> 375x667
        ]
    });

    // dropdown-Menü Elektrostab
    // open Elektrostab & take argos screenshot
    await page.locator("#elektrostab_select").click()
    await argosScreenshot(page, 'Sonderformen Plafond -  Elektrostab') // do not use viewport options - dropdown closes 


    //----------------------------------- BEDIENUNG - TOOLTIP ---------------------------------------------------\\
    //**********************************************************************************************************\\

    // hover on standard info
    await page.locator("label[for='kurbel'] + div.tooltip_icon").hover();
    // take screenshot
    await argosScreenshot(page, 'Sonderformen Plafond - Tooltip Bediengriff Standard', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });

    await page.waitForTimeout(1000); // avoid crossing tooltips

    // hover on desing info
    await page.locator("label[for='elektrostab'] + div.tooltip_icon").hover();
    // take screenshot
    await argosScreenshot(page, 'Sonderformen Plafond - Tooltip Bediengriff Design', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });
});
