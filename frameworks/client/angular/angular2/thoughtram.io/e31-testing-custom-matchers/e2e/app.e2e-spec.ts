import { E31TestingCustomMatchersPage } from './app.po';

describe('e31-testing-custom-matchers App', function() {
  let page: E31TestingCustomMatchersPage;

  beforeEach(() => {
    page = new E31TestingCustomMatchersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
