import { E18PreventingNameCollistionsInProvidersPage } from './app.po';

describe('e18-preventing-name-collistions-in-providers App', function() {
  let page: E18PreventingNameCollistionsInProvidersPage;

  beforeEach(() => {
    page = new E18PreventingNameCollistionsInProvidersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
