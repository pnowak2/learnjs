import { Angular2RoutesPage } from './app.po';

describe('angular2-routes App', function() {
  let page: Angular2RoutesPage;

  beforeEach(() => {
    page = new Angular2RoutesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
