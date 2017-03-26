import { E16TemplateDrivenFormsPage } from './app.po';

describe('e16-template-driven-forms App', function() {
  let page: E16TemplateDrivenFormsPage;

  beforeEach(() => {
    page = new E16TemplateDrivenFormsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
