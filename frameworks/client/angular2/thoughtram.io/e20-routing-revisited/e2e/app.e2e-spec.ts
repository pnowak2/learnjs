import { E20RoutingRevisitedPage } from './app.po';

describe('e20-routing-revisited App', function() {
  let page: E20RoutingRevisitedPage;

  beforeEach(() => {
    page = new E20RoutingRevisitedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
