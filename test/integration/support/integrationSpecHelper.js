const Zombie = require('zombie');
const port = require('../../common/config').port;

const basePath = process.env.EXPRESS_BASE_PATH || '';

Zombie.site = `http://localhost:${port}`;
const browser = new Zombie();
const screenshots = require('./screenshots');
const GoogleTagManagerHelper = require('../../common/page_objects/google-tag-manager-helper');
const ViewPage = require('../../common/page_objects/view-page');
const ErrorPage = require('../../common/page_objects/error-page');
const CookiePage = require('../../common/page_objects/cookie-page');

const stealthyRequire = require('stealthy-require');

process.env.GOOGLE_TAG_MANAGER_ID = 'fake-id';
process.env.PORT = port;
const app = require('../../../bin/www');

afterEach(function () {
  if (this.currentTest.state === 'failed') {
    screenshots.takeScreenshot(this.currentTest, browser);
  }
});

const m = {
  basePath,
  browser,
  googleTagManagerHelper: new GoogleTagManagerHelper(browser),
  viewsPageHelper: pageName => new ViewPage(pageName, browser, basePath),
  errorPage: new ErrorPage(browser),
  cookiePage: new CookiePage(browser, basePath),
  app,
};

m.restartServer = () => {
  m.app.server.close();
  // eslint-disable-next-line global-require
  const appFresh = stealthyRequire(require.cache, () => require('./../../../bin/www'));
  Object.assign(m, { app: appFresh });
};

module.exports = m;
