const Zombie = require('zombie');
const port = require('../../common/config').port;

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

afterEach(function () {
  if (this.currentTest.state === 'failed') {
    screenshots.takeScreenshot(this.currentTest, browser);
  }
});

class Helper {
  constructor() {
    this.browser = browser;
    this.googleTagManagerHelper = new GoogleTagManagerHelper(this.browser);
    this.errorPage = new ErrorPage(this.browser);
    afterEach(function () {
      if (this.currentTest.state === 'failed') {
        screenshots.takeScreenshot(this.currentTest, this.browser);
      }
    });
  }

  getPath(path) {
    return `${this.basePath}${path}`;
  }

  restartServer({ view = '', basePath = '', env = 'test' }) {
    if (this.app && this.app.server) {
      this.app.server.close();
    }
    this.basePath = process.env.EXPRESS_BASE_PATH = basePath;
    this.env = process.env.NODE_ENV = env;
    this.view = process.env.VIEW = view;
    // eslint-disable-next-line global-require
    this.app = stealthyRequire(require.cache, () => require('../../../bin/www'));
    this.genericPage = new ViewPage(this.browser, this.basePath);
    this.cookiePage = new CookiePage(this.browser, this.basePath);
  }
}

/**
 * returns a singleton helper to the calling spec file.
 * This will prevent port in use errors when restarting the server
 */
module.exports = new Helper();
