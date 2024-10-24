import { argosScreenshot } from '@argos-ci/playwright'
import { expect } from '@playwright/test'
import { ignoreYoutubeAndFreshchat, checkButtonAvailability } from '../support/helpers'

const scrollToBottom = require('scroll-to-bottomjs')

const data = {
  login: 'guest',
  prefix: 'Frau',
  first_name: 'Maria',
  last_name: 'Magdalena',
  email: 'maria@delphinus-test.de',
  street: 'Karlsplatz 40',
  postal_code: '1040',
  city: 'Wien',
  state: 'Österreich',
  phone: '222219',
  shipping: 'new',
  prefix2: 'Herr',
  first_name2: 'Mirco',
  last_name2: 'Yanar',
  street2: '104 Bdin Str., Büro 12',
  postal_code2: '1234',
  city2: 'Sofia',
  state2: 'Bulgarien',
  phone2: '225588',
  payment: 'bankpayment'
}

/**
 * Class representing the checkout process.
 */
exports.Checkout = class Checkout {
  /**
   * Creates an instance of the Checkout class.
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  constructor (page) {
    this.page = page
  }

  /**
   * Executes the full checkout process, filling in billing and shipping information, selecting a payment method,
   * and capturing screenshots at various stages.
   * @returns {Promise<void>} A promise that resolves when the checkout is completed successfully.
   * @throws Will throw an error if any step in the checkout process fails.
   */
  async checkout () {
    try {
      console.log('Entering checkout...')

      // Ignore YouTube and Freshchat widgets
      await ignoreYoutubeAndFreshchat(this.page)
      await this.page.waitForFunction(() => document.fonts.ready)
      await checkButtonAvailability(this.page)
      await this.page.evaluate(scrollToBottom)

      // Take Argos screenshot of the cart before proceeding
      console.log('Taking screenshot of cart...')
      await argosScreenshot(this.page, 'Alle Produkte im Warenkorb', {
        viewports: ['macbook-16', 'iphone-6']
      })

      // Proceed to checkout
      console.log('Clicking to proceed to checkout...')
      await this.page.locator('div.cart-collaterals ul span > span').click()

      // Wait for checkout page to load
      console.log('Waiting for checkout page to load...')
      await expect(this.page).toHaveURL(/\/checkout\/onepage$/)

      // Select guest checkout option
      console.log('Selecting guest checkout option...')
      await this.page.getByText(/Als Gast zur Kasse gehen/).first().click()
      await this.page.getByText(/Fortsetzen/).first().click()

      // Wait for response from saveMethod API
      console.log('Waiting for saveMethod response...')
      await Promise.all([
        this.page.waitForResponse(response =>
          response.url().includes('/checkout/onepage/saveMethod') &&
                    response.status() === 200, {
          timeout: 2000
        }
        ).then(() => console.log('RESPONSE RECEIVED - /checkout/onepage/saveMethod'))
      ])

      // Fill billing information
      console.log('Filling billing information...')
      await this.page.locator('[id="billing:prefix"]').click()
      await this.page.locator('[id="billing:prefix"]').type(data.prefix)
      await this.page.locator('[id="billing:firstname"]').fill(data.first_name)
      await this.page.locator('[id="billing:lastname"]').fill(data.last_name)
      await this.page.locator('[id="billing:email"]').fill(data.email)
      await this.page.locator('[id="billing:street1"]').fill(data.street)
      await this.page.locator('[id="billing:postcode"]').fill(data.postal_code)
      await this.page.locator('[id="billing:city"]').fill(data.city)
      await this.page.selectOption('#billing\\:country_id', data.state)
      await this.page.locator('[id="billing:telephone"]').fill(data.phone)

      await this.page.getByText(/An andere Adresse verschicken/).first().click()
      await this.page.waitForFunction(() => document.fonts.ready)
      await checkButtonAvailability(this.page)
      await this.page.evaluate(scrollToBottom)

      // Take screenshot of filled billing information
      console.log('Taking screenshot of filled billing information...')
      await argosScreenshot(this.page, 'checkout - Rechnungsinformation', {
        viewports: ['macbook-16', 'iphone-6']
      })

      console.log('Clicking Weiter button after billing info...')
      await this.page.getByRole('button', { name: 'Weiter' }).click()

      // Wait for response from saveBilling API
      console.log('Waiting for saveBilling response...')
      await Promise.all([
        this.page.waitForResponse(response =>
          response.url().includes('/checkout/onepage/saveBilling') &&
                    response.status() === 200, {
          timeout: 2000
        }
        ).then(() => console.log('RESPONSE RECEIVED - /checkout/onepage/saveBilling'))
      ])

      // Fill shipping information
      console.log('Filling shipping information...')
      await this.page.locator('[id="shipping:prefix"]').click()
      await this.page.locator('[id="shipping:prefix"]').type(data.prefix2)
      await this.page.locator('[id="shipping:firstname"]').fill(data.first_name2)
      await this.page.locator('[id="shipping:lastname"]').fill(data.last_name2)
      await this.page.locator('[id="shipping:street1"]').fill(data.street2)
      await this.page.locator('[id="shipping:postcode"]').fill(data.postal_code2)
      await this.page.locator('[id="shipping:city"]').fill(data.city2)
      await this.page.selectOption('#shipping\\:country_id', data.state2)
      await this.page.locator('[id="shipping:telephone"]').fill(data.phone2)

      await checkButtonAvailability(this.page)

      // Take screenshot of filled shipping information
      console.log('Taking screenshot of filled shipping information...')
      await argosScreenshot(this.page, 'checkout - Versandinformation', {
        viewports: ['macbook-16', 'iphone-6']
      })

      console.log('Clicking Weiter button after shipping info...')
      await this.page.locator('#opc-shipping button').click()

      // Wait for response from saveShipping API
      console.log('Waiting for saveShipping response...')
      await Promise.all([
        this.page.waitForResponse(response =>
          response.url().includes('/checkout/onepage/saveShipping') &&
                    response.status() === 200, {
          timeout: 2000
        }
        ).then(() => console.log('RESPONSE RECEIVED - /checkout/onepage/saveShipping'))
      ])

      // Shipping method selection
      console.log('Waiting for shipping address progress...')
      await this.page.locator('#shipping-progress-opcheckout address').waitFor()

      // Take screenshot of Versandkosten (Versandart)
      console.log('Taking screenshot of Versandkosten (Versandart)...')
      await argosScreenshot(this.page, 'checkout - Versandart', {
        viewports: ['macbook-16', 'iphone-6']
      })

      await this.page.locator('#opc-shipping_method button').click()

      // Wait for response from saveShippingMethod API
      console.log('Waiting for saveShippingMethod response...')
      await Promise.all([
        this.page.waitForResponse(response =>
          response.url().includes('/checkout/onepage/saveShippingMethod') &&
                    response.status() === 200, {
          timeout: 2000
        }
        ).then(() => console.log('RESPONSE RECEIVED - /checkout/onepage/saveShippingMethod'))
      ])

      // Payment information
      await checkButtonAvailability(this.page)

      // Take screenshot of Zahlungsinformation (Zahlarten)
      console.log('Taking screenshot of Zahlungsinformation (Zahlarten)...')
      await argosScreenshot(this.page, 'checkout - Zahlungsinformation', {
        viewports: ['macbook-16', 'iphone-6']
      })

      await this.page.getByRole('button', {
        name: 'Fortsetzen'
      }).click()

      // Wait for response from savePayment API
      console.log('Waiting for savePayment response...')
      await Promise.all([
        this.page.waitForResponse(response =>
          response.url().includes('/checkout/onepage/savePayment') &&
                    response.status() === 200, {
          timeout: 2000
        }
        ).then(() => console.log('RESPONSE RECEIVED - /checkout/onepage/savePayment'))
      ])

      // Order summary
      await this.page.waitForFunction(() => document.fonts.ready)
      await checkButtonAvailability(this.page)
      await this.page.evaluate(scrollToBottom)

      // Take screenshot of Bestellübersicht
      console.log('Taking screenshot of Bestellübersicht...')
      await argosScreenshot(this.page, 'checkout - Bestellübersicht', {
        viewports: ['macbook-16', 'iphone-6']
      })
    } catch (error) {
      console.error(`Error during checkout process: ${error}`)
      throw error
    }
  }
}
