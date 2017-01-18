import { BasicAuthPage } from './app.po';

describe('basic-auth App', function() {
  let page: BasicAuthPage;

  beforeEach(() => {
    page = new BasicAuthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
