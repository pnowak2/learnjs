import { NgmodulePage } from './app.po';

describe('ngmodule App', function() {
  let page: NgmodulePage;

  beforeEach(() => {
    page = new NgmodulePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
