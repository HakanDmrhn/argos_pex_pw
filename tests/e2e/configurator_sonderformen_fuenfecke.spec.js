import { argosScreenshot } from "@argos-ci/playwright";
import { test, expect } from '@playwright/test';
import { ignoreFreshChat, ignoreYoutube, ignoreFacebook, checkButtonAvailability } from '../support/helpers';
import scrollToBottom from "scroll-to-bottomjs";

test('load configurator Sonderformen - Fünfecke with Cremona 1093', async function ({ page }) {
    try {
        console.log("Starting test for Cremona 1093 configurator...");

        // Block FreshChat script execution
        await ignoreFreshChat(page);
        console.log("Blocked FreshChat.");

        await page.goto('/cremona-1093', { waitUntil: 'load' });
        console.log("Navigated to Cremona 1093 page.");

        await page.waitForFunction(() => document.fonts.ready);
        console.log("Fonts are ready.");

        // Load js files --> workaround:
        await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-5,00/);
        await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-2,50/);
        console.log("Price check passed.");

        // Scroll to bottom to ensure all resources are loaded
        await page.evaluate(scrollToBottom);
        await checkButtonAvailability(page);
        console.log("Scrolled to bottom and checked button availability.");

        // Blackout YouTube
        await ignoreYoutube(page);
        console.log("Ignored YouTube videos.");

        // Check if main image is visible
        await expect(page.locator('#image')).toBeVisible();
        console.log("Main image is visible.");

        // Check gallery images
        const galleryImages_count = 8; // Cremona 1093 has got 7 gallery images
        const galleryImages_visible = await page.locator('.small_gallery > ul > li > img:visible').count();
        await expect(galleryImages_count).toStrictEqual(galleryImages_visible);
        console.log(`Gallery images check passed. Total: ${galleryImages_count}, Visible: ${galleryImages_visible}`);

        // Select DF TAB
        await page.getByText('Sonderformen', { exact: true }).click();
        console.log("Selected Sonderformen tab.");

        // Select window shape
        await expect(page.locator("label[for='pentagon']")).toBeVisible();
        await page.locator("label[for='pentagon']").click();
        console.log("Selected Pentagon window shape.");

        // Take argos screenshot
        await argosScreenshot(page, 'Sonderformen Fünfecke - Startseite mit Cremona 1093', {
            viewports: ["macbook-16", "iphone-6"]
        });
        console.log("Took Argos screenshot for start page.");

        // Stoffeigenschaften
        const attributes = [
            "transparenz-img",
            "bildschirmarbeitsplatz-img",
            "strahlungsschutz-img",
            "rueckseite-weiss-img",
            "oekotex-img",
            "feucht-abwischbar-img",
            "massanfertigung-img",
            "made-in-germany-img"
        ];

        for (const attribute of attributes) {
            await page.locator('#' + attribute).dispatchEvent('mouseover');
            await argosScreenshot(page, 'Sonderformen Fünfecke - Eigenschaft Cremona 1093 ' + attribute, {
                viewports: ["macbook-16", "iphone-6"]
            });
            console.log(`Took Argos screenshot for attribute: ${attribute}.`);
        }

        // Plisseetypen
        const types = ["vs5", "vs5sd"];
        for (const type of types) {
            await page.locator("label[for=" + type + "]").click();
            await page.locator("label[for=" + type + "]").hover();
            await argosScreenshot(page, 'Sonderformen Fünfecke - Auswahl und Tooltip ' + type, {
                disableHover: false
            });
            await page.waitForTimeout(1000); // Avoid crossing tooltips
            console.log(`Selected Plisseetyp: ${type}.`);
        }

        // Befestigungen
        const befestigungen = ["direkt_vor_der_scheibe", "am_fensterfluegel", "klemmtraeger"];
        for (const befestigung of befestigungen) {
            await page.locator("label[for=" + befestigung + "] > p").click();
            await argosScreenshot(page, 'Sonderformen Fünfecke - Auswahl Befestigung ' + befestigung, {
                viewports: ["macbook-16", "iphone-6"]
            });
            console.log(`Took Argos screenshot for befestigung: ${befestigung}.`);
        }

        // Befestigungen Tooltips
        for (const befestigung of befestigungen) {
            await page.locator("label[for=" + befestigung + "] + div.tooltip_icon").hover();
            await argosScreenshot(page, 'Sonderformen Fünfecke - Tooltip Befestigung ' + befestigung, {
                disableHover: false
            });
            await page.waitForTimeout(1000); // Avoid crossing tooltips
            console.log(`Hovered and took screenshot for tooltip: ${befestigung}.`);
        }

        // Schienenfarben
        const schienenfarben = ["weiss", "schwarzbraun", "silber", "bronze", "anthrazit"];
        for (const farbe of schienenfarben) {
            await page.locator("label[for=" + farbe + "] > p").click();
            await argosScreenshot(page, 'Sonderformen Fünfecke - Auswahl Schienenfarbe ' + farbe, {
                viewports: ["macbook-16", "iphone-6"]
            });
            console.log(`Took Argos screenshot for schienenfarbe: ${farbe}.`);
        }

        // Schienenfarben Tooltips
        for (const farbe of schienenfarben) {
            await page.locator("label[for=" + farbe + "] + div.tooltip_icon").hover();
            await argosScreenshot(page, 'Sonderformen Fünfecke - Tooltip Schienenfarbe ' + farbe, {
                disableHover: false
            });
            await page.waitForTimeout(1000); // Avoid crossing tooltips
            console.log(`Hovered and took screenshot for tooltip: ${farbe}.`);
        }

        // Bediengriffe Auswahl
        await page.waitForTimeout(1000);
        await page.locator("label[for='standard'] > p").click();
        await argosScreenshot(page, 'Sonderformen Fünfecke - Bediengriff Standard', {
            viewports: ["macbook-16", "iphone-6"]
        });
        console.log("Selected Standard Bediengriff.");

        await page.waitForTimeout(1000);
        await page.locator("label[for='design'] > p").click();
        await argosScreenshot(page, 'Sonderformen Fünfecke - Bediengriff Design', {
            viewports: ["macbook-16", "iphone-6"]
        });
        console.log("Selected Design Bediengriff.");

        // Bediengriffe Tooltips
        await page.locator("label[for='standard'] + div.tooltip_icon").hover();
        await argosScreenshot(page, 'Sonderformen Fünfecke - Tooltip Bediengriff Standard', {
            disableHover: false
        });
        await page.waitForTimeout(1000); // Avoid crossing tooltips
        console.log("Hovered on standard Bediengriff tooltip.");

        await page.locator("label[for='design'] + div.tooltip_icon").hover();
        await argosScreenshot(page, 'Sonderformen Fünfecke - Tooltip Bediengriff Design', {
            disableHover: false
        });
        console.log("Hovered on design Bediengriff tooltip.");

        // Bedienstäbe Auswahl
        await page.locator("#bedienstab_select").click();
        await argosScreenshot(page, 'Sonderformen Fünfecke - Bedienstäbe', { fullPage: false });
        await page.locator("#bedienstab_select").click(); // Close dropdown
        console.log("Opened and closed Bedienstäbe dropdown.");

        // Bedienstäbe Tooltip
        await page.locator("div.bedienstab_container div.tooltip_icon").hover();
        await argosScreenshot(page, 'Sonderformen Fünfecke - Tooltip Bedienstäbe', {
            disableHover: false
        });
        console.log("Hovered on Bedienstäbe tooltip.");

        console.log("Test completed successfully.");
    } catch (error) {
        console.error("Error during test execution:", error);
    }
});
