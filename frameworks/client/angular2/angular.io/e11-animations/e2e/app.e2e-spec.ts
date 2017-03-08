import { E11AnimationsPage } from './app.po';

describe('e11-animations App', function() {
  let page: E11AnimationsPage;

  beforeEach(() => {
    page = new E11AnimationsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
