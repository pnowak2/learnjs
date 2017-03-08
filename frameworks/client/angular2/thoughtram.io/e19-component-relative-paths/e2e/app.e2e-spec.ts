import { E19ComponentRelativePathsPage } from './app.po';

describe('e19-component-relative-paths App', function() {
  let page: E19ComponentRelativePathsPage;

  beforeEach(() => {
    page = new E19ComponentRelativePathsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
