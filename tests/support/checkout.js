import { argosScreenshot } from "@argos-ci/playwright";
import { expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, ignoreFacebook, checkButtonAvailability } from '../support/helpers';

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
        try {
            console.log(`Entering checkout...`);
            await checkButtonAvailability(this.page);

            // take Argos screenshot of cart
            console.log(`Taking screenshot of cart...`);
            await argosScreenshot(this.page, 'Alle Produkte im Warenkorb', {
                viewports: ["macbook-16", "iphone-6"]
            });

            console.log('Clicking to proceed to checkout...');
            await this.page.locator('div.cart-collaterals ul span > span').click();

            console.log('Waiting for checkout page to load...');
            await expect(this.page).toHaveURL(new RegExp('/checkout/onepage$'));

            console.log('Selecting guest checkout option...');
            await this.page.getByText(/Als Gast zur Kasse gehen/).first().click();
            await this.page.getByText(/Fortsetzen/).first().click();

            console.log('Waiting for saveMethod response...');
            await Promise.all([
                this.page.waitForResponse(response =>
                    response.url().includes('/checkout/onepage/saveMethod') &&
                    response.status() === 200, { timeout: 2000 }
                ).then(() => console.log('RESPONSE RECEIVED - /checkout/onepage/saveMethod'))
            ]);

            // Billing information
            console.log('Filling billing information...');
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

            console.log('Taking screenshot of filled billing information...');
            await argosScreenshot(this.page, 'checkout - Rechnungsinformation', {
                viewports: ["macbook-16", "iphone-6"]
            });

            console.log('Clicking Weiter button after billing info...');
            await this.page.getByRole('button', { name: 'Weiter' }).click();

            console.log('Waiting for saveBilling response...');
            await Promise.all([
                this.page.waitForResponse(response =>
                    response.url().includes('/checkout/onepage/saveBilling') &&
                    response.status() === 200, { timeout: 2000 }
                ).then(() => console.log('RESPONSE RECEIVED - /checkout/onepage/saveBilling'))
            ]);

            // Shipping information
            console.log('Filling shipping information...');
            await this.page.locator('[id="shipping:prefix"]').click();
            await this.page.locator('[id="shipping:prefix"]').type(data.prefix2);
            await this.page.locator('[id="shipping:firstname"]').fill(data.first_name2);
            await this.page.locator('[id="shipping:lastname"]').fill(data.last_name2);
            await this.page.locator('[id="shipping:street1"]').fill(data.street2);
            await this.page.locator('[id="shipping:postcode"]').fill(data.postal_code2);
            await this.page.locator('[id="shipping:city"]').fill(data.city2);
            await this.page.selectOption("#shipping\\:country_id", data.state2);
            await this.page.locator('[id="shipping:telephone"]').fill(data.phone2);

            await checkButtonAvailability(this.page);
            await ignoreFreshChat(this.page);

            console.log('Taking screenshot of filled shipping information...');
            await argosScreenshot(this.page, 'checkout - Versandinformation', {
                viewports: ["macbook-16", "iphone-6"]
            });

            console.log('Clicking Weiter button after shipping info...');
            await this.page.locator("#opc-shipping button").click();

            console.log('Waiting for saveShipping response...');
            await Promise.all([
                this.page.waitForResponse(response =>
                    response.url().includes('/checkout/onepage/saveShipping') &&
                    response.status() === 200, { timeout: 2000 }
                ).then(() => console.log('RESPONSE RECEIVED - /checkout/onepage/saveShipping'))
            ]);

            // Shipping method
            console.log('Waiting for shipping address progress...');
            await this.page.locator('#shipping-progress-opcheckout address').waitFor();

            console.log('Taking screenshot of Versandkosten (Versandart)...');
            await argosScreenshot(this.page, 'checkout - Versandart', {
                viewports: ["macbook-16", "iphone-6"]
            });

            await this.page.locator("#opc-shipping_method button").click();

            console.log('Waiting for saveShippingMethod response...');
            await Promise.all([
                this.page.waitForResponse(response =>
                    response.url().includes('/checkout/onepage/saveShippingMethod') &&
                    response.status() === 200, { timeout: 2000 }
                ).then(() => console.log('RESPONSE RECEIVED - /checkout/onepage/saveShippingMethod'))
            ]);

            // Payment information
            await ignoreFreshChat(this.page);
            await checkButtonAvailability(this.page);

            console.log('Taking screenshot of Zahlungsinformation (Zahlarten)...');
            await argosScreenshot(this.page, 'checkout - Zahlungsinformation', {
                viewports: ["macbook-16", "iphone-6"]
            });

            await this.page.getByRole('button', { name: 'Fortsetzen' }).click();

            console.log('Waiting for savePayment response...');
            await Promise.all([
                this.page.waitForResponse(response =>
                    response.url().includes('/checkout/onepage/savePayment') &&
                    response.status() === 200, { timeout: 2000 }
                ).then(() => console.log('RESPONSE RECEIVED - /checkout/onepage/savePayment'))
            ]);

            // Order summary
            await this.page.waitForFunction(() => document.fonts.ready);

            console.log('Taking screenshot of Bestellübersicht...');
            await argosScreenshot(this.page, 'checkout - Bestellübersicht', {
                viewports: ["macbook-16", "iphone-6"]
            });

        } catch (error) {
            console.error(`Error during checkout process: ${error}`);
            throw error;
        }
    }
}
