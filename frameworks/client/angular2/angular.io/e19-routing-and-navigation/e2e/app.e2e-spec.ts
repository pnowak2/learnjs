import { E19RoutingAndNavigationPage } from './app.po';

describe('e19-routing-and-navigation App', function() {
  let page: E19RoutingAndNavigationPage;

  beforeEach(() => {
    page = new E19RoutingAndNavigationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
