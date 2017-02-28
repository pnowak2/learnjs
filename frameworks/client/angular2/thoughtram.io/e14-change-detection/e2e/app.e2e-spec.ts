import { E14ChangeDetectionPage } from './app.po';

describe('e14-change-detection App', function() {
  let page: E14ChangeDetectionPage;

  beforeEach(() => {
    page = new E14ChangeDetectionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
