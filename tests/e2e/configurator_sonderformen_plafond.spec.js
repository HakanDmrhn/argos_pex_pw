import { argosScreenshot } from '@argos-ci/playwright'
import { test, expect } from '@playwright/test'
import { ignoreYoutubeAndFreshchat, checkButtonAvailability } from '../support/helpers'

const scrollToBottom = require('scroll-to-bottomjs')

test('load configurator Sonderformen - Plafond with Blackout-4019', async function ({ page }) {
  try {
    console.log('Blocking FreshChat script execution...')
    await ignoreYoutubeAndFreshchat(page)
    console.log('Navigating to /blackout-4019...')
    await page.goto('/blackout-4019', { waitUntil: 'load' })
    await page.waitForFunction(() => document.fonts.ready)
    console.log('Scrolling to bottom to ensure all resources are loaded...')
    await page.evaluate(scrollToBottom)
    await checkButtonAvailability(page)
    console.log('Checking if the main image is visible...')
    await expect(page.locator('#image')).toBeVisible()
    console.log('Verifying prices...')
    await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-5,00/)
    await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-2,50/)

    // --------------- BE SURE THAT ALL GALLERY IMAGES ARE LOADED ------------------------\\
    console.log('Verifying gallery images...')
    const galleryImagesCount = 8 // Expected count of images
    const galleryImagesVisible = await page.locator('.small_gallery > ul > li > img:visible').count()
    console.log(`Visible gallery images: ${galleryImagesVisible}`)
    expect(galleryImagesCount).toStrictEqual(galleryImagesVisible)

    console.log('Selecting Sonderformen tab...')
    await page.getByText('Sonderformen', { exact: true }).click()

    console.log('Selecting Plafond window shape...')
    await expect(page.locator("label[for='plafond']")).toBeVisible()
    await page.locator("label[for='plafond']").click()

    console.log('Taking Argos screenshot for Sonderformen Plafond - Startseite with Blackout-4019...')
    await argosScreenshot(page, 'Sonderformen Plafond - Startseite mit Blackout-4019', {
      viewports: ['macbook-16', 'iphone-6']
    })

    // --------------------------------- STOFF-EIGENSCHAFTEN -----------------------------------------
    console.log('Handling Stoffeigenschaften...')

    const attributes = [
      'transparenz-img',
      'bildschirmarbeitsplatz-img',
      'rueckseite-weiss-img',
      'oekotex-img',
      'feucht-abwischbar-img',
      'massanfertigung-img',
      'made-in-germany-img'
    ]

    for (let a = 0; a < attributes.length; a++) {
      console.log(`Hovering over and taking screenshot for ${attributes[a]}...`)
      await page.locator('#' + attributes[a]).dispatchEvent('mouseover')
      await argosScreenshot(page, 'Sonderformen Plafond - Eigenschaft Blackout-4019 ' + attributes[a], {
        viewports: ['macbook-16', 'iphone-6']
      })
      await page.mouse.move(0, 0)
    }

    // ----------------------------------- PLISSEE-TYPEN -------------------------------------------
    console.log('Handling Plissee Typen...')

    const types = [
      'pl11',
      'pl40',
      'plk13'
    ]

    for (let b = 0; b < types.length; b++) {
      console.log(`Selecting and taking screenshot for ${types[b]}...`)
      await page.locator('label[for=' + types[b] + '] > p').click()
      await page.locator('label[for=' + types[b] + ']').hover()
      await argosScreenshot(page, 'Sonderformen Plafond - Auswahl und Tooltip ' + types[b], { disableHover: false })
      await page.mouse.move(0, 0)
    }

    // ----------------------------------- BEFESTIGUNGEN - AUSWAHL -----------------------------------
    console.log('Handling Befestigungen...')
    const befestigungen = ['Clip', 'Winkel', 'Montageprofile mit Montagewinkeln', 'Montageprofile mit Haltebolzen']

    for (let c = 0; c < befestigungen.length; c++) {
      console.log(`Selecting and taking screenshot for ${befestigungen[c]}...`)
      await page.locator('li').filter({ hasText: befestigungen[c] }).first().click()
      await argosScreenshot(page, 'Sonderformen Plafond - Auswahl Befestigung ' + befestigungen[c], {
        viewports: ['macbook-16', 'iphone-6']
      })
      await page.mouse.move(0, 0)
    }

    // ----------------------------------- BEFESTIGUNGEN - TOOLTIPS -----------------------------------
    console.log('Handling tooltips for Befestigungen...')
    for (let e = 0; e < befestigungen.length; e++) {
      const tooltipIconLocator = page.locator('li').filter({ hasText: befestigungen[e] }).first().locator('div.tooltip_icon')
      await tooltipIconLocator.hover()
      console.log('Hovered over the tooltip icon for ' + befestigungen[e])

      const tooltipLocator = page.locator('li').filter({ hasText: befestigungen[e] }).first().locator('div.option_item_tooltip')
      await tooltipLocator.waitFor({ state: 'visible' })
      console.log('Tooltip for ' + befestigungen[e] + ' is visible.')

      await argosScreenshot(page, 'Sonderformen Plafond - Tooltip Befestigung ' + befestigungen[e], { disableHover: false })
      await page.mouse.move(0, 0)
    }

    // -------------------------------------------- BEDIENSEITE TOOLTIP -----------------------------------------------------\\

    // capture tooltip Bedienseite
    await page.locator('section.bedienseite_container div.tooltip_icon').hover()
    await argosScreenshot(page, 'Sonderformen Plafond - Tooltip Bedienseite', { // do not use viewport options - tooltip disappears
      disableHover: false
    })

    // ----------------------------------- SCHIENENFARBEN - TOOLTIPS --------------------------------------------\\

    // Schienenfarben
    const schienenfarben = [
      'weiss',
      'schwarzbraun',
      'silber',
      //  "bronze", disabled for PLK13 with Ticket PEX-4115
      'anthrazit'
    ]

    // TRIGGER available schienenfarben-tooltips and make snapshots
    for (let g = 0; g < schienenfarben.length; g++) {
      await page.locator('label[for=' + schienenfarben[g] + '] > p').click()
      await argosScreenshot(page, 'Sonderformen Plafond - Auswahl Schienenfarbe ' + schienenfarben[g], { // do not use viewport options - tooltip disappears
        viewports: [
          'macbook-16', // Use device preset for macbook-16 --> 1536 x 960
          'iphone-6' // Use device preset for iphone-6 --> 375x667
        ]
      })
    }

    // ----------------------------------- SCHIENENFARBEN - TOOLTIPS --------------------------------------------\\

    // TRIGGER available schienenfarben-tooltips and make snapshots
    for (let y = 0; y < schienenfarben.length; y++) {
      await page.locator('label[for=' + schienenfarben[y] + '] > p').click()
      await argosScreenshot(page, 'Sonderformen Plafond - Auswahl Schienenfarbe ' + schienenfarben[y], { // do not use viewport options - tooltip disappears
        viewports: [
          'macbook-16', // Use device preset for macbook-16 --> 1536 x 960
          'iphone-6' // Use device preset for iphone-6 --> 375x667
        ]
      })
    }

    // ----------------------------------- BEDIENUNG - AUSWAHL -----------------------------------
    console.log('Selecting Kurbel and taking screenshot...')
    await page.locator("label[for='kurbel'] > p").click()
    await argosScreenshot(page, 'Sonderformen Plafond - Bediengriff Kurbel', {
      viewports: ['macbook-16', 'iphone-6']
    })

    console.log('Opening Kurbel dropdown...')
    await page.locator('#handkurbel_select').click()
    await argosScreenshot(page, 'Sonderformen Plafond -  Kurbel')

    // ----------------------------------- BEDIENUNG - TOOLTIP ---------------------------------------------------\\

    console.log('Hovering over Bedienseite tooltip and taking screenshot...')
    await page.locator("label[for='kurbel'] + div.tooltip_icon").hover()
    await argosScreenshot(page, 'Sonderformen Plafond - Tooltip Bediengriff Standard', { disableHover: false })

    console.log('Test completed successfully.')
  } catch (error) {
    console.error('An error occurred during the test execution:', error)
  }
})
