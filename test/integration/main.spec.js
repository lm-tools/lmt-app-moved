const helper = require('./support/integrationSpecHelper');
const googleTagManagerHelper = helper.googleTagManagerHelper;
const mainPage = helper.mainPage;
const expect = require('chai').expect;

describe('Main', () => {
  it('should contain valid google tag manager data', () =>
    mainPage.visit()
      .then(() => expect(googleTagManagerHelper.getUserVariable()).to.equal('set-me-in-controller'))
  );
  it('should return corresponding static view', () =>
    mainPage.visit()
      .then(() => {
        expect(mainPage.title()).to.eql('\'Record your work search\' has moved');
        expect(mainPage.getLink()).to.eql({
          href: 'https://www.universal-credit.service.gov.uk/sign-in',
          text: 'Go to online account',
        });
      })
  );
});

