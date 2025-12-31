import { Page, Locator } from '@playwright/test';

export class SearchComponent {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly clearButton: Locator;
  readonly searchForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#SrchEntryWebPart_InpBox, input[placeholder="Search"]').first();
    this.searchButton = page.locator('#SrchEntryWebPart_SrchBtn, button[type="submit"]:has-text("Submit")').first();
    this.clearButton = page.locator('#SrchEntryClearButton, button[title="clear"]').first();
    this.searchForm = page.locator('#SrchEntryWebPart_SearchForm, form').first();
  }

  async isSearchInputVisible(): Promise<boolean> {
    return await this.searchInput.isVisible();
  }

  async enterSearchQuery(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  async getSearchInputValue(): Promise<string> {
    return await this.searchInput.inputValue();
  }

  async getPlaceholderText(): Promise<string> {
    return await this.searchInput.getAttribute('placeholder') || '';
  }

  async clickSearch(): Promise<void> {
    await this.searchButton.click();
  }

  async submitSearch(): Promise<void> {
    await this.searchInput.press('Enter');
  }

  async clearSearch(): Promise<void> {
    await this.clearButton.click();
  }

  async isClearButtonVisible(): Promise<boolean> {
    return await this.clearButton.isVisible();
  }
}
