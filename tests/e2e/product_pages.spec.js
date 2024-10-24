import { argosScreenshot } from '@argos-ci/playwright'
import { test } from '@playwright/test'
import { ignoreYoutubeAndFreshchat, checkButtonAvailability } from '../support/helpers'

/**
 * Scrolls to the bottom of the page.
 * Imported from 'scroll-to-bottomjs'.
 */
const scrollToBottom = require('scroll-to-bottomjs')
const data = require('../fixtures/product_pages.json')
const productPages = data.URLS

test.describe('Integration test with visual testing - product pages', function () {
  productPages.forEach(function (link) {
    test('load page: ' + link + ' & take argos snapshot', async function ({ page }) {
      try {
        // Block FreshChat script execution
        await ignoreYoutubeAndFreshchat(page)
        console.log(`Navigating to ${link}`)
        await page.goto(link, { waitUntil: 'load' })
        await page.waitForFunction(() => document.fonts.ready)

        // Scroll to the bottom of the page to ensure all images are loaded
        console.log(`Scrolling to bottom of the page: ${link}`)
        await page.evaluate(scrollToBottom)
        await checkButtonAvailability(page)

        // Take Argos screenshot
        console.log(`Taking Argos screenshot for: ${link}`)
        await argosScreenshot(page, link, {
          viewports: [
            'macbook-16', // Use device preset for macbook-16 --> 1536 x 960
            'iphone-6' // Use device preset for iphone-6 --> 375x667
          ]
        })

        console.log(`Successfully completed snapshot for: ${link}`)
        await page.mouse.move(0, 0) // Move mouse away
      } catch (error) {
        console.error(`Error processing ${link}: ${error.message}`)
      }
    })
  })
})
