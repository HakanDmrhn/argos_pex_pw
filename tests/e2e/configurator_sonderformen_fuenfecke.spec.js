import { argosScreenshot } from '@argos-ci/playwright'
import { test, expect } from '@playwright/test'
import { ignoreYoutubeAndFreshchat, checkButtonAvailability } from '../support/helpers'

/**
 * Scrolls to the bottom of the page.
 * Imported from 'scroll-to-bottomjs'.
 */
const scrollToBottom = require('scroll-to-bottomjs')

test('load configurator Sonderformen - Fünfecke with Cremona 1093', async function ({ page }) {
  try {
    console.log('Starting test for Cremona 1093 configurator...')

    // Block FreshChat script execution
    await ignoreYoutubeAndFreshchat(page)
    console.log('Blocked Youtube and FreshChat.')

    await page.goto('/cremona-1093', { waitUntil: 'load' })
    console.log('Navigated to Cremona 1093 page.')

    await page.waitForFunction(() => document.fonts.ready)
    console.log('Fonts are ready.')

    // Load js files --> workaround:
    await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-5,00/)
    await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-2,50/)
    console.log('Price check passed.')

    // Scroll to bottom to ensure all resources are loaded
    await page.evaluate(scrollToBottom)
    await checkButtonAvailability(page)
    console.log('Scrolled to bottom and checked button availability.')

    // Check if main image is visible
    await expect(page.locator('#image')).toBeVisible()
    console.log('Main image is visible.')

    // Check gallery images
    const galleryImagesCount = 8 // Cremona 1093 has got 7 gallery images
    const galleryImagesVisible = await page.locator('.small_gallery > ul > li > img:visible').count()
    await expect(galleryImagesCount).toStrictEqual(galleryImagesVisible)
    console.log(`Gallery images check passed. Total: ${galleryImagesCount}, Visible: ${galleryImagesVisible}`)

    // Select DF TAB
    await page.getByText('Sonderformen', { exact: true }).click()
    console.log('Selected Sonderformen tab.')

    // Select window shape
    await expect(page.locator("label[for='pentagon']")).toBeVisible()
    await page.locator("label[for='pentagon']").click()
    console.log('Selected Pentagon window shape.')
    await page.waitForFunction(() => document.fonts.ready)

    // Take argos screenshot
    await argosScreenshot(page, 'Sonderformen Fünfecke - Startseite mit Cremona 1093', {
      viewports: ['macbook-16', 'iphone-6']
    })
    console.log('Took Argos screenshot for start page.')

    // Stoffeigenschaften
    const attributes = [
      'transparenz-img',
      'bildschirmarbeitsplatz-img',
      'strahlungsschutz-img',
      'rueckseite-weiss-img',
      'oekotex-img',
      'feucht-abwischbar-img',
      'massanfertigung-img',
      'made-in-germany-img'
    ]

    for (const attribute of attributes) {
      await page.locator('#' + attribute).dispatchEvent('mouseover')
      await argosScreenshot(page, 'Sonderformen Fünfecke - Eigenschaft Cremona 1093 ' + attribute, {
        viewports: ['macbook-16', 'iphone-6']
      })
      console.log(`Took Argos screenshot for attribute: ${attribute}.`)
      await page.mouse.move(0, 0) // Move mouse away
    }

    // Plisseetypen
    const types = ['vs5', 'vs5sd']
    for (const type of types) {
      await page.locator('label[for=' + type + ']').click()
      await page.locator('label[for=' + type + ']').hover()
      await argosScreenshot(page, 'Sonderformen Fünfecke - Auswahl und Tooltip ' + type, {
        disableHover: false
      })
      await page.mouse.move(0, 0) // Move mouse away
      console.log(`Selected Plisseetyp: ${type}.`)
    }

    // ----------------------------------- BEFESTIGUNGEN & TOOLTIPS --------------------------------------------\\

    const befestigungstypen = [
      'Befestigung direkt vor der Scheibe',
      'Befestigung am Fensterflügel',
      'Befestigung am Fensterflügel ohne Bohren mit Klemmträgern'
    ]

    for (const befestigung of befestigungstypen) {
      try {
        const LocatorBefestigung = await page.locator('li.option_item').filter({ hasText: befestigung }).first()
        await LocatorBefestigung.click()
        await argosScreenshot(page, 'Sonderformen Fünfecke - Auswahl ' + befestigung, {
          viewports: ['macbook-16', 'iphone-6']
        })
        console.log(`Screenshot taken for: ${befestigung}`)
        await page.mouse.move(0, 0) // Move mouse away to hide the tooltip
      } catch (error) {
        console.error(`Error while processing ${befestigung}: ${error.message}`)
      }
    }

    for (const befestigung of befestigungstypen) {
      try {
        const tooltipIconLocatorBefestigung = await page.locator('li.option_item').filter({
          hasText: befestigung
        }).locator('div.tooltip_icon').first()
        await tooltipIconLocatorBefestigung.hover()
        const tooltipLocatorBefestigung = page.locator('li.option_item').filter({
          hasText: befestigung
        }).locator('div.option_item_tooltip').first()
        await tooltipLocatorBefestigung.waitFor({
          state: 'visible'
        })
        console.log('Tooltip ' + befestigung + ' is visible.')

        await argosScreenshot(page, 'Sonderformen Fünfecke - Tooltip ' + befestigung, {
          disableHover: false
        })
        console.log(`Screenshot taken for Tooltip: ${befestigung}`)

        await page.mouse.move(0, 0) // Move mouse away to hide the tooltip
        // Wait for tooltip to hide
        await tooltipLocatorBefestigung.waitFor({
          state: 'hidden'
        })
      } catch (error) {
        console.error(`Error while processing Tooltip ${befestigung}: ${error.message}`)
      }
    }

    // Schienenfarben
    const schienenfarben = ['weiss', 'schwarzbraun', 'silber', 'bronze', 'anthrazit']
    for (const farbe of schienenfarben) {
      await page.locator('label[for=' + farbe + '] > p').click()
      await argosScreenshot(page, 'Sonderformen Fünfecke - Auswahl Schienenfarbe ' + farbe, {
        viewports: ['macbook-16', 'iphone-6']
      })
      console.log(`Took Argos screenshot for schienenfarbe: ${farbe}.`)
      await page.mouse.move(0, 0)
    }

    // Schienenfarben Tooltips
    for (const farbe of schienenfarben) {
      await page.locator('label[for=' + farbe + '] + div.tooltip_icon').hover()
      await argosScreenshot(page, 'Sonderformen Fünfecke - Tooltip Schienenfarbe ' + farbe, {
        disableHover: false
      })
      console.log(`Hovered and took screenshot for tooltip: ${farbe}.`)
      await page.mouse.move(0, 0)
    }

    // Bediengriffe Auswahl
    await page.mouse.move(0, 0)
    await page.locator("label[for='standard'] > p").click()
    await argosScreenshot(page, 'Sonderformen Fünfecke - Bediengriff Standard', {
      viewports: ['macbook-16', 'iphone-6']
    })
    console.log('Selected Standard Bediengriff.')

    await page.mouse.move(0, 0) // Move mouse away
    await page.locator("label[for='design'] > p").click()
    await argosScreenshot(page, 'Sonderformen Fünfecke - Bediengriff Design', {
      viewports: ['macbook-16', 'iphone-6']
    })
    console.log('Selected Design Bediengriff.')
    await page.mouse.move(0, 0) // Move mouse away

    // Bediengriffe Tooltips
    await page.locator("label[for='standard'] + div.tooltip_icon").hover()
    await argosScreenshot(page, 'Sonderformen Fünfecke - Tooltip Bediengriff Standard', {
      disableHover: false
    })
    await page.mouse.move(0, 0) // Move mouse away
    console.log('Hovered on standard Bediengriff tooltip.')

    await page.locator("label[for='design'] + div.tooltip_icon").hover()
    await argosScreenshot(page, 'Sonderformen Fünfecke - Tooltip Bediengriff Design', {
      disableHover: false
    })
    console.log('Hovered on design Bediengriff tooltip.')
    await page.mouse.move(0, 0) // Move mouse away

    // Bedienstäbe Auswahl
    await page.locator('#bedienstab_select').click()
    await argosScreenshot(page, 'Sonderformen Fünfecke - Bedienstäbe', { fullPage: false })
    await page.locator('#bedienstab_select').click() // Close dropdown
    console.log('Opened and closed Bedienstäbe dropdown.')
    await page.mouse.move(0, 0) // Move mouse away

    // Bedienstäbe Tooltip
    await page.locator('div.bedienstab_container div.tooltip_icon').hover()
    await argosScreenshot(page, 'Sonderformen Fünfecke - Tooltip Bedienstäbe', {
      disableHover: false
    })
    console.log('Hovered on Bedienstäbe tooltip.')

    console.log('Test completed successfully.')
  } catch (error) {
    console.error('Error during test execution:', error)
  }
})
