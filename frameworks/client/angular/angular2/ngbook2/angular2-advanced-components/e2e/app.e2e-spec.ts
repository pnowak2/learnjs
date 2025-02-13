import { AdvancedComponentsPage } from './app.po';

describe('advanced-components App', function() {
  let page: AdvancedComponentsPage;

  beforeEach(() => {
    page = new AdvancedComponentsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
