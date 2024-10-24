import { argosScreenshot } from '@argos-ci/playwright'
import { test } from '@playwright/test'
import { ignoreYoutubeAndFreshchat, checkButtonAvailability, waitForAnimationEnd } from '../support/helpers'
const data = require('../fixtures/cms_prio2.json')
const cmsPrio2Pages = data.URLS
const scrollToBottom = require('scroll-to-bottomjs')

test.describe('Integration test with visual testing - CMS Prio 2 pages', function () {
  // Iterate over each link defined in cmsPrio2Pages'
  cmsPrio2Pages.forEach(function (link) {
    test(`Load page: ${link} & take Argos snapshot`, async function ({ page }) {
      try {
        // Block specific scripts that might interfere with the test
        console.log(`Block FreshChat and YouTube for ${link}`)
        await ignoreYoutubeAndFreshchat(page)

        // Navigate to the URL
        console.log(`Navigating to ${link}`)
        await page.goto(link, { waitUntil: 'load' })

        // Scroll to the bottom to ensure all images are loaded
        console.log(`Scrolling to the bottom for ${link}`)
        await page.evaluate(scrollToBottom)
        await ignoreYoutubeAndFreshchat(page) // Ensure YouTube is still blocked
        console.log(`Page loaded for ${link}`)

        // Wait for fonts to be ready
        await page.waitForFunction(() => document.fonts.ready)
        console.log(`Fonts are ready for ${link}`)

        // Check button availability on the page
        await checkButtonAvailability(page)
        console.log(`Button availability checked for ${link}`)

        // Handle animations for images
        const animatedImageLocatorVs2 = page.locator('#mainimage_plisseetyp_vs2')
        const animatedImageLocatorVs1 = page.locator('#mainimage_plisseetyp_vs1')

        // Wait for the vs2 image animation to finish if it's visible
        if (await animatedImageLocatorVs2.isVisible()) {
          console.log('Waiting for animation to end for vs2 image')
          await waitForAnimationEnd(animatedImageLocatorVs2)
          await page.waitForTimeout(10000) // Optional additional wait
        }

        // Wait for the vs1 image animation to finish if it's visible
        if (await animatedImageLocatorVs1.isVisible()) {
          console.log('Waiting for animation to end for vs1 image')
          await waitForAnimationEnd(animatedImageLocatorVs1)
        }

        // Take Argos screenshot for visual regression testing
        console.log(`Taking Argos screenshot for ${link}`)
        await argosScreenshot(page, link, {
          viewports: [
            'macbook-16', // Use device preset for macbook-16 --> 1536 x 960
            'iphone-6' // Use device preset for iphone-6 --> 375 x 667
          ],
          animations: 'disabled' // Disable animations for GIFs on specific pages
        })

        // Move mouse away from the page after the screenshot
        await page.mouse.move(0, 0)
        console.log(`Mouse moved away from the page for ${link}`)
      } catch (error) {
        // Log the error details for debugging
        console.error(`Error during test for ${link}: ${error.message}`)
        console.error(error.stack)
      }
    })
  })
})
