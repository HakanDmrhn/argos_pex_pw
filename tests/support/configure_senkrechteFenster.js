import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, ignoreFacebook, checkButtonAvailability } from '../support/helpers';

exports.SenkrechteFenster = class SenkrechteFenster {
    constructor(page) {
        this.page = page;
    }

    async configureSenkrechteFenster() {
        try {
            console.log("Starting configuration for Senkrechte Fenster...");

            // Block FreshChat script execution
            console.log("Ignoring FreshChat script execution...");
            await ignoreFreshChat(this.page);

            console.log("Loading product detail page for Meran...");
            await this.page.goto('/meran-5076', { waitUntil: 'load' });
            await this.page.waitForFunction(() => document.fonts.ready);
            await checkButtonAvailability(this.page);

            console.log("Inputting height and width...");
            await this.page.locator('input#hoehe').fill('1500');
            await this.page.locator('input#breite').fill('1500');

            // Input quantity and add to cart
            console.log("Setting quantity to 1...");
            await this.page.locator('#qty').clear();
            await this.page.locator('#qty').fill('1');
            console.log("Clicking on add to cart button...");
            await this.page.locator('.add_to_cart_button').click();

            console.log("Waiting for a brief moment to ensure cart switch...");
            await this.page.waitForTimeout(1500); // Wait to allow for page transition

            console.log("Verifying the URL to confirm cart addition...");
            await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));

            console.log("Senkrechte Fenster configuration completed successfully.");
        } catch (error) {
            console.error("An error occurred during the Senkrechte Fenster configuration:", error);
            throw error; // Rethrow the error after logging it
        }
    }
}
