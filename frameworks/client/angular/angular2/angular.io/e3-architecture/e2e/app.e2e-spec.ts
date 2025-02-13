import { E3ArchitecturePage } from './app.po';

describe('e3-architecture App', function() {
  let page: E3ArchitecturePage;

  beforeEach(() => {
    page = new E3ArchitecturePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
