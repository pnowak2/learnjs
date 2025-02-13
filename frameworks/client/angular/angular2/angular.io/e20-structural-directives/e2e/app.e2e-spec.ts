import { E20StructuralDirectivesPage } from './app.po';

describe('e20-structural-directives App', () => {
  let page: E20StructuralDirectivesPage;

  beforeEach(() => {
    page = new E20StructuralDirectivesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
