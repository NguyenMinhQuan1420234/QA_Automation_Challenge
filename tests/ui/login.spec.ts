import { test, expect } from '@playwright/test';
import { login, autoDismissDialogs } from '../../src/pages/loginPage';
import { LoginPage } from '../../src/pageLocators/loginPageLocator';

test.describe('OrangeHRM Login Tests', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
    // Set global delay as specified
    await page.setDefaultTimeout(10000);
    autoDismissDialogs(page);
  });

  test('TC001 - Successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await login(page, 'Admin', 'admin123');
    
    // Assertions
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'profile picture' })).toBeVisible();
  });

  test('TC002 - Login with invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await login(page, 'InvalidUser', 'admin123');
    
    // Assertions
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(baseUrl);
  });

  test('TC003 - Login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await login(page, 'Admin', 'wrongpassword');
    
    // Assertions
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(baseUrl);
  });

  test('TC004 - Login with empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await login(page, '', '');
    
    // Assertions
    await expect(page.getByText('Required')).toHaveCount(2);
    await expect(page).toHaveURL(baseUrl);
  });

  test('TC005 - Login form elements visibility', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Assertions
    await expect(loginPage.username).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(page.getByRole('img', { name: 'company-branding' })).toBeVisible();
  });

  test('TC006 - Password field masking', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.password.fill('admin123');
    
    // Assertions
    await expect(loginPage.password).toHaveAttribute('type', 'password');
    const value = await loginPage.password.inputValue();
    expect(value).toBe('admin123');
  });

  test('TC007 - Remember me functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.username.fill('Admin');
    await loginPage.password.fill('admin123');
    await page.getByRole('checkbox').check();
    await loginPage.loginButton.click();
    
    // Assertions
    await expect(page).toHaveURL(/.*dashboard/);
    await page.goto(baseUrl);
    await expect(loginPage.username).toHaveValue('Admin');
  });

  test('TC008 - Login with SQL injection attempt', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await login(page, "' OR '1'='1", "' OR '1'='1");
    
    // Assertions
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(baseUrl);
  });

  test('TC009 - Login with XSS attempt', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await login(page, '<script>alert("XSS")</script>', 'admin123');
    
    // Assertions
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(baseUrl);
  });

  test('TC010 - Login with special characters in username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await login(page, 'Admin@#$%', 'admin123');
    
    // Assertions
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(baseUrl);
  });

  test('TC011 - Login with maximum length credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const longString = 'a'.repeat(100);
    await login(page, longString, longString);
    
    // Assertions
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(baseUrl);
  });

  test('TC012 - Login with minimum length credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await login(page, 'A', 'a');
    
    // Assertions
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(baseUrl);
  });

  test('TC013 - Login with spaces in credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await login(page, ' Admin ', ' admin123 ');
    
    // Assertions
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(baseUrl);
  });

  test('TC014 - Login with copy-paste functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const copyUsername = await loginPage.pageAccount.textContent();
    const username = copyUsername?.split('Username : ')[1]?.trim() ?? '';
    const copyPassword = await loginPage.pagePassword.textContent();
    const password = copyPassword?.split('Password : ')[1]?.trim() ?? '';

    // Use clipboard API to copy username and password
    await page.evaluate(async (text) => {
      await navigator.clipboard.writeText(text);
    }, username);
    await loginPage.username.click();
    await page.keyboard.press('Control+V');

    await page.evaluate(async (text) => {
      await navigator.clipboard.writeText(text);
    }, password);
    await loginPage.password.click();
    await page.keyboard.press('Control+V');

    // Assertions
    await expect(loginPage.username).toHaveValue('Admin');
    await expect(loginPage.password).toHaveValue('admin123');
  });

  test('TC015 - Login with keyboard navigation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Navigate using Tab key
    await page.keyboard.press('Tab');
    await loginPage.username.fill('Admin');
    await page.keyboard.press('Tab');
    await loginPage.password.fill('admin123');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    // Assertions
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });
});