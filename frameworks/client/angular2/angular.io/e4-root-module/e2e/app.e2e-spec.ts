import { E4RootModulePage } from './app.po';

describe('e4-root-module App', function() {
  let page: E4RootModulePage;

  beforeEach(() => {
    page = new E4RootModulePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
