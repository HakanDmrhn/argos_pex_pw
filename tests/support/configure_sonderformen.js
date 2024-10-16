import { argosScreenshot } from '@argos-ci/playwright'
import { test, expect } from '@playwright/test'
import { ignoreYoutubeAndFreshchat, checkButtonAvailability } from '../support/helpers'

exports.Sonderformen = class Sonderformen {
  constructor (page) {
    this.page = page
  }

  async configureSonderformen () {
    // Helper function to log actions and handle errors
    const logAndHandleError = async (action, message) => {
      try {
        console.log(`Action: ${message}`)
        await action()
      } catch (error) {
        console.error(`Error during ${message}:`, error)
        // You can choose to throw the error again or handle it as needed
        throw error // Rethrow if you want the test to fail
      }
    }

    // --------------------------------------------------------------------------------------
    // ---------------------------- ADD DREICK TO CART -------------------------------------
    // --------------------------------------------------------------------------------------

    await logAndHandleError(async () => {
      console.log('Navigating to: /crush-topar-4614')
      await ignoreYoutubeAndFreshchat(this.page)
      await this.page.goto('/crush-topar-4614', { waitUntil: 'load' })
      await this.page.waitForFunction(() => document.fonts.ready)
      await checkButtonAvailability(this.page)

      // Tab Sonderformen
      const SDtab = this.page.getByText(/Sonderformen/, { exact: true }).first()
      await SDtab.click()
      await expect(SDtab.locator('..')).toHaveClass(/active/)

      // Fensterform wählen
      await this.page.locator("label[for='triangle']").click()

      // Plisseetyp wählen
      await this.page.locator("label[for='vs9']").click()

      // Input height and width
      await this.page.locator('input#hoehe').fill('1500')
      await this.page.locator('input#breite').fill('1100')

      // Input quantity and add to cart
      await this.page.locator('#qty').clear()
      await this.page.locator('#qty').fill('1')
      await this.page.locator('.add_to_cart_button').click()

      await expect(this.page).toHaveURL(new RegExp('/checkout/cart'))
    }, 'adding Dreieck to cart')

    // --------------------------------------------------------------------------------------
    // ---------------------------- ADD VIERECK TO CART -------------------------------------
    // --------------------------------------------------------------------------------------

    await logAndHandleError(async () => {
      console.log('Navigating to: /accento-1543')
      await this.page.goto('/accento-1543', { waitUntil: 'load' })
      await this.page.waitForFunction(() => document.fonts.ready)
      await checkButtonAvailability(this.page)

      // Select tab and check if it is active
      const SDtab = this.page.getByText(/Sonderformen/, { exact: true }).first()
      await SDtab.click()
      await expect(SDtab.locator('..')).toHaveClass(/active/)

      // Fensterform wählen
      await this.page.locator("label[for='rectangle']").click()

      // Plisseetyp wählen
      await this.page.locator("label[for='vs3']").click()

      // Input height and width
      await this.page.locator('input#hoehe').fill('1400')
      await this.page.locator('input#breite').fill('1000')

      // Select second cloth
      await this.page.locator('#unterer_stoff_gruppe_select').selectOption({ label: 'Allessandria' })
      await this.page.locator('#unterer_stoff_nummer_select').selectOption({ label: '1232' })

      // Input quantity and add to cart
      await this.page.locator('#qty').clear()
      await this.page.locator('#qty').fill('1')
      await this.page.locator('.add_to_cart_button').click()

      await expect(this.page).toHaveURL(new RegExp('/checkout/cart'))
    }, 'adding Viereck to cart')

    // --------------------------------------------------------------------------------------
    // ---------------------------- ADD FÜNFECK TO CART -------------------------------------
    // --------------------------------------------------------------------------------------

    await logAndHandleError(async () => {
      console.log('Navigating to: /lecce-4912')
      await this.page.goto('/lecce-4912', { waitUntil: 'load' })
      await this.page.waitForFunction(() => document.fonts.ready)
      await checkButtonAvailability(this.page)

      // Select tab and check if it is active
      const SDtab = this.page.getByText(/Sonderformen/, { exact: true }).first()
      await SDtab.click()
      await expect(SDtab.locator('..')).toHaveClass(/active/)

      // Fensterform wählen
      await this.page.locator("label[for='pentagon']").click()

      // Plisseetyp wählen
      await this.page.locator("label[for='vs5']").click()

      // Input height and width
      await this.page.locator('input#breite_oben').fill('500')
      await this.page.locator('input#breite_unten').fill('1000')
      await this.page.locator('input#hoehe_links').fill('1500')
      await this.page.locator('input#hoehe_rechts').fill('1000')

      // Input quantity and add to cart
      await this.page.locator('#qty').clear()
      await this.page.locator('#qty').fill('1')
      await this.page.locator('.add_to_cart_button').click()

      await expect(this.page).toHaveURL(new RegExp('/checkout/cart'))
    }, 'adding Fünfeck to cart')

    // --------------------------------------------------------------------------------------
    // ---------------------------- ADD SECHSECK TO CART ------------------------------------
    // --------------------------------------------------------------------------------------

    await logAndHandleError(async () => {
      console.log('Navigating to: /crush-topar-4255')
      await this.page.goto('/crush-topar-4255', { waitUntil: 'load' })
      await this.page.waitForFunction(() => document.fonts.ready)
      await checkButtonAvailability(this.page)

      // Select tab and check if it is active
      const SDtab = this.page.getByText(/Sonderformen/, { exact: true }).first()
      await SDtab.click()
      await expect(SDtab.locator('..')).toHaveClass(/active/)

      // Fensterform wählen
      await this.page.locator("label[for='hexagon']").click()

      // Plisseetyp wählen
      await this.page.locator("label[for='vs6']").click()

      // Input height and width
      await this.page.locator('input#breite_oben').fill('500')
      await this.page.locator('input#breite_unten').fill('1000')
      await this.page.locator('input#gesamthoehe').fill('1500')
      await this.page.locator('input#teilhoehe').fill('1000')

      // Input quantity and add to cart
      await this.page.locator('#qty').clear()
      await this.page.locator('#qty').fill('1')
      await this.page.locator('.add_to_cart_button').click()

      await expect(this.page).toHaveURL(new RegExp('/checkout/cart'))
    }, 'adding Sechseck to cart')

    // --------------------------------------------------------------------------------------
    // ---------------------------- ADD PLAFOND TO CART -------------------------------------
    // --------------------------------------------------------------------------------------

    await logAndHandleError(async () => {
      console.log('Navigating to: /radiance-4876')
      await this.page.goto('/radiance-4876', { waitUntil: 'load' })
      await this.page.waitForFunction(() => document.fonts.ready)
      await checkButtonAvailability(this.page)

      // Select tab and check if it is active
      const SDtab = this.page.getByText(/Sonderformen/, { exact: true }).first()
      await SDtab.click()
      await expect(SDtab.locator('..')).toHaveClass(/active/)

      // Fensterform wählen
      await this.page.locator("label[for='plafond']").click()

      // Plisseetyp wählen
      await this.page.locator("label[for='plk13']").click()

      // Input height and width
      await this.page.locator('input#hoehe').fill('2000')
      await this.page.locator('input#breite').fill('1200')

      // Input quantity and add to cart
      await this.page.locator('#qty').clear()
      await this.page.locator('#qty').fill('1')
      await this.page.locator('.add_to_cart_button').click()

      await expect(this.page).toHaveURL(new RegExp('/checkout/cart'))
    }, 'adding Plafond to cart')
  }
}
