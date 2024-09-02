import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, ignoreFacebook, checkButtonAvailability } from '../support/helpers';

exports.Zubehoer = class Zubehoer {

    constructor(page) {
        this.page = page;
    }

    async configureZubehoer() {


        // ----------------------- ADD KLEMMTRAEGER TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // block FreshChat script execution
        await ignoreFreshChat(this.page);
        console.log('/klemmtraeger-slim');
        await this.page.goto('/klemmtraeger-slim', { waitUntil: 'load' });
        await this.page.waitForFunction(() => document.fonts.ready);
        await checkButtonAvailability(this.page);
        
        // select color grau
        await this.page.locator('.product-options select').selectOption({ label: 'grau' })

        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();


        // ----------------------- ADD GELENKKLEBEPLATTEN TO CART -------------------------------------
        // --------------------------------------------------------------------------------------------

        // load product detail page
        await ignoreFreshChat(this.page);
        console.log('/gelenkklebeplatten');
        await this.page.goto('/gelenkklebeplatten', { waitUntil: 'load' });
        await this.page.waitForFunction(() => document.fonts.ready);


        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();

        // ----------------------- ADD BEDIENGRIFF DESIGN TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        await ignoreFreshChat(this.page);
        console.log('/bediengriff-design');
        await this.page.goto('/bediengriff-design', { waitUntil: 'load' });
        await this.page.waitForFunction(() => document.fonts.ready);

        // select color bronze
        await this.page.locator('.product-options select').selectOption({ label: 'bronze' })

        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();

        // ----------------------- ADD KLEBEPALTTEN TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        await ignoreFreshChat(this.page);
        console.log('/klebeplatten');
        await this.page.goto('/klebeplatten', { waitUntil: 'load' });
        await this.page.waitForFunction(() => document.fonts.ready);

        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();


        await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));

    }
}