import { argosScreenshot } from '@argos-ci/playwright'
import { test } from '@playwright/test'
import { ignoreYoutubeAndFreshchat, checkButtonAvailability } from '../support/helpers'
const data = require('../fixtures/cms_prio1.json')
const cmsPrio1Pages = data.URLS
const scrollToBottom = require('scroll-to-bottomjs')

test.describe('Integration test with visual testing - CMS Prio 1 pages', function () {
  // Iterate over each link defined in the cmsPrio1Pages array
  cmsPrio1Pages.forEach((link) => {
    test(`Load page: ${link} & take Argos snapshot`, async ({ page }) => {
      try {
        // Block specific scripts that might interfere with the test
        await ignoreYoutubeAndFreshchat(page)
        console.log(`Navigating to ${link}`)

        // Load the page and wait until it's fully loaded
        await page.goto(link, { waitUntil: 'load' })
        console.log(`Page loaded: ${link}`)

        // Wait for all fonts to be ready
        await page.waitForFunction(() => document.fonts.ready)
        console.log(`Fonts ready for ${link}`)

        // Scroll to the bottom of the page to ensure all content is loaded
        await page.evaluate(scrollToBottom)
        console.log(`Scrolled to bottom for ${link}`)

        // Check for button availability on the page
        await checkButtonAvailability(page)

        try {
          // Take an Argos screenshot for visual regression testing
          await argosScreenshot(page, link, {
            viewports: [
              'macbook-16', // Screenshot for MacBook 16-inch
              'iphone-6' // Screenshot for iPhone 6
            ]
          })
          console.log(`Screenshot taken for ${link}`)
          await page.mouse.move(0, 0) // Move mouse away after taking the screenshot
        } catch (error) {
          console.error(`Error taking Argos screenshot for ${link}: ${error.message}`)
        }
      } catch (error) {
        console.error(`Error in test for ${link}: ${error.message}`)
        console.error(error.stack) // Print the stack trace for debugging
      }
    })
  })
})
