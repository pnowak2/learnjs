import { E8DiPage } from './app.po';

describe('e8-di App', function() {
  let page: E8DiPage;

  beforeEach(() => {
    page = new E8DiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
