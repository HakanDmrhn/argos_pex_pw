import { argosScreenshot } from '@argos-ci/playwright'
import { test, expect } from '@playwright/test'
import { ignoreYoutubeAndFreshchat, checkButtonAvailability } from '../support/helpers'

// Assuming categoryPages is defined correctly in JSON format in category_pages.json
const data = require('../fixtures/category_pages.json')
const categoryPages = data.URLS
const scrollToBottom = require('scroll-to-bottomjs')

test.describe('Integration test with visual testing - category pages', () => {
  categoryPages.forEach(function (link) {
    test('load page: ' + link + ' & take argos snapshot', async function ({ page }) {
      try {
        // block FreshChat script execution
        await ignoreYoutubeAndFreshchat(page)
        console.log(`Navigating to ${link}\n`)
        await page.goto(link, { waitUntil: 'load' })
        console.log(`Page loaded: ${link}`)

        await page.waitForFunction(() => document.fonts.ready)
        console.log(`Fonts ready for ${link}`)

        // Scroll to bottom of the page
        await page.evaluate(scrollToBottom)
        console.log(`Scrolled to bottom for ${link}`)

        // Optionally black out specific elements if needed
        // await ignoreYoutubeAndFreshchat(page);

        // Log the custom user agent and verify it
        const userAgent = await page.evaluate(() => navigator.userAgent)
        console.log(`Custom User Agent for ${link}: ${userAgent}`)
        expect(userAgent).toContain('testing_agent_visual')

        await checkButtonAvailability(page)

        // Take the screenshot using Argos
        console.log(`Taking screenshot for ${link}`)
        await argosScreenshot(page, link, {
          viewports: [
            'macbook-16', // Use device preset for macbook-16
            'iphone-6' // Use device preset for iphone-6
          ]
        })
        await page.mouse.move(0, 0) // Move mouse away
      } catch (error) {
        console.error(`Error in test for ${link}: ${error.message}`)
        console.error(error.stack)
      }
    })
  })
})
