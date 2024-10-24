import { argosScreenshot } from '@argos-ci/playwright'
import { test } from '@playwright/test'
import { ignoreYoutubeAndFreshchat, checkButtonAvailability } from '../support/helpers'

const data = require('../fixtures/cms_prio3.json')
const cmsPrio3Pages = data.URLS
const scrollToBottom = require('scroll-to-bottomjs')

test.describe('Integration test with visual testing - CMS Prio 3 pages', function () {
  // Iterate over each link defined in cmsPrio3Pages
  cmsPrio3Pages.forEach(function (link) {
    test(`Load page: ${link} & take Argos snapshot`, async function ({ page }) {
      try {
        // Block FreshChat script execution to prevent interference with tests
        console.log(`Blocking FreshChat for ${link}`)
        await ignoreYoutubeAndFreshchat(page)

        // Navigate to the specified URL
        console.log(`Navigating to ${link}`)
        await page.goto(link, { waitUntil: 'load' })
        console.log(`Page loaded: ${link}`)

        // Wait for all fonts to be fully loaded
        await page.waitForFunction(() => document.fonts.ready)
        console.log(`Fonts ready for ${link}`)

        // Scroll to the bottom of the page to ensure all images and content are fully loaded
        console.log(`Scrolling to the bottom of the page for ${link}`)
        await page.evaluate(scrollToBottom)

        // Check button availability on the page
        await checkButtonAvailability(page)
        console.log(`Button availability checked for ${link}`)

        // Capture Argos screenshot for visual regression testing
        console.log(`Taking Argos screenshot for ${link}`)
        await argosScreenshot(page, link, {
          viewports: [
            'macbook-16', // Use Macbook-16 viewport preset (1536 x 960)
            'iphone-6' // Use iPhone-6 viewport preset (375 x 667)
          ]
        })

        // Move the mouse away from the page to avoid interference with the screenshot
        await page.mouse.move(0, 0)
        console.log(`Mouse moved away from the page for ${link}`)
      } catch (error) {
        // Log any errors that occur during the test execution
        console.error(`Error during test for ${link}: ${error.message}`)
        console.error(error.stack)
      }
    })
  })
})
