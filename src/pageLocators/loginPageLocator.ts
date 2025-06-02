import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  public readonly username: Locator;
  public readonly password: Locator;
  public readonly loginButton: Locator;
  public readonly errorMessage: Locator;
  public readonly pageAccount: Locator;
  public readonly pagePassword: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('[name=username]');
    this.password = page.locator('[name=password]');
    this.loginButton = page.locator('button[type=submit]');
    this.errorMessage = page.locator('.oxd-alert-content-text');
    this.pageAccount = page.locator('div.orangehrm-login-form >div p:nth-child(1)');
    this.pagePassword = page.locator('div.orangehrm-login-form > div p:nth-child(2)');
  }
}