import { E1CliQuickstartPage } from './app.po';

describe('e1-cli-quickstart App', function() {
  let page: E1CliQuickstartPage;

  beforeEach(() => {
    page = new E1CliQuickstartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
