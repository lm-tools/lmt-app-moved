const helper = require('./support/integrationSpecHelper');
const googleTagManagerHelper = helper.googleTagManagerHelper;
const viewsPageHelper = helper.viewsPageHelper;
const yourWorkSearchPage = viewsPageHelper('your-work-search');
const nonWhitelistedPage = viewsPageHelper('holding');
const nonExistantPage = viewsPageHelper('does-not-exist');
const expect = require('chai').expect;

describe('Views', () => {
  it('should contain valid google tag manager data', () =>
    yourWorkSearchPage.visit()
      .then(() => expect(googleTagManagerHelper.getUserVariable()).to.equal('set-me-in-controller'))
  );
  describe('views whitelist specified', () => {
    before(() => {
      process.env.VIEWS_WHITELIST = 'your-work-search';
      helper.restartServer();
    });
    it('should return whitelisted view', () =>
      yourWorkSearchPage.visit()
        .then(() => expect(yourWorkSearchPage.title())
          .to.eql('\'Record your work search\' has moved'))
    );
    it('should return 404 for non-whitelisted view', () =>
      nonWhitelistedPage.visit()
        .catch(() => {})
        .then(() => expect(helper.browser.response.status).to.equal(404))
    );
    it('should return 404 when no view found', () =>
      nonExistantPage.visit()
        .catch(() => {})
        .then(() => expect(helper.browser.response.status).to.equal(404))
    );
  });

  describe('views whitelist not specified', () => {
    before(() => {
      delete process.env.VIEWS_WHITELIST;
      helper.restartServer();
    });
    it('should return view', () =>
      nonWhitelistedPage.visit()
        .then(() =>
          expect(yourWorkSearchPage.title()).to.eql('Holding page')
        )
    );
  });

  describe('your-work-search', () => {
    before(() => {
      delete process.env.VIEWS_WHITELIST;
      helper.restartServer();
    });
    it('should return corresponding static view', () =>
      yourWorkSearchPage.visit()
        .then(() => {
          expect(yourWorkSearchPage.title()).to.eql('\'Record your work search\' has moved');
          expect(yourWorkSearchPage.getLink()).to.eql({
            href: 'https://www.universal-credit.service.gov.uk/sign-in',
            text: 'Go to online account',
          });
        })
    );
  });
});

