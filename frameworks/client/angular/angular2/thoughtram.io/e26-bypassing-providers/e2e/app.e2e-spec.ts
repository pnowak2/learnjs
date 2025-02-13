import { E26BypassingProvidersPage } from './app.po';

describe('e26-bypassing-providers App', function() {
  let page: E26BypassingProvidersPage;

  beforeEach(() => {
    page = new E26BypassingProvidersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
