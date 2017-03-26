import { E15HierarchicalInjectorsPage } from './app.po';

describe('e15-hierarchical-injectors App', function() {
  let page: E15HierarchicalInjectorsPage;

  beforeEach(() => {
    page = new E15HierarchicalInjectorsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
