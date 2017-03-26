import { E28ResolvingRouteDataPage } from './app.po';

describe('e28-resolving-route-data App', function() {
  let page: E28ResolvingRouteDataPage;

  beforeEach(() => {
    page = new E28ResolvingRouteDataPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
