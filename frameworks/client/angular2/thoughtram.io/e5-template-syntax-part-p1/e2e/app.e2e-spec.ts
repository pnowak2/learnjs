import { E5TemplateSyntaxPartP1Page } from './app.po';

describe('e5-template-syntax-part-p1 App', function() {
  let page: E5TemplateSyntaxPartP1Page;

  beforeEach(() => {
    page = new E5TemplateSyntaxPartP1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
