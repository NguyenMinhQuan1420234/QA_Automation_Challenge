import { expect, Locator, Page } from '@playwright/test'

export interface testInfo{
    tag: string
    caseId: string
    testCaseName: string;
}

/**
 * search following value and placeholder
 * @param placeHolder 
 * @param value 
 * @param page 
 */
export async function search(placeHolder: string, value:string, page:Page) {
    await page.getByPlaceholder(placeHolder).click()
    await page.getByPlaceholder(placeHolder).fill(value)
    await page.waitForLoadState('domcontentloaded');
}

/**
 * fill text to input/text area
 * @param locator 
 * @param value 
 */
export async function fillText(locator: Locator , value:string) {
    await locator.click()
    await locator.fill(value)
}

/**
 * Click on button by name
 * @param param : page
 * @param {string} buttonName 
 */
export async function clickButtonByName(page: Page, buttonName: string) {
    await page.getByRole('button', { name: buttonName }).click();
    await page.waitForLoadState('domcontentloaded')
}