const Zombie = require('zombie');
const port = require('../../common/config').port;

process.env.EXPRESS_BASE_PATH = process.env.EXPRESS_BASE_PATH || '/your-work-search';
const basePath = process.env.EXPRESS_BASE_PATH || '';

Zombie.site = `http://localhost:${port}`;
const browser = new Zombie();
const screenshots = require('./screenshots');
const GoogleTagManagerHelper = require('../../common/page_objects/google-tag-manager-helper');
const MainPage = require('../../common/page_objects/main-page');
const ErrorPage = require('../../common/page_objects/error-page');
const CookiePage = require('../../common/page_objects/cookie-page');

process.env.GOOGLE_TAG_MANAGER_ID = 'fake-id';
process.env.PORT = port;
const app = require('../../../bin/www');

afterEach(function () {
  if (this.currentTest.state === 'failed') {
    screenshots.takeScreenshot(this.currentTest, browser);
  }
});

module.exports = {
  basePath,
  browser,
  googleTagManagerHelper: new GoogleTagManagerHelper(browser),
  mainPage: new MainPage(browser, basePath),
  errorPage: new ErrorPage(browser),
  cookiePage: new CookiePage(browser, basePath),
  app,
};
