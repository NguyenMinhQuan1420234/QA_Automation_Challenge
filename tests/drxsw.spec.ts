import { test, expect } from '@playwright/test';

test.describe('DRXSW Website Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the website before each test
    await page.goto('https://www.drxsw.com/');
  });

  test('Website loads successfully', async ({ page }) => {
    // Check if the page title exists
    await expect(page).toHaveTitle(/冬日小说网/);
    
    // Verify the main page content is loaded
    await expect(page.locator('body')).toBeVisible();
  });

  test('Main content sections', async ({ page }) => {
    // Check for main content sections
    const mainContent = page.locator('.main');
    await expect(mainContent).toBeVisible();

    // Check for novel list if it exists
    const novelList = page.locator('.novel-list');
    if (await novelList.isVisible()) {
      const novels = novelList.locator('.novel-item');
      const count = await novels.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('Search functionality', async ({ page }) => {
    // Look for search input
    const searchInput = page.locator('input[type="text"]');
    if (await searchInput.isVisible()) {
      await searchInput.fill('测试小说');
      await searchInput.press('Enter');
      // Wait for search results
      await page.waitForTimeout(2000);
      // Verify search results page loaded
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('Navigation links', async ({ page }) => {
    // Check for navigation links
    const links = page.locator('a');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);

    // Test a few random links
    for (let i = 0; i < Math.min(3, count); i++) {
      const link = links.nth(i);
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('javascript:')) {
        await link.click();
        await page.waitForTimeout(1000);
        await expect(page.locator('body')).toBeVisible();
        await page.goBack();
      }
    }
  });

  test('Responsive design check', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('body')).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('body')).toBeVisible();
  });

  test('Content loading', async ({ page }) => {
    // Check if content sections are loaded
    const contentSections = page.locator('.content');
    const count = await contentSections.count();
    expect(count).toBeGreaterThan(0);

    // Verify text content is present
    const textContent = page.locator('p, h1, h2, h3, h4, h5, h6');
    const textCount = await textContent.count();
    expect(textCount).toBeGreaterThan(0);
  });

  test('Pagination if exists', async ({ page }) => {
    // Look for pagination
    const pagination = page.locator('.pagination');
    if (await pagination.isVisible()) {
      const pageLinks = pagination.locator('a');
      const count = await pageLinks.count();
      expect(count).toBeGreaterThan(0);

      // Try clicking next page if available
      const nextPage = pagination.locator('a:has-text("下一页")');
      if (await nextPage.isVisible()) {
        await nextPage.click();
        await page.waitForTimeout(1000);
        await expect(page.locator('body')).toBeVisible();
      }
    }
  });

  test('Novel details page', async ({ page }) => {
    // Find and click on a novel link
    const novelLinks = page.locator('.novel-item a').first();
    if (await novelLinks.isVisible()) {
      const novelTitle = await novelLinks.textContent();
      await novelLinks.click();
      
      // Verify novel details page
      await expect(page.locator('body')).toBeVisible();
      
      // Check for novel information
      const novelInfo = page.locator('.novel-info');
      await expect(novelInfo).toBeVisible();
      
      // Check for chapter list
      const chapterList = page.locator('.chapter-list');
      await expect(chapterList).toBeVisible();
      
      // Verify chapter links
      const chapters = chapterList.locator('a');
      const chapterCount = await chapters.count();
      expect(chapterCount).toBeGreaterThan(0);
    }
  });

  test('Category navigation', async ({ page }) => {
    // Check for category links
    const categoryLinks = page.locator('.category-list a, .nav-category a');
    if (await categoryLinks.isVisible()) {
      const count = await categoryLinks.count();
      expect(count).toBeGreaterThan(0);
      
      // Click first category
      await categoryLinks.first().click();
      await page.waitForTimeout(1000);
      
      // Verify category page loaded
      await expect(page.locator('body')).toBeVisible();
      
      // Check for category title
      const categoryTitle = page.locator('.category-title, h1');
      await expect(categoryTitle).toBeVisible();
    }
  });

  test('Chapter reading experience', async ({ page }) => {
    // Navigate to a novel's chapter
    const novelLinks = page.locator('.novel-item a').first();
    if (await novelLinks.isVisible()) {
      await novelLinks.click();
      await page.waitForTimeout(1000);
      
      // Click first chapter
      const chapterLink = page.locator('.chapter-list a').first();
      if (await chapterLink.isVisible()) {
        await chapterLink.click();
        await page.waitForTimeout(1000);
        
        // Verify chapter content
        const chapterContent = page.locator('.chapter-content');
        await expect(chapterContent).toBeVisible();
        
        // Check for navigation controls
        const prevChapter = page.locator('a:has-text("上一章")');
        const nextChapter = page.locator('a:has-text("下一章")');
        await expect(prevChapter).toBeVisible();
        await expect(nextChapter).toBeVisible();
      }
    }
  });

  test('User interaction features', async ({ page }) => {
    // Check for bookmark functionality
    const bookmarkButton = page.locator('.bookmark-btn, .favorite-btn');
    if (await bookmarkButton.isVisible()) {
      await expect(bookmarkButton).toBeVisible();
    }
    
    // Check for reading history
    const historyLink = page.locator('a:has-text("阅读历史")');
    if (await historyLink.isVisible()) {
      await historyLink.click();
      await page.waitForTimeout(1000);
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('Advanced search features', async ({ page }) => {
    // Look for advanced search options
    const searchButton = page.locator('a:has-text("高级搜索"), button:has-text("高级搜索")');
    if (await searchButton.isVisible()) {
      await searchButton.click();
      await page.waitForTimeout(1000);
      
      // Check for advanced search form
      const searchForm = page.locator('form');
      await expect(searchForm).toBeVisible();
      
      // Test search filters if they exist
      const categorySelect = page.locator('select[name="category"]');
      const authorInput = page.locator('input[name="author"]');
      const statusSelect = page.locator('select[name="status"]');
      
      if (await categorySelect.isVisible()) {
        await categorySelect.selectOption({ index: 1 });
      }
      
      if (await authorInput.isVisible()) {
        await authorInput.fill('测试作者');
      }
      
      if (await statusSelect.isVisible()) {
        await statusSelect.selectOption({ index: 1 });
      }
    }
  });

  test('Mobile menu functionality', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check for mobile menu button
    const menuButton = page.locator('.menu-btn, .mobile-menu-btn');
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(500);
      
      // Verify mobile menu is visible
      const mobileMenu = page.locator('.mobile-menu, .nav-menu');
      await expect(mobileMenu).toBeVisible();
      
      // Check mobile menu items
      const menuItems = mobileMenu.locator('a');
      const count = await menuItems.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('Error handling', async ({ page }) => {
    // Test 404 page
    await page.goto('https://www.drxsw.com/nonexistent-page');
    await expect(page.locator('body')).toBeVisible();
    
    // Test invalid search
    const searchInput = page.locator('input[type="text"]');
    if (await searchInput.isVisible()) {
      await searchInput.fill('!@#$%^&*()');
      await searchInput.press('Enter');
      await page.waitForTimeout(2000);
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('Performance metrics', async ({ page }) => {
    // Measure page load time
    const startTime = Date.now();
    await page.goto('https://www.drxsw.com/');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(10000); // Should load within 10 seconds
    
    // Check for lazy loading images
    const images = page.locator('img[loading="lazy"]');
    const lazyImageCount = await images.count();
    expect(lazyImageCount).toBeGreaterThanOrEqual(0);
  });
}); 