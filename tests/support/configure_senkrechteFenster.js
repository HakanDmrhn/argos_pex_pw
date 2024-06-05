import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';

exports.SenkrechteFenster = class SenkrechteFenster {

    constructor(page) {
        this.page = page;
    }

    async configureSenkrechteFenster() {

        // load configurator
        await this.page.goto('/meran-5076');

        // input height and weight
        await this.page.locator('input#hoehe').fill('1500');
        await this.page.locator('input#breite').fill('1500');

        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();

        await this.page.waitForTimeout(1500);  // without this wait there is no switch to '/checkout/cart' when testing on Github

        // this workaround (I) does not help
        // const response = await this.page.request.get('/checkout/cart');
        // await expect(response).toBeOK();  // Ensures the response status code is within 200..299 range.


        await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));
    }
}