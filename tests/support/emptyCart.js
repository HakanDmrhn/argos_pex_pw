import { argosScreenshot } from '@argos-ci/playwright'
import { ignoreYoutubeAndFreshchat, checkButtonAvailability, waitForTextToAppear } from '../support/helpers'

const scrollToBottom = require('scroll-to-bottomjs')

exports.EmptyCart = class EmptyCart {
  constructor (page) {
    this.page = page
  }

  async emptyCart () {
    try {
      console.log('Starting the process to empty the cart...')

      // ----------------------------- WARENKORB LEEREN --------------------------------
      // -------------------------------------------------------------------------------
      await ignoreYoutubeAndFreshchat(this.page)
      console.log('Waiting for fonts to be ready...')
      await this.page.waitForFunction(() => document.fonts.ready)
      console.log('Fonts are ready.')

      console.log('Checking button availability...')
      await checkButtonAvailability(this.page)

      console.log('Clicking on the cart block...')
      await this.page.locator('.cart_block').click()
      console.log('Clicked on the cart block.')

      // Uncomment to ignore FreshChat
      // console.log('Ignoring FreshChat...');

      console.log('Taking Argos screenshot of the cart before emptying...')
      await argosScreenshot(this.page, 'Warenkorb leeren', {
        viewports: [
          'macbook-16', // Use device preset for macbook-16 --> 1536 x 960
          'iphone-6' // Use device preset for iphone-6 --> 375x667
        ]
      })

      let cartElements = await this.page.locator('span').filter({ hasText: 'Entfernen' }).count()
      console.log(`Found ${cartElements} elements with the text "Entfernen".`)

      while (cartElements !== 0) {
        console.log('Removing an item from the cart...')
        const removeButton = this.page.locator('span').filter({ hasText: 'Entfernen' }).first()
        await removeButton.waitFor({ state: 'visible' })
        await removeButton.click()
        console.log('Clicked on the remove button.')

        await this.page.waitForFunction(() => document.fonts.ready)

        // Update cartElements count after removal
        cartElements = await this.page.locator('span').filter({ hasText: 'Entfernen' }).count()
        console.log(`Updated cart elements count: ${cartElements}`)
      }

      console.log('Waiting for the text "Der Warenkorb ist leer" to appear...')
      await waitForTextToAppear(this.page, 'Der Warenkorb ist leer')
      console.log('The cart is now empty.')

      console.log('Rechecking button availability...')
      await checkButtonAvailability(this.page)

      // Uncomment to ignore FreshChat again
      // console.log('Ignoring FreshChat again...');

      console.log('Taking final Argos screenshot of the emptied cart...')
      await argosScreenshot(this.page, 'Warenkorb geleert', {
        viewports: [
          'macbook-16', // Use device preset for macbook-16 --> 1536 x 960
          'iphone-6' // Use device preset for iphone-6 --> 375x667
        ]
      })

      console.log('Cart emptying process completed successfully.')
    } catch (error) {
      console.error('An error occurred while emptying the cart:', error.message)
      console.error('Stack trace:', error.stack)
    }
  }
}
