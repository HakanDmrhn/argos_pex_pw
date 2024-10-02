import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, ignoreFacebook, checkButtonAvailability } from '../support/helpers';

exports.Zubehoer = class Zubehoer {

    constructor(page) {
        this.page = page;
    }

    async configureZubehoer() {
        try {
            // ----------------------- ADD KLEMMTRAEGER TO CART -------------------------------------
            console.log('Configuring Zubehoer: Adding Klemmträger');
            await ignoreYoutubeAndFreshchat(this.page);
            await this.page.goto('/klemmtraeger-slim', { waitUntil: 'load' });
            await this.page.waitForFunction(() => document.fonts.ready);
            await checkButtonAvailability(this.page);

            // Select color grau
            await this.page.locator('.product-options select').selectOption({ label: 'grau' });

            // Input quantity and add to cart
            await this.page.locator('#qty').clear();
            await this.page.locator('#qty').fill('1');
            await this.page.locator('.add_to_cart_button').click();
            console.log('Klemmträger added to cart successfully.');

            // ----------------------- ADD GELENKKLEBEPLATTEN TO CART -------------------------------------
            console.log('Configuring Zubehoer: Adding Gelenkklebeplatten');
            await this.page.goto('/gelenkklebeplatten', { waitUntil: 'load' });
            await this.page.waitForFunction(() => document.fonts.ready);
            await checkButtonAvailability(this.page);

            // Input quantity and add to cart
            await this.page.locator('#qty').clear();
            await this.page.locator('#qty').fill('1');
            await this.page.locator('.add_to_cart_button').click();
            console.log('Gelenkklebeplatten added to cart successfully.');

            // ----------------------- ADD BEDIENGRIFF DESIGN TO CART -------------------------------------
            console.log('Configuring Zubehoer: Adding Bediengriff Design');
            await this.page.goto('/bediengriff-design', { waitUntil: 'load' });
            await this.page.waitForFunction(() => document.fonts.ready);
            await checkButtonAvailability(this.page);

            // Select color bronze
            await this.page.locator('.product-options select').selectOption({ label: 'bronze' });

            // Input quantity and add to cart
            await this.page.locator('#qty').clear();
            await this.page.locator('#qty').fill('1');
            await this.page.locator('.add_to_cart_button').click();
            console.log('Bediengriff Design added to cart successfully.');

            // ----------------------- ADD KLEBEPALTTEN TO CART -------------------------------------
            console.log('Configuring Zubehoer: Adding Klebeplatten');
            await this.page.goto('/klebeplatten', { waitUntil: 'load' });
            await this.page.waitForFunction(() => document.fonts.ready);
            await checkButtonAvailability(this.page);

            // Input quantity and add to cart
            await this.page.locator('#qty').clear();
            await this.page.locator('#qty').fill('1');
            await this.page.locator('.add_to_cart_button').click();
            console.log('Klebeplatten added to cart successfully.');

            // Check if redirected to cart
            await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));
            console.log('Successfully navigated to checkout cart.');

        } catch (error) {
            console.error('Error occurred while configuring Zubehoer:', error);
            throw error; // rethrow to propagate the error if needed
        }
    }
}
