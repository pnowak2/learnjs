import { E9MultiProvidersPage } from './app.po';

describe('e9-multi-providers App', function() {
  let page: E9MultiProvidersPage;

  beforeEach(() => {
    page = new E9MultiProvidersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
