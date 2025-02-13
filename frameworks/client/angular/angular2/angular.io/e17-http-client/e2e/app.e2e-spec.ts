import { E17HttpClientPage } from './app.po';

describe('e17-http-client App', function() {
  let page: E17HttpClientPage;

  beforeEach(() => {
    page = new E17HttpClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
