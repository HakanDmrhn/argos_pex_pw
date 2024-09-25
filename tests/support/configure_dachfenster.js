import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, ignoreFacebook, checkButtonAvailability } from '../support/helpers';

exports.Dachfenster = class Dachfenster {
    constructor(page) {
        this.page = page;
    }

    async configureDachfenster() {
        try {
            console.log("Starting Dachfenster configuration...");

            // ------------------------------ GENORMT --------------------------------------------
            console.log("Ignoring FreshChat script execution for GENORMT...");
            await ignoreFreshChat(this.page);

            console.log("Loading configurator for GENORMT...");
            await this.page.goto('/turin-1051', { waitUntil: 'load' });
            await this.page.waitForFunction(() => document.fonts.ready);
            await checkButtonAvailability(this.page);

            console.log("Selecting Dachfenster tab...");
            const DFtab = this.page.getByText(/Dachfenster/, { exact: true }).first();
            await DFtab.click();
            await expect(DFtab.locator('..')).toHaveClass(/active/);
            console.log("Dachfenster tab is active.");

            console.log("Setting Plissee type...");
            await this.page.locator("label[for='df20c']").click();

            console.log("Selecting manufacturer, product, and type...");
            await this.page.locator('#df_hersteller_select').selectOption({ label: 'Roto' });
            await this.page.locator('#df_product_select').selectOption({ label: '520' });
            await this.page.locator('#df_product_type_select').selectOption({ label: '13 / 14 (Holz)' });

            console.log("Selecting Schienenfarbe...");
            await this.page.getByText('grau', { exact: true }).click();

            console.log("Inputting quantity and adding to cart...");
            await this.page.locator('#qty').clear();
            await this.page.locator('#qty').fill('1');
            await this.page.locator('.add_to_cart_button').click();

            await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));
            console.log("Successfully added GENORMT to cart.");

            // ------------------------------ UNGENORMT --------------------------------------------
            console.log("Ignoring FreshChat script execution for UNGENORMT...");
            await ignoreFreshChat(this.page);

            console.log("Loading configurator for UNGENORMT...");
            await this.page.goto('/meran-1176', { waitUntil: 'load' });
            await this.page.waitForFunction(() => document.fonts.ready);
            await checkButtonAvailability(this.page);

            console.log("Selecting Dachfenster tab...");
            await DFtab.click();
            await expect(DFtab.locator('..')).toHaveClass(/active/);
            console.log("Dachfenster tab is active.");

            console.log("Setting Plissee type for UNGENORMT...");
            await this.page.locator("label[for='df20']").click();

            console.log("Selecting ungenormte Fenster...");
            await this.page.getByText(/Ungenormte Fenster/).first().click();

            console.log("Setting dimensions...");
            await this.page.locator('#glasbreite').fill('1000');
            await this.page.locator('#glashoehe').fill('1400');
            await this.page.locator('#glasleistentiefe').fill('50');
            await this.page.locator('#fluegelinnenmass').fill('1100');
            await this.page.locator('#fluegelhoehe').fill('1500');

            console.log("Setting falz...");
            await this.page.locator("label[for='falz_mit_schattenfuge']").click();

            console.log("Inputting quantity and adding to cart...");
            await this.page.locator('#qty').clear();
            await this.page.locator('#qty').fill('1');
            await this.page.locator('.add_to_cart_button').click();

            await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));
            console.log("Successfully added UNGENORMT to cart.");

        } catch (error) {
            console.error("An error occurred during the Dachfenster configuration:", error);
            throw error; // Rethrow the error after logging it
        }
    }
}
