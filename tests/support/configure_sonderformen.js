import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';

exports.Sonderformen = class Sonderformen {

    constructor(page) {
        this.page = page;
    }

    async configureSonderformen() {

        // --------------------------------------------------------------------------------------
        // ---------------------------- ADD DREICK TO CART -------------------------------------
        // --------------------------------------------------------------------------------------

        // load product detail page
        await this.page.goto('/crush-topar-4614');

        // Tab Sonderformen
        const SDtab = this.page.getByText(/Sonderformen/, { exact: true }).first()

        // select tab and check if it is active
        await SDtab.click();
        await expect(SDtab.locator('..')).toHaveClass(/active/);  // locator(..) --> yields parent element

        // Fensterform wählen
        await this.page.locator("label[for='triangle']").click()

        // Plisseetyp wählen
        await this.page.locator("label[for='vs9']").click()

        // input height and weight
        await this.page.locator('input#hoehe').fill('1500');
        await this.page.locator('input#breite').fill('1100');


        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();

        await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));



        // --------------------------------------------------------------------------------------
        // ---------------------------- ADD VIERECK TO CART -------------------------------------
        // --------------------------------------------------------------------------------------

        // load product detail page
        await this.page.goto('/accento-1543');

        // select tab and check if it is active
        await SDtab.click();
        await expect(SDtab.locator('..')).toHaveClass(/active/);  // locator(..) --> yields parent element

        // Fensterform wählen
        await this.page.locator("label[for='rectangle']").click()

        // Plisseetyp wählen
        await this.page.locator("label[for='vs3']").click()

        //input height and weight
        await this.page.locator('input#hoehe').fill('1400');
        await this.page.locator('input#breite').fill('1000');

        // select second cloth
        await this.page.locator('#unterer_stoff_gruppe_select').selectOption({ label: 'Allessandria' });
        // await this.page.selectOption(('select[name="unterer_stoff_gruppe"]'), unterer_Stoff)
        await this.page.locator('#unterer_stoff_nummer_select').selectOption({ label: '1232' });

        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();

        await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));



        // --------------------------------------------------------------------------------------
        // ---------------------------- ADD FÜNFECK TO CART -------------------------------------
        // --------------------------------------------------------------------------------------

        // load product detail page
        await this.page.goto('/lecce-4912');

        // select tab and check if it is active
        await SDtab.click();
        await expect(SDtab.locator('..')).toHaveClass(/active/);  // locator(..) --> yields parent element

        // Fensterform wählen
        await this.page.locator("label[for='pentagon']").click()

        // Plisseetyp wählen
        await this.page.locator("label[for='vs5']").click()

        //input height and weight
        await this.page.locator('input#breite_oben').fill('500');
        await this.page.locator('input#breite_unten').fill('1000');
        await this.page.locator('input#hoehe_links').fill('1500');
        await this.page.locator('input#hoehe_rechts').fill('1000');


        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();

        await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));


        // --------------------------------------------------------------------------------------
        // ---------------------------- ADD SECHSECK TO CART ------------------------------------
        // --------------------------------------------------------------------------------------

        // load product detail page
        await this.page.goto('/crush-topar-4255');

        // select tab and check if it is active
        await SDtab.click();
        await expect(SDtab.locator('..')).toHaveClass(/active/);  // locator(..) --> yields parent element

        // Fensterform wählen
        await this.page.locator("label[for='hexagon']").click()

        // Plisseetyp wählen
        await this.page.locator("label[for='vs6']").click()

        //input height and weight
        await this.page.locator('input#breite_oben').fill('500');
        await this.page.locator('input#breite_unten').fill('1000');
        await this.page.locator('input#gesamthoehe').fill('1500');
        await this.page.locator('input#teilhoehe').fill('1000');


        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();

        await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));


        // --------------------------------------------------------------------------------------
        // ---------------------------- ADD PLAFOND TO CART -------------------------------------
        // --------------------------------------------------------------------------------------

        // load product detail page
        await this.page.goto('/radiance-4876');

        // select tab and check if it is active
        await SDtab.click();
        await expect(SDtab.locator('..')).toHaveClass(/active/);  // locator(..) --> yields parent element

        // Fensterform wählen
        await this.page.locator("label[for='plafond']").click()

        // Plisseetyp wählen
        await this.page.locator("label[for='plk13']").click()

        //input height and weight
        await this.page.locator('input#hoehe').fill('2000');
        await this.page.locator('input#breite').fill('1200');


        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();

        await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));

    }
}