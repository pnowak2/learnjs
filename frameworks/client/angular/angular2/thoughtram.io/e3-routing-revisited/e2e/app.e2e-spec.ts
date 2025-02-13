import { E3RoutingRevisitedPage } from './app.po';

describe('e3-routing-revisited App', function() {
  let page: E3RoutingRevisitedPage;

  beforeEach(() => {
    page = new E3RoutingRevisitedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
