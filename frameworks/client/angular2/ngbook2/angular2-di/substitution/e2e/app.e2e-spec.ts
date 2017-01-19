import { SubstitutionPage } from './app.po';

describe('substitution App', function() {
  let page: SubstitutionPage;

  beforeEach(() => {
    page = new SubstitutionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
