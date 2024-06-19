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

export async function ignoreFreshChat(page) {

    const freshChat = page.locator('#fc_frame')
    await freshChat.waitFor()  // wait for freshChat-Icon to be visible

    await page.evaluate(() => {
        const freshChatElement = document.querySelector('#fc_frame');
        freshChatElement.setAttribute('data-visual-test', 'transparent'); // you can choose between transparent, removed, blackout
    });
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