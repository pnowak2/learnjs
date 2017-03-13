import { E13ComponentStylesPage } from './app.po';

describe('e13-component-styles App', function() {
  let page: E13ComponentStylesPage;

  beforeEach(() => {
    page = new E13ComponentStylesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
