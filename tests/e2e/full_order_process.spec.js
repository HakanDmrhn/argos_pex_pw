// import { argosScreenshot } from "@argos-ci/playwright";
import { test } from '@playwright/test';
import { Checkout } from '../support/checkout';
import { Dachfenster } from '../support/configure_dachfenster';
import { SenkrechteFenster } from '../support/configure_senkrechteFenster';
import { Sonderformen } from '../support/configure_sonderformen';
import { Muster } from '../support/configure_muster';
import { Zubehoer } from '../support/configure_zubehoer';
import { Serviceprodukte } from '../support/configure_serviceProdukte';
import { EmptyCart } from '../support/emptyCart';



test.describe('Integration test with visual testing - order process incl. all product groups', function () {

    test('order process: add all products to cart and test checkout', async function ({ page }) {


        // --------------------------------------------------------------------------------------
        // ----------------------- ADD SENKRECHTE FENSTER TO CART -------------------------------
        // --------------------------------------------------------------------------------------

        // Erstelle eine Instanz der Klasse SenkrechteFenster
        // const mySenkrechteFenster = new SenkrechteFenster(page)
        // await mySenkrechteFenster.configureSenkrechteFenster()


        // ----------------------- ADD genormt & ungenormt DF TO CART -------------------------
        // ------------------------------------------------------------------------------------

        // Erstelle eine Instanz der Klasse Dachfenster
        const myDachfenster = new Dachfenster(page)
        await myDachfenster.configureDachfenster()


        // --------------------------------------------------------------------------------------
        // ---------------------------- ADD SONDERFORMEN TO CART --------------------------------
        // --------------------------------------------------------------------------------------

        // Erstelle eine Instanz der Klasse Sonderformen
        const mySonderformen = new Sonderformen(page)
        await mySonderformen.configureSonderformen()


        // --------------------------------------------------------------------------------------
        // ---------------------------- ADD ZUBEHÖR TO CART -------------------------------------
        // --------------------------------------------------------------------------------------


        // Erstelle eine Instanz der Klasse Zubehoer
        const myZubehoer = new Zubehoer(page)
        await myZubehoer.configureZubehoer()


        // --------------------------------------------------------------------------------------
        // ---------------------------- ADD STOFFMUSTER TO CART ---------------------------------
        // --------------------------------------------------------------------------------------


        // Erstelle eine Instanz der Klasse Muster
        const myMuster = new Muster(page)
        await myMuster.configureMuster()


        // --------------------------------------------------------------------------------------
        // ------------------------- ADD SERVICPRODUKTE TO CART ---------------------------------
        // --------------------------------------------------------------------------------------

        // Erstelle eine Instanz der Klasse Service
        const myService = new Serviceprodukte(page)
        await myService.configureServiceprodukte()


        // -------------------------------- GO TO CHECKOUT ---------------------------------
        // ---------------------------------------------------------------------------------

        // Erstelle eine Instanz der Klasse Checkout
        const myCheckout = new Checkout(page)
        await myCheckout.checkout()


        // -------------------------------- GO TO CART AND DELETE ALL PRODUCTS ---------------------------------
        // ------------------------------------------------------------------------------------------------------

        // Erstelle eine Instanz der Klasse EmptyCart
        const myEmptyCart = new EmptyCart(page)
        await myEmptyCart.emptyCart()


    })
})