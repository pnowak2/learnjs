import { Angular2HttpPage } from './app.po';

describe('angular2-http App', function() {
  let page: Angular2HttpPage;

  beforeEach(() => {
    page = new Angular2HttpPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
