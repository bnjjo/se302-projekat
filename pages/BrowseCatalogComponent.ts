import { Page, Locator } from '@playwright/test';

export class BrowseCatalogComponent {
  readonly page: Page;
  readonly browseCatalogButton: Locator;
  readonly catalogMenu: Locator;
  readonly closeButton: Locator;
  readonly categoryList: Locator;
  readonly categoryTiles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.browseCatalogButton = page.locator('button:has-text("BROWSE CATALOG")').first();
    this.catalogMenu = page.locator('.browse-catalog-menu, [class*="catalog-menu"]').first();
    this.closeButton = page.locator('button[title="close"], button:has-text("close")').first();
    this.categoryList = page.locator('ul, [role="list"]').first();
    this.categoryTiles = page.locator('a[href*="/products/"]');
  }

  async isBrowseButtonVisible(): Promise<boolean> {
    return await this.browseCatalogButton.isVisible();
  }

  async clickBrowseCatalog(): Promise<void> {
    await this.browseCatalogButton.click();
  }

  async openCatalogMenu(): Promise<void> {
    await this.clickBrowseCatalog();
    await this.page.waitForTimeout(500);
  }

  async closeCatalogMenu(): Promise<void> {
    await this.closeButton.click();
    await this.page.waitForTimeout(500);
  }

  async getCategoryTileCount(): Promise<number> {
    return await this.categoryTiles.count();
  }

  async getCategoryNames(): Promise<string[]> {
    const names: string[] = [];
    const tiles = await this.categoryTiles.all();
    for (const tile of tiles) {
      const name = await tile.textContent();
      if (name) names.push(name.trim());
    }
    return names;
  }

  async clickCategoryByName(name: string): Promise<void> {
    await this.categoryTiles.filter({ hasText: name }).first().click();
  }

  async clickCategoryByIndex(index: number): Promise<void> {
    await this.categoryTiles.nth(index).click();
  }

  async getBrowseButtonText(): Promise<string> {
    return await this.browseCatalogButton.textContent() || '';
  }
}
