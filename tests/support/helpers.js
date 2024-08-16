export async function ignoreYoutube(page) {

    //**************************************************************************************/
    //***************** ON PEX YOUTUBE VIDEOS HAVE GOT 3 DIFFERENT selectors **************/
    //************************* .r-video, .video and #video ******************************/

    // selector .r-video
    const exist_youtube_a = await page.locator('.r-video').count();

    if (exist_youtube_a > 0) { // if this element exists

        // console.log('Element .r-video does exist: ' + exist_youtube_a)
        await page.evaluate(() => {
            const youTubeVideo_a = document.querySelector('.r-video');
            youTubeVideo_a.setAttribute('data-visual-test', 'transparent');  // you can choose between transparent, removed, blackout
        });
    }
    else {
        // console.log('Element .r-video does not exist: ' + exist_youtube_a)
    }


    // selector .video
    const exist_youtube_b = await page.locator('.video').count();

    if (exist_youtube_b > 0) { // if this element exists

        // console.log('Element .video does exist: ' + exist_youtube_b)
        await page.evaluate(() => {
            const youTubeVideo_b = document.querySelector('.video');
            youTubeVideo_b.setAttribute('data-visual-test', 'transparent');  // you can choose between transparent, removed, blackout
        });
    }
    else {
        // console.log('Element .video does not exist: ' + exist_youtube_b)
    }

    // selector #video
    const exist_youtube_c = await page.locator('#video').count();

    if (exist_youtube_c > 0) { // if this element exists

        // console.log('Element #video does exist: ' + exist_youtube_c)
        await page.evaluate(() => {
            const youTubeVideo_c = document.querySelector('#video');
            youTubeVideo_c.setAttribute('data-visual-test', 'transparent');  // you can choose between transparent, removed, blackout
        });
    }
    else {
        // console.log('Element #video does not exist: ' + exist_youtube_c)
    }
}



// --------------------------------------------------------------------------------------------//
// --------------------------------------- FRESHCHAT ------------------------------------------//
// --------------------------------------------------------------------------------------------//
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




// --------------------------------------------------------------------------------------------//
// ----------------------------------------- FACEBOOK ------------------------------------------//
// --------------------------------------------------------------------------------------------//

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



export async function waitForAnimationEnd(locator) {
    const handle = await locator.elementHandle();
    await handle?.waitForElementState('stable');
    handle?.dispose();
  }
  