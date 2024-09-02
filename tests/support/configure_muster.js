import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, ignoreFacebook, checkButtonAvailability } from '../support/helpers';

exports.Muster = class Muster {

    constructor(page) {
        this.page = page;
    }

    async configureMuster() {

        // ----------------------- ADD MUSTER /rovereto-5098 TO CART ----------------------------
        // --------------------------------------------------------------------------------------
        // block FreshChat script execution
        await ignoreFreshChat(this.page);
        // load product detail page
        await this.page.goto('/rovereto-5098', { waitUntil: 'load' });
        await this.page.waitForFunction(() => document.fonts.ready);
        await checkButtonAvailability(this.page);

        // add sample to cart
        await this.page.getByText(/Gratis Stoffmuster bestellen/).first().click();

        // ----------------------- ADD MUSTER /nuvola-4609 TO CART -------------------------------
        // ---------------------------------------------------------------------------------------

        // load product detail page
        await ignoreFreshChat(this.page);
        await this.page.goto('/nuvola-4609', { waitUntil: 'load' });
        await this.page.waitForFunction(() => document.fonts.ready);
        await checkButtonAvailability(this.page);

        // add sample to cart
        await this.page.getByText(/Gratis Stoffmuster bestellen/).first().click();

        // ----------------------- ADD MUSTER /amparo-4531 TO CART -------------------------------
        // ---------------------------------------------------------------------------------------

        // load product detail page
        await ignoreFreshChat(this.page);
        await this.page.goto('/amparo-4531', { waitUntil: 'load' });
        await this.page.waitForFunction(() => document.fonts.ready);
        await checkButtonAvailability(this.page);
        //load js files
        // cy.wait('@configurator-js-files')

        // add sample to cart
        await this.page.getByText(/Gratis Stoffmuster bestellen/).first().click();

        // ----------------------- ADD MUSTER /radiance-4876 TO CART -----------------------------
        // ---------------------------------------------------------------------------------------

        // load product detail page
        await ignoreFreshChat(this.page);
        await this.page.goto('/radiance-4876', { waitUntil: 'load' });
        await this.page.waitForFunction(() => document.fonts.ready);
        await checkButtonAvailability(this.page);

        // add sample to cart
        await this.page.getByText(/Gratis Stoffmuster bestellen/).first().click();

    }
}