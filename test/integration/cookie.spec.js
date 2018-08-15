/* eslint-disable no-underscore-dangle */
const helper = require('./support/integrationSpecHelper');
const googleTagManagerHelper = helper.googleTagManagerHelper;
const expect = require('chai').expect;
const translation = require('./../../app/locales/en.json');
const basePaths = ['', '/a-rando-path'];

describe('Cookie page', () =>
  basePaths.forEach(basePath =>
    describe(`basePath: ${basePath || '[none]'}`, () => {
      before(() => {
        helper.restartServer({ basePath });
        return helper.cookiePage.visit();
      });
      it('should contain valid googleTagManager', () =>
        expect(googleTagManagerHelper.getUserVariable()).to.exists
      );

      it('displays govuk general cookie info', () =>
        expect(helper.cookiePage.isDisplayed()).to.equal(true)
      );

      it('displays app specific cookie info', () =>
        expect(helper.cookiePage.getAppCookieTableData())
          .to.eql(translation.cookie.appSpecific.cookies)
      );
    })
  )
);
