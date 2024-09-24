import { argosScreenshot } from "@argos-ci/playwright";
import { expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, ignoreFacebook, checkButtonAvailability } from '../support/helpers';

var data = {
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
        console.log(`Entering checkout ...`);
        try {
            await checkButtonAvailability(this.page);
            console.log(`Button availability checked.`);

            // Take argos screenshot of cart
            await argosScreenshot(this.page, 'Alle Produkte im Warenkorb', {
                viewports: [
                    "macbook-16",
                    "iphone-6"
                ]
            });

            // Proceed to checkout
            console.log(`Proceeding to checkout...`);
            await this.page.locator('div.cart-collaterals ul span > span').click();
            await expect(this.page).toHaveURL(new RegExp('/checkout/onepage$'));

            // Select customer type
            console.log(`Selecting customer type...`);
            await this.page.getByText(/Als Gast zur Kasse gehen/).first().click();
            await this.page.getByText(/Fortsetzen/).first().click();

            // Check request for /checkout/onepage/saveMethod
            await Promise.all([
                this.page.waitForResponse(response =>
                    response.url().includes('/checkout/onepage/saveMethod') && response.status() === 200, { timeout: 2000 }
                ).then(() => console.log('RESPONSE RECEIVED - /checkout/onepage/saveMethod'))
            ]);

            // Billing information
            console.log(`Entering billing information...`);
            await this.fillBillingInformation(data);
            
            // Take argos screenshot of filled Rechnungsinformation
            await argosScreenshot(this.page, 'checkout - Rechnungsinformation', {
                viewports: [
                    "macbook-16",
                    "iphone-6"
                ]
            });

            // Shipping information
            console.log(`Entering shipping information...`);
            await this.fillShippingInformation(data);
            
            // Take argos screenshot of filled Versandinformation
            await argosScreenshot(this.page, 'checkout - Versandinformation', {
                viewports: [
                    "macbook-16",
                    "iphone-6"
                ]
            });

            // Shipping method
            console.log(`Selecting shipping method...`);
            await this.selectShippingMethod();

            // Payment information
            console.log(`Entering payment information...`);
            await this.fillPaymentInformation();

            // Order summary
            console.log(`Finalizing order...`);
            await this.orderSummary();

        } catch (error) {
            console.error(`Error during checkout: ${error.message}`);
        }
    }

    async fillBillingInformation(data) {
        try {
            await this.page.locator('[id="billing:prefix"]').click();
            await this.page.locator('[id="billing:prefix"]').type(data.prefix);
            await this.page.locator('[id="billing:firstname"]').fill(data.first_name);
            await this.page.locator('[id="billing:lastname"]').fill(data.last_name);
            await this.page.locator('[id="billing:email"]').fill(data.email);
            await this.page.locator('[id="billing:street1"]').fill(data.street);
            await this.page.locator('[id="billing:postcode"]').fill(data.postal_code);
            await this.page.locator('[id="billing:city"]').fill(data.city);
            await this.page.selectOption("#billing\\:country_id", data.state);
            await this.page.locator('[id="billing:telephone"]').fill(data.phone);
            await this.page.getByText(/An andere Adresse verschicken/).first().click();
            await ignoreFreshChat(this.page);
            await checkButtonAvailability(this.page);
            console.log(`Billing information filled successfully.`);
        } catch (error) {
            console.error(`Error filling billing information: ${error.message}`);
            throw error; // rethrow to handle it in the main checkout flow
        }
    }

    async fillShippingInformation(data) {
        try {
            await this.page.locator('[id="shipping:prefix"]').click();
            await this.page.locator('[id="shipping:prefix"]').type(data.prefix2);
            await this.page.locator('[id="shipping:firstname"]').fill(data.first_name2);
            await this.page.locator('[id="shipping:lastname"]').fill(data.last_name2);
            await this.page.locator('[id="shipping:street1"]').fill(data.street2);
            await this.page.locator('[id="shipping:postcode"]').fill(data.postal_code2);
            await this.page.locator('[id="shipping:city"]').fill(data.city2);
            await this.page.selectOption("#shipping\\:country_id", data.state2);
            await this.page.locator('[id="shipping:telephone"]').fill(data.phone2);
            await ignoreFreshChat(this.page);
            await checkButtonAvailability(this.page);
            console.log(`Shipping information filled successfully.`);
        } catch (error) {
            console.error(`Error filling shipping information: ${error.message}`);
            throw error; // rethrow to handle it in the main checkout flow
        }
    }

    async selectShippingMethod() {
        try {
            await this.page.locator("#opc-shipping button").click();
            await Promise.all([
                this.page.waitForResponse(response =>
                    response.url().includes('/checkout/onepage/saveShipping') && response.status() === 200, { timeout: 2000 }
                ).then(() => console.log('RESPONSE RECEIVED - /checkout/onepage/saveShipping'))
            ]);
            console.log(`Shipping method selected successfully.`);
        } catch (error) {
            console.error(`Error selecting shipping method: ${error.message}`);
            throw error; // rethrow to handle it in the main checkout flow
        }
    }

    async fillPaymentInformation() {
        try {
            await ignoreFreshChat(this.page);
            await checkButtonAvailability(this.page);
            await this.page.getByRole('button', { name: 'Fortsetzen' }).click();
            await Promise.all([
                this.page.waitForResponse(response =>
                    response.url().includes('/checkout/onepage/savePayment') && response.status() === 200, { timeout: 2000 }
                ).then(() => console.log('RESPONSE RECEIVED - /checkout/onepage/savePayment'))
            ]);
            console.log(`Payment information filled successfully.`);
        } catch (error) {
            console.error(`Error filling payment information: ${error.message}`);
            throw error; // rethrow to handle it in the main checkout flow
        }
    }

    async orderSummary() {
        try {
            await ignoreFreshChat(this.page);
            await this.page.locator('iframe.component-frame.visible').waitFor();
            await argosScreenshot(this.page, 'checkout - Bestellübersicht', {
                viewports: [
                    "macbook-16",
                    "iphone-6"
                ]
            });
            console.log(`Order summary displayed successfully.`);
        } catch (error) {
            console.error(`Error displaying order summary: ${error.message}`);
            throw error; // rethrow to handle it in the main checkout flow
        }
    }
}
