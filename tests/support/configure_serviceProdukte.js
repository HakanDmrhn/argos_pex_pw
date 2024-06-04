import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';

exports.Serviceprodukte = class Serviceprodukte {

    constructor(page) {
        this.page = page;
    }

    async configureServiceprodukte() {

        // ----------------------- ADD BREITE KÜRZEN TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // visit service page
        await this.page.goto('/aenderungsauftrag-breite')

        await this.page.locator('label:has-text("Bestellnummer") + input').fill('10001000');
        await this.page.locator('label:has-text("Produkt") + input').fill('Syrakus-2079');
        await this.page.locator('label:has-text("Breite lt. Lieferschein") + input').fill('1000');
        await this.page.locator('label:has-text("Höhe lt. Lieferschein") + input').fill('1000');
        await this.page.locator('label:has-text("gewünschte Breite in mm") + input').fill('900');

        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();

        await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));



        // ----------------------- ADD SCHNUR ERSETZEN TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // visit service page
        await this.page.goto('/reparaturauftrag-schnur-ersetzen')

        await this.page.locator('label:has-text("Bestellnummer") + input').fill('10002000');
        await this.page.locator('label:has-text("Produkt") + input').fill('Syrakus-2079');
        await this.page.locator('label:has-text("Breite lt. Lieferschein") + input').fill('1000');
        await this.page.locator('label:has-text("Höhe lt. Lieferschein") + input').fill('1000');
        await this.page.locator('label:has-text("gewünschte Höhe in mm") + input').fill('1200');

        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();

        await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));


        // ----------------------- ADD SCHNURLÄNGE ÄNDERN TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // visit service page
        await this.page.goto('/aenderungsauftrag-schnurlaenge')

        await this.page.locator('label:has-text("Bestellnummer") + input').fill('10003000');
        await this.page.locator('label:has-text("Produkt") + input').fill('Bologna-2028');
        await this.page.locator('label:has-text("Breite lt. Lieferschein") + input').fill('1000');
        await this.page.locator('label:has-text("Höhe lt. Lieferschein") + input').fill('1000');
        await this.page.locator('label:has-text("gewünschte Höhe in mm") + input').fill('1500');

        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();

        await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));


        // --------------- ADD ZUSATZAUFTRAG LÄNGERE SCHNÜRE TO CART -------------------------
        // ---------------------------------------------------------------------------------

        // visit service page
        await this.page.goto('/zusatzauftrag-laengere-fuehrungsschnuere')

        await this.page.locator('label:has-text("Produktname") + input').fill('Peschiera-5027');
        await this.page.locator('label:has-text("Schienenfarbe") + input').fill('silber');
        await this.page.locator('label:has-text("Breite (in mm)") + input').fill('1000');
        await this.page.locator('label:has-text("Höhe (in mm)") + input').fill('1500');
        await this.page.locator('label:has-text("Gewünschte Länge der Schnüre (in mm)") + input').fill('2000');
        await this.page.locator('label:has-text("Gewünschte Seite") + select').selectOption('links');
        await this.page.locator('label:has-text("Sonstige Anmerkungen") + textarea').fill('Testdaten für das visuelle Testen');

        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();

        await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));
    }
}