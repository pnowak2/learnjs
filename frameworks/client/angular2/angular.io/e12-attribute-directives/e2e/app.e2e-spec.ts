import { E12AttributeDirectivesPage } from './app.po';

describe('e12-attribute-directives App', function() {
  let page: E12AttributeDirectivesPage;

  beforeEach(() => {
    page = new E12AttributeDirectivesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
