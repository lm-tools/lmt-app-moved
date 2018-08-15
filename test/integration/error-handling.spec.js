const helper = require('./support/integrationSpecHelper');
const googleTagManagerHelper = helper.googleTagManagerHelper;
const errorPage = helper.errorPage;
const expect = require('chai').expect;
const basePaths = ['', '/a-rando-path'];

describe('Error handling', () =>
  basePaths.forEach(basePath =>
    describe(`basePath: ${basePath || '[none]'}`, () => {
      describe('not found', () => {
        before(() => {
          helper.restartServer({ basePath });
          return helper.browser.visit('/path-that-not-exists').catch(() => {
          });
        });

        it('returns 404 code', () =>
          expect(helper.browser.response.status).to.equal(404)
        );

        it('displays "Page not found" message', () =>
          expect(errorPage.getMessage()).to.equal('Page not found')
        );
        it('should contain valid google tag manager data', () =>
          expect(googleTagManagerHelper.getUserVariable()).to.exists
        );

        describe('production', () => {
          it('has empty error details', () => {
            helper.restartServer({ env: 'production', basePath });
            helper.browser.visit('/path-that-not-exists')
              .catch(() => {
              })
              .then(() => expect(errorPage.getErrorDetails()).to.equal(''));
          });
        });
      });
    })
  )
);
