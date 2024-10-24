import { argosScreenshot } from '@argos-ci/playwright'
import { ignoreYoutubeAndFreshchat, checkButtonAvailability, waitForTextToAppear } from '../support/helpers'

/**
 * Scrolls to the bottom of the page.
 * Imported from 'scroll-to-bottomjs'.
 */
const scrollToBottom = require('scroll-to-bottomjs')

/**
 * Class representing actions related to an empty cart.
 */
exports.EmptyCart = class EmptyCart {
  /**
   * Creates an instance of EmptyCart.
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  constructor (page) {
    this.page = page
  }

  /**
   * Empties the cart by removing all items and confirming the cart is empty.
   * It handles button availability checks, ignores YouTube and Freshchat components,
   * and takes screenshots before and after emptying the cart.
   *
   * @returns {Promise<void>} A promise that resolves when the cart is emptied.
   * @throws Will throw an error if any step of the process fails.
   */
  async emptyCart () {
    try {
      console.log('Starting the process to empty the cart...')

      // Ignore YouTube and Freshchat widgets
      await ignoreYoutubeAndFreshchat(this.page)
      console.log('Waiting for fonts to be ready...')
      await this.page.waitForFunction(() => document.fonts.ready)
      console.log('Fonts are ready.')

      console.log('Checking button availability...')
      await checkButtonAvailability(this.page)

      console.log('Clicking on the cart block...')
      await this.page.locator('.cart_block').click()
      console.log('Clicked on the cart block.')

      // Take Argos screenshot of the cart before emptying
      console.log('Taking Argos screenshot of the cart before emptying...')
      await argosScreenshot(this.page, 'Warenkorb leeren', {
        viewports: [
          'macbook-16', // 1536 x 960
          'iphone-6' // 375x667
        ]
      })

      // Get count of items to remove
      let cartElements = await this.page.locator('span').filter({ hasText: 'Entfernen' }).count()
      console.log(`Found ${cartElements} elements with the text "Entfernen".`)

      // Loop through each cart item and remove
      while (cartElements !== 0) {
        console.log('Removing an item from the cart...')
        const removeButton = this.page.locator('span').filter({ hasText: 'Entfernen' }).first()
        await removeButton.waitFor({ state: 'visible' })
        await removeButton.click()
        console.log('Clicked on the remove button.')

        await this.page.waitForFunction(() => document.fonts.ready)

        // Update count after each removal
        cartElements = await this.page.locator('span').filter({ hasText: 'Entfernen' }).count()
        console.log(`Updated cart elements count: ${cartElements}`)
      }

      // Wait for the empty cart message to appear
      console.log('Waiting for the text "Der Warenkorb ist leer" to appear...')
      await waitForTextToAppear(this.page, 'Der Warenkorb ist leer')
      console.log('The cart is now empty.')

      console.log('Rechecking button availability...')
      await checkButtonAvailability(this.page)

      // Take final screenshot of the empty cart
      console.log('Taking final Argos screenshot of the emptied cart...')
      await argosScreenshot(this.page, 'Warenkorb geleert', {
        viewports: [
          'macbook-16', // 1536 x 960
          'iphone-6' // 375x667
        ]
      })

      console.log('Cart emptying process completed successfully.')
    } catch (error) {
      console.error('An error occurred while emptying the cart:', error.message)
      console.error('Stack trace:', error.stack)
    }
  }
}
