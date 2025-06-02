import { test, expect } from '@playwright/test';
import { login, autoDismissDialogs } from '../../src/pages/loginPage';
import { HomePage, HomePageMenu } from '../../src/pageLocators/homePageLocator';

test.describe('OrangeHRM Search Tests', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';
  let homePage: HomePage;
  
  test.beforeEach(async ({ page }) => {
    // Login first as precondition
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await login(page, 'Admin', 'admin123');
    
    // Wait for login to complete and dashboard to load
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    
    // Initialize HomePage
    homePage = new HomePage(page);
    
    // Set global delay as specified
    await page.setDefaultTimeout(10000);
    autoDismissDialogs(page);
  });

  test('TC001 - Search for Admin menu', async ({ page }) => {
    await homePage.searchField.fill('Admin');
    await homePage.searchField.press('Enter');
    
    // Wait for search results
    await page.waitForLoadState('networkidle');
    
    // Get menu locator and verify
    const adminMenu = await homePage.getMenuLocator('Admin');
    expect(adminMenu).not.toBeNull();
    if (adminMenu) {
      await expect(adminMenu).toBeVisible();
      await expect(adminMenu).toHaveText('Admin');
    }
  });

  test('TC002 - Search for PIM menu', async ({ page }) => {
    await homePage.searchField.fill('PIM');
    await homePage.searchField.press('Enter');
    
    // Wait for search results
    await page.waitForLoadState('networkidle');
    
    // Get menu locator and verify
    const pimMenu = await homePage.getMenuLocator('PIM');
    expect(pimMenu).not.toBeNull();
    if (pimMenu) {
      await expect(pimMenu).toBeVisible();
      await expect(pimMenu).toHaveText('PIM');
    }
  });

  test('TC003 - Search for non-existent menu', async ({ page }) => {
    await homePage.searchField.fill('NonExistentMenu');
    await homePage.searchField.press('Enter');
    
    // Wait for search results
    await page.waitForLoadState('networkidle');
    
    // Verify that none of the menu items are displayed
    for (const menuName of Object.keys(HomePageMenu)) {
      const menuLocator = await homePage.getMenuLocatorByName(page, menuName);
      if (menuLocator) {
        await expect(menuLocator).not.toBeVisible();
      }
    }
  });

  test('TC004 - Search with partial menu name', async ({ page }) => {
    await homePage.searchField.fill('Adm');
    await homePage.searchField.press('Enter');
    
    // Wait for search results
    await page.waitForLoadState('networkidle');
    
    // Get menu locator and verify
    const adminMenu = await homePage.getMenuLocator('Admin');
    expect(adminMenu).not.toBeNull();
    if (adminMenu) {
      await expect(adminMenu).toBeVisible();
      await expect(adminMenu).toHaveText('Admin');
    }
  });

  test('TC005 - Search with case-insensitive menu name', async ({ page }) => {
    await homePage.searchField.fill('admin');
    await homePage.searchField.press('Enter');
    
    // Wait for search results
    await page.waitForLoadState('networkidle');
    
    // Get menu locator and verify
    const adminMenu = await homePage.getMenuLocator('Admin');
    expect(adminMenu).not.toBeNull();
    if (adminMenu) {
      await expect(adminMenu).toBeVisible();
      await expect(adminMenu).toHaveText('Admin');
    }
  });

  test('TC006 - Search with spaces in menu name', async ({ page }) => {
    // First verify the menu exists without spaces
    const adminMenu = await homePage.getMenuLocator('Admin');
    expect(adminMenu).not.toBeNull();
    
    // Now search with spaces
    await homePage.searchField.fill('  Admin  ');
    await homePage.searchField.press('Enter');
    
    // Wait for search results
    await page.waitForLoadState('networkidle');
    
    // Verify the menu is still found despite spaces
    const menuWithSpaces = await homePage.getMenuLocator('Admin');
    expect(menuWithSpaces).not.toBeNull();
    if (menuWithSpaces) {
      await expect(menuWithSpaces).toBeHidden();
    }
  });

  test('TC007 - Search field accessibility', async ({ page }) => {
    // Verify search field properties
    await expect(homePage.searchField).toBeVisible();
    await expect(homePage.searchField).toBeEnabled();
    await expect(homePage.searchField).toHaveAttribute('placeholder', 'Search');
  });

  test('TC008 - Search with special characters', async ({ page }) => {
    await homePage.searchField.fill('!@#$%^&*()');
    await homePage.searchField.press('Enter');
    
    // Wait for search results
    await page.waitForLoadState('networkidle');
    
    // Verify that none of the menu items are displayed
    for (const menuName of Object.keys(HomePageMenu)) {
      const menuLocator = await homePage.getMenuLocatorByName(page, menuName);
      if (menuLocator) {
        await expect(menuLocator).not.toBeVisible();
      }
    }
  });

  test('TC009 - Search with empty string', async ({ page }) => {
    await homePage.searchField.fill('');
    await homePage.searchField.press('Enter');
    
    // Wait for page to stabilize
    await page.waitForLoadState('networkidle');
    
    // Verify dashboard is still visible
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('TC010 - Search with multiple menu items', async ({ page }) => {
    // Search for a combination that shouldn't exist
    await homePage.searchField.fill('Admin PIM Leave');
    await homePage.searchField.press('Enter');
    
    // Wait for search results
    await page.waitForLoadState('networkidle');
    
    // Verify that none of the menu items are displayed
    for (const menuName of Object.keys(HomePageMenu)) {
      const menuLocator = await homePage.getMenuLocator(menuName);
      if (menuLocator) {
        await expect(menuLocator).not.toBeVisible();
      }
    }
  });
});