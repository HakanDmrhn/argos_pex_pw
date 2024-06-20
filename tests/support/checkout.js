import { argosScreenshot } from "@argos-ci/playwright";
import { expect } from '@playwright/test';
import { ignoreFreshChat } from './helpers'

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

        // ignore FreshChat
        await ignoreFreshChat(this.page)

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
        // await this.page.waitForResponse('/checkout/onepage/saveMethod');

        //------------------------------- CHECK REQUEST ----------------------------//
        //--------------------------------------------------------------------------//
        await Promise.all([
            this.page.waitForResponse(response =>
                response.url().includes('/checkout/onepage/saveMethod')
                && response.status() === 200, { timeout: 2000 }
            && console.log('RESPONSE RECEIVED - /checkout/onepage/saveMethod')
            )
        ]);


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

        // ignore FreshChat
        await ignoreFreshChat(this.page)

        // take argos screenshot of filled Rechnungsinformation
        await argosScreenshot(this.page, 'checkout - Rechnungsinformation', {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ]
        });

        await this.page.getByRole('button', { name: 'Weiter' }).click();

        // check if needed
        // await this.page.waitForResponse('/checkout/onepage/saveBilling');

        //------------------------------- CHECK REQUEST ----------------------------//
        //--------------------------------------------------------------------------//
        await Promise.all([
            this.page.waitForResponse(response =>
                response.url().includes('/checkout/onepage/saveBilling')
                && response.status() === 200, { timeout: 2000 }
            && console.log('RESPONSE RECEIVED - /checkout/onepage/saveBilling')
            )
        ]);


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

        // ignore FreshChat
        await ignoreFreshChat(this.page)

        // take argos screenshot of filled Versandinformation
        await argosScreenshot(this.page, 'checkout - Versandinformation', {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ]
        });

        //Fortsetzen Button bei Lieferadresse
        await this.page.locator("#opc-shipping button").click()

        // check if needed
        // await this.page.waitForResponse('/checkout/onepage/saveShipping');

        //------------------------------- CHECK REQUEST ----------------------------//
        //--------------------------------------------------------------------------//
        await Promise.all([
            this.page.waitForResponse(response =>
                response.url().includes('/checkout/onepage/saveShipping')
                && response.status() === 200, { timeout: 2000 }
            && console.log('RESPONSE RECEIVED - /checkout/onepage/saveShipping')
            )
        ]);


        //--------------------------------- VERSANDART ----------------------------------
        //-------------------------------------------------------------------------------

        // ignore FreshChat
        await ignoreFreshChat(this.page)

        // wait for progressbar
        // shipping address
        await this.page.locator('#shipping-progress-opcheckout address').waitFor();

        // take argos screenshot of Versandkosten (Versandart)
        await argosScreenshot(this.page, 'checkout - Versandart', {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ]
        });

        //Button "Fortsetzen" bei Versandart
        await this.page.locator("#opc-shipping_method button").click()

        // check if needed
        // await this.page.waitForResponse('/checkout/onepage/saveShippingMethod');

        //------------------------------- CHECK REQUEST ----------------------------//
        //--------------------------------------------------------------------------//
        await Promise.all([
            this.page.waitForResponse(response =>
                response.url().includes('/checkout/onepage/saveShippingMethod')
                && response.status() === 200, { timeout: 2000 }
            && console.log('RESPONSE RECEIVED - /checkout/onepage/saveShippingMethod')
            )
        ]);


        //--------------------------- ZAHLUNGSINFORMATION -------------------------------
        //-------------------------------------------------------------------------------

        // ignore FreshChat
        await ignoreFreshChat(this.page)

        // wait for progessbar
        // shipping address
        await this.page.locator('#shipping-progress-opcheckout address').waitFor();
        // Versandart
        await this.page.locator('#shipping_method-progress-opcheckout .content').waitFor();

        // take argos screenshot of Zahlungsinformation (Zahlarten)
        await argosScreenshot(this.page, 'checkout - Zahlungsinformation', {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ]
        });

        // Fortsetzen Button
        await this.page.getByRole('button', { name: 'Fortsetzen' }).click();

        // check if needed
        // await this.page.waitForResponse('/checkout/onepage/savePayment');

        //------------------------------- CHECK REQUEST ----------------------------//
        //--------------------------------------------------------------------------//
        await Promise.all([
            this.page.waitForResponse(response =>
                response.url().includes('/checkout/onepage/savePayment')
                && response.status() === 200, { timeout: 2000 }
            && console.log('RESPONSE RECEIVED - /checkout/onepage/savePayment')
            )
        ]);


        //----------------------------- BESTELLÜBERSICHT --------------------------------
        //-------------------------------------------------------------------------------

        // ignore FreshChat
        await ignoreFreshChat(this.page)

        // wait for progessbar
        // shipping address
        await this.page.locator('#shipping-progress-opcheckout address').waitFor();
        // Versandart
        await this.page.locator('#shipping_method-progress-opcheckout .content').waitFor();
        // Zahlungsart
        await this.page.locator('#payment-progress-opcheckout .content').waitFor();

        // wait for Paypal-Button
        await this.page.locator('iframe.component-frame.visible').waitFor()


        //take snapshot of checkout: Bestellübersicht
        await argosScreenshot(this.page, 'checkout - Bestellübersicht', {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ]
        });
    }
}