import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly logo: Locator;
  readonly mainContent: Locator;
  readonly categoryLinks: Locator;
  readonly homeLink: Locator;
  readonly locationsLink: Locator;
  readonly returnsLink: Locator;
  readonly careersLink: Locator;
  readonly helpLink: Locator;
  readonly settingsLink: Locator;
  readonly termsLink: Locator;
  readonly privacyLink: Locator;

  constructor(page: Page) {
    super(page);
    this.logo = page.locator('#MMLogo');
    this.mainContent = page.locator('main, #MainContent, .main-content, body');
    this.categoryLinks = page.locator('.product-category, .category-list a, [class*="category"] a');
    
    // footer links
    this.homeLink = page.locator('footer a[href="/"], a:has-text("Home")').first();
    this.locationsLink = page.locator('a[href="/contact"], a:has-text("Locations")').first();
    this.returnsLink = page.locator('a[href="/returns"], a:has-text("Returns")').first();
    this.careersLink = page.locator('a[href="/careers"], a:has-text("Careers")').first();
    this.helpLink = page.locator('a[href="/help"], a:has-text("Help")').first();
    this.settingsLink = page.locator('a[href="/settings"], a:has-text("Settings")').first();
    this.termsLink = page.locator('a[href="/termsandconditions"]').first();
    this.privacyLink = page.locator('a[href="/privacypolicy"]').first();
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isLogoVisible(): Promise<boolean> {
    return await this.logo.isVisible();
  }

  async clickLogo(): Promise<void> {
    await this.logo.click();
  }

  async isMainContentVisible(): Promise<boolean> {
    return await this.mainContent.first().isVisible();
  }

  async getCategoryCount(): Promise<number> {
    return await this.categoryLinks.count();
  }

  async getCategoryNames(): Promise<string[]> {
    const names: string[] = [];
    const count = await this.categoryLinks.count();
    for (let i = 0; i < count; i++) {
      const text = await this.categoryLinks.nth(i).textContent();
      if (text) names.push(text.trim());
    }
    return names;
  }

  async clickCategoryByName(name: string): Promise<void> {
    await this.categoryLinks.filter({ hasText: name }).first().click();
  }

  async navigateToHelp(): Promise<void> {
    await this.page.goto('/help');
  }

  async navigateToLocations(): Promise<void> {
    await this.page.goto('/contact');
  }
}
