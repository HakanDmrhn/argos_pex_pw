import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, ignoreFacebook, checkButtonAvailability, waitForTextToAppear } from '../support/helpers';


exports.EmptyCart = class EmptyCart {

    constructor(page) {
        this.page = page;
    }

    async emptyCart() {

        //----------------------------- WARENKORB LEEREN --------------------------------
        //-------------------------------------------------------------------------------
        await checkButtonAvailability(this.page);

        await this.page.locator('.cart_block').click();

        // ignore FreshChat
        await ignoreFreshChat(this.page)

        // take argos screenshot of cart
        await argosScreenshot(this.page, 'Warenkorb leeren', {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ]
        });


        var cartElements = await this.page.locator('span').filter({ hasText: 'Entfernen' }).count() // Anzahl Element:  <span> Entfernen

        while (cartElements != 0) {

            await this.page.locator('span').filter({ hasText: 'Entfernen' }).first().click()
            cartElements = await this.page.locator('span').filter({ hasText: 'Entfernen' }).count()// neue Anzahl Element:  <span> Entfernen
        }

        // Wait for the text "Der Warenkorb ist leer" to appear on the page
        await waitForTextToAppear(this.page, 'Der Warenkorb ist leer');
        await checkButtonAvailability(this.page);
        

        // ignore FreshChat
        await ignoreFreshChat(this.page)

        // take argos screenshot of cart
        await argosScreenshot(this.page, 'Warenkorb geleert', {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ]
        });
    }
}