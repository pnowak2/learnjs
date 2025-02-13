import { E2DIPage } from './app.po';

describe('e2-di App', function() {
  let page: E2DIPage;

  beforeEach(() => {
    page = new E2DIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
