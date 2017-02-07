import { TabsComponentPage } from './app.po';

describe('tabs-component App', function() {
  let page: TabsComponentPage;

  beforeEach(() => {
    page = new TabsComponentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
