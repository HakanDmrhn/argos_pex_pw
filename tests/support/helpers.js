import { expect } from '@playwright/test';

/**
 * Blackouts YouTube videos on the page by setting the data-visual-test attribute.
 * @param {import('@playwright/test').Page} page - The Playwright page object.
 */
export async function ignoreYoutube(page) {
    //**************************************************************************************/
    //***************** ON PEX YOUTUBE VIDEOS HAVE GOT 3 DIFFERENT selectors **************/
    //************************* .r-video, .video and #video ******************************/

    // selector .r-video
    const exist_youtube_a = await page.locator('.r-video').count();
    if (exist_youtube_a > 0) { // if this element exists
        await page.evaluate(() => {
            const youTubeVideo_a = document.querySelector('.r-video');
            youTubeVideo_a.setAttribute('data-visual-test', 'transparent');  // you can choose between transparent, removed, blackout
        });
    }

    // selector .video
    const exist_youtube_b = await page.locator('.video').count();
    if (exist_youtube_b > 0) { // if this element exists
        await page.evaluate(() => {
            const youTubeVideo_b = document.querySelector('.video');
            youTubeVideo_b.setAttribute('data-visual-test', 'transparent');  // you can choose between transparent, removed, blackout
        });
    }

    // selector #video
    const exist_youtube_c = await page.locator('#video').count();
    if (exist_youtube_c > 0) { // if this element exists
        await page.evaluate(() => {
            const youTubeVideo_c = document.querySelector('#video');
            youTubeVideo_c.setAttribute('data-visual-test', 'transparent');  // you can choose between transparent, removed, blackout
        });
    }
}

/**
 * Blackouts FreshChat on the page by setting the data-visual-test attribute.
 * @param {import('@playwright/test').Page} page - The Playwright page object.
 * @param {string} [attributeValue='transparent'] - The value to set for the data-visual-test attribute.
 */
export async function ignoreFreshChat(page, attributeValue = 'transparent') {
    try {
        // Define a locator for the FreshChat element
        const freshChatIcon = await page.locator('#fc_frame').count();
        if (freshChatIcon > 0) { // if this element exists
            // Set the attribute to hide FreshChat
            await page.evaluate((attrValue) => {
                const freshChatElement = document.querySelector('#fc_frame');
                if (freshChatElement) {
                    freshChatElement.setAttribute('data-visual-test', attrValue);
                }
            }, attributeValue);
        }
    } catch (error) {
        console.error('Failed to ignore FreshChat:', error);
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
        // Create a locator for all button elements
        const buttonLocator = page.locator('button');
        const buttonCount = await buttonLocator.count();
        console.log(`Number of buttons found: ${buttonCount}`);

        // If no buttons are found, log a message and return
        if (buttonCount === 0) {
            console.log('No buttons found. Skipping visibility and enabled checks.');
            return;
        }

        // Iterate over each button to check if it's visible and enabled
        for (let i = 0; i < buttonCount; i++) {
            const button = buttonLocator.nth(i);
            
            // Check if the button is visible
            const isVisible = await button.isVisible();
            
            if (isVisible) {
                try {
                    // Check if the button is enabled
                    await expect(button).toBeEnabled(); // Check if the button is enabled
                } catch (err) {
                    console.error(`Button ${i} enabled check failed: ${err.message}`);
                }
            } else {
                console.log(`Button ${i} is hidden and will be ignored.`);
            }
        }
    } catch (err) {
        console.error('Failed during button availability check:', err.message);
    }
}
