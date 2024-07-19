/**
 * Hides or modifies YouTube video elements on the page.
 * @param {import('playwright').Page} page - The Playwright page object.
 */
export async function ignoreYoutube(page) {
    // List of selectors to check
    const selectors = ['.r-video', '.video', '#video'];
  
    for (const selector of selectors) {
      const count = await page.locator(selector).count();
      if (count > 0) {
        await page.evaluate(selector => {
          const element = document.querySelector(selector);
          if (element) {
            element.setAttribute('data-visual-test', 'transparent');  // You can choose between transparent, removed, blackout
          }
        }, selector);
      }
    }
  }



  /**
 * Hides or modifies the FreshChat iframe element on the page.
 * @param {import('playwright').Page} page - The Playwright page object.
 */
export async function ignoreFreshChat(page) {
    const freshChat = page.locator('#fc_frame');
    await freshChat.waitFor();  // Wait for FreshChat frame to be visible
  
    await page.evaluate(() => {
      const freshChatElement = document.querySelector('#fc_frame');
      if (freshChatElement) {
        freshChatElement.setAttribute('data-visual-test', 'transparent');  // You can choose between transparent, removed, blackout
      }
    });
  }



/**
 * Hides or modifies the Facebook icon element on the page.
 * @param {import('playwright').Page} page - The Playwright page object.
 */
export async function ignoreFacebook(page) {
    const facebookIcon = await page.locator('#facebook').count();
    if (facebookIcon > 0) {
      await page.evaluate(() => {
        const facebookElement = document.querySelector('#facebook');
        if (facebookElement) {
          facebookElement.setAttribute('data-visual-test', 'transparent');  // You can choose between transparent, removed, blackout
        }
      });
    }
  }



/**
 * Pauses all GIF animations to display the first frame.
 * @param {import('playwright').Page} page - The Playwright page object.
 */
export async function ignoreGifAnimations(page) {
  await page.evaluate(() => {
    const gifs = document.querySelectorAll('img[src$=".gif"]');
    gifs.forEach(gif => {
      // Check if the GIF has more than one frame
      const isAnimated = gif.src.includes('animated') || gif.src.includes('multiple');

      if (isAnimated) {
        // Create a canvas to draw the first frame
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = gif.naturalWidth;
        canvas.height = gif.naturalHeight;

        // Draw the GIF onto the canvas
        ctx.drawImage(gif, 0, 0);

        // Replace the GIF with the first frame as a PNG image
        gif.src = canvas.toDataURL('image/png');
      }
    });
  });
  }