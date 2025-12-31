import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly header: Locator;
  readonly phoneNumber: Locator;
  readonly emailUsLink: Locator;
  readonly loginLink: Locator;
  readonly orderLink: Locator;
  readonly orderHistoryLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header, banner, [role="banner"]').first();
    this.phoneNumber = page.locator('a[href^="tel:"]').first();
    this.emailUsLink = page.locator('text=Email Us').first();
    this.loginLink = page.locator('a:has-text("Log in")').first();
    this.orderLink = page.locator('a:has-text("Order")').first();
    this.orderHistoryLink = page.locator('a:has-text("Order History")').first();
  }

  async isHeaderVisible(): Promise<boolean> {
    return await this.header.isVisible();
  }

  async getPhoneNumber(): Promise<string> {
    return await this.phoneNumber.textContent() || '';
  }

  async clickEmailUs(): Promise<void> {
    await this.emailUsLink.click();
  }

  async clickLogin(): Promise<void> {
    await this.loginLink.click();
  }

  async isLoginLinkVisible(): Promise<boolean> {
    return await this.loginLink.isVisible();
  }

  async getLoginLinkText(): Promise<string> {
    return await this.loginLink.textContent() || '';
  }

  async clickOrder(): Promise<void> {
    await this.orderLink.click();
  }

  async clickOrderHistory(): Promise<void> {
    await this.orderHistoryLink.click();
  }

  async isOrderLinkVisible(): Promise<boolean> {
    return await this.orderLink.isVisible();
  }

  async isOrderHistoryLinkVisible(): Promise<boolean> {
    return await this.orderHistoryLink.isVisible();
  }
}
