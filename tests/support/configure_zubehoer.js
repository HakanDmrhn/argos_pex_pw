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

        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();


        // ----------------------- ADD SPANNSCHUH TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        await this.page.goto('/spannschuh');

        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();

        // ----------------------- ADD BEDIENGRIFF DESIGN TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        await this.page.goto('/bediengriff-design');

        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();

        // ----------------------- ADD WANDWINKEL TO CART -------------------------------------
        // ---------------------------------------------------------------------------------

        // load product detail page
        await this.page.goto('/wandwinkel');

        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();


        await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));

    }
}