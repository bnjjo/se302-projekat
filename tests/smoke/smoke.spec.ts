import { test, expect } from '@playwright/test';
import { HomePage, SearchComponent, HeaderComponent } from '../../pages';

test.describe('Smoke Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await page.waitForTimeout(500);
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(5000);
  });

  test('ST-001: Homepage loads successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    
    const title = await homePage.getTitle();
    expect(title).toContain('McMaster-Carr');
    
    const isVisible = await homePage.isMainContentVisible();
    expect(isVisible).toBe(true);
    
    const url = await homePage.getCurrentUrl();
    expect(url).toContain('mcmaster.com');
  });

  test('ST-002: Search bar is visible and accessible', async ({ page }) => {
    const searchComponent = new SearchComponent(page);
    
    const isVisible = await searchComponent.isSearchInputVisible();
    expect(isVisible).toBe(true);
    
    const placeholder = await searchComponent.getPlaceholderText();
    expect(placeholder).toBe('Search');
    
    await searchComponent.enterSearchQuery('test');
    const value = await searchComponent.getSearchInputValue();
    expect(value).toBe('test');
  });

  test('ST-003: Header navigation elements are present', async ({ page }) => {
    const headerComponent = new HeaderComponent(page);
    
    const isHeaderVisible = await headerComponent.isHeaderVisible();
    expect(isHeaderVisible).toBe(true);
    
    const isLoginVisible = await headerComponent.isLoginLinkVisible();
    expect(isLoginVisible).toBe(true);
    
    const isOrderVisible = await headerComponent.isOrderLinkVisible();
    expect(isOrderVisible).toBe(true);
    
    const isOrderHistoryVisible = await headerComponent.isOrderHistoryLinkVisible();
    expect(isOrderHistoryVisible).toBe(true);
  });

  test('ST-004: Logo is visible and clickable', async ({ page }) => {
    const homePage = new HomePage(page);
    
    const isLogoVisible = await homePage.isLogoVisible();
    expect(isLogoVisible).toBe(true);
    
    await homePage.navigateToHelp();
    await page.waitForLoadState('domcontentloaded');
    
    await homePage.clickLogo();
    await page.waitForLoadState('domcontentloaded');
    
    const url = await homePage.getCurrentUrl();
    expect(url).toMatch(/mcmaster\.com\/?$/);
  });

  test('ST-005: Category navigation is displayed', async ({ page }) => {
    const homePage = new HomePage(page);
    
    const categoryCount = await homePage.getCategoryCount();
    expect(categoryCount).toBeGreaterThan(0);
    
    const categoryNames = await homePage.getCategoryNames();
    expect(categoryNames.length).toBeGreaterThan(10);
    
    const hasExpectedCategories = categoryNames.some(name => 
      name.includes('Fastening') || 
      name.includes('Hand Tools') || 
      name.includes('Hardware')
    );
    expect(hasExpectedCategories).toBe(true);
  });

});
