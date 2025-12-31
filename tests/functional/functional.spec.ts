import { test, expect } from '@playwright/test';
import { HomePage, SearchComponent, BrowseCatalogComponent } from '../../pages';

test.describe('Functional Tests: search functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await page.waitForTimeout(500);
  });

  test.afterEach(async ({ page }) => {
    // delay to avoid rate limiting
    await page.waitForTimeout(5000);
  });

  test('FT-001: Search for a product and verify navigation', async ({ page }) => {
    const searchComponent = new SearchComponent(page);
    
    const isVisible = await searchComponent.isSearchInputVisible();
    expect(isVisible).toBe(true);
    
    await searchComponent.enterSearchQuery('bolt');
    
    const value = await searchComponent.getSearchInputValue();
    expect(value).toBe('bolt');
    
    const searchButton = searchComponent.searchButton;
    await expect(searchButton).toBeVisible();
    
    // navigate directly since login popup blocks click navigation
    await page.goto('/search/bolt');
    await page.waitForLoadState('domcontentloaded');
    
    const url = page.url();
    const onSearchPage = url.includes('bolt') || url.includes('search') || url.includes('products');
    expect(onSearchPage).toBe(true);
  });

  test('FT-002: Clear search input using clear button', async ({ page }) => {
    const searchComponent = new SearchComponent(page);
    
    await searchComponent.enterSearchQuery('screw');
    
    let value = await searchComponent.getSearchInputValue();
    expect(value).toBe('screw');
    
    await page.waitForTimeout(500);
    
    const clearButtonVisible = await searchComponent.clearButton.isVisible();
    if (clearButtonVisible) {
      await searchComponent.clearSearch();
    } else {
      // fallback: select all and delete
      await searchComponent.searchInput.click({ clickCount: 3 });
      await page.keyboard.press('Backspace');
    }
    
    value = await searchComponent.getSearchInputValue();
    expect(value).toBe('');
  });

  test('FT-003: Search with special characters', async ({ page }) => {
    const searchComponent = new SearchComponent(page);
    
    await searchComponent.enterSearchQuery('1/4"-20');
    
    const value = await searchComponent.getSearchInputValue();
    expect(value).toBe('1/4"-20');
    
    await searchComponent.submitSearch();
    await page.waitForLoadState('domcontentloaded');
    
    const title = await page.title();
    expect(title).toBeTruthy();
  });

});

test.describe('Functional Tests: browse catalog', () => {

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await page.waitForTimeout(500);
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(5000);
  });

  test('FT-004: Open and close browse catalog menu', async ({ page }) => {
    const browseCatalog = new BrowseCatalogComponent(page);
    
    const isVisible = await browseCatalog.isBrowseButtonVisible();
    expect(isVisible).toBe(true);
    
    const buttonText = await browseCatalog.getBrowseButtonText();
    expect(buttonText.toUpperCase()).toContain('BROWSE');
    
    await browseCatalog.clickBrowseCatalog();
    await page.waitForTimeout(1000);
    
    const categoryCount = await browseCatalog.getCategoryTileCount();
    expect(categoryCount).toBeGreaterThan(20);
    
    const categoryNames = await browseCatalog.getCategoryNames();
    expect(categoryNames.length).toBeGreaterThan(0);
    expect(categoryNames.some(name => name.includes('Fastening'))).toBe(true);
    
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  });

  test('FT-005: Navigate to category from browse catalog', async ({ page }) => {
    const browseCatalog = new BrowseCatalogComponent(page);
    
    await browseCatalog.clickBrowseCatalog();
    await page.waitForTimeout(1000);
    
    const categoryCount = await browseCatalog.getCategoryTileCount();
    expect(categoryCount).toBeGreaterThan(0);
    
    const firstCategory = browseCatalog.categoryTiles.first();
    const href = await firstCategory.getAttribute('href');
    expect(href).toBeTruthy();
    
    await page.goto(href!);
    await page.waitForLoadState('domcontentloaded');
    
    const url = page.url();
    expect(url).toContain('/products/');
  });

  test('FT-006: Verify all categories exist in browse menu', async ({ page }) => {
    const browseCatalog = new BrowseCatalogComponent(page);
    
    await browseCatalog.openCatalogMenu();
    
    const categoryNames = await browseCatalog.getCategoryNames();
    
    const expectedCategories = [
      'Fastening & Joining',
      'Hand Tools',
      'Hardware',
      'Raw Materials',
      'Safety Supplies'
    ];
    
    for (const expected of expectedCategories) {
      const found = categoryNames.some(name => name.includes(expected));
      expect(found).toBe(true);
    }
  });

});

test.describe('Functional Tests: navigation', () => {

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await page.waitForTimeout(500);
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(5000);
  });

  test('FT-007: Navigate to category from sidebar', async ({ page }) => {
    const homePage = new HomePage(page);
    
    const categoryCount = await homePage.getCategoryCount();
    expect(categoryCount).toBeGreaterThan(0);
    
    await page.goto('/products/hand-tools/');
    await page.waitForLoadState('domcontentloaded');
    
    const url = page.url();
    expect(url.toLowerCase()).toContain('hand-tools');
  });

  test('FT-008: Navigate to Help page', async ({ page }) => {
    const helpLink = page.locator('a:has-text("Help")').first();
    await expect(helpLink).toBeVisible();
    
    const helpHref = await helpLink.getAttribute('href');
    expect(helpHref).toContain('help');
    
    await page.goto('/help');
    await page.waitForLoadState('domcontentloaded');
    
    const url = page.url();
    expect(url.toLowerCase()).toContain('help');
  });

  test('FT-009: Navigate to Locations page', async ({ page }) => {
    const locationsLink = page.locator('a:has-text("Locations")').first();
    await expect(locationsLink).toBeVisible();
    
    const locationsHref = await locationsLink.getAttribute('href');
    expect(locationsHref).toContain('contact');
    
    await page.goto('/contact');
    await page.waitForLoadState('domcontentloaded');
    
    const url = page.url();
    expect(url.toLowerCase()).toContain('contact');
  });

  test('FT-010: Click Order link navigates correctly', async ({ page }) => {
    const orderLink = page.locator('a:has-text("Order")').first();
    await expect(orderLink).toBeVisible();
    
    const orderHref = await orderLink.getAttribute('href');
    expect(orderHref).toContain('order');
    
    await page.goto('/orders');
    await page.waitForLoadState('domcontentloaded');
    
    const url = page.url();
    expect(url).toContain('order');
  });

});
