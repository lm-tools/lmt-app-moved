const helper = require('./support/integrationSpecHelper');
const googleTagManagerHelper = helper.googleTagManagerHelper;
const expect = require('chai').expect;
const basePaths = ['', '/a-rando-path'];

describe('Views', () =>
  basePaths.forEach(basePath =>
    describe(`with basePath: ${basePath || '[none]'}`, () => {
      before(() => {
        helper.restartServer({ basePath });
      });
      it('should contain valid google tag manager data', () =>
        helper.genericPage.visit('your-work-search')
          .then(() => expect(googleTagManagerHelper.getUserVariable())
            .to.equal('set-me-in-controller'))
      );
      describe('view specified', () => {
        before(() => {
          helper.restartServer({ view: 'your-work-search', basePath });
        });

        it('should return view on homepage', () =>
          helper.genericPage.visit()
            .then(() => expect(helper.genericPage.title())
              .to.eql('\'Record your work search\' has moved'))
        );

        it('should redirect to view specified at start', () =>
          helper.genericPage.visit('holding')
            .then(() => {
              expect(helper.genericPage.title()).to.eql('\'Record your work search\' has moved');
              expect(helper.browser.location.pathname).to.eql((basePath && `${basePath}/` || '/'));
            })
        );
      });

      describe('view not specified', () => {
        it('should return a view not specified at server start', () => {
          helper.restartServer({ basePath });
          return helper.genericPage.visit('holding')
            .then(() =>
              expect(helper.genericPage.title()).to.eql('Holding page')
            );
        });

        it('should return 404 when no view found', () =>
          helper.genericPage.visit('does-not-exist')
            .catch(() => {
            })
            .then(() => expect(helper.browser.response.status).to.equal(404))
        );
      });

      describe('your-work-search', () => {
        before(() =>
          helper.restartServer({ basePath })
        );
        it('should return corresponding static view', () =>
          helper.genericPage.visit('your-work-search')
            .then(() => {
              expect(helper.genericPage.title()).to.eql('\'Record your work search\' has moved');
              expect(helper.genericPage.getLink()).to.eql({
                href: 'https://www.universal-credit.service.gov.uk/sign-in',
                text: 'Go to online account',
              });
            })
        );
      });
    })
  )
);
