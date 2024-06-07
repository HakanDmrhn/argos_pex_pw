import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';

exports.Dachfenster = class Dachfenster {

    constructor(page) {
        this.page = page;
    }

    async configureDachfenster() {

        //------------------------------ GENORMT --------------------------------------------
        //-------------------------------------------------------------------------------------

        //load configurator
        await this.page.goto('/turin-1051');

        // Tab Dachfenster
        const DFtab = this.page.getByText(/Dachfenster/, { exact: true }).first()

        // select tab and check if it is active
        await DFtab.click();
        await expect(DFtab.locator('..')).toHaveClass(/active/);  // locator(..) --> yields parent element

        //set Plissee typ
        await this.page.locator("label[for='df20c']").click()

        //select hersteller, produkt and typ
        await this.page.locator('#df_hersteller_select').selectOption({ label: 'Roto' });
        await this.page.locator('#df_product_select').selectOption({ label: '520' });
        await this.page.locator('#df_product_type_select').selectOption({ label: '13 / 14 (Holz)' });

        // select Schienenfarbe 
        await this.page.getByText('grau', { exact: true }).click()

        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();

        await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));


        //------------------------------ UNGENORMT --------------------------------------------
        //-------------------------------------------------------------------------------------

        // load configurator
        await this.page.goto('/meran-1176');

        // select tab and check if it is active
        await DFtab.click();
        await expect(DFtab.locator('..')).toHaveClass(/active/);  // locator(..) --> yields parent element


        //set Plissee typ
        await this.page.locator("label[for='df20']").click()

        // select ungenormte Fenster
        await this.page.getByText(/Ungenormte Fenster/).first().click();

        // set maße
        await this.page.locator('#glasbreite').fill('1000');
        await this.page.locator('#glashoehe').fill('1400');
        await this.page.locator('#glasleistentiefe').fill('50');
        await this.page.locator('#fluegelinnenmass').fill('1100');
        await this.page.locator('#fluegelhoehe').fill('1500');

        // set falz
        await this.page.locator("label[for='falz_mit_schattenfuge']").click()

        // input quantity and add to cart
        await this.page.locator('#qty').clear();
        await this.page.locator('#qty').fill('1');
        await this.page.locator('.add_to_cart_button').click();

        await expect(this.page).toHaveURL(new RegExp('/checkout/cart'));

    }
}