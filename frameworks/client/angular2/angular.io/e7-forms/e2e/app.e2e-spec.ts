import { E7FormsPage } from './app.po';

describe('e7-forms App', function() {
  let page: E7FormsPage;

  beforeEach(() => {
    page = new E7FormsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
