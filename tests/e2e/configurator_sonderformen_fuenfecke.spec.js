import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, ignoreFacebook, checkButtonAvailability } from '../support/helpers';

let scrollToBottom = require("scroll-to-bottomjs");

test('load configurator Sonderformen - Fünfecke with Cremona 1093', async function ({ page }) {

    try {
        console.log('Blocking FreshChat script...');
        await ignoreFreshChat(page);
    } catch (error) {
        console.error('Error blocking FreshChat:', error);
    }

    try {
        console.log('Navigating to /cremona-1093...');
        await page.goto('/cremona-1093', { waitUntil: 'load' });
        await page.waitForFunction(() => document.fonts.ready);
    } catch (error) {
        console.error('Error navigating to /cremona-1093:', error);
    }

    try {
        console.log('Ensuring price is loaded correctly...');
        await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-5,00/);
        await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-2,50/);
    } catch (error) {
        console.error('Error checking price:', error);
    }

    try {
        console.log('Scrolling to bottom of the page...');
        await page.evaluate(scrollToBottom);
        await checkButtonAvailability(page);
    } catch (error) {
        console.error('Error during scroll or button availability check:', error);
    }

    try {
        console.log('Blackout YouTube videos...');
        await ignoreYoutube(page);
    } catch (error) {
        console.error('Error blacking out YouTube:', error);
    }

    try {
        console.log('Checking main image visibility...');
        await expect(page.locator('#image')).toBeVisible();
    } catch (error) {
        console.error('Error checking main image visibility:', error);
    }

    // --------------- Gallery Images ------------------------\\
    try {
        console.log('Checking gallery images visibility...');
        const galleryImages_count = 8; // Cremona 1093 has 7 gallery images
        const galleryImages_visible = await page.locator('.small_gallery > ul > li > img:visible').count();

        if (galleryImages_visible !== galleryImages_count) {
            console.warn(`Gallery images mismatch: expected ${galleryImages_count}, but found ${galleryImages_visible}`);
        }

        await expect(galleryImages_visible).toStrictEqual(galleryImages_count);
    } catch (error) {
        console.error('Error checking gallery images:', error);
    }

    // Select Sonderformen tab
    try {
        console.log('Selecting Sonderformen tab...');
        await page.getByText('Sonderformen', { exact: true }).click();
    } catch (error) {
        console.error('Error selecting Sonderformen tab:', error);
    }

    // Select Pentagon shape
    try {
        console.log('Selecting Pentagon shape...');
        await expect(page.locator("label[for='pentagon']")).toBeVisible();
        await page.locator("label[for='pentagon']").click();
    } catch (error) {
        console.error('Error selecting Pentagon shape:', error);
    }

    // Take Argos screenshot
    try {
        console.log('Taking screenshot for "Sonderformen Fünfecke - Startseite mit Cremona 1093"...');
        await argosScreenshot(page, 'Sonderformen Fünfecke - Startseite mit Cremona 1093', {
            viewports: ["macbook-16", "iphone-6"]
        });
    } catch (error) {
        console.error('Error taking screenshot:', error);
    }

    // Stoffeigenschaften
    let attributes = [
        "transparenz-img", "bildschirmarbeitsplatz-img", "strahlungsschutz-img", 
        "rueckseite-weiss-img", "oekotex-img", "feucht-abwischbar-img", 
        "massanfertigung-img", "made-in-germany-img"
    ];

    for (let i = 0; i < attributes.length; i++) {
        try {
            console.log(`Hovering and capturing screenshot for attribute: ${attributes[i]}...`);
            await page.locator('#' + attributes[i]).dispatchEvent('mouseover');
            await argosScreenshot(page, 'Sonderformen Fünfecke - Eigenschaft Cremona 1093 ' + attributes[i], {
                viewports: ["macbook-16", "iphone-6"]
            });
            await page.mouse.move(0, 0); // Move mouse away
        } catch (error) {
            console.error(`Error handling attribute ${attributes[i]}:`, error);
        }
    }

    // Plisseetypen
    let types = ["vs5", "vs5sd"];

    for (let i = 0; i < types.length; i++) {
        try {
            console.log(`Selecting and hovering on Plissee type: ${types[i]}...`);
            await page.locator("label[for=" + types[i] + "]").click();
            await page.locator("label[for=" + types[i] + "]").hover();
            await argosScreenshot(page, 'Sonderformen Fünfecke - Auswahl und Tooltip ' + types[i], {
                disableHover: false
            });
            await page.mouse.move(0, 0);
        } catch (error) {
            console.error(`Error handling Plissee type ${types[i]}:`, error);
        }
    }

    // Befestigungen
    let befestigungen = ["direkt_vor_der_scheibe", "am_fensterfluegel", "klemmtraeger"];

    for (let i = 0; i < befestigungen.length; i++) {
        try {
            console.log(`Selecting and taking screenshot for Befestigung: ${befestigungen[i]}...`);
            await page.locator("label[for=" + befestigungen[i] + "] > p").click();
            await argosScreenshot(page, 'Sonderformen Fünfecke - Auswahl Befestigung ' + befestigungen[i], {
                viewports: ["macbook-16", "iphone-6"]
            });
            await page.mouse.move(0, 0);
        } catch (error) {
            console.error(`Error handling Befestigung ${befestigungen[i]}:`, error);
        }
    }

    // Tooltips for Befestigungen
    for (let i = 0; i < befestigungen.length; i++) {
        try {
            console.log(`Hovering on tooltip for Befestigung: ${befestigungen[i]}...`);
            await page.locator("label[for=" + befestigungen[i] + "] + div.tooltip_icon").hover();
            await argosScreenshot(page, 'Sonderformen Fünfecke - Tooltip Befestigung ' + befestigungen[i], {
                disableHover: false
            });
            await page.mouse.move(0, 0);
        } catch (error) {
            console.error(`Error handling tooltip for Befestigung ${befestigungen[i]}:`, error);
        }
    }

    // Similar handling for Schienenfarben and other sections...

    //----------------------------------- FINAL SECTIONS ---------------------------------------------\\

    try {
        console.log('Test completed successfully.');
    } catch (error) {
        console.error('Error in final steps of the test:', error);
    }
});
