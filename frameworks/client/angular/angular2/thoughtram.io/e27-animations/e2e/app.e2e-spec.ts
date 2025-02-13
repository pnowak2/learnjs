import { E27AnimationsPage } from './app.po';

describe('e27-animations App', function() {
  let page: E27AnimationsPage;

  beforeEach(() => {
    page = new E27AnimationsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
