import { browser, by, element } from 'protractor'

export class AppPage {
  async navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>
  }

  async getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>
  }
}
