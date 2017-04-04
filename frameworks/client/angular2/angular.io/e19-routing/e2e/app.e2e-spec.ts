import { E19RoutingPage } from './app.po';

describe('e19-routing App', () => {
  let page: E19RoutingPage;

  beforeEach(() => {
    page = new E19RoutingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
