import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, ignoreFacebook, checkButtonAvailability } from '../support/helpers';

exports.Serviceprodukte = class Serviceprodukte {
    constructor(page) {
        this.page = page;
    }

    async configureServiceprodukte() {
        try {
            console.log("Starting configuration for Serviceprodukte...");

            // ----------------------- ADD BREITE KÜRZEN TO CART -------------------------------------
            console.log("Navigating to 'Breite Kürzen' service...");
            await ignoreFreshChat(this.page);
            await this.page.goto('/aenderungsauftrag-breite', { waitUntil: 'load' });
            await this.page.waitForFunction(() => document.fonts.ready);
            await checkButtonAvailability(this.page);

            console.log("Filling in 'Breite Kürzen' form...");
            await this.page.locator('label:has-text("Bestellnummer") + input').fill('10001000');
            await this.page.locator('label:has-text("Produkt") + input').fill('Syrakus-2079');
            await this.page.locator('label:has-text("Breite lt. Lieferschein") + input').fill('1000');
            await this.page.locator('label:has-text("Höhe lt. Lieferschein") + input').fill('1000');
            await this.page.locator('label:has-text("gewünschte Breite in mm") + input').fill('900');

            console.log("Setting quantity to 1 and adding to cart...");
            await this.page.locator('#qty').clear();
            await this.page.locator('#qty').fill('1');
            await this.page.locator('.add_to_cart_button').click();

            console.log("Verifying redirection to cart...");
            await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));

            // ----------------------- ADD SCHNUR ERSETZEN TO CART -------------------------------------
            console.log("Navigating to 'Schnur Ersetzen' service...");
            await ignoreFreshChat(this.page);
            await this.page.goto('/reparaturauftrag-schnur-ersetzen', { waitUntil: 'load' });
            await this.page.waitForFunction(() => document.fonts.ready);
            await checkButtonAvailability(this.page);

            console.log("Filling in 'Schnur Ersetzen' form...");
            await this.page.locator('label:has-text("Bestellnummer") + input').fill('10002000');
            await this.page.locator('label:has-text("Produkt") + input').fill('Syrakus-2079');
            await this.page.locator('label:has-text("Breite lt. Lieferschein") + input').fill('1000');
            await this.page.locator('label:has-text("Höhe lt. Lieferschein") + input').fill('1000');
            await this.page.locator('label:has-text("gewünschte Höhe in mm") + input').fill('1200');

            console.log("Setting quantity to 1 and adding to cart...");
            await this.page.locator('#qty').clear();
            await this.page.locator('#qty').fill('1');
            await this.page.locator('.add_to_cart_button').click();

            console.log("Verifying redirection to cart...");
            await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));

            // ----------------------- ADD SCHNURLÄNGE ÄNDERN TO CART -------------------------------------
            console.log("Navigating to 'Schnurlänge Ändern' service...");
            await ignoreFreshChat(this.page);
            await this.page.goto('/aenderungsauftrag-schnurlaenge', { waitUntil: 'load' });
            await this.page.waitForFunction(() => document.fonts.ready);
            await checkButtonAvailability(this.page);

            console.log("Filling in 'Schnurlänge Ändern' form...");
            await this.page.locator('label:has-text("Bestellnummer") + input').fill('10003000');
            await this.page.locator('label:has-text("Produkt") + input').fill('Bologna-2028');
            await this.page.locator('label:has-text("Breite lt. Lieferschein") + input').fill('1000');
            await this.page.locator('label:has-text("Höhe lt. Lieferschein") + input').fill('1000');
            await this.page.locator('label:has-text("gewünschte Höhe in mm") + input').fill('1500');

            console.log("Setting quantity to 1 and adding to cart...");
            await this.page.locator('#qty').clear();
            await this.page.locator('#qty').fill('1');
            await this.page.locator('.add_to_cart_button').click();

            console.log("Verifying redirection to cart...");
            await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));

            // --------------- ADD ZUSATZAUFTRAG LÄNGERE SCHNÜRE TO CART -------------------------
            console.log("Navigating to 'Zusatzauftrag Längere Schnüre' service...");
            await ignoreFreshChat(this.page);
            await this.page.goto('/zusatzauftrag-laengere-fuehrungsschnuere', { waitUntil: 'load' });
            await this.page.waitForFunction(() => document.fonts.ready);
            await checkButtonAvailability(this.page);

            console.log("Filling in 'Zusatzauftrag Längere Schnüre' form...");
            await this.page.locator('label:has-text("Produktname") + input').fill('Peschiera-5027');
            await this.page.locator('label:has-text("Schienenfarbe") + input').fill('silber');
            await this.page.locator('label:has-text("Breite (in mm)") + input').fill('1000');
            await this.page.locator('label:has-text("Höhe (in mm)") + input').fill('1500');
            await this.page.locator('label:has-text("Gewünschte Länge der Schnüre (in mm)") + input').fill('2000');
            await this.page.locator('label:has-text("Gewünschte Seite") + select').selectOption('links');
            await this.page.locator('label:has-text("Sonstige Anmerkungen") + textarea').fill('Testdaten für das visuelle Testen');

            console.log("Setting quantity to 1 and adding to cart...");
            await this.page.locator('#qty').clear();
            await this.page.locator('#qty').fill('1');
            await this.page.locator('.add_to_cart_button').click();

            console.log("Verifying redirection to cart...");
            await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));

            console.log("Serviceprodukte configuration completed successfully.");
        } catch (error) {
            console.error("An error occurred during the Serviceprodukte configuration:", error);
            throw error; // Rethrow the error after logging it
        }
    }
}
