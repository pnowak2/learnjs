import { NestedRoutesPage } from './app.po';

describe('nested-routes App', function() {
  let page: NestedRoutesPage;

  beforeEach(() => {
    page = new NestedRoutesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
