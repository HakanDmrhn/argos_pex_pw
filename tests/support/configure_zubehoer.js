import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';

exports.Zubehoer = class Zubehoer {

    constructor(page) {
        this.page = page;
    }

    async configureZubehoer() {


        // ----------------------- ADD KLEMMTRAEGER TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        await this.page.goto('/klemmtraeger-slim');

        // select color grau
        await this.page.locator('.product-options select').selectOption({ label: 'grau' })

        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();


        // ----------------------- ADD GELENKKLEBEPLATTEN TO CART -------------------------------------
        // --------------------------------------------------------------------------------------------

        // load product detail page
        await this.page.goto('/gelenkklebeplatten');

        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();

        // ----------------------- ADD BEDIENGRIFF DESIGN TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        await this.page.goto('/bediengriff-design');

        // select color bronze
        await this.page.locator('.product-options select').selectOption({ label: 'bronze' })

        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();

        // ----------------------- ADD KLEBEPALTTEN TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        await this.page.goto('/klebeplatten');

        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();


        await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));

    }
}