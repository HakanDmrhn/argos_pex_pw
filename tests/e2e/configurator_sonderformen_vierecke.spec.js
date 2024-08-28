import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, ignoreFacebook, checkButtonAvailability } from '../support/helpers';
let scrollToBottom = require("scroll-to-bottomjs");

test('load configurator Sonderformen - Vierecke with Pearl-Light-4555', async function ({ page }) {

    const link = '/pearl-light-4555'; // Assigning link variable

    // Load PDP page
    try {
        console.log(`Navigating to ${link}`);
        await page.goto(link, { waitUntil: 'load' });
        console.log(`Waiting for fonts to be ready for ${link}`);
        await page.waitForFunction(() => document.fonts.ready);
        console.log(`Fonts ready for ${link}`);

        // Scroll to bottom to ensure all resources are loaded
        await page.evaluate(scrollToBottom);
        console.log(`Scrolled to bottom for ${link}`);
        
        await checkButtonAvailability(page);
        await ignoreFreshChat(page);  // Blackout FreshChat
        await ignoreYoutube(page);    // Blackout YouTube

        // Ensure JS files are loaded properly
        await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-5,00/);
        await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-2,50/);

    } catch (error) {
        console.error(`Error in test for ${link}: ${error.message}`);
        console.error(error.stack);
    }

    // Check if main image is visible
    await expect(page.locator('#image')).toBeVisible();

    // Check if all gallery images are loaded
    const galleryImages_count = 12; // Pearl-Light-4555 has 12 gallery images
    const galleryImages_visible = await page.locator('.small_gallery > ul > li > img:visible').count();
    await expect(galleryImages_visible).toBe(galleryImages_count);

    // Select Sonderformen-Tab
    const sonderformen = page.getByText('Sonderformen', { exact: true });
    await expect(sonderformen).toBeVisible();
    await sonderformen.click();

    // Select window shape
    await expect(page.locator("label[for='rectangle']")).toBeVisible();
    await page.locator("label[for='rectangle']").click();

    // Take Argos screenshot
    await argosScreenshot(page, 'Sonderformen Vierecke - Startseite mit Pearl-Light-4555', {
        viewports: ["macbook-16", "iphone-6"]
    });

    // Handle Stoffeigenschaften section with screenshots
    const attributes = [
        "transparenz-img",
        "bildschirmarbeitsplatz-img",
        "rueckseite-weiss-perlex-img",
        "oekotex-img",
        "feuchtraumgeeignet-img",
        "massanfertigung-img",
        "made-in-germany-img"
    ];

    for (const attribute of attributes) {
        await page.locator(`#${attribute}`).dispatchEvent('mouseover');
        await argosScreenshot(page, `Sonderformen Vierecke - Eigenschaft Pearl-Light-4555 ${attribute}`, {
            viewports: ["macbook-16", "iphone-6"]
        });
    }

    // Handle Plisseetypen section with screenshots
    const types = ["f1", "f3", "f5", "fk", "fs1", "fs2", "vs2sc", "vs3", "vssd", "vs4s1", "vs4s2", "vs7", "vs8"];

    for (const type of types) {
        await page.locator(`label[for="${type}"]`).click();
        await page.locator(`label[for="${type}"]`).hover();
        await argosScreenshot(page, `Sonderformen Vierecke - Auswahl und Tooltip ${type}`, { disableHover: false });
        await page.waitForTimeout(800);  // Adjust timeout for tooltip rendering
    }

    // Switch back to 'f1' to ensure all befestigungen are visible
    await page.locator("label[for='f1']").click();

    // Handle Befestigungen section with screenshots
    const befestigungen = ["direkt_vor_der_scheibe", "am_fensterfluegel", "klemmtraeger", "am_mauerwerk"];

    for (const befestigung of befestigungen) {
        await page.locator(`label[for="${befestigung}"] > p`).click();
        await argosScreenshot(page, `Sonderformen Vierecke - Auswahl Befestigung ${befestigung}`, {
            viewports: ["macbook-16", "iphone-6"]
        });
    }

    // Handle Befestigungen tooltips with screenshots
    for (const befestigung of befestigungen) {
        await page.locator(`label[for="${befestigung}"] + div.tooltip_icon`).hover();
        await argosScreenshot(page, `Sonderformen Vierecke - Tooltip Befestigung ${befestigung}`, { disableHover: false });
        await page.waitForTimeout(800);  // Adjust timeout to avoid crossing tooltips
    }

    // Handle Bedienseite and Pendelsicherung tooltips with screenshots
    await page.locator("section.bedienseite_container div.tooltip_icon").hover();
    await argosScreenshot(page, 'Sonderformen Vierecke - Tooltip Bedienseite', { disableHover: false });
    await page.waitForTimeout(800);  // Adjust timeout for tooltip rendering

    await page.locator("section.pendelsicherung_container div.tooltip_icon").hover();
    await argosScreenshot(page, 'Sonderformen Vierecke - Tooltip Pendelsicherung', { disableHover: false });
    await page.waitForTimeout(800);  // Adjust timeout for tooltip rendering

    // Handle Schienenfarben section with screenshots
    const schienenfarben = ["weiss", "schwarzbraun", "silber", "bronze", "anthrazit"];

    for (const color of schienenfarben) {
        await page.locator(`label[for="${color}"] > p`).click();
        await argosScreenshot(page, `Sonderformen Vierecke - Auswahl Schienenfarbe ${color}`, {
            viewports: ["macbook-16", "iphone-6"]
        });
    }

    // Handle Schienenfarben tooltips with screenshots
    for (const color of schienenfarben) {
        await page.locator(`label[for="${color}"] + div.tooltip_icon`).hover();
        await argosScreenshot(page, `Sonderformen Vierecke - Tooltip Schienenfarbe ${color}`, { disableHover: false });
        await page.waitForTimeout(800);  // Adjust timeout to avoid crossing tooltips
    }
});
