class MainPage {
  constructor(browser, basePath) {
    this.browser = browser;
    this.basePath = basePath;
  }

  visit() {
    return this.browser.visit(this.basePath);
  }

  title() {
    return this.browser.text('[data-test="page-title"]');
  }
}
module.exports = MainPage;
