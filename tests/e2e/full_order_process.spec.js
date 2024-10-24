import { test } from '@playwright/test'
import { Checkout } from '../support/checkout'
import { Dachfenster } from '../support/configure_dachfenster'
import { SenkrechteFenster } from '../support/configure_senkrechteFenster'
import { Sonderformen } from '../support/configure_sonderformen'
import { Muster } from '../support/configure_muster'
import { Zubehoer } from '../support/configure_zubehoer'
import { Serviceprodukte } from '../support/configure_serviceProdukte'
import { EmptyCart } from '../support/emptyCart'
import { ignoreYoutubeAndFreshchat, checkButtonAvailability } from '../support/helpers'

test.describe('Integration test with visual testing - order process incl. all product groups', function () {

  test('order process: add all products to cart and test checkout', async function ({ page }) {
    const log = (message) => console.log(`[LOG] ${message}`)
    const errorLog = (error) => console.error(`[ERROR] ${error.message}`)

    try {
      log('Starting the order process.')

      // --------------------------------------------------------------------------------------
      // ----------------------- ADD SENKRECHTE FENSTER TO CART -------------------------------
      // --------------------------------------------------------------------------------------
      const mySenkrechteFenster = new SenkrechteFenster(page)
      log('Configuring Senkrechte Fenster...')
      await mySenkrechteFenster.configureSenkrechteFenster()
      log('Senkrechte Fenster added to cart.')

      // ----------------------- ADD genormt & ungenormt DF TO CART -------------------------
      // ------------------------------------------------------------------------------------
      const myDachfenster = new Dachfenster(page)
      log('Configuring Dachfenster...')
      await myDachfenster.configureDachfenster()
      log('Dachfenster added to cart.')

      // --------------------------------------------------------------------------------------
      // ---------------------------- ADD SONDERFORMEN TO CART --------------------------------
      // --------------------------------------------------------------------------------------
      const mySonderformen = new Sonderformen(page)
      log('Configuring Sonderformen...')
      await mySonderformen.configureSonderformen()
      log('Sonderformen added to cart.')

      // --------------------------------------------------------------------------------------
      // ---------------------------- ADD ZUBEHÖR TO CART -------------------------------------
      // --------------------------------------------------------------------------------------
      const myZubehoer = new Zubehoer(page)
      log('Configuring Zubehoer...')
      await myZubehoer.configureZubehoer()
      log('Zubehoer added to cart.')

      // --------------------------------------------------------------------------------------
      // ---------------------------- ADD STOFFMUSTER TO CART ---------------------------------
      // --------------------------------------------------------------------------------------
      const myMuster = new Muster(page)
      log('Configuring Muster...')
      await myMuster.configureMuster()
      log('Muster added to cart.')

      // --------------------------------------------------------------------------------------
      // ------------------------- ADD SERVICPRODUKTE TO CART ---------------------------------
      // --------------------------------------------------------------------------------------
      const myService = new Serviceprodukte(page)
      log('Configuring Serviceprodukte...')
      await myService.configureServiceprodukte()
      log('Serviceprodukte added to cart.')

      // -------------------------------- GO TO CHECKOUT ---------------------------------
      // ---------------------------------------------------------------------------------
      const myCheckout = new Checkout(page)
      log('Proceeding to checkout...')
      await myCheckout.checkout()
      log('Checkout completed.')

      // -------------------------------- GO TO CART AND DELETE ALL PRODUCTS ---------------------------------
      // ------------------------------------------------------------------------------------------------------
      const myEmptyCart = new EmptyCart(page)
      log('Emptying the cart...')
      await myEmptyCart.emptyCart()
      log('All products removed from cart.')
    } catch (error) {
      errorLog(error)
      throw new Error('Order process failed. See logs for details.')
    }
  })
})
