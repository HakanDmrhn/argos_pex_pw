import { argosScreenshot } from '@argos-ci/playwright'
import { test } from '@playwright/test'
import { ignoreYoutubeAndFreshchat, checkButtonAvailability } from '../support/helpers'

/**
 * Scrolls to the bottom of the page.
 * Imported from 'scroll-to-bottomjs'.
 */
const scrollToBottom = require('scroll-to-bottomjs')

// Define search terms for each page.
// This object maps specific product URLs to their corresponding search terms.
// This will be used in the integration tests to validate search functionality across different pages.
const productSearchTerms = {
  '/plissee-blau': 'ozean',
  '/plissee-gelb': '1=1', // a test for an invalid search
  '/ravenna-1011': 'ravenna',
  '/palermo-1078': 'palermo',
  '/cremona-1091': 'cremona',
  '/rovereto-1141': 'rovereto',
  '/bozen-1162': 'bozen',
  '/peschiera-2039': 'peschiera',
  '/syrakus-2079': 'syrakus',
  '/duo-4010': 'duo'
}

// Describe the integration test suite for visual testing of the search function
test.describe('Integration test with visual testing - search function', function () {
  // Iterate over each entry in the productSearchTerms object.
  Object.entries(productSearchTerms).forEach(([link, searchTerm]) => {
    test(`Load page: ${link} - Enter search term "${searchTerm}" and take Argos snapshot`, async function ({ page }) {
      try {
        // Block FreshChat and YouTube script execution to prevent interference with tests.
        await ignoreYoutubeAndFreshchat(page)

        // Log navigation to the specified product link.
        console.log(`Navigating to ${link}`)

        // Navigate to the product page and wait for the page to fully load.
        await page.goto(link, { waitUntil: 'load' })
        await page.waitForFunction(() => document.fonts.ready) // Ensure all fonts are loaded before proceeding.

        // Scroll to the bottom of the page to ensure that all images and dynamic content are fully loaded.
        console.log(`Scrolling to bottom of the page: ${link}`)
        await page.evaluate(scrollToBottom)

        // Block any YouTube and FreshChat elements that may affect the snapshot.
        await ignoreYoutubeAndFreshchat(page)

        // Check the availability of the search button to ensure it is clickable.
        await checkButtonAvailability(page)

        // Log the action of entering the search term into the search input field.
        console.log(`Entering search term "${searchTerm}"`)
        await page.fill('#search', searchTerm)

        // Log and perform the click action on the search button.
        console.log('Clicking search button')
        await page.click('#search_form_btn')

        // Wait for the page to render after clicking the search button.
        await page.waitForFunction(() => document.fonts.ready)

        // Log the action of taking an Argos screenshot for visual regression testing.
        console.log(`Taking Argos screenshot for: ${link}`)
        await argosScreenshot(page, link, {
          viewports: [
            'macbook-16', // Use device preset for macbook-16 --> 1536 x 960
            'iphone-6' // Use device preset for iphone-6 --> 375x667
          ]
        })

        // Move the mouse away from the viewport to avoid interference in screenshots.
        await page.mouse.move(0, 0)

        // Log success message indicating the completion of the snapshot process for the current link.
        console.log(`Successfully completed snapshot for: ${link}`)
      } catch (error) {
        // Log any errors encountered during the test execution.
        console.error(`Error processing ${link} with search term "${searchTerm}": ${error.message}`)
      }
    })
  })
})
