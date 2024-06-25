import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube } from '../support/helpers'

let scrollToBottom = require("scroll-to-bottomjs");



test('load configurator Dachfenster with Meran 5076', async function ({ page }) {

    //load PDP page
    await page.goto('/meran-5076');

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
    const galleryImages_count = 9; // --> Meran 5076 has got 9 gallery images
    const galleryImages_visible = await page.locator('.small_gallery > ul > li > img:visible').count()  // count the visible gallery images

    await expect(galleryImages_count).toStrictEqual(galleryImages_visible)  // expect both values to be equal


    // select DF TAB
    await page.getByText('Dachfenster', { exact: true }).click()

    //---------------------------------------- CHECK REQUEST ------------------------------------//
    //------------------------------- TO ENSURE PRICE LISTS ARE LOADED ----------------------------//
    await page.waitForResponse('/prices/split_by_pg/dfnonstandard_pg2.json')


    // take argos screenshot
    await argosScreenshot(page, 'Dachfenster - Startseite mit Meran 5076', {
        viewports: [
            "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
            "iphone-6" // Use device preset for iphone-6 --> 375x667
        ]
    });




    //----------------------------------------------------------------------------------------------\\
    //---------------------------------- GENORMTE DF ------------------------------------------------\\
    //------------------------------------------------------------------------------------------------\\



    //--------------------------------- STOFF-EIGENSCHAFTEN-----------------------------------------\\
    //***********************************************************************************************\\
    //capture all 'Eigenschaften' of the loaded plissee-cloth /meran-5076

    // Stoffeinegnschaften
    var attributes = [
        "transparenz-img",
        "rueckseite-perlex-img",
        "schwer-entflammbar-img",
        "feuchtraumgeeignet-img",
        "waschbar-img",
        "massanfertigung-img",
        "made-in-germany-img"];


    for (var i = 0; i < attributes.length; i++) {
        // console.log(attributes[i])

        await page.locator('#' + attributes[i]).dispatchEvent('mouseover');
        await argosScreenshot(page, 'Dachfenster - Eigenschaft Meran 5076 ' + attributes[i], {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ],
        });
    }

    //------------------------------------------ DF-TYPEN-------------------------------------------\\
    //***********************************************************************************************\\

    //------------------------------------------ DF-20-------------------------------------------\\
    // select DF20
    // await page.locator('li').filter({ hasText: 'DF 20 - Plissee kann nach' }).click()
    // NOT NEEDED AS DF20 IS PRESELECTED

    await argosScreenshot(page, 'Dachfenster - Auswahl DF20', {
        viewports: [
            "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
            "iphone-6" // Use device preset for iphone-6 --> 375x667
        ]
    });




    //------------------------------------------ DF-20 Comfort -------------------------------------------\\
    // select DF20 Comfort
    await page.locator('li').filter({ hasText: 'DF 20 Comfort - Plissee kann nach' }).click()
    //---------------------------------------- CHECK REQUEST ------------------------------------//
    //------------------------------- TO ENSURE PRICE LISTS ARE LOADED ----------------------------//
    await page.waitForResponse('/prices/split_by_pg/dfcomfortnonstandard_pg2.json')
    
    await argosScreenshot(page, 'Dachfenster - Auswahl DF20 Comfort', {
        viewports: [
            "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
            "iphone-6" // Use device preset for iphone-6 --> 375x667
        ]
    });




    //------------------------------------------ DF-30 Comfort -------------------------------------------\\
    // select 30 Comfort
    await page.locator('li').filter({ hasText: 'DF 30 Comfort - Plissee hat 2' }).click()
    //---------------------------------------- CHECK REQUEST ------------------------------------//
    //------------------------------- TO ENSURE PRICE LISTS ARE LOADED ----------------------------//
    // await page.waitForResponse('/prices/split_by_pg/dfcomfortnonstandard_pg2.json')
    
    await argosScreenshot(page, 'Dachfenster - Auswahl DF30 Comfort', {
        viewports: [
            "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
            "iphone-6" // Use device preset for iphone-6 --> 375x667
        ]
    });

    //------------------------------------------ CAPTURE TOOLTIPS -------------------------------------------\\

    // capture tooltip DF20
    await page.locator('li').filter({ hasText: 'DF 20 - Plissee kann nach' }).locator('div.tooltip_icon').hover();
    await argosScreenshot(page, 'Dachfenster - Tooltip DF20', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });

    await page.waitForTimeout(1000); // avoid crossing tooltips & allow time to load correct pricelists

    // capture tooltip DF20 Comfort
    await page.locator('li').filter({ hasText: 'DF 20 Comfort - Plissee kann nach' }).locator('div.tooltip_icon').hover();
    await argosScreenshot(page, 'Dachfenster - Tooltip DF20 Comfort', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });

    await page.waitForTimeout(1000); // avoid crossing tooltips & allow time to load correct pricelists

    // capture tooltip DF30 Comfort
    await page.locator('li').filter({ hasText: 'DF 30 Comfort - Plissee hat 2' }).locator('div.tooltip_icon').hover();
    await argosScreenshot(page, 'Dachfenster - Tooltip DF30 Comfort', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });



    //----------------------------------- SELECT-FELDER --------------------------------------------\\
    //----------------------------------- GENROMTE DF ----------------------------------------------\\
    //***********************************************************************************************\\

    // Hersteller
    // open Hersteller & take argos screenshot
    await page.locator("#df_hersteller_select").click()
    await argosScreenshot(page, 'Dachfenster - Genormte DF Hersteller', { fullPage: false }) // do not use viewport options - dropdown closes 

    // select first hersteller 
    await page.locator("#df_hersteller_select").selectOption("Fakro");


    //------------------------------- CHECK REQUEST ----------------------------//
    //----------------------- wait till products are loaded --------------------//

    await Promise.all([
        page.waitForResponse(response =>
            response.url().includes('/customoptions/index/getDFProducts?')
            && response.status() === 200, { timeout: 500 }
        && console.log('RESPONSE RECEIVED - get DF products')
        )
    ]);
    //--------------------------------------------------------------------------//


    // Produkt
    // open Hersteller & take argos screenshot
    await page.locator("#df_product_select").click()
    await argosScreenshot(page, 'Dachfenster - Genormte DF Produkt', { fullPage: false }) // do not use viewport options - dropdown closes 
    // select first Produkt 
    await page.locator("#df_product_select").selectOption("1");


    //------------------------------- CHECK REQUEST ----------------------------//
    //----------------------- wait till types are loaded -----------------------//

    await Promise.all([
        page.waitForResponse(response =>
            response.url().includes('/customoptions/index/getDFTypes?')
            && response.status() === 200, { timeout: 500 }
        && console.log('RESPONSE RECEIVED - get DF types')
        )
    ]);

    // Typ
    // open Typ & take argos screenshot
    await page.locator("#df_product_type_select").click()
    await argosScreenshot(page, 'Dachfenster - Genormte DF Typ', { fullPage: false }) // do not use viewport options - dropdown closes 


    // Bedienstäbe
    // open Bedienstäbe & take argos screenshot
    await page.locator("#bedienstab_select").click()
    await argosScreenshot(page, 'Dachfenster - Genormte DF Bedienstäbe', { fullPage: false }) // do not use viewport options - dropdown closes 


    // untere Stoffe
    // open Bedienstäbe & take argos screenshot
    await page.locator("#unterer_stoff_gruppe_select").click()
    await argosScreenshot(page, 'Dachfenster - Genormte DF Untere Stoffe', { fullPage: false }) // do not use viewport options - dropdown closes 



    //------------------------- BEDIENGRIFFE, SCHIENENFARBEN UND BEDIENSTAB-------------------------\\
    //***********************************************************************************************\\

    // select DF20 to make Bediengriff visible
    await page.locator('li').filter({ hasText: 'DF 20 - Plissee kann nach' }).click()

    // wait for DF20  prices before next screenshot since playwright is too fast at this point
    await expect(page.locator('.price_amount > .product_prices > .price .original_price')).toHaveText(/112,00/); // 107 + 5
    await expect(page.locator('.price_amount > .product_prices > .price .final_price')).toHaveText(/69,20/); // R 5,7 112,00 -5,00 -40% +5,00= 69,20

    // capture tooltip Bediengriff Standard
    await page.locator('li').filter({ hasText: 'Standard' }).locator('div.tooltip_icon').hover();
    await argosScreenshot(page, 'Dachfenster - Tooltip Bediengriff Standard', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });

    await page.waitForTimeout(1000); // avoid crossing tooltips & allow time to load correct pricelists

    // capture tooltip Bediengriff Design
    await page.locator('li').filter({ hasText: 'Design' }).locator('div.tooltip_icon').hover();
    await argosScreenshot(page, 'Dachfenster - Tooltip Bediengriff Design', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });


    //select DF20 C to make Schienenfarbe weiß and grau visible
    await page.locator('li').filter({ hasText: 'DF 20 Comfort - Plissee kann nach' }).click()


    //wait for DF20 C prices before next snapshot since cypress is too fast at this point
    await expect(page.locator('.price_amount > .product_prices > .price .original_price')).toHaveText(/135,00/);
    await expect(page.locator('.price_amount > .product_prices > .price .final_price')).toHaveText(/83,00/);


    //capture Tooltips Schienenfarbe weiß and grau
    // --> weiß
    await page.locator('li').filter({ hasText: 'weiß' }).locator('div.tooltip_icon').hover();
    await argosScreenshot(page, 'Dachfenster - Tooltip Schienenfarbe weiß', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });

    await page.waitForTimeout(1000); // avoid crossing tooltips & allow time to load correct pricelists

    // --> grau
    await page.locator('li').filter({ hasText: 'grau' }).locator('div.tooltip_icon').hover();
    await argosScreenshot(page, 'Dachfenster - Tooltip Schienenfarbe grau', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });

    // capture Bedienstab
    // open Bedienstäbe & take argos screenshot
    await page.locator("#bedienstab_select").click()
    await argosScreenshot(page, 'Dachfenster - Dropdown Bedienstab', { fullPage: false }) // do not use viewport options - dropdown closes 
    await page.locator("#bedienstab_select").click()  // close dropdown menu

    // hover on Bedienstab info
    await page.locator("div.bedienstab_container div.tooltip_icon").hover()

    // take screenshot
    await argosScreenshot(page, 'Dachfenster - Tooltip Bedienstäbe', {  // do not use viewport options - tooltip disappears
        disableHover: false
    });



    //----------------------------------------------------------------------------------------------\\
    //---------------------------------- UNGENORMTE DF ----------------------------------------------\\
    //-------------------------------------FALZARTEN--------------------------------------------------\\

    // switch to ungenormt and take screenshot
    await page.locator("label[for='df_nonstandard']").click()
    await argosScreenshot(page, 'Dachfenster - Ungenormte DF gerader Falz', {
        viewports: [
            "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
            "iphone-6" // Use device preset for iphone-6 --> 375x667
        ],
    });

    // select schräger Falz
    await page.locator("label[for='schraeger_falz']").click()
    await argosScreenshot(page, 'Dachfenster - Ungenormte DF schräger Falz', {
        viewports: [
            "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
            "iphone-6" // Use device preset for iphone-6 --> 375x667
        ],
    });

    // select schräger Falz mit Schattenfuge
    await page.locator("label[for='falz_mit_schattenfuge']").click()
    await argosScreenshot(page, 'Dachfenster - Ungenormte DF schräger Falz mit Schattenfuge', {
        viewports: [
            "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
            "iphone-6" // Use device preset for iphone-6 --> 375x667
        ],
    });

    // select schräger Falz mit Aufsatz vor Glas
    await page.locator("label[for='falz_mit_aufsatz_vor_glas']").click()
    await argosScreenshot(page, 'Dachfenster - Ungenormte DF schräger Falz mit Aufsatz vor Glas', {
        viewports: [
            "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
            "iphone-6" // Use device preset for iphone-6 --> 375x667
        ],
    });
});
