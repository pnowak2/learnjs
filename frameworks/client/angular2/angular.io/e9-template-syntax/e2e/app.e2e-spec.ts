import { E9TemplateSyntaxPage } from './app.po';

describe('e9-template-syntax App', function() {
  let page: E9TemplateSyntaxPage;

  beforeEach(() => {
    page = new E9TemplateSyntaxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
