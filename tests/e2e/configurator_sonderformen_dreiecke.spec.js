import { argosScreenshot } from '@argos-ci/playwright'
import { test, expect } from '@playwright/test'
import { ignoreYoutubeAndFreshchat, checkButtonAvailability } from '../support/helpers'

const scrollToBottom = require('scroll-to-bottomjs')

test('load configurator Sonderformen - Dreiecke with Blackout 4018', async function ({ page }) {
  try {
    // block FreshChat script execution
    console.log('Blocking FreshChat...')
    await ignoreYoutubeAndFreshchat(page)

    // Navigate to page
    console.log('Navigating to blackout-4018...')
    await page.goto('blackout-4018', { waitUntil: 'load' })
    await page.waitForFunction(() => document.fonts.ready)
    console.log('Fonts ready.')

    // Validate price elements do not contain specific texts
    console.log('Validating price elements...')
    await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-5,00/)
    await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-2,50/)

    // Scroll to bottom
    console.log('Scrolling to the bottom...')
    await page.evaluate(scrollToBottom)
    await checkButtonAvailability(page)

    // Block YouTube videos
    console.log('Blocking YouTube videos...')
    await ignoreYoutubeAndFreshchat(page)

    // Check if main image is visible
    console.log('Checking main image visibility...')
    await expect(page.locator('#image')).toBeVisible()

    // Verify gallery images
    console.log('Verifying gallery images...')
    const galleryImagesCount = 7 // Expected count of images
    const galleryImagesVisible = await page.locator('.small_gallery > ul > li > img:visible').count()
    await expect(galleryImagesVisible).toBe(galleryImagesCount)
    console.log(`Visible gallery images: ${galleryImagesVisible}`)

    // Select DF TAB
    console.log('Selecting Sonderformen tab...')
    await page.getByText('Sonderformen', { exact: true }).click()

    // Select window shape
    console.log('Selecting triangle window shape...')
    await expect(page.locator("label[for='triangle']")).toBeVisible()
    await page.locator("label[for='triangle']").click()

    // Take Argos screenshot
    console.log('Taking initial screenshot...')
    await argosScreenshot(page, 'Sonderformen Dreiecke - Startseite mit Blackout 4018', {
      viewports: ['macbook-16', 'iphone-6']
    })

    // Capture stoff attributes
    const attributes = [
      'transparenz-img',
      'bildschirmarbeitsplatz-img',
      'rueckseite-weiss-img',
      'oekotex-img',
      'feucht-abwischbar-img',
      'massanfertigung-img',
      'made-in-germany-img'
    ]
    for (let i = 0; i < attributes.length; i++) {
      console.log(`Hovering over attribute: ${attributes[i]}...`)
      await page.locator('#' + attributes[i]).dispatchEvent('mouseover')
      await argosScreenshot(page, 'Sonderformen Dreiecke - Eigenschaft Meran 5076 ' + attributes[i], {
        viewports: ['macbook-16', 'iphone-6']
      })
      console.log(`Screenshot taken for attribute: ${attributes[i]}`)
      await page.mouse.move(0, 0)
    }

    // Handle plissee types
    const types = ['fds3', 'fds4', 'vs9', 'vs10', 'sd2', 'sd3']
    for (let i = 0; i < types.length; i++) {
      console.log(`Selecting plissee type: ${types[i]}...`)
      await page.locator('label[for=' + types[i] + '] > p').click()
      await page.locator('label[for=' + types[i] + ']').hover()
      await argosScreenshot(page, 'Sonderformen Dreiecke - Auswahl und Tooltip ' + types[i], { disableHover: false })
      console.log(`Screenshot taken for plissee type: ${types[i]}`)
      await page.mouse.move(0, 0)
    }

    // select fds to make all befestigungen visible
    await page.locator("label[for='fds3'] > p").click()

    // Handle befestigungen
    const befestigungen = [
      'Befestigung direkt vor der Scheibe',
      'Befestigung am Fensterflügel',
      'Befestigung am Mauerwerk'
    ]

    for (let i = 0; i < befestigungen.length; i++) {
      console.log(`Selecting Befestigung: ${befestigungen[i]}...`)
      const BefestigungsIconLocator = page.locator('li.option_item').filter({ hasText: befestigungen[i] })
      await BefestigungsIconLocator.click()
      await argosScreenshot(page, 'Sonderformen Dreiecke - Auswahl Befestigung ' + befestigungen[i], {
        viewports: ['macbook-16', 'iphone-6']
      })
      console.log(`Screenshot taken for Befestigung: ${befestigungen[i]}`)
      await page.mouse.move(0, 0)
    }

    // Handle befestigungen tooltips
    for (let i = 0; i < befestigungen.length; i++) {
      console.log(`Hovering over tooltip for: ${befestigungen[i]}...`)
      const tooltipIconLocator = page.locator('li.option_item').filter({ hasText: befestigungen[i] }).locator('div.tooltip_icon')
      await tooltipIconLocator.hover()
      const tooltipLocator = page.locator('li.option_item').filter({ hasText: befestigungen[i] }).locator('div.option_item_tooltip')
      await tooltipLocator.waitFor({ state: 'visible' })
      console.log('Tooltip is visible.')
      await argosScreenshot(page, 'Sonderformen Dreiecke - Tooltip Befestigung ' + befestigungen[i], { disableHover: false })
      await page.mouse.move(0, 0)
      await tooltipLocator.waitFor({ state: 'hidden' })
      console.log(`Screenshot taken for tooltip: ${befestigungen[i]}`)
    }

    // Handle schienenfarben
    const schienenfarben = ['weiss', 'schwarzbraun', 'silber', 'bronze', 'anthrazit']
    for (let i = 0; i < schienenfarben.length; i++) {
      console.log(`Selecting schienenfarbe: ${schienenfarben[i]}...`)
      await page.locator('label[for=' + schienenfarben[i] + '] > p').click()
      await argosScreenshot(page, 'Sonderformen Dreiecke - Auswahl Schienenfarbe ' + schienenfarben[i], {
        viewports: ['macbook-16', 'iphone-6']
      })
      console.log(`Screenshot taken for schienenfarbe: ${schienenfarben[i]}`)
      await page.mouse.move(0, 0)
    }

    // Handle schienenfarben tooltips
    for (let i = 0; i < schienenfarben.length; i++) {
      console.log(`Hovering over schienenfarbe tooltip: ${schienenfarben[i]}...`)
      await page.locator('label[for=' + schienenfarben[i] + '] + div.tooltip_icon').hover()
      await argosScreenshot(page, 'Sonderformen Dreiecke - Tooltip Schienenfarbe ' + schienenfarben[i], { disableHover: false })
      await page.mouse.move(0, 0)
      console.log(`Screenshot taken for tooltip: ${schienenfarben[i]}`)
    }

    console.log('Test completed successfully.')
  } catch (error) {
    console.error('Test failed:', error)
    throw error // Re-throw to propagate failure
  }
})
