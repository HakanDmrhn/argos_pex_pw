import { expect } from '@playwright/test';

/**
 * Blocks YouTube videos and FreshChat requests on the page.
 * This is done by intercepting requests to the YouTube and FreshChat domains.
 * 
 * ON PEX YOUTUBE VIDEOS HAVE GOT 3 DIFFERENT selectors .r-video, .video and #video 
 *
 * @param {import('@playwright/test').Page} page - The Playwright page object.
 */
export async function ignoreYoutubeAndFreshchat(page) {

   
    // Intercept and abort YouTube requests
    await page.route('https://www.youtube-nocookie.com/**', route => { 
        console.log('YouTube video request blocked:', route.request().url());
        return route.abort();
    });
    
    // Intercept and abort Freshchat requests
    await page.route('**/wchat.eu.freshchat.com/js/widget.js', route => {
        console.log('FreshChat widget request blocked:', route.request().url());
        return route.abort();
    });
}




/**
 * Blocks the FreshChat script from loading by intercepting and aborting its network requests.
 *
 * @param {import('@playwright/test').Page} page - The Playwright Page object representing the browser page.
 * @returns {Promise<void>} - A promise that resolves when the FreshChat script is successfully blocked.
 */
export async function ignoreFreshChat(page) {
    try {
        // Intercept network requests and abort those for FreshChat widget script
        await page.route('**/wchat.eu.freshchat.com/js/widget.js', route => {
            console.log('Blocking FreshChat script:', route.request().url());
            route.abort(); // Abort requests matching the pattern
        });


    } catch (error) {
        console.error('An error occurred while blocking FreshChat:', error);
        throw error;
    }
}


/**
 * Blackouts Facebook on the page by setting the data-visual-test attribute.
 * @param {import('@playwright/test').Page} page - The Playwright page object.
 */
export async function ignoreFacebook(page) {
    // selector #facebook
    const facebookIcon = await page.locator('#facebook').count();
    if (facebookIcon > 0) { // if this element exists
        await page.evaluate(() => {
            const facebookElement = document.querySelector('#facebook');
            facebookElement.setAttribute('data-visual-test', 'transparent');  // you can choose between transparent, removed, blackout
        });
    }
}

/**
 * Waits for the animation to end by ensuring the element is stable.
 * @param {import('@playwright/test').Locator} locator - The Playwright locator for the element to check.
 */
export async function waitForAnimationEnd(locator) {
    const handle = await locator.elementHandle();
    await handle?.waitForElementState('stable');
    handle?.dispose();
}



/**
 * Checks if all visible buttons in the locator are enabled.
 * @param {import('@playwright/test').Page} page - The Playwright page object.
 */
export async function checkButtonAvailability(page) {
    try {
        // Create a locator for all visible button elements
        const buttonLocator = page.locator('button:visible');
        const buttonCount = await buttonLocator.count();
        console.log(`Number of visible buttons found: ${buttonCount}`);

        // If no buttons are found, log a message and return
        if (buttonCount === 0) {
            console.log('No visible buttons found. Skipping visibility and enabled checks.');
            return;
        }

        // Iterate over each button to check if it's visible and enabled
        for (let i = 0; i < buttonCount; i++) {
            const button = buttonLocator.nth(i);

            // Check if the button is disabled before asserting it's enabled
            const isDisabled = await button.getAttribute('disabled');
            
            if (isDisabled) {
                console.log(`Button ${i + 1} is disabled and will be skipped.`);
            } else {
                // Button is visible and not disabled, now check if it's enabled
                try {
                    await expect(button).toBeEnabled();
                    console.log(`Button ${i + 1} is enabled.`);
                } catch (err) {
                    console.error(`Button ${i + 1} enabled check failed: ${err.message}`);
                }
            }
        }
    } catch (err) {
        console.error('Failed during button availability check:', err.message);
    }
}



/**
 * Waits for the specific text to appear in an h1 element on the page.
 * @param {import('@playwright/test').Page} page - The Playwright page object.
 * @param {string} text - The text to wait for.
 * @param {number} timeout - The maximum time to wait for the text (in milliseconds).
 */
export async function waitForTextToAppear(page, text, timeout = 30000) {
    try {
        // Define a locator for the h1 element where the text is expected to appear
        const locator = page.locator('h1'); // Targeting h1 elements

        // Wait for the text to appear in the h1 element
        await expect(locator).toHaveText(text, { timeout });
        console.log(`Text "${text}" appeared in the h1 element on the page.`);
    } catch (error) {
        console.error(`Text "${text}" did not appear in the h1 element within ${timeout}ms.`);
        console.error(error.message);
    }
}

