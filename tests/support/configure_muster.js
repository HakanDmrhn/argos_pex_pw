import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, ignoreFacebook, checkButtonAvailability } from '../support/helpers';

exports.Muster = class Muster {
    constructor(page) {
        this.page = page;
    }

    async configureMuster() {
        try {
            console.log("Starting Muster configuration...");

            // ----------------------- ADD MUSTER /rovereto-5098 TO CART ----------------------------
            console.log("Ignoring FreshChat script execution for Rovereto...");
            await ignoreFreshChat(this.page);
            
            console.log("Loading product detail page for Rovereto...");
            await this.page.goto('/rovereto-5098', { waitUntil: 'load' });
            await this.page.waitForFunction(() => document.fonts.ready);
            await checkButtonAvailability(this.page);

            console.log("Adding Rovereto sample to cart...");
            await this.page.getByText(/Gratis Stoffmuster bestellen/).first().click();

            // ----------------------- ADD MUSTER /nuvola-4609 TO CART -------------------------------
            console.log("Ignoring FreshChat script execution for Nuvola...");
            await ignoreFreshChat(this.page);
            
            console.log("Loading product detail page for Nuvola...");
            await this.page.goto('/nuvola-4609', { waitUntil: 'load' });
            await this.page.waitForFunction(() => document.fonts.ready);
            await checkButtonAvailability(this.page);

            console.log("Adding Nuvola sample to cart...");
            await this.page.getByText(/Gratis Stoffmuster bestellen/).first().click();

            // ----------------------- ADD MUSTER /amparo-4531 TO CART -------------------------------
            console.log("Ignoring FreshChat script execution for Amparo...");
            await ignoreFreshChat(this.page);
            
            console.log("Loading product detail page for Amparo...");
            await this.page.goto('/amparo-4531', { waitUntil: 'load' });
            await this.page.waitForFunction(() => document.fonts.ready);
            await checkButtonAvailability(this.page);

            console.log("Adding Amparo sample to cart...");
            await this.page.getByText(/Gratis Stoffmuster bestellen/).first().click();

            // ----------------------- ADD MUSTER /radiance-4876 TO CART -----------------------------
            console.log("Ignoring FreshChat script execution for Radiance...");
            await ignoreFreshChat(this.page);
            
            console.log("Loading product detail page for Radiance...");
            await this.page.goto('/radiance-4876', { waitUntil: 'load' });
            await this.page.waitForFunction(() => document.fonts.ready);
            await checkButtonAvailability(this.page);

            console.log("Adding Radiance sample to cart...");
            await this.page.getByText(/Gratis Stoffmuster bestellen/).first().click();

            console.log("Muster configuration completed successfully.");

        } catch (error) {
            console.error("An error occurred during the Muster configuration:", error);
            throw error; // Rethrow the error after logging it
        }
    }
}
