class ViewPage {
  constructor(viewName, browser, basePath) {
    this.viewName = viewName;
    this.browser = browser;
    this.basePath = basePath;
  }

  visit() {
    return this.browser.visit(`${this.basePath}/${this.viewName}`);
  }

  title() {
    return this.browser.text('[data-test="page-title"]');
  }

  getLink() {
    return this.extractLink('uc-sign-in-link');
  }

  /**
   * @param {string} dataTest - the data test element
   * @param {object} context - the 'core' object returned from browser.querySelector. By default
   * uses the document
   * returns the text within the element
   */
  extractLink(dataTest, context = this.browser) {
    const href = this.browser.query(`[data-test="${dataTest}"]`, context).getAttribute('href');
    const text = this.extractText(dataTest, context);
    return { href, text };
  }

  /**
   * @param {string} dataTest - the data test element
   * @param {object} context - the core object returned from browser.querySelector. By default
   * uses the document
   * returns the text within the element
   */
  extractText(dataTest, context = this.browser) {
    return this.browser.text(`[data-test="${dataTest}"]`, context);
  }

}
module.exports = ViewPage;
