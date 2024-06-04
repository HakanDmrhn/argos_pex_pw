import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';

exports.EmptyCart = class EmptyCart {

    constructor(page) {
        this.page = page;
    }

    async emptyCart() {

        await this.page.locator('.cart_block').click();

        // take argos screenshot of cart
        await argosScreenshot(this.page, 'Warenkorb leeren', {
            viewports: [
                "macbook-16", // Use device preset for macbook-16 --> 1536 x 960
                "iphone-6" // Use device preset for iphone-6 --> 375x667
            ]
        });

        // deleteProducts()

        const isVisible = await expect(this.page.locator('span').filter({ hasText: 'Entfernen' })).not.toHaveCount(0) // Wenn span Entfernen existiert

        // await this.page.locator('span').filter({ hasText: 'Entfernen' }).first().click()


        if (isVisible) {

            await this.page.locator('span').filter({ hasText: 'Entfernen' }).first().click()

        }
        else {
            await console.log('assertion not true')
            await console.log(isVisible)
        }

    }
}



//----------------------------- WARENKORB LEEREN --------------------------------
//-------------------------------------------------------------------------------

// emptyCart: function emptyCart() {

//     // click cart icon and delete articles  + take snapshots before and after
//     // cy.get('.cart_block').click()

//     cy.percySnapshot('Warenkorb leeren')
//     deleteProducts()
//     // check if FreshChat icon is loaded
//     cy.checkFreshChat()
//     cy.percySnapshot('Warenkorb geleert')

// }

async function deleteProducts() {

    const isVisible = await expect(this.page.locator('span').filter({ hasText: 'Entfernen' })).not.toHaveCount(0) // Wenn span Entfernen existiert

    if (isVisible) {

        await this.page.locator('span').filter({ hasText: 'Entfernen' }).first().click()

    }




    // //delete articles from cart (recursively)
    // const deleteArticle = async () => {const $body = this.page.locator('body');

    //   const isVisible = (async () => {$body.locator('.btn-remove2').FIXME_is(':visible');

    //   return $body.locator('.btn-remove2');})();

    //   if (isVisible) {await $body.getByText(/Artikel entfernen/).first().click();

    //     deleteArticle();
    //   }

    // };
    // deleteArticle();
}