import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';

var data =
{
    "login": "guest",
    "prefix": "Frau",
    "first_name": "Maria",
    "last_name": "Magdalena",
    "email": "maria@delphinus-test.de",
    "street": "Karlsplatz 40",
    "postal_code": "1040",
    "city": "Wien",
    "state": "Österreich",
    "phone": "222219",
    "shipping": "new",
    "prefix2": "Herr",
    "first_name2": "Mirco",
    "last_name2": "Yanar",
    "street2": "104 Bdin Str., Büro 12",
    "postal_code2": "1234",
    "city2": "Sofia",
    "state2": "Bulgarien",
    "phone2": "225588",
    "payment": "bankpayment"
}

exports.Checkout = class Checkout {

    constructor(page) {
        this.page = page;
    }

    async checkout() {

        // take argos screenshot of cart
        await argosScreenshot(this.page, 'Alle Produkte im Warenkorb', {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ]
        });

        // ******************************** PROCEED TO CHECKOUT *********************************

        await this.page.locator('div.cart-collaterals ul span > span').click();

        // check if checkout is loaded
        await expect(this.page).toHaveURL(new RegExp('/checkout/onepage$'));



        // select customer type
        await this.page.getByText(/Als Gast zur Kasse gehen/).first().click();
        await this.page.getByText(/Fortsetzen/).first().click();

        // check if needed
        // const saveMethod = this.page.waitForResponse('/checkout/onepage/saveMethod');


        //--------------------------- RECHNUNGSINFORMATION ------------------------------
        //-------------------------------------------------------------------------------

        await this.page.locator('[id="billing:prefix"]').click()
        await this.page.locator('[id="billing:prefix"]').type(data.prefix)
        await this.page.locator('[id="billing:prefix"]').click()
        await this.page.locator('[id="billing:firstname"]').clear()
        await this.page.locator('[id="billing:firstname"]').fill(data.first_name)
        await this.page.locator('[id="billing:lastname"]').clear()
        await this.page.locator('[id="billing:lastname"]').fill(data.last_name)
        await this.page.locator('[id="billing:email"]').fill(data.email)
        await this.page.locator('[id="billing:street1"]').fill(data.street)
        await this.page.locator('[id="billing:postcode"]').fill(data.postal_code)
        await this.page.locator('[id="billing:city"]').fill(data.city)
        await this.page.selectOption("#billing\\:country_id", data.state)
        await this.page.locator('[id="billing:telephone"]').fill(data.phone)

        await this.page.getByText(/An andere Adresse verschicken/).first().click();

        // take argos screenshot of filled Rechnungsinformation
        await argosScreenshot(this.page, 'checkout - Rechnungsinformation', {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ]
        });

        await this.page.getByRole('button', { name: 'Weiter' }).click();


        //--------------------------- VERSANDINFORMATION --------------------------------
        //-------------------------------------------------------------------------------

        await this.page.locator('[id="shipping:prefix"]').click()
        await this.page.locator('[id="shipping:prefix"]').type(data.prefix2)
        await this.page.locator('[id="shipping:prefix"]').click()
        await this.page.locator('[id="shipping:firstname"]').clear()
        await this.page.locator('[id="shipping:firstname"]').fill(data.first_name2)
        await this.page.locator('[id="shipping:lastname"]').clear()
        await this.page.locator('[id="shipping:lastname"]').fill(data.last_name2)
        await this.page.locator('[id="shipping:street1"]').fill(data.street2)
        await this.page.locator('[id="shipping:postcode"]').fill(data.postal_code2)
        await this.page.locator('[id="shipping:city"]').fill(data.city2)
        await this.page.selectOption("#shipping\\:country_id", data.state2)
        await this.page.locator('[id="shipping:telephone"]').fill(data.phone2)

        // take argos screenshot of filled Versandinformation
        await argosScreenshot(this.page, 'checkout - Versandinformation', {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ]
        });

        //Fortsetzen Button bei Lieferadresse
        await this.page.locator("#opc-shipping button").click()


        //--------------------------------- VERSANDART ----------------------------------
        //-------------------------------------------------------------------------------
        
        // take argos screenshot of Versandkosten (Versandart)
        await argosScreenshot(this.page, 'checkout - Versandinformation', {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ]
        });

        //Button "Fortsetzen" bei Versandart
        await this.page.locator("#opc-shipping_method button").click()


        //--------------------------- ZAHLUNGSINFORMATION -------------------------------
        //-------------------------------------------------------------------------------

         // take argos screenshot of Zahlungsinformation (Zahlarten)
         await argosScreenshot(this.page, 'checkout - Zahlungsinformation', {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ]
        });

        // Fortsetzen Button
        await this.page.getByRole('button', { name: 'Fortsetzen' }).click();


        //----------------------------- BESTELLÜBERSICHT --------------------------------
        //-------------------------------------------------------------------------------


        //take snapshot of checkout: Bestellübersicht
        await argosScreenshot(this.page, 'checkout - Bestellübersicht', {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ]
        });


    


    }
}