import test, { Page, Dialog } from "@playwright/test"
import ENV from "../utils/env"
import { clickButtonByName, fillText, testInfo } from "../base/baseFunction"


export interface NegativeLoginScenario extends testInfo {
    username: string;
    password: string;
    expectedError: string;
}
/**
 * 
 * @param param : page
 * @param userName 
 * @param password 
 */
export async function login(page: Page, userName: string, password:string) {
    await test.step('Enter user name', async() => {
        await fillText(page.getByRole('textbox', { name: 'Username' }), userName)
    })
    await test.step('Enter password', async() => {
        await fillText(page.getByRole('textbox', { name: 'Password' }), password)
    })
    await test.step('Click on Login button', async() => {
        await clickButtonByName(page, 'Login')
    })
}

/**
 * Automatically dismisses dialog on the given page.
 */
export function autoDismissDialogs(page: Page) {
    page.on('dialog', async (dialog: Dialog) => {
      console.log(`Dismissing dialog: ${dialog.message()}`);
      await dialog.dismiss();
    });
  }