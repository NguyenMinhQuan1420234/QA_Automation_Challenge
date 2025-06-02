import {expect, type Locator, type Page} from '@playwright/test';

export class HomePage {
  private readonly page: Page;
  public readonly searchField: Locator;
  public readonly searchButton: Locator;
  public readonly searchResults: Locator;
  public readonly searchList: Locator;
  public readonly menuLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchField = page.locator('input[placeholder="Search"]');
    this.searchButton = page.locator('button[type="submit"]');
    this.searchResults = page.locator('.search-results');
    this.searchList = page.locator('div.oxd-sidepanel-body li:nth-child(n) span');
  }
  async getMenuLocator(menuName: string): Promise<Locator | null> {
    return this.page.locator(`//a/span[text()='${menuName}']`);
  }

  async searchFor(value: string) {
    await this.searchField.fill(value);
    await this.searchButton.click();
  }

  // Function to get menu locator by menu name
  async getMenuLocatorByName(page: Page, menuName: string): Promise<Locator | null> {
  const menuIndex = HomePageMenu[menuName];
  if (!menuIndex) return null;
  // The nth-child is 1-based, so use menuIndex directly
  return page.locator(`div.oxd-sidepanel-body li:nth-child(${menuIndex}) span`);
  }

}

export const HomePageMenu: Record<string, number>= {
  'Admin': 1,
  'PIM': 2,
  'Leave': 3,
  'Time': 4,
  'Recruitment': 5,
  'My Info': 6,
  'Performance': 7,
  'Dashboard': 8,
  'Directory': 9,
  'Maintenance': 10,
  'Claim': 11,
  'Buzz': 12
};
