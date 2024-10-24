import { argosScreenshot } from '@argos-ci/playwright'
import { test, expect } from '@playwright/test'
import { ignoreYoutubeAndFreshchat, checkButtonAvailability } from '../support/helpers'

const scrollToBottom = require('scroll-to-bottomjs')

test('load configurator Dachfenster with Meran 5076', async function ({ page }) {
  // block FreshChat script execution
  await ignoreYoutubeAndFreshchat(page)
  await page.goto('/meran-5076', { waitUntil: 'load' })
  await page.waitForFunction(() => document.fonts.ready)

  // load js files --> workaround:
  await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-5,00/)
  await expect(page.locator('.price_amount > .product_prices > .price .final_price')).not.toHaveText(/-2,50/)

  // scroll to bottom with npm package to be sure that all resources are loaded
  await page.evaluate(scrollToBottom)

  // Check button availability
  await checkButtonAvailability(page)
  console.log('Button availability checked')

  // check if main image is visible
  await expect(page.locator('#image')).toBeVisible()

  // --------------- BE SURE THAT ALL GALLERY IMAGES ARE LOADED ------------------------\\
  const galleryImagesCount = 9 // Meran 5076 has 9 gallery images
  const galleryImagesVisible = await page.locator('.small_gallery > ul > li > img:visible').count()
  await expect(galleryImagesCount).toStrictEqual(galleryImagesVisible)

  // select DF TAB
  await page.getByText('Dachfenster', { exact: true }).click()

  // CHECK REQUEST - TO ENSURE PRICE LISTS ARE LOADED
  await page.waitForResponse('/prices/split_by_pg/dfnonstandard_pg2.json')

  // take argos screenshot
  await argosScreenshot(page, 'Dachfenster - Startseite mit Meran 5076', {
    viewports: [
      'macbook-16', // 1536 x 960
      'iphone-6' // 375 x 667
    ]
  })

  // ---------------------------------- GENORMTE DF --------------------------------------------------\\
  // --------------------------------- STOFF-EIGENSCHAFTEN ------------------------------------------\\
  const attributes = [
    'transparenz-img',
    'rueckseite-perlex-img',
    'schwer-entflammbar-img',
    'feuchtraumgeeignet-img',
    'waschbar-img',
    'massanfertigung-img',
    'made-in-germany-img'
  ]

  for (let i = 0; i < attributes.length; i++) {
    await page.locator('#' + attributes[i]).dispatchEvent('mouseover')
    await argosScreenshot(page, 'Dachfenster - Eigenschaft Meran 5076 ' + attributes[i], {
      viewports: [
        'macbook-16',
        'iphone-6'
      ]
    })
    console.log(`Screenshot taken for attribute: ${attributes[i]}`)
    await page.mouse.move(0, 0) // Move mouse away
  }

  // ------------------------------------------ DF-TYPEN --------------------------------------------\\
  await argosScreenshot(page, 'Dachfenster - Auswahl DF20', {
    viewports: [
      'macbook-16',
      'iphone-6'
    ]
  })

  await page.locator('li').filter({ hasText: 'DF 20 Comfort - Plissee kann nach' }).click()
  await page.waitForResponse('/prices/split_by_pg/dfcomfortnonstandard_pg2.json')

  await argosScreenshot(page, 'Dachfenster - Auswahl DF20 Comfort', {
    viewports: [
      'macbook-16',
      'iphone-6'
    ]
  })

  await page.locator('li').filter({ hasText: 'DF 30 Comfort - Plissee hat 2' }).click()
  await argosScreenshot(page, 'Dachfenster - Auswahl DF30 Comfort', {
    viewports: [
      'macbook-16',
      'iphone-6'
    ]
  })

  // ------------------------------------------ CAPTURE TOOLTIPS ------------------------------------\\
  try {
    const tooltipIconLocatorDF20 = page.locator('li').filter({ hasText: 'DF 20 - Plissee kann nach' }).locator('div.tooltip_icon')
    await tooltipIconLocatorDF20.hover()
    const tooltipLocatorDF20 = page.locator('li').filter({ hasText: 'DF 20 - Plissee kann nach' }).locator('div.option_item_tooltip')
    await tooltipLocatorDF20.waitFor({ state: 'visible' })
    await argosScreenshot(page, 'Dachfenster - Tooltip DF20', { disableHover: false })
    await page.mouse.move(0, 0)
    await tooltipLocatorDF20.waitFor({ state: 'hidden' })
  } catch (error) {
    console.error('An error occurred:', error.message)
  }

  try {
    const tooltipIconLocatorDF20C = page.locator('li').filter({ hasText: 'DF 20 Comfort - Plissee kann nach' }).locator('div.tooltip_icon')
    await tooltipIconLocatorDF20C.hover()
    const tooltipLocatorDF20C = page.locator('li').filter({ hasText: 'DF 20 Comfort - Plissee kann nach' }).locator('div.option_item_tooltip')
    await tooltipLocatorDF20C.waitFor({ state: 'visible' })
    await argosScreenshot(page, 'Dachfenster - Tooltip DF20 Comfort', { disableHover: false })
    await page.mouse.move(0, 0)
    await tooltipLocatorDF20C.waitFor({ state: 'hidden' })
  } catch (error) {
    console.error('An error occurred:', error.message)
  }

  try {
    const tooltipIconLocatorDF30C = page.locator('li').filter({ hasText: 'DF 30 Comfort - Plissee hat 2' }).locator('div.tooltip_icon')
    await tooltipIconLocatorDF30C.hover()
    const tooltipLocatorDF30C = page.locator('li').filter({ hasText: 'DF 30 Comfort - Plissee hat 2' }).locator('div.option_item_tooltip')
    await tooltipLocatorDF30C.waitFor({ state: 'visible' })
    await argosScreenshot(page, 'Dachfenster - Tooltip DF30 Comfort', { disableHover: false })
    await page.mouse.move(0, 0)
    await tooltipLocatorDF30C.waitFor({ state: 'hidden' })
  } catch (error) {
    console.error('An error occurred:', error.message)
  }

  // ----------------------------------- SELECT-FELDER ---------------------------------------------\\
  await page.locator('#df_hersteller_select').click()
  await argosScreenshot(page, 'Dachfenster - Genormte DF Hersteller', { fullPage: false })
  await page.locator('#df_hersteller_select').selectOption('Fakro')

  await Promise.all([
    page.waitForResponse(response =>
      response.url().includes('/customoptions/index/getDFProducts?') && response.status() === 200,
    { timeout: 500 }
    ).then(() => console.log('RESPONSE RECEIVED - get DF products'))
  ])

  await page.locator('#df_product_select').click()
  await argosScreenshot(page, 'Dachfenster - Genormte DF Produkt', { fullPage: false })
  await page.locator('#df_product_select').selectOption('1')

  await Promise.all([
    page.waitForResponse(response =>
      response.url().includes('/customoptions/index/getDFTypes?') && response.status() === 200,
    { timeout: 500 }
    ).then(() => console.log('RESPONSE RECEIVED - get DF types'))
  ])

  await page.locator('#df_product_type_select').click()
  await argosScreenshot(page, 'Dachfenster - Genormte DF Typ', { fullPage: false })

  await page.locator('#bedienstab_comfort_select').click()
  await argosScreenshot(page, 'Dachfenster - Genormte DF Bedienstäbe', { fullPage: false })

  await page.locator('#unterer_stoff_gruppe_select').click()
  await argosScreenshot(page, 'Dachfenster - Genormte DF Untere Stoffe', { fullPage: false })

  // ------------------------- BEDIENGRIFFE, SCHIENENFARBEN UND BEDIENSTAB-------------------------\\

  // select DF20 to make Bediengriff visible
  await page.locator('li').filter({ hasText: 'DF 20 - Plissee kann nach' }).click()

  // wait for DF20  prices before next screenshot since playwright is too fast at this point
  await expect(page.locator('.price_amount > .product_prices > .price .original_price')).toHaveText(/112,00/) // 107 + 5
  await expect(page.locator('.price_amount > .product_prices > .price .final_price')).toHaveText(/69,20/) // R 5,7 112,00 -5,00 -40% +5,00= 69,20

  // capture tooltip Bediengriff Standard
  const tooltipIconLocatorStandard = page.locator('li').filter({ hasText: 'Standard' }).locator('div.tooltip_icon')
  await tooltipIconLocatorStandard.hover()
  console.log('Hovered over the tooltip icon of Bediengriff Standard.')

  const tooltipLocatorStandard = page.locator('li').filter({ hasText: 'Standard' }).locator('div.option_item_tooltip')
  await tooltipLocatorStandard.waitFor({ state: 'visible' })
  console.log('Tooltip of Bediengriff Standard is visible.')

  await argosScreenshot(page, 'Dachfenster - Tooltip Bediengriff Standard', { // do not use viewport options - tooltip disappears
    disableHover: false
  })

  await page.waitForTimeout(1000) // avoid crossing tooltips & allow time to load correct pricelists

  // capture tooltip Bediengriff Design
  const tooltipIconLocatorDesign = page.locator('li').filter({ hasText: 'Design' }).locator('div.tooltip_icon')
  await tooltipIconLocatorDesign.hover()
  console.log('Hovered over the tooltip icon of Bediengriff Design.')

  const tooltipLocatorDesign = page.locator('li').filter({ hasText: 'Design' }).locator('div.option_item_tooltip')
  await tooltipLocatorDesign.waitFor({ state: 'visible' })
  console.log('Tooltip of Bediengriff Design is visible.')

  await argosScreenshot(page, 'Dachfenster - Tooltip Bediengriff Design', { // do not use viewport options - tooltip disappears
    disableHover: false
  })

  try {
    // Log the start of the operation
    console.log('Starting to hover over the tooltip icon for DF 30 Comfort Schienenfarbe Weiss.')

    // select DF20 C to make Schienenfarbe weiß and grau visible
    await page.locator('li').filter({ hasText: 'DF 20 Comfort - Plissee kann nach' }).click()

    // wait for DF20 C prices before next snapshot since cypress is too fast at this point
    await expect(page.locator('.price_amount > .product_prices > .price .original_price')).toHaveText(/135,00/)
    await expect(page.locator('.price_amount > .product_prices > .price .final_price')).toHaveText(/83,00/)

    const tooltipIconLocatorWeiss = page.locator('li').filter({ hasText: 'weiß' }).locator('div.tooltip_icon')
    await tooltipIconLocatorWeiss.hover()
    console.log('Hovered over the tooltip icon.')

    const tooltipLocatorWeiss = page.locator('li').filter({ hasText: 'weiß' }).locator('div.option_item_tooltip')
    await tooltipLocatorWeiss.waitFor({ state: 'visible' })
    console.log('Tooltip is visible.')

    await argosScreenshot(page, 'Dachfenster - Tooltip Schienenfarbe weiß', { // do not use viewport options - tooltip disappears
      disableHover: false
    })
    console.log('Screenshot captured successfully.')
    await page.mouse.move(0, 0) // Move mouse away to hide the tooltip
  } catch (error) {
    // Log the error to the console
    console.error('An error occurred:', error.message)
  }

  // await page.waitForTimeout(1000); // avoid crossing tooltips & allow time to load correct pricelists

  try {
    // Log the start of the operation
    console.log('Starting to hover over the tooltip icon for DF 30 Comfort Schienenfarbe Grau.')

    // select DF20 C to make Schienenfarbe weiß and grau visible
    await page.locator('li').filter({ hasText: 'DF 20 Comfort - Plissee kann nach' }).click()

    // wait for DF20 C prices before next snapshot since cypress is too fast at this point
    await expect(page.locator('.price_amount > .product_prices > .price .original_price')).toHaveText(/135,00/)
    await expect(page.locator('.price_amount > .product_prices > .price .final_price')).toHaveText(/83,00/)

    const tooltipIconLocatorGrau = page.locator('li').filter({ hasText: 'grau' }).locator('div.tooltip_icon')
    await tooltipIconLocatorGrau.hover()
    console.log('Hovered over the tooltip icon.')

    const tooltipLocatorGrau = page.locator('li').filter({ hasText: 'grau' }).locator('div.option_item_tooltip')
    await tooltipLocatorGrau.waitFor({ state: 'visible' })
    console.log('Tooltip is visible.')

    await argosScreenshot(page, 'Dachfenster - Tooltip Schienenfarbe grau', { // do not use viewport options - tooltip disappears
      disableHover: false
    })
    console.log('Screenshot captured successfully.')
    await page.mouse.move(0, 0) // Move mouse away to hide the tooltip
  } catch (error) {
    // Log the error to the console
    console.error('An error occurred:', error.message)
  }

  // capture Bedienstab
  // open Bedienstäbe & take argos screenshot
  await page.locator('#bedienstab_comfort_select').click()
  await argosScreenshot(page, 'Dachfenster - Dropdown Bedienstab', { fullPage: false }) // do not use viewport options - dropdown closes
  await page.locator('#bedienstab_comfort_select').click() // close dropdown menu

  // hover on Bedienstab info
  await page.locator('div.bedienstab_comfort_container div.tooltip_icon').hover()

  // take screenshot
  await argosScreenshot(page, 'Dachfenster - Tooltip Bedienstäbe', { // do not use viewport options - tooltip disappears
    disableHover: false
  })
  await page.mouse.move(0, 0) // Move mouse away to hide the tooltip

  // ---------------------------------- UNGENORMTE DF ----------------------------------------------\\
  // -------------------------------------FALZARTEN--------------------------------------------------\\

  // switch to ungenormt and take screenshot
  await page.locator("label[for='df_nonstandard']").click()
  await argosScreenshot(page, 'Dachfenster - Ungenormte DF gerader Falz', {
    viewports: [
      'macbook-16', // Use device preset for macbook-16 --> 1536 x 960
      'iphone-6' // Use device preset for iphone-6 --> 375x667
    ]
  })

  // select schräger Falz
  await page.locator("label[for='schraeger_falz']").click()
  await argosScreenshot(page, 'Dachfenster - Ungenormte DF schräger Falz', {
    viewports: [
      'macbook-16', // Use device preset for macbook-16 --> 1536 x 960
      'iphone-6' // Use device preset for iphone-6 --> 375x667
    ]
  })

  // select schräger Falz mit Schattenfuge
  await page.locator("label[for='falz_mit_schattenfuge']").click()
  await argosScreenshot(page, 'Dachfenster - Ungenormte DF schräger Falz mit Schattenfuge', {
    viewports: [
      'macbook-16', // Use device preset for macbook-16 --> 1536 x 960
      'iphone-6' // Use device preset for iphone-6 --> 375x667
    ]
  })

  // select schräger Falz mit Aufsatz vor Glas
  await page.locator("label[for='falz_mit_aufsatz_vor_glas']").click()
  await argosScreenshot(page, 'Dachfenster - Ungenormte DF schräger Falz mit Aufsatz vor Glas', {
    viewports: [
      'macbook-16', // Use device preset for macbook-16 --> 1536 x 960
      'iphone-6' // Use device preset for iphone-6 --> 375x667
    ]
  })
})
