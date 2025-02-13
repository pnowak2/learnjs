import { E23RoutesWithGuardsPage } from './app.po';

describe('e23-routes-with-guards App', function() {
  let page: E23RoutesWithGuardsPage;

  beforeEach(() => {
    page = new E23RoutesWithGuardsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
