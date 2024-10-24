import { expect } from '@playwright/test'
import { ignoreYoutubeAndFreshchat, checkButtonAvailability } from '../support/helpers'

/**
 * Class representing the configuration for Senkrechte Fenster (Vertical Windows).
 */
exports.SenkrechteFenster = class SenkrechteFenster {
  /**
   * Creates an instance of the SenkrechteFenster class.
   * @param {import('@playwright/test').Page} page - The Playwright page instance.
   */
  constructor (page) {
    this.page = page
  }

  /**
   * Configures the Senkrechte Fenster by inputting dimensions, quantity,
   * and adding the product to the cart.
   * @throws Will throw an error if the configuration process fails.
   */
  async configureSenkrechteFenster () {
    try {
      console.log('Starting configuration for Senkrechte Fenster...')
      await ignoreYoutubeAndFreshchat(this.page)

      // Block FreshChat script execution
      console.log('Ignoring FreshChat script execution...')

      console.log('Loading product detail page for Meran...')
      await this.page.goto('/meran-5076', { waitUntil: 'load' })
      await this.page.waitForFunction(() => document.fonts.ready)
      await checkButtonAvailability(this.page)

      console.log('Inputting height and width...')
      await this.page.locator('input#hoehe').fill('1500')
      await this.page.locator('input#breite').fill('1500')

      // Input quantity and add to cart
      console.log('Setting quantity to 1...')
      await this.page.locator('#qty').clear()
      await this.page.locator('#qty').fill('1')
      console.log('Clicking on add to cart button...')
      await this.page.locator('.add_to_cart_button').click()

      console.log('Waiting for a brief moment to ensure cart switch...')
      await this.page.waitForTimeout(1500) // Wait to allow for page transition

      console.log('Verifying the URL to confirm cart addition...')
      await expect(this.page).toHaveURL(new RegExp('/checkout/cart'))

      console.log('Senkrechte Fenster configuration completed successfully.')
    } catch (error) {
      console.error('An error occurred during the Senkrechte Fenster configuration:', error)
      throw error // Rethrow the error after logging it
    }
  }
}
