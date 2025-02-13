import { E6HostAndVisibilityInDiPage } from './app.po';

describe('e6-host-and-visibility-in-di App', function() {
  let page: E6HostAndVisibilityInDiPage;

  beforeEach(() => {
    page = new E6HostAndVisibilityInDiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
