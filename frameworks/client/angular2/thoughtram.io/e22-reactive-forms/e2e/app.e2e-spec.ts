import { E22ReactiveFormsPage } from './app.po';

describe('e22-reactive-forms App', function() {
  let page: E22ReactiveFormsPage;

  beforeEach(() => {
    page = new E22ReactiveFormsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
