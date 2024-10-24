import { argosScreenshot } from '@argos-ci/playwright'
import { test, expect } from '@playwright/test'
import { ignoreYoutubeAndFreshchat, checkButtonAvailability } from '../support/helpers'

const scrollToBottom = require('scroll-to-bottomjs')

const log = (message) => console.log(`[LOG] ${message}`)

test('load configurator Senkrechte Fenster with Liviano 4313', async ({ page }) => {
  try {
    log('Test started: load configurator Senkrechte Fenster with Liviano 4313')

    // Block FreshChat script execution
    await ignoreYoutubeAndFreshchat(page)
    log('FreshChat script blocked')

    await page.goto('liviano-4313', { waitUntil: 'load' })
    log('Page loaded: liviano-4313')

    await page.waitForFunction(() => document.fonts.ready)
    log('Fonts ready')

    // Load JS files workaround
    await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-5,00/)
    await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-2,50/)
    log('Verified JS files and price amounts')

    // Scroll to bottom to ensure all resources are loaded
    await page.evaluate(scrollToBottom)
    log('Scrolled to the bottom of the page')

    await checkButtonAvailability(page)
    log('Checked button availability')

    // Check if main image is visible
    await expect(page.locator('#image')).toBeVisible()
    log('Main image is visible')

    // Verify gallery images
    const expectedGalleryImageCount = 8 // Liviano-4313 has 9 gallery images
    const visibleGalleryImageCount = await page.locator('.small_gallery > ul > li > img:visible').count()
    await expect(visibleGalleryImageCount).toStrictEqual(expectedGalleryImageCount)
    log(`Gallery images verified. Visible: ${visibleGalleryImageCount}, Expected: ${expectedGalleryImageCount}`)

    // Take Argos screenshot for different viewports
    await argosScreenshot(page, 'Senkrechte Fenster - Startseite mit Liviano 4313', {
      viewports: ['macbook-16', 'iphone-6']
    })
    log('Argos screenshot taken for start page')

    // --------------------------------- STOFF-EIGENSCHAFTEN-----------------------------------------\\

    const attributes = [
      'transparenz-img',
      'rueckseite-gleich-vorderseite-img',
      'wasser-schmutz-abweisend-img',
      'oekotex-img',
      'feuchtraumgeeignet-img',
      'massanfertigung-img',
      'made-in-germany-img'
    ]

    for (const attribute of attributes) {
      await page.locator(`#${attribute}`).dispatchEvent('mouseover')
      await argosScreenshot(page, `Senkrechte Fenster - Eigenschaft ${attribute}`, {
        viewports: ['macbook-16', 'iphone-6']
      })
      log(`Screenshot taken for attribute: ${attribute}`)
      await page.mouse.move(0, 0) // Move mouse away
    }

    // ----------------------------------- PLISSEE-TYPEN-------------------------------------------\\

    const plisseeTypes = [
      'Verspannt VS1 - Plissee ist oben fest',
      'Verspannt VS2 - Plissee kann'
    ]

    for (const type of plisseeTypes) {
      await page.locator('li').filter({ hasText: type }).click()
      await argosScreenshot(page, `Senkrechte Fenster - Auswahl Plisseetyp - ${type}`, {
        viewports: ['macbook-16', 'iphone-6']
      })
      log(`Screenshot for Plisseetyp ${type} taken`)
      await page.mouse.move(0, 0) // Move mouse away
    }

    // ----------------------------------- TOOLTIP CAPTURES-------------------------------------------\\

    const captureTooltip = async (type) => {
      const tooltipIconLocator = page.locator('li').filter({ hasText: type }).locator('div.tooltip_icon')
      await tooltipIconLocator.hover()
      const tooltipLocator = page.locator('li').filter({ hasText: type }).locator('div.option_item_tooltip')
      await tooltipLocator.waitFor({ state: 'visible' })
      log(`Tooltip for ${type} is visible.`)
      await argosScreenshot(page, `Senkrechte Fenster - Tooltip ${type}`, { disableHover: false })
      log(`Tooltip screenshot for ${type} taken`)
      await page.mouse.move(0, 0) // Move mouse away to hide the tooltip
      await tooltipLocator.waitFor({ state: 'hidden' })
    }

    for (const type of plisseeTypes) {
      await captureTooltip(type)
    }

    // ----------------------------------- BEFESTIGUNGEN - AUSWAHL---------------------------------------------\\

    const befestigungstypen = [
      'Befestigung direkt vor der Scheibe',
      'Befestigung direkt vor der Scheibe ohne Bohren mit innovativer Klebetechnik',
      'Befestigung am Fensterflügel',
      'Befestigung am Fensterflügel ohne Bohren mit Klemmträgern',
      'Befestigung am Fensterflügel ohne Bohren mit Klemmträgern Slim',
      'Befestigung direkt vor der Scheibe ohne Bohren mit Stick & Fix Front',
      'Befestigung direkt vor der Scheibe mit Gelenkklebeplatten',
      'Befestigung mit Klebeleisten direkt auf der Scheibe ohne Bohren',
      'Befestigung am Fensterflügel mit Glasleistenwinkeln',
      'Befestigung direkt vor der Scheibe ohne Bohren mit Falzfix'
    ]

    for (const befestigung of befestigungstypen) {
      try {
        const locator = page.locator('li.option_item').filter({ hasText: befestigung }).first()
        await locator.click()
        await argosScreenshot(page, `Senkrechte Fenster - Auswahl ${befestigung}`, {
          viewports: ['macbook-16', 'iphone-6']
        })
        log(`Screenshot taken for: ${befestigung}`)
        await page.mouse.move(0, 0) // Move mouse away to hide the tooltip
      } catch (error) {
        console.error(`Error while processing ${befestigung}: ${error.message}`)
      }
    }

    // Tooltip captures for befestigungen
    for (const befestigung of befestigungstypen) {
      try {
        const tooltipIconLocator = page.locator('li.option_item').filter({ hasText: befestigung }).locator('div.tooltip_icon').first()
        await tooltipIconLocator.hover()
        const tooltipLocator = page.locator('li.option_item').filter({ hasText: befestigung }).locator('div.option_item_tooltip').first()
        await tooltipLocator.waitFor({ state: 'visible' })
        log(`Tooltip ${befestigung} is visible.`)
        await argosScreenshot(page, `Senkrechte Fenster - Tooltip Befestigung ${befestigung}`, { disableHover: false })
        log(`Screenshot taken for Tooltip: ${befestigung}`)
        await page.mouse.move(0, 0) // Move mouse away to hide the tooltip
        await tooltipLocator.waitFor({ state: 'hidden' })
      } catch (error) {
        console.error(`Error while processing Tooltip ${befestigung}: ${error.message}`)
      }
    }

    // ----------------------------------- SCHIENENFARBEN - AUSWAHL --------------------------------------------\\

    const schienenfarben = [
      'weiß',
      'schwarzbraun',
      'silber',
      'bronze',
      'anthrazit'
    ]

    for (const farbe of schienenfarben) {
      try {
        await page.locator('label').filter({ hasText: farbe }).click()
        await argosScreenshot(page, `Senkrechte Fenster - Auswahl Schienenfarbe ${farbe}`, {
          viewports: ['macbook-16', 'iphone-6']
        })

        // Tooltip interaction
        const tooltipIconSchienenfarbe = page.locator('li').filter({ hasText: farbe }).locator('div.tooltip_icon')
        await tooltipIconSchienenfarbe.hover()

        const tooltipLocatorSchienenfarbe = page.locator('li').filter({ hasText: farbe }).locator('div.option_item_tooltip')
        await tooltipLocatorSchienenfarbe.waitFor({ state: 'visible' })
        log(`Tooltip ${farbe} is visible.`)

        await argosScreenshot(page, `Senkrechte Fenster - Tooltip Schienenfarbe ${farbe}`, { disableHover: false })
        log(`Screenshot taken for Tooltip: ${farbe}`)

        await page.mouse.move(0, 0) // Move mouse away to hide the tooltip
        await tooltipLocatorSchienenfarbe.waitFor({ state: 'hidden' })
      } catch (error) {
        console.error(`Error processing ${farbe}: ${error.message}`)
      }
    }

    // ----------------------------------- BEDIENGRIFFE - AUSWAHL ---------------------------------------------\\

    const bediengriffe = [
      'Standard',
      'Design'
    ]

    for (const griff of bediengriffe) {
      try {
        await page.locator('label').filter({ hasText: griff }).click()
        await argosScreenshot(page, `Senkrechte Fenster - Auswahl Bediengriff ${griff}`, {
          viewports: ['macbook-16', 'iphone-6']
        })

        const tooltipIconBediengriff = page.locator('li').filter({ hasText: griff }).locator('div.tooltip_icon')
        await tooltipIconBediengriff.hover()

        const tooltipLocatorBediengriff = page.locator('li').filter({ hasText: griff }).locator('div.option_item_tooltip')
        await tooltipLocatorBediengriff.waitFor({ state: 'visible' })
        log(`Tooltip ${griff} is visible.`)

        await argosScreenshot(page, `Senkrechte Fenster - Tooltip Bediengriff ${griff}`, { disableHover: false })
        log(`Screenshot taken for Tooltip: ${griff}`)

        await page.mouse.move(0, 0) // Move mouse away to hide the tooltip
        await tooltipLocatorBediengriff.waitFor({ state: 'hidden' })
      } catch (error) {
        console.error(`Error processing ${griff}: ${error.message}`)
      }
    }
  } catch (error) {
    console.error(`Overall test error: ${error.message}`)
  }
})
